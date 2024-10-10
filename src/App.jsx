import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StockOverviewPage from "./pages/StockOverviewPage.jsx";
import StockDetailPage from "./pages/StockDetailPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <main className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage/>} />
            <Route path="/detail/:symbol" element={<StockDetailPage/>} />
          </Routes>
        </BrowserRouter>
      </main>
  )
}

export default App
