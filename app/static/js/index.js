var reader = new FileReader();

function uploadFile(input) {
  if (input.files && input.files[0]) {
    reader.onload = function(e) {
      $('.image-upload-wrap').hide();
      $('.file-upload-image').attr('src', e.target.result);
      $('.image-title').html(input.files[0].name);
      $('.file-upload-content').show();
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    $('.file-upload-input').val("");
  }
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// change to your classifier server ip here
var server_location = '127.0.0.1:8081';
var server_endpoint = 'http://' + server_location + '/classifier-predict/';

$("button#classify").click(function(){
  if (reader.result) {
    var query_data = {"instances": [
      {'image_bytes': {'b64': reader.result}}
    ]}
    $.ajax({
      type: "POST",
      data: query_data,
      url: server_endpoint
    }).done(function (response) {
      var result = response.predictions[0];
      // console.log(result);
      $('#cat-probability').css("width", round(result[0]*100, 0).toString()+"%");
      $('#dog-probability').css("width", round(result[1]*100, 0).toString()+"%");
      $('#cat-probability').text(round(result[0]*100, 1) + "%");
      $('#dog-probability').text(round(result[1]*100, 1) + "%");
      $('#classify').hide();
      $('#cat-vs-dog').show();
    });
  }
});

$("button.remove-image").click(function(){
  $('.file-upload-input').val("");
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();

  $('#classify').show();
  $('#cat-vs-dog').hide();
});

$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});

$("#login #goto-register").click(function(){
  $("#login").modal("hide");
  $("#register").modal("show");
});
$("#login #goto-forget").click(function(){
  $("#login").modal("hide");
  $("#forget").modal("show");
});
$("#register #goto-login").click(function(){
  $("#register").modal("hide");
  $("#login").modal("show");
});
$("#forget #goto-sent").click(function(){
  $("#forget").modal("hide");
  $("#sent").modal("show");
});
$("#sent .btn").click(function(){
  $("#sent").modal("hide");
  $("#reset-password").modal("show");
});
$("input").focus(function(){
  $(this).parent().addClass("has-focus");
});
$("input").blur(function(){
  $(this).parent().removeClass("has-focus");
});
$("#logout-button").click(function(){
  window.location.href = '/accounts/logout/';
});
$("button#register-button").click(function(event){
  event.preventDefault();

  var registerEmail = $.grep(
    $('#register-form').serializeArray(),
    function(element){ return element.name === "email"; })[0].value;

  $.get("user?useremail="+registerEmail, function(existedUser) {
    if (existedUser.length === 0) {
      $('<input />').attr('type', 'hidden')
          .attr('name', "register_home")
          .attr('value', "Register_Home")
          .appendTo('#register-form');
      $('#register-form').submit();
    } else {
      $('#register-email').addClass("has-error");
      $('#register-form span.email-errors').text("這個帳號已經被註冊過囉～");
    }
  });

});
