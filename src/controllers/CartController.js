const { v4: uuidv4 } = require("uuid");
const { Cart: cartModel } = require("../../models");

exports.getDataCart = async (req, res) => {
  try {
    const dataCart = await cartModel.findAll();

    return res.send({
      status: "success",
      message: "Get Data Product Success",
      data: dataCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};

exports.addDataCart = async (req, res) => {
  try {
    const userDecode = req.user;
    const productId = req.body.productId;
    let insertOrUpdateToDataBase = null;

    const cartById = await cartModel.findOne({
      where: {
        userId: userDecode.id,
        productId: productId,
      },
    });
    if (cartById) {
      insertOrUpdateToDataBase = await cartModel.update(
        {
          qty: cartById.qty + 1,
        },
        {
          where: {
            id: cartById.id,
          },
        }
      );
    } else {
      insertOrUpdateToDataBase = await cartModel.create({
        id: uuidv4(),
        userId: userDecode.id,
        productId: productId,
        qty: 1,
      });
    }

    return res.send({
      status: "success",
      message: "Add Product to Cart Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};
