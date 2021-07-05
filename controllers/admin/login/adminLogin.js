const adminLogin = (req, res, jwt) => {
  const email = req.body.email;
  const pass = req.body.password;
  console.log(req.connection.remoteAddress,
req.connection.remotePort);

  if (email === "admin@meaec.edu.in" && pass === "adminpass") {
    const accessToken = jwt.sign(
      { username: email },
      process.env.ACCESS_SECRET
    );
    console.log("validuser");
    res.cookie("JWT", accessToken)
      res.json({erro:false})
  } else {
    res.json({ error: true }).status(400);
    console.log(email, pass);
  }
};
module.exports = {
  adminLogin,
};
