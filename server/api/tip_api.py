import requests

def tip_search(inputValue):
    try:
        API_KEY = 'at_PSrHQ4j2ExWNP3Bls7V9uTEhQxhDb'
        # Domain Malware Check API
        malware_check_url = 'https://api.threatintelligenceplatform.com/v1/malwareCheck?domainName={Domain}&apiKey={API_KEY}'.format(Domain=inputValue, API_KEY=API_KEY)
        # API로 데이터 불러오기
        malware_check_response = requests.get(malware_check_url)
        malware_check_parsed = malware_check_response.json()
        tip_result = {}
        tip_result['malware'] = {}
        tip_result['malware']['safeScore'] = malware_check_parsed['safeScore']
        tip_result['malware']['warningDetails'] = malware_check_parsed['warningDetails']
        
        # Domain Reputation API
        reputation_url = 'https://api.threatintelligenceplatform.com/v2/reputation?domainName={Domain}&apiKey={API_KEY}'.format(Domain=inputValue, API_KEY=API_KEY)
        reputation_response = requests.get(reputation_url)
        reputation_parsed = reputation_response.json()
        tip_result['reputationScore'] = reputation_parsed['reputationScore']
        tip_result['vulnerability'] = reputation_parsed['testResults']

        return tip_result
    except Exception as e:
        tip_result = {}
        tip_result['error'] = e
        return tip_result
# import requests
# import asyncio

# async def async_task_1(value):
#     API_KEY = 'at_PSrHQ4j2ExWNP3Bls7V9uTEhQxhDb'
#     # Domain Malware Check API
#     malware_check_url = 'https://api.threatintelligenceplatform.com/v1/malwareCheck?domainName={Domain}&apiKey={API_KEY}'.format(Domain=value, API_KEY=API_KEY)
#     # API로 데이터 불러오기
#     malware_check_response = requests.get(malware_check_url)
#     malware_check_parsed = malware_check_response.json()
#     tip_result = {}
#     tip_result['malware'] = {}
#     tip_result['malware']['safeScore'] = malware_check_parsed['safeScore']
#     tip_result['malware']['warningDetails'] = malware_check_parsed['warningDetails']
#     return tip_result

# async def async_task_2(value):
#     API_KEY = 'at_PSrHQ4j2ExWNP3Bls7V9uTEhQxhDb'
#     # Domain Reputation API
#     reputation_url = 'https://api.threatintelligenceplatform.com/v2/reputation?domainName={Domain}&apiKey={API_KEY}'.format(Domain=value, API_KEY=API_KEY)
#     reputation_response = requests.get(reputation_url)
#     reputation_parsed = reputation_response.json()
#     tip_result = {}
#     tip_result['reputationScore'] = reputation_parsed['reputationScore']
#     tip_result['vulnerability'] = reputation_parsed["testResults"]

#     return tip_result

# async def tip_search(inputValue):
#     try:
#         task1 = asyncio.create_task(async_task_1(inputValue))
#         task2 = asyncio.create_task(async_task_2(inputValue))
#         task1_result = await task1
#         task2_result = await task2
#         res = {
#             **task1_result,
#             **task2_result,
#         }
#         return res
#     except Exception as e:
#         tip_result = {}
#         tip_result['error'] = e
#         return tip_result

# def run_search(value):
#     result = asyncio.run(tip_search(value))
#     return result
