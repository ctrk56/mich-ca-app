var args = $.args;
var dataLoad = args.dataLoad || '';
$.standingsWindow.title = args.title || "Standings";

var createListSectionItems = function(standings, poolName) {
    var listItems = [];
    Ti.API.info(standings);
    _.map(standings, function(item) {
        var key = "full_name"; 
        
        var standingsName = item.team.full_name.split(",")[0];
        var standingsCode = item.team.full_name.split(",")[1].trim().split(' ')[0];
        var standingsData = {
            properties: {
                color: 'black',
                height: Ti.UI.SIZE,
            },
            name: {text: standingsName + " (" + standingsCode+ ")", left: 10},
            rank: {text: "Rank: "+ item.rank, left: 10, font: {fontWeight: 'bold'}},
            container: {height: Ti.UI.SIZE, width: Ti.UI.FILL},
            template: 'standingsTemplate'
        };
        standingsData.properties.searchableText = standingsName + " " + standingsCode;
        if(poolName) {
            standingsData.properties.searchableText = standingsData.properties.searchableText + " " + standingsName;
        }
        
        listItems.push(standingsData); 
    });
    if(OS_ANDROID) {
        $.searchBar.hintText = "Search...";
        $.searchBar.blur();
    }
    return listItems;
};

var handleSuccessCallback = function() {
    if(dataLoad) {
        $.standingsList.setSections([]);
        
        var groupedByPools = _.groupBy(dataLoad, 'pool');
        if(groupedByPools) {
            var standingsByPool = [];
            for(var k in groupedByPools) {
                standingsByPool.push(k);
            }
            _.map(standingsByPool, function(pool) {
                var section = Ti.UI.createListSection({});
                if(pool == null) {
                    var poolName = " Pool " + pool;
                    section.setHeaderTitle(" " + poolName);
                }
                var items = [];
                _.map(groupedByPools[pool], function(standingsInPool){
                    items = createListSectionItems(groupedByPools[pool], poolName);
                });
                if(items.length > 0) {
                    section.setItems(items);
                    $.standingsList.appendSection(section);
                }
            });
        } else {
            var sections = Ti.UI.createListSection({});
            sections.setItems(createListSectionItems(dataLoad));
            $.standingsList.setSections([sections]);
        }
    }
    $.activityIndicator.hide();
};

var initStandings = function() {
    $.activityIndicator.show({message:" Loading..."});
    handleSuccessCallback();
};

if(OS_ANDROID) {
    $.standingsWindow.addEventListener('android:back', function(){
        $.standingsWindow.close();
    });
} 

initStandings();