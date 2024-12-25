import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },  // User or Doctor ID
    senderModel: { type: String, enum: ['User', 'Doctor'], required: true },  // Indicates sender type
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
