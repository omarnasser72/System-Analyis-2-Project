const express = require('express');
const Contactus= require('../controllers/contact-us');
const router = express.Router();

router.post('/contact/send', Contactus.addMassage);
router.get('/contact', Contactus.getMassages);
router.get('/contact/:email', Contactus.getMassageOwn);
router.get('/', Contactus.checkServiceRunning);

module.exports = router;
