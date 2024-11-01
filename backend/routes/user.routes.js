module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var upload = require ('../multer/upload.js');
    var router = require("express").Router();

    // Crear un nuevo usuario
    router.post("/register", upload.single('file'), users.register);

    // Iniciar sesión
    router.post("/login", users.login);

    // Retrieve All Users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put ("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
};


