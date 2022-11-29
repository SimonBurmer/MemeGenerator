// importing packages
const express = require('express');
const router = express.Router();

router.get(`/names`, async function (req, res) {
	const url = 'https://api.imgflip.com/get_memes';
	const options = {
		method: 'GET',
		headers: {
            'Content-Type': 'application/json'
          },  
	};
	
	fetch(url, options)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.error('error:' + err));
	try {
		let response = await fetch(url, options);
		response = await response.json();
		res.json(response.data.memes.map(memes => memes.name));
	} catch (err) {
		console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
	}
});
module.exports = router;