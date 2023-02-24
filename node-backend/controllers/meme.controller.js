const Meme = require("../models/meme.model");

const saveMeme = async (req, res) => {
  let dbFilter = {
    creatorId: req.body.creatorId,
    title: req.body.title,
  };
  console.log("meme body: " + req.body);
  let meme = {
    memeURL: req.body.memeURL,
    creatorId: req.body.creatorId,
    creator: req.body.creator,
    title: req.body.title,
    creationDate: new Date().toISOString(),
    accessibility: req.body.accessibility,
    votes: req.body.votes,
    comments: req.body.comments,
    templates: req.body.templates,
    texts: req.body.texts,

    // Unnecessary ?
    color: req.body.color,
    size: req.body.size,
    canvasWidth: req.body.canvasWidth,
    canvasHeight: req.body.canvasHeight,
  };

  Meme.findOneAndUpdate(dbFilter, meme, { new: true })
    .then((updatedMeme) => {
      if (updatedMeme) {
        res.send(updatedMeme);
      } else {
        new Meme(meme).save().then((newMeme) => res.send(newMeme));
      }
    })
    .catch((err) => console.log(err));
};

const getMeme = async (req, res) => {
  console.log(req.query.id);
  Meme.findOne({ _id: req.query.id })
    .then((result) => {
      res.send(result);
    })
    .catch(() =>
      console.log(
        `ERROR in /getMeme: could not find meme with ID ${req.query.id}`
      )
    );
};

const updateMeme = (req, res) => {
  const update = { $set: req.body };
  const options = { new: true };
  Meme.findByIdAndUpdate(req.query.id, update, options)
    .then((updatedMeme) => {
      res.send(updatedMeme);
    })
    .catch((err) => console.log(err));
};

const allMemes = async (req, res) => {
  let dbFilter = req.query.creatorId
    ? { creatorId: req.query.creatorId }
    : { creatorId: { $not: /^api$/ } };
  if (req.query.private) dbFilter.private = req.query.private;
  Meme.find(dbFilter).then(
    (memes) => {
      res.send(memes);
    },
    (err) => console.error(err)
  );
};

const retrieve = async (req, res) => {
  try {
    //let dbFilter = { creatorId: { $not: /^api$/ }, private: false };
    // let dbFilter = req.query.accessibility
    //   ? { accessibility: req.query.accessibility }
    //   : { accessibility: { $not: /^api$/ } };
    let dbFilter = {};
    if (req.query.accessibility) {
      dbFilter = {
        accessibility: req.query.accessibility,
      };
    }
    if (req.query.title) dbFilter.title = req.query.title;
    let sortFilter =
      req.query.sort && req.query.sort === "oldest"
        ? { creationDate: 1 }
        : { creationDate: -1 };
    Meme.find(dbFilter)
      .limit(req.query.limit)
      .sort(sortFilter)
      //            .setOptions({ sanitizeFilter: true })
      .then(
        (memes) => {
          res.send(memes);
        },
        (err) => console.error(err)
      );
  } catch (err) {
    console.error(err);
  }
};

const deleteMeme = async (req, res) => {
  Meme.findOneAndDelete({ _id: req.body.meme })
    .then((result) => {
      if (result) {
        res.send(result);
      }
    })
    .catch((err) => console.log(err));
};

const addLike = async (req, res) => {
  Meme.findOneAndUpdate(
    { _id: req.body.id },
    { votes: req.body.votes },
    { new: true }
  )
    .then((result) => res.send(result))
    .catch(() =>
      console.log(
        `ERROR in /addLike: could not find meme with ID ${req.body.id}`
      )
    );
};

module.exports = {
  saveMeme,
  getMeme,
  updateMeme,
  allMemes,
  retrieve,
  deleteMeme,
  addLike,
};
