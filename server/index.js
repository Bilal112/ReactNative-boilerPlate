const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Stripe with your secret key
const stripe = Stripe('sk_test_51MfD25EAscPFjbrbGX7zzYVWfC76VL8aeFm1EK34joBOuo6tiqWPBpPdvvfVqbswqGUCyxZENpY2ks2YQZqv46gD00gXL7hmWO'); // Replace with your Stripe Secret Key

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON payloads

// Route to create PaymentIntent
app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-06-20'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10000,
    currency: 'usd',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51MfD25EAscPFjbrbzXT1fisRksQYlf5UAnuCWktaVb9tGmFZXnOJIHm4ZBPYwCWvS6kvF50VujYIOYjEFlgQ3REu00jj4rXoQt'
  }); 
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
