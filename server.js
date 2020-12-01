const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { error } = require('console');
const compression = require('compression');
const enforce = require('express-sslify');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//verifica originea portulu
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));

    // req este cerinta pe care am ceruta iar
    // res este raspunsul pe care il trimitem inapoi
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

// serviceWorker
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
})

// se ocupa de efectuare plati
app.post('/payment', (req, res) => {
    // ce primim de stripe
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    //verifica efectuare plati cu cardul
    stripe.charges.create(body, (stripeError, stripeRes) =>{
        if (stripeError){
            res.status(500).send({ error: stripeError });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});