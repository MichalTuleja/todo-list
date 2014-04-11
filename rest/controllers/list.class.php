<?php

class ListController {
	
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

	public static function update($id) {

		$args = array();
		$id = (int)$id;
		parse_str(file_get_contents("php://input"),$_POST);
		$_POST = array_map('strip_tags',$_POST);
		
		$tDesc = (!empty($_POST['description'])) ? $_POST['description'] : '';
		$tName = (!empty($_POST['name'])) ? trim($_POST['name']) : '';
		$tStatus = (isset($_POST['status']) && (int)$_POST['status'] > 0) ? 1 : 0;
		$args['error'] = true;

		if($id > 0) {
			
			$tId = (int)getDatabase()->one('SELECT task_id as id FROM task WHERE task_id=:id',array(':id' => $id))['id'];

			if($tId == $id) {

				$date = new DateTime();
				$tMtime = $date->format('Y-m-d H:j:s');
				$update = getDatabase()->execute('UPDATE task SET title = :name, description = :description, done = :status, modification_date = :mtime WHERE task_id = :id',array(':name' => $tName,':description' => $tDesc,':status' => $tStatus,':mtime' => $tMtime,':id' => $tId));
				
				//if in database is identical value for 'description' column ,our method return error = true
				if((int)$update > 0) {
					$args['error'] = false;
				}
			}
		}

		return $args;
	}

	public static function insert() {

		$args = array();

		parse_str(file_get_contents("php://input"),$_PUT);
		$_PUT = array_map('strip_tags',$_PUT);
		$tDesc = (!empty($_PUT['description'])) ? trim($_PUT['description']) : '';
		$tName = (!empty($_PUT['name'])) ? trim($_PUT['name']) : '';

		$args['error'] = true;
                
                error_log(implode(',',$_PUT));
                error_log(file_get_contents("php://input"));
                error_log($tDesc);
                error_log($tName);
                
		if($tDesc != '' && $tName != '') {

			$data = new DateTime();
			$tMtime = $data->format('Y-m-d H:j:s');
			$insert = getDatabase()->execute('INSERT INTO task (title,description,done,deleted,modification_date) VALUES(:title,:description,:done,:deleted,:mtime)',array(':title' => $tName,':description' => $tDesc,':done' => 0,':deleted' => 0,':mtime' => $tMtime));

			if((int)$insert > 0) {
				$args['error'] = false;
				$args['id'] = $insert;
			}
                        
                        
		}

		return $args;	
	}

	public static function delete($id) {

		$args = array();
		$id = (int)$id;
		$args['error'] = true;

		if($id > 0) {

			$isId = getDatabase()->one('SELECT task_id as id FROM task WHERE task_id = :id',array(':id' => $id));
			
			if((int)$isId['id'] == $id) {
                                
				$delete = getDatabase()->execute('UPDATE task SET deleted = :deleted WHERE task_id = :id',array(':id' => $id,':deleted' => 1));

				if((int)$delete > 0) {
					$args['error'] = false;
				}
			}
		}

		return $args;
	}
}

?>