import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesCtx } from "../store/expensesCtx";

function AllExpenses() {
    const {expenses} = useContext(ExpensesCtx)
    return (<ExpensesOutput expenses={expenses} fallbackText='No registered expenses found' expensesPeriod='Total'/>)
}

export default AllExpenses