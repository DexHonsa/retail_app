'use strict';
// Import
var config = require(__dirname + '/../config.js');
var thinky = require('thinky')(config);
var r = thinky.r;
var type = thinky.type;
var Query = thinky.Query;
var Validator = require('Validator');
var jwt = require('jsonwebtoken');
var Twitter = require('Twitter');
var Pusher = require('pusher');
var request = require("request");
var nodemailer = require('nodemailer');
var html = '../public/mailer.html';
var CryptoJS = require("crypto-js");


var pusher = new Pusher({appId: "323748", key: "d3d161be3854778f5031", secret: "bd446427d3c80f0a9b02", encrypted: true});

var client = new Twitter({consumer_key: 'bcaU1xnKnYzbROA1z8NmNgZ59', consumer_secret: 'rhVQdZW2LkvDFm1Liu3aGPRnR8fBj0I5naTAyVIbbs88RYzMLO', access_token_key: '3894184813-OIaxL97zVpT5DreH1sgpbognZXoy9pFOjsgacK0', access_token_secret: '7W4ySBLfecG4NCPqrWgXXdqtRdEp5sjNA2TciJJxXoMc8'});
// Create the models
// Note: if we don't provide the field date, the default function will be called
var Client = thinky.createModel('Client', {
    id: type.string(),
    client_name: type.string(),
    user_id: type.string(),
    industry: type.string(),
    address: type.string(),
    city: type.string(),
    state: type.string(),
    zip: type.string(),
    logo_path: type.string(),
    is_active: type.string(),
    created_at: type.date().default(r.now())
});

var User = thinky.createModel('User', {
    id: type.string(),
    first_name: type.string(),
    parent_user: type.string(),
    last_name: type.string(),
    email: type.string(),
    password: type.string(),
    title: type.string(),
    phone: type.string(),
    address: type.string(),

    city: type.string(),
    role: type.string(),
    state: type.string(),
    zip: type.string(),
    status: type.string(),
    user_img_path: type.string(),
    primary_contact: type.boolean(),
    role_id: type.string(),

    creator_id: type.string(),
    disabled: type.boolean(),
    created_at: type.date().default(r.now())
});

var Role = thinky.createModel('Role', {
    id: type.string(),
    role_name: type.string(),
    role_accesses: [type.string()]
});

var Message = thinky.createModel('Message', {
    id: type.string(),
    subject: type.string(),
    creator_id: type.string(),
    recipient_id: type.string(),
    message_body: type.string(),
    create_date: type.string(),
    parent_message_id: type.string(),
    addedPropertyId: type.string(),
    addedPropertyAddress: type.string(),
    addedPropertyImg: type.string()

});

var MessageRecipient = thinky.createModel('MessageRecipient', {
    id: type.string(),
    recipient_id: type.string(),
    recipient_group_id: type.string(),
    message_id: type.string(),
    is_read: type.string()
});

var Searches = thinky.createModel('Searches', {
    id: type.string(),
    userId: type.string(),
    clientId: type.string(),
    lat: type.string(),
    lng: type.string(),
    street: type.string(),
    city: type.string(),
    zip: type.string(),
    imgUrl: type.string(),
    created_at: type.date().default(r.now()),
    leaseInfo: {
        leaseRate: type.string(),
        leaseType: type.string(),
        leaseFrequency: type.string(),
        size: type.string(),
        buildingSize: type.string()
    }
});

var Zips = thinky.createModel('Zips', {
    id: type.string(),
    geometry: {

        type: type.string()
    },
    properties: {
        ALAND10: type.number(),
        AWATER10: type.number(),
        CLASSFP10: type.string(),
        FUNCSTAT10: type.string(),
        GEOID10: type.string(),
        INTPTLAT10: type.string(),
        INTPTLNG10: type.string(),
        MTFCC10: type.string(),
        ZCTA5CE10: type.string()

    },
    type: type.string()
});

