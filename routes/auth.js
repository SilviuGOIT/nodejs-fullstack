// cream practic REST API-ul
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

//simulam o baza de date
const users = [];

//Middleware care valideaza datele introduse de user
function validateInput(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username si password nu trebuie sa fie nule" });
  }
  next();
}

//ruta de register
router.post("/register", validateInput, async (req, res) => {
  const { username, password } = req.body;

  //trebuie sa verificam daca userul exista
  const userExist = users.find((user) => user.username === username);

  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //jsonwebtoken

  //simulam salvarea userului in baza de date
  users.push({ username, password: hashedPassword });

  return res.status(201).json({ message: "User registered succesfully!" });
});

//ruta de login
router.post("/login", validateInput, async (req, res) => {
  const { username, password } = req.body;

  //verificam daca userul exista sau nu in BD
  const userExist = users.find((user) => user.username === username);
  if (!userExist) {
    return res.status(400).json({ message: "User not found" });
  }

  //verificam daca este buna parola
  const isMatch = await bcrypt.compare(password, userExist.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  return res.status(201).json({ message: "Login succesfull!" });
});

module.exports = router;
