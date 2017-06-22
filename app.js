const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

// imports the ejs package and allows us to use separate view files
app.set("view engine", "ejs");

//tells express taht our view files are in the pages/folder
// (the default folder name is views/)
app.set("views", "pages");

// hosts all the files inside the public/ folder from localhost: 3000
app.use(express.static("public"));

// tells Express taht we want to use the EJS layouts package
app.use(expressLayouts);

// tells Express that our layout file is "pages/my-master-layout.ejs"
// just like views, layout is the default 
app.set("layout", "my-master-layout.ejs");

// ROUTES GO HERE -------------------------------------------

//        request, response
app.get("/", (req, res, next) => {

  const myName = "Jessica";
  const age = 28;

    // send pages/home-view.ejs to the browser
  res.render(
    "home-view.ejs", //1st argument -> name of view files
    {
      viewNameVar: myName,  // 2nd arg -> object to transfer vaiables to the view files
      viewAge: age
      }
  );
});

const bookList = [  // we put this outside of the route
                    // so other routes can also use it
  "Dune",
  "Lord of the Rings",
  "Harry Potter",
  "The Martian",
  "Elon Musk",
  "Necronomicon",
  "Eloquent Javascript"
];

app.get("/books", (req, res, next) => {
    // sends pages/books-view.ejs to the browser
  res.render("books-view.ejs", {
    booksForView: bookList
  });
});

const accomplishmentsList = [
  {award: "Best TA 21 and under", type:"performance", person: "Kevin"},
  {award: "Coolest Swiss person in Class", type:"personalilty", person: "Daniel K."},
  {award: "Most slices of Pizza Eaten", type:"strength", person: "Nick E."},
  {award: "Most beautiful former Cook", type:"looks", person: "Josh"},
  {award: "Best Last Name", type:"name", person: "Darren"},
];

app.get("/accomplishments", (req, res, next) => {
  const randomIndex = Math.floor(Math.random() * accomplishmentsList.length);
  res.render("accomplishments-view.ejs", {
    accomplishmentsForView: accomplishmentsList,
    featuredAccomplishment: accomplishmentsList[randomIndex]
  });
});

//----------------------------------------------------------



app.listen(3000);
