
    function callApiAdmin() {
    
    var getApi = `http://localhost:3000/admin/api/data`;

    function start() {
        getInfo(renderInfo);
        getDistrist(renderDistrict);
    }

    start();

    
    function getInfo(callback) {
        fetch(getApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err){
            console.log(err);
        });
      }

      function getDistrist(callback) {
        fetch('http://localhost:3000/admin/api/district')
        .then(function(response) {
            return response.json();
        })
        .then(callback)
        .catch(function(err){
            console.log(err);
        });
      }

    function renderInfo(posts)
    {
       var listMovies = document.querySelector('#list-movies');
        if(posts === null)
        {
            listMovies.innerHTML = `<tr>
                                        <td colspan="6" class="text-center">You haven't added any movies yet!</td>
                                    </tr>`
        }
        else
        {
            var htmls = posts.map(function(post) {
                return `
                <tr class="btn-tr" onclick="bidingData('${post.movieId}')">
                    <th scope="row">${post.movieId}</th>
                    <td>${post.movieName}</td>
                    <td>${post.time}</td>
                    <td>${post.premiereDate.substring(0, 10)}</td>
                    <td>${post.endDate.substring(0, 10)}</td>
                    <td><a onclick="BtnRemove('${post.movieId}')" class="btn btn-remove"><i class="fal fa-minus-circle"></i></a></td>
                </tr>
                `;
           });
           listMovies.innerHTML = htmls.join('');
        }
    }

    function renderDistrict(posts)
    {
       var listDistrict = document.querySelector('#list-district');
       var listDistrictTheater = document.querySelector('#option-theater');
        if(posts === null)
        {
            listDistrict.innerHTML = `<tr>
                                        <td colspan="3" class="text-center">You haven't added any distrist yet!</td>
                                    </tr>`
        }
        else
        {
            var htmls = posts.map(function(post) {
                return `
                <tr class="btn-tr" onclick="">
                    <th scope="row">${post.id}</th>
                    <td>${post.district}</td>
                    <td><a onclick="BtnRemoveDistrist('${post.id}')" class="btn btn-remove-distrist"><i class="fal fa-minus-circle"></i></a></td>
                </tr>
                `;
           });
           listDistrict.innerHTML = htmls.join('');

           var htmls_theater = posts.map(function(post) {
                    return `
                    <option class="provinceId" value="${post.id}">${post.district}</option>
                `;
           })
           listDistrictTheater.innerHTML = htmls_theater.join('');
        }
    }



}