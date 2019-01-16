<html lang="en">
    <head>
         <meta charset="utf-8">
        <title>Login</title>
    </head>
    <body>
        <?php
            require 'userdatabase.php';
            
            $stmt = $mysqli->prepare(
                "SELECT COUNT(*), username, userid, passhash FROM userinfo WHERE username=?"
            );
            
            if(!$stmt){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            
            $stmt->bind_param('s', $username);
            $username = $_POST['username'];
            $stmt->execute();
            
            $stmt->bind_result($cnt, $user, $user_id, $pwd_hash);
            $stmt->fetch();
            
            $pwd_guess = $_POST['password'];
            
            
            if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
            // Login succeeded!
            echo "logged in";
            session_start();
            $_SESSION['user_id'] = $user_id;
            $_SESSION['loggedin'] = 1;
            $_SESSION['username']= $user;
            // Redirect to your target page
            header('Location: http://ec2-13-59-77-129.us-east-2.compute.amazonaws.com/~robertlandlord/module3/main_news_page.php');
            //session_destroy();
            }
            else if($cnt == 1){
                echo "Invalid Password";
            // Login failed; redirect back to the login screen
            }
            else {
                echo "User not found.";
            }
            $stmt->close();
        ?>
    </body>
    
</html>
