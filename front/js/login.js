function login() {
	var data = {
        email: $('.email').val(),
        password: $('.password').val()
    }
  $.ajax({
    url: "http://localhost:8000/api/v1/login/",
    method:'POST', 
    data: data,
    success: function(response){
    	if (response.response == 'true') {
    		$( location ).attr("href", "./index.html");
    	} else {
    		alert(response.response);
    	}
    },
    error: function(response) {
      alert(response);
    }
  });
}