<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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
    $student = [
        "id" => (int) $result->mt,
        "name" => $result->nombre,
        "lastName" => utf8_encode($result->apellidos),
        "depositAmount" => (float) $result->cantidad,
        "profilePictureUrl" => $result->tipo ? "../../picture/{$result->tipo}.jpg" : null,
        "pinCode" => $result->codigopin,
        "hasDiscount" => strtolower($result->hde) === 'si'
    ];
    echo json_encode($student, JSON_UNESCAPED_UNICODE);


}