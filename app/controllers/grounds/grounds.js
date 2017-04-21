var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var groundsItems = [];
var GROUNDS_URL = Alloy.Globals.URL.GROUNDS;
var GOOGLE_MAPS = Alloy.Globals.URL.GOOGLE_MAPS;
var APPLE_MAPS = Alloy.Globals.URL.APPLE_MAPS;

var handleSuccessCallback = function(data) {
    groundsItems = [];
    var grounds = JSON.parse(data).grounds;
    _.map(grounds, function(item) {
    	if(item.active) {
	        var url = item.address+ "+" + item.city + "+" + item.state + "+" + item.zip;
	        url=url.replace(" ", "+");
	        if(OS_IOS) {
	            url = IOS_LINK + url;
	        } else {
	            url = ANDROID_LINK + url;
	        }
	        groundsItems.push({
	            properties: {
	                color: "black",
	                accessoryTypeColor : "red",
	                height: Ti.UI.SIZE,
	                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
	                url: url,
	            },
	            name: {text: item.name},
	            address: {text: item.address + ", "+ item.city+ ", " + item.state+ ", " + item.zip},
	            template : 'groundsTemplate',
	            link: {name: 'LINK'}
	        });	
    	}
    });
    if(groundsItems.length > 0) {
        var sections = Ti.UI.createListSection({});
        sections.setItems(groundsItems);
        $.groundsList.setSections([sections]);
    }
    $.activityIndicator.hide();
};

var initGroundsTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message: " Loading..."});
    APICalls.request(GROUNDS_URL, options);
};

var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
    if (groundsItems.length > 0 && item.name) {
        Ti.Platform.openURL(item.properties.url);
    }
};

$.groundsList.addEventListener('itemclick', itemClickHandler);

$.groundsTab.addEventListener('selected', function() {
    initGroundsTab();
});