<?php
session_start();
$uid = $_SESSION["uid"];
$color = $_SESSION["color"];

$data = json_decode(file_get_contents("php://input"));
$status = $data->status;
$pawns = $data->pawns;

$positions = array(
    "red"=>array(100, 101, 102, 103, 
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        144, 145, 146, 147), 
    "blue"=>array( 200, 201, 202, 203, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        244, 245, 246, 247), 
    "green"=>array(300, 301, 302, 303, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        344, 345, 346, 347), 
    "yellow"=>array(400, 401, 402, 403, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        444, 445, 446, 447)
    );

include "secret.php";
$connect = mysqli_connect($host,$user,$password,$dbname);
$result = mysqli_query($connect, "SELECT data FROM gry WHERE id_gry='$uid'");
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
$players = (array)json_decode($rows[0]["data"]);
$keys = array_keys($players);
$players[$color]->status = $status;
if($status != 3)
    $players[$color]->last_act = time();

if($pawns == array(0, 1, 2, 3) && $status == 2){
    foreach($keys as $key){
        if($players[$key]->pawns == array("n", "n", "n", "n")){
            $players[$key]->pawns = array(0, 1, 2, 3);
            $players[$key]->status = 2;
        }
    }
}
elseif($pawns != array("n", "n", "n", "n"))
    $players[$color]->pawns = $pawns;

$next_player = TRUE;
foreach($keys as $key){
    if($players[$key]->status != 2){
        if($players[$key]->status == 3)
            $_SESSION["current_player"] = $key;
        $next_player = FALSE;
    }
}
if($next_player){
    $new_color = "red";
    if(isset($_SESSION["current_player"])){
        $pawn_color = $_SESSION["current_player"];
        for($i = 0; $i < 4; $i++){
            $pawn_pos = $players[$pawn_color]->pawns[$i];
            if($pawn_pos >= 4 && $pawn_pos < 44){
                foreach($keys as $key){
                    if($key != $pawn_color){
                        for($j = 0; $j < 4; $j++){
                            $try_pawn = $players[$key]->pawns[$j];
                            if($positions[$pawn_color][$pawn_pos] == $positions[$key][$try_pawn]){
                                $l = 0;
                                while(in_array($l, $players[$key]->pawns))
                                    $l++;
                                $players[$key]->pawns[$j] = $l;
                            }
                        }
                    }
                }
            }
        }

        $new_color = next_color($_SESSION["current_player"]);
    }
    while(!in_array($new_color, $keys))
        $new_color = next_color($new_color);
    $_SESSION["current_player"] = $new_color;
    $players[$new_color]->status = 3;
}
if($status >= 2){
    foreach($keys as $key){
        $sum = 0;
        for($i = 0; $i < 4; $i++){
            $sum += $players[$key]->pawns[$i];
        }
        if($sum == 182)
            $players[$key]->status = "A";
        if($players[$key]->status == "A"){
            unset($_SESSION["uid"]);
            unset($_SESSION["current_player"]);
        //     session_destroy();
        }
    }
}
$players_str = json_encode($players);
mysqli_query($connect, "UPDATE gry SET data='$players_str' WHERE id_gry='$uid'");

echo $players_str;

function next_color($clr){
    switch($clr){
        case "red":
            return "blue";
            break;
        case "blue":
            return "green";
            break;
        case "green":
            return "yellow";
            break;
        case "yellow":
            return "red";
            break;
    }
}