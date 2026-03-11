const SensorData = require('../models/SensorData');
const Equipment = require('../models/Equipment');
const DATASET_BINARY_FIELDS = ['machineFailure', 'twf', 'hdf', 'pwf', 'osf', 'rnf'];
const DATASET_NUMERIC_FIELDS = [
    'airTemperatureK',
    'processTemperatureK',
    'rotationalSpeedRpm',
    'torqueNm',
    'toolWearMin'
];

/**
 * @desc    Get all sensor data
 * @route   GET /api/sensor-data
 * @access  Public
 */

const getAllSensorData = async (req, res, next) => {
    try {
        const sensorData = await SensorData.find()
            .populate('equipmentId', 'udi productId type');
        res.status(200).json(sensorData);
    } catch (error) {
        next(error); 
    }
};


/**
 * @desc    Get sensor data by ID
 * @route   GET /api/sensor-data/:id
 * @access  Public
 */

const getSensorDataById = async (req, res, next) => {
    try {
        const sensorData = await SensorData.findById(req.params.id)
            .populate('equipmentId', 'udi productId type');
        if (!sensorData) {
            return res.status(404).json({ message: 'Sensor data not found' });
        }
        res.status(200).json(sensorData);
    } catch (error) {
        next(error);
    }
};


/**
 * @desc    Create new sensor data
 * @route   POST /api/sensor-data
 * @access  Public
 */

const createSensorData = async (req, res, next) => {
    try {
        const {
            equipmentId,
            airTemperatureK,
            processTemperatureK,
            rotationalSpeedRpm,
            torqueNm,
            toolWearMin,
            machineFailure,
            twf,
            hdf,
            pwf,
            osf,
            rnf
        } = req.body;

        if (!equipmentId) {
            return res.status(400).json({ message: 'Equipment ID is required' });
        }

        const missingNumericFields = DATASET_NUMERIC_FIELDS.filter((fieldName) => req.body[fieldName] === undefined);
        if (missingNumericFields.length > 0) {
            return res.status(400).json({
                message: `Missing required numeric fields: ${missingNumericFields.join(', ')}`
            });
        }

        const invalidNumericFields = DATASET_NUMERIC_FIELDS.filter((fieldName) => {
            const value = req.body[fieldName];
            return typeof value !== 'number' || Number.isNaN(value);
        });

        if (invalidNumericFields.length > 0) {
            return res.status(400).json({
                message: `Numeric fields must be valid numbers: ${invalidNumericFields.join(', ')}`
            });
        }

        const invalidBinaryFields = DATASET_BINARY_FIELDS.filter((fieldName) => {
            const value = req.body[fieldName];
            return value !== undefined && value !== 0 && value !== 1;
        });

        if (invalidBinaryFields.length > 0) {
            return res.status(400).json({
                message: `Binary fields must be 0 or 1: ${invalidBinaryFields.join(', ')}`
            });
        }

        const equipmentExists = await Equipment.findById(equipmentId);
        if (!equipmentExists) {
            return res.status(404).json({ message: `Equipment with ID ${equipmentId} not found` });
        }
        const newSensorData = new SensorData({
            equipmentId,
            airTemperatureK,
            processTemperatureK,
            rotationalSpeedRpm,
            torqueNm,
            toolWearMin,
            machineFailure,
            twf,
            hdf,
            pwf,
            osf,
            rnf
        });

        await newSensorData.save();
        res.status(201).json(newSensorData); 
    } catch (error) {
        next(error);
    }
};


/**
 * @desc    Get sensor data for a specific equipment
 * @route   GET /api/sensor-data/equipment/:equipmentId
 * @access  Public
 */

const getSensorDataByEquipmentId = async (req, res, next) => {
    try {
        // we can also add sorting by timestamp to get the most recent data first
        const sensorData = await SensorData.find({ equipmentId: req.params.equipmentId }).sort({ timestamp: -1 });
        res.status(200).json(sensorData);
    } catch (error) {
        next(error);
    }
};


/**
 * @desc    Delete sensor data
 * @route   DELETE /api/sensor-data/:id
 * @access  Public
 */

const deleteSensorData = async (req, res, next) => {
    try {
        // findByIdAndDelete will return the deleted document if it was found and deleted, or null if it was not found
        const sensorData = await SensorData.findByIdAndDelete(req.params.id);
        if (!sensorData) {
            return res.status(404).json({ message: 'Sensor data not found' });
        }
        res.status(200).json({ message: `Sensor data with id ${sensorData._id} deleted successfully` });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllSensorData, getSensorDataById, createSensorData, getSensorDataByEquipmentId, deleteSensorData
};
