import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

// Load environment variables
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_NAME = process.env.DB_NAME || "image_processing_db";
const DB_PASSWORD = process.env.DB_PASSWORD || 'Ishleen@052';

// Initialize Sequelize for MySQL connection
const sequelize = new Sequelize(DB_NAME, DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql", 
    logging: false, 
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default sequelize;