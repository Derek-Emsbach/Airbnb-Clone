'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasOne(
        models.Booking,
        { foreignKey: 'spotId' }
      );
      Spot.hasMany(
        models.Image,
        { as: 'SpotImages', foreignKey: 'spotImagesId', onDelete: 'CASCADE',  hooks: true }
      );
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE',  hooks: true }
      );
      Spot.belongsTo(
        models.User,
        { as: 'Owner', foreignKey: 'ownerId' }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    avgRating: {
      type: DataTypes.DECIMAL,
      allowNull: true},
    previewImage: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
