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
        from: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        to: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        depature: {
            type: DataTypes.DATE, allowNull: false, required: true
        },  
        arrival: {
            type: DataTypes.DATE, allowNull: false, required: true
        },  
        availableSpace: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
        comments: {
            type: DataTypes.STRING, allowNull: false, required: true
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'trips',
        timestamps: true, freezeTableName: true
    }
)

module.exports = Trip;