const cloudinary = require('cloudinary').v2,
  dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = {
  /**
   * Upload gif files to cloudinary
   * @param {string} file file path
   * @returns {Object} Result object
   */
  uploadGifs: async file => {
    try {
      await cloudinary.uploader.upload(
        file,
        {
          eager: [{ width: 500, crop: 'scale' }]
        },
        (error, result) => {
          console.error('Error:', error);
          console.log('Result:', result);
          return result;
        }
      );
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Upload avatar images to cloudinary
   * @param {string} file file path
   * @returns {Object} Result object
   */
  uploadAvatars: async file => {
    try {
      await cloudinary.uploader.upload(
        file,
        {
          eager: [
            {
              width: 400,
              height: 400,
              gravity: 'face',
              radius: 'max',
              crop: 'crop'
            },
            { width: 100, crop: 'scale' }
          ]
        },
        (error, result) => {
          console.log('Result:', result);
          console.error('Error:', error);
          return result;
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
};
