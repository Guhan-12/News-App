import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const API_KEY = '2034e99964300703a65712f6dc21d5c8';
const OPENAI_API_KEY = KEY_OF_OPENAI;

function NewsPage() {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);
    const [summaries, setSummaries] = useState({});

    useEffect(() => {
        const url = category === 'india' ? `https://gnews.io/api/v4/search?q=example&lang=en&country=in&max=10&apikey=${API_KEY}` : `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`;
        
        console.log(category);
        fetch(url)
          .then(res => res.json())
          .then(data => setArticles(data.articles || []))
          .catch(err => console.error('Error fetching news:', err));
    }, [category]);
    

    const summarizeArticle = async (article, index) => {
    try {
      const prompt = `Summarize the following news article in 3-4 lines:\n\n${article.title}\n\n${article.description || ''}`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant that summarizes news articles." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const summary = response.data.choices[0].message.content;
      setSummaries(prev => ({ ...prev, [index]: summary }));
    } catch (error) {
      console.error("Error summarizing:", error);
      setSummaries(prev => ({ ...prev, [index]: "Error generating summary." }));
    }
  };

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <div className="news-card" key={index}>
          <img src={article.image} alt="news" className="news-image" />
          <div className="news-content">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">READ MORE →</a>

            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => summarizeArticle(article, index)} className="summarise-button">
                Summarize
              </button>
              {summaries[index] && (
                <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                  <strong>Summary:</strong> {summaries[index]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsPage;
