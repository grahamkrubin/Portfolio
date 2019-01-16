<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<title>Story Editing</title>
		</head>
		<body>
            
			<?php
			session_start();
            require 'userdatabase.php';
			$current_user = $_SESSION['user_id'];
            $story_id = $_SESSION['story_id'];
            $stmt = $mysqli->prepare("SELECT story_content FROM stories WHERE story_id = ?");
                if(!$stmt){
                    printf("Query Prep Failed: %s\n", $mysqli->error);
                    exit;
                }
                $stmt->bind_param('s', $story_id);
                $stmt->execute();
                $stmt->bind_result($content);
                $stmt->fetch();
            echo "Current Story:".$content;
            ?>
            <form action = "true_edit_story.php" method='post' name='edit_story' id='edit_story'>
                <textarea name='editbox' id='editbox' form='edit_story' rows='4'columns='50'>
                    Edit Story:
                </textarea>
                <input type="submit" name="editsubmit" value="Submit story">
            </form>
		</body>
	</html>


