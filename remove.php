<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('date.timezone', 'Asia/Kolkata');
ini_set('error_log', dirname(__FILE__).'/logs/debug-'.date('dmY').'.log');

$stock = isset($_POST['stock'])?$_POST['stock']:false;
$dest = dirname(__FILE__).'/'.$stock;
error_log(var_export(compact('stock','dest'),1));
if(file_exists($dest) && unlink($dest)){
  exit('Stock deleted: '. $stock);
}
exit('Unable to delete: '. $stock);
