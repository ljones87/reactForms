import React from 'react';
import Songs from './Songs';
import axios from 'axios'

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      playlist: {}
    }
  }

  componentDidMount() {
    const playlist = this.props.match.params.playlistId;

    axios.get(`/api/playlists/${ playlist }`)
      .then(res => res.data)
      .then(playlist => this.setState(playlist))
      .catch(err => console.log(err));
  }

  render() {

    return(
      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/* something to do with songs here? */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
      </div>
    );
  }

}
