import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';
import AllAlbums from './AllAlbums';
import Songs from './Songs';

class SingleArtist extends React.Component {

  constructor () {
    super();
    this.state = {
      artist: {}
    };
    this.getArtist = this.getArtist.bind(this);
  }

  getArtist(artist, mainPath, paths) {
   Bluebird
      .map(paths, path => axios.get(path))
      .map(res => res.data)
      .spread((artist, albums, songs) => {
        artist.albums = albums;
        artist.songs = songs;
        this.setState({ artist });
      });
  }
  componentDidMount () {
    const artist = this.props.match.params.artistId;
    const mainPath = `/api/artists/${artist}`;
    const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
    this.getArtist(artist, mainPath, paths);

  }



  componentWillReceiveProps (nextProps) {
    const nextArtist = nextProps.match.params.artistId;
    const mainPath = `/api/artists/${nextArtist}`;
    const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
    if (this.state.artist.name !== nextArtist.name) {
       this.getArtist(nextArtist, mainPath, paths);
    }
  }


  render () {

    const artist = this.state.artist;
    const albums = artist.albums || [];
    const songs = artist.songs || [];

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        <Switch>
          <Route path={`/artists/${artist.id}/albums`} render={() => (
            <AllAlbums albums={albums} />
          )} />
          <Route path={`/artists/${artist.id}/songs`} render={() => (
            <Songs songs={songs} />
          )} />
        </Switch>
      </div>
    );
  }
}

export default SingleArtist;

