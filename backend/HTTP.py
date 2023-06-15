from flask import Flask, jsonify, request
import requests
import json
import asyncio

app = Flask(__name__)

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')
    loop = asyncio.get_event_loop()
    tasks = [fetch_url(url) for url in urls]
    responses = loop.run_until_complete(asyncio.gather(*tasks))
    merged_numbers = merge_unique_numbers(responses)
    return jsonify({"numbers": merged_numbers})

async def fetch_url(url):
    try:
        response = await asyncio.wait_for(requests.get(url), timeout=0.5)
        if response.status_code == 200:
            data = response.json()
            return data.get("numbers", [])
    except asyncio.TimeoutError:
        pass
    except:
        pass
    return []

def merge_unique_numbers(responses):
    merged_numbers = set()
    for numbers in responses:
        merged_numbers.update(numbers)
    return sorted(merged_numbers)

if __name__ == '__main__':
    app.run(port=8008)
