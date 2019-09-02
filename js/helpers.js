$.fn.extend({
  dataPos: function() {
    return this[0].getBoundingClientRect()
  },
})
const alerta = function(config){
  config = jQuery.extend({
    acciones: {
      aprov: 'Aceptar',
      cancel: 'Cancelar'
    },
    closable: false,
    closeOnActions: true,
    encabezado: 'Encabezado de la modal',
    icono: 'exclamation triangle',
    mensaje: 'Mensaje de la modal...',
    ocultar: false,
    tipo: 'warning',
  }, config);
  var acciones = '';
  if (config.acciones) {
    $.each(config.acciones, function(k, v){
      acciones += '<div class="accion '+k+'">'+v+'</div>';
    })
  }
  if (config.ocultar) {
    $(document).off('click', '#alertaJF .accion');
    $('#alertaJF').fadeOut(function(){$(this).remove()});
    return false;
  }
  if ($('#alertaJF').length == 0){
    $('body').append(`
      <div id="alertaJF">
        <div class="contenedor ${config.tipo}">
          <i class="${config.icono} icon"></i>
          <p class="encabezado">${config.encabezado}</p>
          <p class="mensaje">${config.mensaje}</p>
          <div class="acciones">${acciones}</div>
        </div>
      </div>
    `);
    if(config.closable) $('#alertaJF').prepend('<div class="closable"></div>');
    $('#alertaJF').fadeIn().css('display','flex');
    $(document).on('click', '#alertaJF .accion', function(e){
      if ($(this).hasClass('aprov') && config.onAprov) {
        config.onAprov(e);
      }else if ($(this).hasClass('cancel') && config.onCancel) {
        config.onCancel(e);
      }
      if (config.closeOnActions) {
        $(document).off('click', '#alertaJF .accion');
        $('#alertaJF').fadeOut(function(){$(this).remove()});
      }
    })
    if (config.hasOwnProperty('autoclose')) {
      setTimeout(function(){
        $(document).off('click', '#alertaJF .accion');
        $('#alertaJF').fadeOut(function(){$(this).remove()});
      }, config.autoclose)
    }
  }else {
    $(document).off('click', '#alertaJF .accion');
  }
  $(document).on('click', '#alertaJF .closable', function(){
    $(document).off('click', '#alertaJF .accion');
    $('#alertaJF').fadeOut(function(){$(this).remove()});
  })
}
const formatFecha = function(timeStamp, config){
  config = jQuery.extend({
    formato: 'd/m/y',
    separador: ' de ',
    mesCompleto: false,
    hora: false,
  }, config);
  var fecha = new Date(timeStamp);
  var meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  var dia = fecha.getDate();
  var mes = meses[fecha.getMonth()];
  var anio = fecha.getFullYear();
  if (!config.mesCompleto){
    mes = mes.substring(0, 3);
  }
  var hora = fecha.getHours();
  if(hora < 10) hora = '0'+hora;
  var minutos = fecha.getMinutes();
  if(minutos < 10) minutos = '0'+minutos;
  var arrFormato = config.formato.split('/');
  var formatoFull = [];
  $.each(arrFormato, function(i, e){
    if (e.toLowerCase() == 'd') {
      e = dia;
    }else if (e.toLowerCase() == 'm') {
      e = mes;
    }else if (e.toLowerCase() == 'y') {
      e = anio;
    }
    if(i == arrFormato.length - 1){
      formatoFull.push(e);
    }else{
      formatoFull.push(e, config.separador);
    }
  })
  formatoFull = formatoFull.join('');
  if (config.hora) {
    return formatoFull+'. '+hora+':'+minutos;
  }else {
    return formatoFull;
  }
}
