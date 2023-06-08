import shodan
from datetime import datetime

def shodan_search(input_value):
    try:    
        # api 설정 부분
        SHODAN_API_KEY = "apikey"  # 발급받은 API KEY 입력
        api = shodan.Shodan(SHODAN_API_KEY)
        
        results = api.host(input_value)
        
        shodan_result = {}
        shodan_result['city'] = results['city']
        shodan_result['last_update'] = results['last_update']
        shodan_result['port'] = results['ports']
        
        shodan_result['hostnames'] = results['hostnames']
        shodan_result['country_code'] = results['country_code']
        shodan_result['country_name'] = results['country_name']
        shodan_result['location'] = {}
        shodan_result['location']['latitude'] = results['data'][0]['location']['latitude']
        shodan_result['location']['longitude'] = results['data'][0]['location']['longitude']

        # log4j cve-code list 관련 부분
        log4j_cve = ['CVE-2022-23307', 'CVE-2022-23305', 'CVE-2022-23302', 'CVE-2021-45105', 'CVE-2021-45046', 'CVE-2021-44832', 'CVE-2021-44228', 'CVE-2021-4104', 'CVE-2020-9493', 'CVE-2020-9488', 'CVE-2019-17571', 'CVE-2017-5645']
        def is_log4j(item):
            if item in log4j_cve:
                return item
        shodan_result['cve_log4j'] = []
        shodan_result['this_year_cve'] = []
        shodan_result['previous_year_cve'] = []
        shodan_result['this_year_cvss'] = []
        shodan_result['previous_year_cvss'] = []
        shodan_result['this_year_cve_refer'] = {}
        shodan_result['previous_year_cve_refer'] = {}

        # shodan 검색 결과에서 vulns data(cve-code lists) 확인
        for key in results.keys():
            if key == 'vulns':
                cve_lists = results['vulns']
                # cve-code lists 중 log4j 관련 code가 포함되어 있는지 확인 
                for cve_code in filter(is_log4j, cve_lists):
                    shodan_result['cve_log4j'].append(cve_code)
                # 현재년도와 작년 cve_code lists 찾는 부분
                this_year_cve = list(filter(lambda x:'CVE-'+str(datetime.now().year)+'-' in x,cve_lists))
                previous_year_cve = list(filter(lambda x:'CVE-'+str(datetime.now().year - 1)+'-' in x, cve_lists))
                shodan_result['this_year_cve'] = this_year_cve
                shodan_result['previous_year_cve'] = previous_year_cve            
            elif key == 'data':
                for i in range(len(results['data'])):
                    for j in results['data'][i].keys():
                        if j == 'vulns':
                            cve_lists = results['data'][i]['vulns']
                            # cve-code lists 중 log4j 관련 code가 포함되어 있는지 확인 
                            for cve_code in filter(is_log4j, cve_lists):
                                shodan_result['cve_log4j'].append(cve_code)
                            # 현재년도와 작년 cve_code lists 찾는 부분
                            this_year_cve = list(filter(lambda x:'CVE-'+str(datetime.now().year)+'-' in x,cve_lists))
                            previous_year_cve = list(filter(lambda x:'CVE-'+str(datetime.now().year - 1)+'-' in x,cve_lists))
                            shodan_result['this_year_cve'] = this_year_cve
                            shodan_result['previous_year_cve'] = previous_year_cve

                            # cve_code lists의 cvss & reference 가져오는 부분
                            for item in this_year_cve:
                                if cve_lists[item]['cvss'] != 'null':
                                    shodan_result['this_year_cvss'].append(cve_lists[item]['cvss'])
                                
                                shodan_result['this_year_cve_refer'][item] = []
                                if cve_lists[item]['references'] != 'null' and len(cve_lists[item]['references']) > 3:
                                    for r in range(3):
                                        shodan_result['this_year_cve_refer'][item].append(cve_lists[item]['references'][r])
                                elif cve_lists[item]['references'] != 'null' and len(cve_lists[item]['references']) < 3:
                                    for r in range(len(cve_lists[item]['references'])):
                                        shodan_result['this_year_cve_refer'][item].append(cve_lists[item]['references'][r])
   
                                
                            for item in previous_year_cve:
                                if cve_lists[item]['cvss'] != 'null':
                                    shodan_result['previous_year_cvss'].append(cve_lists[item]['cvss'])
                                shodan_result['previous_year_cve_refer'][item] = []
                                if cve_lists[item]['references'] != 'null' and len(cve_lists[item]['references']) > 3:
                                    for r in range(3):
                                        shodan_result['previous_year_cve_refer'][item].append(cve_lists[item]['references'][r])
                                elif cve_lists[item]['references'] != 'null' and len(cve_lists[item]['references']) < 3:
                                    for r in range(len(cve_lists[item]['references'])):
                                        shodan_result['previous_year_cve_refer'][item].append(cve_lists[item]['references'][r])
                            
                        elif j == 'ssl':
                            shodan_result['cipher'] = results['data'][i][j]['cipher']
        
        try:
            # FTP 익명 로그인 취약점 확인 부분
            search_ftp = "port:21 Anonymous user logged in ip:" + input_value
            vuln_lists = api.search(search_ftp)
            shodan_result['vuln_ftp'] = vuln_lists['total']

            # Apache Directory Listings 취약점 확인 부분
            search_dirListing = 'http.title:"Index of /" http.html:".pem" ip:' + input_value
            vuln_lists = api.search(search_dirListing)
            shodan_result['vuln_dir_listings'] = vuln_lists['total']

            # Telnet 접속 시 root 계정으로 로그인 했는지 확인
            search_telnet = '"root@" port:23 -login -password -name -Session ip:'+ input_value
            vuln_lists = api.search(search_telnet)
            shodan_result['vuln_root_telnet'] = vuln_lists['total']
        except:
            shodan_result['vuln_ftp'] = 0
            shodan_result['vuln_dir_listings'] = 0
            shodan_result['vuln_root_telnet'] = 0
        return shodan_result
    except Exception as e:
        return {"result": e}
