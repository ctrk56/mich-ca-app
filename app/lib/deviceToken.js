// var DeviceToken = {};
// var deviceToken = null;
// 
// DeviceToken.init = function() {
	// Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
		// Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
// 
		// Ti.Network.registerForPushNotifications({
			// success : deviceTokenSuccess,
			// error : deviceTokenError,
			// callback : receivePush
		// });
	// });
// 
	// Ti.App.iOS.registerUserNotificationSettings({
		// types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
	// });
// };
// 
// function receivePush(e) {
	// alert('Received push: ' + JSON.stringify(e));
// }
// 
// function deviceTokenSuccess(e) {
	// Ti.API.info("333333333::::" + JSON.stringify(e));
	// deviceToken = e.deviceToken;
// }
// 
// function deviceTokenError(e) {
	// alert('Failed to register for push notifications! ' + e.error);
// }
// 
// DeviceToken.get = function() {
	// return deviceToken;
// };
// 
// module.exports = DeviceToken;
