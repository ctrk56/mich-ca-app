var Util = {};

Util.isValidUserId = function(email) {
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailReg.test(email); 
};

Util.scorePassword = function(pass) {
    var score = 0;
    if (!pass)
        return 0;
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    };
    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return parseInt(score);
};

Util.isValidPassword = function(pass) {
    var score = Util.scorePassword(pass);
    if (score > 80)
        return true;
    if (score > 60)
        return true;
    if (score >= 30)
        return false; 
    return false;
};

Util.isiOS7Plus = function() {
    if (OS_IOS && Titanium.Platform.name == 'iPhone OS') {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0],10);
 
        // Can only test this support on a 3.2+ device
        if (major >= 7) {
            return true;
        }
    }
    return false;
};

module.exports = Util;