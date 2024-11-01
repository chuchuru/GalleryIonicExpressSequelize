const db = require ("../models");
const Picture = db.pictures;
const Artist = db.artist;
const Gallery = db.gallery;
const Op = db.Sequelize.Op;

// Create and Save a new Picture
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send ({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Picture
    const picture = {
        name: req.body.name,
        description: req.body.description,
        revalue: req.body.revalue,
        certified: req.body.certified,
        price: req.body.price,
        filename: req.file? req.file.filename : "",
        artistId: req.body.artistId,
        galleryId: req.body.galleryId
    }

    // Save Picture in the database
    Picture.create(picture)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send ({
                message:
                err.message || "Some error occurred while creating the Picture."
            });
        });
};

// Retrieve all Pictures from the database.
exports.findAll = async (req, res) => {
    try {
        const name = req.query.name;
        const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

        const data = await Picture.findAll({ where: condition });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pictures."
        });
    }
};


// Find a single Picture whith an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    Picture.findByPk (id)
        .then (data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send ({
                    message: `Cannot find Picture with id=${id}.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send ({
                message: "Error retrieving Picture with id=" + id
            });
        });
};

// Update a Picture by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    Picture.update(req.body, {
        where: {id: id}
    })
        .then (num => {
            if (num == 1){
                res.send({
            message: "Picture was updated succesfully."
        });
    } else {
        res.send ({
            message: `Cannot update Picture with id=${id}. Maybe Picture was not found or req.body is empty!`
        });
    }
    })
    .catch (err => {
        res.status(500).send({
            message: "Error updating Picture with id=" + id
        });
    });
};

// Delete a Picture with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Picture.destroy ({ where: { id: id} })
    .then (num => {
        if (num == 1){
            res.send ({ message: "Picture was deleted succesfully!" });
        }else {
            res.send ({
                message: `Cannot delete Picture with id=${id}. Maybe Picture was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Picture with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Picture.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Picture were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all pictures."
        });
      });
  };


