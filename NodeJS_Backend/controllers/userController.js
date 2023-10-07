const db = require("../database");
const argon2 = require("argon2");


//Create related Functions
exports.createUser = async (req, res) => {
  console.log("REQUEST DATA")
  console.log(req.body)
  const hashedPassword = await argon2.hash(req.body.password, {type: argon2.argon2id});
  
  const user = await db.users.create({
    username: req.body.username,
    passwordHash: hashedPassword,
    email: req.body.email,
    dateOfCreation: req.body.dateOfCreation
  });
  res.json(user);
}

// Select one user for the database if username and password are a match.
exports.loginUser = async (req, res) => {
  const user = db.users.findByPk(req.query.username);
  console.log(JSON.stringify(user))
  if(user == null || await argon2.verify(user.passwordHash, req.query.passwordHash) == false){
    // Login fail
    res.json(null)
  } else {
    res.json(user)
  }
}

//Read All Users
exports.findAllUsers = async (req,res) => {
  const users = await db.users.findAll();
  res.json(users);
}

// Select one user from the database.
exports.findSingleUser = async (req, res) => {
  const user = await db.users.findByPk(req.params.username);
  res.json(user);
}

//Update related Functions
exports.updateUser = async (req, res) => {
  const username = req.params.username;



  // const updateResult = await db.user.update({
  //   //TBD
  //  },
  //  {
  //    where: {
  //      userame: req.body.username
  //    }
  //  });
  //  res.json(updateResult);
}


//Delete related Functions

exports.deleteUser = async (req, res) => {
  const purgeResult = await db.user.destroy({
    where: {
      username: req.body.username
    }
  })
  res.json(purgeResult);
}
