var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var LINKS_URL = Alloy.Globals.URL.LINKS;
var linksItems = [];


var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
    if (linksItems.length > 0 && item.title) {
        Ti.Platform.openURL(item.properties.url);
    }
};

$.linksList.addEventListener('itemclick', itemClickHandler);

var handleSuccessCallback = function(data) {
    linksItems = [];
    var links = JSON.parse(data).links;
    if(links.length > 0) {
        _.map(links, function(item) {
            if(item.active) {
                linksItems.push({
                    properties: {
                        color: "black",
                        accessoryTypeColor : "red",
                        height: Ti.UI.SIZE,
                        accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
                        url: item.link
                    },
                    title: {text: item.title},
                    template : 'linksTemplate',
                    wrapper: {height: Ti.UI.SIZE}
                });
            } 
        });
        if(linksItems.length > 0) {
            var sections = Ti.UI.createListSection({});
            sections.setItems(linksItems);
            $.linksList.setSections([sections]);
        }
    }
    $.activityIndicator.hide();
};

var initLinksTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message:" Loading..."});
    APICalls.request(LINKS_URL, options);
};
$.linksTab.addEventListener('selected', function() {
    initLinksTab();
});