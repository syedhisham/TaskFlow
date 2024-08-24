const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
console.log('Multer upload instance:', upload);
console.log(process.env.CLOUDINARY_CLOUD_NAME);



module.exports = upload; // Correct export statement
