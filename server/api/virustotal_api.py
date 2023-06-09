import requests

def virus_search(input_value):
    try:
        # 바이러스토탈 API key
        my_apikey = 'apikey'

        # 바이러스 토탈 URL 스캔
        url = 'https://www.virustotal.com/vtapi/v2/url/scan'
        scan_target = input_value

        # 바이러스토탈 URL 스캔 시작
        params = {'apikey': my_apikey, 'url': scan_target}
        response_scan = requests.post(url, data=params)
        result_scan = response_scan.json()

        scan_id = result_scan['scan_id']  # 결과를 출력을 위해 scan_id 값 저장

        # URL 스캔 시작 안내, 60초 대기
        #print('Virustotal File Scan Start (60 Seconds Later) : ', scan_target, '\n')

        # 바이러스토탈 URL 스캔 결과 주소
        url_report = 'https://www.virustotal.com/vtapi/v2/url/report'

        # 결과 파일 찾기 위해 scan_id 입력
        url_report_params = {'apikey': my_apikey, 'resource': scan_id}

        # 바이러스토탈 URL 스캔 결과 리포트 조회
        response_report = requests.get(url_report, params=url_report_params)

        # 점검 결과 데이터 추출
        report = response_report.json()  # 결과 값을 report에 json형태로 저장
        report_scans = report.get('scans')  # scans 값 저장
        report_scans_vendors = list(report['scans'].keys())  # Vendor 저장
        report_scans_vendors_cnt = len(report_scans_vendors)  # 길이 저장
        virustotal_result = {}

        # 파일 스캔 결과 리포트 데이터 보기
        virustotal_result['scan_vendor_cnt'] = report_scans_vendors_cnt

        # 바이러스 스캔 엔진사 별 데이터 정리

        numbers = 1
        
        virustotal_result['detected'] = {}
        for vendor in report_scans_vendors:
            outputs = report_scans[vendor]
            outputs_result = report_scans[vendor].get('result')
            outputs_detected = report_scans[vendor].get('detected')
            
        # outputs_detected = True, False
        # outputs_result = clean site, unrated site, malware site, malicious site, Phishing site
            if outputs_result != 'clean site':
                if outputs_result != 'unrated site':
                    virustotal_result['detected'][numbers] = {}
                    virustotal_result['detected'][numbers]['Vendor Name'] = vendor               
                    virustotal_result['detected'][numbers]['Vendor Result'] = outputs_result               
                    virustotal_result['detected'][numbers]['Vendor Detected'] = outputs_detected               
                    numbers += 1
                    
        numbers = numbers - 1
        virustotal_result['total_detected_virus'] = numbers
        return {"virustotal" : virustotal_result}
    except Exception as e:
        return {"virustotal": e}
