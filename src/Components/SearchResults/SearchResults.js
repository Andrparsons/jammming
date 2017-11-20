import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <input defaultValue={"Results"} disabled />
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default SearchResults;
