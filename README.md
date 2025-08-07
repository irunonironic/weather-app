
### 🌤️ Weather App

 It provides a comprehensive set of real-time environmental and astronomical data.

## 🚀 Live Links

  - Frontend: [weather-app Vercel](https://weather-app-neon-xi-82.vercel.app/)
 

-----

## 📦 Tech Stack

  - **Frontend:** React, Vite, Tailwind CSS, Axios
  - **Backend:** Node.js, Express.js, MongoDB, Mongoose
  - **Middleware:** `express-rate-limit`, `node-cache`, CORS
  - **APIs:** OpenWeatherMap, Astronomy API, etc.
  - **Deployment:** Vercel (frontend) + Render (backend)

-----

## ⚙️ Features

  - Search weather for any location
  - View current weather & 5-day forecast
  - Get Air Quality Index (AQI), UV Index, and Pollen Count
  - Access astronomical data (moon phase, sunrise/sunset)
 

-----

## 🛠️ Running Locally

### 1\. Clone the project

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2\. Backend Setup

```bash
cd backend
npm install
# Create a .env file with your API keys and MongoDB URI
# Example .env:
# PORT=8000
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# OPENWEATHER_API_KEY=your_openweathermap_api_key
# ASTRONOMY_API_ID=your_astronomy_api_id
# ASTRONOMY_API_SECRET=your_astronomy_api_secret
npm run dev
```

### 3\. Frontend Setup

```bash
cd ../frontend
npm install
# Create a .env file with your backend API URL
# Example .env:
# VITE_API_BASE_URL=http://localhost:8000/api
npm run dev
```
