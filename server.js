// third-party modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception", err);
    process.exit(1);
});

dotenv.config({ path: "./.env" });
// own modules
const app = require("./app");

const db = process.env.DB_CONNECTION_STRING.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(db, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
    console.log("Database connected");
});

const port = process.env.PORT || 9000;
const server = app.listen(port);

process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection", err);
    server.close(() => {
        process.exit(1);
    });
});
