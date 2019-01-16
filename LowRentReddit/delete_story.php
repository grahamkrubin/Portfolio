<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<title>Comment Deleting</title>
		</head>
		<body>
			<?php
			session_start();
			$current_user = $_SESSION['user_id'];
            $story_id = $_SESSION['story_id'];
			require 'userdatabase.php';
			
			//foreach($_POST['del'] as $key => $value);
			$story1 = $mysqli->prepare("DELETE from comments where story_id =?");
                    if(!$story1){
                        printf("Query Prep Failed: %s\n", $mysqli->error);
                        exit;
                    }
                    $story1->bind_param('s', $story_id);
					$story1->execute();
                    
			$story = $mysqli->prepare("DELETE from stories where story_id =?");
                    if(!$story){
                        printf("Query Prep Failed: %s\n", $mysqli->error);
                        exit;
                    }
                    $story->bind_param('s', $story_id);
					$story->execute();
                    
                    
            $story->close();
			?>
			<h1>STORY DELETED!</h1>
            <?php
            header('Location: http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php')
			?>
		</body>
	</html>


