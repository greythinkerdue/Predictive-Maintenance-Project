const express = require('express');
const router = express.Router();
const { getAllEquipment, 
    createEquipment, 
    getEquipmentById, 
    updateEquipmentDetails, 
    deleteEquipment, 
    getEquipmentByStatus, 
    updateEquipmentStatus } = require('../controllers/equipmentController');

// Route to get all equipment and create new equipment
router.route('/').get(getAllEquipment).post(createEquipment);

// Route to get, update, or delete a specific equipment by ID
router.route('/:id').get(getEquipmentById).put(updateEquipmentDetails).delete(deleteEquipment);

// Route to get equipment by status
router.route('/status/:status').get(getEquipmentByStatus);

// Route to update equipment status
router.route('/:id/status').patch(updateEquipmentStatus);

module.exports = router;