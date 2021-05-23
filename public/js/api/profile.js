


function callApiProf(id) {
    var postApi = `http://localhost:3000/prof/api/${id}`


    function start() {
        getInfo(renderInfo);

        handleUpdateForm();
    }
    start();

    //FUNCTION 

    function getInfo(callback) {
        fetch(postApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err){
            alert(err);
        });
      }
    }

    function updateInfo(data, callback) {
        var options = {
            method: 'POST',
            body: JSON.stringify(data)
        }
        fetch(postApi, options)
            .then(function(response) {
                response.json();
            })
            .then(callback)
    }


    function renderInfo (posts){
        document.getElementById('fullname').value =  document.getElementById('title-fullname').innerText = posts.fullname;
        document.getElementById('email').value = posts.email;
        document.getElementById('numberphone').value = posts.numberphone;
    }
    
  function handleUpdateForm (){
        var updateBtn = document.querySelector('#save-btn');
        updateBtn.onclick = function() {
            var fullname = document.querySelector('input[name="fullname"]').value;
            var email = document.querySelector('input[name="email"]').value;
            var numberphone = document.querySelector('input[name="numberphone"]').value;
            var idUser = id;

            var formData = {
                idUser: idUser,
                fullname: fullname,
                email: email,
                numberphone: numberphone
            }
            updateInfo(formData);
        }
  }