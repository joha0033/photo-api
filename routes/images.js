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

/* GET images listing. */
router.get("/:number_of_images/:image_prefix", function(req, res, next) {
	const photosDir = path.join(__dirname, "..", "photos");
	const numOfImages = req.params.number_of_images;
	const imagePrefix = req.params.image_prefix;
	let dirLength = getNumberOfFiles(photosDir);
	
	let images = [];
	// try and check for duplicate random numbers...
	for(let i = numOfImages ; i > 0 ; i-- ){
		let imageNumber = randomNumberGenerator(1, dirLength-1);
		let fileName = imagePrefix+imageNumber+".jpg";
		images.push(photosDir+"/"+fileName);
	}
  
	res.json({
		images
	});
});

module.exports = router;
