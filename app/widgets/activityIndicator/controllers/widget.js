var args = arguments[0] || {};

$.ai.message = args.message || "  Loading";

exports.show = function(options) {
    if (options && options.message) {
        $.ai.message = options.message;
    } else {
        $.ai.message = "  Loading";
    }
    
    $.blocker.visible = true;
    $.ai.show();
};

exports.hide = function() {
    $.blocker.visible = false;
    $.ai.hide();
};
