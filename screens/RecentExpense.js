import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesCtx } from "../store/expensesCtx";
import { getDateMinusDays } from "../utils/date";

function RecentExpense() {
    const {expenses} = useContext(ExpensesCtx)
    const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7)
        return (expense.date >= date7daysAgo) && (expense.date <= today)
    })
    return (<>
    <ExpensesOutput expenses={recentExpenses} fallbackText='No expenses registered in the last 7 days' expensesPeriod={'last 7 Days'}/>
    </>)
}

export default RecentExpense