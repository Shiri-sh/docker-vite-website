import { use } from "react";
import { useEffect, useState } from "react";
import './css/news.css';
  const News = () => {
    const [news, setNews] = useState([]);
     function fetchLatestNews() {
        fetch('http://localhost:4003/news/latest')
        .then(res => res.json())
        .then(data => setNews(data))
        .catch(err => console.error(err));

      } 
    useEffect(() => {
       fetchLatestNews(); // טעינה ראשונית
     },[]);

     return (
    <div>
      <span>Stay tuned for the latest updates and news articles.</span>
      {news.length === 0 && <p>Loading...</p>}
      <div>{news && news.map(article => (
        <div className="news-card" key={article.id}>
          <span>{article.publishedAt}</span>
          <h3>{article.title}</h3>
          <p>{article.description}</p>

        </div>
      ))}</div>
    </div>
  );
}   
export default News;