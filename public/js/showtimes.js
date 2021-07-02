
function loadPage(userId) {

    const listMovies = document.querySelector('#sliderShowtime');
    const btnLoader = document.querySelector('.section-loader');
    const listTimes = document.querySelector('#list--times');

    const districts = document.querySelector('#place__district');
    const cinemas = document.querySelector('#place-content');
    const usercode = userId;
    const a = document.querySelector.bind(document);
    const aa = document.querySelectorAll.bind(document);

    btnLoader.classList.remove('hide');
    fetch('http://localhost:3000/showtimes/api/movie')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
           var htmls =  data.map(function(db){
               return `
               <div class="item">
                    <div class="latest-show" valueid="${db.movieId}">
                        <div class="latest-s-img">
                            <img src="${db.poster}" alt="">
                        </div>
                        <div class="content-show">
                            <div class="contentShow">
                                <h3>${db.movieName}<br><span>${db.specific}</span></h3>
                            </div>
                        </div>
                    </div>
                </div>
               `;
           })

           listMovies.innerHTML = htmls.join('');

            $(listMovies).slick({
                slidesToShow: 5,
                slidesToScroll: 3,
                arrows: true,
                infinite: false,
                responsive: [
                    {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                    }
                    },
                    {
                    breakpoint: 845,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                    },
                    {
                    breakpoint: 600,
                        settings: { 
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                ]
            });
           

            $("#sliderShowtime .item").click(function () {
                $('.latest-show').removeClass("active");
                $(this).find('.latest-show').addClass("active");

                $('.slider__times').css("opacity", "1");

                $('#list--times .item').removeClass("active");
                $('html,body').animate({ scrollTop: 145.60000610351562 }, 'slow');
                var moviesID = $(this).find('.latest-show').attr('valueid');
                fetch(`http://localhost:3000/showtimes/api/date/${moviesID}`)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(result) {
                        var htmls = '';
                        for(let i = 0; i < 14; i++)
                        {
                            var dateString = addDays(i).getFullYear() + "-" + (addDays(i).getMonth() + 1) + "-" + addDays(i).getDate();
                            var date = new Date(dateString);
                            var data = result.filter(item => parseDate(item.startDate).getTime() === date.getTime());
                      
                            if(data.length > 0)
                            {
                                var html_item_tab = '';
                                var html_item_list = '';
                                data.forEach(item => {
                                    if(item.startTime.length > 1)
                                    {
                                        var html_temp = '';
                                        for(let i = 0; i < item.startTime.length; i++)
                                        {
                                            html_temp += `<a href="${usercode ? `/bookings?idshow=${item.idShow[i]}&idmovie=${item.idMovies}&idcinema=${item.idCinema}` : 'http://localhost:3000/reg'}" class="btn-sumit">${item.startTime[i]}</a>`
                                            
                                        }
                                        html_item_tab += `<div class="item__time-cinema">
                                                        ${html_temp}
                                                    </div>`  ;
                                    }
                                    else
                                    {
                                        html_item_tab += `<div class="item__time-cinema">
                                                        <a href="${usercode ? `/bookings?idshow=${item.idShow}&idmovie=${item.idMovies}&idcinema=${item.idCinema}`: 'http://localhost:3000/reg'}" class="btn-sumit">${item.startTime}</a>
                                                    </div>`  ;
                                    }
                                })
                                data.forEach(item => {
                                    html_item_list += `<div class="item__cinema">${item.nameCinema}</div>`;
                                })
                                
                                htmls += `<div class="item-tabpane">
                                            <div class="list__cinema tabs__cinema-item">
                                                ${html_item_list}
                                            </div>
                                            <div class="cinema-item__tabpane">
                                                ${html_item_tab}
                                            </div>
                                        </div>`;
                            }
                            else
                            {
                                htmls += `<div class="item-tabpane">
                                            <div class="tab__content">
                                                <h4 style="display: flex; justify-content: center;">PHIM CHƯA BÁN VÉ</h4>
                                            </div>
                                        </div>`;
                            }
                        }

                        document.querySelector('#item-tabcontent').innerHTML = htmls;

                        const itemtabs = aa(".list--times .item");
                        const itempanes = aa(".item-tabpane");

                        itemtabs.forEach((tab, index) => {
                            const itempane = itempanes[index];

                            tab.onclick = function () {
                                $(this).addClass("active").siblings().removeClass("active");   
                                $(".item-tabpane").addClass("active").siblings().removeClass("active");

                                this.classList.add("active");
                                itempane.classList.add("active");
                            };
                        });

                        const itemTimetabs = aa(".tabs__cinema-item .item__cinema");
                        const itemTimepanes = aa(".item__time-cinema");

                        itemTimetabs.forEach((tab, index) => {
                            const itemTimepane = itemTimepanes[index];
                            tab.onclick = function () {
                                $(this).addClass("active").siblings().removeClass("active");   
                                $(".item__time-cinema").addClass("active").siblings().removeClass("active");

                                this.classList.add("active");
                                itemTimepane.classList.add("active");
                            };
                        });

                        $(".item__cinema").click(function () { 
                            $(this).addClass("active").siblings().removeClass("active");   
                        });
                    })
                    .catch(function(err){
                                console.log(err);
                        });
            });
            btnLoader.classList.add('hide');
        })
        .catch(function(err){
                console.log(err);
        });

        function addDays(days) {
            var now = new Date();
            now.setDate(now.getDate() + parseInt(days));
            return now;
        };

        function parseDate(input) {
            var parts = input.match(/(\d+)/g);
            // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
            return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
        }

        fetch('http://localhost:3000/showtimes/api/date')
        .then(function(response){
            return response.json();
        })
        .then(function(result) {
            var htmls = result.map(function(data) {
                return `
                    <div class="item item-time">
                        <span>${data.date}</span>
                        <p class="times" valuetext="${data.datetime}">${data.day}</p>
                    </div>
                `;
            });

            listTimes.innerHTML = htmls.join('');

            $(listTimes).slick({
                slidesToShow: 10,
                slidesToScroll: 4,
                arrows: true,
                infinite: false,
                responsive: [
                    {
                    breakpoint: 845,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                    }
                    },
                    {
                    breakpoint: 600,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 3
                        }
                    },
                ]
            });
            
        })
        .catch(function(err){
                console.log(err);
        });
 

    const tabs = aa(".tab-item");
    const panes = aa(".tab-pane");
    
    const tabActive = a(".tab-item.active");
    const line = a(".tabs .line");

    line.style.left = tabActive.offsetLeft + "px";
    line.style.width = tabActive.offsetWidth + "px";

    tabs.forEach((tab, index) => {
        const pane = panes[index];

        tab.onclick = function () {

            a(".tab-item.active").classList.remove("active");
            a(".tab-pane.active").classList.remove("active");

            line.style.left = this.offsetLeft + "px";
            line.style.width = this.offsetWidth + "px";

            this.classList.add("active");
            pane.classList.add("active");

            if($('.tab__movie-showtimes.active').length > 0)
            {
                $(pane).trigger('resize');
                $('.list--times .slick-track, .sliderShowtime .slick-track').trigger('resize');
            }
          
        };
    });
    //fecth API 

    fetch('http://localhost:3000/showtimes/api/cinema')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var district_data = data.district;
            var cinema_data = data.cinema;

            var html = '<li class="list-place active" data-filer="All"><i class="fad fa-map-marked-alt"></i> All</li>'
            var htmls_district = district_data.map(function(data) {
                return `
                    <li class="list-place" data-filer="${data.id}"><i class="fad fa-map-marker-alt"></i> ${data.district}</li>
                `;
            })
            html += htmls_district.join('');

            districts.innerHTML = html;
            
            $('.list-place').click(function() {
                const value = $(this).attr('data-filer');
                if(value === 'All')
                    $('.item-place').show('1000');
                else
                {
                    $('.item-place').not('.' + value).hide('500');
                    $('.item-place').filter('.' + value).show('1000');
                }
                $(this).addClass('active').siblings().removeClass('active');
            })

            var htmls_cinema = cinema_data.map(function(data) {
                return `
                    <div class="item-place ${data.idDistr}" valueid="${data.id}">
                        <div class="place__info">
                            <h4 class="info-title"><i class="fad fa-star-of-david"></i>${data.cinemaName}</h4>
                            <p class="info-address"><i class="fad fa-map-pin" ></i>${data.cinemaAddress}</p>
                        </div>
                        <div class="place__btn">
                            <a href="/cinema-view?id=${data.id}&name=${data.cinemaName.replaceAll(" ", "-")}"><i class="fad fa-map-marker-alt"></i> Xem chi tiết</a>
                        </div>
                    </div>
                `;
            })

            cinemas.innerHTML = htmls_cinema.join('');
            $('.item-place').click(function() {
                var list__place = document.querySelector('#list__place');
                var tabs__place = document.querySelector('#tabs__place-content');
                
                var idCinema = $(this).attr('valueid');
                //Fetch Api 
                btnLoader.classList.remove('hide');
                fetch(`http://localhost:3000/showtimes/api/cinema/${idCinema}`)
                    .then(function(response){
                        return response.json();
                    })
                    .then(function(datas) {
                        if(datas.length > 0)
                        {
                            var html_list = '';
                            var html_tabs = '';
                            
                            datas.forEach(item => {
                                var temp = item.data;
                                if(temp.length === 1)
                                {
                                    var htmls_list_place = temp.map(function(data){
                                    return `
                                        <div class="item__place">
                                            <span>${data.date[0].datename}</span>
                                            <p class="times" valuetext="${data.date[0].datetime}">${data.date[0].day}</p>
                                        </div>
                                        `;  
                                    });
                                    html_list += htmls_list_place;
                                 
                                    var htmls_tabs__place = temp.map(function(data, index){
                                        var html_item = data.startTime.map(function(item, index) {
                                            return `<a href="${usercode ? `/bookings?idshow=${data.idShow[index]}&idmovie=${data.idMovies}&idcinema=${data.idCinema}` : 'http://localhost:3000/reg'}" class="btn-sumit">${item}</a>`;
                                        })
                                        return `
                                        <div class="item item__place">
                                            <div class="item__place-content">
                                                <div class="place__movies">
                                                    <div class="place-s-img">
                                                        <img src="http://localhost:3000/api/image/${data.idMovies}/1" alt="">
                                                    </div>
                                                    <div class="content-place">
                                                        <div class="contentPlace">
                                                            <h3>${data.movieName}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="place__info">
                                                    <p>3D - Phụ Đề Tiếng Việt</p>
                                                    <div class="item__place-cinema">
                                                        ${html_item}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="lines"></div>
                                        </div>
                                        `;
                                    })
                                    html_tabs += htmls_tabs__place;
                                }
                                else {
                                    var htmls_list_place = [temp[0]].map(function(data){
                                        return `
                                            <div class="item__place">
                                                <span>${data.date[0].datename}</span>
                                                <p class="times" valuetext="${data.date[0].datetime}">${data.date[0].day}</p>
                                            </div>
                                            `;  
                                    });
                                    html_list += htmls_list_place;
                                    var htmls_temp = '';
                                    for(let i = 0; i < temp.length; i++)
                                    {
                                        var htmls_tabs__place = [temp[i]].map(function(data, index){
                                            var html_item = data.startTime.map(function(item, index) {
                                                return `<a href="${usercode ? `/bookings?idshow=${data.idShow[index]}&idmovie=${data.idMovies}&idcinema=${data.idCinema}` : 'http://localhost:3000/reg'}" class="btn-sumit">${item}</a>`;
                                            })
                                            return `
                                                <div class="item__place-content">
                                                    <div class="place__movies">
                                                        <div class="place-s-img">
                                                            <img src="http://localhost:3000/api/image/${data.idMovies}/1" alt="">
                                                        </div>
                                                        <div class="content-place">
                                                            <div class="contentPlace">
                                                                <h3>${data.movieName}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="place__info">
                                                        <p>3D - Phụ Đề Tiếng Việt</p>
                                                        <div class="item__place-cinema">
                                                            ${html_item}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="lines"></div>
                                            `;
                                        })
                                        htmls_temp += htmls_tabs__place;
                                    }
                                    html_tabs += `<div class="item item__place"> ${htmls_temp} </div>`;
                                }
                            })

                            list__place.innerHTML = html_list;
                            tabs__place.innerHTML = html_tabs;
                        }
                        else
                        {
                            list__place.innerHTML = `<h4 style="width: 100%;
                                                        display: flex;
                                                        justify-content: center;
                                                        margin: 20px 0px;">Không Có Phim Nào Cho Rạp Này</h4>`;
                        }

                        const places = aa(".tabs__place-item .item__place");
                        const placepanes = aa(".tabs__place-content .item__place");

                            places.forEach((tab, index) => {
                                const placepane = placepanes[index];
                                tab.onclick = function () {
                                    $(this).addClass("active").siblings().removeClass('active');
                                    $(placepane).addClass("active").siblings().removeClass('active');
                                };
                        });
                        btnLoader.classList.add('hide');
                    })
                    .catch(function(err){
                        console.log(err);
                    });


                $('.tabs__place-content .item__place').removeClass('active');
                $('.tabs__place-item .item__place').removeClass('active');
                $(this).addClass('active').siblings().removeClass('active');

                $('.slider__place').show();   

                $("html, body").animate({
                    scrollTop: $('#slider__place').offset().top
                }, 'slow');
           
            })

        })
        .catch(function(err){
            console.log(err);
        });

}

