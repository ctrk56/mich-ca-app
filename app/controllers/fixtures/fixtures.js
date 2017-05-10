var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var FIXTURES_URL = args.url || "";
$.fixturesWindow.title = args.title || "Fixtures";

var createListSectionItems = function(items) {
    var listItems = [];
    _.map(items, function(item) {
        if(item.active) {
            var itemData = {
                properties : {
                    color : "black",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL
                },
                match : { text: "Match: " + item.homeTeam + " VS " + item.awayTeam},
                time: {text: "Time: " + item.time},
                matchDate: { text: "Date: " + item.matchDate},
                ground: { text: "Ground: " + item.ground},
                wrapper: {height: Ti.UI.SIZE, top: 5, bottom: 5, layout: "vertical"},
                template : 'fixturesTemplate'
            };
            if(item.result) {
                itemData.result = {text: "Result: " + item.result, visible: true, height: Ti.UI.SIZE};
            } 
            itemData.properties.searchableText = item.homeTeam + ' ' + item.awayTeam 
                    + ' ' + item.time + ' ' + item.matchDate + ' ' + item.ground + ' ' + itemData.result;
            listItems.push(itemData);
        }
    });
	if(OS_ANDROID) {
		$.searchBar.hintText = "Search...";
		$.searchBar.blur();
	}
    return listItems;
};

var handleSuccessCallback = function(data) {
    var fixtureItems = [];
    var fixtures = JSON.parse(data).fixtures;
    if (fixtures.length > 0) {
        var groupedfixtures = _.groupBy(fixtures, 'matchDate');
        var fixtureDates = [];
        for(var k in groupedfixtures) {
            fixtureDates.push(k);
        }
        $.fixturesList.setSections([]);
        _.map(fixtureDates, function(date) {
            var section = Ti.UI.createListSection({});
            section.setHeaderTitle(" "+date);
            var items = createListSectionItems(groupedfixtures[date]);
            if(items.length > 0) {
	            section.setItems(items);
	            $.fixturesList.appendSection(section);
            }
        });
    }
    $.activityIndicator.hide();
};

var initFixturesTab = function() {
    var options = {
        method : "GET"
    };
    options.handleSuccessCallback = handleSuccessCallback;
    $.activityIndicator.show({message:" Loading..."});
    APICalls.request(FIXTURES_URL, options);
};

if(OS_ANDROID) {
	$.fixturesWindow.addEventListener('android:back', function(){
		$.fixturesWindow.close();
	});
}

initFixturesTab();
