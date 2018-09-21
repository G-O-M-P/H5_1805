<?php
    //文件路径
    $path = './data/goodslist.json';

    // 打开文件
    $file = fopen($path,'r');

    // 读取内容
    $content = fread($file, filesize($path));
    // 转成数组
    $arr = json_decode($content,true);
    echo $content;

?>