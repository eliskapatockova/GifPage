$(document).ready(function() {

    //Array for searched topics to be added
    var topics = [];


    function displayAnimalGif() {

	var x = $(this).data("search");
	console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);


    $.ajax({
        url: queryURL,
        method: "GET"

      }).done(function(response) {

          var results = response.data;
          console.log(results);
          for (var i = 0; i < results.length; i++) {
          
          var showDiv = $("<div class='col-md-4'>");

          var rating = results[i].rating;
          var defaultAnimatedSrc = results[i].images.fixed_height.url;
          var staticSrc = results[i].images.fixed_height_still.url;
          var showImage = $("<img>");
          var p = $("<p>").text("Rating: " + rating);

          showImage.attr("src", staticSrc);
          showImage.addClass("animalGiphy");
          showImage.attr("data-state", "still");
          showImage.attr("data-still", staticSrc);
          showImage.attr("data-animate", defaultAnimatedSrc);
          showDiv.append(p);
          showDiv.append(showImage);
          $("#gifArea").prepend(showDiv);

      }
  });


}



})