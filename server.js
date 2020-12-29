const app = require("./app");

app.use((req, res, next) => {
    res.send("ok");
});
app.listen(9000);
