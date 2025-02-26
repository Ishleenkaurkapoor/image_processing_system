import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    requestId: { type: DataTypes.UUID, allowNull: false },
    productName: { type: DataTypes.STRING, allowNull: false },
    inputImageUrl: { 
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const value = this.getDataValue("inputImageUrl");
            return value ? JSON.parse(value) : []; // ✅ Ensure it's always an array
        },
        set(value) {
            this.setDataValue("inputImageUrl", JSON.stringify(value || [])); // ✅ Prevent storing `undefined`
        }
    },
    outputImageUrl: { 
        type: DataTypes.TEXT, // Use TEXT instead of JSON
        defaultValue: "[]", // ✅ Ensure default is an empty array
        get() {
            const value = this.getDataValue("outputImageUrl");
            return value ? JSON.parse(value) : []; // ✅ Fix: Prevent JSON.parse(undefined)
        },
        set(value) {
            this.setDataValue("outputImageUrl", JSON.stringify(value || [])); // ✅ Ensure valid JSON
        }
    },
    status: { type: DataTypes.STRING, defaultValue: "PENDING" }
});

// export default Product;
