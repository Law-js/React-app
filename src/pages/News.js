import Logo from "../components/Logo";
import Navigation from "./../components/Navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Article from "../components/Article";

const News = () => {
  // hook => const newsData ne peut que être modifé via setNewsData
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false); // textarea min 140 caractères

  useEffect(() => {
    getData();
  }, []);

  // get datas from db.json
  const getData = () => {
    axios
      .get("http://localhost:3003/articles")
      .then((res) => setNewsData(res.data));
  };

  // post data to db.json
  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3003/articles", {
          author,
          content,
          date: Date.now(),
        })
        .then(() => {
          // remise à zéro après post
          setAuthor(""); // + value={author} dans input
          setContent(""); // + value={content} dans input
          setError(false);

          // refresh data
          getData();
        });
    }
  };
  // textarea => pour injecter du style => style={{}}
  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>News</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Nom"
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message"
          value={content}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default News;
