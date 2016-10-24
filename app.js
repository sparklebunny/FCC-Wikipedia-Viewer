$(document).ready(function() {

  	// Get results in user hits enter or return on keyboard
	$("#search_input").keydown(function(event) {
		if (event.keyCode == 13) {
			$("#search_button").trigger("click");			
		}
	});
  
	$("#search_button").click(function(){

		var searchTerm = $("#search_input").val();
		var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&limit=20&suggest=1&format=json&callback=?";

			$.ajax({
				type: "GET",
				url: wikiUrl,
				async: false,
				contentType: "application/json; charset=utf-8",
				dataType: "jsonp",
				success: function(data){
					$("#results_list").empty();
          			for (var i = 0; i < data[1].length; i++){
						$("#results_list").prepend("<a target='_blank' href=" + data[3][i] + "><li><h4>" + data[1][i] + "</h4><p>" + data[2][i] + "</p></li></a>");
					};	
              if (data[1].length == 0) {
                alert("No search term found. Try again.");
              }
				},

				error: function(errorMsg){
          console.log(errorMsg);
					alert("Oh no! Wiki isn't working. Try again.");
				}

			});

	});


}); // FIN