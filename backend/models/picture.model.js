module.exports = (sequelize, Sequelize) => {
    const Picture = sequelize.define ("picture", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
          },
        revalue:{
            type: Sequelize.STRING
        }, 
        certified:{
            type: Sequelize.BOOLEAN
        }, 
        price:{
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        }
    });
    return Picture;
};