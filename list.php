<?php
error_reporting(E_ALL);
ini_set('log_errors',1);
ini_set('display_errors',0);
date_default_timezone_set('Asia/Kolkata');
ini_set('error_log',dirname(__FILE__).'/logs/trace_'.date('D_d_M_Y').'.txt');

header('Cache-Control: max-age=0, no-cache, no-store, must-revalidat');
header('Pragma: no-cache');
header('Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time()));
header('Content-Type: text/javascript');

clearstatcache();
$span = (time() - 2592000); //minus 30 days = (30 * 24 * 60 * 60)
$base = 'stock/';
$imgs = array();
$dirp = dirname(__FILE__).'/';
$link = opendir($dirp.$base);
if($link){
    while($link && ($name = readdir($link))){
        $path = $dirp.$base.$name;
        if(!is_file($path) || !is_readable($path)|| is_link($path)){
           continue;
        }
        $mtime = filemtime($path);
        if($mtime < $span){
            unlink($path);
            error_log('mtime: '. $mtime.', span: '.$span.', path: '.$path);
            continue;
        }
        $imgs[$base.$name] = $mtime;
    }
    closedir($link);
}

arsort($imgs);
$imgs = array_keys($imgs);

echo 'var imgs=', json_encode($imgs), ';';