import React from "react";

const Home = () => {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <a href="/encode">
        <button>Encode</button>
      </a>
      <a href="/decode">
        <button>Decode</button>
      </a>
    </div>
  );
};

export default Home;
