var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var GLT_URL = "https://ctrk56.github.io/mich-ca/glt_2017.json";
var GLT_TEAMS_2017 = "glt_2017_teams";
var GLT_FIXTURES_2017 = "glt_2017_fixtures";

var gltItems = [];

var handleSuccessCallback = function(data) {
	gltItems = [];
	var glt = JSON.parse(data).glt;
	if(glt.length > 0) {
		_.map(glt, function(item) {
			if(item.active) {
				//var icon = "images/icons/"+item.menuItem+".png";
				gltItems.push({
					properties : {
						color: "black",
						accessoryTypeColor: "red",
						accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
					},
					//icon: {image: icon, width: "10%", left: 5},
					menuItem: { text: item.menuItem, left: 5, font: {fontWeight: 'bold', fontSize: 20} },
		            template : 'gltTemplate'
				});
			}
		});
    
        var sections = Ti.UI.createListSection({});
        sections.setItems(gltItems);
        $.gltList.setSections([sections]);
    }
    $.activityIndicator.hide();
};

var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
	if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Teams") {
		var teamsView = Alloy.createController('teams/teams', {}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
	} else if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Fixtures") {
		var teamsView = Alloy.createController('fixtures/fixtures', {}).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(teamsView);
	} else if(gltItems.length > 0 && item.menuItem && item.menuItem.text == "Links") {
		var linksView = Alloy.createController('links/links', {}).getView();
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
    APICalls.request(GLT_URL, options);
};

$.gltTab.addEventListener('selected', function() {
    initGLTTab();
});
