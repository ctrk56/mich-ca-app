Alloy.Globals.mainTab = $.mainTab;
Alloy.CFG.tabGroup = $.mainTab;
// $.mainTab.exitOnClose = true;
$.mainTab.orientationModes = [Ti.UI.PORTRAIT];

// var DeviceToken = require('deviceToken');

if (OS_ANDROID) {
	$.mainTab.addEventListener('android:back', function() {
		var dialog = Ti.UI.createAlertDialog({
			title : "Exit Application",
			message : "Are you sure you want to exit application?",
			buttonNames : ['Yes', 'No'],
			cancel : 1
		});
		dialog.addEventListener('click', function(e) {
			if (e.index === e.source.cancel) {
				dialog.hide();
			} else {
				Titanium.Android.currentActivity.finish();
			}
		});
		dialog.show();
	});
}
// DeviceToken.init();

$.mainTab.open();
// setTimeout(function(){
	// alert(DeviceToken.get());
// }, 5000);