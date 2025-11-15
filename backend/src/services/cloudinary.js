const { v2: cloudinary } = require("cloudinary");

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "nelngabo";

if (!CLOUDINARY_URL) {
  console.warn("CLOUDINARY_URL is not set. Cloudinary features will be disabled.");
}

if (CLOUDINARY_URL) {
  cloudinary.config({
    secure: true,
  });
}

const getUploadSignature = () => {
  if (!CLOUDINARY_URL) {
    throw new Error("CLOUDINARY_URL is not configured");
  }
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = {
    timestamp,
    upload_preset: UPLOAD_PRESET,
  };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    cloudinary.config().api_secret,
  );
  return {
    timestamp,
    signature,
    uploadPreset: UPLOAD_PRESET,
    cloudName: cloudinary.config().cloud_name,
    apiKey: cloudinary.config().api_key,
  };
};

module.exports = {
  getUploadSignature,
};

