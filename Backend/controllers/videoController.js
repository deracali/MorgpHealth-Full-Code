import Video from '../models/videoModel.js';  // Your Video model

// Controller to update the video duration
const updateVideoDuration = async (req, res) => {
    const { videoId } = req.params;
    const { doctorId, patientId, appointmentId, meetingDuration } = req.body;

    try {
        // Find the video by ID and update the meeting duration, doctorId, patientId, and appointmentId
        const video = await Video.findByIdAndUpdate(
            videoId,
            { doctorId, patientId, appointmentId, meetingDuration },
            { new: true }
        );

        if (!video) {
            return res.status(404).json({ message: 'Video call not found' });
        }

        res.status(200).json({ message: 'Video duration updated successfully', video });
    } catch (error) {
        console.error('Error updating video duration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { updateVideoDuration };
