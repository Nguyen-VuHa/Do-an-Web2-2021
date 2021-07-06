const express = require('express');
const asyncHandler = require('express-async-handler');
const Movies = require('../models/movies');
const showTime = require('../models/showtime');
const Cinema = require('../models/theater');
const District = require('../models/district')
const router = express.Router();

router.use(function(req, res, next){
    res.locals.title = 'Lịch Chiếu';
    next();
});

router.get('/',asyncHandler(async function(req, res) {
   res.render('showtimes');
}));

router.get('/api/movie',asyncHandler(async function(req, res) {
    const data = await Movies.findAll();
    var dataMovies = [];
    var someday = new Date();
    data.forEach(item => {
        var getDate = new Date(item.premiereDate);
        var endDate = new Date(item.endDate);
        if(someday.getTime() >= getDate.getTime() && someday.getTime() <= endDate.getTime())
        {
            var obData_hdc = {};
            obData_hdc = {
                movieId: item.movieId,
                movieName: item.movieName,
                specific: item.specific,
                poster: `http://localhost:3000/api/image/${item.movieId}/1`
            }
            dataMovies.push(obData_hdc);
        }  
    });

    res.json(dataMovies);
}));


router.get('/api/date/:id', asyncHandler(async function(req, res) {
    const showtime = await showTime.findByIdMovies(req.params.id);
    var cinemas = await Cinema.findAll();
    const cinema = [];
    const dates = [];

    for(let i = 0; i < 14; i++)
    {
        var month = (addDays(i).getMonth() + 1);
        var day = addDays(i).getDate();

        if(month.toString().length > 1)
            month = "" + (addDays(i).getMonth() + 1);
        else
            month = "0" + (addDays(i).getMonth() + 1);

        if(day.toString().length > 1)
            day = "" + addDays(i).getDate();
        else
            day = "0" + addDays(i).getDate();
           
        var dateString = addDays(i).getFullYear() + "-" + month + "-" + day;
        var date = new Date(dateString);
        dates.push(date);
    }

    var today = new Date();
    var months = (today.getMonth() + 1);
    var days = today.getDate();
    if(months.toString().length > 1)
        months = "" + (today.getMonth() + 1);
    else
        months = "0" + (today.getMonth() + 1);

    if(days.toString().length > 1)
        days = "" + today.getDate();
    else
        days = "0" + today.getDate();
    let todayTemp = today.getFullYear() + "-" + months + "-" + days;
    let daynow = new Date(todayTemp);
   
    dates.forEach(idate => {
        showtime.forEach(item => { 
            var timeStart = item.startDate.getFullYear() + "-" + (item.startDate.getMonth() + 1) + "-" + item.startDate.getDate() + " " + item.startTime;
            let dateStart = new Date(timeStart);
            if(idate.getTime() === daynow.getTime())
            {
                if(dateStart.getTime() < today.getTime())
                {
                   return;
                }
                else
                {
                    let nameCinema = "";
                    var objectItem = {};
                    var arrayStTime = [];
                    var arrayId = [];
                    cinemas.forEach(items => {
                        if(items.id === item.idCinema)
                        {
                            nameCinema = items.nameTheater;
                            return;
                        }
                    });
                    arrayStTime.push(item.startTime);
                    arrayId.push(item.idShowtime);
    
                    cinema.forEach(items => {
                        if(items.idCinema === item.idCinema && items.startDate.getTime() === item.startDate.getTime())
                        {
                            items.idShow.push(item.idShowtime);
                            items.startTime.push(item.startTime);
                        }
                    });
    
                    const data = cinema.filter(items => (items.idCinema === item.idCinema));
    
                    if(data.length > 0)
                    {
                        const t = data.filter(items => (items.startDate.getTime() === item.startDate.getTime()));
                        if(t.length > 0)
                            return;
                        else
                        {
                            objectItem = {
                                idShow: arrayId,
                                idMovies: item.idMovies,
                                idCinema: item.idCinema,
                                nameCinema: nameCinema,
                                startDate: item.startDate,
                                startTime: arrayStTime,
                            };
                        }
                    }
                    else
                    {
                        objectItem = {
                            idShow: arrayId,
                            idMovies: item.idMovies,
                            idCinema: item.idCinema,
                            nameCinema: nameCinema,
                            startDate: item.startDate,
                            startTime: arrayStTime,
                        };
                    }
    
                    cinema.push(objectItem);
                }
            }
        })
    })

    res.json(cinema);
}))

router.get('/api/date', asyncHandler(async function(req, res) {
    var arrayDate = [];
    var objectDate = {};
    let strDay = '';
    let datetime = '';
    for(let i = 0; i < 14; i++)
    {
        strDay = addDays(i).getDate() + "-" + (addDays(i).getMonth() + 1);
        datetime = addDays(i).getFullYear() + "-" + (addDays(i).getMonth() + 1) + "-" +  addDays(i).getDate();
        objectDate = {
            date: getDate(addDays(i).getDay()),
            day: strDay,
            datetime: datetime,
        }
        arrayDate.push(objectDate);
    }

    res.json(arrayDate);
}));

 function addDays(days) {
    var now = new Date();
    now.setDate(now.getDate() + parseInt(days));
    return now;
  };

