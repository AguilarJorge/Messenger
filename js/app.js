// $(function(){

  //Init iconos
  feather.replace();
  var usuario = null;
  //Login
  $('#loginForm').form({
    fields: {
      name: {
        identifier: 'loginCorreo',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce un correo'
        }]
      },
      password: {
        identifier: 'loginPass',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce tu contraseña'
        }]
      },
    },
    onSuccess: function(event, fields){
      event.preventDefault();
      fields.funcion = 'login';
      $.ajax({
        type: 'POST',
        url: "chatController.php",
        dataType: 'json',
        data: fields,
        beforeSend: function(){
          $('#login .forms .boton').addClass('disabled');
        }
      }).done(function(r){
        usuario = r.usuario;
        if (r.exito) {
          if (usuario.avatar) {
            $('#app #menuApp .contenedorAvatar .avatarPersonal').css('background-image', 'url('+usuario.avatar+')');
          }
          $('#app #detalleMenu .infoPerfil .nombre').text(usuario.nombre+' '+usuario.paterno+' '+usuario.materno);
          $('#app #detalleMenu .infoPerfil .correo').text(usuario.correo);
          $('#app #detalleMenu .infoPerfil .fecha').text('Miembro desde: '+formatFecha(usuario.created_at, {mesCompleto: true}));
          usuario.estado ? $('#app #detalleMenu .infoPerfil .estado').text(usuario.estado) : null;
          $.each(r.salas, function(i, e){
            $('#app #detalleMenu .tab.chats').append(`
              <div class="shat ${e.favorita == 1 ? 'fav' : ''} ${e.tipo == 2 ? 'grupo' : ''}" data-id="${e.id_sala}">
                <div class="contenedor">
                  <div class="imagen" ${e.imagen ? 'style="background-image: url('+e.imagen+');"' : ''}></div>
                  <div class="texto">
                    <p class="timestamp">Hoy a las 2:34pm</p>
                    <p class="nombre">${e.nombre}</p>
                    <p class="ultimoMsg">${e.ultimoMsg ? e.ultimoMsg : ''}</p>
                  </div>
                </div>
              </div>
            `);
          })
          $('#login').fadeOut();
        }
      }).fail(function(r){
        console.log(r.responseText)
      }).always(function(){
        $('#login .forms .boton').removeClass('disabled');
      })
    },
  })
  //Registro
  $('#registroForm').form({
    inline: true,
    fields: {
      nombres: {
        identifier: 'nombres',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce tu(s) nombre(s)'
        }]
      },
      apaterno: {
        identifier: 'apaterno',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce tu apellido paterno'
        }]
      },
      amaterno: {
        identifier: 'amaterno',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce apellido materno'
        }]
      },
      correo: {
        identifier: 'regCorreo',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce un correo'
        }]
      },
      password: {
        identifier: 'regPass',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce tu contraseña'
        }]
      },
      verifPass: {
        identifier  : 'confregPass',
        rules: [{
          type   : 'empty',
          prompt : 'Introduce tu contraseña'
        }, {
            type   : 'match[regPass]',
            prompt : 'La contraseña no coincide'
        }]
      },
    },
    onSuccess: function(event, fields){
      event.preventDefault();
      var formData = new FormData();
      var imagen = $('#login .forms .imagen #subirImg')[0].files[0];
      formData.append('funcion', 'registro');
      formData.append('nombres', fields.nombres);
      formData.append('apaterno', fields.apaterno);
      formData.append('amaterno', fields.amaterno);
      formData.append('regCorreo', fields.regCorreo);
      formData.append('regPass', fields.regPass);
      formData.append('imagen', imagen);
      $.ajax({
        type: 'POST',
        url: "chatController.php",
        dataType: "json",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function(){
          $('#login .forms .boton').addClass('disabled');
        }
      }).done(function(r){
        console.log(r);
      }).fail(function(r){
        console.log(r.responseText)
      }).always(function(){
        $('#login .forms .boton').removeClass('disabled');
      })
    },
  })
  //Subir imagen para registrar usuario
  $(document).on('change', '#login .forms .imagen #subirImg', function(e){
    cargarImagen(e);
  })
  //Enviar formulario
  $('#login .forms .boton').click(function(){
    $(this).parent().find('.form.visible').submit();
  })
  //Anumacion de inputs
  $('.animForm .field.animField input').focusin(function(){
    if ($(this).val().length <= 0) {
      $(this).parent().addClass('anim');
    }
  })
  $('.animForm .field.animField input').focusout(function(){
    if ($(this).val().length <= 0) {
      $(this).parent().removeClass('anim');
    }
  })
  //Cambiar vista de formularios
  $('.forms .form .transicion').click(function(){
    var id = $(this).data('form');
    $(this).parents('.form').removeClass('visible');
    $('#'+id).addClass('visible');
    if (id == 'registroForm') {
      $(this).parents('.forms').children('.imagen').addClass('subir').append('<input id="subirImg" type="file" name="subirImg">');
    }else {
      $(this).parents('.forms').children('.imagen').removeClass('subir cambio');
      $(this).parents('.forms').find('.imagen #subirImg').remove();
    }
    if (id == 'resetPassword') {
      $(this).parents('.forms').children('.imagen').addClass('morph');
    }else {
      $(this).parents('.forms').children('.imagen').removeClass('morph');
    }
    $('form').each(function(i, e){
      e.reset();
      $(e).find('.field').removeClass('anim error');
    })
  })

  //Informacion personal
  $('#menuApp .avatarPersonal').click(function(){
    var el = $(this);
    $('#app').addClass('infoActiva');
    el.css({
      position: 'fixed',
      top: el.dataPos().top,
      left: el.dataPos().left
    })
    setTimeout(function(){
      var destino = $('#detalleMenu .infoPerfil .avatar').dataPos();
      el.css({
        top: destino.top,
        left: destino.left,
        width: destino.width,
        height: destino.height,
        borderColor: '#f6f6fc'
      })
    },500)
  })
  $('#detalleMenu .infoPerfil .regresar').click(function(){
    $('#app').removeClass('infoActiva');
    var destino = $('#menuApp .contenedorAvatar').dataPos();
    $('#menuApp .avatarPersonal').css({
      top: destino.top,
      left: 10,
      width: destino.width,
      height: destino.height,
      borderColor: '#6c89f4'
    })
    setTimeout(function(){
      $('#menuApp .avatarPersonal').css('left', $('#menuApp .contenedorAvatar').dataPos().left)
    },500)
  })
  //Filtrar chats
  $('#menuApp .accionMenu').click(function(){
    if ($(this).hasClass('grupos')) { //Filtrar por grupos
      $('#detalleMenu .buscadorGeneral .encabeazado').text('Buscar grupo');
      $('.tab.chats .shat').not('.grupo').addClass('bye');
      $('.tab.chats .shat.grupo').removeClass('bye');
    }else if ($(this).hasClass('favoritos')) { //Filtrar por favoritos
      $('#detalleMenu .buscadorGeneral .encabeazado').text('Buscar en favoritos');
      $('.tab.chats .shat').not('.fav').addClass('bye');
      $('.tab.chats .shat.fav').removeClass('bye');
    }else if ($(this).hasClass('chats')) { //Todos los chats
      $('#detalleMenu .buscadorGeneral .encabeazado').text('Buscar chat');
      $('.tab.chats .shat').removeClass('bye');
    }
  })

  //Acceder a mensajes de una sala
  $(document).on('click', '#app #detalleMenu .tab.chats .shat', function(){
    if ($(this).hasClass('activo')) return false;
    var idSala = $(this).data('id');
    $(this).siblings().removeClass('activo');
    $(this).addClass('activo');
    $('#app #principal .header .imgPerfil').css('background-image', $(this).find('.imagen').css('background-image'));
    $('#app #principal .header .nombre').text($(this).find('.nombre').text());
    $.ajax({
      type: 'POST',
      url: "chatController.php",
      dataType: 'json',
      data: {
        idSala: idSala,
        funcion: 'getChats'
      },
      beforeSend: function(){
        $('#app #principal .contenedorMensajes').empty();
        //Agregar loader
      }
    }).done(function(r){
      var tipo = ['txt', 'img', 'stk', 'vid'];
      if (r.exito) {
        $.each(r.datos, function(i, e){
          var nombre = e.nombre+' '+e.paterno+' '+e.materno;
          var datetime = formatFecha(e.created_at, {
            separador: '.',
            hora: true
          });
          $('#app #principal .contenedorMensajes').append(`
            <div class="mensaje ${e.id_creador == usuario.id ? 'enviado' : 'recibido'}">
              <div class="avatar" ${e.avatar ? 'style="background-image:url('+e.avatar+');"' : ''}></div>
              <p class="contenido ${tipo[e.tipo - 1]}">${e.mensaje}</p>
              <p class="datos"><span class="nombre">${nombre}.</span><span class="datetime">${datetime}</span></p>
            </div>
          `);
        })
      }
    }).fail(function(r){
      console.log(r)
    }).always(function(){
      //Remover loader
    })
  })


  //Funciones generales
  function cargarImagen(e, blob){
    if (blob) {
      var file = blob;
    }else {
      var file = e.target.files[0];
    }
    imageType = /image.*/;
    if (!file.type.match(imageType))
    return;
    var nombreImg = Date.now();
    var extension = file.name.split('.');
    extension = extension[extension.length - 1];
    nombreImg = nombreImg+'.'+extension;
    var reader = new FileReader();
    reader.onloadend = function(){
      $(e.target).parent().addClass('cambio').css('background-image', 'url('+reader.result+')');
    }
    reader.readAsDataURL(file);
  }
// })
