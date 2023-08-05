const jwt = require("jsonwebtoken");

const { User: UserModel } = require("../../models");

exports.middleware = async (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(403).send({
        status: "fail",
        message: "Akses di tolak",
      });
    }

    const token = header.replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({
        status: "fail",
        message: "Token diperlukan",
      });
    }
    // verification Token middleware 1

    jwt.verify(token, "adwaefade-12-dawodkow-1adasqw", (error, decode) => {
      if (error) {
        return res.status(403).send({
          status: "fail",
          message: "Token tidak sesuai",
        });
      }
      // console.log(decode);
      req.user = decode;
      return next();
    });

    // End verification Token middleware 1
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      status: "fail",
      message: "Error catch Authmiddleware",
    });
  }
};

exports.middlewareWithLevel = (levels) => {
  return async (req, res, next) => {
    const userDecode = req.user;

    const userById = await UserModel.findOne({
      where: {
        id: userDecode.id,
      },
    });

    if (!userById) {
      return res.status(403).send({
        status: "fail",
        message: "Level Tidak Dibolehkan",
      });
    }

    const userLevel = userById.level;

    if (!levels.includes(userLevel)) {
      return res.status(403).send({
        status: "fail",
        message: "Akses Ditolak",
      });
    }

    // return res.status(403).send({
    //   status: "fail",
    //   message: "Akses Ditolak",
    //   userDecode: userDecode,
    //   user: userById,
    // });

    return next();
  };
};
