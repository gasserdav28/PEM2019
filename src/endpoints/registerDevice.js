const express = require('express');
const router = express.Router();


router.get('/registerDevice', function (req, res) {
  res.json({ userId: 123123123 });
  
});

module.exports = router;