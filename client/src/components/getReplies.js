import React, { useEffect, useState } from "react";
import axios from "axios";

const GetReplies = ({commentId}) => {
  const [replies, setReplies] = useState([]);

  useEffect( () => {
    (async () => {
      const {data} = await axios.get(`http://localhost:3001/reply/all`);
      const replyByCommentId = data.filter(reply => +commentId === +reply.commentId)
      setReplies(replyByCommentId)
    })();
  }, []);

  return (
    <div className="w-full m-3 mt-0 flex flex-col items-end">
      {replies && replies.map(reply => (
        <section key={reply.id} className="w-5/6 m-3 flex flex-col justify-between">
          <header className="flex justify-left mb-3 bg-indigo-500 p-4 text-white">
            <div className="flex w-1/2">
              <h3 className="mr-10 font-bold">{reply.username || 'Anonymous'}</h3>
              <h3 className="mr-10 font-bold">{reply.updated_at}</h3>
              <h3>{reply.email}</h3>
            </div>
          </header>
          <main className="mb-3 p-4">
            {reply.reply}
          </main>
        </section>
      ))}
    </div>
  );
};

export default GetReplies;