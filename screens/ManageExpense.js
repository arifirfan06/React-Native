import { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpensesCtx } from "../store/expensesCtx";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  // params? will help if the value is undefined
  const editedExpenseId = route.params?.expenseId;
  // !! convert value into boleean
  const isEditing = !!editedExpenseId;

  const expensesCtx = useContext(ExpensesCtx);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const removeHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.ctn}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitBtnLabel={isEditing ? "Update" : "Add"}
        editValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteCtn}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error}
            size={32}
            onPress={removeHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.bgAlt100,
  },
  deleteCtn: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary600,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 130,
    marginHorizontal: 8,
  },
});

export default ManageExpense;
