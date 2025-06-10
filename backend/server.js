
const express = require('express'); // Import Express
const cors = require('cors');     // Import CORS
const { MercadoPagoConfig, Payment } = require('mercadopago'); // Import Mercado Pago SDK

// --- INITIALIZE EXPRESS APP ---
const app = express(); // <--- THIS LINE IS CRITICAL AND MUST BE AT THE TOP

// --- MIDDLEWARE ---
app.use(express.json()); // Now 'app' is defined
app.use(cors());         // And cors middleware

// --- MERCADO PAGO CLIENT INITIALIZATION ---
const client = new MercadoPagoConfig({ accessToken: 'TEST-4229850557564392-060821-3443ffae4b7c117823e81fa44ca2c288-1328561164' });

// --- PAYMENT PROCESSING ROUTE ---
app.post('/process_payment', async (req, res) => {
  try {
    const payment = new Payment(client);
    const paymentData = req.body;

    const result = await payment.create({ body: paymentData });
    console.log('Payment result:', result);
    res.status(200).json(result);
  } catch (error) {
    // It's good practice to ensure 'error' has a 'message' property
    console.error('Error processing payment:', error);
    res.status(500).json({ error: (error).message || 'An unknown error occurred' });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});