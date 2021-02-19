const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const logs = require('./api/logs');

require('dotenv').config()



// -------------------- Initialize Express App --------------------
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// -------------------- Security and logging Middlewares --------------------
// Morgan is used for logging, can be used in production as well.
app.use(morgan('common'));
// Helmet is used for hiding x-powered-by header and adding more security headers.
app.use(helmet());
// Cors is used for blocking request coming form other than frontend.
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

// -------------------- Routes --------------------
app.use('/api/logs', logs)

// -------------------- Error handling Middlewares --------------------
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

// -------------------- Server startup --------------------
const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`🟢 Server is running on http://localhost:${port}`);
})

