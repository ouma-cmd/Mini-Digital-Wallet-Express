  function valideuser(req,res,next){
    const { name, email, phone } = req.body;
if (!name || !email || !phone)
    return res.status(400).json({ message: "All fields required" });
next()
}


module.exports = valideuser;
