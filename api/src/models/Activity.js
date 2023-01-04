const { DataTypes } = require('sequelize');

module.exports = sequelize => {

    sequelize.define('activity', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate : {
                min: 1,
                max: 5,
            }
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                max: 24,
            }   
        },
        season:{
            type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
            allowNull: false,
        },
        createdInDb:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    })
    };