'use strict';
// Import
var config = require(__dirname+'/../config.js');
var thinky = require('thinky')(config);
var r = thinky.r;
var type = thinky.type;

// Create the models
// Note: if we don't provide the field date, the default function will be called
var Client = thinky.createModel('Client', {
    id: type.string(),
    client_name: type.string(),
    industry: type.string(),
    address: type.string(),
    city: type.string(),
    state: type.string(),
    zip: type.string(),
    logo_path: type.string(),
    is_active: type.string(),
    created_at : type.date().default(r.now())
});

var User = thinky.createModel('User', {
    id: type.string(),
    first_name: type.string(),
    last_name: type.string(),
    email: type.string(),
    title: type.string(),
    phone: type.string(),
    address: type.string(),
    city: type.string(),
    state: type.string(),
    zip: type.string(),
    status: type.string(),
    user_img_path: type.string(),
    primary_contact: type.boolean(),
    role_id: type.string(),
    associate_client_id: type.string(),
    creator_id: type.string(),
    disabled: type.boolean(),
    created_at: type.date().default(r.now())
});

var Role = thinky.createModel('Role', {
    id: type.string(),
    role_name: type.string(),
    accesses: [type.string()]
});

var Searches = thinky.createModel('Searches', {
    id: type.string(),
    client_id: type.string(),
    lat: type.string(),
    lng: type.string(),
    street: type.string(),
    city: type.string(),
    imgUrl: type.string(),
    created_at: type.date().default(r.now()),
    leaseInfo : {
        leaseRate : type.string(),
        leaseType : type.string(),
        leaseFrequency : type.string(),
        size : type.string(),
        buildingSize : type.string()
    }
});


// Specify the relations

// A Client has one User that we will keep in the field `User`.
//Client.belongsTo(User, "User", "UserId", "id");
//User.hasMany(Client, "Client", "id", "UserId");

// A Client has multiple Roles that we will keep in the field `Roles`.
//Client.hasMany(Role, "Roles", "id", "ClientId");
//Role.belongsTo(Client, "Client", "ClientId", "id");


// Make sure that an index on date is available
Client.ensureIndex("client_name");
User.ensureIndex("first_name");
Searches.ensureIndex("created_at");



exports.Searches = function (req, res) {
    Searches.orderBy({index: r.asc('created_at')}).run().then(function(Searches) {
        res.json(Searches);
    }).error(handleError(res));
};
exports.Search = function (req, res) {
    var id = req.params.id;
    Searches.get(id).run().then(function(Searches) {
        res.json({
            Searches: Searches
        });
    }).error(handleError(res));
};
// Edit a User
exports.editSearch = function (req, res) {
    Searches.get(req.body.id).update(req.body).run().then(function(Searches) {
        Searches.leaseInfo.leaseRate = req.body.leaseInfo.leaseRate;
        Searches.leaseInfo.leaseType = req.body.leaseInfo.leaseType;
        Searches.leaseInfo.leaseFrequency = req.body.leaseInfo.leaseFrequency;
        Searches.leaseInfo.size = req.body.leaseInfo.size;
        Searches.leaseInfo.buildingSize = req.body.leaseInfo.buildingSize;
        res.json({
            Searches: Searches
        })
    }).error(handleError(res));
};
exports.checkIfSaved = function (req, res){
    var lat = req.params.lat;
    var lng = req.params.lng;
    var query = new thinky.Query(Searches, r.db("retail").table("Searches").filter({lat : lat, lng : lng}).count());
    query.execute().then(function(result){
        res.json({
            result : result
        })
    }).error(handleError(res));

};
exports.addSearch = function (req, res) {
    Searches.save(req.body).then(function(result) {
        res.json(result);
    }).error(handleError(res));
};
exports.deleteSearch = function (req, res) {
    var id = req.params.id;
    Searches.get(id).run().then(function(Searches) {
        Searches.deleteAll().then(function(result) {
            res.json({
                result: result
            });
        }).error(handleError(res));
    }).error(handleError(res));
};

// Retrieve a list of Clients ordered by date with its User and Roles
exports.Clients = function (req, res) {
    Client.orderBy({index: r.desc('client_name')}).run().then(function(Client) {
        res.json(Client);
    }).error(handleError(res));
};


// Retrieve one Client
exports.Client = function (req, res) {
    var id = req.params.id;
    Client.get(id).run().then(function(Client) {
        res.json({
            Client: Client
        });
    }).error(handleError(res));
};


// Retrieve a Client and all the available Users

//exports.ClientAndUsers = function (req, res) {
 //   var id = req.params.id;
//    Client.get(id).run().then(function(Client) {
//        User.run().then(function(Users) {
//            res.json({
//                Client: Client,
//                Users: Users
//            });
//        }).error(handleError(res));
//    }).error(handleError(res));
//};


// Save a Client in the database
exports.addClient = function (req, res) {

    //var newClient = new Client(req.body);

    Client.save(req.body).then(function(result) {
        res.json(result);
    }).error(handleError(res));
};


// Delete a Client and its Roles from the database
exports.deleteClient = function (req, res) {
    var id = req.params.id;

    // Delete a Client and all its Roles
    Client.get(id).run().then(function(Client) {
        Client.deleteAll().then(function(result) {
            res.json({
                result: result
            });
        }).error(handleError(res));
    }).error(handleError(res));
};


// Update a Client in the database
exports.editClient = function (req, res) {
    Client.get(req.body.id).run().then(function(Client) {
        Client.title = req.body.title;
        Client.text = req.body.text;
        Client.UserId = req.body.UserId;
        Client.save().then(function(Client) {
            res.json({
                Client: Client
            });
        }).error(handleError(res));
    }).error(handleError(res));
};


// Retrieve all Users
exports.Users = function (req, res) {
    User.orderBy({index: 'first_name'}).run().then(function(User) {
        res.json({
            User: User
        });
    }).error(handleError(res));
};


// Retrieve one User
exports.User = function (req, res) {
    var id = req.params.id;

    User.get(id).run().then(function(User) {
        res.json({
            User: User
        });
    }).error(handleError(res));
};


// Save an User in the database
exports.addUser = function (req, res) {
    var User = new User(req.body);

    User.save().then(function(result) {
        res.json({
            result: result
        });
    }).error(handleError(res));
};


// Delete a User
exports.deleteUser = function (req, res) {
    var id = req.params.id;

    // Delete a User 
    User.get(id).run().then(function(User) {
        User.delete().then(function(User) {
            res.json({
                result: User
            })
        }).error(handleError(res));
    }).error(handleError(res));
};


// Edit a User
exports.editUser = function (req, res) {
    // Update an User
    User.get(req.body.id).update(req.body).run().then(function(User) {
        res.json({
            User: User
        })
    }).error(handleError(res));
};


// Add a Role
exports.addRole = function (req, res) {
    var newRole = new Role(req.body);

    newRole.save().then(function(error, result) {
        res.json({
            error: error,
            result: result
        });
    });
};


// Delete Role
exports.deleteRole = function (req, res) {
    var id = req.params.id;

    // We can directly delete the Role since there is no foreign key to clean
    Role.get(id).delete().execute().then(function(error, result) {
        res.json({
            error: error,
            result: result
        })
    });
};

function handleError(res) {
    return function(error) {
        console.log(error.message);
        return res.send(500, {error: error.message});
    }
}
