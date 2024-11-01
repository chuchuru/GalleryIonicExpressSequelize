module.exports = (sequelize, Sequelize) => {
    const Artist = sequelize.define ("artist", {
        name: {
            type: Sequelize.STRING
        },
        surnames: {
            type: Sequelize.STRING
        },
        dateBirth: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        }
    });

    Artist.associate = (models) => {
        Artist.hasMany(models.pictures, {
          foreignKey: 'artistId',
          as: 'pictures',
        });
      };

    return Artist;
};

// takePhoto(){
//     this.photoService.takePhoto().then (data =>{
//       this.capturedPhoto = data.webPath? data.webPath : "";
//     });
//   }

//   pickImage(){
//     this.photoService.pickImage().then (data =>{
//       this.capturedPhoto = data.webPath;
//     });
//   }

//   discardImage(){
//     this.capturedPhoto = "";
//   }