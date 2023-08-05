const { User: UserModel } = require("../../models");

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
