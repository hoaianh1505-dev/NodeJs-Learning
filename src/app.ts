import express from "express";
import 'dotenv/config';
import webRoutes from "./routes/web";
import getConnection from "config/database";
import initDayabase from "config/seed";
const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
app.set('view engine', `ejs`);
app.set('views', __dirname + `/views`);

//config request.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//config static file images css javascript
app.use(express.static('public'))

//config routes
webRoutes(app);
// getConnection();

//seeding data
initDayabase();
app.listen(PORT, () => {
    console.log(`My app is a funning on Port ${PORT}`)
});

