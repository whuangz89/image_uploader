const express = require("express");
const sharp = require("sharp");

const app = express();


app.get("/", (req, res, next) => {
	console.log("Starting...")
});


app.listen(3000, () =>{
	console.log("PORT[status] = 3000 - Ready");
});