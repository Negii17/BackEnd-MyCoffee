const joi = require("joi");
const { User: UserModel } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const dataInput = req.body;

    // validasi input
    const validationInput = joi.object({
      email: joi.string().required().min(5).email(),
      userName: joi.string().required().min(5),
      fullName: joi.string().required().min(3),
      password: joi.string().required().min(3),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // end validasi input

    // check email already exist
    const userByEmail = await UserModel.findOne({
      where: {
        email: dataInput.email,
      },
    });
    if (userByEmail) {
      return res.status(400).send({
        status: "fail",
        message: `user with email: ${dataInput.email} already exist`,
      });
    }
    // end check email already exist

    // insert to database
    const insertToDataBase = await UserModel.create({
      id: uuidv4(),
      username: dataInput.userName,
      email: dataInput.email,
      fullname: dataInput.fullName,
      password: await bcrypt.hash(dataInput.password, 10),
      level: "costumer",
    });
    if (!insertToDataBase) {
      return res.status(400).send({
        status: "fail",
        message: `register fail`,
      });
    }
    // end insert to database

    return res.send({
      status: "success",
      message: `Register succes`,
      data: dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: `Error Catch`,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const dataInput = req.body;

    // validasi input
    const validationInput = joi.object({
      email: joi.string().required().min(5).email(),
      password: joi.string().required().min(3),
    });
    const validationError = validationInput.validate(dataInput).error;
    console.log(validationError);
    if (validationError) {
      return res.status(500).send({
        status: "fail",
        message: validationError.details[0].message,
      });
    }
    // End validasi input

    // Check Email Already
    const userByEmail = await UserModel.findOne({
      where: {
        email: dataInput.email,
      },
    });

    if (userByEmail === false) {
      return res.status(400).send({
        status: "fail",
        message: "Email or password fail",
      });
    }

    // compare password
    const compare = await bcrypt.compare(
      dataInput.password,
      userByEmail.password
    );
    if (compare === false) {
      return res.status(400).send({
        status: "fail",
        message: "Email or password fail",
      });
    }
    // End compare password

    // make Token
    const token = jwt.sign(
      {
        id: userByEmail.id,
      },
      "adwaefade-12-dawodkow-1adasqw"
    );
    // End make Token

    return res.send({
      status: "succes",
      message: "Login succes",
      data: {
        username: userByEmail.username,
        email: userByEmail.email,
        fullname: userByEmail.fullname,
        level: userByEmail.level,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "error catch",
    });
  }
};

// Check Token
exports.checktoken = async (req, res) => {
  try {
    const decodeUser = req.user;
    const dataUser = await UserModel.findOne({
      where: {
        id: decodeUser.id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    if (!dataUser) {
      return res.status(500).send({
        status: "fail",
        message: "User not found",
      });
    }
    return res.send({
      status: "success",
      message: "Check token success",
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "fail",
      message: "Error catch Token",
    });
  }
};
// End Check Token
