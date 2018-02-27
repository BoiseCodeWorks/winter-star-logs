var router = require("express").Router();
var Users = require("../models/user");

var errorMessage = { error: "Invalid Auth" };

router.post("/auth/register", (req, res) => {
  // @ts-ignore
  req.body.password = Users.generateHash(req.body.password);
  req.body.role = 'public'
  Users.create(req.body)
    .then(user => {
      if (!user) {
        return res.status(401).send(errorMessage);
      }
      user.password = null;
      delete user.password;
      req.session.uid = user._id
      res.send(user);
    })
    .catch(err => res.status(401).send(errorMessage));
});

router.post("/auth/login", (req, res) => {
  Users.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).send(errorMessage);
    }

    if (!user.validatePassword(req.body.password)) {
      return res.status(401).send(errorMessage);
    }
    user.password = null;
    delete user.password;
    req.session.uid = user._id
    res.send(user);
  });
});


router.get('/auth/authenticate', (req, res) =>{
  Users.findById(req.session.uid)
    .then(user=>{
      if(!user){
        return res.status(401).send({error: "Please Login to Continue"})
      }
      user.password = null;
      return res.status(200).send(user)
    }).catch(err=>{
      return res.status(500).send({
        error:err
      })
    })
})

router.delete('/auth/logout', (req, res)=>{
  req.session.destroy()
  res.send("Successfully logged out")
})




module.exports = router;
