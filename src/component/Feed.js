import React, { useEffect, useState } from "react";
import "../Css/Feed.css";
import db from "../firebase";
import Post from "./Post";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import QuoraBox from "./QuoraBox";
import data from "../data/data.json";
function Feed({ posts, setPosts, setIsModalOpen, currentLink }) {
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => {
          console.log(doc.id);
          console.log(doc.data());
          return {
            id: doc.id,
            questions: doc.data(),
          };
        })
      );
    });
    return () => unsubscribe();
  }, [currentLink]); // HomeIcon
  console.log(posts);
  //return (<div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>Loading...</div>)
  return (
    <div className="feed">
      <QuoraBox setIsModalOpen={setIsModalOpen} />
      {posts
        .filter((post) => {
          console.log(post, "look inside the post for id");
          console.log(currentLink, post.questions.question, data[currentLink]);
          if (currentLink === null || currentLink === "HomeIcon") return true;
          if (data[currentLink].includes(post.questions.question)) {
            console.log("exists");
            return true;
          }
          return false;
        })
        .toSorted((a, b) => {
          return 1;
        })
        .map(({ id, questions }) => (
          <Post
            key={id}
            Id={id}
            image={questions.imageUrl ? questions.imageUrl : null}
            question={questions.question}
            timestamp={questions.timestamp}
            quoraUser={questions.user}
          />
        ))}
    </div>
  );
}

export default Feed;
