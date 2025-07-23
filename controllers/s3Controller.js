const {
  generateGetSignedUrl,
  generatePutSignedUrl
} = require('../utils/aws_s3');

const getGetSignedUrl = async (req, res) => {
  const { filename } = req.body;

  try {
    const downloadURL = await generateGetSignedUrl(filename);
    return res.status(200).json({
      status: 200, data: downloadURL, success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500, message: 'Could not generate signed URL', error: error?.message || error
    });
  }
};

const getPutSignedUrl = async (req, res) => {
  const { filename, filetype, isPrivate } = req.body;

  try {
    const uploadURL = await generatePutSignedUrl(filename, filetype, isPrivate);
    return res.status(200).json({
      status: 200, data: uploadURL, success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500, message: 'Could not generate signed URL', error: error?.message || error
    });
  }
};

module.exports = {
  getGetSignedUrl,
  getPutSignedUrl
};
