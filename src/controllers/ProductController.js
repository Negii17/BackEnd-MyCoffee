const joi = require("joi");
const { Product: ProductModel } = require("../../models");

exports.addDataProduct = async (req, res) => {
  try {
    const dataInput = req.body;

    // validasi imput
    const validationInput = joi.object({
      id: joi.string().required(),
      productName: joi.string().required().min(5),
      price: joi.number().integer().required(),
      stocks: joi.number().integer().required(),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // end validasi imput

    // check Produck Already exist
    const productById = await ProductModel.findOne({
      where: {
        id: dataInput.id,
      },
    });
    if (productById) {
      return res.status(400).send({
        status: "fail",
        message: `product ${dataInput.id} already exist`,
      });
    }

    const productByProductName = await ProductModel.findOne({
      where: {
        productName: dataInput.productName,
      },
    });
    if (productByProductName) {
      return res.status(400).send({
        status: "fail",
        message: `product ${dataInput.productName} already exist`,
      });
    }
    // end check Produck Already exist

    // insert data kedatabase
    const insertToDataBase = await ProductModel.create({
      id: dataInput.id,
      productName: dataInput.productName,
      price: dataInput.price,
      stocks: dataInput.stocks,
    });
    if (!insertToDataBase) {
      return res.status(400).send({
        status: "fail",
        message: "Add Data Product Fail",
      });
    }

    return res.send({
      status: "success",
      message: "Add Data Product Success",
      dataInput: dataInput,
    });
    // end insert data kedatabase
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};

exports.getDataProducts = async (req, res) => {
  try {
    const dataProduct = await ProductModel.findAll();

    if (dataProduct.length <= 0) {
      return res.status(400).send({
        response: "fail",
        message: "Data Products Kosong",
        data: [],
      });
    }

    return res.send({
      status: "success",
      message: "Get Data Product Success",
      data: dataProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};

exports.getDataProductById = async (req, res) => {
  try {
    const idParam = req.params.idparam;
    const dataProductById = await ProductModel.findOne({
      where: {
        id: idProduct,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataProductById) {
      return res.status(400).send({
        status: "fail",
        message: `Data dengan Id: ${idParam} tidak ditemukan`,
      });
    }
    return res.send({
      status: "success",
      message: "Get Data Product Success",
      data: dataProductById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};

exports.updateDataProduct = async (req, res) => {
  try {
    const idParam = req.params.idparam;
    // const { idparams } = req.params;
    const dataInputUpdate = req.body;
    // const { body } = req;

    const validationInput = joi.object({
      stocks: joi.number().required().min(1),
    });
    const validationError = validationInput.validate(dataInputUpdate).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }

    const dataProductById = await ProductModel.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataProductById) {
      return res.status(400).send({
        status: "fail",
        message: `Data dengan Id: ${idParam} tidak ditemukan`,
      });
    }
    const updateData = await ProductModel.update(
      {
        stocks: dataInputUpdate.stocks,
      },
      {
        where: {
          id: idParam,
        },
      }
    );
    if (!updateData) {
      return res.status(400).send({
        status: "fail",
        message: "Update Data Fail",
      });
    }

    return res.send({
      status: "success",
      message: "Update Data Product Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};

exports.deleteDataProduct = async (req, res) => {
  try {
    const idParam = req.params.idparam;

    const dataProductById = await ProductModel.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataProductById) {
      return res.status(400).send({
        status: "fail",
        message: `Data dengan Id: ${idParam} tidak ditemukan`,
      });
    }

    const deleteProduct = await ProductModel.destroy({
      where: {
        id: idParam,
      },
    });
    if (!deleteProduct) {
      return res.status(400).send({
        status: "fail",
        message: "Delete Data Product Fail",
      });
    }
    return res.send({
      status: "success",
      message: "Delete Data Product Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};
