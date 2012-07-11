<?php


if (array_key_exists("nocache", $_GET))
{	
	header("Cache-Control: no-cache");
}
else
{
	header("Cache-Control: max-age=10000000");
}

//$image=imagecreatefrompng("lagoon-froth.png");
//$image=imagecreatefrompng("breathing.png");

$type = $_GET['ext'];

switch ($type) {
	case 'png':
		header("Content-type: image/png");
		$image=imagecreatefrompng($_GET['image']);
		imagepng($image);
		break;
	case 'gif':
		header("Content-type: image/gif");
		$image=imagecreatefromgif($_GET['image']);
		imagegif($image);
	
	default:
		# code...
		break;
}


?>