const express = require('express');
const router = express.Router();
const {
    getAllSensorData,
    createSensorData,
    getSensorDataById,
    getSensorDataByEquipmentId,
    deleteSensorData
} = require('../controllers/sensorDataController');

// Route to get all sensor data and create new sensor data
router.route('/').get(getAllSensorData).post(createSensorData);

// Route to get sensor data by Equipment ID (Specific for history of a machine)
router.route('/equipment/:equipmentId').get(getSensorDataByEquipmentId);

// Route to get or delete specific sensor data entry by its ID
router.route('/:id').get(getSensorDataById).delete(deleteSensorData);

module.exports = router;