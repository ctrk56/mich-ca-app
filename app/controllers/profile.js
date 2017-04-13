var args = $.args;
var LOGIN_URL = "http://localhost:8047/login";
var APICalls = require("apiCalls");
var Util = require("util");
var UserRoles = require("userRoles");

var handleSuccessCallback = function(data) {
    if(data.success) {
        var user = data.user;
        Alloy.Globals.loggedInUser = user;
        
        UserRoles.initOnLogin();
        
        $.loginView.visible = false;
        $.loggedInView.visible = true;

        $.userId.value = "";
        $.passowrd.value = "";
    } else {
        alert("Login attempt failed please verify your user name and password.");
    }
};

var loginSubmit = function() {
    var userId = $.userId.value, password = $.passowrd.value;
    if(Util.isValidUserId(userId) && password) {
        var options = {
            data: {'userId': userId, 'password': password, 'id': Ti.Platform.id},
            method: 'POST'
        };
        options.handleSuccessCallback = handleSuccessCallback;
        APICalls.request(LOGIN_URL, options);
    } else {
        alert("Login attempt failed please verify your user name and password.");
    }
};

var logoutSubmit = function() {
    UserRoles.clearOnLogOut();
    initProfileTab(); //FIXME
    $.loginView.visible = true;
    $.loggedInView.visible = false;
    Alloy.Globals.loggedInUser = {};
};

//FIXME
var initProfileTab = function() {
    $.userId.value = "tagor@gmail.com"; 
    $.passowrd.value = "password";
};

$.profileTab.addEventListener('selected', function() {
    initProfileTab();
});