<?php
session_start();
$json = file_get_contents("php://input");
$data = json_decode($json);
$nick = $data->nick;

$connect = mysqli_connect($host,$user,$password,$dbname);
$result = mysqli_query($connect, "SELECT id_gry, data FROM gry ORDER BY id DESC LIMIT 1");
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

$colors = array("red", "blue", "green", "yellow");
$color = "";
$uid = "";
$current_time = time();

if(empty($rows)){
    $color = $colors[rand(0, 3)];
    $uid = uniqid();
    $new_players = array($color=>array("nick"=>$nick, "insert_time"=>$current_time, "last_act"=>$current_time, "status"=>0, "pawns"=>array("n", "n", "n", "n")));
    $new_players_str = json_encode($new_players);
    $q = "INSERT INTO gry (id_gry, data) VALUES('$uid', '$new_players_str')";
    $r = mysqli_query($connect, $q);
}
else{
    $players = (array)json_decode($rows[0]["data"]);
    $game_started = FALSE;
    foreach($players as $playerData){
        if($playerData->status >= 2)
            $game_started = TRUE;
    }
    if(count($players) == 4 || $game_started){
        $color = $colors[rand(0, 3)];
        $uid = uniqid();
        $new_players = array($color=>array("nick"=>$nick, "insert_time"=>$current_time, "last_act"=>$current_time, "status"=>0, "pawns"=>array("n", "n", "n", "n")));
        $new_players_str = json_encode($new_players);
        $q = "INSERT INTO gry (id_gry, data) VALUES('$uid', '$new_players_str')";
        $r = mysqli_query($connect, $q);
    }
    else{
        $available_colors = array();
        foreach($colors as $available_color){
            if(!in_array($available_color, array_keys($players)))
                array_push($available_colors, $available_color);
        }
        $color = $available_colors[rand(0, count($available_colors)-1)];
        $uid = $rows[0]["id_gry"];
        $players[$color] = array("nick"=>$nick, "insert_time"=>$current_time, "last_act"=>$current_time, "status"=>0, "pawns"=>array("n", "n", "n", "n"));
        $players_str = json_encode($players);
        $q = "UPDATE gry SET data='$players_str' WHERE id_gry='$uid'";
        $r = mysqli_query($connect, $q);
    }
}
$_SESSION["uid"] = $uid;
$_SESSION["color"] = $color;
$_SESSION["nick"] = $nick;

$arr = array("color"=>$color);
echo json_encode($arr);