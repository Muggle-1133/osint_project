import sys
import virustotal_api
import tip_api
import netcraft_crawl
import io
import json

def osint_search(input_value):
    
    try:
        """
        netcraft_crawl.netcraft_search(input_value)
        virustotal_api.virus_search(input_value)
        """

        res = {
            **netcraft_crawl.netcraft_search(input_value),
            **virustotal_api.virus_search(input_value), 
            **tip_api.tip_search(input_value)
        }

        print(json.dumps(res))
        
        sys.stdout.flush()

    except Exception as e:
        print("Error: %s" %e)
        sys.exit(1)
        
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')
osint_search(sys.argv[1])