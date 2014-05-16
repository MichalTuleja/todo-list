<?php
/**
 * Created by PhpStorm.
 * User: jwalczak
 * Date: 14.05.14
 * Time: 18:46
 */

class Delete extends Sync {

    public function perform($data){

        $out = array();
        $taskId = (int)$data['id'];
        $database = getDatabase()->one('SELECT task_id as id, modification_date as mtime,creation_date as ctime FROM task WHERE task_id = :id',array(':id' => $taskId));

        if((int)$database['id'] == $taskId) {

            $dbTime = (strtotime($database['mtime']) >= strtotime($database['ctime'])) ? $database['mtime'] : $database['ctime'];
            $userTime = (strtotime($data['mtime']) >= strtotime($data['ctime'])) ? $data['mtime'] : $data['ctime'];
            $difference = ($userTime > $dbTime) ? 1 : 0;

            if((int)$difference == 1) {
                $delete = getDatabase()->execute('UPDATE task SET deleted = :deleted ,modification_date = :mTime WHERE task_id = :id',array(':id' => $taskId,':deleted' => 1,':mTime' => $data['mtime']));
            }
            else{
                $delete = 0;
            }

            if((int)$delete < 1) {

                if(!empty($data['single'])){
                    return http_response_code(500);
                }
                else{
                    $out['error'] = 'database_error';
                    $out['data'] = $data;
                }
            }
            else{
                $out['data'] = $data;
            }
        }
        else{
            $out['error'] = 'bad_id';
            $out['data'] = $data;
        }

        return $out;
    }
} 