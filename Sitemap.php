<?php

$site = array(
	'Contact' => array(
		0 => "contact.html",
		'Fans' => "fans.html",
		'Booking' => "booking.html",
		'Licensing' => "licensing.html"),
	'Media' => "media.html",
	'News' => array(
		0 => "news.html",
		'Next Show' => "news/nextshow.html",
		'News' => "news.html",
		'Blog' => "news/blog.html",
		'Forum' => "news/forum.html"),
	'Bio' => array(
		0 => "bio.html",
		'Mission Statement' => "missionstatement.html",
		'EPK' => "epk.html"),
	'Merch' => "merch.html",
	'Calendar' => array(
		0 => "calendar/calendar.html",
		'Next Show' => "calendar/nextshow.html"),
	'Music' => array(
		0 => "music.html",
		'Discography' => "discography.html")
	);

function writeLink($path, $text) {
	//<a href='address'>name</a>
	$link = "<a href='$path'>$text</a>";
	echo $link;
}

function buildSiteMap($map) {

	echo "\n<ul>";

	if (!is_array($map)) { return; }

	foreach ($map as $name => $value) {
		if (is_array($value)) {
			
			$first = $value[0];
			unset($value[0]);

			echo "\n<li>";
			writeLink($first, $name);
			echo "\n</li>";

			buildSiteMap($value);

		} else {
			echo "\n<li>";
			writeLink($value, $name);
			echo "\n</li>";
		}
	}

	echo "\n</ul>";
}

buildSiteMap($site);
?>