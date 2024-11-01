const db = require ("../models");

const Artist = db.artist;
const Op = db.Sequelize.Op;

const Picture = db.pictures;

// Create and Save a new Artist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send ({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Artist
    const artist = {
        name: req.body.name,
        surnames: req.body.surnames,
        dateBirth: req.body.dateBirth,
        filename: req.file? req.file.filename : ""
    }

    // Save Artist in the database
    Artist.create(artist)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send ({
                message:
                err.message || "Some error occurred while creating the Artist."
            });
        });
};

// Retrieve all Artists from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]:`%${name}%`} } : null;

    Artist.findAll({ where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving artists."
        });
    });
};

// Find a single Artist whith an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    Artist.findByPk (id)
        .then (data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send ({
                    message: `Cannot find Artist with id=${id}.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send ({
                message: "Error retrieving Artist with id=" + id
            });
        });
};

// Update a Artist by the id in the request

exports.update = (req, res) => {
    const id = req.params.id;

    Artist.update(req.body, {
        where: {id: id}
    })
        .then (num => {
            if (num == 1){
                res.send({
            message: "Artist was updated succesfully."
        });
    } else {
        res.send ({
            message: `Cannot update Artist with id=${id}. Maybe Artist was not found or req.body is empty!`
        });
    }
    })
    .catch (err => {
        res.status(500).send({
            message: "Error updating Artist with id=" + id
        });
    });
};

// Delete a Artist with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Artist.destroy ({
        where: { id: id}
    })
    .then (num =>{
        if (num == 1){
            res.send ({
                message: "Artist was deleted succesfully!"
            });
        }else {
            res.send ({
                message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Artist with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Artist.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Artist were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all artists."
        });
      });
  };

  // Find All Conditions
  exports.findAllByName = (req, res) => {
    const name = req.query.name; // Cambia a buscar por 'name'
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Artist.findAll({ where: condition })
        .then(data => {
            res.send(data); // Enviar los resultados
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los artistas."
            });
        });
};
  
// Obras de un Artista
exports.findArtistWithPictures = async (req, res) => {
    const artistId = req.params.id;
    try {
        const artist = await Artist.findByPk(artistId, {
            include: [
                { model: Picture, as: 'pictures' },
            ],
        });

        if (!artist) {
            return res.status(404).send({ message: "Artist not found." });
        }
        return res.status(200).send(artist);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};