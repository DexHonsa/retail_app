// Import
var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var config = require('./config.js');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');


var app = express();


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
app.route('/api/clients/:id').get(api.Client);
app.route('/api/clients').post(api.addClient);
app.route('/api/clients/:id').delete(api.deleteClient);
app.route('/api/clients/:id').put(api.editClient);
// Saved Searches API
app.route('/api/searches/:userId/:clientId').get(api.Searches);
app.route('/api/search/:id').get(api.Search);
app.route('/api/searches/:lat/:lng').get(api.checkIfSaved);
app.route('/api/searches').post(api.addSearch);
app.route('/api/searches/:id').delete(api.deleteSearch);
app.route('/api/searches/:id').put(api.editSearch);

// User API
app.route('/api/users').get(api.Users);
app.route('/api/users/:id').get(api.User);
app.route('/api/users').post(api.addUser);
app.route('/api/users/:id').delete(api.deleteUser);
app.route('/api/users/:id').put(api.editUser);

//Login API
app.route('/api/login').post(api.LoginCheck);

//Zip code API
app.route('/api/zip/:zip').get(api.Zip);
app.route('/api/getZips/').post(api.getZips);
app.route('/api/drawZips/').post(api.drawZips);
app.route('/api/filterZips/').post(api.filterZips);

// Role API
app.route('/api/roles').post(api.addRole);
app.route('/api/roles/:id').delete(api.deleteRole);

//Twitter API
app.route('/api/twitter/:longitude/:latitude').get(api.TwitterPlaceLookup);

// Redirect all others to the index
// A 404 page is probably a better move
app.route('*').get(routes.index);

// Start server
app.listen(config.expressPort, function(){
    console.log("Express server listening on port %d in %s mode",
        config.expressPort, app.settings.env);
});
