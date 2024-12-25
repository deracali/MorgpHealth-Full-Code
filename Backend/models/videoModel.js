import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }, // Added appointmentId field
    date: { type: Date, default: Date.now }, // Optional: If you want to automatically set the current date
    meetingDuration: { type: Number },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
