import { createContext, useReducer } from "react";

export const ExpensesCtx = createContext({
  expenses: [],
  addExpense: ({ desc, amount, date }) => {},
  setExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id,{ desc, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD": 
    // const id = new Date().toString() + Math.random().toString();
    return [action.payload,...state]
    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
    case "UPDATE":
        const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
        const updateableExpense = state[updateableExpenseIndex]
        const updatedItem = {...updateableExpense, ...action.payload.data}
        // this will make immutable or create new array
        const updatedExpenses = [...state];
        updatedExpenses[updateableExpenseIndex] = updatedItem;
        return updatedExpenses;
    case "DELETE":
        return state.filter((expense) => expense.id !== action.payload)
    default:
      return state;
  }
}

const ExpensesProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id, data: expenseData}});
  }
  function setExpense(expenses) {
    dispatch({type: 'SET', payload: expenses})
  }

  const value = {
    expenses: expensesState,
    setExpense,
    addExpense: addExpense,
    deleteExpense,
    updateExpense
  };

  return <ExpensesCtx.Provider value={value}>{children}</ExpensesCtx.Provider>;
};

export default ExpensesProvider;
