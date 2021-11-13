import { Post } from "./Post/Post";
import React from "react";
import "./App.css";
import { Stories } from "./Stories/Stories";


export function HomePage({ isExtended, setIsExtended }) {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    fetch("../Data/MOCK_DATA.json" , {
      method: "GET"
    }).then((res) => res.json())
    .then((res) => setData(res))
  }, []);
  console.log(data)
  return (
    <div className="content-section">
      <Stories />
      {data.map((datum, index) => (
        <Post
          datum={datum}
          comments={datum.comments}
          isExtended={isExtended}
          setIsExtended={setIsExtended}
          index={index}
        />
      ))}
    </div>
  );
}
