var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var F40_URL = Alloy.Globals.URL.F40;
var LINKS_ARGS = {url: Alloy.Globals.URL.LINKS, title: "F40 Links"};
var f40Items = [];
$.f40Window.title = args.title || "F40";
var dataLoad = args.dataLoad[0];

var handleSuccessCallback = function() {
	f40Items = [];
    if(dataLoad) {
        if(dataLoad.fixtures) {
            var properties = {
                    color: "black",
                    accessoryTypeColor: "red",
                    accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
            };
            f40Items.push({
                properties : properties,
                //icon: {image: icon, width: "10%", left: 5},
                menuItem: { text: "Fixtures", left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.fixtures,
                template : 'f40Template'
            });
        }
        if(dataLoad.standings) {
            f40Items.push({
                properties : properties,
                //icon: {image: icon, width: "10%", left: 5},
                menuItem: { text: "Standings", left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.standings,
                template : 'f40Template'
            });
        }
        if(dataLoad.teams) {
            f40Items.push({
                properties : properties,
                //icon: {image: icon, width: "10%", left: 5},
                menuItem: { text: "Teams", left: 5,font: {fontWeight: 'bold', fontSize: 20} },
                dataLoad: dataLoad.teams,
                template : 'f40Template'
            });
        }
        //var icon = "images/icons/"+item.menuItem+".png";
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
        var teamsView = Alloy.createController('teams/teams', {dataLoad: item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
    } else if(f40Items.length > 0 && item.menuItem && item.menuItem.text == "Fixtures") {
        var fixturesView = Alloy.createController('fixtures/fixtures', {dataLoad: item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(fixturesView, {});
    } else if(f40Items.length > 0 && item.menuItem && item.menuItem.text == "Standings") {
        var linksView = Alloy.createController('standings/standings', {dataLoad: item.dataLoad}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(linksView);
    } else if(f40Items.length > 0 && item.menuItem && item.menuItem.text == "Links") {
        var linksView = Alloy.createController('links/links', {dataLoad: item.dataLoad}).getView();
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
    handleSuccessCallback();
};

if(OS_ANDROID) {
	$.f40Window.addEventListener('android:back', function(){
		$.f40Window.close();
	});
}

initF40Tab();