import React from "react";

class Page extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: %html% }} ></div>
    );
  }
}

export default Page;

