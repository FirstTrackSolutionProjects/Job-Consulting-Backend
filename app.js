const express = require('express');
const cors = require('cors')
const app = express();
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors())

app.use((req, res, next) => {
  if (Buffer.isBuffer(req.body)) {
    req.rawBody = req.body;
    req.body = req.body.toString(); // convert buffer to string
    req.body = JSON.parse(req.body);
  }
  next();
});

app.use(bodyParser.json());

const loanRoutes = require('./routes/loanRoutes');
const s3Routes = require('./routes/s3Routes');
const partnerRoutes = require('./routes/partnerRoutes');
const creditCardRoutes = require('./routes/creditCardRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');

app.use('/loans', loanRoutes);
app.use('/s3', s3Routes);
app.use('/partners', partnerRoutes);
app.use('/credit-card', creditCardRoutes);
app.use('/insurance', insuranceRoutes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

  module.exports.handler = serverless(app);

