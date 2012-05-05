<?php

	
	echo 'local file test';
	echo file_exists('server_tests.php') ? 'Exists' : 'doesnt exist';
	echo "<br/><br/>";
	echo 'local file test';
	echo file_exists('/index.html') ? 'Exists' : 'doesnt exist';

	echo "<br/><br/>";
	echo 'local file test';
	echo file_exists('/WritesItself/BandSite/index.html') ? 'Exists' : 'doesnt exist';

?>