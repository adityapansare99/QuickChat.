import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  filename: function (req, file, cb) {
    const randomname = Date.now();
    cb(null, file.fieldname + "-" + randomname);
  },
});

const upload = multer({ storage });

export { upload };
