<?php

class ListController {

    public static function invoke(Sync $object,$data){

        if($object instanceof Sync){
            return $object->perform($data);
        }
    }
	
	public static function get() {
		
		$args = array();

                // TODO: unikać "SELECT * ...", potem nie dojdziemy do ładu z polami
                // SELECT task_id AD id, creation_time AS ctime, mtime AS mtime itd. FROM tasks
                // tak żeby nazwy zwracanych pól były niezależne od bazy
                /*
                 * Ogólnie zależy mi żeby dostać coś takiego:
                 * 
                 * {id: [id],
                    ctime: [ctime],
                    mtime: [mtime],
                    deleted: [deleted],
                    name: [name], 
                    done: [status]}
                 */
        return getDatabase()->all(
        							'SELECT 
        								task_id as id,
    									title as name,
    									description as description,
    									done as status,
    									deleted as deleted,
    									modification_date as mtime,
    									creation_date as ctime
									FROM 
										task'
									);
	}

    public function sync(){

        $out = array();
        $syncObject = new RestData();
        $syncObject->bindDataToMethod();

        if(!$syncObject->isEmpty()){

            $taskNum = count($syncObject->getResultArray());

            foreach($syncObject->getResultArray() as $data){

                $action = $data['action'];

                if($taskNum == 1){
                    $data['single'] = true;
                }

                $sync = new $action();
                $out[] = ListController::invoke($sync,$data);
            }
        }

        return $out;
    }
}

?>