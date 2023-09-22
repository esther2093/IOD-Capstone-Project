const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user");

class Trip extends Model { }


Trip.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: false, required: true
        },
        cityFrom: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        cityTo: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        depatureDate: {
            type: DataTypes.DATE, allowNull: false, required: true
        },  
        arrivalDate: {
            type: DataTypes.DATE, allowNull: false, required: true
        },  
        availableSpace: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        otherComments: {
            type: DataTypes.STRING, allowNull: false, required: true
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'trips',
        timestamps: true, freezeTableName: true
    }
)

module.exports = Trip;