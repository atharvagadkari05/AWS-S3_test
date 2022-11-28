require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = "image-uploader-demo1"
const region = "ap-south-1"
const accessKeyId = "AKIAYBJYTTUKMMQBFHPR"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream


// const S3 = require('aws-sdk/clients/s3')
// const env = require('dotenv')
// const fs = require('fs')

// const bucketName =  "image-uploader-demo1"
// const Region =  "ap-south-1"
// const Access_SECRET =  'qTLBCjahAAg3myM0gNKlvCVJt6xs2cwi0AVkJxP+'
// const AccessKEY =  'AKIAYBJYTTUKMMQBFHPR'


// const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKey
//   })
  
//   // uploads a file to s3
//   function uploadFile(file) {
//     const fileStream = fs.createReadStream(file.path)
  
//     const uploadParams = {
//       Bucket: bucketName,
//       Body: fileStream,
//       Key: file.filename
//     }
  
//     return s3.upload(uploadParams).promise()
//   }
//   exports.uploadFile = uploadFile












// const s3 = new S3({
//     Region,
//     AccessKEY,
//     Access_SECRET
// })

// // Uploading a file
//  function uploadFile(file){
//     const fileStream = fs.createReadStream(file.path)

//     const uploadParams = {
//         Bucket:bucketName,
//         Body:fileStream,
//         Key:file.filename
//     }
//     return s3.upload(uploadParams).promise()
// }
// exports.uploadFile = uploadFile





// module.exports=uploadfile