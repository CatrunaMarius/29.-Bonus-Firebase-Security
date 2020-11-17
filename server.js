const express = require('express');
const cors = require('cors');
const badyParser = require('body-parser');
const path = require('path');
const { error } = require('console');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(badyParser.json());
app.use(badyParser.urlencoded({ extended:true }));

//verifica originea portulu
app.use(cors());

if(process.env.NODE_ENV === 'prduction') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // req este cerinta pe care am ceruta iar
    // res este raspunsul pe care il trimitem inapoi
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });

}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
})