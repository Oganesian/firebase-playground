import reactLogo from './assets/react.svg'
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
      <img src={rouletteIcon} className="logo" alt="Roulette logo" />
    </Link>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
  </div>;
}

export default App
