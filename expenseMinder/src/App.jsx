import { useState } from 'react';
import './App.css';

function App() {
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [spent, setSpent] = useState(0);
  const [expense, setExpense] = useState('');
  const [price, setPrice] = useState('');
  const [expenseList, setExpenseList] = useState([]);
  const [budgetInput, setBudgetInput] = useState('');

  function TotalBudget() {
    return (
      <div className="amount">
        <div className="track budget">Total Budget: Rs.{total}</div>
        <div className="track remains">Remaining: Rs.{remaining}</div>
        <div className="track spent">Spent so far: Rs.{spent}</div>
      </div>
    );
  }

  const handleBudgetChange = (e) => {
    setBudgetInput(e.target.value);
  };

  const setUserBudget = () => {
    const budgetAmount = parseFloat(budgetInput);
    if (!isNaN(budgetAmount) && budgetAmount > 0) {
      setTotal(budgetAmount);
      setRemaining(budgetAmount);
      setSpent(0);
      setBudgetInput('');
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'expense') {
      setExpense(value);
    } else if (name === 'price') {
      setPrice(value);
    }
  }

  function handleAddExpense(e) {
    e.preventDefault();
    const priceAmount = parseFloat(price);
    if (!isNaN(priceAmount) && priceAmount > 0 && remaining >= priceAmount) {
      const newExpense = { expense, price: priceAmount };
      setExpenseList([...expenseList, newExpense]);
      setRemaining(remaining - priceAmount);
      setSpent(spent + priceAmount);
      setPrice('');
      setExpense('');
    }
  }

  const handleDelete = (index) => {
    const deletedItem = expenseList[index];
    const updatedList = expenseList.filter((_, i) => i !== index);
    setExpenseList(updatedList);
    setRemaining(prevRemaining => prevRemaining + deletedItem.price);
    setSpent(prevSpent => prevSpent - deletedItem.price);
  };

  return (
    <>
      <h1>ExpenseTracker</h1>
      <div className="budget-input-container">
        <div className="budget-input">
          <input
            type="number"
            placeholder="Enter your total budget"
            value={budgetInput}
            onChange={handleBudgetChange}
          />
          <button className="set-budget" onClick={setUserBudget}>Set Budget</button>
        </div>
      </div>
      <TotalBudget />
      <div className="outer">
        <div className="main">
          <input
            type="text"
            placeholder="Add Your Expense"
            name="expense"
            value={expense}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={handleChange}
          />
          <button className="add" onClick={handleAddExpense}>Add</button>
        </div>
        <ItemsList expenseList={expenseList} handleDelete={handleDelete} />
      </div>
    </>
  );
}

function ItemsList({ expenseList, handleDelete }) {
  return (
    <table id="list">
      <thead>
        <tr>
          <th id="head">Expense</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenseList.map((item, index) => (
          <tr key={index}>
            <td>{item.expense}</td>
            <td>{item.price}</td>
            <td>
              <button id="del" onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
