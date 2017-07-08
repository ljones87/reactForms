import React from 'react';
import Songs from './Songs';
import axios from 'axios';
import AddSongForm from './AddSongForm';

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      playlist: {}
    }
    this.getPlayList = this.getPlayList.bind(this);
    this.addToPlaylistSongs = this.addToPlaylistSongs.bind(this);
  }


 addToPlaylistSongs(playlistId, songId) {
    axios.post(`/api/playlists/${playlistId}/songs`, { id: songId })
      .then(res => res.data)
      .then(song => {
        const playlist = this.state.playlist;
        const songs = this.state.playlist.songs;
        const newSongs = songs.concat(song);
        const newPlaylist = Object.assign({}, playlist, { songs: newSongs });
        this.setState({playlist: newPlaylist});
      });
  }

  getPlayList(playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        this.setState({ playlist })
      })
  }

  componentDidMount() {
    const playlistId = this.props.match.params.playlistId;
    this.getPlayList(playlistId)
  }

  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.match.params.playlistId;
    if (this.state.playlist.id !== nextPlaylistId) {
      this.getPlayList(nextPlaylistId)
    }
  }


  render() {
    const {playlist} = this.state;
    return(
      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} />
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
        <AddSongForm playlist={playlist} addToPlaylistSongs={this.addToPlaylistSongs}/>
      </div>
    );
  }

}
