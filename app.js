// Import
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var config = require('./config.js');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var json2xls = require('json2xls');
var multer = require('multer');
var xlsxtojson = require("xlsx-to-json-lc");
var bodyParser = require('body-parser');
//var stripe = require("stripe")("sk_test_4oFGt3p491ust1hcWuR27QF1");



var app = express();


// var plan = stripe.plans.create({
//   name: "Basic Plan",
//   id: "basic-monthly",
//   interval: "month",
//   currency: "usd",
//   amount: 0,
// }, function(err, plan) {
//   // asynchronously called
// });
//
// // Set your secret key: remember to change this to your live secret key in production
// // See your keys here: https://dashboard.stripe.com/account/apikeys
//
// var customer = stripe.customers.create({
//   email: "jenny.rosen@example.com",
// }, function(err, customer) {
//   // asynchronously called
// });
//
// stripe.subscriptions.create({
//   customer: customer.id,
//   plan: "basic-monthly",
// }, function(err, subscription) {
//   // asynchronously called
// });








 var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')                                 //folder to save uploading file
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({
                    storage: storage
                }).single('file');

    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
              try {
                xlsxtojson({
                    input: req.file.path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.json({error_code:1,err_desc:err, data: null});
                    }
                    res.json({error_code:0,err_desc:null, data: result});
                });
            } catch (e){
                res.json({error_code:1,err_desc:"Corrupted excel file or Not valid excel file"});
            }
            console.log(req.file.path);
        })

    });

// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);

// users = [];
// connections = [];

// server.listen(process.env.PORT || 3000);
// console.log('Server Running');
// app.get('/'),function(req,res){
//     res.sendFile(__dirname + '/index.html');
// }

// io.sockets.on('connection', function(socket){
//     connections.push(socket);
//     console.log('Connected: %s sockets connectd', connections.length);
//     connections.splice(connections.indexOf(socket), 1)
//     console.log('Disconnected: %s sockets connected', connections.length);
// });
var jsonArr = [{
    'Location Number': '',
    'Location Name': '',
    'Address': '',
    'Sales': '',
    'Profit': '',
    'Country': '',
    'Group': '',
    'State': '',
    'City': '',
    'Zip Code': '',
    'Square Feet': '',
    'Latitude': '',
    'Longitude':''
}];

app.use(json2xls.middleware);
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));


app.get('/xlfile',function(req, res) {
    res.xls('template.xlsx', jsonArr);
})



// app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}))
//app.use(express.static(__dirname + '/public'));
//app.use(bodyParser());
if (process.env.NODE_ENV === 'production') {
var publicPath = path.resolve(__dirname, './client/build');
app.use(express.static(publicPath));
}else{
app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}))
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
app.use(bodyParser.json())

//app.set('views', __dirname + '/views');
//app.set('view options', { layout: false });
//app.engine('jade', require('jade').__express);


/*
// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});


app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});
*/

// Routes
app.route('/').get(routes.index);
app.route('/partials/:name').get(routes.partials);

// Client API
app.route('/api/clients').get(api.Clients);
app.route('/api/getUserClients/:userId').get(api.getUserClients);
app.route('/api/clients/:id').get(api.Client);
app.route('/api/clients').post(api.addClient);
app.route('/api/clients/:id').delete(api.deleteClient);
app.route('/api/clients/:id').put(api.editClient);
app.route('/api/updateClientContact').put(api.updateClientContact);
app.route('/api/addAssociatedUser').put(api.addAssociatedUser);
app.route('/api/getAssociatedUsers/:clientId').get(api.getAssocaitedUsers);

// Saved Searches API
app.route('/api/getUserSearches/:userId').get(api.getUserSearches);
app.route('/api/searches/:userId/:clientId').get(api.Searches);
app.route('/api/getClientSearches/:clientId').get(api.getClientSearches);
app.route('/api/search/:id').get(api.Search);
app.route('/api/searches/:lat/:lng').get(api.checkIfSaved);
app.route('/api/searches').post(api.addSearch);
app.route('/api/searches/:id').delete(api.deleteSearch);
app.route('/api/searches/:id').put(api.editSearch);

//Property API
app.route('/api/UpdateProperty/:id').put(api.UpdateProperty);

// User API
app.route('/api/signUpUser').post(api.signUpUser);
app.route('/api/getUsers/:id').get(api.getUsers);
app.route('/api/users/:id').get(api.User);
app.route('/api/users').post(api.addUser);
app.route('/api/users/:id').delete(api.deleteUser);
app.route('/api/users/:id').put(api.editUser);
app.route('/api/changePicture').put(api.changePicture);
app.route('/api/updateUser').put(api.updateUser);
app.route('/api/updateUserContact').put(api.updateUserContact);
app.route('/api/updateUserPassword').put(api.updateUserPassword);

//tutorial API
app.route('/api/finishTutorial').put(api.finishTutorial);
//recover password api
app.route('/api/userForgotPassword').post(api.userForgotPassword);

//views API
app.route('/api/incrementViews').put(api.incrementViews);

//Login API
app.route('/api/login').post(api.LoginCheck);
//geocodeAPI
app.route('/api/getGeoCode').get(api.getGeoCode);

//Zip code API
app.route('/api/zip/:zip').get(api.Zip);
app.route('/api/getZips/').post(api.getZips);
app.route('/api/drawZips/').post(api.drawZips);
app.route('/api/filterZips/').post(api.filterZips);
app.route('/api/getZipDemographics/:zip').get(api.getZipDemographics);

//Messages API
app.route('/api/getMessages').post(api.getMessages);
app.route('/api/getLastMessages').post(api.getLastMessages);
app.route('/api/sendMessage').post(api.sendMessage);
app.route('/api/readMessage').put(api.readMessage);

//Mailer API
app.route('/api/sendInviteMailer').post(api.sendInviteMailer);
app.route('/api/forgotPasswordMailer').post(api.forgotPasswordMailer);

// Role API
app.route('/api/roles').post(api.addRole);
app.route('/api/roles').get(api.Roles);
app.route('/api/roles/:id').delete(api.deleteRole);

//Ranking API
app.route('/api/rankings/:field').get(api.getRankings);
app.route('/api/getSearchRankings').post(api.getSearchRankings);

//geocoder
app.route('/api/geocoder/:zip').get(api.geoCoder);

//Twitter API
app.route('/api/twitter/:longitude/:latitude').get(api.TwitterPlaceLookup);

//File Upload API
app.route('/uploadData').post(api.excelData);
app.route('/api/getUploadedLocations/:clientId').get(api.getUploadedLocations);
app.route('/api/getUploadedLocation/:id').get(api.getUploadedLocation);
app.route('/api/getUploadedFilteredLocations/:clientId/:filter/:type').get(api.getUploadedFilteredLocations);
app.route('/api/UpdateUploadedLocation/:id').put(api.UpdateUploadedLocation);
app.route('/api/DeleteImportData/:clientId').post(api.DeleteImportData);

//welcome mailer api

app.rout


// Redirect all others to the index
// A 404 page is probably a better move
//app.route('*').get(routes.index);
app.get('*',function(req,res){
    res.redirect('/')
});

// Start server
const server = app.listen(config.expressPort, function(){
    console.log("Express server listening on port %d in %s mode",
        config.expressPort, app.settings.env);
});


 // const io = require('socket.io')(server);

 // io.on('connection', (socket) => {
 //    console.log('a user connected');
 // })
