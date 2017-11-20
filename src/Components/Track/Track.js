import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack}>-</a>
      );
    } else {
      return (
        <div>
          <a className="Track-action" onClick={this.addTrack}>+</a>
        </div>
      );
    }
  }

  renderPreview() {
    if (!this.props.isRemoval) {
      return (
        <div className="embed-container">
          <iframe
            title={this.props.track.name}
            src={`https://open.spotify.com/embed?uri=spotify:track:${this.props.track.id}`}
            frameBorder="0"
            allowTransparency="true"
          />
        </div>
      )
    } else {
      return (
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
      )
    } 
  }

  render() {
    return (
      <div className="Track">
        {this.renderPreview()}
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
