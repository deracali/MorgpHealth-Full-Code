import ReassignRequest from '../models/reassign.js';

const createReassignRequest = async (req, res) => {
  try {
    const { patientId, currentDoctorId, PatientName, doctorName, reason } = req.body;

    const newRequest = await ReassignRequest.create({
      patientId,
      currentDoctorId,
      PatientName,
      doctorName,
      reason,
    });

    res.status(201).json({
      message: 'Reassignment request created successfully',
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reassignment request', error: error.message });
  }
};

const getAllReassignRequests = async (req, res) => {
  try {
    const requests = await ReassignRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Reassignment requests retrieved successfully',
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reassignment requests', error: error.message });
  }
};



const deleteReassignRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await ReassignRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Reassignment request not found' });
    }

    res.status(200).json({
      message: 'Reassignment request deleted successfully',
      data: deletedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reassignment request', error: error.message });
  }
};

export {
  createReassignRequest,
  getAllReassignRequests,
  deleteReassignRequest,
};
