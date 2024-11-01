const { artist } = require("../models/index.js");

module.exports = app => {
    const artists = require("../controllers/artist.controller.js");
    var upload = require ('../multer/upload.js');
    var router = require("express").Router();

    // Create a new Artist
    router.post("/", upload.single('file'), artists.create);


    // Retrieve All Artists
    router.get("/", artists.findAll);

    // Retrieve a single Artist with id
    router.get("/:id", artists.findOne);

    // Update a Artist with id
    router.put ("/:id", artists.update);

    // Delete a Artist with id
    router.delete("/:id", artists.delete);

    router.get("/", artists.findAllByName);

    router.get("/:id/pictures", artists.findArtistWithPictures);

    app.use ('/api/artists', router);
}