let users = require("../data/users.json");
const fs = require("fs");

const saveUsers = () => {
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
};

exports.createUser = (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone)
    return res.status(400).json({ message: "All fields required" });

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
  };

  users.push(newUser);
  saveUsers();

  res.status(201).json(newUser);
};

exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

exports.getUserById = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

exports.updateUser = (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;

  saveUsers();
  res.status(200).json(user);
};

exports.deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  saveUsers();

  res.status(200).json({ message: "User deleted" });
};
