<?php
if ($_POST['debug']) {
  header("Cache-Control: no-store, no-cache, must-revalidate"); 
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
}

header('Content-type: text/css');

  /* css includes here */
  echo file_get_contents("boilerplate.css");
  echo file_get_contents("shorthand.css");
  echo file_get_contents("global.css");
  echo file_get_contents("dynamic.css");

	/* css style generator */
?>
