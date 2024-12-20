import budgetIcon from './assets/checklist.png'
import rouletteIcon from './assets/bet.png'
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Routes, Route, Link } from 'react-router';
import RouletteApp from './recipes_roulette/RouletteApp';
import BudgetApp from './budget/BudgetApp';
import './App.css';

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState<null | User>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
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
        <Route path="/" element={<Home handleSignOut={handleSignOut} />} />
        <Route path="/roulette" element={<RouletteApp />} />
        {isAdmin && <Route path="/budget" element={<BudgetApp />} />}
        {!isAdmin && <Route path="/budget" element={<h2>You don't have access to this part of the application</h2>} />}
      </Routes>
    </>
  );
}

function Home({ handleSignOut }: { handleSignOut: () => void }) {
  return (
    <div>
      <Link to="/roulette">
        <img src={rouletteIcon} className="logo" alt="Roulette Icon" />
      </Link>
      <Link to="/budget">
        <img src={budgetIcon} className="logo" alt="Budget Icon" />
      </Link>

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;