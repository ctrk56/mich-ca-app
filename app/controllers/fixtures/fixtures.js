var APICalls = require("apiCalls");
var Util = require("util");
var args = $.args;
var FIXTURES_URL = args.url || "";
$.fixturesWindow.title = args.title || "Fixtures";
var dataLoad = args.dataLoad || '';
var createListSectionItems = function(items, poolInfo, roundInfo) {
    var listItems = [];
    _.map(items, function(item) {
        var itemData = {
            properties : {
                color : "black",
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL
            },
            match : { text: "Match: " + item.homeTeam + " VS " + item.awayTeam},
            wrapper: {height: Ti.UI.SIZE, top: 5, bottom: 5, layout: "vertical"},
            template : 'fixturesTemplate'
        };
        if(item.venue_allocations && item.venue_allocations[0]) {
            itemData.matchDate = { text: "Date: " + item.venue_allocations[0].date_and_time};
            itemData.ground = { text: "Ground: " + item.venue_allocations[0].pitch.ground.name};
        }
        if(item.match_result) {
            var result = "";
            if(item.match_result.team_one_result_type.past_tense_name == "won") {
                result = "Result: Winners - " + item.homeTeam;
            } else if(item.match_result.team_two_result_type.past_tense_name == "won") {
                result = "Result: Winners - " + item.awayTeam;
            } else {
                result = "Result: Match " +item.match_result.team_two_result_type.past_tense_name;
            }

            itemData.result = {text: result, visible: true, height: Ti.UI.SIZE};
        } 
        itemData.properties.searchableText = item.homeTeam + ' ' + item.awayTeam + ' ' + roundInfo + ' ' + poolInfo;
        
        if(poolInfo) {
            itemData.properties.searchableText = itemData.properties.searchableText + ' ' + poolInfo;
        }
        listItems.push(itemData);
    });
	if(OS_ANDROID) {
		$.searchBar.hintText = "Search...";
		$.searchBar.blur();
	}
    return listItems;
};

var handleSuccessCallback = function(data) {
    $.fixturesList.setSections([]);

    var groupedfixtures = _.groupBy(dataLoad, 'pool');
    var fixtureByPool = [];
    for(var k in groupedfixtures) {
        fixtureByPool.push(k);
    }
    $.fixturesList.setSections([]);
    _.map(fixtureByPool, function(pool) {
        if(pool > 0) {
            _.map(groupedfixtures[pool], function(roundFixtures){
                var section = Ti.UI.createListSection({});
                var poolInfo = " Pool " + pool;
                section.setHeaderTitle(poolInfo + ": " +roundFixtures.round_info);
                if(roundFixtures.round_info) {
                    var items = createListSectionItems(roundFixtures.fixtures, roundFixtures.round_info, poolInfo);
                    if(items.length > 0) {
                        section.setItems(items);
                        $.fixturesList.appendSection(section);
                    }
                }
            });
        } else {
            _.map(groupedfixtures[pool], function(roundFixtures){
                var section = Ti.UI.createListSection({});
                section.setHeaderTitle(" " + roundFixtures.round_info);
                if(roundFixtures.round_info) {
                    var items = createListSectionItems(roundFixtures.fixtures, roundFixtures.round_info);
                    if(items.length > 0) {
                        section.setItems(items);
                        $.fixturesList.appendSection(section);
                    }
                }
            });
        }
    });

    $.activityIndicator.hide();
};

var initFixturesTab = function() {
    $.activityIndicator.show({message:" Loading..."});
    handleSuccessCallback();
};

if(OS_ANDROID) {
	$.fixturesWindow.addEventListener('android:back', function(){
		$.fixturesWindow.close();
	});
}

initFixturesTab();
