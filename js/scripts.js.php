<?php
	define("DS", "Windows" === PHP_OS? "\\" : "/");

	header("Content-type: text/javascript");

	/* libs */
	echo file_get_contents("libs".DS."jQuery.jPlayer.2.1.0".DS."jquery.jplayer.min.js");

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