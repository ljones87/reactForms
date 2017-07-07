import React, {Component} from 'react';
import axios from 'axios';

export default class NewPlaylist extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      edited: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      edited: true
    });
  }

  handleSubmit(event) {
    this.props.addToPlaylist(this.state.input);
    this.setState({
      input: ''
    })
    event.preventDefault();
  }

  render() {


    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input value={this.state.input} className="form-control" type="text" onChange={this.handleChange} />
                  {(!this.state.input && this.state.edited) && <div className="alert alert-warning">Please enter a name</div>}
                  {this.state.input.length > 16 && <div className="alert alert-warning">Limit 16 characters</div>}
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button disabled={!this.state.input || this.state.input.length > 16} type="submit" className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }

}
