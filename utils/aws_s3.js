const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION_,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
  },
});

const generateGetSignedUrl = async (filename) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME_,
    Key: filename,
  });

  return getSignedUrl(s3, command, { expiresIn: 60 });
};

const generatePutSignedUrl = async (filename, filetype, isPrivate = false) => {
  console.log("Bucket: ",process.env.S3_BUCKET_NAME_)
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME_,
    Key: filename,
    ContentType: filetype,
    ACL: isPrivate ? 'private' : 'public-read',
  });

  return getSignedUrl(s3, command, { expiresIn: 60 });
};

module.exports = {
  generateGetSignedUrl,
  generatePutSignedUrl,
};
