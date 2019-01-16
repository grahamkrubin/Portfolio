<?php
    require 'userdatabase.php';
    
    $username = $_POST['newuser'];
    $unhashed = $_POST['password'];
    $fullhash = password_hash($unhashed, PASSWORD_BCRYPT);
    $passarray = explode("$", $fullhash);
    $length = $passarray[2];
    $passhash = $passarray[3];
    
    $stmt = $mysqli->prepare(
        "insert into user_info (username, passhash, length) values (?, ?, ?)"
    );
   
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    
    $stmt->bind_param('sss', $username, $fullhash, $length);

    $stmt->execute();

    $stmt->close();
?>