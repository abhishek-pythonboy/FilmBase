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
    if (inputName !== "") {
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
        for (i = 0; i < responseData.Search.length; i++) {
            let poster = (responseData.Search[i].Poster == "N/A") ? "images/default-thumb.jpg" : responseData.Search[i].Poster;
            showResults.innerHTML +=
                "<a href='movie-info.html' onclick=setSession('" + responseData.Search[i].imdbID + "') data-lity>" +
                "<div class='result'>" +
                "<img src=" + poster + " alt='' class='thumbnail'>" +
                "<div class='info'>" +
                "<h2 class='movie-name'>" + responseData.Search[i].Title + "</h2>" +
                "<span class='year'>&nbsp;(" + responseData.Search[i].Year + ")</span>"
            "</div></div></a>";
        }

        // responsive settings
        $("#show-results").slick({
            infinite: true,
            slidesToShow: 6,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }

    request.send();
    e.preventDefault();

});

// set sessionStorage for movie-info.html
function setSession(mvID) {
    sessionStorage.setItem("mvID", mvID);
}