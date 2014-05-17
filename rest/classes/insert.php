<?php
/**
 * Created by PhpStorm.
 * User: jwalczak
 * Date: 14.05.14
 * Time: 18:42
 */

class Insert extends Sync {

    public function perform($data){

        $out = array();

        unset($data['id']);

        $data = array_map('strip_tags',$data);
        $emptyFields = array_map(function($field){if($field != '') return 1; return 0;},$data);

        if(true){ // !in_array(0,$emptyFields)

            $insert = getDatabase()->execute('INSERT INTO task (title,description,done,deleted,modification_date,creation_date) VALUES(:title,:description,:done,:deleted,:mtime,:ctime)',array(':title' => $data['name'],':description' => $data['description'],':done' => $data['status'],':deleted' => $data['deleted'],':mtime' => $data['mtime'],'ctime' => $data['ctime']));

            if((int)$insert > 0) {
                $out = $data;
                $out['id'] = $insert;
            }
            else{

                if(!empty($data['single'])){
                    return http_response_code(500);
                }
                else{
                    $out['error'] = 'database_error';
                    $out = $data;
                }
            }
        }
        else{
            $out = $data;
            
            $errors = array_keys($emptyFields,0);
            $out['error'] = array_map(function($field){ return 'empty_field_' . $field; },$errors);
        }

        return $out;
    }
} 