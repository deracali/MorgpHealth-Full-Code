import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import userModel from '../models/userModel.js';

// Generate OTP (4-digit OTP)
const generateOtp = () => (
  (Math.floor(1000 + Math.random() * 9000)).toString() // 4-digit OTP
);

// Send OTP to email
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'chideracalistus1999@gmail.com', // Replace with a valid email
      pass: 'mpbozidepcttbtsu', // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: 'chideracalistus1999@gmail.com', // Sender email
    to: email, // Recipient email
    subject: 'OTP for Password Reset', // Subject of the email
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              color: #4CAF50;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin: 10px 0;
              padding: 10px;
              background-color: #f1f1f1;
              border-radius: 4px;
              text-align: center;
            }
            .footer {
              font-size: 14px;
              color: #777;
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              Password Reset Request
            </div>
            <div class="message">
              <p>Hello,</p>
              <p>You requested to reset your password. To proceed, please use the following OTP:</p>
            </div>
            <div class="otp">
              ${otp}
            </div>
            <div class="message">
              <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
              <p>If you did not request this reset, you can ignore this email.</p>
            </div>
            <div class="footer">
              <p>Regards,</p>
              <p><strong>Your Company Name</strong></p>
              <p>For any support, contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `, // HTML content of the email
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send OTP email');
  }
};

// Stage 1: Send OTP to user's email
const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP (4 digits)
    const otp = generateOtp();

    // Store OTP in database (valid for 10 minutes)
    user.passwordResetOtp = otp;
    user.otpExpiration = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    // Send OTP to user's email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to your email. Please check your inbox.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stage 2: Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is correct
    if (user.passwordResetOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stage 3: Reset Password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body; // Only email and new password are required now

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { forgetPassword, verifyOtp, resetPassword };
