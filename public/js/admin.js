window.onload = (e) => {
    Validator ({
        form: '#theater_form',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#th_id', 'Không được trống!'),
            Validator.isRequired('#th_name', 'Không được trống!'),
            Validator.isRequired('#th_adress', 'Không được trống!'),
            Validator.isRequired('#th_lat', 'Không được trống!'),
            Validator.isRequired('#th_lng', 'Không được trống!'),
            Validator.isRequired('#horizontal_size', 'Không được trống!'),
            Validator.isRequired('#vertical_size', 'Không được trống!'),
            Validator.isRequired('#th_subadress', 'Không được trống!')
        ],
        onSubmit: function (data) { 
            let option = document.getElementById('option-theater').value;
            let type = document.getElementById('option-type').value;
            var object = {
                data: data,
                option: option,
                type: type,
            };
            
            var options = {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            }

            fetch(`http://localhost:3000/admin/theater`, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                if(result === true)
                {
                    toast({
                        title: `Sucessfully!`,
                        message: `Thêm thành công`,
                        type: `success`,
                        duration: 3000
                    });
                    document.getElementById("theater_form").reset();
                    initMap();
                }
                else {
                    toast({
                        title: `Error!`,
                        message: `ID rạp này đã tồn tại!`,
                        type: `error`,
                        duration: 3000
                    });
                }
            })
            .catch(function(err){
                console.log(err);
            });
        }
    });

    callApiAdmin();
    initMap();
    function initMap() {
        var options = {
            zoom: 6,
            center: { lat: 11.4641169730402, lng: 106.62703354214707 }
        }
        var map = new google.maps.Map(document.getElementById("map"), options);
    }
}

const defaultBtn = document.querySelectorAll('#selectedFile');
const img = document.querySelectorAll('.poster-item-img');
const btnFal = document.querySelectorAll('.fa-plus');
const btnRemove = document.querySelectorAll('.fa-times');
const btnRemoveVid = document.querySelector('#btnRemoveVid');
const btnLoader = document.querySelector('.section-loader');

var _id = "";
const arrayData = [];

function OpenImage() 
{
    for(var i = 0; i< img.length; i++)
    {
        img[i].classList.add('show');
        btnFal[i].classList.add('active');
        btnRemove[i].classList.remove('active');
    }
}

$('.item-btn').click(function() {
    let index = $(this).parent().index();
    addEventClick(index);
})


$('.close-btn').click(function() {
    let index = $(this).parent().index();
    img[index].src = "";
    img[index].classList.remove('show');
    btnFal[index].classList.remove('active');
    btnRemove[index].classList.add('active');
})

$('.close-btn-video').click(function() {
    document.getElementById('trailer').src = "";
    document.getElementById('trailer').classList.remove('show');
    document.getElementById('icon-btn').classList.remove('active')
    btnRemoveVid.classList.add('active');
})


function addEventClick (index) {
    defaultBtn[index].click();
    defaultBtn[index].addEventListener('change', function() {
    const file = this.files[0];
    if(file)
        {
            const reader = new FileReader();
            reader.onload = function(){
            const result = reader.result;
            img[index].src = result;
            img[index].classList.add('show');
            btnFal[index].classList.add('active');
            btnRemove[index].classList.remove('active');
            }
            reader.readAsDataURL(file);
            return;
        }
    })
}

function isNumberKey(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function checksrcImage(arrayImage) {
    for(var i = 0; i < arrayImage.length; i++)
    {
        if (arrayImage[i].naturalWidth === 0 || arrayImage[i].src.includes('http://localhost:3000')) {
            return false;
        }
    }
    return true;
}

function bidingData(movieId) {
    var dataApi = 'http://localhost:3000/admin/api/data/' + movieId;
    btnLoader.classList.remove('hide');
    fetch(dataApi)
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                document.getElementById('ID').value = result.movieId;
                document.getElementById('name').value = result.movieName;
                document.getElementById('time').value = result.time;
                document.getElementById('startdate').value =  result.premiereDate.substring(0, 10);
                document.getElementById('enddate').value = result.endDate.substring(0, 10);
                document.getElementById('specific').value = result.specific;
                document.getElementById('describe').value = result.describe;
                document.getElementById('category').value = result.category;
                document.getElementById('directors').value = result.directors;
                document.getElementById('mainActor').value = result.mainActor;
                document.getElementById('chanelId').value = result.trailer;
                OpenImage();
                document.getElementById('item-1').src = result.poster1;
                document.getElementById('item-2').src = result.poster2;
                document.getElementById('item-3').src = result.poster3;
                document.getElementById('item-4').src = result.poster4;
                btnLoader.classList.add('hide');
                return;
            })
            .catch(function(err){
                console.log(err);
            });
}


function BtnRemove(idMovie) {
    var imageApi = `http://localhost:3000/admin/api/deleteMovie`;

    var options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idMovie }),
                }

    fetch(imageApi, options)
        .then(function(response) {
                return response.json();
            })
        .then(function(result) {
            callApiAdmin();
        })
        .catch(function(err){
                console.log(err);
            });
}

function SubmitForm(e) {
    let arrayImage = document.getElementsByClassName('poster-item-img');
    let startdate = document.getElementById('startdate').value;

    if(!checksrcImage(arrayImage))
    {
        $('html,body').animate({ scrollTop: 18 }, 'slow');
        e.preventDefault();
    }
    else{
            Validator ({
            form: '#more-film_form',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#ID', 'Tên film không được trống!'),
                Validator.isRequired('#name', 'Tên film không được trống!'),
                Validator.isRequired('#specific', 'Đặc tả không được trống!'),
                Validator.isRequired('#describe', 'Mô tả không được trống!'),
                Validator.isRequired('#time', 'Thời lượng được trống!'),
                Validator.isRequired('#startdate', 'Bạn chưa chọn ngày CC!'),
                Validator.isCheckDate('#startdate', 'Ngày CC phải lớn hơn ngày hiện tại!'),
                Validator.isRequired('#enddate', 'Bạn chưa chọn ngày KT!'),
                Validator.isCheck2Date('#enddate', startdate, 'Ngày KT phải lớn hơn ngày CC!'),
                Validator.isRequired('#category', 'Không được trống!'),
                Validator.isRequired('#directors', 'Không được trống!'),
                Validator.isRequired('#mainActor', 'Không được trống!'),
                Validator.isRequired('#chanelId', 'Không được trống!'),
            ],
            onSubmit: function (data) { 
                btnLoader.classList.remove('hide');
                const imageData = {
                    poster1: document.querySelector('.item-1').src,
                    poster2: document.querySelector('.item-2').src,
                    poster3: document.querySelector('.item-3').src,
                    poster4: document.querySelector('.item-4').src,
                }
                var options = {
                    method: 'POST', // or 'PUT'
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData = {
                        data,
                        imageData
                    }),
                }

                fetch(`http://localhost:3000/admin/movies`, options)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(result) {
                       if(result === true)
                       {
                            btnLoader.classList.add('hide');
                            window.location.reload(function() {
                                callApiAdmin();
                            }) 
                       }
                    })
                    .catch(function(err){
                            console.log(err);
                    });
            }
        });
    }
}

 
