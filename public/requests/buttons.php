<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
require_once '../../../control.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $result = mysql_query("SELECT * FROM T_cafeteria ORDER BY orden");
  $foods = [];
  while ($row = mysql_fetch_object($result)) {
    $foods[] = [
      "id" => $row->id,
      "imageUrl" => isset($row->foto) ? "../../../cafeteria_im/$row->foto" : "../../../cafeteria_im/no-image.png",
      "label" => $row->articulo,
      "price" => (float) $row->precio,
    ];
  }
  echo json_encode($foods, JSON_UNESCAPED_UNICODE);
}
