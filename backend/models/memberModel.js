import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Member = db.define("members", {
    userid: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.NUMBER
    },
    phone_num: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Member;