import requests


def hunter_search(input_value):
    try:
        API_KEY = "apikey"
        URL = 'https://api.hunter.io/v2/domain-search?domain={Domain}&api_key={API}'.format(Domain=input_value, API=API_KEY)

        # API로 데이터 불러오기
        response = requests.get(URL)
        parsed = response.json()

        email_lists = parsed['data']['emails']
        hunter_result = {}
        hunter_result['email_lists'] = []

        hunter_result['total_leaked_emails'] = parsed['meta']['results']
        for i in range(len(email_lists)):
            hunter_result['email_lists'].append(email_lists[i]['value'])

        return hunter_result
    except:
        hunter_result['email_lists'] = []
        hunter_result['total_leaked_emails'] = 0
        return hunter_result
