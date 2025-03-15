# 📈 Bitcoin Price Candlestick Chart (Live)

This project is a **live Bitcoin candlestick chart** built with **React** and **D3.js**. It fetches real-time data from the CoinCap API and visualizes Bitcoin price changes over time using candlesticks.

---

## 🚀 Features

✅ Live updates every 60 seconds using real-time data from CoinCap API.  
✅ Candlestick representation of open, high, low, and close prices.  
✅ Clean and responsive design using **D3.js** and **React**.  
✅ Light and Dark themes with smooth toggling.  
✅ Scalable and customizable chart axes.

---

## 📂 Folder Structure

```
src/
├── components/
│   ├── CandlestickChart.jsx
├── App.jsx
├── index.jsx
└── styles.css
```

---

## 🛠️ Technologies Used

- **React** – For building the UI.
- **D3.js** – For data visualization.
- **Axios** – For making API calls.
- **CoinCap API** – For fetching real-time Bitcoin price data.
- **CSS** – For styling.

---

## 🌐 API Used

[CoinCap API](https://docs.coincap.io/)

- Endpoint:

```
https://api.coincap.io/v2/candles?exchange=poloniex&interval=m1&baseId=bitcoin&quoteId=usd
```

- Data Format:

```json
{
  "time": 1709931230000,
  "open": 48000.32,
  "high": 48100.21,
  "low": 47950.12,
  "close": 48030.1
}
```

---

## 📥 Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/bitcoin-candlestick-chart.git
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the app**:

```bash
npm run dev
```

---

## 🎯 Usage

1. Open the app in your browser:  
   ➡️ `http://localhost:3000`
2. Watch the chart update automatically every 60 seconds.
3. Toggle between **Light** and **Dark** modes.

---

## 🚧 Future Improvements

- 📊 Add volume bars below the candlesticks.
- 🚀 Improve performance for large datasets.
- 🎯 Add multiple currency options.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Submit a pull request

---

## 📃 License

This project is licensed under the **MIT License**.

---