function getDate(current_day) {
    let date_name = '';
    if(current_day === 0)
        date_name = 'CN';
    if(current_day === 1)
        date_name = 'Thứ 2';
    if(current_day === 2)
        date_name = 'Thứ 3';
    if(current_day === 3)
        date_name = 'Thứ 4';
    if(current_day === 4)
        date_name = 'Thứ 5';
    if(current_day === 5)
        date_name = 'Thứ 6';
    if(current_day === 6)
        date_name = 'Thứ 7';
  
    return date_name;
}

router.get('/api/cinema',asyncHandler(async  function(req, res) {
    const districts = await District.findAll();
    const cinemas = await Cinema.findAll();
    const data_district = [];
    const data_cinema = [];
    districts.forEach(item => {
        var obj = {
            id: item.id,
            district: item.district
        }
        data_district.push(obj);
    })

    cinemas.forEach(item => {
        var obj = {
            id: item.id,
            idDistr: item.idDistr,
            cinemaName: item.nameTheater,
            cinemaAddress: item.addressTheater
        }
        data_cinema.push(obj);
    })

    var objectData = {
        district: data_district,
        cinema: data_cinema
    }

    res.json(objectData);
}));

router.get('/api/cinema/:id',asyncHandler(async  function(req, res) {
    const showtimes = await showTime.findByIdCinema(req.params.id);
    const listMovies = await Movies.findAll();
    const data = [];

    var today = new Date();

    showtimes.forEach(item => {
        const dates = [];
        const arrayId = [];
        const startdates = [];
        let nameMovies = '';
        let strDay = '';
        let datetime = '';
        let datename = '';

        var months = (item.startDate.getMonth() + 1);
        var days = item.startDate.getDate();
        if(months.toString().length > 1)
            months = "" + (item.startDate.getMonth() + 1);
        else
            months = "0" + (item.startDate.getMonth() + 1);
    
        if(days.toString().length > 1)
            days = "" + item.startDate.getDate();
        else
            days = "0" + item.startDate.getDate();

        let dayTemp = item.startDate.getFullYear() + "-" + months + "-" + days + " " + item.startTime;
        let daycheck = new Date(dayTemp);

        if(daycheck.getTime() < today.getTime())
            return;
        else
        {
            const temp = data.filter(items => items.idMovies === item.idMovies);
            if(temp.length > 0)
            {
            
                const t = data.filter(items => (items.startDate.getTime() === item.startDate.getTime() && items.idMovies === item.idMovies));
                if(t.length > 0)
                {
                    data.forEach(items => {
                        
                        if(items.startDate.getTime() === item.startDate.getTime() && items.idMovies === item.idMovies)
                        {
                            items.startTime.push(item.startTime);
                            items.idShow.push(item.idShowtime);
                        }
                    })
                }
                else
                {
                    strDay = item.startDate.getDate() + "-" + (item.startDate.getMonth() + 1);
                    datetime = item.startDate.getFullYear() + "-" + (item.startDate.getMonth() + 1) + "-" +  item.startDate.getDate();
                    datename = getDate(item.startDate.getDay());
        
                    var objdate = {
                        day: strDay,
                        datetime: datetime,
                        datename: datename
                    }
                    startdates.push(objdate);
        
                    listMovies.forEach(items => {
                        if(items.movieId === item.idMovies)
                        {
                            nameMovies = items.movieName;
                            return;
                        }
                    });
                    dates.push(item.startTime);
                    arrayId.push(item.idShowtime);
        
                    objectItem = {
                        idShow: arrayId,
                        idMovies: item.idMovies,
                        idCinema: item.idCinema,
                        movieName: nameMovies,
                        startDate: item.startDate,
                        date: startdates,
                        startTime: dates
                    };
        
                    data.push(objectItem);
                }
            }
            else
            {
            
                strDay = item.startDate.getDate() + "-" + (item.startDate.getMonth() + 1);
                datetime = item.startDate.getFullYear() + "-" + (item.startDate.getMonth() + 1) + "-" +  item.startDate.getDate();
                datename = getDate(item.startDate.getDay());

                var objdate = {
                    day: strDay,
                    datetime: datetime,
                    datename: datename
                }
                startdates.push(objdate);

                listMovies.forEach(items => {
                    if(items.movieId === item.idMovies)
                    {
                        nameMovies = items.movieName;
                        return;
                    }
                });
                dates.push(item.startTime);
                arrayId.push(item.idShowtime);

                objectItem = {
                    idShow: arrayId,
                    idMovies: item.idMovies,
                    idCinema: item.idCinema,
                    movieName: nameMovies,
                    startDate: item.startDate,
                    date: startdates,
                    startTime: dates
                };
                data.push(objectItem);
            }
        }
    })

    const dataTemp = [];
    const groupByMake = groupByKey(data, 'startDate');

    Object.keys(groupByMake).forEach(key => {
        var object = {
            data: groupByMake[key]
        }
        dataTemp.push(object);
      });
  
    res.json(dataTemp);
}));

function groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if(obj[key] === undefined) return hash; 
        return Object.assign(hash, { [obj[key]] :( hash[obj[key]] || [] ).concat(obj)})
      }, {})
 }

module.exports = router;