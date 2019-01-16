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
			require 'userdatabase.php';
			
			foreach($_POST['del'] as $key => $value);
			
			$story = $mysqli->prepare("DELETE from comments where comment_id =?");
                    $story->bind_param('s', $key);
					$story->execute();
            $story->close();
			?>
			<h1>COMMENT DELETED!</h1>
            <?php
            header('Location: http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php')
			?>
		</body>
	</html>


