import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesCtx } from "../store/expensesCtx";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/Error";

function RecentExpense() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { setExpense, expenses } = useContext(ExpensesCtx);
  // const [fetchedExpenses, setFetchExpenses] = useState([])
  // useEffect doesnt work in the same ways as in web because stack navigator
  useEffect(() => {
    async function getAllExpenses() {
      try {
        const expenses = await getExpenses();
        setExpense(expenses);
      } catch (err) {
        setError('Could not fetch your expenses')
      }
      setLoading(false);
    }
    getAllExpenses();
  }, []);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7daysAgo && expense.date <= today;
  });

  if (error && !isLoading) {
    return <ErrorOverlay message={error}/>
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ExpensesOutput
        expenses={recentExpenses}
        fallbackText="No expenses registered in the last 7 days"
        expensesPeriod={"last 7 Days"}
      />
    </>
  );
}

export default RecentExpense;
