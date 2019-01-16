<!doctype html>
<html lang = "en">
<!-- stories, comments, user info-->

<body>
	<?php
    session_start();
	require 'userdatabase.php';
	$user_id = $_SESSION['user_id'];
    $username = $_SESSION['username'];
	echo "hello ".$username."! This is yo data:";
    echo "<br>";
    $story_titles = $mysqli->prepare("select story_title, story_id from stories where author_id = ?");
    if(!$story_titles){
                    printf("Query Prep Failed: %s\n", $mysqli->error);
                    exit;
                }
    $story_titles->bind_param('s', $user_id);
    $story_titles->execute();
    $story_titles->bind_result($title, $story_id);
    while ($story_titles->fetch()) {
        echo $title;
        echo "<form action='view_story.php' method='post'><input type='submit' name='id[$story_id]' value='VIEW'></form>";
        echo "<form action = 'delete_story_userpage.php' method='post'><input type='submit' name='del[$story_id]'value='DELETE STORY'></form>";
        echo "<form action = 'edit_story.php' method='post'><input type='submit' name='edit[$story_id]'value='EDIT STORY'></form>";
    }
	







    echo "<br><form name='change_password' action=http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/password_change.html><input type='submit' value='Change Password'/></form>";



	?>
</body>
</html>
