    let username;
    let rooms_arr = [];
    
      var socketio = io.connect();
      socketio.on("message_to_client",function(data) {
         //Append an HR thematic break and the escaped HTML of the new message
         document.getElementById("chatlog").appendChild(document.createElement("hr"));
         document.getElementById("chatlog").appendChild(document.createTextNode(data['message']));
      });

      function sendMessage(){
         var msg = document.getElementById("message_input").value;
         socketio.emit("message_to_server", {message:msg});
      }

      function showMainPage() {
        /*
         document.getElementById("message_input").hidden=false;
         document.getElementById("send_button").hidden=false;
         document.getElementById("chatlog").hidden=false;
         */
        document.getElementById("chatroom_creation").hidden = false;
           
      }



document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("send_button").addEventListener("click", sendMessage);
document.getElementById("main_page").addEventListener("click", showMainPage);
    } , false);

