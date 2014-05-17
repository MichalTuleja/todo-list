<?php
include_once './api/Epi.php';
include_once './config/autoload.php';

$config = parse_ini_file('../config/local.ini');

$host = $config['db_host'];
$port = $config['db_port']; // unused, Epiphany does not support port
$database = $config['db_dbname'];
$user = $config['db_username'];
$pass = $config['db_password'];

spl_autoload_register('autoloadControllers');
spl_autoload_register('autoloadClasses');

// Epi::setSetting('exceptions', true);
Epi::setPath('base', './api');
Epi::setPath('view', '../public_html/docs/');
Epi::init('route','session','database','template','api','debug');

EpiSession::employ(EpiSession::PHP);
EpiDatabase::employ(EpiDatabase::MySql, $database, $host, $user, $pass);

//home method
getRoute()->get('/' , array('HomeController','display'));
getRoute()->get('/home' , array('HomeController','display'));

//list method
getRoute()->get('/list' , array('ListController' , 'get'), EpiApi::external);
getRoute()->post('/list' , array('ListController' , 'sync'), EpiApi::external);
getRoute()->post('/sync' , array('ListController' , 'sync'), EpiApi::external);

//user method
getRoute()->run();

?>
