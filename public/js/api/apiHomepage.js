
function callApiHomepage(){
    var postApi = `http://localhost:3000/api/data/header`;
    const btnLoader = document.querySelector('.section-loader');
    function start() {
        getData(renderHeaderFilm);
    }
    
    start();

    function getData(callback) {
        btnLoader.classList.remove('hide');
        fetch(postApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err){
            alert(err);
        });
      }

    function renderHeaderFilm(posts) {
        var d = new Date(posts[0].premiereDate);
        var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        document.getElementById('content-advertisement').innerHTML = ` <div class="content-title">  
        <h2 id="titleExpected"><i class="fa fa-angle-double-right"></i> DKKC: ${date} <i class="fa fa-angle-double-left"></i><h3 id="titleName"> ${posts[0].movieName} </h3></h2>
        <div class="describe">
            ${posts[0].describe}
        </div>
        </div>
           <div class="content-video-trailler">
                <iframe class="trailerIframe" frameborder="0" src="https://www.youtube.com/embed/${posts[0].trailer}?rel=0&amp;showinfo=0&amp;autoplay=1" allowfullscreen="true" ></iframe>
            </div>`;

        document.getElementById('content-poster').innerHTML = ` <div class="slider">
        <div class="slides">
            <input type="radio" name="radio-btn" id="radio1"> 
            <input type="radio" name="radio-btn" id="radio2"> 
            <input type="radio" name="radio-btn" id="radio3"> 
            <div class="slide first">
                <img src="${posts[1].poster1}" alt="">
            </div>
            <div class="slide">
                <img src="${posts[1].poster2}" alt="">
                </div>
                <div class="slide">
                    <img src="${posts[1].poster3}" alt="">
                </div>
                <div class="navigation-auto">
                    <div class="auto-btn1"></div>
                    <div class="auto-btn2"></div>
                    <div class="auto-btn3"></div>
                </div>
        </div>
        <div class="navigation-manual">
            <label for="radio1" class="btn-manual"></label>
            <label for="radio2" class="btn-manual"></label>
            <label for="radio3" class="btn-manual"></label>
        </div>
        </div>`;

        btnLoader.classList.add('hide');
    }

}