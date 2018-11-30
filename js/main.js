const apiKey = "http://www.omdbapi.com/?&apikey=988358d3";
function onLoad() {
  // change max value of year input to current year
  let d = new Date();
  let year = d.getFullYear();
  document.getElementById("input-year").max = year;
}
// i=tt3896198 removed out of apiKey
let clickCount = 0;
// set a listener on submit
  document.getElementById("submit").addEventListener("click", (e) => {

  clickCount++;
  // if user searches for more than once, unslick the previous results
  if (clickCount > 1) {
    $("#show-results").slick("unslick");
  }

  let inputName = document.getElementById("input-name").value;
  let inputYear = document.getElementById("input-year").value;

  let showResults = document.getElementById("show-results");
  // empty div
  showResults.innerHTML = "";
  // prepare request url
  let requestUrl = apiKey;
  if(inputName !== "") {
    requestUrl += "&s=" + inputName.replace(" ", "+");
    if (inputYear !== "") {
      requestUrl += "&y=" + inputYear;
    }
  }
  // make a request
  let request = new XMLHttpRequest();

  request.open('GET', requestUrl, true);
  request.onload = () => {
    // get response and JSONify it
    let responseData = JSON.parse(request.response);


    let i;
    for (i=0;i<responseData.Search.length;i++) {
      let poster = (responseData.Search[i].Poster == "N/A") ? "images/default-thumb.jpg" : responseData.Search[i].Poster;
      showResults.innerHTML += "<div class='result'>"+
                                "<img src="+poster+" alt='' class='thumbnail'>" +
                                "<div class='info'>" +
                                "<a href='file:///D:/FILES/CS/OMDB/pages/movie-info.html' onclick=movieInfo('" + responseData.Search[i].imdbID + "') data-lity>" +
                                "<h2 class='movie-name'>"+responseData.Search[i].Title+"</h2>" +
                                "<span class='year'>("+responseData.Search[i].Year+")</span>"
                                "</a></div></div>";
                                //console.log(apiKey+"&i="+responseData.Search[i].imdbID);
    }

    $("#show-results").slick({
      infinite:true,
      slidesToShow: 6,
      responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:5
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow:4
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow:3
        }
      },
      ]
    });
  }

  request.send();
e.preventDefault();

});

  function movieInfo(mvID) {



    let requestUrl = apiKey + "&i=" + mvID;
    let request = new XMLHttpRequest();

    

    let mvPoster = document.getElementById("mv-poster");
    let mvName = document.getElementById("mv-name");
    let mvYear = document.getElementById("mv-year");
    let mvRating = document.getElementById("rating-num");
    let mvPlot = document.getElementById("plot");
    let mvDirector = document.getElementById("mv-director");
    let mvWriter = document.getElementById("mv-writer");
    let mvStars = document.getElementById("mv-stars");

    request.open('GET', requestUrl, true);
    request.onload = () => {
      let responseData = JSON.parse(request.response);
      $("#iFrame").ready(() => {
        alert("hello");
        $('#iFrame').contents().find('body').html(`

  <div id="mv-lightbox">
    <input type="hidden" id="submit">
    <div class="container">
          <img src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" alt="" id="mv-poster">
        <div id="mv-details">
            <div id="mv-heading">
              <h1 id="mv-name">INCEPTION<span id="mv-year"> (2010)</span></h1>
              <div id="imdb-rating">
                imdb rating: <br>
                <span id="rating-num">8.8</span>
              </div>
            </div>
            <div class="plot-section">
              <span>Plot:</span>
            <div id="mv-plot">A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.</div>
            </div>
            <div id="names">
              <p><strong>Director: </strong><span id="mv-director"></span></p>
              <p><strong>Writer: </strong><span id="mv-writer"></span></p>
              <p><strong>Stars: </strong><span id="mv-stars"></span></p>
            </div>
            <div id="rest-details">
              <div class="column">
                <p>Genre: <span id="genre"></span></p>
                <p>Awards: <span id="awards"></span></p>
                <p>Production: <span id="production"></span></p>
                <p>Website: <span id="website"></span></p>
              </div>
              <hr>
              <div class="column">
                <p>Rated: <span id="rated"></span></p>
                <p>Released: <span id="released"></span></p>
                <p>Runtime: <span id="runtime"></span></p>
                <p>BoxOffice: <span id="boxoffice"></span></p>
                <p></p>
              </div>
            </div>
        </div>
    </div>
  </div>
      `);
      })
    }

    request.send();
  }
// #my-lightbox .container #mv-details #mv-heading #mv-name

