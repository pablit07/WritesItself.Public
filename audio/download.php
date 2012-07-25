<?php


	$name = $_GET['name'];
	$fp = fopen($name, 'rb');

	header("Content-type: audio/mpeg");
	header("Content-length: ".filesize($name));
	header("Content-Disposition: attachment; filename=" . $name);

	fpassthru($fp);

	exit();

?>
