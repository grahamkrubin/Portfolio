<?php
// login_ajax.php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
session_start();
if(!array_key_exists("username", $_SESSION)||$_SESSION["username"]==""){
    echo json_encode(array(
        "success" => false,
        "message" => "Not logged in, please log in before trying to add events!!"
    ));
    exit;
}
//Variables can be accessed as such:
$title = $json_obj['title'];
$description = $json_obj['description'];
$start = $json_obj['start'];
$end = $json_obj['end'];
$date = $json_obj['date'];
$recurrDays = $json_obj['recurrDays'];
$recurrWeeks = $json_obj['recurrWeeks'];
$username = $_SESSION['username'];

//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
//debug_to_console($username);
// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
require 'user_database.php';
$added = false;
/*
	$stmt = $mysqli->prepare(
                "SELECT id FROM user_info WHERE username=?"
            );

            
	$stmt->bind_param('s', $username);
	//$username = (string)$_POST['username'];
	$stmt->execute();
	
	$stmt->bind_result($user_id);
	$stmt->fetch();
    $stmt->close();
  */
$user_id = $_SESSION['userid'];
    $addevent = $mysqli->prepare(
        "INSERT INTO events (user_id, date, title, description, start, end, recurring_days, recurring_weeks) VALUES(?,?,?,?,?,?,?,?);"
    );
    $addevent->bind_param('ssssssss', $user_id, $date, $title, $description, $start, $end,$recurrDays, $recurrWeeks);
    $addevent->execute();
    $addevent->close();
    $added = true;
    //$hashed_pass = password_hash((string)$password, PASSWORD_BCRYPT);
    //$conditional = password_verify((string)$password, (string)$pwd_hash);

    
if($added){ 
	//session_start();
	$_SESSION['username'] = $username;
	$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
	echo json_encode(array(
		"success" => true,
	));
	exit;
}else{
	echo json_encode(array(
		"success" => false,
		"message" => "Failed to add"
	));
	exit;
}

?>