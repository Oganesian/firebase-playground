import budgetIcon from './assets/checklist.png'
import rouletteIcon from './assets/bet.png'
import './App.css'
import { Routes, Route, Link } from 'react-router'
import RouletteApp from './recipes_roulette/RouletteApp'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roulette" element={<RouletteApp />} />
      </Routes>
    </>
  )
}

function Home() {
  return <div>
    <Link to="/roulette">
      <img src={rouletteIcon} className="logo" alt="Roulette Icon" />
    </Link>
    <Link to="/budget">
      <img src={budgetIcon} className="logo" alt="Budget Icon" />
    </Link>
  </div>;
}

export default App
