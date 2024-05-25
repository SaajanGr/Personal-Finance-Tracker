import React, { useEffect } from "react";
import { useState } from "react";
import { IncomeCategory } from "../../helpers/ArrOfCaregory";
import {
  getAllAmout,
  getOperation,
  sumAmountTypes,
} from "../../helpers/getOperations";
import { PieChart } from "../PieChart/PieChart";

/*
  Component to show the income of the user in a pie chart 
  @param operations: Array. Array with the operations of the user
  @returns {Object} - Component to show the income of the user in a pie chart
*/
const Income = ({ operations }) => {
  // State to save the amount of the categories of the income of the user
  const [categoryAmount, setCategoryAmount] = useState([]);
  const [sumAmout, setSumAmout] = useState();

  const [categories, setCategories] = useState([]);

  // Get the income of the user and the total amount of the income
  useEffect(() => {
    const getOperationType = async () => {
      const result = await getOperation("income", operations);

      const resultSum = await sumAmountTypes("income", operations);

      setSumAmout(resultSum);
      setCategoryAmount(result);
    };

    getOperationType();
  }, [operations]);

  // Get the amount of the categories of the income of the user
  useEffect(() => {
    const getCategoriesAmount = async () => {
      const salary = getAllAmout("salary", categoryAmount);
      const interest = getAllAmout("interest", categoryAmount);
      const gift = getAllAmout("gift", categoryAmount);
      const others = getAllAmout("others", categoryAmount);

      setCategories([salary, interest, gift, others]);
    };

    getCategoriesAmount();
  }, [categoryAmount]);

  // Pie chart for the income of the user
  return (
    <div>
      <PieChart
        sumAmount={sumAmout}
        categories={categories}
        type={IncomeCategory}
      />
    </div>
  );
};

export default Income;
