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

    


    // const checkFavourite = (item) => {
    //     // console.log(item.isbn);
    //     const index = favouriteBooks.findIndex(e => e.isbn === item.isbn);
    //     return (index < 0) ? false : true;
    
    // }



//list_name
// published_date
// rank
// primary_isbn10
// title
// author
// description
// book-image
// Optional : amazon_product_url



function displayData(items) {
   
    let showData = [];
    
    value => {
    displayData(value);
    showData = value;
    }


        items.forEach((shows) => {
            // const isFavourite = checkFavourite(books);
            // const itemDiv = $('<div class="book-item"></div>').attr('id', books.isbn);
            // const title = $('<h2></h2>').text(books.title);
            // itemDiv.append(title);
            // const rank = $('<h3></h3>').text(books.rank);
            // itemDiv.append(rank);
            // const icon = isFavourite ? $('<i class="fas fa-heart favourite"></i>') : $('<i class="fas fa-heart"></i>');
            // itemDiv.append(icon);
            // const author = $('<h4></h4>').text(`Author : ${books.author}`);
            // itemDiv.append(author);
            const innerDiv = $('<div class="inner-item"></div>')

            const img = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500/'+shows.image)
            innerDiv.append(img);
            // const desc = $('<p></p>').text(books.description);
            // innerDiv.append(desc);
            // itemDiv.append(innerDiv);
            // const url = $('<a> Buy this book </a>').attr('href',books.url);
            // url.attr('target',"_blank")
            // itemDiv.append(url);
            $('.container').append(innerDiv)
        })

    }
  

    let showData = [];
    getShows()
    .then(value => {
        displayData(value);
        showData = value;
    })
    // .then(() => {
    //    $('.fa-heart').click(e => {
    //        let target = $(e.target);
    //        let isFav = target.hasClass('favourite')
    //     // let targetParent = target.closest('div');
    //     let targetId = target.parent().attr('id');
    //     const favBook = bookData.find(e => e.isbn === targetId);
    //     const favIndex = favouriteBooks.findIndex(e => e.isbn === targetId);
    //     if (!isFav) {
    //         favouriteBooks.push(favBook);
    //     } else {
    //         favouriteBooks.splice(favIndex, 1)
    //     }               
    //     localStorage.setItem('favourite', JSON.stringify(favouriteBooks));
    //     target.toggleClass('favourite');                   
    //    })  
    // })
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
                
                rate: d.vote_average,
                name: d.name,
                overview: d.overview,
                image: d.poster_path,
            })
        })
        return shows;
    }

})