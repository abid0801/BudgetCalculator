import './App.css';

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

import React, { useState, useEffect } from "react";


// const initialExpenses = [

//   {id:uuidv4(),charge:"rent",amount:1600},
//   {id:uuidv4(),charge:"car payment",amount:400},
//   {id:uuidv4(),charge:"credit card bill",amount:1200}

// ];
const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem("expenses")) : [];


function App() {
  const checkExpenses = (expenseArr) => {
    if (expenseArr.length === 0) {
      return 0;
    }

    return expenseArr[expenseArr.length - 1].id;
  };

  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(0);
  const [lastID, setLastID] = useState(0);

  useEffect(() => {
    localStorage.setItem("lastID", lastID);
  }, [lastID]);

  useEffect(() => {
    setLastID(checkExpenses(expenses));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


  const handleCharge = e => {
    setCharge(e.target.value);

  };

  const handleAmount = e => {
    let tempAmount = e.target.value;
    setAmount(tempAmount);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);

  };

  const idIncrement = (id) => {
    // setID(id + 1);
    return id + 1;
  };


  const handleSubmit = e => {
    e.preventDefault();
    // console.log(id, charge, amount);
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;

        });
        handleAlert({ type: "success", text: "Item Edited" });
        setExpenses(tempExpenses);
        setEdit(false);
      }
      else {
        const singleExpense = { id: idIncrement(lastID), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item Added" });
      }

      setCharge("");
      setAmount("");
    }
    else {
      handleAlert({ type: "danger", text: `Charge can't be empty and amount has to be bigger than zero` });
    }

  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "Cleared All item" });

    // console.log("cleared all items");
  };
  const handleDelete = id => {
    // console.log(`item deleted: ${id}`);
    let tempExpenses = expenses.filter(item => item.id !== id);
    // console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setID(id);
    // console.log(expense);
  };




  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1> Budget Calculator </h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :
     <span className="total">

          $ {expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount));

      }, 0)}
        </span>
      </h1>

    </>

  );
}

export default App;