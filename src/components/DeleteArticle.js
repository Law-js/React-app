import React from "react";
import axios from "axios";

const DeleteArticle = ({ id }) => {
  const handleDelete = () => {
    axios.delete("http://localhost:3003/articles/" + id);
    window.location.reload(); // reload la page | avec redux pas besoin
  };

  return (
    <button
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer l'article ?")) {
          handleDelete();
        }
      }}
    >
      Supprimer
    </button>
  );
};

export default DeleteArticle;
