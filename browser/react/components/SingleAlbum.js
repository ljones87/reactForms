import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor () {
    super();
    this.state = {
      album: {}
    };
    this.getAlbum = this.getAlbum.bind(this);
  }

  componentDidMount () {
    const albumId = this.props.match.params.albumId;
    this.getAlbum(albumId);

  }

  getAlbum(albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({ album })
      );
  }

  componentWillReceiveProps (nextProps) {
    const nextAlbum = nextProps.match.params.albumId;
    if (this.state !== nextAlbum) {
      this.getAlbum(nextAlbum)
    }
  }

  render () {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
