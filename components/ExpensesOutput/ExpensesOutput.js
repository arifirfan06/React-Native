import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constant/styles";


function ExpensesOutput({ fallbackText,expenses, expensesPeriod }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses}/>
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.bgAlt50,
    },
    infoText: {
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 32,
    }
});

export default ExpensesOutput;
