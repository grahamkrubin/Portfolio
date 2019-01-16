<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<title>Comment Editing</title>
		</head>
		<body>
            
			<?php
			session_start();
            require 'userdatabase.php';
			$current_user = $_SESSION['user_id'];
            foreach($_POST['edit'] as $key => $value);
            $stmt = $mysqli->prepare("SELECT content FROM comments WHERE comment_id = ?");
                if(!$stmt){
                    printf("Query Prep Failed: %s\n", $mysqli->error);
                    exit;
                }
                $stmt->bind_param('s', $key);
                $stmt->execute();
                $stmt->bind_result($content);
                $stmt->fetch();
            echo "Current Comment:".$content;
            $_SESSION['comment_key'] = $key;
            ?>
            <form action = "true_edit.php" method='post' name='edit_comment' id='edit_comment'>
                <textarea name='editbox' id='editbox' form='edit_comment' rows='4'columns='50'>
                    Edit Comment:
                </textarea>
                <input type="submit" name="editsubmit" value="Submit comment">
            </form>
		</body>
	</html>


