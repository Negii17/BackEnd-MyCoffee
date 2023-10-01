const express = require("express");
const router = express.Router();
const {
  middleware,
  middlewareWithLevel,
} = require("../middleware/AuthMiddleware");

// AppMiddleware
const { upload } = require("../middleware/AppMiddleware");
// End AppMiddleware

// Product

const {
  addDataProduct,
  getDataProducts,
  getDataProductById,
  updateDataProduct,
  deleteDataProduct,
  cekFile,
} = require("../controllers/ProductController");
// End Product

const {
  register,
  login,
  checktoken,
} = require("../controllers/AuthController");

const {
  getUsers,
  getUsersById,
  updateDataUser,
  updatePasswordUser,
} = require("../controllers/UserController");

const {
  getDataCart,
  addDataCart,
  // reduceQtyDataCart,
  deleteDataCart,
  reduceQtyProduct,
} = require("../controllers/CartController");

router.post(
  "/adddataproduct",
  middleware,
  middlewareWithLevel(["owner"]),
  upload.single("img"),
  addDataProduct
);
// router.post("/adddataproduct-upload", upload.single("product"));
// router.post("/adddataproduct-upload", upload.single("product"), (req, res) => {
//   return res.send({
//     Response: "success",
//     message: "Upload Success",
//   });
// });
// router.post("/cekfile", upload.single("img"), cekFile);
router.get("/getdataproducts", getDataProducts);
router.get(
  "/getdataproductbyid/:idparam",
  middleware,
  middlewareWithLevel(["owner"]),
  getDataProductById
);
router.patch(
  "/updatedataproduct/:idparam",
  middleware,
  middlewareWithLevel(["owner"]),
  updateDataProduct
);
router.delete(
  "/deletedataproduct/:idparam",
  middleware,
  middlewareWithLevel(["owner"]),
  deleteDataProduct
);

router.get("/getdatacart", middleware, getDataCart);
router.post("/adddatacart", middleware, addDataCart);
router.post("/reduceqtyproduct", middleware, reduceQtyProduct);
// router.patch("/reduceqtycart/:idparam", middleware, reduceQtyDataCart);
router.delete("/deletecart/:idparam", middleware, deleteDataCart);

router.post("/register", register);
router.post("/login", login);
router.patch("/updatedatauser/:idparam", middleware, updateDataUser);
router.patch("/updatepassworduser/:idparam", middleware, updatePasswordUser);
router.get("/getuserbyid", middleware, getUsersById);
router.post("/avatar-upload", upload.single("avatar"));

router.get("/checktoken", middleware, checktoken);
router.get("/users", middleware, middlewareWithLevel(["owner"]), getUsers);
router.get(
  "/users-withlevel",
  middleware,
  middlewareWithLevel(["owner", "admin", "costumer"]),
  getUsers
);
router.get("/usersid", middleware, getUsersById);

module.exports = router;
