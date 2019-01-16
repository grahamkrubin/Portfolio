<!DOCTYPE html>
<html lang="en">
<head>
	<title>Story Editting</title>
</head>
<body>
	<?php
	session_start();

	require 'userdatabase.php';
	foreach($_POST['edit'] as $key => $value);
	// $current_user = $SESSION['user_id'];
	// $story_id = $key;
	$_SESSION['story_id'] = $key;
	$story = $mysqli->prepare("SELECT story_content FROM stories WHERE story_id = ?");
	if(!$story){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $story->bind_param('s', $key);
    $story->execute();
    $story->bind_result($content);
    $story->fetch();
    echo "Current story:".$content;
    $story->close();
	?>
	<form action="edit_story.php" method="post" name='edit_story' id='edit_story'>
		<textarea name='editbox' id='editbox' form='edit_story' rows='4' columns='50'>Edit Story:</textarea>
		<input type="submit" name="editsubmit" value="Submit Story">
	</form>
	<h1>STORY EDITTED!</h1>
	<?php
            header('Location: http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php')
			?>
</body>
</html>