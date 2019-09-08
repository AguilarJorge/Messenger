<?php
  require('conexion.php');
  if (isset($_POST['funcion'])) {
    eval($_POST['funcion']());
  }elseif (isset($_GET['funcion'])) {
    eval($_GET['funcion']());
  }

  //Manipulacion de la bd
  function insert($tabla, $array){
    $con = getConexion();
    foreach ($array as $key => $value) {
      $datos[] = $key;
      $signos[] = '?';
      $valores[] = $value;
    }
    $datos = implode(', ',$datos);
    $signos = implode(', ',$signos);
    $sql = $con->prepare("INSERT INTO $tabla($datos) VALUES ($signos)");
    $sql->execute($valores);
  }
  // function subirImagen(){
  //   $directorio = 'img/usuarios/';
  //   $extension = substr(basename($_FILES['imagen']['name']),-4);
  //   $archivo = $directorio.md5(basename($_FILES['imagen']['name'])).$extension;
  //   if (move_uploaded_file($_FILES['imagen']['tmp_name'], $archivo)) {
  //     echo "Exito";
  //   }else {
  //     echo "Error";
  //   }
  // }

  function login(){
    $con = getConexion();
    $correo = $_POST['loginCorreo'];
    $password = $_POST['loginPass'];
    $sql = $con->prepare("SELECT * FROM usuarios WHERE correo = '$correo' AND activo = '1'");
    $sql->execute();
    $user = $sql->fetch();
    if ($user && password_verify($password, $user['password'])){
      $id = $user['id'];
      $sql = $con->prepare("SELECT * FROM relSalasUsuarios as rel INNER JOIN salas as s ON rel.id_sala = s.id where rel.id_usuario = '$id'");
      $sql->execute();
      $salas = $sql->fetchAll();
      echo json_encode(['exito'=>true, 'mensaje'=>'Datos correctos', 'usuario'=>$user, 'salas'=>$salas]);
    } else {
      echo json_encode(['exito'=>false, 'mensaje'=>'Datos incorrectos']);
    }
  }
  function registro(){
    $con = getConexion();
    $nombre = $_POST['nombres'];
    $paterno = $_POST['apaterno'];
    $materno = $_POST['amaterno'];
    $correo = $_POST['regCorreo'];
    $password = password_hash($_POST['regPass'], PASSWORD_DEFAULT);
    $sql = $con->prepare("SELECT * FROM usuarios WHERE correo = '$correo'");
    $sql->execute();
    $user = $sql->fetch();
    if (!$user){
      if (isset($_FILES['imagen'])) {
        $extension = substr(basename($_FILES['imagen']['name']),-4);
        $nombreImg = md5(basename($_FILES['imagen']['name'])).$extension;
        $archivo = 'img/usuarios/'.$nombreImg;
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $archivo)) {
          $avatar = $nombreImg;
        }else {
          $avatar = null;
        }
      }else {
        $avatar = null;
      }
      insert('usuarios', [
        'nombre' => $nombre,
        'paterno' => $paterno,
        'materno' => $materno,
        'avatar' => $avatar,
        'correo' => $correo,
        'password' => $password
      ]);
      echo json_encode(['exito'=>true, 'mensaje'=>'Usuario agregado con exito']);
    } else {
      echo json_encode(['exito'=>false, 'mensaje'=>'Ya existe un usuario registrado con el correo proporcionado']);
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
