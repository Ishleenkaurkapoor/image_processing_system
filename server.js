import app from './app.js'
import sequelize  from "./src/config/db.js";

// Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("Database connection error:", err);
});