<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
require_once '../../../control.php';
$school = mysql_fetch_object(mysql_query("SELECT `year` from colegio where usuario = 'administrador'"));
$year = $school->year;
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $barCode = $_GET['barcode'];
    if (!$barCode) {
        http_response_code(400);
        return;
    }

    $result = mysql_fetch_object(mysql_query("SELECT * FROM `year` WHERE cbarra = '$barCode' AND `year` = '$year' limit 1"));
    if($result){
        $student = [
            "id" => intval($result->mt),
            "name" => $result->nombre,
            "lastName" => utf8_encode($result->apellidos),
            "depositAmount" => floatval($result->cantidad),
            "profilePictureUrl" => $result->tipo ? "../../picture/{$result->tipo}.jpg" : null,
            "pinCode" => $result->codigopin,
            "hasDiscount" => strtolower($result->hde) === 'si',
            "grade" => $result->grado,
            "gradeNumber" => intval(substr($result->grado,0,2))
        ];
    }
    
    echo json_encode($student, JSON_UNESCAPED_UNICODE);


}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputs = json_decode(file_get_contents('php://input'));
    $pinCode = $inputs->pinCode;
    $mt = $inputs->id;
    if (!$pinCode === '' || !$mt === '') {
        http_response_code(400);
        echo json_encode(null, JSON_UNESCAPED_UNICODE);
        exit;
    }
    mysql_query("UPDATE `year` set `codigopin` = '$pinCode' WHERE mt='$mt'");

    $result = mysql_fetch_object(mysql_query("SELECT * FROM `year` WHERE mt='$mt' limit 1"));
    if($result){
        $student = [
            "id" => intval($result->mt),
            "name" => $result->nombre,
            "lastName" => utf8_encode($result->apellidos),
            "depositAmount" => floatval($result->cantidad),
            "profilePictureUrl" => $result->tipo ? "../../picture/{$result->tipo}.jpg" : null,
            "pinCode" => $result->codigopin,
            "hasDiscount" => strtolower($result->hde) === 'si',
            "grade" => $result->grado,
            "gradeNumber" => intval(substr($result->grado,0,2))
        ];
    }
    
    echo json_encode($student, JSON_UNESCAPED_UNICODE);


}