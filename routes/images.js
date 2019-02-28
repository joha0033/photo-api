const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

const getNumberOfFiles = (dir) => {
  let numberOfFiles = 0;
  fs.readdirSync(dir).forEach((name) => {
    const filePath = path.join(dir, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      numberOfFiles += 1;
    }
  });
  return numberOfFiles;
};

const randomNumberGenerator = (start, finish) => 
  Math.floor(Math.random() * finish) + start;

/* GET images path array. */
router.get('/array_of/:number_of_images', (req, res) => {
  const photosDir = path.join(__dirname, '..', 'photos');
  const numOfImages = req.params.number_of_images;
  const imagePrefix = 'image_';
  const dirLength = getNumberOfFiles(photosDir);

  const images = [];
  // try and check for duplicate random numbers...
  for (let i = 0; i < numOfImages; i += 1) {
    const imageNumber = randomNumberGenerator(1, dirLength - 1);
    const fileName = imagePrefix + imageNumber;
    // images.push({url:"localhost:3000/images/"+fileName});
    images.push({ 
      id: imageNumber,
      url: `https://photo-api-2019.herokuapp.com/images/${fileName}`,
    });
  }

  res.json({
    images,
  });
});

/* GET image. */
router.get('/:name', (req, res, next) => {
  // handle :name that doesn't exist... thanks
  const photosDir = path.join(__dirname, '..', 'photos');
  const fileName = `${req.params.name}.jpg`;

  const options = {
    root: photosDir,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };

  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName); // eslint-disable-line no-console
    }
  });
});

module.exports = router;
