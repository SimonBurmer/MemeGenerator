const upload = require("../middlewares/upload");
const dbConfig = require("../config/db.config");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const Template = require("../models/template.model");

const url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

const baseUrl = "http://localhost:5000/img/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    if (req.query.type == null) {
      return res.status(406).send({
        message:
          "Pls specify the typ of file in the body, e.g. meme or template",
      });
    } else {
      await upload(req, res);
    }
    console.log(req.files);
    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.send({
      message: req.files.map((files) => files.filename),
    });
  } catch (err) {
    console.log(err);

    return res.status(406).send({
      message: "Error when trying upload image:" + err,
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    if (req.query.type == null) {
      return res.status(406).send({
        message:
          "Pls specify the typ of file in the body, e.g. meme or template",
      });
    }
    await mongoClient.connect();
    let fileType = "meme";
    // filter images by google id of user
    let dbFilter = req.query.metadata
      ? { metadata: req.query.metadata }
      : { metadata: { $not: /^api$/ } };
    const database = mongoClient.db(dbConfig.database);
    let images = database.collection(dbConfig.memeBucket + ".files");
    if (req.query.type === "template") {
      fileType = "template";
      images = database.collection(dbConfig.templateBucket + ".files");
    }
    const cursor = images.find(dbFilter);
    if ((await cursor.count) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        //creator: passport.deserializeUser(),
        url: baseUrl + fileType + "/" + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const downloadMeme = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.memeBucket,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const downloadTemplate = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.templateBucket,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const addTemplate = async (req, res) => {
  let template = new Template({
    creator: req.body.creator,
    name: req.body.name,
    date: new Date().toISOString(),
    image: req.body.src,
    accessibility: req.body.accessibility,
  });
  template
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.error(err));
};

module.exports = {
  uploadFiles,
  getListFiles,
  downloadMeme,
  downloadTemplate,
  addTemplate,
};
