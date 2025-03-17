# 🪙 Crypto Market Price(Top 20 Cryptocurrencies) App

A full-stack application that displays real-time cryptocurrency prices using the [CoinGecko API](https://www.coingecko.com/en/api).  
Built with Flask (Python) on the backend and React on the frontend.

---

## 🔧 Tech Stack

- **Frontend**: React, Axios, Tailwind CSS (optional)
- **Backend**: Flask (Python 3.13+), Requests, Flask-CORS
- **API**: CoinGecko Public API

---

## 🚀 Getting Started

### 📁 Project Structure


---

## ⚙️ Backend Setup (Flask)

1. **Navigate to backend folder**:

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt

pip install flask flask-cors requests

python app.py
```

By default, the server runs at:
http://127.0.0.1:5004

2. **Navigate to frontend folder**:

```bash
cd frontend
npm install
npm start
```
React app will run on:
http://localhost:3000

🔄 **API Endpoint**:

```bath
GET /api/coins
```

🛡️ **Notes**:

** Make sure the backend is running before starting the frontend.
** If you face CORS issues, ensure flask-cors is installed and used in app.py:

from flask_cors import CORS
CORS(app)

**The API may occasionally return a 429 Too Many Requests error. This is due to rate limiting by CoinGecko. You can cache results on the server to reduce API calls.

📦 Optional: requirements.txt

```bash
pip freeze > requirements.txt
```

📬 Contact
Built with ❤️ by [Samuel]
Feel free to reach out or contribute!


Let me know if you want to include screenshots, deployment instructions (like Netlify + Render), or Docker setup — happy to help!

