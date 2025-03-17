from flask import Flask, jsonify
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

cache_data = None
cache_time = 0
CACHE_TTL = 60

@app.route('/api/coins')
def get_coins():
    global cache_data, cache_time

    if time.time() - cache_time < CACHE_TTL:
        return jsonify(cache_data)

    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "order": "market_cap_desc",
        "per_page": 20,
        "page": 1,
        "sparkline": False
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        cache_data = response.json()
        cache_time = time.time()
        return jsonify(response.json())
    except requests.exceptions.RequestException as err:
        print(f"Error fetching data: {err}")
        return jsonify({"error": str(err)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5004, use_reloader=False)
