<?php

class ListController{
	
	public static function get(){
		
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
		foreach(getDatabase()->all('SELECT * FROM task') as $task){

			$args['list'][] = array(
									'id' => $task['task_id'],
									'name' => $task['description'],
									'status' => $task['done']
									);
		}

		if(!empty($args)){
			$args['error'] = false;
		}
		else{
			$args['error'] = true;
		}

                // Nie uzywamy template'ow, dlatego zwracamy zwykły obiekt,
                // który jest konwertowany na JSON w locie przez bibliotekę Epiphany
		return $args;
	}

	public static function update($id){

		$args = array();
		$id = (int)$id;
		parse_str(file_get_contents("php://input"),$_PUT);
		$description = ($_PUT['description'] != '') ? $_PUT['description'] : '';
		$status = (isset($_PUT['status']) && (int)$_PUT['status'] > 0) ? 1 : 0;
		$args['error'] = true;

		if($id > 0 && $description != ''){
			
			$task = getDatabase()->one('SELECT * FROM task WHERE task_id=:id',array(':id' => $id));

			if((int)$task['task_id'] == $id){

				$update = getDatabase()->execute('UPDATE task SET description = :description, done = :status WHERE task_id = :id',array(':description' => $description,':status' => $status,':id' => $id));
				
				//if in database is identical value for 'description' column ,our method return error = true
				if((int)$update > 0){
					$args['error'] = false;
				}
			}
		}

		return $args;
	}

	public static function insert(){

		$args = array();
		$description = ($_POST['description'] != '') ? trim($_POST['description']) : '';

		$args['error'] = true;

		if($description != ''){
			$insert = getDatabase()->execute('INSERT INTO task (description,done) VALUES(:description,:done)',array(':description' => $description,':done' => 0));

			if((int)$insert > 0){
				$args['error'] = false;
			}
                        else {
                            // TODO: potrzebny jest id zadania które dodajemy do bazy
                            $args['id'] = 0; // skąd wyczarować id? będzie potrzebne do zwrócenia JSONem
                        }
		}

		return $args;	
	}

	public static function delete($id){

		$args = array();
		$id = (int)$id;
		$args['error'] = true;

		if($id > 0){

			$isId = getDatabase()->one('SELECT t.task_id FROM task t INNER JOIN task_to_user ttu ON t.task_id = ttu.task_id WHERE t.task_id = :id',array(':id' => $id));

			if((int)$isId == $id){
                                // TODO: Request delete powinien zrobić update flagi delete w tabeli
                                // Samo delete mogłoby być w klasie do obsługi bazy, przyda się pozniej
                                // do API administratora
				$deleteTaksToUser = getDatabase()->execute('DELETE FROM task_to_user WHERE task_id = :id',array(':id' => $id));
				$deleteTask = getDatabase()->execute('DELETE FROM task WHERE task_id = :id',array(':id' => $id));

				if((int)$deleteTask > 0 && (int)$deleteTaksToUser > 0){
					$args['error'] = false;
				}
			}
		}

		return $args;
	}
}

?>