<?php
/**
 * Created by PhpStorm.
 * User: jwalczak
 * Date: 14.05.14
 * Time: 18:45
 */

class Update extends Sync {
    /**
     * @param array $merge
     */
    public function setMerge($merge)
    {
        $this->merge = $merge;
    }

    /**
     * @return array
     */
    public function getMerge()
    {
        return $this->merge;
    }

    private $merge = array();

    public function perform($data){

        $out = array();

        $data = array_map('strip_tags',$data);
        $emptyFields = array_map(function($field){if($field != '') return 1; return 0;},$data);
        
        //$notImportant = ;;

        if(false){ //!in_array(0,$emptyFields)

            $tId = (int)$data['id'];

            $database = getDatabase()->one('SELECT
                                            task_id as id,
                                            title as name,
                                            description as description,
                                            done as status,
                                            deleted as deleted,
                                            modification_date as mtime,
                                            creation_date as ctime
                                         FROM
                                            task
                                         WHERE
                                            task_id=:id',array(':id' => $tId));

            if((int)$database['id'] == (int)$data['id']) {

//                    1 - data modyfikacji jest nowsza niz data w bazie
//                    0 - data modyfikacji jest starsza niz data w bazie
                $dbTime = (strtotime($database['mtime']) >= strtotime($database['ctime'])) ? $database['mtime'] : $database['ctime'];
                $userTime = (strtotime($data['mtime']) >= strtotime($data['ctime'])) ? $data['mtime'] : $data['ctime'];
                $difference = ($userTime > $dbTime) ? 1 : 0;

                if((int)$difference == 1){
                    $update = getDatabase()->execute('UPDATE task SET title = :name, description = :description, done = :status, modification_date = :mtime, creation_date = :ctime WHERE task_id = :id',array(':name' => $data['name'],':description' => $data['description'],':status' => $data['status'],':mtime' => $data['mtime'], ':ctime' => $data['ctime'] , ':id' => $data['id']));
                }
                else{
                    $update = $this->merge($data,$database);
                }

                if((int)$update > 0) {

                    $out = ($merge = $this->getMerge()) ? $this->getMerge() : $data;
                }
                else{
                    if(!empty($data['single'])){
                        return http_response_code(500);
                    }
                    else{
                        $out = $data;
                        $out['error'] = 'database_error';
                    }
                }
            }
            else{
                $out = $data;
                $out['error'] = 'bad_id';
            }
        }
        else{
            $out = $data;
            $errors = array_keys($emptyFields,0);
            $out['error'] = array_map(function($field){ return 'empty_field_' . $field; },$errors);
        }

        return $out;
    }

    function merge($user,$database){

        $toMerge = array();
        foreach($user as $key => $value){

            if(in_array($key,array('action','mtime','ctime')) || $database[$key] == $value){
                continue;
            }

            $toMerge[$key] = array('user' => $value , 'db' => $database[$key]);
        }

        if(!empty($toMerge)){
            $this->setMerge($toMerge);
            return true;
        }

        return false;
    }


} 