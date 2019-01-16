<!DOCTYPE html>
<html>
<head>
	<title>Change your password</title>
</head>
<body>

	<?php
	session_start();
	require 'userdatabase.php';
	$user_id = $_SESSION['user_id'];
	$new_pass_0 = password_hash($_POST['new_password_0'], PASSWORD_BCRYPT);
	$new_pass_1 = password_hash($_POST['new_password_1'], PASSWORD_BCRYPT);
	$database = $mysqli->prepare("SELECT COUNT(*), passhash FROM userinfo WHERE userid=?");
	if (!$database) {
		printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
	}
	$database->bind_param('s', $user_id);
	$database->execute();
	$database->bind_result($count, $passhash);
	$database->fetch();
	$temp_hash = $passhash;
	$temp_count = $count;
	$database->close();
	if (!($temp_count == 1 && password_verify($_POST['old_password'], $temp_hash))) {
		echo "Your old password does not match<br>";
	}
	
	



	
	else if (password_verify($_POST['new_password_0'],$new_pass_1) && password_verify($_POST['new_password_1'],$new_pass_0)) {
		echo "You changed your password successfully!<br>";
		$stmt = $mysqli->prepare("UPDATE userinfo SET passhash = ? WHERE userid = ?");
		if(!$stmt){
        	printf("Query Prep Failed: %s\n", $mysqli->error);
        	exit;
    	}
    	$stmt->bind_param('ss', $new_pass_0, $user_id);
		$stmt->execute();
		$stmt->close();
	}
	else if (!(password_verify($_POST['new_password_0'],$new_pass_1) && password_verify($_POST['new_password_1'],$new_pass_0))) {
		echo "The new password instances do not match.<br>";
	}
	echo "<form name='back_to_user_page' action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/user_page.php'><input type='submit' value='Back to User Page.'";
	?>

</body>
</html>