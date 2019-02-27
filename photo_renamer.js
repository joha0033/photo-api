const fs = require("fs");
const path = require("path");

const photosDir = path.join(__dirname, "photos");
let photoId = 0;
const walkSync = (currentDirPath, callback) => {
	fs.readdirSync(currentDirPath).forEach((name) => {
		var filePath = path.join(currentDirPath, name);
		var stat = fs.statSync(filePath);
		if (stat.isFile()) {
			console.log("isFile... ?");
            
			callback(filePath, stat);
		} else if (stat.isDirectory()) {
			walkSync(filePath, callback);
		}
	});
};

walkSync(photosDir, (filePath, stat) => {
	fs.rename(filePath, `${photosDir}/image_${photoId}.jpg`, (err) => {
		if (err) throw err;
		console.log("Rename complete!");
	});
	photoId++;
});
