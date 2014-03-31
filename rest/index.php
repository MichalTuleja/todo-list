<?php
include_once './api/Epi.php';
include_once './config/autoload.php';

spl_autoload_register('autoloadControllers');
spl_autoload_register('autoloadClasses');

// Epi::setSetting('exceptions', true);
Epi::setPath('base', './api');
Epi::setPath('view', '..');
Epi::init('route','session','database','template');

EpiSession::employ(EpiSession::PHP);
EpiDatabase::employ(EpiDatabase::MySql,'to_do_listist','host','pass','user');


//home method
getRoute()->get('/' , array('HomeController','display'));
getRoute()->get('/home' , array('HomeController','display'));

//list method
getRoute()->get('/list' , array('ListController' , 'get'));
getRoute()->put('/list/(\d+)' , array('ListController' , 'update'));
getRoute()->post('/list' , array('ListController' , 'insert'));
getRoute()->delete('/list/(\d+)' , array('ListController' , 'delete'));

//user method

getRoute()->run();

?>
