const express = require("express");
const generator = require("./lib/generator");
const singleUploader = require("./lib/singleUpload");
const Multer = require('multer');

const app = express();

const multer = Multer({
	storage: Multer.MemoryStorage,
	limits: {
		fileSize: 100 * 1024 * 1024
	},
});

//GET Image URL
app.get("/:image", (req, res, next) => {
	generator(req,res, next);
});

app.post("/upload", multer.single('image'), singleUploader, (req, res, next) => {

		if (req.file && req.file.gcsUrl) {
			return res.send(req.file.gcsUrl);
		}
		return res.status(500).send("Failed");
});


app.listen(3000, () =>{
	console.log("PORT[status] = 3000 - Ready");
});
