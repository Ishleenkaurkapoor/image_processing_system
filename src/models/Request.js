import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Request = sequelize.define("Request", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    status: { type: DataTypes.STRING, defaultValue: "PENDING" }, // PENDING, PROCESSING, COMPLETED
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    downloadLink:{type: DataTypes.STRING},
    webhookUrl:{type:DataTypes.STRING,required:true},
});

// export default Request;