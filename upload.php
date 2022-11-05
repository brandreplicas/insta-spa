<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('date.timezone', 'Asia/Kolkata');
ini_set('error_log', dirname(__FILE__).'/logs/debug-'.date('dmY').'.log');

$stock = isset($_FILES['stock'])?$_FILES['stock']:false;

$mime = false;
if(isset($stock['size']) && isset($stock['tmp_name']) && ($src = $stock['tmp_name']) && file_exists($src)){
  $mime = mime_content_type($src);
}

$type = false;
if($mime && ($parts = explode('/', $mime)) && 2 === count($parts)){
  $type = strtolower($parts[0]);
}

$allow = false;
if(in_array($type, array('image', 'video'))){
  $allow = true;
}

if(!$allow)
  exit('Upload rejected: '.$stock['name']);

$dest = dirname(__FILE__).'/stock/'.$stock['name'];
if(!move_uploaded_file($src, $dest)){
  exit('Upload failed: '. $stock['name']);
}

exit('Upload done: '. $stock['name']);
