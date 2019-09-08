<!DOCTYPE html>
<html lang="es" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title>Xhat</title>
    <link rel="stylesheet" href="librerias/iconSemantic/icon.min.css">
    <link rel="stylesheet" href="css/general.min.css">
  </head>
  <body>
    <main id="app">
      <section id="menuApp">
        <div class="container">
          <div class="contenedorAvatar">
            <div class="avatarPersonal"></div>
          </div>
          <div class="accionMenu chats">
            <i data-feather="message-circle"></i>
          </div>
          <div class="accionMenu grupos">
            <i data-feather="users"></i>
          </div>
          <div class="accionMenu favoritos">
            <i data-feather="heart"></i>
          </div>
        </div>
      </section>
      <section id="detalleMenu">
        <div class="container">
          <div class="buscadorGeneral">
            <p class="encabeazado">Buscar chat</p>
            <div class="contenedorInput">
              <input type="text" placeholder="Buscar...">
              <div class="limpiarBusqueda">
                <i data-feather="delete"></i>
              </div>
            </div>
          </div>
          <div class="contenidoTabs">
            <div class="tab chats"></div>
          </div>
        </div>
        <div class="infoPerfil">
          <div class="regresar"><i class="icono" data-feather="arrow-left"></i></div>
          <div class="avatar"></div>
          <p class="nombre"></p>
          <p class="correo"></p>
          <p class="fecha"></p>
          <p class="estado"></p>
        </div>
      </section>
      <section id="principal">
        <div class="container">
          <div class="header">
            <div class="imgPerfil"></div>
            <p class="nombre"></p>
            <div class="icono atach"><i data-feather="paperclip"></i></div>
            <div class="icono menuShat"><i data-feather="more-vertical"></i></div>
          </div>
          <div class="contenedorMensajes"></div>
          <div class="redactor">
            <div class="icono emojis"><i data-feather="smile"></i></div>
            <div class="icono gifs"><i data-feather="film"></i></div>
            <div class="icono stickers"><i data-feather="file"></i></div>
            <div class="contenedorEscribir">
              <label class="escribir" contenteditable="true"></label>
            </div>
            <div class="icono imagen"><i data-feather="image"></i></div>
          </div>
        </div>
      </section>
    </main>

    <section id="login">
      <div class="container">
        <div class="forms">
          <div class="imagen"></div>
          <div class="contenedorForms">
            <form id="loginForm" class="form animForm visible">
              <div class="textos">
                <p class="encabezado">Iniciar Sesión</p>
                <p>Introduce tu correo electronico y contraseña para iniciar sesión</p>
              </div>
              <div class="field animField">
                <label>Correo</label>
                <i class="icono" data-feather="mail"></i>
                <input id="loginCorreo" type="text" name="loginCorreo">
              </div>
              <div class="field animField">
                <label>Contraseña</label>
                <i class="icono" data-feather="key"></i>
                <input id="loginPass" type="password" name="loginPass">
              </div>
              <p class="msj">No tienes una cuenta? Registrate dando <span class="transicion" data-form="registroForm">click aqui</span></p>
              <p class="resetPass transicion" data-form="resetPassword">He olvidado mi contraseña</p>
            </form>
            <form id="registroForm" class="form animForm">
              <div class="field animField">
                <label>Nombre(s)</label>
                <i class="icono" data-feather="user"></i>
                <input id="nombres" type="text" name="nombres">
              </div>
              <div class="field w2 animField">
                <label>Apellido Paterno</label>
                <i class="icono" data-feather="file-text"></i>
                <input id="apaterno" type="text" name="apaterno">
              </div>
              <div class="field w2 animField">
                <label>Apellido Materno</label>
                <i class="icono" data-feather="file-text"></i>
                <input id="amaterno" type="text" name="amaterno">
              </div>
              <div class="field animField">
                <label>Correo electronico</label>
                <i class="icono" data-feather="mail"></i>
                <input id="regCorreo" type="text" name="regCorreo">
              </div>
              <div class="field w2 animField">
                <label>Contraseña</label>
                <i class="icono" data-feather="key"></i>
                <input id="regPass" type="password" name="regPass">
              </div>
              <div class="field w2 animField">
                <label>Confirmar contraseña</label>
                <i class="icono" data-feather="key"></i>
                <input id="confregPass" type="password" name="confregPass">
              </div>
              <p class="msj">Ya tienes una cuenta. Inicia sesión dando <span class="transicion" data-form="loginForm">click aqui</span></p>
            </form>
            <form id="resetPassword" class="form animForm">
              <div class="textos">
                <p class="encabezado">Recuperar contraseña</p>
                <p>Introduce tu correo electronico para enviarte la información para que recuperes tu contraseña</p>
              </div>
              <div class="field animField">
                <label>Correo</label>
                <i class="icono" data-feather="mail"></i>
                <input id="resetpassCorreo" type="text" name="resetpassCorreo">
              </div>
              <p class="regresar transicion" data-form="loginForm"><i class="icono" data-feather="arrow-left"></i>Regresar</p>
            </form>
          </div>
          <div class="boton"><i class="icono" data-feather="arrow-right"></i></div>
        </div>
        <svg class="svgOndas" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs><path id="path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/></defs>
          <g class="ondas">
            <use class="onda" xlink:href="#path" x="48" y="0" fill="rgba(255,255,255,0.7"/>
            <use class="onda" xlink:href="#path" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
            <use class="onda" xlink:href="#path" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
            <use class="onda" xlink:href="#path" x="48" y="7" fill="#fff"/>
          </g>
        </svg>
      </div>
    </section>
    <script type="text/javascript" src="librerias/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="librerias/validaciones.min.js"></script>
    <script type="text/javascript" src="librerias/feather.min.js"></script>
    <script type="text/javascript" src="js/helpers.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
  </body>
</html>
