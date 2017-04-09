// Import
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var config = require('./config.js');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');


var app = express();

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



app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}))
//app.use(express.static(__dirname + '/public'));
//app.use(bodyParser());

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

app.route('/api/updateClient').put(api.updateClient);

// Saved Searches API
app.route('/api/getUserSearches/:userId').get(api.getUserSearches);
app.route('/api/searches/:userId/:clientId').get(api.Searches);
app.route('/api/search/:id').get(api.Search);
app.route('/api/searches/:lat/:lng').get(api.checkIfSaved);
app.route('/api/searches').post(api.addSearch);
app.route('/api/searches/:id').delete(api.deleteSearch);
app.route('/api/searches/:id').put(api.editSearch);

// User API
app.route('/api/signUpUser').post(api.signUpUser);
app.route('/api/getUsers/:id').get(api.getUsers);
app.route('/api/users/:id').get(api.User);
app.route('/api/users').post(api.addUser);
app.route('/api/users/:id').delete(api.deleteUser);
app.route('/api/users/:id').put(api.editUser);
app.route('/api/changePicture').put(api.changePicture);
app.route('/api/updateUser').put(api.updateUser);

//Login API
app.route('/api/login').post(api.LoginCheck);

//Zip code API
app.route('/api/zip/:zip').get(api.Zip);
app.route('/api/getZips/').post(api.getZips);
app.route('/api/drawZips/').post(api.drawZips);
app.route('/api/filterZips/').post(api.filterZips);

//Messages API
app.route('/api/getMessages').post(api.getMessages);
app.route('/api/getLastMessages').post(api.getLastMessages);
app.route('/api/sendMessage').post(api.sendMessage);
app.route('/api/readMessage').put(api.readMessage);

//Mailer API
app.route('/api/signup/:email').get(api.sendMailer);

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

// Redirect all others to the index
// A 404 page is probably a better move
app.route('*').get(routes.index);

// Start server
const server = app.listen(config.expressPort, function(){
    console.log("Express server listening on port %d in %s mode",
        config.expressPort, app.settings.env);
});


 // const io = require('socket.io')(server);

 // io.on('connection', (socket) => {
 //    console.log('a user connected');
 // })