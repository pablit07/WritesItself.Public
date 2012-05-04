<?php
	
	header("Content-type: text/javascript");

	/* libs */
	echo file_get_contents("libs\jQuery.jPlayer.2.1.0\jquery.jplayer.min.js");

	/* includes - js files */

	echo file_get_contents("script.js");

	/* GLobal Server Vars */

	echo "Page.prototype.domain = 'http://". $_SERVER['HTTP_HOST']."';";
	echo "Page.prototype.root = 'http://".$_SERVER['HTTP_HOST']."' + '/WritesItself/BandSite/';";
	
?>

if (typeof Page == 'function') {
	var page = new Page();
	page.init();
}