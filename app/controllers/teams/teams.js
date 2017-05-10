var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var TEAMS_URL = args.url || ""; 

$.teamsWindow.title = args.title || "Teams";

var createListSectionItems = function(teams) {
	var listItems = [];
	_.map(teams, function(item) {
		if(item.active) {
			var teamData = {
				properties: {
					color: 'black',
					height: Ti.UI.SIZE
				},
				name: {text: item.name + " (" + item.code+ ")", left: 10},
				container: {height: Ti.UI.SIZE, width: Ti.UI.FILL},
				template: 'teamsTemplate'
			};
			teamData.properties.searchableText = item.name + " " + item.code + " " + item.pool;
			listItems.push(teamData); 
		}
	});
	if(OS_ANDROID) {
		$.searchBar.hintText = "Search...";
		$.searchBar.blur();
	}
	return listItems;
};

var handleSuccessCallback = function(data) {
	var pools = [];
    var teams = JSON.parse(data).teams;
    if(teams.length > 0) {
		var groupedPools = _.groupBy(teams, 'pool');
		var poolNames = [];
		for(var k in groupedPools) {
			poolNames.push(k);
		}
		if(poolNames.length > 0) {
			poolNames.sort();
			$.teamsList.setSections([]);
			_.map(poolNames, function(poolName){
				var section = Ti.UI.createListSection({});
				section.setHeaderTitle(" " + poolName);
				var items = createListSectionItems(groupedPools[poolName]);
				if(items.length > 0) {
					section.setItems(items);
					$.teamsList.appendSection([section]);
				}
			});
		}	
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
