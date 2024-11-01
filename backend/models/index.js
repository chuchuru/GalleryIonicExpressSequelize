const dbConfig = require ("../config/db.config.js");

const Sequelize = require ("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pictures = require ("./picture.model.js")(sequelize, Sequelize);
db.artist = require ("./artist.model.js")(sequelize, Sequelize);
db.gallery = require ("./gallery.model.js")(sequelize, Sequelize);
db.user = require ("./user.model.js")(sequelize, Sequelize);

// Asociaciones

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.pictures.belongsTo(db.artist, { foreignKey: 'artistId', as: 'artist' });
db.pictures.belongsTo(db.gallery, { foreignKey: 'galleryId', as: 'gallery' });

module.exports = db;