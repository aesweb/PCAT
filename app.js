const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const ejs = require("ejs");
const photoController = require("./controllers/photoControllers");
const PageController = require("./controllers/pageController");

const app = express();

//connect database
mongoose.connect("mongodb+srv://aesweb:aes.web+-@cluster0.efay0.mongodb.net/pcat-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('DB CONNECTED')
}).catch((err) => {
  console.log(err);
})

// TEMPLATE ENGINES
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", PageController.getAboutPage);
app.get("/add", PageController.getAddPage);
app.get("/photos/edit/:id", PageController.getEditPage);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
