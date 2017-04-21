var APICalls = {};

APICalls.request = function(uri, options) {
    // Ti.API.info("Request about to be sent to::: "+ uri);
    if(Ti.Network.online) {
        var xhr = Ti.Network.createHTTPClient({timeout: 60000});
        //FIXME: Below cert change should be removed
        // xhr.validatesSecureCertificate = false;
        var requestSuccess = function(e) {
            var contentType = this.getResponseHeader('Content-Type');
            if (contentType == 'text/javascript') {
                var data = JSON.parse(this.responseText);
                setTimeout(function() {
                        options.handleSuccessCallback(data);
                }, 5000);
            } else {
                var data = this.responseText;
                // setTimeout(function() {
                        options.handleSuccessCallback(data);
                // }, 3000);
            }
        };
        var requestError = function(e) {
            alert("Error  " + JSON.stringify(e));
        };
        xhr.onload = requestSuccess;
        xhr.onerror = requestError;
        if (OS_IOS) {
            xhr.setCache(false);
        }
        xhr.open(options.method, uri);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('Cache-Control', 'no-store');
        xhr.send(JSON.stringify(options.data));
    } else {
        Ti.UI.createAlertDialog({
                title:'Internet Connection Required',
                message:'Please verify your network and try again.',
                buttonNames:['OK'],
        }).show();
    }
};

APICalls.customLabel = function(text, boldText) {
    return Titanium.UI.createAttributedString({
        text: text,
        attributes: [{
            type: Ti.UI.ATTRIBUTE_FONT,
            value: { fontWeight: 'bold' },
            range: [text.indexOf(boldText), (boldText).length]
        }]
    });
};

module.exports = APICalls; 