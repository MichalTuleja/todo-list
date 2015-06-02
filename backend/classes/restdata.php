<?php
/**
 * Created by PhpStorm.
 * User: jwalczak
 * Date: 14.05.14
 * Time: 17:37
 */

class RestData {

    private $restInput = null;
    private $resultArray = array();

    const JSON = 'json';
    const STRING ='string';
    const INSERT = 'insert';
    const UPDATE = 'update';
    const DELETE = 'delete';

    public function bindDataToMethod(){

        $iterator = $this->parseInputData();
        $tmpResultArray = array();

        foreach($iterator as $iter){

            $taskId = (int)$iter['id'];

            if(empty($taskId)){

                $tmpResultArray[] = array_merge($iter,array('action' => 'insert'));
            }
            else if((int)$iter['deleted'] == 1){

                $tmpResultArray[] = array_merge($iter,array('action' => 'delete'));
            }
            else{
                $tmpResultArray[] = array_merge($iter,array('action' => 'update'));
            }
        }

        if(!empty($tmpResultArray)){
            $this->setResultArray($tmpResultArray);
            return true;
        }

        return http_response_code(400);
    }

    public function parseInputData(){

        $this->setRestInput(file_get_contents("php://input"));
        $format = $this->checkInputFormat($this->getRestInput());

        if(in_array($format,array(self::JSON))){

            $parseDataFunction = 'parse' . ucfirst($format);
            return $this->$parseDataFunction();
        }

        return http_response_code(400);
    }

    public function checkInputFormat($inputData){

        if(!empty($inputData)){
            json_decode($inputData);

            if(json_last_error() == JSON_ERROR_NONE){
                return self::JSON;
            }
        }

        return http_response_code(400);
    }

//    public function parseString(){
//
//        parse_str($this->getRestInput(),$string);
//        return $string;
//    }

    public function parseJson(){

        return json_decode($this->getRestInput(),true);
    }

    /**
     * @param mixed $restInput
     */
    public function setRestInput($restInput)
    {
        $this->restInput = $restInput;
    }

    /**
     * @return mixed
     */
    public function getRestInput()
    {
        return $this->restInput;
    }

    /**
     * @param array $resultArray
     */
    public function setResultArray($resultArray)
    {
        $this->resultArray = $resultArray;
    }

    /**
     * @return array
     */
    public function getResultArray()
    {
        return $this->resultArray;
    }

    public function isEmpty(){

        $tmp = $this->getResultArray();

        if(empty($tmp)){
            return true;
        }

        return false;
    }
} 