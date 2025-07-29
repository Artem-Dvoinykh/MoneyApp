const mongoose = require('mongoose');
const { modelName } = require('./User');

const AccountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Asset', 'Liability', 'Income', 'Expense'], required: true },
    balance: { type: Number, deafault: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model('Account', AccountSchema);