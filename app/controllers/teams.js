var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var TEAMS_URL = "http://localhost:8047/listTeams";

var handleSuccessCallback = function(data) {
    var teams = JSON.parse(data).teams;
    var teamsItem = [];
    Ti.API.info(JSON.stringify(teams));
};

var initTeamsTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    APICalls.request(TEAMS_URL, options);
};

$.teamsTab.addEventListener('selected', function() {
    initTeamsTab();
});