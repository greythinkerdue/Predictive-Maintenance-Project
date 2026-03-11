const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
    },
    airTemperatureK: Number,
    processTemperatureK: Number,
    rotationalSpeedRpm: Number,
    torqueNm: Number,
    toolWearMin: Number,
    machineFailure: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    twf: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    hdf: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    pwf: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    osf: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    rnf: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    temperature: Number,
    vibration: Number,
    pressure: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SensorData', SensorDataSchema); // Export the model directly

// Export the model using a variable for better readability and potential future extensions
// const SensorData = mongoose.model('SensorData', SensorDataSchema); 
// module.exports = SensorData;
