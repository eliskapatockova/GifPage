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

// stores input animal value and displays its button
$("#addAnimal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#animalInput").val().trim();
    topics.push(newAnimal);
    console.log(topics);
    $("#animalInput").val('');
    displayButtons();
  });


  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-info">');
      a.attr("type", "button");
      a.attr("id", "animal");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }
  displayButtons();

  
   $(document).on("click", "#animal", displayAnimalGif);

   $(document).on("click", ".animalGiphy", pausePlayGifs);

   function pausePlayGifs() {
    var state = $(this).attr("data-state");
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
}
}


})