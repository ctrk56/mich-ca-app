var args = $.args;
var dataLoad = args.dataLoad || '';
$.teamsWindow.title = args.title || "Teams";

var createListSectionItems = function(teams, poolName) {
	var listItems = [];
	_.map(teams, function(item) {
        var key = "full_name"; 
	    
	    var teamName = item.team.full_name.split(",")[0];
	    var teamCode = item.team.full_name.split(",")[1].trim().split(' ')[0];
		var teamData = {
			properties: {
				color: 'black',
				height: Ti.UI.SIZE
			},
			name: {text: teamName + " (" + teamCode+ ")", left: 10},
			container: {height: Ti.UI.SIZE, width: Ti.UI.FILL},
			template: 'teamsTemplate'
		};
		teamData.properties.searchableText = teamName + " " + teamCode;
		if(poolName) {
		    teamData.properties.searchableText = teamData.properties.searchableText + " " + poolName;
		}
		
		listItems.push(teamData); 
	});
	if(OS_ANDROID) {
		$.searchBar.hintText = "Search...";
		$.searchBar.blur();
	}
	return listItems;
};

var handleSuccessCallback = function() {
    if(dataLoad) {
        $.teamsList.setSections([]);
        
		var groupedByPools = _.groupBy(dataLoad, 'pool');
        if(groupedByPools) {
            var teamsByPool = [];
            for(var k in groupedByPools) {
                teamsByPool.push(k);
            }
            _.map(teamsByPool, function(pool) {
                var section = Ti.UI.createListSection({});
                if(pool == null) {
                    var poolName = " Pool " + pool;
                    section.setHeaderTitle(" " + poolName);
                }
                var items = [];
                _.map(groupedByPools[pool], function(teamsInPool){
                    items = createListSectionItems(groupedByPools[pool], poolName);
                });
                if(items.length > 0) {
                    section.setItems(items);
                    $.teamsList.appendSection(section);
                }
            });
        } else {
            var sections = Ti.UI.createListSection({});
            sections.setItems(createListSectionItems(dataLoad));
            $.teamsList.setSections([sections]);
        }
    }
    $.activityIndicator.hide();
};

var initTeams = function() {
    $.activityIndicator.show({message:" Loading..."});
    handleSuccessCallback();
};

if(OS_ANDROID) {
	$.teamsWindow.addEventListener('android:back', function(){
		$.teamsWindow.close();
	});
} 

initTeams();
