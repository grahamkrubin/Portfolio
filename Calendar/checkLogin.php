<?php
// login_ajax.php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
//This will store the data into an associative array

session_start();
$cookie = null;
if(isset($_SESSION['token'])){
    $cookie = $_SESSION['token'];
    echo json_encode(array(
		"success" => true,
        "token" => $cookie
	));
    exit;
}
else{
    echo json_encode(array(
		"success" => false
	));
    exit;
}
/*
if(session_status() == PHP_SESSION_NONE || session_status() == PHP_SESSION_DISABLED){ //if there is no session
    session_start();
    session_destroy();
    echo json_encode(array(
		"success" => true,
	));
    exit;
}
else{
    //session_destroy();
    echo json_encode(array(
		"success" => false,
		"message" => "Already Logged in"
	));
	exit;
    
}
*/
?>