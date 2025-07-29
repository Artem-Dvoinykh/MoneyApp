// the route path: /transactions
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const authMid = require('../middleware/authMid');

// creating a transaction between accounts in the database
router.post('/transactionBetween', authMid, async(req, res) => {
    const { amount, description, debitAccount, creditAccount, category, date } = req.body;
    const userId = req.user.userId;

    const transaction = new Transaction({
        date, description, amount, debitAccount, creditAccount, category, userId
    });
    await transaction.save();

    // updating the accounts
    const isDebit = await Account.findByIdAndUpdate(debitAccount, { $inc: { balance: amount } });
    if (!isDebit) return res.status(404).json({ message: 'Debit account not found' });

    const isCredit = await Account.findByIdAndUpdate(creditAccount, { $inc: { balance: -amount } });
    if (!isCredit) return res.status(404).json({ message: 'Credit account not found' });

    res.json(transaction);
})

// creating a transaction without a debit account field (just to keep track of user's payments)
router.post('/transactionJustPayment', authMid, async(req, res) => {
    const { amount, description, creditAccount, category, date } = req.body;
    const userId = req.user.userId;

    const transaction = new Transaction({
        date, description, amount, creditAccount, category, userId
    });
    await transaction.save();

    // updating the account
    const isCredit = await Account.findByIdAndUpdate(creditAccount, { $inc: { balance: -amount } });
    if (!isCredit) return res.status(404).json({ message: 'Credit account not found' });

    res.json(transaction);
})

// getting all transactions of a user
router.get('/', authMid, async (req, res) => {
    const trans = await Transaction.find({ userId: req.user.userId })
    .populate('debitAccount')
    .populate('creditAccount')
    .sort({ date: -1 });

    res.json(trans);
})

module.exports = router;