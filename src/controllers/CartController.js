const { v4: uuidv4 } = require("uuid");
const { Cart: cartModel, Product: productModel } = require("../../models");

exports.getDataCart = async (req, res) => {
  try {
    // return res.send({
    //   data: req.user,
    // });
    const userDecode = req.user;
    const dataCart = await cartModel.findAll({
      include: [
        {
          model: productModel,
        },
      ],
      where: {
        userId: userDecode.id,
      },
    });

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
exports.reduceQtyProduct = async (req, res) => {
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
      // Kurangi kuantitas item dalam keranjang
      const newQty = cartById.qty - 1;

      if (newQty >= 1) {
        // Jika kuantitas masih lebih dari atau sama dengan 1, update kuantitas
        await cartModel.update(
          {
            qty: newQty,
          },
          {
            where: {
              id: cartById.id,
            },
          }
        );
      } else {
        // Jika kuantitas kurang dari 1, hapus item dari keranjang
        await cartModel.destroy({
          where: {
            id: cartById.id,
          },
        });
      }
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

// exports.reduceQtyDataCart = async (req, res) => {
//   try {
//     const idParam = req.params.idparam;

//     const cartById = await cartModel.findOne({
//       where: {
//         id: idParam,
//       },
//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//     });
//     if (!cartById) {
//       return res.status(400).send({
//         status: "fail",
//         message: `Data dengan Id: ${idParam} tidak ditemukan`,
//       });
//     }

//     const addQty = await cartModel.update(
//       {
//         qty: cartById.qty - 1,
//       },
//       {
//         where: {
//           id: cartById.id,
//         },
//       }
//     );
//     if (!addQty) {
//       return res.status(400).send({
//         status: "fail",
//         message: "reduce Qty Fail",
//       });
//     }

//     return res.send({
//       status: "success",
//       message: "reduce Qty success",
//       qty: cartById.qty,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       status: "fail",
//       message: "Error Catch",
//     });
//   }
// };

exports.deleteDataCart = async (req, res) => {
  try {
    const idParam = req.params.idparam;

    const dataCartById = await cartModel.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataCartById) {
      return res.status(400).send({
        status: "fail",
        message: `Data dengan Id: ${idParam} tidak ditemukan`,
      });
    }

    const deleteProduct = await cartModel.destroy({
      where: {
        id: idParam,
      },
    });
    if (!deleteProduct) {
      return res.status(400).send({
        status: "fail",
        message: "Delete Data Cart Fail",
      });
    }
    return res.send({
      status: "success",
      message: "Delete Data Cart Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};
