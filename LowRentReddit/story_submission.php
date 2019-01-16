<?php
    require 'userdatabase.php';
    session_start();
    $story = $_POST['storybox'];
    $title = $_POST['story_title'];
    $link = $_POST['link'];
    $user_id = $_SESSION['user_id'];
    
    
    
    
    $upload = $mysqli->prepare("insert into stories (story_title, story_link, story_content, author_id) values(?, ?, ?, ?)");
    if (!$upload) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $upload->bind_param('ssss', $title, $link, $story, $user_id);
    $upload->execute();
    $upload->close();
    echo "<form action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php'>
                <input type='submit' value='Go Home!'>
            </form>";
    
?>
