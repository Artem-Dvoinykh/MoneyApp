// the route path: /accounts
const experss = require('express');
const router = experss.Router();
const Account = require('../models/Account');
const authMid = require('../middleware/authMid');

// account creation
router.post('/', authMid, async (req, res) => {
    const { name, type } = req.body;
    const account = new Account({ name, type, userId: req.user.userId });
    await account.save();
    res.json(account);
});

// get all accounts for a user
router.get('/', authMid, async (req, res) => {
    const accounts = await Account.find({ userId: req.user.userId });
    res.json(accounts);
})

module.exports = router;


