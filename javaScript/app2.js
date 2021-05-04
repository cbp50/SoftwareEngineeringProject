import react, { Component } from 'react';
import {card} from 'antd';
import {Input, List, Avatar} from 'antd';
import 'antd/dist/antd.css';



const {Search} = Input;

class App extends Component {
    constructor(){
      super();
      const params = this.getHashParams();
      const token = params.access_token;
      this.state = {
        token: token,
        loggedIn: token ? true : false,
        searchResults: [] 
      }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
      }

      getSearchResults(query){
        const access_token = this.state.token;
        const searchQuery = query;
        console.log("Search Query: " + searchQuery.toString())
        const fetchURL = encodeURI(`q=${searchQuery}`);
        fetch(`https://api.spotify.com/v1/search?${fetchURL}&type=track`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access_token}`     
            }
          }
        )
        .then(response => {
          if(!response.ok){
            throw Error("Response Not Ok")
          }
          return response;
        })
        .then(response => response.json())
        .then(({tracks}) => {
          console.log(tracks.items[0].name);
          const results = [];
          tracks.items.forEach(element => {
            let artists = []
            element.artists.forEach(artist => artists.push(artist.name))
            results.push(      
              <List.Item key={element.uri}>
                <List.Item.Meta
                  avatar={<Avatar shape='square' size='large' src={element.album.images[0].url} />}
                  title={<p href="https://ant.design">{element.name}</p>}
                  description={artists.join(', ')}
                />
              </List.Item>);
          });
          this.setState({
            searchResults: results
          });
        })
        .catch(error => this.setState({
            searchResults: []
          })
        )
      }
}