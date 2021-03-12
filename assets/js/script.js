const searchTitleForm = document.querySelector("#title-form");
const titleInputEl = document.querySelector("#title-text");
const searchButton = document.querySelector("#click-me-button"); 
const streamingResultsEl = document.querySelector("#streaming-results-container");
const streamingResultsList = document.querySelector("#streaming-list");
const additionalList = document.querySelector("#additional-list");

const apiKeyMode = 'hS3AcbOwvNPkH7KTEBOU8hfGk971AAexq4gZjvM1'
const apiKeyOMDB = "fdb6720d"
const apiKeyNYT = 'T6BXN6H37HkF7emcIuzQU36KKC95bSOE'

//poster & data from OMDB API 
$(".btn").on("click", function (event) {
  // Preventing the button from trying to submit the form......
event.preventDefault();

var title = $("#title-text").val().trim();

var requestUrl = "http://www.omdbapi.com/?t="+title+"&apikey="+ apiKeyOMDB;

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

// NYT Review data and link
$(".btn").on("click", function (event) {
  event.preventDefault();
  let title = $('#title-text').val().trim();
  console.log(title);

  const reviewURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + title + '&api-key=' + apiKeyNYT;
  console.log(reviewURL)
});


// streaming info from WatchMode API 

searchButton.addEventListener('click', formSubmitHandler); 

function formSubmitHandler (event) {
  event.preventDefault();
  var title = titleInputEl.value.trim();

  if (title) {
    runSearchAPI(title);

  } 
}

let runSearchAPI = function (title) {
  streamingResultsEl.classList.remove("hidden"); 
  titleInputEl.value=""

  let searchURL = 'https://api.watchmode.com/v1/search/?apiKey=' + apiKeyMode + '&search_field=name&search_value=' + title

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
        console.log('Error');
      }
    })
    .catch(function (error) {
      console.log('Unable to locate Movie Title.');
    });
};

let runTitleAPI = function (movieID) {
  let titleURL = 'https://api.watchmode.com/v1/title/' + movieID + '/details/?apiKey=' + apiKeyMode + "&regions=US&append_to_response=sources"

  fetch(titleURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          // render buttons for popular streaming services available
          streamingResultsList.innerHTML=""
          additionalList.innerHTML="" 
          for (i = 0; i < data.sources.length; i++) {
            if (data.sources[i].type === "sub") {
              if (data.sources[i].source_id === 203) {
                let Netflix = document.createElement("a"); 
                let netflixLI = document.createElement("li"); 
                let netflixHref = data.sources[i].web_url
                Netflix.textContent = "Netflix"
                Netflix.setAttribute("href", netflixHref);
                Netflix.setAttribute("target", "_blank"); 
                netflixLI.appendChild(Netflix);
                streamingResultsList.appendChild(netflixLI); 
                
              }
              if (data.sources[i].source_id === 157) {
                let Hulu = document.createElement("a"); 
                let huluLI = document.createElement("li"); 
                let huluHref = data.sources[i].web_url
                Hulu.textContent = "Hulu"
                Hulu.setAttribute("href", huluHref);
                Hulu.setAttribute("target", "_blank"); 
                huluLI.appendChild(Hulu)
                streamingResultsList.appendChild(huluLI); 
                
              }
              if (data.sources[i].source_id === 26) {
                let amazonPrime = document.createElement("a"); 
                let amazonLI = document.createElement("li"); 
                let amazonHref = data.sources[i].web_url
                amazonPrime.textContent = "Amazon Prime"
                amazonPrime.setAttribute("href", amazonHref);
                amazonPrime.setAttribute("target", "_blank"); 
                amazonLI.appendChild(amazonPrime)
                streamingResultsList.appendChild(amazonLI); 
               
              }
              if (data.sources[i].source_id === 387) {
                let HBOMax = document.createElement("a"); 
                let maxLI = document.createElement("li"); 
                let maxHref = data.sources[i].web_url
                HBOMax.textContent = "HBO MAX"
                HBOMax.setAttribute("href", maxHref);
                HBOMax.setAttribute("target", "_blank"); 
                maxLI.appendChild(HBOMax); 
                streamingResultsList.appendChild(maxLI); 
                 
              }
              if (data.sources[i].source_id === 145) {
                let HBOGo = document.createElement("a"); 
                let goLI = document.createElement("li"); 
                let goHref = data.sources[i].web_url
                HBOGo.textContent = "HBO GO"
                HBOGo.setAttribute("href", goHref);
                HBOGo.setAttribute("target", "_blank");
                goLI.appendChild(HBOGo)
                streamingResultsList.appendChild(goLI); 
                
              }
              if (data.sources[i].source_id === 146) {
                let HBONow = document.createElement("a"); 
                let nowLI = document.createElement("li"); 
                let nowHref = data.sources[i].web_url
                HBONow.textContent = "HBO NOW"
                HBONow.setAttribute("href", nowHref);
                HBONow.setAttribute("target", "_blank"); 
                nowLI.appendChild(HBONow)
                streamingResultsList.appendChild(nowLI); 
             
              }
              if (data.sources[i].source_id === 372) {
                let disneyPlus = document.createElement("a"); 
                let disneyLI = document.createElement("li"); 
                let disneyHref = data.sources[i].web_url
                disneyPlus.textContent = "Disney +"
                disneyPlus.setAttribute("href", disneyHref);
                disneyPlus.setAttribute("target", "_blank"); 
                disneyLI.appendChild(disneyPlus)
                streamingResultsList.appendChild(disneyLI); 
              
              }
              if (data.sources[i].source_id === 371) {
                let appleTV = document.createElement("a"); 
                let appleLI = document.createElement("li"); 
                let appleHref = data.sources[i].web_url
                appleTV.textContent = "AppleTV+"
                appleTV.setAttribute("href", appleHref);
                appleTV.setAttribute("target", "_blank"); 
                appleLI.appendChild(appleTV)
                streamingResultsList.appendChild(appleLI); 
               
              }
            } else {
              //appends links to an accordian feature 
              let link = data.sources[i].web_url;
              let price = data.sources[i].price; 
              let format = data.sources[i].format; 
              let li = document.createElement("li");
              let a = document.createElement("a"); 
              a.textContent = link + " / Price: " + price + " " + format; 
              a.setAttribute("href", data.sources[i].web_url); 
              a.setAttribute("target", "_blank")
              li.appendChild(a); 
              additionalList.appendChild(li);
            }
          }

        });
      } else {
        console.log('Error');
      }
    })
    .catch(function (error) {
      console.log('Unable to locate Movie Title.');
    });


};



