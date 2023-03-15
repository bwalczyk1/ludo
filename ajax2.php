<?php
session_start();
$data = array("color"=>FALSE, "nick"=>FALSE, "status"=>FALSE);
if(isset($_SESSION["uid"])){
    if($_SESSION["uid"] != ""){
        include "secret.php";
        $connect = mysqli_connect($host,$user,$password,$dbname);
        $result = mysqli_query($connect, "SELECT id_gry, data FROM gry");
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
        foreach ($rows as $row){
            if($_SESSION["uid"] == $row["id_gry"]){
                $data["color"] = $_SESSION["color"];
                $data["nick"] = $_SESSION["nick"];
                $json_arr = (array)json_decode($row["data"]);
                $pl = (array)$json_arr[$_SESSION["color"]];
                $data["status"] = $pl["status"];
            }
        }
    }
}
echo json_encode($data);