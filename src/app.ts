import express from "express";
const app = express();
const PORT = 8080;
app.get("/", (req, res) => {
    res.send("hello word update nodemon")
})
app.get("/hazi_anhh", (req, res) => {
    res.send("hello Hazi_anhh")
})
app.listen(PORT, () => {
    console.log(`My app is a funning on port ${PORT}`)
});

