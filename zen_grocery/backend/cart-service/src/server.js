const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./controllers/cartcontrollers');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cart', require('./routes/cartRoutes'));


app.listen(5002, () => {
    console.log("🧺 Cart Service running on port 5002");
});
