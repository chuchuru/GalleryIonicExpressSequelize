const db = require ("../models");

const Gallery = db.gallery;
const Op = db.Sequelize.Op;
const Picture = db.pictures;

// Create and Save a new Gallery
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send ({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Gallery
    const gallery = {
        name: req.body.name,
        address: req.body.address,
        filename: req.file? req.file.filename : ""
    }

    // Save Gallery in the database
    Gallery.create(gallery)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send ({
                message:
                err.message || "Some error occurred while creating the Gallery."
            });
        });
};

// Retrieve all Gallerys from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]:`%${name}%`} } : null;

    Gallery.findAll({ where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving gallerys."
        });
    });
};

// Find a single Gallery whith an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    Gallery.findByPk (id)
        .then (data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send ({
                    message: `Cannot find Gallery with id=${id}.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send ({
                message: "Error retrieving Gallery with id=" + id
            });
        });
};

// Update a Gallery by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    Gallery.update(req.body, {
        where: {id: id}
    })
        .then (num => {
            if (num == 1){
                res.send({
            message: "Gallery was updated succesfully."
        });
    } else {
        res.send ({
            message: `Cannot update Gallery with id=${id}. Maybe Gallery was not found or req.body is empty!`
        });
    }
    })
    .catch (err => {
        res.status(500).send({
            message: "Error updating Gallery with id=" + id
        });
    });
};

// Delete a Gallery with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Gallery.destroy ({
        where: { id: id}
    })
    .then (num =>{
        if (num == 1){
            res.send ({
                message: "Gallery was deleted succesfully!"
            });
        }else {
            res.send ({
                message: `Cannot delete Gallery with id=${id}. Maybe Gallery was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Gallery with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Gallery.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Gallery were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all gallerys."
        });
      });
  };

  // Find All Conditions
  exports.findAllByAddress = (req, res) => {
    const address = req.query.address;
    const condition = address ? { address: address } : null;

    Gallery.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Galleries."
            });
        });
};


  /// Traer todas las obras de una galería
  exports.findGalleryWithPictures = async (req, res) => {
    const galleryId = req.params.id;

    try {
        const gallery = await Gallery.findByPk(galleryId, {
            include: [
                { model: Picture, as: 'pictures' },
            ],
        });
        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found." });
        }
        return res.status(200).send(gallery);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};