var Demographics = thinky.createModel('Demographics', {
    Latitude: type.number(),
    Longitude: type.number(),
    Population: type.string()
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
exports.Property = function(req,res){

}
exports.getUploadedLocations = function(req,res){
    var clientId = req.params.clientId;
    r.db('retail_updated').table('ExcelData').getAll(clientId, {index:"clientId"}).run().then(function(data){
      res.json({
        data
      })
    })
};
exports.excelData = function(req, res) {
    r.db('retail_updated').table('ExcelData').insert(req.body).run().then(function(result) {
      r.db('retail_updated').table('ExcelData').indexCreate('clientId').run().then(function(result){
        console.log('index created!')
      });
        res.json(result);
    }).error(handleError(res));
};
exports.UpdateProperty = function(req,res){
  var data = req.body;
  var id = req.params.id;
  r.db('retail_updated').table('Searches').get(id).update(data).run().then(function(data){
    res.json({
      data
    })
  })
}
exports.signUpUser = function(req, res) {
    const {userFirstName, userLastName, userEmail, userPassword} = req.body;

    var password = CryptoJS.AES.encrypt(userPassword, 'user Password').toString();

    User.filter({'email': userEmail}).run().then(function(User) {
        if (User.length >= 1) {
            res.status(401).json({
                errors: {
                    form: "Email already in Use"
                }
            });

        } else {
            r.db('retail_updated').table('User').insert({
                'first_name': userFirstName,
                'last_name': userLastName,
                'email': userEmail,
                'views': {},
                'associated_clients': [],
                'password': password,
                'contacts': [],
                'role': 'Admin',
                'user_img_path': 'http://res.cloudinary.com/dexhonsa/image/upload/v1491690201/user_af9gzm.jpg',
                'created_at': r.now()
            }).run().then(function(User) {

                var id = User.generated_keys[0];
                r.db('retail_updated').table('User').get(id).update({'parent_user': id}).run().then(function(User) {

                    r.db('retail_updated').table('User').filter(r.row('email').eq(userEmail)).run().then(function(User) {

                        const token = jwt.sign({
                            id: User[0].id,
                            email: User[0].email,
                            role: User[0].role,
                            parent_user: User[0].parent_user
                        }, config.jwtSecret);
                        res.json({token})
                    })
                })

            });

        }

    }).error(handleError(res));

}
exports.TwitterPlaceLookup = function(req, res) {

    var params = {
        q: ' ',
        geocode: req.params.latitude + ',' + req.params.longitude + ',1mi'
    };
    client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {

            res.json({tweets})
        }
    });

}
exports.geoCoder = function(req, res) {
    var zip = req.params.zip;
    var options = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: zip,
            sensor: 'true',
            key: 'AIzaSyDZbOsqAQ_mUPlg7PClzQHBQUUq3tYrwrU'
        },
        headers: {
            'postman-token': 'e7c9234f-ad9f-a1f8-d280-c1459f68e174',
            'cache-control': 'no-cache'
        }
    };

    request(options, function(error, response, body) {
        if (error)
            throw new Error(error);

        res.json({body})

    });
}
exports.sendMessage = function(req, res) {
    // var userId = req.body.userId;
    // var recipientId = req.body.recipientId;
    // var messageBody = req.body.messageBody;
    r.db('retail_updated').table('Message').insert(req.body).run().then(function(data) {
        res.json({data})
    })
}
exports.getMessages = function(req, res) {
    var recipientId = req.body.recipientId;
    var userId = req.body.userId;
    r.db('retail_updated').table('Message').filter(r.row('recipient_id').eq(recipientId).and(r.row('creator_id').eq(userId)).or(r.row('recipient_id').eq(userId).and(r.row('creator_id').eq(recipientId)))).orderBy(r.asc('create_date')).run().then(function(data) {
        res.json({data})
    })
}

exports.getLastMessages = function(req, res) {
    var recipientId = req.body.recipientId;
    var userId = req.body.userId;
    r.db('retail_updated').table('Message').filter(r.row('recipient_id').eq(recipientId).and(r.row('creator_id').eq(userId)).or(r.row('recipient_id').eq(userId).and(r.row('creator_id').eq(recipientId)))).orderBy(r.desc('create_date')).limit(1).run().then(function(data) {
        res.json({data})
    })
}

exports.readMessage = function(req, res) {
    var userId = req.body.userId;
    var recipientId = req.body.recipientId;

    r.db('retail_updated').table('Message').filter(r.row('recipient_id').eq(recipientId).and(r.row('creator_id').eq(userId)).or(r.row('recipient_id').eq(userId).and(r.row('creator_id').eq(recipientId)))).orderBy(r.desc('create_date')).limit(1).update({'is_read': 1}).run().then(function(data) {
        res.json({data})
    })
}

