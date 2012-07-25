<?php

// display time in MDT
date_default_timezone_set('America/Denver');

// list of form inputs to include in the email
$form_vars = array(
		"email",
		"phone",
		"preference"
	);

// adds a predefined list of Post variables and their values to the message string
// returns the updated message
function addVarsToMessage($vars, $message) {

	foreach ($vars as $name) {
		$value = "<i>undefined</i>";

		if (array_key_exists($name, $_POST)) {
			$value = $_POST[$name];
			$value = htmlspecialchars($value);
			$value = "<strong>".$value."</strong>";
		}

		$message .= "<p>".ucwords($name).": ".$value."</p>";
	}

	return $message;
}

// set up email params
$subject = "New Mailing List Contact - ".date("M j Y g:i:s A T",  $_SERVER['REQUEST_TIME']);

//$to = "paul.kohlhoff@gmail.com";
$to = "contact@writesitself.net";


$message = "<h1>Add To Mailing List</h1><p>A new user has submitted the following information:</p>";

$message = addVarsToMessage($form_vars, $message);

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers .= 'From: AUTOMAILER <AUTOMAILER@writesitself.com>' . "\r\n";


mail($to, $subject, $message, $headers);

?>




