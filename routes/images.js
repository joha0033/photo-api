var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const getNumberOfFiles = (dir) => {
	let numberOfFiles = 0;
	fs.readdirSync(dir).forEach((name) => {
		var filePath = path.join(dir, name);
		var stat = fs.statSync(filePath);
		if (stat.isFile()) {
			numberOfFiles++;
		}
	});
	return numberOfFiles;
};

const randomNumberGenerator = (start, finish) => {
	return Math.floor(Math.random() * finish) + start;
};

/* GET images path array. */
router.get("/array_of/:number_of_images", function(req, res, next) {
	const photosDir = path.join(__dirname, "..", "photos");
	const numOfImages = req.params.number_of_images;
	const imagePrefix = 'image_';
	let dirLength = getNumberOfFiles(photosDir);
	
	let images = [];
	// try and check for duplicate random numbers...
	for(let i = numOfImages ; i > 0 ; i-- ){
		let imageNumber = randomNumberGenerator(1, dirLength-1);
		let fileName = imagePrefix+imageNumber;
		// images.push({url:"localhost:3000/images/"+fileName});
		images.push({url:"https://photo-api-2019.herokuapp.com/images/"+fileName});
	}
  
	res.json({
		images
	});
});

/* GET image. */
router.get('/:name', function (req, res, next) {
	// handle :name that doesn't exist... thanks
	console.log('hit?');
	
	const photosDir = path.join(__dirname, "..", "photos");
	const fileName = req.params.name + '.jpg';

	const options = {
	  root: photosDir,
	  dotfiles: 'deny',
	  headers: {
		  'x-timestamp': Date.now(),
		  'x-sent': true
	  }
	};
	
	res.sendFile(fileName, options, function (err) {
	  if (err) {
		next(err);
	  } else {
		console.log('Sent:', fileName);
	  }
	});
  });

module.exports = router;
