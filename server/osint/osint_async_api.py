import sys
import virustotal_api
import tip_api
import netcraft_crawl
import shodan_api
import hunter_api

import io
import json
import time
from queue import Queue

import ipaddress
from urllib.parse import urlparse
import socket
from threading import Thread

inputIP = None
def isIP(input_value):
    global inputIP
    if inputIP != None :
        return inputIP
    else :
        try:
            ipaddress.ip_address(input_value)
        except:
            inputIP = False
            return False
        else :
            inputIP = True
            return True
            
def URL2IP(url):
    o = urlparse(url)   
    if o.netloc == '' :
        domain = o.path
    else :
        domain = o.netloc

    return socket.gethostbyname(domain)

def runSearch(kind, input_value, queue):
    res = ""
    if   kind == "shodan" :
        # 입력값이 URL 또는 도메인이면 IP로 변경
        if isIP(input_value) == False :
            input_value = URL2IP(input_value)
        res = shodan_api.shodan_search(input_value)
    elif kind == "netcraft" :
        res = netcraft_crawl.netcraft_search(input_value)
    elif kind == "hunter" :        
        res = hunter_api.hunter_search(input_value)
    elif kind == "tip_result" :
        res = tip_api.tip_search(input_value)
    elif kind == "virustotal" :
        res = virustotal_api.virus_search(input_value)
    
    queue.put({kind : res})

def osint_search(input_value):

    res = Queue()
    run_th = []
    try:
        run_th.append(Thread(target=runSearch, args=("shodan",input_value,res)))
        run_th.append(Thread(target=runSearch, args=("netcraft",input_value,res)))

        #입력값이 IP이면 실행하지 않음
        if isIP(input_value) == False :
            run_th.append(Thread(target=runSearch, args=("hunter",input_value,res)))
            run_th.append(Thread(target=runSearch, args=("tip_result",input_value,res)))

        run_th.append(Thread(target=runSearch, args=("virustotal",input_value,res)))

        for th in run_th:
            th.start()
        for th in run_th:
            th.join()

        res_json = {}
        for result in res.queue:
            res_json.update(result)

        print(json.dumps(res_json))        
        sys.stdout.flush()

    except Exception as e:
        print("Error: %s" %e)
        sys.exit(1)
        
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

#start = time.time()
osint_search(sys.argv[1])
#print(time.time() - start)