exports.LoginCheck = function(req, res) {
    const {username, password} = req.body;

    r.db('retail_updated').table('User').filter({'email': username}).run().then(function(User) {
        console.log(User);
        if (User.length >= 1) {
            var decrypted = CryptoJS.AES.decrypt(User[0].password, 'user Password');
            var userpassword = decrypted.toString(CryptoJS.enc.Utf8);
            console.log(password, userpassword)
            if (userpassword === password) {
                if (User[0].role === 'Basic') {
                    const token = jwt.sign({
                        id: User[0].id,
                        email: User[0].email,
                        role: User[0].role,
                        parent_user: User[0].parent_user,
                        associated_clients: User[0].associated_clients
                    }, config.jwtSecret);
                    res.json({token})

                } else {
                    const token = jwt.sign({
                        id: User[0].id,
                        email: User[0].email,
                        role: User[0].role,
                        parent_user: User[0].parent_user
                    }, config.jwtSecret);
                    res.json({token})
                }
            } else {
                res.status(401).json({
                    errors: {
                        form: "Invalid Password"
                    }
                });
            }

        } else {
            res.status(401).json({
                errors: {
                    form: "Invalid Credentials"
                }
            });
        }

    }).error(handleError(res));

};
exports.Zip = function(req, res) {
    var zip = req.params.zip;

    r.db('retail_updated').table('Zips').getAll(zip, {index: 'zip'}).run().then(function(Zips) {
        res.json({Zips: Zips});
    }).error(handleError(res));

};
exports.getSearchRankings = function(req, res) {
    var zips = req.body.zips;
    var field = req.body.field;
    var zipNumbers = zips.map(Number);
    r.db('retail_updated').table('Demographics').getAll(r.args(zipNumbers), {index: 'ZipCode'}).pluck(field).run().then(function(data) {
        res.json({data})
    })
}
exports.drawZips = function(req, res) {
    var array = req.body;
    r.db('retail_updated').table('Zips').getAll(r.args(array), {index: 'zip'}).run().then(function(data) {
        res.json({data})
    })
}
exports.filterZips = function(req, res) {
    var zips = req.body.zips;
    var filters = req.body.filters;
    var newFilters = function(doc) {
        var filterString = '';
        filters.forEach(function(item) {

            if (item.title === "Population") {
                if (filters.indexOf(item) == 0) {
                    filterString += "r.expr(doc('" + item.title + "')('value').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').le(" + item.maxVal + ")))"
                } else {
                    filterString += ".and(r.expr(doc('" + item.title + "')('value').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').le(" + item.maxVal + "))))"
                }
            }

            if (item.title === "IncomePerHousehold") {
                if (filters.indexOf(item) == 0) {
                    filterString += "r.expr(doc('" + item.title + "')('value').coerceTo('number').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').coerceTo('number').le(" + item.maxVal + ")))"
                } else {
                    filterString += ".and(r.expr(doc('" + item.title + "')('value').coerceTo('number').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').coerceTo('number').le(" + item.maxVal + "))))"
                }
            }

            if (item.title === "PropertyCrime") {
                if (filters.indexOf(item) == 0) {
                    filterString += "r.expr(doc('" + item.title + "')('value').coerceTo('number').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').coerceTo('number').le(" + item.maxVal + ")))"
                } else {
                    filterString += ".and(r.expr(doc('" + item.title + "')('value').coerceTo('number').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').coerceTo('number').le(" + item.maxVal + "))))"
                }
            }

            if (item.title === "TotalHouseholds") {
                if (filters.indexOf(item) == 0) {
                    filterString += "r.expr(doc('" + item.title + "')('value').coerceTo('number').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').coerceTo('number').le(" + item.maxVal + ")))"
                } else {
                    filterString += ".and(r.expr(doc('" + item.title + "')('value').coerceTo('number').ge(" + item.minVal + ").and(doc('" + item.title + "')('value').coerceTo('number').le(" + item.maxVal + "))))"
                }
            }

            if (item.title === "EducationBachelorOrGreater") {

                if (filters.indexOf(item) == 0) {
                    filterString += "r.expr(doc('EducationBachelorOrGreater')('value').ge('" + item.value + "'))"
                } else {
                    filterString += ".and(r.expr(doc('" + item.title + "')('value').ge('" + item.value + "')))"
                }
            }

            if (item.title === "Ethnicity") {
                if (item.value === 'white') {
                    if (filters.indexOf(item) == 0) {
                        filterString += "r.expr(doc('WhitePopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3)))"
                    } else {
                        filterString += ".and(r.expr(doc('WhitePopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3))))"
                    }
                }

                if (item.value === 'black') {
                    if (filters.indexOf(item) == 0) {
                        filterString += "r.expr(doc('BlackPopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3)))"
                    } else {
                        filterString += ".and(r.expr(doc('BlackPopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3))))"
                    }
                }

                if (item.value === 'asian') {
                    if (filters.indexOf(item) == 0) {
                        filterString += "r.expr(doc('AsianPopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3)))"
                    } else {
                        filterString += ".and(r.expr(doc('AsianPopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3))))"
                    }
                }

                if (item.value === 'hispanic') {
                    if (filters.indexOf(item) == 0) {
                        filterString += "r.expr(doc('HispanicPopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3)))"
                    } else {
                        filterString += ".and(r.expr(doc('HispanicPopulation')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(3))))"
                    }
                }

            }

            if (item.title === "Gender") {

                //if(item.ratio == "10"){
                  if (filters.indexOf(item) == 0) {
                      filterString += "r.expr(doc('" + item.value + "')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(100).mul("+item.ratio+")))"
                  } else {
                      filterString += ".and(r.expr(doc('" + item.value + "')('value').coerceTo('number').ge(doc('Population')('value').coerceTo('number').div(100).mul("+item.ratio+"))))"
                  }
                //}

                // if (item.value == "male > female") {
                //     if (filters.indexOf(item) == 0) {
                //         filterString += "r.expr(doc('MalePopulation')('value').ge(doc('FemalePopulation')('value')))"
                //     } else {
                //         filterString += ".and(r.expr(doc('MalePopulation')('value').ge(doc('FemalePopulation')('value'))))"
                //     }
                // } else {
                //     if (filters.indexOf(item) == 0) {
                //         filterString += "r.expr(doc('MalePopulation')('value').le(doc('FemalePopulation')('value')))"
                //     } else {
                //         filterString += ".and(r.expr(doc('MalePopulation')('value').le(doc('FemalePopulation')('value'))))"
                //     }
                // }

            }

        })
        console.log(filterString);
        return eval(filterString);
    };
    r.db('retail_updated').table('Demographics').getAll(r.args(zips), {index: 'ZipCode'}).pluck(
      'ZipCode',
      'Population',
      'HispanicPopulation',
      'TotalHouseholds',
      'WhitePopulation',
      'PropertyCrime',
      'AsianPopulation',
      'BlackPopulation',
      'IncomePerHousehold',
      'EducationBachelorOrGreater',
      'MalePopulation',
      'FemalePopulation',
      'PopulationFemale10to14',
      'PopulationFemale15to19',
      'PopulationFemale20to24',
      'PopulationFemale25to29',
      'PopulationFemale30to34',
      'PopulationFemale35to39',
      'PopulationFemale40to44',
      'PopulationFemale45to49',
      'PopulationFemale50to54',
      'PopulationFemale50to54',
      'PopulationFemale55to59',
      'PopulationFemale60to64',
      'PopulationFemale65Plus',
      'PopulationFemale21Plus',
      'PopulationFemale16Plus',
      'PopulationFemale18Plus',
      'PopulationMale10to14',
      'PopulationMale15to19',
      'PopulationMale20to24',
      'PopulationMale25to29',
      'PopulationMale30to34',
      'PopulationMale35to39',
      'PopulationMale40to44',
      'PopulationMale45to49',
      'PopulationMale50to54',
      'PopulationMale50to54',
      'PopulationMale55to59',
      'PopulationMale60to64',
      'PopulationMale65Plus',
      'PopulationMale21Plus',
      'PopulationMale16Plus',
      'PopulationMale18Plus').filter(newFilters).run().then(function(data) {
        res.json({data})
        console.log('test');

    })
}
exports.getZips = function(req, res) {
    var neLat = parseFloat(req.body.neLat);
    var swLat = parseFloat(req.body.swLat);
    var neLng = parseFloat(req.body.neLng);
    var swLng = parseFloat(req.body.swLng);
    r.db('retail_updated').table('Demographics').between(swLat, neLat, {index: 'Latitude'}).filter(r.row('Longitude').gt(swLng).and(r.row('Longitude').lt(neLng))).getField('ZipCode').run().then(function(data) {
        res.json({data})
    })
}
exports.getRankings = function(req, res) {
    var field = req.params.field;
    r.db('retail_updated').table('Demographics').orderBy({index: r.desc(field)}).limit(10).pluck(field, 'ZipCode', 'Longitude', 'Latitude', 'City', 'StateAbbreviation').run().then(function(data) {
        res.json({data})
    });
}

