const { s3 } = require('../utils/aws_s3');

const getGetSignedUrl = async (req, res) => {
    const { filename } = req.body;
    const params = {
        Bucket: process.env.S3_BUCKET_NAME_,
        Key: filename,
        Expires: 60,
    };

    try {
        const downloadURL = await s3.getSignedUrlPromise('getObject', params);
        return res.status(200).json({
            status: 200, data : downloadURL, success: true
        });
    } catch (error) {
        return res.status(500).json({
            status: 500, message: 'Could not generate signed URL'
        });
    }
}

const getPutSignedUrl = async (req, res) => {
    const { filename, filetype, isPrivate } = req.body;
    const params = {
        Bucket: process.env.S3_BUCKET_NAME_,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: isPrivate?'private':'public-read'
    };

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', params);
        return res.status(200).json({
            status: 200, data: uploadURL, success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500, message: 'Could not generate signed URL'
        });
    }
}

module.exports = {
    getGetSignedUrl,
    getPutSignedUrl
}