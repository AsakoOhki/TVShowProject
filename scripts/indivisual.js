$(function() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('id');



    const getTvShow = async() => {
        try {
            const renponse = await $.ajax({
                url: `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&api_key=${config.API_KEY}`,
                type: `GET`,
                dataType: 'json'
            })
            return sanitizeTvShowData(renponse);
        } catch (error) {

        }
    }

    const sanitizeTvShowData = (data) => {
        const TvShow = {
            title: data.name,
            image: data.backdrop_path,
            average: data.vote_average,
            seasons: data.number_of_seasons,
            overview: data.overview,
            homepage: data.homepage
        }
        return TvShow;
        
        
    }

    const displayData = (tvData) => {
    
       const image = $('<img >').attr('src', 'https://image.tmdb.org/t/p/w500' + tvData.image);
       $('.tvimage').append(image);
       const h1 = $('<h1></h1>').text('Title: ' + tvData.title);
       $('.tvinfo').append(h1);
       const average = $('<p></p>').text('Average: ' + tvData.average);
       $('.tvinfo').append(average);
       const seasons = $('<p></p>').text('Seasons: ' + tvData.seasons);
       $('.tvinfo').append(seasons);
       const overview = $('<p></p>').text('Overview: ' + tvData.overview);
       $('.tvinfo').append(overview);
       const homepage = $('<a></a>')
       .attr('href', tvData.homepage)
       .text("Homepage");
       $('.tvinfo').append(homepage);

    }

    getTvShow().then((value) => {
        displayData(value);
    })

    
}) 