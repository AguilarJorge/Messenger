<?php
  require('conexion.php');
  if (isset($_POST['funcion'])) {
    eval($_POST['funcion']());
  }elseif (isset($_GET['funcion'])) {
    eval($_GET['funcion']());
  }


  function login(){
    $con = getConexion();
    $correo = $_POST['correo'];
    $password = $_POST['password'];
    $sql = $con->prepare("SELECT * FROM usuarios WHERE correo = '$correo' AND password = '$password'");
    $sql->execute();
    $user = $sql->fetch();
    if ($user){
      echo json_encode(['exito'=>true, 'datos'=>$user]);
    } else {
      echo json_encode(['exito'=>false, 'mensaje'=>'Datos incorrectos']);
    }
  }
?>
