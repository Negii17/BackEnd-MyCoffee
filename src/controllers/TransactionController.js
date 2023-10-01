const { Transaction = transactionModel } = require("../../models/transaction");

exports.getDataTransaction = async (req, res) => {
  try {
    const dataTransaction = await transactionModel.findAll({});
  } catch (error) {
    console.log(error);
  }
};
