const express = require('express');
const crypto = require('crypto');
const router = express.Router();


router.get('/', function (req, res) {
  res.json({ userId: 123123123 });
  
});

module.exports = router;