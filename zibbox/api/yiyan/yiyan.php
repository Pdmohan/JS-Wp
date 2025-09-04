<?php
//获取一言文件的绝对路径
$path = dirname(__FILE__);//获取文件当前路径
$file = file($path."/yiyan.txt");
$file_yl = file($path."/jdyulu.txt");

//随机读取一行
$arr  = mt_rand( 0, count( $file ) - 1 );
$content  = trim($file[$arr]);
$arr_yl  = mt_rand( 0, count( $file_yl ) - 1 );
$content_yl  = trim($file_yl[$arr_yl]);

//编码判断，用于输出相应的响应头部编码
if (isset($_GET['charset']) && !empty($_GET['charset'])) {
    $charset = $_GET['charset'];
if (strcasecmp($charset,"gbk") == 0 ) {
    $content = mb_convert_encoding($content,'gbk', 'utf-8');
}} else {
    $charset = 'utf-8';
}

//格式化判断，输出数据
if($_GET['code'] === 'yiyan'){
    header('Content-type:text/json');
    $content = array('code'=>0,'text'=>$content);
    echo json_encode($content, JSON_UNESCAPED_UNICODE);
}elseif($_GET['code'] === 'kuakua'){
    header('Content-type:text/json');
    $content = array('code'=>0,'text'=>$content_yl);
    echo json_encode($content, JSON_UNESCAPED_UNICODE);
}elseif($_GET['code'] === 'suiji'){
    header('Content-type:text/json');
    echo $content_yl;
}else {
    header('Content-type:text/json');
    $content = array('code'=>-1,'text'=>'接口错误无法获取数据！');
    echo json_encode($content, JSON_UNESCAPED_UNICODE);
}
?>