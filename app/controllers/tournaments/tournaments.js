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
			if(item.published) {
			    var tName = item.name.replace("Mich-CA ", "");
				tournamentsItems.push({
					properties : {
		                color : "black",
		                accessoryTypeColor : "red",
		                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
		                id: item.id
					},
					menuItem : {text: tName, left: 5, font: {fontWeight: 'bold', fontSize: 20}},
					dataLoad: item.seasons || {},
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
	if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "Great Lakes Tournament") {
		var tournamentView = Alloy.createController('t20/t20', {"dataLoad": item.dataLoad, "title": item.menuItem.text}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
	} else if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "T20 Plate") {
		var tournamentView = Alloy.createController('t20/t20', {"dataLoad": item.dataLoad, "title": item.menuItem.text}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
	} else if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "T20 Trophy") {
        var tournamentView = Alloy.createController('t20/t20', {"dataLoad": item.dataLoad, "title": item.menuItem.text}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
    } else if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "T20 Shield") {
        var tournamentView = Alloy.createController('t20/t20', {"dataLoad": item.dataLoad, "title": item.menuItem.text}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
    } else if(tournamentsItems.length > 0 && item.menuItem && item.menuItem.text == "Summer F40") {
		var tournamentView = Alloy.createController('t20/t20', {"dataLoad": item.dataLoad, "title": item.menuItem.text}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(tournamentView);
	} else {
		var dialog = Ti.UI.createAlertDialog({
            title: item.menuItem.text,
            message: "Updates coming soon.",
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
