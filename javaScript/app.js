const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

const APIController = (function() {

const clientID = " ";
const clientSecret = " ";

const _getToken = async () =>  {

const result = await fetch(`https://accounts.spotify.com/api/token` , { 

method: 'POST', 
headers: { 
    'Content-Type' : 'Application/x-www-form-urlencoded',
    'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
},
body: 'grant_type = client_credentials'
});
const data = await result.json();
return data.access_token;

}


const _getGenres = async (token) => {

const result =  await fetch(`https://api.spotify.com/v1/browse/categories?locale.sv_US`, {
    method: 'GET',
    headers: {
        'Authorization' : 'Bearer ' + token
    }
});
const data = await result.json();
return data.catagories.items;

} 

const _getPlaylist = (token, genreID) => {

    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`, {

    method: 'GET',
    headers: {'Authorization' : 'Bearer ' + token }
    });
    const data = await result.json();
    return data.playlist.items;

}
const _getTracks = async (token, tracksEndPoint) => {

    const limit = 10;

    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token }
    });
    const data = await result.json();
    return data.items;
}

const _getTrack = async (token, tracksEndPoint) => {

    const result = await fetch(`${tracksEndPoint}`, {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token }
    });
    const data = await result.json();
    return data;
}
return {
    getToken(){
        return _getToken;
    },
    getGenres(token){
        return _getGenres;
    },
    getPlaylistByGenre(token, genreID){
        return _getPlaylist;
    },
    getTracksByPlaylist(token, tracksEndPoint){
        return _getTracks;
    },
    getTrack(token, tracksEndPoint){
        return _getTrack;
    }

}

})();

const UIController = (function(){

    const DOMElements = {
        searchBar = '#searchBar'
    }

    return{

            songs: document.querySelector


    }



})();