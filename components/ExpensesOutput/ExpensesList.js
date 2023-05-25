import { FlatList } from "react-native"
import { Text } from "react-native"
import ExpensesItem from "./ExpensesItem"

const renderedItem = (itemData) => {
    // return <Text>{itemData.item.desc}</Text>
    return <ExpensesItem {...itemData.item}/>
}

function ExpensesList({expenses}) {
    // you can add keyExtractror
    return(<FlatList data={expenses} renderItem={renderedItem}/>)
}

export default ExpensesList