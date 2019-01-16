// Require the packages we will use:
var http = require("http"),
	socketio = require("socket.io"),
	fs = require("fs");

// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
var app = http.createServer(function(req, resp){
	// This callback runs when a new connection is made to our HTTP server.
	
	fs.readFile("client_savable.html", function(err, data){
		// This callback runs when the client.html file has been read from the filesystem.
		
		if(err) return resp.writeHead(500);
		resp.writeHead(200);
		resp.end(data);
	});
});
app.listen(3456);

let rooms_arr = [];
let users_arr = [];
let user_room_dict = {};
let creator_room_dict = {};
let temp_ban_room_dict = {};
let perm_ban_room_dict = {};



// Do the Socket.IO magic:
var io = socketio.listen(app);
io.sockets.on("connection", function(socket){
	// This callback runs when a new Socket.IO connection is established.
	
	socket.on('message_to_server', function(data) {
		// let username = "N/A";
		// This callback runs when the server receives a new message from the client.
		// for (let i = 0; i < user_arr.length; i++) {
		// 	if (user_arr[i] == data['user']) username += data["message"];
		// }
		//if (user_room_dict[data["chatroom"]] == null || user_room_dict[data["chatroom"]] === ",") {
		//	user_room_dict[data["chatroom"]] = data["user"] + ",";
		//}
		console.log("message: "+data["message"]);
		// alert("username: " +data["user_name"]); // log it to the Node.JS output
		io.sockets.emit("message_to_client",{message:data["message"], chatroom: data["chatroom"], user: data["user"]}); // broadcast the message to other users
	});
	
	socket.on('chatroom_to_server', function(data) {
		// This callback runs when the server receives a new message from the client.
		rooms_arr.push(data["chatroom"]);
		creator_room_dict[data["chatroom"]] = data["user"];
		//user_room_dict[data["chatroom"]] = ",";
		console.log("chatroom: "+data["chatroom"]); // log it to the Node.JS output
		io.sockets.emit("chatroom_to_client",{chatroom:data["chatroom"] }) // broadcast the message to other users
	});
	
	socket.on("request_chatrooms", function(data){
		//make comma delimited list of chatrooms
		console.log("called pls");
		let chatroom_list = "";
		for(let i = 0; i<rooms_arr.length; i++){
			chatroom_list += rooms_arr[i] + ",";
			console.log("chatroomlist");
			console.log(chatroom_list);
		}
		io.sockets.emit("sent_chatrooms", {chatroomlist:chatroom_list});//broadcast to users
		});
	
	socket.on("user_to_server", function(data) {
		let possible_username = data["user"];
		let user_exists = false;
		for (let i = 0; i < users_arr.length; i++) {
			if (possible_username == users_arr[i]){
				user_exists = true;
				}
		}
		console.log("existence")
		console.log(user_exists)
		if (!user_exists) {
			users_arr.push(possible_username);
		}
		console.log("stored user!");
		console.log("USER ARRAY!!!!!!!!")
		console.log(users_arr)
		console.log(user_exists)
		io.sockets.emit("user_exists_check",{user: possible_username, userExists: String(user_exists)});
	});
	
	socket.on("user_to_chatroom_to_server", function(data){//gets chatroom, user
		let user_chatroom = data["chatroom"];
		let current_user = data["user"];
		console.log(current_user + " " + user_chatroom);
		let bool_boi = false;
		
		if(!(user_chatroom in user_room_dict)){
			user_room_dict[user_chatroom] = []
			//user_room_dict[user_chatroom].push(current_user);
		}
		// else{
			
		// }
		let chatroom_user_arr = user_room_dict[user_chatroom]
		console.log(chatroom_user_arr);
		for (let i = 0; i < chatroom_user_arr.length; i++) {
			if (chatroom_user_arr[i] == current_user) {
				bool_boi = true;
			}
		}
		if (!bool_boi) {
			user_room_dict[user_chatroom].push(current_user);
		}

		
		let chatroom_user_list = "";
		
		for(let i = 0; i<chatroom_user_arr.length; i++){
			chatroom_user_list += chatroom_user_arr[i] + ",";
		}
		let bool = String(data["user"]==creator_room_dict[user_chatroom]);
		console.log("CREATOR IS: " + creator_room_dict[user_chatroom])
		console.log("csv of users: " + chatroom_user_list);
		io.sockets.emit("user_to_chatroom_to_client", {chatroom_users: chatroom_user_list, chatroom:user_chatroom, isCreator: bool, creator: creator_room_dict[user_chatroom]});
	});


	socket.on("remove_user_from_chatroom", function(data) {
		let new_user_arr = [];
		const cur_user = data["user"];
		const old_arr = user_room_dict[data["chatroom"]];
		let user_list = "";
		for (let i = 0; i < old_arr.length; i++) {
			if (old_arr[i] != cur_user) {
				new_user_arr.push(old_arr);
				user_list += (old_arr[i] + ",");
			}
		}

		user_room_dict[data["chatroom"]] = new_user_arr;
		// io.sockets.emit("receive_updated_chatroom_users", {userList: user_list});
	})
	
});