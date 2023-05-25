import { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { ExpensesCtx } from "../store/expensesCtx";

function ManageExpense({ route, navigation }) {
  // params? will help if the value is undefined
  const editedExpenseId = route.params?.expenseId;
  // !! convert value into boleean
  const isEditing = !!editedExpenseId;

  const expensesCtx = useContext(ExpensesCtx);
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

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        desc: "Tablet",
        amount: 4900000,
        date: new Date("2023-5-16"),
      });
    } else {
      expensesCtx.addExpense({
        desc: "Books",
        amount: 40000,
        date: new Date("2023-2-16"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.ctn}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
    backgroundColor: GlobalStyles.colors.primary400,
  },
  deleteCtn: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
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
