let wallets = require("../data/wallets.json");
let users = require("../data/users.json");
const fs = require("fs");

const saveWallets = () => {
  fs.writeFileSync("./data/wallets.json", JSON.stringify(wallets, null, 2));
};

exports.createWallet = (req, res) => {
  const { user_id, name } = req.body;

  const user = users.find(u => u.id == user_id);
  if (!user)
    return res.status(404).json({ message: "User does not exist" });

  const newWallet = {
    id: Date.now(),
    user_id,
    name,
    sold: 0
  };

  wallets.push(newWallet);
  saveWallets();

  res.status(201).json(newWallet);
};

exports.getWallets = (req, res) => {
  res.status(200).json(wallets);
};

exports.getWalletById = (req, res) => {
  const wallet = wallets.find(w => w.id == req.params.id);
  if (!wallet)
    return res.status(404).json({ message: "Wallet not found" });

  res.status(200).json(wallet);
};

exports.updateWallet = (req, res) => {
  const wallet = wallets.find(w => w.id == req.params.id);
  if (!wallet)
    return res.status(404).json({ message: "Wallet not found" });

  wallet.name = req.body.name || wallet.name;
  saveWallets();

  res.status(200).json(wallet);
};

exports.deleteWallet = (req, res) => {
  const index = wallets.findIndex(w => w.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Wallet not found" });

  wallets.splice(index, 1);
  saveWallets();

  res.status(200).json({ message: "Wallet deleted" });
};

exports.deposit = (req, res) => {
  const wallet = wallets.find(w => w.id == req.params.id);
  if (!wallet)
    return res.status(404).json({ message: "Wallet not found" });

  const { amount } = req.body;

  if (!amount || amount <= 0)
    return res.status(400).json({ message: "Amount must be positive" });

  wallet.sold += amount;
  saveWallets();

  res.status(200).json(wallet);
};

exports.withdraw = (req, res) => {
  const wallet = wallets.find(w => w.id == req.params.id);
  if (!wallet)
    return res.status(404).json({ message: "Wallet not found" });

  const { amount } = req.body;

  if (!amount || amount <= 0)
    return res.status(400).json({ message: "Amount must be positive" });

  if (wallet.sold < amount)
    return res.status(400).json({ message: "Insufficient balance" });

  wallet.sold -= amount;
  saveWallets();

  res.status(200).json(wallet);
};
