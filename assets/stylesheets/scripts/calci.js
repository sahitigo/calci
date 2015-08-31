$(document).ready(function(){
$('#keys .key').click(function()  {
  $('#preview').html($('#preview').html()+this.dataset.digit);
});
$('#delete').click(function(){
  $('#preview').html($('#preview').html().slice(0,-1));
});

});