// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var url = args.url || "http://cnet.com";
var webview = Titanium.UI.createWebView({
    url : url
});
$.win.add(webview);
$.win.open({
    modal : true
}); 