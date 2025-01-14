const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },

    quantity: {
        type: Number,
        required: true
    }
});

CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;