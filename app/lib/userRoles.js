var UserRoles = {};

UserRoles.initOnLogin = function() {
    if (Alloy.Globals.loggedInUser.role == 'admin') {
        var isManageUserTabPresent = false;
        var isTeamsTabPresent = false;
        _.map(Alloy.Globals.mainTab.getTabs(), function(tab) {
            if (tab.id == 'manageUsersTab') {
                isManageUserTabPresent = true;
            } else if(tab.id == 'teamsTab') {
                isTeamsTabPresent = true;
            }
        });
        if (!isManageUserTabPresent) {
            var manageUsers = Alloy.createController('manageUsers').getView();
            Alloy.Globals.mainTab.addTab(manageUsers);
        }
        if(!isTeamsTabPresent) {
            var teams = Alloy.createController('teams').getView();
            Alloy.Globals.mainTab.addTab(teams);
        }
    }
};

UserRoles.clearOnLogOut = function() {
    if (Alloy.Globals.loggedInUser.role == 'admin') {
        if(OS_IOS){
            var manageUserTab;
            var teamsTab;
            _.map(Alloy.Globals.mainTab.getTabs(), function(tab){
                    if(tab.id == 'manageUsersTab') {
                        manageUserTab = tab;
                    } else if(tab.id == 'teamsTab') {
                        teamsTab = tab;
                    }
                });
            if(manageUserTab) {
              Alloy.Globals.mainTab.removeTab(manageUserTab);  
            } 
            if(teamsTab) {
              Alloy.Globals.mainTab.removeTab(teamsTab);  
            }
        } else {
            alert("App will be restarted. Are you sure you want to continue?");
            //FIXME android restart the app.
        }
    }
};

module.exports = UserRoles;
