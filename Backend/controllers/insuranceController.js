import insuranceModel from "../models/InsuranceModel.js";

// Add Insurance
const addInsurance = async (req, res) => {
    try {
        const {
            name,
            email,
            userId,
            spouseName,
            motherName,
            fatherName,
            childName,
            age,
            spouseAge,
            motherAge,
            fatherAge,
            childAge,
            location,
            country,
            title,
            price,
            value,
            price2,
            insured,
            plan,
            planType,
            planPrice,
            addOns,
            totalPrice,
            type,
            cover,
            policyTerm,
            self, // Coming from the body
            spouse, // Coming from the body
            child, // Coming from the body
            mother, // Coming from the body
            father // Coming from the body
        } = req.body;

        // Prepare the insurance data to be saved
        const insuranceData = {
            name,
            email,
            userId,
            spouseName,
            motherName,
            fatherName,
            childName,
            age,
            spouseAge,
            motherAge,
            fatherAge,
            childAge,
            location,
            country,
            title,
            price,
            value,
            price2,
            insured: insured || false, // Defaulting to false if not provided
            plan,
            planType,
            planPrice,
            addOns: addOns || [], // Defaulting to empty array if not provided
            totalPrice,
            type,
            cover,
            policyTerm,
            // Use the values provided in the body for self, spouse, child, mother, and father
            self,
            spouse,
            child,
            mother,
            father
        };

        // Create a new insurance document using the insurance data
        const newInsurance = new insuranceModel(insuranceData);

        // Save the document to the database
        await newInsurance.save();

        // Respond with a success message
        res.json({ success: true, message: "Insurance Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const getAllInsurance = async (req, res) => {
    try {
        // Fetch all insurance records
        const insuranceData = await insuranceModel.find();

        if (!insuranceData || insuranceData.length === 0) {
            return res.json({ success: false, message: "No insurance records found" });
        }

        res.json({ success: true, insuranceData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getAllInsurance };


// Get Insurance by userId
const getInsurance = async (req, res) => {
    try {
        const { userId } = req.params;
        const insuranceData = await insuranceModel.findOne({ userId });

        if (!insuranceData) {
            return res.json({ success: false, message: "Insurance not found" });
        }

        res.json({ success: true, insuranceData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update Insurance
const updateInsurance = async (req, res) => {
    try {
        const { insuranceId } = req.params;
        const updateFields = req.body;

        const updatedInsurance = await insuranceModel.findByIdAndUpdate(
            insuranceId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedInsurance) {
            return res.json({ success: false, message: "Insurance not found" });
        }

        res.json({ success: true, message: "Insurance Updated", updatedInsurance });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete Insurance
const deleteInsurance = async (req, res) => {
    try {
        const { insuranceId } = req.params;

        const deletedInsurance = await insuranceModel.findByIdAndDelete(insuranceId);

        if (!deletedInsurance) {
            return res.json({ success: false, message: "Insurance not found" });
        }

        res.json({ success: true, message: "Insurance Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getInsurance, addInsurance, updateInsurance, deleteInsurance };
