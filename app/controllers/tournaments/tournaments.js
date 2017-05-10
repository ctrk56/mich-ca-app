var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var TOURNAMENTS_URL = Alloy.Globals.URL.TOURNAMENTS;
var tournamentsItems = [];

var handleSuccessCallback = function(data) {
	tournamentsItems = [];
	var tournaments = JSON.parse(data).tournaments;
	if(tournaments.length > 0) {
		_.map(tournaments, function(item){	
			if(item.active) {
				tournamentsItems.push({
					properties : {
		                color : "black",
		                accessoryTypeColor : "red",
		                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
					},
					menuItem : {text: item.tournament, left: 5, font: {fontWeight: 'bold', fontSize: 20}},
					template : 'tournamentsTemplate'
				});
			}
		});
		if (tournamentsItems.length > 0) {
			var sections = Ti.UI.createListSection({});
			sections.setItems(tournamentsItems);
			$.tournamentsList.setSections([sections]);
		}
	}
    $.activityIndicator.hide();
};

var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
	if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "GLT") {
		var tournamentView = Alloy.createController('glt/glt', {}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
	} else if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "T20") {
		var tournamentView = Alloy.createController('t20/t20', {}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
	} else if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "F40") {
		var tournamentView = Alloy.createController('f40/f40', {}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
	} else {
		var dialog = Ti.UI.createAlertDialog({
            title: "Information",
            message: "We are still working on \""+ item.menuItem.text+"\"?",
            buttonNames: ['Ok'],
            cancel: 1
        });
        dialog.show();
	}
};

$.tournamentsList.addEventListener('itemclick', itemClickHandler);

var initTournamentsTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message:" Loading..."});
    APICalls.request(TOURNAMENTS_URL, options);
};

$.tournamentsTab.addEventListener('selected', function() {
    initTournamentsTab();
});
