import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongdb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import insuranceRouter from './routes/insuranceRoute.js';
import WithdrawalRouter from './routes/withdrawalRoute.js';
import reviewDocRouter from './routes/reviewDocRoute.js';
import chatRoute from './routes/chatRoute.js';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Socket.IO
import { initializeWebSocket } from './websocket.js';
import videoRouter from './routes/videoRoute.js';
import staffRouter from './routes/staffRoute.js';
import blogRouter from './routes/blogRoute.js';
import  notificationRouter from "./routes/notificationRoute.js";
import Stripe from 'stripe';
import User from './models/userModel.js'
import noticeRouter from './routes/noticRouter.js';
import reassignRouter from './routes/reassignRoute.js';
import hospitalRouter from './routes/hospitalRoute.js';
import RequestRouter from './routes/requestRoute.js';

// Initialize Stripe with the secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
    origin: '*', // or the correct frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
     allowedHeaders: ['Content-Type', 'Authorization', 'token', 'dtoken', 'atoken'], 
  }));


app.post('/create-intent', async (req, res) => {
    const { amount, docName, docEmail, userName, userEmail } = req.body;

    try {
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userEmail, // Email for receipt and future payments
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Payment for ${docName}`,
                            description: `Doctor Email: ${docEmail}, User: ${userName}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://frontend-morgphealth.netlify.app/paymentsuccess',
            cancel_url: 'https://frontend-morgphealth.netlify.app/paymentfailed',
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message);
        res.status(500).json({ error: error.message });
    }
});



app.post('/create-intents', async (req, res) => {
    const { amount, name, email } = req.body;

    try {
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email, // Email for receipt and future payments
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Payment for ${name}`,
                            description: `Insurance: ${name}, User Email: ${email}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://frontend-morgphealth.netlify.app/paymentsuccess',
            cancel_url: 'https://frontend-morgphealth.netlify.app/paymentfailed',
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message);
        res.status(500).json({ error: error.message });
    }
});



app.post('/create-intentss', async (req, res) => {
    const { amount, docName, docEmail,userName,userEmail,appointmentId } = req.body;

    try {
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userEmail, // Email for receipt and future payments
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Payment for ${userName}`,
                            description: `Lab and Prescription update for: ${userName}, User Email: ${userEmail}, doctor Email: ${docEmail}, appointment Id:${appointmentId}`,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://frontend-morgphealth.netlify.app/paymentsuccess',
            cancel_url: 'https://frontend-morgphealth.netlify.app/paymentfailed',
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message);
        res.status(500).json({ error: error.message });
    }
});



app.get('/api/usertimer/timer-status/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user's timer status from the database
    const user = await User.findById(userId);
    if (user) {
      return res.json({ timer: user.timer }); // Return the timer status to the frontend
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user timer status:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Define your routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/insurance', insuranceRouter);
app.use('/api/withdraws', WithdrawalRouter);
app.use('/api/addDoc', reviewDocRouter);
app.use('/api/chat', chatRoute);
app.use('/api/videos', videoRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/staff', staffRouter);
app.use('/api/blogs', blogRouter);
app.use("/api/notifications", notificationRouter);
app.use('/api/request', RequestRouter);
app.use('/api/reassign', reassignRouter);
app.use('/api/hospitals', hospitalRouter);




app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Create an HTTP server and bind it to your Express app
const server = http.createServer(app);
initializeWebSocket(server);

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust according to your client URL
        methods: ["GET", "POST"],
    },
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for messages from clients
    socket.on('sendMessage', (message) => {
        // Broadcast the message to all connected clients
        io.emit('receiveMessage', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
export { io };
// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`));
