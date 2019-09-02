<?php
  require('conexion.php');
  if (isset($_POST['funcion'])) {
    eval($_POST['funcion']());
  }elseif (isset($_GET['funcion'])) {
    eval($_GET['funcion']());
  }


  function login(){
    $con = getConexion();
    $correo = $_POST['loginCorreo'];
    $password = $_POST['loginPass'];
    $sql = $con->prepare("SELECT id, nombre, paterno, materno, avatar, estado, correo, created_at FROM usuarios WHERE correo = '$correo' AND password = '$password' AND activo = '1'");
    $sql->execute();
    $user = $sql->fetch();
    if ($user){
      $id = $user['id'];
      $sql = $con->prepare("SELECT * FROM relSalasUsuarios as rel INNER JOIN salas as s ON rel.id_sala = s.id where rel.id_usuario = '$id'");
      $sql->execute();
      $salas = $sql->fetchAll();
      echo json_encode(['exito'=>true, 'mensaje'=>'Datos correctos', 'usuario'=>$user, 'salas'=>$salas]);
    } else {
      echo json_encode(['exito'=>false, 'mensaje'=>'Datos incorrectos']);
    }
  }
  function getChats(){
    $con = getConexion();
    $idSala = $_POST['idSala'];
    $sql = $con->prepare("SELECT m.id, m.id_creador, m.tipo, m.mensaje, m.activo, m.created_at, u.nombre, u.paterno, u.materno, u.avatar
      FROM relMensajesSalas as rel
      INNER JOIN mensajes as m ON rel.id_mensaje = m.id
      INNER JOIN usuarios as u ON m.id_creador = u.id
      where rel.id_sala = '$idSala'"
    );
    $sql->execute();
    $datos = $sql->fetchAll();
    if ($datos){
      echo json_encode(['exito'=>true, 'mensaje'=>'Datos correctos', 'datos'=>$datos]);
    } else {
      echo json_encode(['exito'=>false, 'mensaje'=>'No hay mensajes']);
    }
  }
?>
