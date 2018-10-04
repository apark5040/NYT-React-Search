import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 300, paddingTop: 120, textAlign: "center", backgroundImage: "url('https://images.pexels.com/photos/1229183/pexels-photo-1229183.jpeg')", backgroundSize: "cover" }}
    className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
