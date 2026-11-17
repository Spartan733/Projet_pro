const multer = require("multer");

const uploadAvatar = multer({
  storage: multer.memoryStorage(),

  limits: { fileSize: 2 * 1024 * 1024 },

  fileFilter: (req, file, callback) => {
    const typesAutorises = [ "image/jpeg", "image/png", "image/webp" ];

    if (!typesAutorises.includes(file.mimetype)) {
      return callback( new Error("Format d'image non autorisé") );
    }

    callback(null, true);
  }
});

module.exports = uploadAvatar;
