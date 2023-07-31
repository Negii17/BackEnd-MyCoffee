const jwt = require("jsonwebtoken");

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
    // verification Token

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

    // End verification Token
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      status: "fail",
      message: "Error catch Authmiddleware",
    });
  }
};
