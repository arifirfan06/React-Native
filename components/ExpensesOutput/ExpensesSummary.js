import { View, Text, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constant/styles"

function ExpensesSummary({periodName, expenses}) {
    const expensesSum = expenses.reduce((sum, item) => {
        return sum + item.amount
    }, 0)
    return (<View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>Rp.{expensesSum.toFixed(2)}</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.accent500,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary600
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary600,
    }
})

export default ExpensesSummary