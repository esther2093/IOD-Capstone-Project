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
        suburbFrom: {
            type: DataTypes.STRING, allowNull: true, required: false
        },
        cityFrom: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        stateFrom: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        suburbTo: {
            type: DataTypes.STRING, allowNull: true, required: false
        },
        cityTo: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        stateTo: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        departureDate: {
            type: DataTypes.DATE, allowNull: false, required: true
        },  
        arrivalDate: {
            type: DataTypes.DATE, allowNull: false, required: true
        },  
        availableSpace: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        comments: {
            type: DataTypes.STRING, allowNull: true, required: false
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'trips',
        timestamps: true, freezeTableName: true
    }
)

module.exports = Trip;