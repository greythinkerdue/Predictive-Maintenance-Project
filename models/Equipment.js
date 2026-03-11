const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    udi: {
        type: Number,
        unique: true,
        sparse: true
    },
    productId: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    name: String,
    type: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    equipmentCode: {
        type: String,
        unique: true,
        required: true,
        sparse: true
    },
    location: String,
    status: {
        type: String,
        enum: ['operational', 'maintenance', 'faulty'],
        default: 'operational'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Equipment', EquipmentSchema); // Export the model directly

// Export the model using a variable for better readability and potential future extensions
// const Equipment = mongoose.model('Equipment', EquipmentSchema); 
// module.exports = Equipment;
