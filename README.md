# ⏱️ TimeTrace – Web Usage Analyzer

TimeTrace is a browser-based web usage tracking system that monitors the time spent on different websites and provides simple insights into browsing behavior.

---

## 🚀 Features

* ⏳ Tracks time spent on active websites
* 🌐 Captures domain-level browsing data
* 📊 Provides basic usage insights
* 🧠 Helps improve productivity and awareness
* 🧩 Built as a browser extension

---

## 🛠️ Tech Stack

* **Frontend / Extension:** JavaScript (Chrome Extension APIs)
* **Backend:** Python (Django)
* **Data Handling:** JSON / APIs

---

## 📂 Project Structure

```
TimeTrace/
│── extension/        # Chrome extension files
│── backend/          # Django backend
│── scripts/          # Data processing scripts
│── README.md
```

---

## ⚙️ How It Works

1. The extension tracks the active browser tab
2. It records time spent on each website
3. Data is sent to the backend
4. Backend processes and stores usage data
5. Insights are generated for the user

---

## 🧪 Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/nikudas25/TimeTrace.git
cd TimeTrace
```

### 2. Setup Backend (Django)

```
cd backend
pip install -r requirements.txt
python manage.py runserver
```

### 3. Load Extension in Chrome

* Go to `chrome://extensions/`
* Enable **Developer Mode**
* Click **Load Unpacked**
* Select the `extension/` folder

---

## 📸 Screenshots

*(Add screenshots here later — huge bonus for your portfolio)*

---

## 👨‍💻 Author

Built by **Ankit** 🚀
