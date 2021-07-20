const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post")

// UPDATE
router.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id){

    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

  try {

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      {
      $set: req.body 
      }, 
      {new:true, useFindAndModify: false}
    );

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }

  } else {
    res.status(401).json("Vous pouvez seulement mettre à jour votre compte")
  }
})

// DELETE
router.delete("/:id", async (req, res) => {
  if(req.body.userId === req.params.id){

    try {
      
      const user = await User.findById(req.params.id);

      try {
        await Post.deleteMany({username: user.username})
        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json("L'utilisateur a été supprimé...")
      } catch (err) {
        res.status(500).json(err)
      }

    } catch (err) {
      res.status(404).json("L'utilisateur demandé n'a pas été trouvé")
    }



  } else {
    res.status(401).json("Vous pouvez seulement supprimer votre compte")
  }
})

// GET USER

router.get("/:id", async (req, res) =>{
  try {
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;