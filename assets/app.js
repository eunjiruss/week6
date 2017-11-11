var scifiList = ["Star Wars", "Blade Runner", "Alien", "2001: A Space Odyssey", "The Matrix", "Avatar", "District 9", "Interstellar", "The Terminator", "Inception"];




function addButtonGiphyStuff(buttonName, i)
{
	$("#" + buttonName + i).on("click", function() {
		$("#gif").empty();
		for (var j =0; j < 10;j++){
		  // havea. string like "button0", want to get the number.
		  var movieName = scifiList[i];
	      // Storing our giphy API URL for a random cat image
	      var queryURL = "https://api.giphy.com/v1/gifs/random";

	      // Perfoming an AJAX GET request to our queryURL
	      $.ajax({
	        url: queryURL,
	        method: "GET", 
	        data: {
	        	api_key : "dc6zaTOxFJmzC",
	        	tag : movieName
	        }
	      }).done(function(response) {
	      	console.log(response)
	        var stillUrl = response.data.fixed_height_small_still_url;
	        var animateUrl = response.data.image_original_url;


	        var moviegif = $("<img>");

	       	moviegif.attr("alt", "movies");
	        moviegif.attr("data-state", "still");
	        moviegif.attr("data-animate", animateUrl);
	        moviegif.attr("data-still", stillUrl);
	        moviegif.attr("src", stillUrl);
	        moviegif.addClass("tester");
	        $("#gif").prepend(moviegif);

	        $(".tester").off("click").on("click", function() {
		      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
		      var state = $(this).attr("data-state");
		      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
		      // Then, set the image's data-state to animate
		      // Else set src to the data-still value
		      if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }

			});      
	      });
	  	}
	  });


}

function renderButtons() {
	console.log("test")

	$("#movieNames").empty();

	for (var i = 0; i < scifiList.length; i++) {

		var a = $("<button>");
		a.addClass("movie");
		a.attr("id", "button" + i);
		a.attr("movieData", scifiList[i]);
		a.text(scifiList[i]);
		$("#movieNames").append(a);

		addButtonGiphyStuff("button", i);

	}
}


$(document).ready(function(){


      $("#addMovie").on("click", function(event) {
        event.preventDefault();

        var movie = $("#userChoice").val().trim();
        scifiList.push(movie);

        renderButtons();
      });

      renderButtons();
});

  