const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db.config");
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

var storage = new GridFsStorage({
  url: dbUrl,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-omm-${file.originalname}`;
      return filename;
    }
    if(req.query.type === 'meme'){
      return {
        bucketName: dbConfig.memeBucket,
        filename: `${Date.now()}-omm-${file.originalname}`,
        //metadata: req.user._id
      };
    }
    if(req.query.type === 'template'){
      return {
        bucketName: dbConfig.templateBucket,
        filename: `${Date.now()}-omm-${file.originalname}`,
        //metadata: req.user._id
      };
    }   
  }
});

//var uploadFiles = multer({ storage: storage }).single("file");
var uploadFiles = multer({ storage: storage }).array("file", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;