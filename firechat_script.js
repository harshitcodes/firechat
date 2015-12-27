var myRef = new Firebase('https://firemychat.firebaseio.com/');


var username_input = null;
var google_login = $('#google_login');
var message_input = $('#text');
var send_button = $('#post');
var results = $('#results');


google_login.click(function() {
  // A login popup will be displayed when the google login button is clicked
  myRef.authWithOAuthPopup("google", function(error, authData) {
    if(error){
      console.log('login failed');
    }else{
      username =  authData.google.displayName;
      //add the username to the post button
      send_button.html("Post as " + username);

      // enable the post message button
      send_button.attr('disabled', false);
      google_login.attr('disabled', true);
    }
  }, {remember: "none"}  // this will end authentication when the page is closed
  );
});



send_button.click(function() {
  // var username = username_input.val();
  var message = message_input.val();

  //send the message


myRef.onAuth(function(authData) {
  if (authData) {   
myRef.on('child_added', function(snapshot) {
	msg = snapshot.val();
	var new_message = $('<div/>');
	new_message.append('<p><strong>' + msg.user + '</strong></p><p>' + msg.text + '</p>');
	new_message.addClass('msg');
	// new_message.addClass(msg.user == username_input.val() ? ' me' : '');   // this is an inline version of if-else    
	$('#results').append(new_message);
  $("#results").animate({scrollTop: $('#results')[0].scrollHeight});
	});
}
});


myRef.push({
  	user: username,
  	text: message,
  });

  //empty the message input after sending the message
  message_input.val('');
});

