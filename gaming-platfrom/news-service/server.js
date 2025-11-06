const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const axios = require("axios");
const https = require('https');

app.use(express.json());
app.use(cors());
const NEWS_API_KEY = process.env.NEWS_API_KEY; 
app.get('/news/health', (req, res) => {
  res.json({ message: 'news Service is alive!' });
});

let cachedNews = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; 

app.get('/news/latest', async(req, res) => {

     const now=Date.now();
     if(cachedNews && (now - lastFetchTime) < CACHE_DURATION){
       return res.json(cachedNews);
     }
     try{
      const agent = new https.Agent({ rejectUnauthorized: false });
      const response = await axios.get(`https://newsapi.org/v2/everything?q=gaming OR video games OR playstation OR xbox OR pc games&language=en&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`, { httpsAgent: agent });
      const articles = response.data.articles.map((a) => ({
          title: a.title,
          description: a.description,
          url: a.url,
          image: a.urlToImage,
          source: a.source.name,
          publishedAt: a.publishedAt.split('T')[0],
      }));
      cachedNews = articles;
      lastFetchTime = now;
      res.json(articles);
     }catch(error){
      console.error('Error fetching news:', error.message);
      res.status(500).json({ error: 'Failed to fetch news '+error});
     }
});
app.listen(port, () => console.log(`news Service running on port ${port}`));
