const { User: UserModel } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const dataUser = await UserModel.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    return res.send({
      status: "success",
      message: "get user succes",
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error catch",
    });
  }
};

exports.getUsersById = async (req, res) => {
  const userDecode = req.user;
  const userById = await UserModel.findOne({
    where: {
      id: userDecode.id,
    },
  });
  return res.send({
    status: "success",
    message: "get user by ID success",
    dataUser: userById,
  });
};

exports.updateDataUser = async (req, res) => {
  try {
    const idParam = req.params.idparam;
    const dataInputUpdate = req.body;

    // validasi input
    const validationInput = joi.object({
      fullName: joi.string().min(5),
      email: joi.string().min(5).email(),
    });
    const validationError = validationInput.validate(dataInputUpdate).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // end validasi input

    const dataProductById = await UserModel.findOne({
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
    const updateData = await UserModel.update(
      {
        fullname: dataInputUpdate.fullName,
        email: dataInputUpdate.email,
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
        message: "Update Fail",
      });
    }

    return res.send({
      status: "success",
      message: "Update Data Success",
      data: dataInputUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};
exports.updatePasswordUser = async (req, res) => {
  try {
    const idParam = req.params.idparam;
    const dataInputUpdate = req.body;

    // validasi input
    const validationInput = joi.object({
      password: joi.string().min(3),
    });
    const validationError = validationInput.validate(dataInputUpdate).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // end validasi input

    const dataUserById = await UserModel.findOne({
      where: {
        id: idParam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataUserById) {
      return res.status(400).send({
        status: "fail",
        message: `Data dengan Id: ${idParam} tidak ditemukan`,
      });
    }

    const updateData = await UserModel.update(
      {
        password: await bcrypt.hash(dataInputUpdate.password, 10),
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
        message: "Update Fail",
      });
    }

    return res.send({
      status: "success",
      message: "Update Data Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error Catch",
    });
  }
};
