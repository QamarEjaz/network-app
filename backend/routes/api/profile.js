const express=require('express')
const route=express.Router()
const auth=require('../../middleware/auth')
const Profile=require('../../models/Profile')
const { check, validationResult } = require("express-validator");
//@route Get  api/profile/me
//@desc  Get current Users profile
//@access Private

route.get("/me",auth,async(req,res)=>{
  try {
    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
    if(!profile){
        return res.status(400).json({msg:"There is no Profile for this user"})
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
});
//@route Get  api/profile
//@desc  Get create and update profile
//@access Private
route.post('/',
           auth,
           [check("status","status is required").not().notEmpty(),
           check('skills','Skills is required').not().notEmpty()
],
async(req,res)=>{
const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
  // destructure the request
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;
    // build a profile
    const profileFields = {
        user: req.user.id,
        website:
          website && website !== ''
            ? normalize(website, { forceHttps: true })
            : '',
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest
      };
    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;
    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }  

})
module.exports=route