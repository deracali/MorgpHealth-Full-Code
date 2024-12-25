import React, { useState } from 'react';
import '../../styles/withdrawal.css'; // Ensure this file has the relevant styles
import CardImg from '../../assets/card_img.png';
import axios from 'axios'; // Import axios for making API requests
import { useParams } from 'react-router-dom'; // To access docId from route params

const Withdrawal = () => {
    const { docId } = useParams(); // Get docId from route parameters
    console.log('Doctor ID:', docId); // Log the docId

    // Define state variables for form inputs
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Prepare the data to send
        const withdrawalData = {
            fullName,
            email,
            address,
            city,
            state,
            zipCode,
            bankName,
            accountNumber: parseInt(accountNumber), // Ensure account number is an integer
            amount: parseFloat(amount), // Use user input amount for the withdrawal
            expMonth,
            expYear,
            cvv,
        };

        console.log('Withdrawal Data:', withdrawalData); // Log the data
        console.log('Doctor ID:', docId); // Log the docId

        try {
            // Send the withdrawal data to the server
            const withdrawalResponse = await axios.post(`https://morgphealth.onrender.com/api/withdraws/add`, withdrawalData);
            
            // Send the same amount to the decrement endpoint
            const decrementResponse = await axios.put(`https://morgphealth.onrender.com/api/doctor/balance/decrement/${docId}`, { amount: parseFloat(amount) });

            // Handle successful responses
            if (withdrawalResponse.data.success && decrementResponse.data.success) {
                alert('Withdrawal processed successfully and balance updated.');
            } else {
                alert(withdrawalResponse.data.message || decrementResponse.data.message); // Show error message from server
            }
        } catch (error) {
            if (error.response) {
                // Log detailed error response
                console.error('Error response:', error.response.data);
                alert(error.response.data.message || 'There was an error processing your withdrawal. Please try again.');
            } else {
                console.error('Error message:', error.message);
                alert('There was an error processing your withdrawal. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Billing Address Section */}
                    <div className="col">
                        <h3 className="title">Billing Address</h3>

                        <div className="inputBox">
                            <span>Full Name:</span>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Deo" required />
                        </div>

                        <div className="inputBox">
                            <span>Email:</span>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" required />
                        </div>

                        <div className="inputBox">
                            <span>Address:</span>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Room - Street - Locality" required />
                        </div>

                        <div className="inputBox">
                            <span>City:</span>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" required />
                        </div>

                        <div className="flex">
                            <div className="inputBox">
                                <span>State:</span>
                                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="India" required />
                            </div>

                            <div className="inputBox">
                                <span>Zip Code:</span>
                                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="123 456" required />
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="col">
                        <h3 className="title">Payment</h3>

                        <div className="inputBox">
                            <span>Cards Accepted:</span>
                            <img src={CardImg} alt="Accepted Cards" />
                        </div>

                        <div className="inputBox">
                            <span>Bank Name:</span>
                            <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Bank Name" required />
                        </div>

                        <div className="inputBox">
                            <span>Account Number:</span>
                            <input type="number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="1111-2222-3333-4444" required />
                        </div>

                        <div className="inputBox">
                            <span>Amount:</span>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount" min="0" required />
                        </div>

                        <div className="inputBox">
                            <span>Exp Month:</span>
                            <input type="text" value={expMonth} onChange={(e) => setExpMonth(e.target.value)} placeholder="January" required />
                        </div>

                        <div className="flex">
                            <div className="inputBox">
                                <span>Exp Year:</span>
                                <input type="number" value={expYear} onChange={(e) => setExpYear(e.target.value)} placeholder="2022" required />
                            </div>

                            <div className="inputBox">
                                <span>CVV:</span>
                                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="1234" required />
                            </div>
                        </div>
                    </div>
                </div>

                <input type="submit" value="Proceed to Checkout" className="submit-btn" />
            </form>
        </div>
    );
};

export default Withdrawal;
