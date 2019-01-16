<?php
// login_ajax.php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
//$json_str = file_get_contents('php://input');
//This will store the data into an associative array
//$json_obj = json_decode($json_str, true);
session_start();
//Variables can be accessed as such:
$username = $_SESSION['username'];
$user_id = $_SESSION['userid'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
//debug_to_console($username);
// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
    require 'user_database.php';
    $eventsArr = array();
	$stmt = $mysqli->prepare(
                "SELECT title, date, description, start, end, recurring_days, recurring_weeks FROM events WHERE user_id=?"
            );

            
	$stmt->bind_param('s', $user_id);
	//$username = (string)$_POST['username'];
	$stmt->execute();
	
	$stmt->bind_result($title, $date, $desc, $start, $end, $recurrDays, $recurrWeeks);
	while($stmt->fetch()){
        if($recurrDays == NULL){
            $recurrDays = "";
        }
        if($recurrWeeks == NULL){
            $recurrWeeks = "";
        }
        $temparr = [$title, $date, $desc, $start, $end, $recurrDays, $recurrWeeks];
        array_push($eventsArr, $temparr);
        }
    
    //$hashed_pass = password_hash((string)$password, PASSWORD_BCRYPT);
    //$conditional = password_verify((string)$password, (string)$pwd_hash);

if(count($eventsArr)>0){ 
	echo json_encode(array(
        "success" => true,
		"dataset"=>$eventsArr,
        "userid"=>$user_id
	));
	exit;
}else{
	echo json_encode(array(
        "success" => false,
        "message" => "No events found"
	));
	exit;
}

?>