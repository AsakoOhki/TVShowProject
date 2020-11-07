$(function() {
    // name of TV Show, the image of
    // TV Show (backdrop_path), TV show`s rate
    let rate;
    let name; 
    //let favouriteShows = localStorage.getItem('favourite') ? JSON.parse(localStorage.getItem('favourite')) : [];

    const getShows = async() => {
        try {
            var result = await $.ajax({
                url: `https://api.themoviedb.org/3/tv/popular?api_key=${config.API_KEY}`,
                type: 'GET',
                dataType: 'json'
            })
            rate = result.results.vote_average;
            name = result.results.name;
            return sanitizeData(result)
            //console.log(result)
        } catch(error) {
            console.log(error);
            return error
        }
    }

    

// Optional : amazon_product_url



function displayData(items) {
   
    let showData = [];
    
    value => {
    displayData(value);
    showData = value;
    }


        items.forEach((shows) => {
            // const isFavourite = checkFavourite(books);
            
            
            // itemDiv.append(icon);
            // const author = $('<h4></h4>').text(`Author : ${books.author}`);
            // itemDiv.append(author);
            const innerDiv = $('<div class="inner-item"></div>')

            const img = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500/'+shows.image)
            innerDiv.append(img);


            
            const itemDiv = $('<div class="overlay"></div>').attr('id', shows.id);

            const title = $('<h2 class="text"></h2>').text(shows.name);
            itemDiv.append(title);
            const rank = $('<h3 class="text"></h3>').text(shows.rate);
            itemDiv.append(rank);
            const icon = $(`<a href='' class='bt-favorite' title='Add to Favorite' data-id='${shows.id}' data-title="${shows.name}" data-score="${shows.rate}" data-image="${shows.image}" data-overview="${shows.overview}">
            <i class="fas fa-heart"></i></a>`);

            itemDiv.append(icon);
            innerDiv.append(itemDiv);


           

            // const desc = $('<p></p>').text(books.description);
            // innerDiv.append(desc);
            // itemDiv.append(innerDiv);
            // const url = $('<a> Buy this book </a>').attr('href',books.url);
            // url.attr('target',"_blank")
            // itemDiv.append(url);
            $('#tvimages').append(innerDiv)
        })

    }
  

    let showData = [];
    getShows()
    .then(value => {
        displayData(value);
        showData = value;
    })
    .then(() => {

        checkFavoriteTVShows();
    })
    .catch(error => {
        displayError();
    })

        

function sanitizeData(response) {
        let shows = [];

        // let listName = response.results.list_name;
        // let date = response.results.published_date;
        // var element = document.getElementById("id01");
        // element.innerHTML = "The best seller " + listName + " Books published in " + date;

        response.results.forEach((d) => {
            shows.push({
                id: d.id,
                rate: d.vote_average,
                name: d.name,
                overview: d.overview,
                image: d.poster_path,
            })
        })
        return shows;
    }

})