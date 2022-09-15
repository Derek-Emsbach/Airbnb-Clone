'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Spot,
        { foreignKey: 'spotImagesId' }
      )
      Image.belongsTo(
        models.Review,
        { foreignKey: 'reviewImagesId' }
      )
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewImagesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotImagesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
