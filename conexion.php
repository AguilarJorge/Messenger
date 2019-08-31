<?php
  function getConexion(){
    $con = NULL;
    $host = '127.0.0.1';
    $db = 'chat';
    $usuario = 'root';
    $password = '';
    $charset = 'utf8mb4';
    $config = [
      \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
      \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
      \PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $dts = "mysql:host=$host;dbname=$db;charset=$charset";
    try{
      $con = new \PDO($dts, $usuario, $password, $config);
    } catch(\PDOException $e){
      echo 'ERROR: ' . $e->getMessage();
    }
    return $con;
  }
?>
