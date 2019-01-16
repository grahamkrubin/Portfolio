<?php

    $mysqli = new mysqli('localhost', 'root', '89chinesetakeout', 'module5_cal');
        
        if($mysqli->connect_errno) {
            printf("Connection Failed: %s\n", $mysqli->connect_error);
            exit;
        }
?>