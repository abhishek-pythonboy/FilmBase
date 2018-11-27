function onLoad() {
  // change max value of year input to current year
  let d = new Date();
  let year = d.getFullYear();
  document.getElementById("input-year").max = year;
}

const apiKey = "http://www.omdbapi.com/?i=tt3896198&apikey=988358d3";

// set a listener on submit
  document.getElementById("submit").addEventListener("click", (e) => {

  let inputName = document.getElementById("input-name").value;
  let inputYear = document.getElementById("input-year").value;
  let showResults = document.getElementById("show-results");
  showResults.innerHTML = "";
  let requestUrl = apiKey;
  if(inputName !== "") {
    requestUrl += "&s=" + inputName.replace(" ", "+");
  }
  console.log(requestUrl);

  let request = new XMLHttpRequest();

  request.open('GET', requestUrl, true);
  request.onload = () => {
    // get response and JSONify it
    let responseData = JSON.parse(request.response);
    console.log(responseData);
console.log(responseData.Search[0].Title);
    let i;
    for (i=0;i<responseData.Search.length;i++) {
      showResults.innerHTML += "<div class='result'>"+
                                "<img src="+responseData.Search[i].Poster+" alt='' class='thumbnail'>" +
                                "<div class='info'>" +
                                "<h2 class='movie-name'>"+responseData.Search[i].Title+"</h2>" +
                                "<span class='year'>("+responseData.Search[i].Year+")</span>"
                                "</div></div>";
    }
  }

  request.send();
e.preventDefault();

})