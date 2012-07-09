
/* playlistRowTepmplate.js */
//playlist row template

(function() {
	if (!$) { console.info("jQuery ($) not found."); return false; }

	var rEl = [];

	rEl.push("<tr data-index='0'>");
	rEl.push("<td>");
	rEl.push("</td>");
	rEl.push("<td class='remove'>");
	rEl.push("<span></span>");
	rEl.push("</td>");
	rEl.push("</tr>");

	jPlayer.prototype.$_playlistRow = $(rEl.join(""));
	jPlayer.prototype.getPlaylistRowEl = function(index, name) {
		var $el = this.$_playlistRow.clone();
		$el.find("td").eq(0).html(name);
		$el.attr("data-index", index);
		return $el;
	};
})();
