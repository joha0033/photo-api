const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'photos');
let photoId = 0;
const walkSync = (currentDirPath, callback) => {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
};

walkSync(photosDir, (filePath) => {
  fs.rename(filePath, `${photosDir}/image_${photoId}.jpg`, (err) => {
    if (err) throw err;
    console.log('Rename complete!'); // eslint-disable-line no-console
  });
  photoId += 1;
});
