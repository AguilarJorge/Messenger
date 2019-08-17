$(function(){
  //Init iconos
  feather.replace();
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
})
