import budgetIcon from './assets/checklist.png'
import rouletteIcon from './assets/bet.png'
import './App.css'
import { Routes, Route, Link } from 'react-router'
import RouletteApp from './recipes_roulette/RouletteApp'
import BudgetApp from './budget/BudgetApp'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { useState, useEffect } from 'react'

const firebaseConfig = {
  apiKey: "AIzaSyCI-an0tALPy5XCMfvlcHHfahk3EQElX4E",
  authDomain: "habit-tracker-backend.firebaseapp.com",
  databaseURL: "https://habit-tracker-backend-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "habit-tracker-backend",
  storageBucket: "habit-tracker-backend.firebasestorage.app",
  messagingSenderId: "194503016492",
  appId: "1:194503016492:web:e2c74e40b5012b90b59189",
  measurementId: "G-8VTMEMXED7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };



  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Apps Catalog</h1>
        <button onClick={handleSignIn}>Sign in with Google</button>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roulette" element={<RouletteApp />} />
        <Route path="/budget" element={<BudgetApp />} />
      </Routes>
    </>
  )
}

function Home() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return <div>
    <Link to="/roulette">
      <img src={rouletteIcon} className="logo" alt="Roulette Icon" />
    </Link>
    <Link to="/budget">
      <img src={budgetIcon} className="logo" alt="Budget Icon" />
    </Link>

    <button onClick={handleSignOut}>Sign Out</button>
  </div>;
}

export default App
