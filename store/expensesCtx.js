import { createContext, useReducer } from "react";

const sample_data = [
    {
      id: "e1",
      desc: "A pair of shoes",
      amount: 100000,
      date: new Date("2023-5-15"),
    },
    {
      id: "e2",
      desc: "A pair of glases",
      amount: 200000,
      date: new Date("2023-5-15"),
    },
    {
      id: "e3",
      desc: "Game Console",
      amount: 40100000,
      date: new Date("2023-2-11"),
    },
    {
      id: "e4",
      desc: "Game Cardridge",
      amount: 300000,
      date: new Date("2021-5-11"),
    },
  ];

export const ExpensesCtx = createContext({
  expenses: [],
  addExpense: ({ desc, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id,{ desc, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD": 
    const id = new Date().toString() + Math.random().toString();
    return [{...action.payload, id: id},...state]
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
  const [expensesState, dispatch] = useReducer(expensesReducer, sample_data);
  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense,
    updateExpense
  };

  return <ExpensesCtx.Provider value={value}>{children}</ExpensesCtx.Provider>;
};

export default ExpensesProvider;
