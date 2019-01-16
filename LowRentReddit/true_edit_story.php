<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<title>Story Editing</title>
		</head>
		<body>
        <?php
            session_start();
            $story_id = $_SESSION['story_id'];
            require 'userdatabase.php';
			$editedcomment = $_POST['editbox'];
			$story = $mysqli->prepare("UPDATE stories SET story_content = ? WHERE story_id = ?");
                    if(!$story){
                        printf("Query Prep Failed: %s\n", $mysqli->error);
                        exit;
                    }
					$story->bind_param('ss',$editedcomment, $story_id);
					$story->execute();
            $story->close();
        ?>
        <h1>STORY EDITED!</h1>
            <form action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php'>
                <input type='submit' value='Go Home!'>
            </form>
        </body>
	</html>