'use strict';
// Import
var config = require(__dirname+'/../config.js');
var thinky = require('thinky')(config);
var r = thinky.r;
var type = thinky.type;
var Query = thinky.Query;
var Validator = require('Validator');
var jwt = require('jsonwebtoken');
var Twitter = require('Twitter');

var client = new Twitter({
          consumer_key: 'bcaU1xnKnYzbROA1z8NmNgZ59',
          consumer_secret: 'rhVQdZW2LkvDFm1Liu3aGPRnR8fBj0I5naTAyVIbbs88RYzMLO',
          access_token_key: '3894184813-OIaxL97zVpT5DreH1sgpbognZXoy9pFOjsgacK0',
          access_token_secret: '7W4ySBLfecG4NCPqrWgXXdqtRdEp5sjNA2TciJJxXoMc8'
        });
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
    password: type.string(),
    title: type.string(),
    phone: type.string(),
    address: type.string(),
    city: type.string(),
    type: type.string(),
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
    userId : type.string(),
    clientId: type.string(),
    lat: type.string(),
    lng: type.string(),
    street: type.string(),
    city: type.string(),
    zip: type.string(),
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

var Zips = thinky.createModel('Zips',{
    id: type.string(),
    geometry : {
        
        type : type.string()
    },
    properties : {
        ALAND10 : type.number(),
        AWATER10 : type.number(),
        CLASSFP10 : type.string(),
        FUNCSTAT10 : type.string(),
        GEOID10 : type.string(),
        INTPTLAT10 : type.string(),
        INTPTLNG10 : type.string(),
        MTFCC10 : type.string(),
        ZCTA5CE10 : type.string()

    },
    type : type.string()
});

var Demographics = thinky.createModel('Demographics',{
    Latitude : type.number(),
    Longitude : type.number(),
    Population : type.string()
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
User.ensureIndex("email");
Searches.ensureIndex("created_at");

exports.TwitterPlaceLookup = function(req,res){

   var params = {q: 'the', geocode: req.params.latitude + ',' + req.params.longitude + ',1mi'};
        client.get('search/tweets', params, function(error, tweets, response) {
          if (!error) {
            
            res.json({
                tweets
            })
          }
        });
    
}

exports.LoginCheck = function(req, res){
    const { username, password } = req.body;


    User.filter({'email' : username, 'password' : password}).run().then(function(User){
        if(User.length >= 1){
            const token = jwt.sign({
                id: User[0].id,
                email: User[0].email
            }, config.jwtSecret);
            res.json({
                token
             })

        }else{
            res.status(401).json({errors: {form : "Invalid Credentials" } });
        }
        
    }).error(handleError(res));
   


};
exports.Zip = function (req, res) {
    var zip = req.params.zip;

    Zips.getAll(zip, {index:'zip'}).run().then(function(Zips){
        res.json({
            Zips : Zips
        });
    }).error(handleError(res));
    
};
exports.drawZips = function (req, res){
    var array = req.body;
   

    r.db('retail').table('Zips').getAll(r.args(array), {index:'zip'}).run().then(function(data){
        res.json({
            data
        })
    })
}
exports.filterZips = function(req,res){
    var zips = req.body.zips;
    var filters = req.body.filters;

    var newFilters = function(doc){
        var filterString = '';
        filters.forEach(function(item){

         if (filters.indexOf(item) == 0){
         filterString += "r.expr(doc('"+item.title+"').ge("+item.minVal+").and(doc('"+item.title+"').le("+item.maxVal+")))"
        }
        else{
         filterString += ".and(r.expr(doc('"+item.title+"').ge("+item.minVal+").and(doc('"+item.title+"').le("+item.maxVal+"))))"
        }
        })
        console.log(filterString);
        return eval(filterString);
    };
   r.db('retail').table('Demographics').getAll(r.args(zips), {index: 'ZipCode'}).pluck('ZipCode','Population','TotalHouseholds','PropertyCrime')
   .filter(newFilters).run().then(function(data){
    res.json({
        data
    })
   })    
   
}
exports.getZips = function(req, res){

    var neLat = parseFloat(req.body.neLat);
    var swLat = parseFloat(req.body.swLat);
    var neLng = parseFloat(req.body.neLng);
    var swLng = parseFloat(req.body.swLng);
   
  
    r.db('retail').table('Demographics').between(swLat, neLat, {index:'Latitude'}).filter(r.row('Longitude').gt(swLng).and(r.row('Longitude').lt(neLng))).getField('ZipCode').run().then(function(data){
        res.json({
            data
        })
    })

}
exports.Searches = function (req, res) {
    var userId = req.params.userId;
    var clientId = req.params.clientId;

    Searches.filter(r.row('userId').eq(userId).and(r.row('clientId').eq(clientId))).orderBy(r.asc('created_at')).run().then(function(Searches) {
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
    User.save(req.body).then(function(result) {
        res.json(result);
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
