const handleLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({message: "logout successfully"})
  }

module.exports = {handleLogout}