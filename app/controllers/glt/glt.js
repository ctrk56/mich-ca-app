var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var LINKS_ARGS = {url: Alloy.Globals.URL.LINKS, title: "GLT Links"};
var dataLoad = args.dataLoad[0];
$.gltWindow.title = args.title || "GLT";
var gltItems = [];

var handleSuccessCallback = function() {
	gltItems = [];
	$.gltList.setSections([]);
	
	if(dataLoad) {
        if(dataLoad.fixtures) {
            var properties = {
                    color: "black",
                    accessoryTypeColor: "red",
                    accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            };
            gltItems.push({
                properties : properties,
                //icon: {image: icon, width: "10%", left: 5},
                menuItem: { text: "Fixtures", left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.fixtures,
                template : 'gltTemplate'
            });
        }
        if(dataLoad.standings) {
            gltItems.push({
                properties : properties,
                //icon: {image: icon, width: "10%", left: 5},
                menuItem: { text: "Standings", dataLoad: dataLoad.standings, left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.standings,
                template : 'gltTemplate'
            });
        }
        if(dataLoad.teams) {
            gltItems.push({
                properties : properties,
                //icon: {image: icon, width: "10%", left: 5},
                menuItem: { text: "Teams", dataLoad: dataLoad.teams, left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.teams,
                template : 'gltTemplate'
            });
        }

    	if(gltItems.length > 0) {
	        var sections = Ti.UI.createListSection({});
	        sections.setItems(gltItems);
	        $.gltList.setSections([sections]);
    	}
    }
    $.activityIndicator.hide();
};

var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
	if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Teams") {
		var teamsView = Alloy.createController('teams/teams', {"dataLoad": item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
	} else if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Fixtures") {
		var fixturesView = Alloy.createController('fixtures/fixtures', {"dataLoad": item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(fixturesView, {});
	} else if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Standings") {
        var fixturesView = Alloy.createController('standings/standings', {"dataLoad": item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(fixturesView, {});
    } else if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Links") {
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

$.gltList.addEventListener('itemclick', itemClickHandler);

var initGLTTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message:" Loading..."});
    handleSuccessCallback();
};

if(OS_ANDROID) {
	$.gltWindow.addEventListener('android:back', function(){
		$.gltWindow.close();
	});
}

initGLTTab();