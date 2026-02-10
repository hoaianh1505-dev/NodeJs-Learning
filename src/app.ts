import express from "express";
import 'dotenv/config';
import webRoutes from "src/routes/web";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
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

//config passport
app.use(passport.initialize());
configPassportLocal();
//config routes
webRoutes(app);
// getConnection();

//seeding data
initDatabase();

//handle not found 404 
app.use((req, res) => {
    res.status(404).render("client/404/404.ejs");
})

app.listen(PORT, () => {
    console.log(`My app is a funning on http://localhost:${PORT}`)
});

