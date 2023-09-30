const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
const User = require("./user");

class Message extends Model { }

Message.init({
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
        },
        senderId: {
            type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: false, required: true
        },
        receiverId: {
            type: DataTypes.INTEGER, references: { model: User, key: "id" }, allowNull: false, required: true
        },
        content: {
            type: DataTypes.STRING, allowNull: false, required: true
        },
    },
    {
        sequelize: sequelizeInstance, modelName: 'messages',
        timestamps: true, freezeTableName: true
    }
) 

module.exports = Message;