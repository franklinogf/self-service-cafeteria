<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
date_default_timezone_set("America/Puerto_Rico");
require_once '../../../control.php';
$school = mysql_fetch_object(mysql_query("SELECT `year` from colegio where usuario = 'administrador'"));
$year = $school->year;

$date = date('Y-m-d');
$time = date('H:i:s');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputs = json_decode(file_get_contents('php://input'));

    $totalToPay = (float) $inputs->total;
    $studentID = $inputs->studentID;
    $itemsToOrder = $inputs->items;
    if (!$totalToPay || !$studentID || count($itemsToOrder) < 1) {
        http_response_code(400);
        return;
    } 
    // Look for student info
    $student = mysql_fetch_object(mysql_query("SELECT 
        `id`,`ss`,`nombre`,`apellidos`,`grado`,`avisar`,`cantidad` 
        FROM `year`         
        WHERE `mt`= '$studentID' 
        LIMIT 1"
    ));
    $depositAmount = (float) $student->cantidad;

    // Check if charge 1 credit is needed
    $hasCreditCharge = $totalToPay > $depositAmount;
    // If the it has to be 1 credit charge add 1 dollar to the total amount
    $total = $hasCreditCharge ? $totalToPay + 1 : $totalToPay;
    
    $newDepositAmount = (float) ($depositAmount - $total);
    
    // Update the deposit amount of the student
    mysql_query("UPDATE `year` SET `cantidad` = '$newDepositAmount' WHERE `mt`= '$studentID'");

    // Insert the order to the cafeteria table
    mysql_query("INSERT INTO `compra_cafeteria`
        (`id2`,`nombre`, `apellido`, `ss`, `grado`, `fecha`, `tdp`, `total`, `year`,`pago1`,`pago2`,`tdp2`,`cn`,`hora`)
        VALUES 
        ('$student->id','$student->nombre','$student->apellidos','$student->ss','$student->grado','$date','5',
        '$total','$year','$total','0.00','5','2','$time')"
        );

    $orderID = mysql_insert_id();
    // Apply 1 dollar credit if the total to pay is greater than the deposit amount
    if($hasCreditCharge){
        mysql_query("INSERT INTO `compra_cafeteria_detalle`
         (`id_compra`,`descripcion`,`precio`,`ss`,`year`,`cn`) 
         VALUES ('$orderID','Un dolar por credito','1.00','$student->ss','$year','2')"
         );
    }

    foreach ($itemsToOrder as $item) {		
		mysql_query("INSERT INTO `compra_cafeteria_detalle`
         (`id_compra`,`descripcion`,`precio`,`id_boton`,`ss`,`year`,`cn`)
          VALUES ('$orderID','$item->label','$item->price','$item->id','$student->ss','$year','2')"
          );
	}


	
    // Insert the order to the order history
    mysql_query("INSERT INTO `cafeteria_orders`
    (`ss`,`id_compra`,`year`) 
    VALUES ('$student->ss','$orderID','$year')"
    );

}