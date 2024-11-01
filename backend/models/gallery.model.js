module.exports = (sequelize, Sequelize) => {
    const Gallery = sequelize.define ("gallery", {
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        }
    });

    Gallery.associate = (models)=> {
        Gallery.hasMany(models.pictures, {
          foreignKey: 'galleryId',
          as: 'pictures',
        });
      };

    return Gallery;
};