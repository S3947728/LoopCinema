import { useState } from "react";
import axios from "axios";

// ---- CONSTANTS -----
const API_HOST = "http://localhost:4000";
const USERS_KEY = "users";
const USER_KEY = "user";

// ---- TEST -------

async function testAPICall() {
  const response = await axios.get(API_HOST + "/api/movies");
  const logData = response.data;
  return logData;
}

// ----DEPRECIATED---------------------
// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      email: "mbolger@gmail.com",
      username: "mbolger",
      password: "abc123",
      date: "Thu, 24 Aug 2023"
    },
    {
      email: "shekhar@gmail.com",
      username: "shekhar",
      password: "def456",
      date: "Thu, 24 Aug 2023"
    }
  ];
  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

function signupVerify(email, username, password, date) {
  const users_storage = getUsers(); // get the users fromm localStorage
  let i = 1; // i is used to count to add new account if there is no same username in the array.
  const users = [];

  console.log(users_storage)
  for(const user of users_storage) {
    users.push(user)

    if(email !== user.email){
// till last array element if there is no same email address id then it allows user to create another account
      if(users_storage.length === i) {


        console.log(users_storage.length === i)

        users.push(({email,username,password,date}))
        console.log("this is the users data = " + users)

        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setUser(email, username, date)
        console.log(users)
        return true;

      }
    }
    i++;
  }

  // console.log(users);
  return false;
}

// updateVerify does whenever user edits email or username it updates the status
function updateVerify(email_old, email, username, password, date) {
  const users_storage = getUsers(); // get the users fromm localStorage
  let i = 1; // i is used to count to add new account if there is no same username in the array.
  const users = [];

  // const [password, setPassword] = useState('')

  console.log(users_storage)
  for(const user of users_storage) {

    if(email_old === user.email){

      console.log("CHECK New email and username : " + email + " " + username + " " + password)
      users.push(({email, username, password, date}))

      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      setUser(email, username, password, date)
      console.log(JSON.stringify(users))
// it only generates new review key when there is no review with the same key and deletes previous key
      if (email_old !== email && localStorage.getItem(email_old) !== false) {
        localStorage.setItem(email, (localStorage.getItem(email_old)));
        localStorage.removeItem(email_old)
      }

    } else{

      users.push(user)
      console.log(i + " - Array LocalStorage");
    }
  }
  i++;

}

function deleteVerify(email, username, password, date) {
  const users_storage = getUsers(); // get the users fromm localStorage
  let i = 1; // i is used to count to add new account if there is no same username in the array.
  const users = [];
  // const [password, setPassword] = useState('')

  console.log(users_storage)
  for(const user of users_storage) {

    if(email !== user.email){

      console.log("CHECK New email and username : " + user.email + " " + user.username + " " + user.password)
      users.push(user)
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      removeUser();
      console.log(JSON.stringify(users))

    } else{

      console.log(i + " - Array LocalStorage");
    }
  }
  i++;

}
// verifyUser does checking email and password
function verifyUser(email, password) {
  const users = getUsers();
  for(const user of users) {

    if(email === user.email && password === user.password)
    {

      setUser(email, user.username, user.date);
      return true;
    }
  }

  return false;
}


function setUser(email, username, password, date) {
  localStorage.setItem(USER_KEY, JSON.stringify({email, username, password, date}));
}

function getUser() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).username;
  }
  return localStorage.getItem(USER_KEY);
}

function getPassword() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).password;
  }
  return localStorage.getItem(USER_KEY);
}

function getEmail() {


  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).email;
  }
  return localStorage.getItem(USER_KEY);
}
function getDate() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).date;
  }
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function addReview(rating, comment, dateOfCreation, movieName) {
  /*Function for handling the creation of a review object and pushing it to the local storage.*/
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem(user.email) != null) { //If statement handles whether or not the user has a preexisting array, if not creates one.
    const review = {
      name: movieName,
      numRate: rating,
      commentString: comment,
      date: dateOfCreation
    }
    const reviewsList = JSON.parse(localStorage.getItem(user.email));
    reviewsList.push(review);
    localStorage.setItem(user.email, JSON.stringify(reviewsList));
  } else {
    const reviewsList = [];
    const review = {
      name: movieName,
      numRate: rating,
      commentString: comment,
      date: dateOfCreation
    }
    reviewsList.push(review);
    localStorage.setItem(user.email, JSON.stringify(reviewsList));
  }
}


export {
  initUsers,
  verifyUser,
  getUser,
  getEmail,
  getPassword,
  getDate,
  removeUser,
  signupVerify,
  updateVerify,
  deleteVerify,
  addReview,
  testAPICall
}