
const USERS_KEY = "users";
const USER_KEY = "user";
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


// NOTE: In this example the login is also persistent as it is stored in local storage.
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


function setUser(email, username, date) {
  localStorage.setItem(USER_KEY, JSON.stringify({email, username, date}));
}

function getUser() {
  if (localStorage.getItem(USER_KEY) !== null){
    return JSON.parse(localStorage.getItem(USER_KEY)).username;
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
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem(user.email) != null) {
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
    console.log(reviewsList);
    localStorage.setItem(user.email, JSON.stringify(reviewsList));
  } //something fucky wucky with the key, for some reason username won't register
}


export {
  initUsers,
  verifyUser,
  getUser,
  getEmail,
  getDate,
  removeUser,
  signupVerify,
  addReview
}
