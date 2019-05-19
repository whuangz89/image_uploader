const Jimp = require("jimp")

module.exports = async function generator(image, req, res) {
	var width = parseInt(req.query.width);
	var height = parseInt(req.query.height);

	if (isNaN(width) || width == 0){
		width = Jimp.AUTO
	}

	if (isNaN(height) || height == 0){
		height = Jimp.AUTO
	}

	if (width == -1 && height == -1){
		res.send('<img src="'+image+'">')
	}else{
		Jimp.read(image, (err, img) => {
			if (err) throw err;
			img.resize(width,height).getBase64(Jimp.AUTO, (e, img64)=> {
				if (e) throw e;
				res.send('<img src="'+img64+'">')
			});
		});	
	}
}