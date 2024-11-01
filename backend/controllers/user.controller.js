const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;

// Registro de usuario
exports.register = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Email and password cannot be empty!" });
    }

    try {
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(400).send({ message: "Email is already in use!" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            filename: req.file ? req.file.filename : null
        });

        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Email and password cannot be empty!" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        console.log("User found:", user);

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        console.log("Stored password hash:", user.password); // Log del hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch); // Log del resultado de la comparación

        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'dabuten', { expiresIn: '1h' });
        res.json({
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error); // Log del error
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

// Obtener todos los usuarios
exports.findAll = (req, res) => {
    const email = req.query.email;
    const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    User.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        }));
};

// Obtener un usuario por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `Cannot find User with id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({
            message: "Error retrieving User with id=" + id
        }));
};

// Actualizar un usuario
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, { where: { id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "User was updated successfully." });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => res.status(500).send({
            message: "Error updating User with id=" + id
        }));
};

// Eliminar un usuario
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({ where: { id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "User was deleted successfully!" });
            } else {
                res.send({ message: `Cannot delete User with id=${id}. Maybe User was not found!` });
            }
        })
        .catch(err => res.status(500).send({
            message: "Could not delete User with id=" + id
        }));
};

// Eliminar todos los usuarios
exports.deleteAll = (req, res) => {
    User.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} Users were deleted successfully!` }))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while removing all users."
        }));
};