exports.Searches = function(req, res) {
    var userId = req.params.userId;
    var clientId = req.params.clientId;

    r.db('retail_updated').table('Searches').filter(r.row('clientId').eq(clientId)).orderBy(r.asc('created_at')).run().then(function(Searches) {
        res.json(Searches);
    }).error(handleError(res));
};
exports.getClientSearches = function(req, res) {
    r.db('retail_updated').table('Searches').filter(r.row('clientId').eq(req.params.clientId)).run().then(function(data) {
        res.json({data})
    })
}
exports.getUserSearches = function(req, res) {
    var userId = req.params.userId;
    Searches.filter(r.row('creatorId').eq(userId)).orderBy(r.asc('created_at')).run().then(function(Searches) {
        res.json(Searches);
    }).error(handleError(res));
};
exports.Search = function(req, res) {
    var id = req.params.id;
    Searches.get(id).run().then(function(Searches) {
        res.json({Searches: Searches});
    }).error(handleError(res));
};
// Edit a User
exports.editSearch = function(req, res) {
    Searches.get(req.body.id).update(req.body).run().then(function(Searches) {
        Searches.leaseInfo.leaseRate = req.body.leaseInfo.leaseRate;
        Searches.leaseInfo.leaseType = req.body.leaseInfo.leaseType;
        Searches.leaseInfo.leaseFrequency = req.body.leaseInfo.leaseFrequency;
        Searches.leaseInfo.size = req.body.leaseInfo.size;
        Searches.leaseInfo.buildingSize = req.body.leaseInfo.buildingSize;
        res.json({Searches: Searches})
    }).error(handleError(res));
};

exports.checkIfSaved = function(req, res) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    var query = new thinky.Query(Searches, r.db("retail_updated").table("Searches").filter({lat: lat, lng: lng}).count());
    query.execute().then(function(result) {
        res.json({result: result})
    }).error(handleError(res));

};
exports.addSearch = function(req, res) {
    r.db('retail_updated').table('Searches').insert(req.body).run().then(function(result) {
        res.json(result);
    }).error(handleError(res));
};
exports.deleteSearch = function(req, res) {
    var id = req.params.id;
    Searches.get(id).run().then(function(Searches) {
        Searches.deleteAll().then(function(result) {
            res.json({result: result});
        }).error(handleError(res));
    }).error(handleError(res));
};
exports.incrementViews = function(req, res) {
    r.db('retail_updated').table('User').get(req.body.userId)('views').hasFields(req.body.searchId).run().then(function(data) {

        if (data === true) {
            r.db('retail_updated').table('User').get(req.body.userId)('views')(req.body.searchId).run().then(function(data) {
                var newAmount = data + 1;
                r.db('retail_updated').table('User').get(req.body.userId).update({
                    'views': r.object(req.body.searchId, newAmount)
                }).run().then(function(data) {
                    res.json({data})
                })
            })

        } else {
            r.db('retail_updated').table('User').get(req.body.userId).update({
                'views': r.object(req.body.searchId, 1)
            }).run().then(function(data) {
                res.json({data})
            })
        }
    })

}
// Retrieve a list of Clients ordered by date with its User and Roles
exports.Clients = function(req, res) {
    Client.orderBy({index: r.desc('client_name')}).run().then(function(Client) {
        res.json(Client);
    }).error(handleError(res));
};

