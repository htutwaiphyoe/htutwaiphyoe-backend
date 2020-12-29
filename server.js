// third-party modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
app.use((req, res, next) => {
    console.log(process.env);
    res.send("ok");
});
app.listen(9000);
