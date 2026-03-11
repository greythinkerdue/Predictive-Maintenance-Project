const Equipment = require('../models/Equipment');

/**
 * @desc    Get all equipment
 * @route   GET /api/equipment
 * @access  Public
 */

// even though this req is not being used, it is necessary to include it in the function signature to maintain the standard Express middleware format (req, res, next). 
const getAllEquipment = async (req, res, next) => {
    try {
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    } catch (error) {
        next(error);
    }
};


/**
 * @desc    Get equipment by ID
 * @route   GET /api/equipment/:id
 * @access  Public  
 */

const getEquipmentById = async (req, res, next) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(equipment);
    } catch (error) {
        next(error);
    }
};


/**
 * @desc    Get equipment by status
 * @route   GET /api/equipment/status/:status
 * @access  Public
 */

const getEquipmentByStatus = async (req, res, next) => {
    try {
        const equipment = await Equipment.find({ status: req.params.status });  
        res.status(200).json(equipment);
    } catch (error) {
        next(error);
    }
};


/**
 * @desc    Create new equipment
 * @route   POST /api/equipment
 * @access  Public
 */

const createEquipment = async (req, res, next) => {
  try {
    const { udi, productId, type } = req.body;

    if (udi === undefined || !productId || !type) {
      return res.status(400).json({
        message: 'udi, productId, and type are required'
      });
    }

    const equipmentCode = productId;

    const newEquipment = new Equipment({
      udi,
      productId,
      type,
      equipmentCode
    });

    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    next(error);
  }
};


/**
 * @desc Update equipment details
 * @route PUT /api/equipment/:id
 * @access Public
 */

const updateEquipmentDetails = async (req, res, next) => {
    try {
        const updateData = {};

        if (req.body.udi !== undefined) {
            updateData.udi = req.body.udi;
        }

        if (req.body.productId !== undefined) {
            updateData.productId = req.body.productId;
            // Keep legacy field in sync for existing endpoints/clients
            updateData.equipmentCode = req.body.productId;
        }

        if (req.body.type !== undefined) {
            updateData.type = req.body.type;
        }

        updateData.updatedAt = Date.now();

        const equipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(equipment);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update equipment status only
 * @route   PATCH /api/equipment/:id/status
 * @access  Public
 */

const updateEquipmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        // runValidators: true is important to ensure that the status value adheres to the enum {'operational', 'maintenance', 'faulty'}
        // runValidators are native to Mongoose and will automatically validate the update operation against the schema rules, ensuring data integrity without needing additional manual checks in the controller.
        const equipment = await Equipment.findByIdAndUpdate(
            req.params.id, 
            { status, updatedAt: Date.now() }, 
            { new: true, runValidators: true } 
        );
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json(equipment);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete equipment
 * @route   DELETE /api/equipment/:id
 * @access  Public
 */
const deleteEquipment = async (req, res, next) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.status(200).json({ message: `Equipment with id ${req.params.id} deleted successfully` });
    } catch (error) {
        next(error);
    }
};


module.exports = { getAllEquipment, createEquipment, getEquipmentById, updateEquipmentDetails, deleteEquipment, getEquipmentByStatus, updateEquipmentStatus };
