<?php
include_once './api/Epi.php';
include_once './config/autoload.php';

spl_autoload_register('autoloadControllers');
spl_autoload_register('autoloadClasses');

// Epi::setSetting('exceptions', true);
Epi::setPath('base', './api');
Epi::setPath('view', '../public_html/docs/');
Epi::init('route','session','database','template','api');

EpiSession::employ(EpiSession::PHP);
EpiDatabase::employ(EpiDatabase::MySql,'to_do_listist','host','pass','user');


//home method
getRoute()->get('/' , array('HomeController','display'));
getRoute()->get('/home' , array('HomeController','display'));

//list method
getRoute()->get('/list' , array('ListController' , 'get'), EpiApi::external);
getRoute()->put('/list/(\d+)' , array('ListController' , 'update'), EpiApi::external);
getRoute()->post('/list' , array('ListController' , 'insert'), EpiApi::external);
getRoute()->delete('/list/(\d+)' , array('ListController' , 'delete'), EpiApi::external);

//user method

getRoute()->run();

?>
