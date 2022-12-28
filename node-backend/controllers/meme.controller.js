const Meme = require("../models/meme.model");

const saveMeme = async (req, res) => {
    let dbFilter = {
        author: req.body.author, name: req.body.name
    }

    let meme = {
        author: req.body.author,
        name: req.body.name,
        date: new Date().toISOString(),
        templates: req.body.templates,
        texts: req.body.texts,
        votes: req.body.votes,
        private: req.body.private,
        color: req.body.color,
        size: req.body.size,
        canvasWidth: req.body.canvasWidth,
        canvasHeight: req.body.canvasHeight
    }

    Meme
        .findOneAndUpdate(dbFilter, meme, {new: true})
        .then(updatedMeme => {
            if (updatedMeme) {
                res.send(updatedMeme)
            } else {
                new Meme(meme).save().then(newMeme => res.send(newMeme))
            }
        })
        .catch(err => console.log(err))
    
};

const getMeme = async (req, res) => {
    console.log(req.query.id)
    Meme.findOne({_id: req.query.id})
        .then(result => {       
                res.send(result)
            })
        .catch(() => console.log(`ERROR in /getMeme: could not find meme with ID ${req.query.id}`))
};

const allMemes = async (req, res) => {
    let dbFilter = req.query.author ? {author: req.query.author} : {author: {$not: /^api$/}}
        if (req.query.private) dbFilter.private = req.query.private
        Meme
            .find(dbFilter)
            .then(memes => {
                res.send(memes)
            }, err => console.error(err))   
};

const retrieve = async (req, res) => {
    try{
        let autorFilter = {author: {$not: /^api$/}, private: false}
        if (req.query.name) dbFilter.name = req.query.name
        let sortFilter = req.query.sort && req.query.sort === "oldest" ? {date: 1} : {date: -1}
        console.log(gteDateFilter)
        Meme
            .find(autorFilter)
            .limit(req.query.limit)
            .sort(sortFilter)
//            .setOptions({ sanitizeFilter: true })
            .then(memes => {
                res.send(memes)
            }, err => console.error(err))
    }catch(err){
        console.error(er)
    }
    
};

const deleteMeme = async(req,res) => {
    Meme
        .findOneAndDelete({_id: req.body.meme})
        .then(result => {
            if (result) {
                res.send(result)
            }
        })
        .catch(err => console.log(err))
};

module.exports = {
    saveMeme,
    getMeme,
    allMemes,
    retrieve,
    deleteMeme
  };