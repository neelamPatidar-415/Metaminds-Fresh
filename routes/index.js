const express = require('express');
const router = express.Router();

const Feedback = require('../models/feedback.js');

router.get('/',function(req,res){
    res.render('home');
})


router.post('/submit-feedback', async (req, res) => {
  const { feedback } = req.body;

  try {
    await Feedback.create({ message: feedback });
    console.log('✅ Feedback saved to DB');
    res.redirect('/');
  } catch (err) {
    console.error('❌ Error saving feedback:', err);
    res.status(500).send('Something went wrong');
  }
});

// router.get('/themes', function(req,res){
//     res.render('theme');
// })

module.exports = router;