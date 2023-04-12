# 라이브러리 import
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

import time
import shodan_api
import hunter_api
import tip_api
import asyncio

def netcraft_search(input_value):
    chrome_options = webdriver.ChromeOptions()
    # 창 숨기는 옵션 추가
    chrome_options.add_argument("headless")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    driver = None
    error_msg = "An unexpected error has occurred in netcraft."
    try:
        # 다운받은 chromedriver의 위치를 지정해줌.
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

        # 암묵적으로 웹 자원 로드를 위해 3초까지 기다려 준다.
        driver.implicitly_wait(3)

        # 크롤링 대상 url
        url = 'https://sitereport.netcraft.com/?url={URL}'.format(URL=input_value)
        # 해당 url로 이동
        driver.get(url)
        # 로딩 대기
        time.sleep(2)

        netcraft_result = {}

        # Background 정보
        site = driver.find_element(By.XPATH, '//*[@id="network_table_section"]/div[2]/div[1]/table[1]/tbody/tr[1]/td').text
        netcraft_result['site'] = site
        site_title = driver.find_element(By.XPATH, '//*[@id="background_table_section"]/div[2]/div/table[1]/tbody/tr[1]/td').text
        netcraft_result['site_title'] = site_title
        site_rank = driver.find_element(By.XPATH, '//*[@id="background_table_section"]/div[2]/div/table[1]/tbody/tr[2]/td').text
        netcraft_result['site_rank'] = site_rank
        risk_rating = driver.find_element(By.XPATH, '//*[@id="background_table_section"]/div[2]/div/table[2]/tbody/tr[2]/td').text[0]
        netcraft_result['risk_rating'] = risk_rating

        # network 정보
        domain = driver.find_element(By.XPATH, '//*[@id="network_table_section"]/div[2]/div[1]/table[2]/tbody/tr[1]/td').text
        netcraft_result['domain'] = domain
        nameserver = driver.find_element(By.XPATH, '//*[@id="network_table_section"]/div[2]/div[1]/table[2]/tbody/tr[2]/td').text
        netcraft_result['nameserver'] = nameserver
        domain_registrar = driver.find_element(By.XPATH, '//*[@id="network_table_section"]/div[2]/div[1]/table[2]/tbody/tr[3]/td').text
        netcraft_result['domain_registrar'] = domain_registrar
        dns_admin = driver.find_element(By.XPATH, '//*[@id="network_table_section"]/div[2]/div[1]/table[2]/tbody/tr[6]/td').text
        netcraft_result['dns_admin'] = dns_admin
        ip_addr = driver.find_element(By.XPATH, '//*[@id="ip_address"]').text
        netcraft_result['ip_addr'] = ip_addr

        try:
            # SSL/TLS 정보
            if site[0:5] == "https" and driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[1]/h2').text == "SSL/TLS":
                netcraft_result['validity_period'] = driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[2]/div[1]/table[1]/tbody/tr[8]/td').text
                netcraft_result['public_key_algorithm'] = driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[2]/div[1]/table[1]/tbody/tr[11]/td').text
                netcraft_result['protocol_version'] = driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[2]/div[1]/table[1]/tbody/tr[12]/td/span').text
                netcraft_result['signature_algorithm'] = driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[2]/div[1]/table[1]/tbody/tr[15]/td').text
                netcraft_result['Server'] = driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[2]/div[1]/table[1]/tbody/tr[10]/td').text
                netcraft_result['perfect_forward_secrecy'] = driver.find_element(By.XPATH, '//*[@id="ssl_table_section"]/div[2]/div[1]/table[2]/tbody/tr[1]/td/span').text
                netcraft_result['OCSP_stapling_response'] = driver.find_element(By.XPATH,'//*[@id="ssl_table_section"]/div[2]/div[1]/table[2]/tbody/tr[15]/td').text
            else:
                netcraft_result['validity_period'] = ""
        except:
            netcraft_result['validity_period'] = ""
        try:
            # site technology 정보(정보가 존재하지 않을 수도 있음)
            first_target_text = driver.find_element(By.XPATH, '//*[@id="technology_table_section"]/div[2]/ul/li[1]/div[1]/h3').text
            second_target_text = driver.find_element(By.XPATH, '//*[@id="technology_table_section"]/div[2]/ul/li[2]/div[1]/h3').text

            # server-side와 client-side 모두 정보가 있는 경우
            if first_target_text == 'Server-Side' and second_target_text == 'Client-Side':
                netcraft_result['server_side_tech'] = {}
                netcraft_result['server_side_tech']['technology_name'] = []
                server_tech_tbody = driver.find_element(By.XPATH, '//*[@id="technology_table_section"]/div[2]/ul/li[1]/div[2]/table/tbody')
                tr = server_tech_tbody.find_elements(By.TAG_NAME, 'tr')
                
                for i in tr:
                    td_lists = i.find_elements(By.TAG_NAME, 'td')
                    netcraft_result['server_side_tech']['technology_name'].append(td_lists[0].get_attribute("innerText"))
                    
                netcraft_result['client_side_tech'] = {}
                netcraft_result['client_side_tech']['technology_name'] = []
                client_tech_tbody = driver.find_element(By.XPATH, '//*[@id="technology_table_section"]/div[2]/ul/li[2]/div[2]/table/tbody')

                for tr in client_tech_tbody.find_elements(By.TAG_NAME, 'tr'):
                    td_lists = tr.find_elements(By.TAG_NAME, 'td')
                    netcraft_result['client_side_tech']['technology_name'].append(td_lists[0].get_attribute("innerText"))
  
            # client-side만 정보가 있는 경우        
            elif first_target_text == 'Client-Side':
                netcraft_result['client_side_tech'] = {}
                netcraft_result['client_side_tech']['technology_name'] = []
                client_tech_tbody = driver.find_element(By.XPATH, '//*[@id="technology_table_section"]/div[2]/ul/li[1]/div[2]/table/tbody')

                for tr in client_tech_tbody.find_elements(By.TAG_NAME, 'tr'):
                    td_lists = tr.find_elements(By.TAG_NAME, 'td')
                    netcraft_result['client_side_tech']['technology_name'].append(td_lists[0].get_attribute("innerText"))
                netcraft_result['server_side_tech'] = {}
                netcraft_result['server_side_tech']['technology_name'] = ["No Data"]
            # server-side만 정보가 있는 경우   
            elif first_target_text == 'Server-Side' and second_target_text != 'Client-Side':
                netcraft_result['server_side_tech'] = {}
                netcraft_result['server_side_tech']['technology_name'] = []
                server_tech_tbody = driver.find_element(By.XPATH, '//*[@id="technology_table_section"]/div[2]/ul/li[1]/div[2]/table/tbody')
            
                for tr in server_tech_tbody.find_elements(By.TAG_NAME, 'tr'):
                    td_lists = tr.find_elements(By.TAG_NAME, 'td')
                    netcraft_result['server_side_tech']['technology_name'].append(td_lists[0].get_attribute("innerText"))
                netcraft_result['client_side_tech'] = {}
                netcraft_result['client_side_tech']['technology_name'] = ["No Data"]
            else:
                netcraft_result['server_side_tech'] = {}
                netcraft_result['server_side_tech']['technology_name'] = []
                netcraft_result['client_side_tech'] = {}
                netcraft_result['client_side_tech']['technology_name'] = []
        except:
            netcraft_result['server_side_tech'] = {}
            netcraft_result['server_side_tech']['technology_name'] = []
            netcraft_result['client_side_tech'] = {}
            netcraft_result['client_side_tech']['technology_name'] = []


        res = {}
        res['netcraft'] = netcraft_result
        # shodan api 코드 실행
        res['shodan'] = shodan_api.shodan_search(ip_addr)
        # hunter api 코드 실행
        res['hunter'] = hunter_api.hunter_search(domain)
        res['tip_result'] = tip_api.tip_search(domain)

        return res
    except Exception as e:
        res = {}
        res['netcraft'] = e
        return res
    finally:
        driver.close()