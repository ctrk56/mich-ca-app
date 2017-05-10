var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var F40_URL = Alloy.Globals.URL.F40;
var TEAMS_ARGS = {url: Alloy.Globals.URL.F40_TEAMS, title: "F40 Teams"};
var FIXTURES_ARGS = {url: Alloy.Globals.URL.F40_FIXTURES, title: "F40 Fixtures"};
var LINKS_ARGS = {url: Alloy.Globals.URL.LINKS, title: "F40 Links"};
var f40Items = [];

var handleSuccessCallback = function(data) {
	f40Items = [];
	var f40 = JSON.parse(data).f40;
	if(f40.length > 0) {
		_.map(f40, function(item) {
			if(item.active) {
				//var icon = "images/icons/"+item.menuItem+".png";
				f40Items.push({
					properties : {
						color: "black",
						accessoryTypeColor: "red",
						accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					},
					//icon: {image: icon, width: "10%", left: 5},
					menuItem: { text: item.menuItem, left: 5,font: {fontWeight: 'bold', fontSize: 20} },
		            template : 'f40Template'
				});
			}
		});
    	if(f40Items.length > 0) {
	        var sections = Ti.UI.createListSection({});
	        sections.setItems(f40Items);
	        $.f40List.setSections([sections]);
    	}
    }
    $.activityIndicator.hide();
};

var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
	if(f40Items.length > 0 && item.menuItem && item.menuItem.text == "Teams") {
		var teamsView = Alloy.createController('teams/teams', TEAMS_ARGS).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
	} else if(f40Items.length > 0 && item.menuItem && item.menuItem.text == "Fixtures") {
		var fixturesView = Alloy.createController('fixtures/fixtures', FIXTURES_ARGS).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(fixturesView, {});
	} else if(f40Items.length > 0 && item.menuItem && item.menuItem.text == "Links") {
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

$.f40List.addEventListener('itemclick', itemClickHandler);

var initF40Tab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message:" Loading..."});
    APICalls.request(F40_URL, options);
};

if(OS_ANDROID) {
	$.f40Window.addEventListener('android:back', function(){
		$.f40Window.close();
	});
}

initF40Tab();