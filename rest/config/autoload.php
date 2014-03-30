<?php
	
	set_include_path($_SERVER['DOCUMENT_ROOT']);
	function autoloadClasses($class) {
	    
	    $file = get_include_path() . '/rest/classes/' . strtolower($class) . '.php';
	    if(file_exists($file)){
	        include $file;
	    }
	}

	function autoloadControllers($class) {
	    
		if(strpos($class,'Controller') !== false){
			$class = substr($class,0,strpos($class,'Controller'));
		}
		
	    $file = get_include_path() . '/rest/controllers/' . strtolower($class) . '.class.php';
	    if(file_exists($file)){
	        include $file;
	    }
	}
?>