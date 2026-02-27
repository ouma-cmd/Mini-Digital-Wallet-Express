
let users = require("../data/users.json");

function validationWalletMidllware(req,res,next){

     const { user_id } = req.body;

  const user = users.find(u => u.id == user_id);
  if (!user)
    return res.status(404).json({ message: "User does not exist" });
next()
}


module.exports = validationWalletMidllware;