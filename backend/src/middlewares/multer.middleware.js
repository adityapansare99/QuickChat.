import multer from "multer";
import os from "os";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    const uniqueName = `${file.fieldname}-${Date.now()}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export { upload };
