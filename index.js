const express = require('express');
var cors = require('cors')
var http = require('http');

const passport = require("passport");
const router = express.Router({ mergeParams: true });
require("./dbconnection/db");

const app = express()
app.use(
    express.urlencoded()
);
let server = http.Server(app);
app.use(passport.initialize());
require("./utils/passport")(passport);


app.use(express.json());

let makkajproduct = require('./router/routes/productrouter');
let cart = require('./router/routes/cartrouter');
let user = require('./router/routes/user');
let address = require('./router/routes/address');
let orders = require('./router/routes/orderrouter');

//let medicinecategory = require('./router/medicines/categoryrouter');
app.use(cors())
app.use('/api', makkajproduct);
app.use('/api', cart);
app.use('/api', user);
app.use('/api', address);
app.use('/api', orders);

//app.use('/api', medicinecategory);

//-----------------------------------------------------------port--------------------------------------------------------------------
const port = 5000;


server.listen(port, (req, res) => {
    console.log('server start at ' + port);
})