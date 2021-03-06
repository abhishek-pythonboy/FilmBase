window.onload = showMovieInfo;

function showMovieInfo() {


    const apiKey = "http://www.omdbapi.com/?&apikey=988358d3";
    let mvID = sessionStorage.getItem("mvID");

    // send request and recieve response
    let requestUrl = apiKey + "&i=" + mvID;
    let request = new XMLHttpRequest();

    request.open('GET', requestUrl, true);
    request.onload = () => {
        let responseData = JSON.parse(request.response);

        let posterSrc = (responseData.Poster == "N/A") ? "images/default-thumb.jpg" : responseData.Poster;
        $("#mv-poster").attr("src", posterSrc);

        // 
        $("#mv-bg").css({
            "background-image": "url(" + posterSrc + ")",
            "background-size": "cover"
        });

        $("#mv-name").html(responseData.Title);
        $("#mv-year").html("(" + responseData.Year + ")");
        $("#rating-num").html(responseData.imdbRating);
        $("#mv-plot").html(responseData.Plot);
        $("#mv-director").html(responseData.Director);
        $("#mv-writer").html(responseData.Writer);
        $("#mv-stars").html(responseData.Actors);
        $("#mv-genre").html(responseData.Genre);
        $("#mv-awards").html(responseData.Awards);
        $("#mv-production").html(responseData.Production);
        $("#mv-website").attr("href", responseData.Website);
        $("#mv-website").html(responseData.Website);
        $("#mv-rated").html(responseData.Rated);
        $("#mv-released").html(responseData.Released);
        $("#mv-runtime").html(responseData.Runtime);
        $("#mv-boxoffice").html(responseData.BoxOffice);
    }

    request.send();
    sessionStorage.clear();



};