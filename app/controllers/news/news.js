var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var NEWS_URL = "https://ctrk56.github.io/mich-ca/news.json";
var newsItems = [];

var handleSuccessCallback = function(data) {
    newsItems = [];
    var news = JSON.parse(data).news;
    _.map(news, function(item) {
        newsItems.push({
            properties : {
                color : "black",
                accessoryTypeColor : "red",
                accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
            },
            subtitle : { text : item.subtitle },
            title : { text : item.title },
            template : 'newsTemplate',
            container: { height: Ti.UI.SIZE, bottom: 5 },
            message : {text: item.message}
        });
    });
    if (newsItems.length > 0) {
        var section = Ti.UI.createListSection({});
        section.setItems(newsItems);
        $.newsList.setSections([section]);
    }
    $.activityIndicator.hide();
};

var newItemWin = {};
var itemClickHandler = function(e) {
    var item = e.section.getItemAt(e.itemIndex);
    if (newsItems.length > 0 && item.title) {
        newItemWin = Alloy.createController('news/newsItem', {
            title : item.title.text,
            subtitle : item.subtitle.text,
            message : item.message.text
        }).getView();
        Alloy.CFG.tabGroup.getActiveTab().open(newItemWin);
    }
};

$.newsList.addEventListener('itemclick', itemClickHandler);

var initNewsTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    Ti.API.info("111111111111");
    $.activityIndicator.show({message:" Loading..."});
    APICalls.request(NEWS_URL, options);
};

$.newsTab.addEventListener('selected', function() {
    initNewsTab();
});
