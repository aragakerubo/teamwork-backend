const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      callback(null, './images/avatars/');
    } else if (file.mimetype === 'image/gif') {
      callback(null, './images/gifs/');
    } else {
      callback({ message: 'Invalid file type' }, false);
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  }
});

const upload = multer({ storage: imageStorage });
export default upload;
