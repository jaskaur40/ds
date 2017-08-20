var mongoose = require('mongoose');

USER_NAME = "jaspreet";
PASSWORD = "jaspreet";
DATABASE = "csu_distributed";
var uri = 'mongodb://' + USER_NAME + ':' + PASSWORD + '@cluster0-shard-00-00-txvpb.mongodb.net:27017,cluster0-shard-00-01-txvpb.mongodb.net:27017,cluster0-shard-00-02-txvpb.mongodb.net:27017/' + DATABASE + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// var options = {
//     db: {native_parser: true},
//     server: {poolSize: 5},
//     user: 'rw',
//     pass: 'adminpwd'
// }
var db = mongoose.createConnection(uri);

// var db = mongoose.connect("mongodb://rw:adminpwd@cluster0-shard-00-00-txvpb.mongodb.net:27017");
var uuid = require('node-uuid');
var UserSchema = new mongoose.Schema({
    userId: String,
    emailId: String,
    fname: String,
    lname: String,
    mobileNum: Number
});
var UserModel = mongoose.model('User', UserSchema);


function UserDao() {

}


UserDao.prototype.validateUser = function (callback, emailID, password) {

    UserModel.find({emailId: emailID}, function (err, users) {
        JSON.stringify(users);
        console.log("In validateusers" + users.userId);

        callback(err, users);
    });
    //connection.end();


};


UserDao.prototype.viewCustomers = function (callback, username, password) {


    UserModel.find(function (err, users) {
        callback(err, users);
    });


};

UserDao.prototype.updateUser = function (callback, userID, emailID, fname, lname, mobileNum) {

    UserModel.count({emailId: emailID}, function (err, emailExists) {
        console.log("emailID is" + emailID);
        if (emailExists == 0) {
            callback('User does not exixts', null);
        } else {

            UserModel.findOne({emailId: emailID}, function (err, users) {
                users.emailId = emailID;
                users.fname = fname;
                users.lname = lname;
                users.mobileNum = mobileNum;

                users.save(function (err, users) {
                    if (!err) {
                        console.log('created');
                        callback(null, users);
                    } else {
                        console.log(err);
                        callback('ERROR', null);
                    }
                });
            });
        }
    });

};


UserDao.prototype.createUser = function (callback, emailID, fname, lname, mobileNum) {
    //var userCount;
    console.log("user" + emailID + fname + lname + mobileNum);
    UserModel.count({emailId: emailID}, function (err, emailExists) {
        if (emailExists == 0) {

            var userId = uuid.v4();
            userId = userId.substr(userId.length - 5);
            var user = new UserModel({
                userId: userId,
                emailId: emailID,
                fname: fname,
                lname: lname,
                mobileNum: mobileNum
            });

            user.save(function (err, users) {
                if (!err) {
                    console.log('created' + user);
                    callback(null, user);
                } else {
                    console.log(err);
                    callback('ERROR', null);
                }
            });

            //});

        } else {
            callback('User Already Exits', null);
        }
    });


};


UserDao.prototype.removeUser = function (callback, emailID) {

    console.log("in remove user" + emailID);
    UserModel.count({emailId: emailID}, function (err, emailExists) {
        if (emailExists == 0) {
            callback('User does not Exits', null);

        } else {
            UserModel.find({emailId: emailID}).remove(function (err, user) {

                if (!err) {
                    console.log("no eror" + user.userId);
                    callback(null, user);
                } else {
                    console.log(" eror");
                    console.log(err);
                    callback('ERROR', null);
                }
            });
        }
    });

}
UserDao.prototype.getUserById = function (callback, userId) {

    console.log("in get use by id" + userId);
    UserModel.count({userId: userId}, function (err, userExists) {
        if (userExists == 0) {
            callback('User does not Exits', null);

        } else {
            UserModel.find({userId: userId}, function (err, user) {

                if (!err) {
                    console.log("no eror" + user.userId);
                    callback(null, user);
                } else {
                    console.log(" eror");
                    console.log(err);
                    callback('ERROR', null);
                }
            });
        }
    });

}

module.exports = UserDao;


