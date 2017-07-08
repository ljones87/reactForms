import React from 'react';
import axios from 'axios';


export default class AddSongForm extends React.Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      songId: 1
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ songId: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const playlistId = this.props.playlist.id;
    const songID = this.state.songId;
    this.props.addToPlaylistSongs(playlistId, songID);

  }

  componentDidMount() {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({ songs })
      })
  }



  render() {
    return (
      <div className="well">
        <form onSubmit={this.handleSubmit} className="form-horizontal" noValidate name="songSelect">
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select onChange={this.handleChange} className="form-control" name="song">
                  {
                    this.state.songs.map(song => {
                      return (<option key={song.id} value={song.id}>      {song.name}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}
