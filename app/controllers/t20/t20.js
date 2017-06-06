var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var T20_URL = Alloy.Globals.URL.T20;
var LINKS_ARGS = {url: Alloy.Globals.URL.LINKS, title: "T20 Links"};
var t20Items = [];
$.t20Window.title = args.title || "T20";
var dataLoad = args.dataLoad[0];

var handleSuccessCallback = function() {
	t20Items = [];
	$.t20List.setSections([]);
	// var t20 = JSON.parse(data).t20;
	if(dataLoad) {
	    if(dataLoad.fixtures) {
	        var properties = {
                    color: "black",
                    accessoryTypeColor: "red",
                    accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            };
			t20Items.push({
				properties : properties,
				//icon: {image: icon, width: "10%", left: 5},
				menuItem: { text: "Fixtures", left: 5,font: {fontWeight: 'bold', fontSize: 20} },
				dataLoad: dataLoad.fixtures,
	            template : 't20Template'
			});
	    }
	    if(dataLoad.standings) {
			t20Items.push({
				properties : properties,
				//icon: {image: icon, width: "10%", left: 5},
				menuItem: { text: "Standings", dataLoad: dataLoad.standings, left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.standings,
	            template : 't20Template'
			});
	    }
	    if(dataLoad.teams) {
			t20Items.push({
				properties : properties,
				//icon: {image: icon, width: "10%", left: 5},
				menuItem: { text: "Teams", dataLoad: dataLoad.teams, left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.teams,
	            template : 't20Template'
			});
	    }
		t20Items.push({
			properties : properties,
			//icon: {image: icon, width: "10%", left: 5},
			menuItem: { text: "Links", left: 5,font: {fontWeight: 'bold', fontSize: 20} },
            template : 't20Template'
		});
		//var icon = "images/icons/"+item.menuItem+".png";
    	if(t20Items.length > 0) {
	        var sections = Ti.UI.createListSection({});
	        sections.setItems(t20Items);
	        $.t20List.setSections([sections]);
    	}
    }
    $.activityIndicator.hide();
};

var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
	if(t20Items.length > 0 && item.menuItem && item.menuItem.text == "Teams") {
		var teamsView = Alloy.createController('teams/teams', {"dataLoad": item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
	} else if(t20Items.length > 0 && item.menuItem && item.menuItem.text == "Fixtures") {
		var fixturesView = Alloy.createController('fixtures/fixtures', {"dataLoad": item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(fixturesView, {});
	} else if(t20Items.length > 0 && item.menuItem && item.menuItem.text == "Standings") {
		var linksView = Alloy.createController('standings/standings', {"dataLoad": item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(linksView);
	} else if(t20Items.length > 0 && item.menuItem && item.menuItem.text == "Links") {
		var linksView = Alloy.createController('links/links').getView();
        Alloy.CFG.tabGroup.getActiveTab().open(linksView);
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

$.t20List.addEventListener('itemclick', itemClickHandler);

var initT20Tab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message:" Loading..."});
    handleSuccessCallback();
};

if(OS_ANDROID) {
	$.t20Window.addEventListener('android:back', function(){
		$.t20Window.close();
	});
}

initT20Tab();