var Common = {};
Common.urlEncode = function(url) {
	return url.replace(' ', '%20');
};
Common.getMp3Url = function(name) {
	return "audio/" + this.urlEncode(name) + '.mp3';
};