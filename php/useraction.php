<?php

/**
 * @author Sambo
 * @copyright 2015
 */
// session_start ();
// load error handling script and the queue class
require_once ('dbconn.php');

// when the condition is met
if (! (isset ( $_GET ['action'] ))) {
	echo 'Server error: client command missing.';
	exit ();
} else {
	// store the action to be performed in the $action variable
	$action = $_GET ['action'];
}


$user = new Dbconn();

if ($action === 'search') {
	
	
	
	$name = $_GET ['name'];
	
	$result = $user->get_details($name);
	echo $result;
	
	if (empty ( $_GET )) {
		echo "Error: Empty Submission not allowed";
		exit ();
	}
	
	
	
}
else if($action === 'searchimage') {
	
	
	
	$name = $_GET ['name'];
	
	$result = $user->searchimage($name);
	echo $result;
	
	if (empty ( $_GET )) {
		echo "Error: Empty Submission not allowed";
		exit ();
	}
}
?>