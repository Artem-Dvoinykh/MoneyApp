const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    date: { type: Date, deafault: Date.now },
    description: String,
    amount: { type: Number, required: true },
    debitAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    creditAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
        type: String,
        enum: ['Food', 'Medicine', 'Transport', 'Entertainment', 'Clothing', 'Household', 'Pets', 'Travel', 'Savings', 'Other'],
        required: true
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema);