exports.getUserClients = function(req, res) {
    var userId = req.params.userId;
    r.db('retail_updated').table('Client').filter(r.row('user_id').eq(userId)).run().then(function(data) {
        res.json({data})
    })
}

// Retrieve one Client
exports.Client = function(req, res) {
    var id = req.params.id;
    Client.get(id).run().then(function(Client) {
        res.json({Client: Client});
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
exports.addClient = function(req, res) {

    //var newClient = new Client(req.body);

    r.db('retail_updated').table('Client').insert(req.body).run().then(function(result) {
        res.json(result);
    }).error(handleError(res));
};

// Delete a Client and its Roles from the database
exports.deleteClient = function(req, res) {
    var id = req.params.id;

    // Delete a Client and all its Roles
    Client.get(id).run().then(function(Client) {
        Client.deleteAll().then(function(result) {
            res.json({result: result});
        }).error(handleError(res));
    }).error(handleError(res));
};
exports.getZipDemographics = function(req, res) {
    var zip = req.params.zip;
    r.db('retail_updated').table('Demographics').getAll(r.expr(zip).coerceTo('number'), {index: 'ZipCode'}).run().then(function(data) {
        res.json({data})
    })
}
exports.updateClientContact = function(req, res) {
    var clientId = req.body.clientId;
    var contactIndex = req.body.contactIndex;
    var contactName = req.body.contactName;
    var contactEmail = req.body.contactEmail;
    var contactPhone = req.body.contactPhone;
    var deleteContact = req.body.deleteContact;

    if (deleteContact === true) {
        r.db('retail_updated').table('Client').get(clientId).getField('contacts').deleteAt(contactIndex).run().then(function(data) {
            console.log(data);
            r.db('retail_updated').table('Client').get(clientId).update({'contacts': data}).run().then(function(data) {
                res.json({data})
            })
        })
    } else {
        r.db('retail_updated').table('Client').get(clientId).update({
            'contacts': r.row('contacts').append({'contactName': contactName, 'contactPhone': contactPhone, 'contactEmail': contactEmail})
        }).run().then(function(data) {
            res.json({data})
        })
    }

}
exports.updateUserContact = function(req, res) {
    var userId = req.body.userId;
    var contactIndex = req.body.contactIndex;
    var contactName = req.body.contactName;
    var contactEmail = req.body.contactEmail;
    var contactPhone = req.body.contactPhone;
    var deleteContact = req.body.deleteContact;

    if (deleteContact === true) {
        r.db('retail_updated').table('User').get(userId).getField('contacts').deleteAt(contactIndex).run().then(function(data) {
            console.log(data);
            r.db('retail_updated').table('User').get(userId).update({'contacts': data}).run().then(function(data) {
                res.json({data})
            })
        })
    } else {
        r.db('retail_updated').table('User').get(userId).update({
            'contacts': r.row('contacts').append({'contactName': contactName, 'contactPhone': contactPhone, 'contactEmail': contactEmail})
        }).run().then(function(data) {
            res.json({data})
        })
    }

}
exports.getAssocaitedUsers = function(req, res) {
    r.db('retail_updated').table('Client').get(req.params.clientId).run().then(function(data) {

        r.db('retail_updated').table('User').getAll(r.args(data.associated_users)).run().then(function(data) {
            res.json({data})
        })
    })
}
exports.addAssociatedUser = function(req, res) {
    var deleteContact = req.body.deleteContact;

    if (deleteContact === true) {
        r.db('retail_updated').table('Client').get(req.body.userId).getField('associated_users').deleteAt(0).run().then(function(data) {
            r.db('retail_updated').table('Client').get(req.body.userId).update({'associated_users': data}).run().then(function(data) {
                res.json({data})
            })
        })
    } else {
        r.db('retail_updated').table('Client').get(req.body.clientId).update({
            'associated_users': r.row('associated_users').append(req.body.userId)
        }).run().then(function(data) {
            res.json({data})
        })
    }

}

// Update a Client in the database
exports.editClient = function(req, res) {

    Client.get(req.body.id).run().then(function(Client) {
        Client.title = req.body.title;
        Client.text = req.body.text;
        Client.UserId = req.body.UserId;
        Client.save().then(function(Client) {
            res.json({Client: Client});
        }).error(handleError(res));
    }).error(handleError(res));
};

// Retrieve all Users
exports.getUsers = function(req, res) {
    var parentUser = req.params.id;
    r.db('retail_updated').table('User').filter(r.row('parent_user').eq(parentUser)).run().then(function(User) {
        res.json({User})
    })
};

// Retrieve one User
exports.User = function(req, res) {
    var id = req.params.id;

    r.db('retail_updated').table('User').get(id).run().then(function(User) {
        res.json({User})
    })
};

exports.getClientUsers = function(req, res) {
    r.db('retail_updated').table('User').filter(r.row('associated_clients')())
}

// Save an User in the database
exports.addUser = function(req, res) {
    var data = req.body;
    var password = CryptoJS.AES.encrypt(req.body.password, 'user Password').toString();
    data.password = password;
    console.log(data)
    r.db('retail_updated').table('User').insert(data).run().then(function(User) {
        res.json({User})
    })
};

// Delete a User
exports.deleteUser = function(req, res) {
    var id = req.params.id;

    // Delete a User
    User.get(id).run().then(function(User) {
        User.delete().then(function(User) {
            res.json({result: User})
        }).error(handleError(res));
    }).error(handleError(res));
};
exports.changePicture = function(req, res) {
    var img = req.body.img;
    var userId = req.body.userId;
    r.db('retail_updated').table('User').get(userId).update({'user_img_path': img}).run().then(function(data) {
        res.json({data})
    })
}
exports.updateUser = function(req, res) {
    const {data} = req.body;
    var userId = req.body.userId;

    r.db('retail_updated').table('User').get(userId).update(data).run().then(function(User) {
        res.json({User})
    })

}
exports.updateUserPassword = function(req, res) {

    r.db('retail_updated').table('User').get(req.body.userId)('password').run().then(function(data) {
        var decrypted = CryptoJS.AES.decrypt(data, 'user Password');
        var userpassword = decrypted.toString(CryptoJS.enc.Utf8);
        if (userpassword === req.body.oldPassword) {
            var password = CryptoJS.AES.encrypt(req.body.newPassword, 'user Password').toString();
            console.log(password, req.body.oldPassword, req.body.newPassword)

            r.db('retail_updated').table('User').get(req.body.userId).update({active: 1, password: password}).run().then(function(data) {
                res.json({data})
            })
        } else {
            res.status(401).json({
                errors: {
                    form: "Invalid Password"
                }
            });
        }
    })
}

// Edit a User
exports.editUser = function(req, res) {
    // Update an User
    User.get(req.body.id).update(req.body).run().then(function(User) {
        res.json({User: User})
    }).error(handleError(res));
};

// Add a Role
exports.addRole = function(req, res) {
    var role_accesses = req.body.role_accesses;
    var role_name = req.body.role_name;

    r.db('retail_updated').table('Role').insert({"role_name": role_name, "role_accesses": role_accesses}).run().then(function(data) {
        res.json({data})
    })
};
// get Roles
exports.Roles = function(req, res) {

    r.db('retail_updated').table('Role').run().then(function(data) {
        res.json({data})
    })
};

// Delete Role
exports.deleteRole = function(req, res) {
    var id = req.params.id;

    Role.get(id).delete().execute().then(function(error, result) {
        res.json({error: error, result: result})
    });
};

function handleError(res) {
    return function(error) {
        console.log(error.message);
        return res.send(500, {error: error.message});
    }
}

// exports.sendMailer = function(req, res) {

//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'dex@theamp.com',//your email
//         pass: 'Awesomeo21'//password
//     }
// });

// var email = req.params.email;

// var mailOptions = {
//     from: 'dex@theamp.com', // sender address
//     to: email, // list of receivers
//     subject: 'verification mail', // Subject line
//     text: 'Hi', // plain text body
//     html: '<!DOCTYPE html><html lang=it><meta content="text/html; charset=UTF-8"http-equiv=content-type><title>MOSAICO Responsive Email Designer</title><meta charset=utf-8><meta content="width=device-width"name=viewport><style>#ko_onecolumnBlock_3 .textintenseStyle a,#ko_onecolumnBlock_3 .textintenseStyle a:hover,#ko_onecolumnBlock_3 .textintenseStyle a:link,#ko_onecolumnBlock_3 .textintenseStyle a:visited{color:#fff;text-decoration:none;text-decoration:none;font-weight:700}#ko_onecolumnBlock_3 .textlightStyle a:hover,#ko_onecolumnBlock_3 .textlightStyle a:visited{color:#3f3d33;text-decoration:none;font-weight:700}</style><style>#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}body{margin:0;padding:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body{height:100%!important;margin:0;padding:0;width:100%!important}.appleBody a{color:#68440a;text-decoration:none}.appleFooter a{color:#999;text-decoration:none}@media screen and (max-width:525px){table[class=wrapper]{width:100%!important;min-width:0!important}td[class=mobile-hide]{display:none}img[class=mobile-hide]{display:none!important}img[class=img-max]{width:100%!important;max-width:100%!important;height:auto!important}table[class=responsive-table]{width:100%!important}td[class=padding]{padding:10px 5% 15px 5%!important}td[class=padding-copy]{padding:10px 5% 10px 5%!important;text-align:center}td[class=padding-meta]{padding:30px 5% 0 5%!important;text-align:center}td[class=no-pad]{padding:0!important}td[class=no-padding]{padding:0!important}td[class=section-padding]{padding:10px 15px 10px 15px!important}td[class=section-padding-bottom-image]{padding:10px 15px 0 15px!important}td[class=mobile-wrapper]{padding:10px 5% 15px 5%!important}table[class=mobile-button-container]{margin:0 auto;width:100%!important}a[class=mobile-button]{width:80%!important;padding:15px!important;border:0!important;font-size:16px!important}}</style><body align=center bgcolor=#ffffff style=margin:0;padding:0><table border=0 cellpadding=0 cellspacing=0 width=100% id=ko_imageBlock_4><tr class=row-a><td align=center style=padding-top:0;padding-left:15px;padding-bottom:0;padding-right:15px class=no-pad bgcolor=#f7f7f7><table border=0 cellpadding=0 cellspacing=0 width=500 class=responsive-table><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class=no-padding><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><img alt=""border=0 src="https://mosaico.io/srv/f-4vwir91/img?src=https%3A%2F%2Fmosaico.io%2Ffiles%2F4vwir91%2FsiteMapLogo.png&method=resize&params=500%2Cnull"style=display:block;padding:0;color:#3f3d33;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:16px;width:500px class=img-max width=500></table></table></table></table></table><table border=0 cellpadding=0 cellspacing=0 width=100% id=ko_onecolumnBlock_3><tr class=row-a><td align=center style=padding-top:30px;padding-left:15px;padding-bottom:30px;padding-right:15px class=section-padding bgcolor=#ffffff><table border=0 cellpadding=0 cellspacing=0 width=500 class=responsive-table><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td align=center style=font-size:25px;font-family:Helvetica,Arial,sans-serif;color:#3f3d33;padding-top:0 class=padding-copy>You Got a New Message!<tr><td align=center style="padding:20px 0 0 0;font-size:16px;line-height:25px;font-family:Helvetica,Arial,sans-serif;color:#3f3d33"class="padding-copy textlightStyle"><p style=margin:0>Far far away, behind the word mountains, far from the countries <a href=""style=font-weight:700>Vokalia and Consonantia</a>, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.</table><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100% class=mobile-button-container><tr><td align=center style="padding:25px 0 0 0"class=padding-copy><table border=0 cellpadding=0 cellspacing=0 class=responsive-table><tr><td align=center><a href=""style="display:inline-block;font-size:18px;font-family:Helvetica,Arial,sans-serif;font-weight:400;color:#fff;text-decoration:none;background-color:#3080e8;padding-top:15px;padding-bottom:15px;padding-left:25px;padding-right:25px;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;border-bottom:3px solid #1662c5"target=_new class=mobile-button>Go To SiteMap<span data-mce-bogus=true id=_mce_caret><strong></strong></span></a></table></table></table></table></table><table border=0 cellpadding=0 cellspacing=0 width=100% id=ko_footerBlock_2 style=min-width:500px><tr><td align=center bgcolor=#d8d8d8><table border=0 cellpadding=0 cellspacing=0 width=100% align=center><tr><td style="padding:20px 0 20px 0"><table border=0 cellpadding=0 cellspacing=0 width=500 class=responsive-table align=center><tr><td align=center style=font-size:12px;line-height:18px;font-family:Helvetica,Arial,sans-serif;color:#3f3d33 valign=middle><span class=appleFooter style=color:#3f3d33>Main address and city</span><br><a href=%5Bprofile_link%5D style=color:#3f3d33;text-decoration:none target=_new class=original-only>Unsubscribe</a><span class=original-only style=font-family:Arial,sans-serif;font-size:12px;color:#444>   |   </span><a href=%5Bshow_link%5D style=color:#3f3d33;text-decoration:none target=_new>View on web browser</a><tr style=text-align:center><td><a href=https://mosaico.io/?footerbadge target=_new><img alt="MOSAICO Responsive Email Designer"border=0 src=https://mosaico.io/img/mosaico-badge.gif style=margin-top:10px hspace=0 vspace=0></a></table></table></table>'
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });

// }

exports.sendInviteMailer = function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dex@theamp.com', //your email
            pass: 'Awesomeo21' //password
        }
    });

    var email = req.body.email;
    var token = req.body.token;

    var mailOptions = {
        from: 'dex@theamp.com', // sender address
        to: email, // list of receivers
        subject: 'verification mail', // Subject line
        text: 'Hi', // plain text body
        html: '<!DOCTYPE html><html lang=it><meta content="text/html; charset=UTF-8"http-equiv=content-type><title>MOSAICO Responsive Email Designer</title><meta charset=utf-8><meta content="width=device-width"name=viewport><style>#ko_onecolumnBlock_3 .textintenseStyle a,#ko_onecolumnBlock_3 .textintenseStyle a:hover,#ko_onecolumnBlock_3 .textintenseStyle a:link,#ko_onecolumnBlock_3 .textintenseStyle a:visited{color:#fff;text-decoration:none;text-decoration:none;font-weight:700}#ko_onecolumnBlock_3 .textlightStyle a:hover,#ko_onecolumnBlock_3 .textlightStyle a:visited{color:#3f3d33;text-decoration:none;font-weight:700}</style><style>#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}body{margin:0;padding:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body{height:100%!important;margin:0;padding:0;width:100%!important}.appleBody a{color:#68440a;text-decoration:none}.appleFooter a{color:#999;text-decoration:none}@media screen and (max-width:525px){table[class=wrapper]{width:100%!important;min-width:0!important}td[class=mobile-hide]{display:none}img[class=mobile-hide]{display:none!important}img[class=img-max]{width:100%!important;max-width:100%!important;height:auto!important}table[class=responsive-table]{width:100%!important}td[class=padding]{padding:10px 5% 15px 5%!important}td[class=padding-copy]{padding:10px 5% 10px 5%!important;text-align:center}td[class=padding-meta]{padding:30px 5% 0 5%!important;text-align:center}td[class=no-pad]{padding:0!important}td[class=no-padding]{padding:0!important}td[class=section-padding]{padding:10px 15px 10px 15px!important}td[class=section-padding-bottom-image]{padding:10px 15px 0 15px!important}td[class=mobile-wrapper]{padding:10px 5% 15px 5%!important}table[class=mobile-button-container]{margin:0 auto;width:100%!important}a[class=mobile-button]{width:80%!important;padding:15px!important;border:0!important;font-size:16px!important}}</style><body align=center bgcolor=#ffffff style=margin:0;padding:0><table border=0 cellpadding=0 cellspacing=0 width=100% id=ko_imageBlock_4><tr class=row-a><td align=center style=padding-top:0;padding-left:15px;padding-bottom:0;padding-right:15px class=no-pad bgcolor=#f7f7f7><table border=0 cellpadding=0 cellspacing=0 width=500 class=responsive-table><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td class=no-padding><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><img alt=""border=0 class=img-max src="https://mosaico.io/srv/f-4vwir91/img?src=https%3A%2F%2Fmosaico.io%2Ffiles%2F4vwir91%2FsiteMapLogo.png&method=resize&params=500%2Cnull"style=display:block;padding:0;color:#3f3d33;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:16px;width:500px width=500></table></table></table></table></table><table border=0 cellpadding=0 cellspacing=0 width=100% id=ko_onecolumnBlock_3><tr class=row-a><td align=center style=padding-top:30px;padding-left:15px;padding-bottom:30px;padding-right:15px class=section-padding bgcolor=#ffffff><table border=0 cellpadding=0 cellspacing=0 width=500 class=responsive-table><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td align=center style=font-size:25px;font-family:Helvetica,Arial,sans-serif;color:#3f3d33;padding-top:0 class=padding-copy>You re Invited to Join SiteMap!<tr><td align=center style="padding:20px 0 0 0;font-size:16px;line-height:25px;font-family:Helvetica,Arial,sans-serif;color:#3f3d33"class="padding-copy textlightStyle"><p style=margin:0>Your account is all set up and waiting for you! Just go to sitemap.com and login with your Email and temporary Password!<br><br><p style=margin:0>Email: ' + email + '<p style=margin:0>Password: ' + token + '</table><tr><td><table border=0 cellpadding=0 cellspacing=0 width=100% class=mobile-button-container><tr><td align=center style="padding:25px 0 0 0"class=padding-copy><table border=0 cellpadding=0 cellspacing=0 class=responsive-table><tr><td align=center><a href=""style="display:inline-block;font-size:18px;font-family:Helvetica,Arial,sans-serif;font-weight:400;color:#fff;text-decoration:none;background-color:#3080e8;padding-top:15px;padding-bottom:15px;padding-left:25px;padding-right:25px;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;border-bottom:3px solid #1662c5"target=_new class=mobile-button>Go To SiteMap<span data-mce-bogus=true id=_mce_caret><strong></strong></span></a></table></table></table></table></table><table border=0 cellpadding=0 cellspacing=0 width=100% id=ko_footerBlock_2 style=min-width:500px><tr><td align=center bgcolor=#d8d8d8><table border=0 cellpadding=0 cellspacing=0 width=100% align=center><tr><td style="padding:20px 0 20px 0"><table border=0 cellpadding=0 cellspacing=0 width=500 class=responsive-table align=center><tr><td align=center style=font-size:12px;line-height:18px;font-family:Helvetica,Arial,sans-serif;color:#3f3d33 valign=middle><span class=appleFooter style=color:#3f3d33>Main address and city</span><br><a href=%5Bprofile_link%5D style=color:#3f3d33;text-decoration:none target=_new class=original-only>Unsubscribe</a><span class=original-only style=font-family:Arial,sans-serif;font-size:12px;color:#444> | </span><a href=%5Bshow_link%5D style=color:#3f3d33;text-decoration:none target=_new>View on web browser</a></table></table></table>'

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

}
