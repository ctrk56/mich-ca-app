// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.newsItemWindow.title = args.title || '';
$.subtitle.text = args.subtitle || '';
$.message.text = args.message || '';
