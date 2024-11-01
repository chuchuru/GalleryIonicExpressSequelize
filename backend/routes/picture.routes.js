module.exports = app => {
    const pictures = require("../controllers/picture.controller.js");
    var upload = require ('../multer/upload.js');

    var router = require("express").Router();

    // Create a new Picture
    router.post("/", upload.single('file'), pictures.create);

    // Retrieve All Pictures
    router.get("/", pictures.findAll);

    // Retrieve a single Picture with id
    router.get("/:id", pictures.findOne);

    // Update a Picture with id
    router.put ("/:id", pictures.update);

    // Delete a Picture with id
    router.delete("/:id", pictures.delete);

    router.get("/description", pictures.findAll);

    app.use ('/api/pictures', router);
}