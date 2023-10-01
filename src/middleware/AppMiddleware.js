const multer = require("multer");
const path = require("path");

// // konfigurasi penyimpanan dengan nama random
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

// konfigurasi penyimpanan dengan nama original
const storageV2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// // Filter untuk mengizinkan format gambar
const imageFilter = function (req, file, cb) {
  const fileSize = parseInt(req.headers["content-length"]);
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|)$/)) {
    // return cb(new Error("hanya file jpg, jpeg, png, gif yang diizinkan"));
    req.validationFileError = "hanya file jpg, jpeg, png, gif yang diizinkan";
    cb(null, false);
    return;
  } else if (fileSize > 1024 * 1024 * 2) {
    req.validationFileError = "Ukuran gambar melebihi 2Mb";
    cb(null, false);
  } else {
    return cb(null, true);
  }
};

exports.upload = multer({
  storage: storageV2,
  fileFilter: imageFilter,
});
