const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});
const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

// Get the book list available in the shop
public_users.get('/', function (req, res) {

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 2000)
  })

  myPromise.then(() => {
    res.send(books);
  })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  let isbn = req.params.isbn;
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved")

    }, 2000)
  })

  myPromise.then(() => {
    res.send(books[isbn]);
  })
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  let author = req.params.author;
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    }, 2000)
  })

  myPromise.then(() => {
    let foundBook = null;
    for (let i = 1; i <= 10; i++) {
      if (books[i].author === author) {
        foundBook = books[i];
        break;
      }
    }
    if (foundBook) {
      res.send(foundBook);
    } else {
      res.status(404).send("Book with that author is not found");
    }
  }).catch((error) => {
    res.status(404).send("Error: " + error);
  });

});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let title = req.params.title;
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise resolved")

    }, 2000)
  })
  myPromise.then(() => {
    let foundBook = null;
    for (let i = 1; i <= 10; i++) {
      if (books[i].title === title) {
        foundBook = books[i];
        break;
      }
    }
    if (foundBook) {
      res.send(foundBook);
    } else {
      res.status(404).send("Book with that title is not found");

    }
  })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
