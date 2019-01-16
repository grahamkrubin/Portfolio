<?php
// login_ajax.php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
session_start();
$deleted = false;
//get session variables
$username = $_SESSION['username'];
$user_id = $_SESSION['userid'];
//date of events to be shown
$newtitle = (string)$json_obj['mod-title'];
$newdesc = (string)$json_obj['mod-desc'];
$newstart = (string)$json_obj['mod-start'];
$newend = (string)$json_obj['mod-end'];
$newdate = (string)$json_obj['mod-date'];
$event_id = (string)$json_obj['event_id'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
    require 'user_database.php';
    //$modEventsArr = array();
	$stmt = $mysqli->prepare(
                "UPDATE events SET title = ?, description = ?, start=?, end=?, date=? WHERE event_id = ?"
            );

            
	$stmt->bind_param('ssssss', $newtitle, $newdesc, $newstart, $newend, $newdate, $event_id);
	//$username = (string)$_POST['username'];
	$stmt->execute();
	
	$stmt->close();
    $deleted = true;
    //$hashed_pass = password_hash((string)$password, PASSWORD_BCRYPT);
    //$conditional = password_verify((string)$password, (string)$pwd_hash);

if($deleted){ 
	echo json_encode(array(
        "success" => true,
		//"dataset"=>$modEventsArr
	));
	exit;
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "Failed to update"
	));
	exit;
}

?>