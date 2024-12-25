import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ReassignRequestSchema = new Schema(
  {
    patientId: {
      type: String,
      ref: 'Patient',
      required: true,
    },
    currentDoctorId: {
      type: String,
      ref: 'Doctor',
      required: true,
    },
    PatientName: {
      type: String,
    },
    doctorName: {
      type: String,
    },
    reason: {
      type: String,
      maxlength: 500,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

export default model('ReassignRequest', ReassignRequestSchema);
