import { useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpensesCtx } from "../store/expensesCtx";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/Error";

function ManageExpense({ route, navigation }) {
  // params? will help if the value is undefined
  const editedExpenseId = route.params?.expenseId;
  // !! convert value into boleean
  
  const isEditing = !!editedExpenseId;

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesCtx);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const removeHandler = async () => {
    setLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      // you dont need to add set loading false because the app will navigate back
      navigation.goBack();
    } catch (err) {
      setError("Could not delete, please try again later!");
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (err) {
      setError('Could not send data, please try again later')
      setLoading(false)
    }
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error}/>;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
