var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var T20_URL = Alloy.Globals.URL.T20;
var TEAMS_ARGS = {url: Alloy.Globals.URL.T20_TEAMS, title: "T20 Teams"};
var FIXTURES_ARGS = {url: Alloy.Globals.URL.T20_FIXTURES, title: "T20 Fixtures"};
var LINKS_ARGS = {url: Alloy.Globals.URL.LINKS, title: "T20 Links"};
var t20Items = [];

var handleSuccessCallback = function(data) {
	t20Items = [];
	var t20 = JSON.parse(data).t20;
	if(t20.length > 0) {
		_.map(t20, function(item) {
			if(item.active) {
				//var icon = "images/icons/"+item.menuItem+".png";
				t20Items.push({
					properties : {
						color: "black",
						accessoryTypeColor: "red",
						accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					},
					//icon: {image: icon, width: "10%", left: 5},
					menuItem: { text: item.menuItem, left: 5,font: {fontWeight: 'bold', fontSize: 20} },
		            template : 't20Template'
				});
			}
		});
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
		var teamsView = Alloy.createController('teams/teams', TEAMS_ARGS).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
	} else if(t20Items.length > 0 && item.menuItem && item.menuItem.text == "Fixtures") {
		var fixturesView = Alloy.createController('fixtures/fixtures', FIXTURES_ARGS).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(fixturesView, {});
	} else if(t20Items.length > 0 && item.menuItem && item.menuItem.text == "Links") {
		var linksView = Alloy.createController('links/links', LINKS_ARGS).getView();
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
    APICalls.request(T20_URL, options);
};

if(OS_ANDROID) {
	$.t20Window.addEventListener('android:back', function(){
		$.t20Window.close();
	});
}

initT20Tab();