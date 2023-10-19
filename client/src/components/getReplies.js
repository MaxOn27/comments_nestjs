import React, { useEffect, useState } from "react";
import axios from "axios";

const GetReplies = ({commentId}) => {
  const [replies, setReplies] = useState([]);

  useEffect( () => {
    (async () => {
      const {data} = await axios.get(`http://localhost:3001/comments/${commentId}/replies`);
      setReplies(data)
    })();
  }, []);

  console.log(replies);

  return (
    <div>

    </div>
  );
};

export default GetReplies;