<?php
	define("DS", "Windows" === PHP_OS? "\\" : "/");

	header("Content-type: text/javascript");

	/* libs */
	echo file_get_contents("libs".DS."jQuery.jPlayer.2.1.0".DS."jquery.jplayer.min.js");

	/* includes - js files */

	echo file_get_contents("script.js");

	/* GLobal Server Vars */

	echo "Page.prototype.domain = window.location.host;";
	echo "Page.prototype.root = window.location.host + (window.location.host=='localhost'? '/WritesItself/BandSite/' : '/');";
	
?>

if (window.page) {
	page.init();
}