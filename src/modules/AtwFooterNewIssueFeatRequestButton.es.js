import React from "react";

class AtwFooterNewIssueFeatRequestButton extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <a
          className={"btn " + (this.props.isDarkMode ? 'btn-dark' : 'btn-light')}
          href="https://liferay.slack.com/archives/CLANV2Q57"
          target="_blank"
          rel="noopener noreferrer"
        >
          New issue / Feature Request
        </a>
      </div>
    );
  }
}

export default AtwFooterNewIssueFeatRequestButton;
