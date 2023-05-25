import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constant/styles";
import { getFormatedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpensesItem({ id, desc, amount, date }) {
  const navigation = useNavigation();

  const expensesItemHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id });
  };

  return (
    <Pressable
      onPress={expensesItemHandler}
      style={({ pressed }) => [styles.expenseItem,pressed && styles.pressed]}
    >
      {/* <View style={styles.expenseItem}> */}
      <View>
        <Text style={[styles.textBase, styles.desc]}>{desc}</Text>
        <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
      </View>
      <View style={styles.amountCtn}>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      {/* </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  expenseItem: {
    backgroundColor: GlobalStyles.colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    padding: 12,
    marginVertical: 8,
  },
  textBase: {
    color: GlobalStyles.colors.primary100,
  },
  desc: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountCtn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 100,
  },
  amount: {
    color: GlobalStyles.colors.primary600,
    fontWeight: "bold",
  },
});

export default ExpensesItem;
