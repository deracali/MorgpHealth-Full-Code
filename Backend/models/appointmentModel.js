import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
  concern: { type: String },
  description: { type: String },
  date: { type: Number },
  cancelled: { type: Boolean, required: false },
  paymentSuccessful: { type: Boolean, default: false },
  hospitalName2: {
    type: String,
  },
  investigations: [
    {
      name: { type: String },
      result: { type: Number },
      referenceRange: { type: String },
      unit: { type: String },
      flag: { type: String, enum: ['High', 'Low', 'Normal'], default: 'Normal' },
    },
  ],
  notes: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  service: {
    name: { type: String, required: true }, // Name of the service (e.g., "Headache")
    fee: { type: Number, required: true }, // Fee for the selected service
  },
  age: { type: String, required: false },
  sex: { type: String, required: false },
  meetingStart: { type: Date, required: false },      // Start time of the meeting
  meetingEnd: { type: Date, required: false },        // End time of the meeting
  meetingDuration: { type: Number, required: false }, // Duration in seconds
  callDuration: { type: Number, required: false },    // Call duration in seconds
  isCompleted: { type: Boolean, required: false },
  timer: { type: Boolean, default: true },
  status: { type: String, default: 'pending' },
  medicines: [
    {
      name: { type: String, required: false },
      dosage: { type: String, required: false },
      frequency: { type: String, required: false },
    },
  ],
  discontinue: { type: Boolean, default: false },
  updatedmedicine: [
    {
      name: { type: String, required: false },
      dosage: { type: String, required: false },
      frequency: { type: String, required: false },
    },
  ],
  discontinue2: { type: Boolean, default: true },
  hospitalName1: { type: String, required: false },
}, { timestamps: true }); // This adds createdAt and updatedAt

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel;
