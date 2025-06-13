<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
require_once '../../../control.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $school = mysql_fetch_object(mysql_query("SELECT `adminpin` from colegio where usuario = 'administrador'"));

    $data = ["pinCode" => $school->adminpin];
    echo json_encode($data, JSON_UNESCAPED_UNICODE);


}