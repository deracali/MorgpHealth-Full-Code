import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
   userId: { type: String }, // userId field to store the user's ID
  name: { type: String }, // Name of the user
  email: { type: String }, // Email of the user
  gender: { type: String }, // Gender of the user
  spouseName: { type: String }, // Spouse's name, optional
  motherName: { type: String }, // Mother's name, optional
  fatherName: { type: String }, // Father's name, optional
  childName: { type: String }, // Child's name, optional
  age: { type: String }, // Age of the user
  location: { type: String }, // Location (e.g., country or city)
  insured: { type: Boolean, default: false }, // Whether the user is insured
  spouseAge: { type: String }, // Age of the spouse
  motherAge: { type: String }, // Age of the mother
  fatherAge: { type: String }, // Age of the father
  childAge: { type: String }, // Age of the child
  plan: { type: String }, // Plan type (e.g., Monthly, Yearly)
  planType: { type: String }, // Plan type (e.g., Monthly or Yearly)
  planPrice: { type: Number }, // Price of the selected plan
  addOns: [{
    title: { type: String }, // Add-on title
    price: { type: Number } // Add-on price
  }],
  totalPrice: { type: Number }, // Total price after adding add-ons and other costs
  country: { type: String }, // Country of the user
  title: { type: String }, // Plan title (e.g., 'Gold Plan')
  price: { type: Number }, // Initial price of the plan
  value: { type: String }, // Additional value or details about the plan
  price2: { type: String }, // Another price field (possibly for breakdown of costs)
  type: { type: String }, // Type of cover (e.g., 'Gold cover')
  cover: { type: String }, // Coverage amount (e.g., '50 Lakhs')
  policyTerm: { type: String }, // Term of the policy (e.g., '1 year')
  
  // Updated self and dependents as String type
  self: { type: String, default: 'no' }, // Whether the user is self-insured, stored as a string ('yes' or 'no')
  spouse: { type: String, default: 'no' }, // Whether the spouse is insured, stored as a string ('yes' or 'no')
  child: { type: String, default: 'no' }, // Whether the child is insured, stored as a string ('yes' or 'no')
  mother: { type: String, default: 'no' }, // Whether the mother is insured, stored as a string ('yes' or 'no')
  father: { type: String, default: 'no' }, // Whether the father is insured, stored as a string ('yes' or 'no')
}, { timestamps: true });

const insuranceModel = mongoose.models.insurance || mongoose.model('insurance', insuranceSchema);


export default insuranceModel;
