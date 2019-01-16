<?php
// login_ajax.php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
session_start();
//get session variables
$username = $_SESSION['username'];
$user_id = $_SESSION['userid'];
//date of events to be shown
$date = $json_obj['date'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
//debug_to_console($username);
// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
    require 'user_database.php';
    $modEventsArr = array();
	$stmt = $mysqli->prepare(
                "SELECT title, start, end, event_id FROM events WHERE user_id=? AND date=?"
            );

            
	$stmt->bind_param('ss', $user_id, $date);
	//$username = (string)$_POST['username'];
	$stmt->execute();
	
	$stmt->bind_result($title, $start, $end, $event_id);
	while($stmt->fetch()){
        $temparr = [$title, $start, $end, $event_id];
        array_push($modEventsArr, $temparr);
        }
    
    //$hashed_pass = password_hash((string)$password, PASSWORD_BCRYPT);
    //$conditional = password_verify((string)$password, (string)$pwd_hash);

if(count($modEventsArr)>0){ 
	echo json_encode(array(
        "success" => true,
		"dataset"=>$modEventsArr
	));
	exit;
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "No events for given user"
	));
	exit;
}

?>