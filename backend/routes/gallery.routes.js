module.exports = app => {
    const gallerys = require("../controllers/gallery.controller.js");
    var upload = require ('../multer/upload.js');
    var router = require("express").Router();

    // Create a new Gallery
    router.post("/", upload.single('file'), gallerys.create);

    // Retrieve All Gallerys
    router.get("/", gallerys.findAll);

    // Retrieve a single Gallery with id
    router.get("/:id", gallerys.findOne);

    // Update a Gallery with id
    router.put ("/:id", gallerys.update);

    // Delete a Gallery with id
    router.delete("/:id", gallerys.delete);

    router.get("/:id/pictures", gallerys.findGalleryWithPictures);

    app.use ('/api/galleries', router);
}