<?php
  
  header('Content-type: text/css');

  /* css includes here */
  echo file_get_contents("boilerplate.css");
  echo file_get_contents("shorthand.css");
  echo file_get_contents("global.css");
  echo file_get_contents("dynamic.css");

	/* css style generator */
?>
