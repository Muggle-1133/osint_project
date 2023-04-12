import sys
import virustotal_api
import netcraft_crawl
import io
import json
import asyncio

async def async_task_1(value):
    netcraft_result = netcraft_crawl.netcraft_search(value)
    return netcraft_result
async def async_task_2(value):
    virustotal_result = virustotal_api.virus_search(value)
    return virustotal_result

async def osint_search(input_value):
    try:
        task1 = asyncio.create_task(async_task_1(input_value))
        task2 = asyncio.create_task(async_task_2(input_value))

        task1_result = await task1
        task2_result = await task2
        
        res = {
            **task1_result,
            **task2_result
        }
        
        print(json.dumps(res))
        sys.stdout.flush()

    except Exception as e:
        print("Error: %s" %e)
        sys.exit(1)

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

asyncio.run(osint_search(sys.argv[1]))
