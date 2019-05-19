require('dotenv').config()

//var Promise = require('bluebird')
//var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'))
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
	projectId: process.env.GCLOUD_PROJECT,
  	keyFilename: process.env.KEYFILE_PATH
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET);

module.exports = async function upload(req, res, next){

	if (!req.file){
		return next();
	}
	
	const gcsFileName = Date.now() + req.file.originalname
	const file = bucket.file(gcsFileName);

	const fStream = file.createWriteStream({
		metadata: {
			contentType: req.file.mimetype
		}
	});

	fStream.on("error", (err) => {
		req.file.cloudStorageError = err;
      	next(err);
	});

	fStream.on("finish", () => {
		req.file.cloudStorageObject = gcsFileName;

		return file.makePublic()
			.then(() => {
				req.file.gcsUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFileName}`
				next();
			});
	});

	fStream.end(req.file.buffer);

}
