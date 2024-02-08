const cloudinary = require("cloudinary").v2;

const uploadImage = (image, id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { public_id: id },
      function (error, result) {
        if (result && result.secure_url) return resolve(result.secure_url);
        return reject(error);
      }
    );
  });
};

module.exports = uploadImage;
