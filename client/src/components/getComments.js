import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash } from "heroicons-react";

const GetComments = () => {
  const [comments, setComments] = useState([]);

  useEffect( () => {
    (async () => {
      const {data} = await axios.get("http://localhost:3001/comments");

      setComments(data)
    })();
  }, []);

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:3001/comment/${id}`);
    window.location.reload();
  };


  return (
    <section className="w-full p-4">
      {comments && comments.map(comment => (
        <div key={comment.id} className="w-full m-3 flex flex-col justify-between">
          <header className="flex justify-left mb-3 bg-neutral-200 p-4">
            <div className="flex w-1/2">
              <h3 className="mr-10 font-bold">{comment.username || 'Anonymous'}</h3>
              <h3 className="mr-10 font-bold">{comment.updated_at}</h3>
              <h3>{comment.email}</h3>
            </div>
            <div className="w-1/2 flex justify-end">
              <button onClick={(event) => {
                event.preventDefault();
                return deleteComment(comment.id);
              }} className="text-red-500"><Trash/></button>
            </div>
          </header>
          <main className="mb-3 p-4">
            {comment.comment}
          </main>
          <footer className="mb-10 p-4">
            <button className="font-bold bg-indigo-500 hover:bg-indigo-400 text-white p-2 w-36">Reply</button>
          </footer>
        </div>
      ))}
    </section>
  );
};

export default GetComments;