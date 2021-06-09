import './App.css';

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from 'uuid'
const initialExpenses = [

  {id:uuid(),charge:"rent",amount:1600},
  {id:uuid(),charge:"car payment",amount:400},
  {id:uuid(),charge:"credit card bill",amount:1200}

];
console.log(initialExpenses);



function App() {
  return (
    <div>
   <Alert/>
   <ExpenseForm/>
   <ExpenseList/>
   </div>
   
  );
}

export default App;
