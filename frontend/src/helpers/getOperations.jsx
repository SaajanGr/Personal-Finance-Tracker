
/*
  This function receives the type of operation and the operations of the user. 
  It filters the operations by the type and returns the sum of the amounts of the operations.
  @param {String} type - Type of operation
  @param {Array} operations - Array with the operations of the user
  @returns {Number} - Sum of the amounts of the operations
*/
export const sumAmountTypes = async (type, operations) => {
  // Filter the operations by the type
  const filterOperType = await operations.filter(
    (e) => e.type.toString().toLowerCase() === type.toString().toLowerCase()
  );

  // Get the amount of the operations
  const amount = filterOperType?.map((pro) => pro.amount);

  // Sum the amounts of the operations
  const reduceAmount = amount.reduce(
    (acc, currentAmount) => acc + Number(currentAmount),
    0
  );

  return reduceAmount;
};

/*
  This function receives the type of operation and the operations of the user. 
  It filters the operations by the type and returns the categories of the operations.
  @param {String} type - Type of operation
  @param {Array} operations - Array with the operations of the user
  @returns {Array} - Array with the categories of the operations
*/
export const getOperation = async (type, operations) => {
  // Filter the operations by the type
  const filterOperType = await operations.filter(
    (e) => e.type.toString().toLowerCase() === type.toString().toLowerCase()
  );

  // Get the categories of the operations
  const category = filterOperType?.map((pro) => {
    const amount = pro.amount;
    const category = pro.category;

    const amountCateg = { amount, category };

    return amountCateg;
  });

  // group the categories
  const groupByCategory = await category.reduce((group, product) => {
    const { category } = product;

    // If the category does not exist, create it
    group[category] = group[category] ?? [];

    const p = Number(product.amount);

    // Add the amount to the category
    group[category].push(p);

    return group;
  }, {});

  // Push each category into a new array and add the amounts of the categories
  const arrWithSumCategories = [];

  // Sum the amounts of the categories
  for (let key in groupByCategory) {
    const sumCategory = () => {
      const ammount = groupByCategory[key].reduce(
        (acc, currentAmount) => acc + currentAmount,
        0
      );

      // Create an object with the category and the amount
      const categAmount = {
        [key]: ammount,
      };

      return categAmount;
    };

    const sum = sumCategory();

    arrWithSumCategories.push(sum);
  }

  return arrWithSumCategories;
};


// get the categories of the operations already grouped by type and category and return the amounts
export const getAmountCategories = (type, category) => {
  const shop = category.filter(
    (e) =>
      Object.keys(e).toString().toLowerCase().split(" ")[0] ===
      type.toString().toLowerCase()
  );

  const value = shop.map((e) => Object.values(e));

  return value;
};

// get the total amount of the categories
export const getAllAmout = (type, category) => {
  let objCategory = [];

  const categ = getAmountCategories(type, category);
  categ.map((e) => objCategory.push(Object.values(e)));

  return objCategory.length > 0 ? objCategory[0][0] : 0;
};
