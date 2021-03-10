const searchTitleForm = document.querySelector("#title-form");
const titleInputEl = document.querySelector("#title-input");
const streamingResultsEl = document.querySelector("#streaming-results-container");
const streamingResultsList = document.querySelector("#streaming-list");

const apiKey = 'hS3AcbOwvNPkH7KTEBOU8hfGk971AAexq4gZjvM1'

// variables associated with Sam's code 
let SourcesAvailable;
let popServicesArray; 
const popularServices = ['Netflix', 'Hulu', 'HBO MAX','HBO NOW', 'HBO GO', 'Amazon Prime', 'Disney+', 'AppleTV+', 'Showtime', 'STARZ'];



let formSubmitHandler = function (event) {
  event.preventDefault();

  var title = titleInputEl.value.trim();

  if (title) {
    runSearchAPI(title);

  }
}

let runSearchAPI = function (title) {
  let searchURL = 'https://api.watchmode.com/v1/search/?apiKey=' + apiKey + '&search_field=name&search_value=' + title

  fetch(searchURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // locate ID and put into a variable 
          let movieID = data.title_results[0].id
          runTitleAPI(movieID);
        });
      } else {
        alert('Error');
      }
    })
    .catch(function (error) {
      alert('Unable to locate Movie Title.');
    });
};

let runTitleAPI = function (movieID) {
  let titleURL = 'https://api.watchmode.com/v1/title/' + movieID + '/details/?apiKey=' + apiKey + "&regions=US&append_to_response=sources"

  fetch(titleURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // render buttons for popular streaming services available
          for (i = 0; i < data.sources.length; i++) {
            let link = data.sources[i].web_url;
            let li = document.createElement("li");
            li.textContent = link;
            if (data.sources[i].type === "sub") {
              //this is where I left off 
              var streamingID = data.sources[i].source_id

            } else {
              //change this to append into a text box 
              streamingResultsEl.appendChild(li);
            }
          }

        });
      } else {
        alert('Error');
      }
    })
    .catch(function (error) {
      alert('Unable to locate Movie Title.');
    });


};


runSearchAPI("Scott Pilgrim vs. the World");

// Sam helped with following code 
let runSourcesAPI = function () {
  let sourcesURL = 'https://api.watchmode.com/v1/sources/?apiKey=' + apiKey + '&type=sub'

  fetch(sourcesURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          SourcesAvailable = data; 
          popServicesArray = data.filter((el) => {
            return popularServices.includes(el.name);
          })
          console.log(popularServices);
        });
      } else {
        alert('Error');
      }
    })
    .catch(function (error) {
      alert('Error.');
    });
}; 

runSourcesAPI(); 




$(".btn").on("click", function (event) {
  // Preventing the button from trying to submit the form......
event.preventDefault();

var title = $("#title-text").val().trim();
console.log(title);
var apikey = "fdb6720d"
var requestUrl = "http://www.omdbapi.com/?t="+title+"&apikey="+apikey;

fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        // empty details div //
        $("#omdb-results-container").empty();
        // create elements and assign API info to the element //
        var titleEl = $("<h2>").text(data.Title);
        var yearEl = $("<p>").text("Year Released: " + data.Year);   
        var actorsEl = $("<p>").text("Actors: " + data.Actors);   
        var plotEl = $("<p>").text("Plot: " + data.Plot);   
        var ratedEl = $("<p>").text("Rated: " + data.Rated);   
        var ratingEl = $("<p>").text("IMDB Rating: " + data.imdbRating);
        var runtimeEl = $("<p>").text("Runtime: " + data.Runtime);
        var posterEl = $("<img>").attr("src", data.Poster);
        var genreEl = $("<p>").text("Genre: " + data.Genre);
        var awardsEl = $("<p>").text("Awards: " + data.Awards);
       

        // create div and append elements to div //
        var divFormat = $("<div>");
        divFormat.append(titleEl, posterEl, plotEl, actorsEl, yearEl, runtimeEl, genreEl, ratedEl, ratingEl, awardsEl);
        // set div to html //
        $("#omdb-results-container").html(divFormat);
    });
  });

