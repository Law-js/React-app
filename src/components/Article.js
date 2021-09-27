import React from "react";
import { useState } from "react/cjs/react.development";
import axios from "axios";
import DeleteArticle from "./DeleteArticle";
// import getData from "../pages/News"; // fonctionne pas limite de react|APPRENDRE REDUX

// ({ article }) revient à faire const { article } = props
const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const dateParser = (date) => {
    // sans params {year, month, day} affiche 01/02/2000
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    // avec un vrai serveur pas besoin d'ajouter author etc...
    // content si content sur true ? sinon:
    const data = {
      author: article.author,
      content: editedContent ? editedContent : article.content,
      date: article.date,
    };
    axios.put("http://localhost:3003/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };
  // affichage data de db.json + edit
  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "#fff" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          onChange={(e) => setEditedContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : article.content}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : article.content}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteArticle id={article.id} />
      </div>
    </div>
  );
};

export default Article;
