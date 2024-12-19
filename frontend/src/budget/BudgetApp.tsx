import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, /* addDoc */ } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Expense } from './expenses';
import './styles.css'
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
const db = getFirestore(app);

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totals, setTotals] = useState({ paid: 0, remaining: 0 });
  /* const [newExpense, setNewExpense] = useState({ name: '', amount: 0, day: 1, isPaid: false }); */

  useEffect(() => {
    const fetchExpenses = async () => {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      const expensesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          amount: data.amount,
          day: data.day,
          isPaid: data.isPaid,
        };
      });
      const currentDayOfMonth = new Date().getDate();
      expensesData.forEach(expense => expense.isPaid = expense.day < currentDayOfMonth);
      expensesData.sort((a, b) => a.day - b.day);
      setExpenses(expensesData);
      const totalPaid = expensesData.filter(expense => expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
      const totalSum = expensesData.reduce((sum, expense) => sum + expense.amount, 0);
      setTotals({ paid: totalPaid, remaining: totalSum - totalPaid });
    };

    fetchExpenses();
  }, []);

  const handleCheckboxChange = async (id: string, isPaid: boolean) => {
    const expenseDoc = doc(db, 'expenses', id);
    await updateDoc(expenseDoc, { isPaid: !isPaid });
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, isPaid: !isPaid } : expense
      )
    );

    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, isPaid: !isPaid } : expense
    );
    const totalPaid = updatedExpenses.filter(expense => expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
    const totalSum = updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotals({ paid: totalPaid, remaining: totalSum - totalPaid });
  };

  /*   const handleAddExpense = async (e: React.FormEvent) => {
      e.preventDefault();
      const docRef = await addDoc(collection(db, 'expenses'), newExpense);
      setExpenses([...expenses, { ...newExpense, id: docRef.id }]);
      setNewExpense({ name: '', amount: 0, day: 1, isPaid: false });

          const totalPaid = [...expenses, newExpenseWithId].filter(expense => expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
    const totalSum = [...expenses, newExpenseWithId].reduce((sum, expense) => sum + expense.amount, 0);
    setTotals({ paid: totalPaid, remaining: totalSum - totalPaid });
    }; */

  return (
    <div style={{ padding: '20px', fontSize: '16px' }}>
      <h1>Monthly Budget</h1>
      {/*       <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Day"
          value={newExpense.day}
          onChange={(e) => setNewExpense({ ...newExpense, day: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
          required
        />

        <button type="submit">Add Expense</button>
      </form> */}
      <div className="expenses-container">
        {expenses.map((expense) => (
          <div key={expense.id} className='expense'>
            <div className='checkbox-label'>
              <div className="checkbox-wrapper">
                <input
                  className="inp-cbx"
                  id={`cbx-${expense.id}`}
                  type="checkbox"
                  checked={expense.isPaid}
                  onChange={() => handleCheckboxChange(expense.id, expense.isPaid)}
                  style={{ display: "none" }}
                />
                <label className="cbx" htmlFor={`cbx-${expense.id}`}>
                  <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                  </span>
                  <span>{expense.name}</span>
                </label>
              </div>
            </div>
            <div>{expense.amount}</div>
          </div>
        ))}
        <div className='expense'>
          <p>Total Paid: {totals.paid} €</p>
          <p>Remaining: {totals.remaining} €</p>
        </div>
      </div>

    </div>
  );
}

export default App;
