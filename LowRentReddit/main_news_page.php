<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Home</title>
        <!-- -->
    </head>
    <body>
        <?php
        session_start();
        if(!isset($_SESSION['loggedin'])||$_SESSION['loggedin']==0){
            echo "<form action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/login_main.html'><input type='submit' value='Log in'></form>";
            }
        else{
            echo "<br><form name='user_page' action =http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/user_page.php><input type='submit' value='User Page'/></form>";
            echo "<br><form name='new_user_form' action='http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/story_submission.html'><input type='submit' value='Submit a story'/></form>";
            echo "<form name='logout' action='logout.php'><input type='submit' value='Logout'/></form>";
        }
        
        require 'userdatabase.php';
        echo "<br>"; 
        $story = $mysqli->prepare("select story_title, story_link, story_content, author_id, date_sub, story_id from stories");
        $story->execute();
        $story->bind_result($title, $link, $content, $author_id, $time_written, $story_id);
        
        while($story->fetch()) {
            //printf("\t<p>%s\n%s\n%s\n%s</p>\n",
            //htmlspecialchars($title),
            //htmlspecialchars($time_written),
            //htmlspecialchars($link),
            //htmlspecialchars($author_id)
           // echo "<a href='url'>htmlspecialchars($title)</a>";  //need to know which one was pressed, and send correct story_id
            echo $title . "<form action='view_story.php' method='post'> <input type='submit' name='id[$story_id]' value='$title'> </form>";
            //echo $title;
            echo "<br>";
            //);
            //echo "\n".$content;
        }
        $story->close();
        
        
        ?>
       </body> 
        
</html>
    
