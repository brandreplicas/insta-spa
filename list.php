<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
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
        $imgs[$base.$name] = $mtime;
    }
    closedir($link);
}

arsort($imgs);
$imgs = array_keys($imgs);

file_put_contents('imgs.js','var imgs='.json_encode($imgs).';');
