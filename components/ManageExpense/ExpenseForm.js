import { View, StyleSheet, Text, Alert } from "react-native";
import Button from "../UI/Button";
import { useState } from "react";
import Input from "./Input";
import { getFormatedDate2, getFormatedDate } from "../../utils/date";
import { GlobalStyles } from "../../constant/styles";
function ExpenseForm({ onCancel, onSubmit, submitBtnLabel, editValue }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: editValue ? editValue.amount.toString() : "",
      // isValid: editValue ? true : false,
      isValid: true,
    },
    // .toISOString is able to convert date object
    // getFormatedDate2 or getFormatedDate is same because it still be converted in expenseItem
    date: {
      value: editValue ? getFormatedDate2(editValue.date) : "",
      // isValid: !!editValue,
      isValid: true
    },
    desc: {
      value: editValue ? editValue.desc : "",
      isValid: true
    },
  });
  const inputHandler = (inputId, value) => {
    setInputs((current) => {
      return {
        // targeting value inputId must have the [] to set value dynamically
        ...current,
        [inputId]: { value: value, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      desc: inputs.desc.value,
    };

    // these will return Boolean
    const validAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const validDate = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.desc.trim().length > 0;

    if (!validAmount || !validDate || !descriptionIsValid) {
      setInputs((current) => {
        return {
          amount: { value: current.amount.value, isValid: validAmount },
          date: { value: current.date.value, isValid: validDate },
          desc: { value: current.desc.value, isValid: descriptionIsValid },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.desc.isValid

  return (
    <View style={styles.formStyle}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        {/* textInputConnfig must return object! */}
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            // value of the onchange will be passed automatically by default by react native as second parameter
            onChangeText: inputHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.desc.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "sentences",
          onChangeText: inputHandler.bind(this, "desc"),
          value: inputs.desc.value,
        }}
      />
      {formIsValid && <Text style={styles.errorText}>Please write valid data to the input</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 21,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error,
    marginBottom: 12,
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

export default ExpenseForm;
