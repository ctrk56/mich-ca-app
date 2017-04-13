var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var aboutItems = [];
var ABOUTUS_URL = "https://ctrk56.github.io/mich-ca/aboutus.json";

var handleSuccessCallback = function(data) {
    aboutItems = [];
    var aboutInfo = JSON.parse(data).aboutus;
    _.map(aboutInfo, function(item) {
        aboutItems.push({
            properties: {
                color: "black",
                height: Ti.UI.SIZE
            },
            name: {text: item.name},
            designation: {text: item.designation},
            contact: {text: item.contact},
            template : 'aboutusTemplate'
        });
    });
    if(aboutInfo.length > 0) {
        var sections = Ti.UI.createListSection({});
        sections.setItems(aboutItems);
        $.aboutusList.setSections([sections]);
    }
    $.activityIndicator.hide();
};

var initAboutTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message: " Loading..."});
    APICalls.request(ABOUTUS_URL, options);
};

var itemClickHandler = function(e) {
    //TODO: reveal contact info
};

$.aboutusList.addEventListener('itemclick', itemClickHandler);

$.aboutusTab.addEventListener('selected', function() {
    initAboutTab();
});