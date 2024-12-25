import Hospital from '../models/hospitalsModel.js';

// Create a new hospital
const createHospital = async (req, res) => {
  try {
    const { name, address, phone, email, services } = req.body;

    const newHospital = await Hospital.create({
      name,
      address,
      phone,
      email,
      services,
    });

    res.status(201).json({
      message: 'Hospital created successfully',
      data: newHospital,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating hospital',
      error: error.message,
    });
  }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Hospitals retrieved successfully',
      data: hospitals,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching hospitals',
      error: error.message,
    });
  }
};

// Get a single hospital by ID
const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json({
      message: 'Hospital retrieved successfully',
      data: hospital,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching hospital',
      error: error.message,
    });
  }
};

// Update a hospital by ID
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedHospital = await Hospital.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensures data is validated during update
    });

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json({
      message: 'Hospital updated successfully',
      data: updatedHospital,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating hospital',
      error: error.message,
    });
  }
};

// Delete a hospital by ID
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHospital = await Hospital.findByIdAndDelete(id);

    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json({
      message: 'Hospital deleted successfully',
      data: deletedHospital,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting hospital',
      error: error.message,
    });
  }
};

export {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
};
