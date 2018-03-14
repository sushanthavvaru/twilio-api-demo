$().ready(()=>{
  $("#sendBtn").on("click", ()=>{
    $("#sendBtn").val("sending");
    $.get(
      "https://dry-fjord-78842.herokuapp.com/sendsms",
      {msg: $("#msg").val()},
    ).done(function( data ) {
      if(data == "message not sent"){
        alert("Message not sent dfvfv");
      }else{
         $("#msg").val("");
      }
  }).fail(function() {
    alert("Message not sent");
  }).always(function() {
    $("#sendBtn").val("send");
  });
  });
});
