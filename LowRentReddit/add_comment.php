<?php
    require 'userdatabase.php';
    session_start();
    if(isset($_SESSION['loggedin'])&&$_SESSION['loggedin']==1){
        $content = $_POST['commentbox'];
        $user_id = $_SESSION['user_id'];
        $story_id=$_SESSION['story_id'];
        
        
        $upload = $mysqli->prepare("insert into comments (content, story_id, user_id) values(?, ?, ?)");
        if (!$upload) {
            echo "story upload failed!";
        }
        $upload->bind_param('sss', $content, $story_id, $user_id);
        $upload->execute();
        $upload->close();
        echo "<form action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php'><input type='submit' value='Go Home!'></form>";
    }
    else{
        echo "You must log in to post a comment!";
        echo "<form action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/login_main.html'><input type='submit' value='Log in here!'></form>";
    }
    
    
?>
