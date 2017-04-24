var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var TEAMS_URL = "https://ctrk56.github.io/mich-ca/glt_2017_teams.json";
var teamItems = [];

var handleSuccessCallback = function(data) {
	teamItems = [];
    var teams = JSON.parse(data).teams;
    if(teams.length > 0) {
		_.map(teams, function(item) {
			if(item.active) {
				teamItems.push({
					properties: {
						color: 'black',
						height: Ti.UI.SIZE
					},
					name: {text: item.name + " (" + item.code+ ")", left: 10},
					container: {height: Ti.UI.SIZE, width: Ti.UI.FILL},
					template: 'teamsTemplate'
				}); 
			}
		});
        var sections = Ti.UI.createListSection({});
        sections.setItems(teamItems);
        $.teamsList.setSections([sections]);
    }
    $.activityIndicator.hide();
};

var initTeams = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    APICalls.request(TEAMS_URL, options);
};

if(OS_ANDROID) {
	$.teamsWindow.addEventListener('android:back', function(){
		$.teamsWindow.close();
	});
} 

initTeams();
