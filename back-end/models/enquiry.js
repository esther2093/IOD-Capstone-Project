const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user");
const Trip = require("./trip");

class Enquiry extends Model { }


Enquiry.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: false, required: true
        },
        tripId: {
            type: DataTypes.INTEGER, references: { model: Trip, key: "id" }, allowNull: false, required: true
        },
        comments: {
            type: DataTypes.STRING, allowNull: true, required: false
        },
        accepted: {
            type: DataTypes.BOOLEAN, allowNull: true, required: false
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'enquries',
        timestamps: true, freezeTableName: true
    }
)

module.exports = Enquiry;