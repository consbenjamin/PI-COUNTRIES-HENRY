const { DataTypes } = require('sequelize');

module.exports = sequelize => {

    sequelize.define('activity', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
        },
        duration:{
            type: DataTypes.INTEGER,
        },
        season:{
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        },
        createdInDb:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    })
    };