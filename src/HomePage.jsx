import { useState, useEffect } from "react";
import axios from 'axios';
const API_KEY = '2034e99964300703a65712f6dc21d5c8';
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=en&token=${API_KEY}`;
const OPENAI_API_KEY = KEY_OF_OPENAI;


function HomePage() {
    // const [articles, setArticles] = useState([
    //     {
    //       title: "Infosys Reports 25% Increase in Quarterly Profit",
    //       description: "Indian IT giant Infosys has reported a 25% rise in profit this quarter, driven by strong demand in digital services and cloud solutions.",
    //       image: "https://via.placeholder.com/400x200?text=Infosys+Profit",
    //       url: "https://example.com/infosys-profit"
    //     },
    //     {
    //       title: "India Clinches Series Victory Against Australia",
    //       description: "Team India wins the 5-match ODI series 3-2 after a thrilling final in Mumbai, with Virat Kohli scoring a decisive century.",
    //       image: "https://via.placeholder.com/400x200?text=India+Cricket+Victory",
    //       url: "https://example.com/india-australia-odi"
    //     },
    //     {
    //       title: "Global Markets Rally After Fed Signals Rate Pause",
    //       description: "Stock markets worldwide surged as the US Federal Reserve hinted at a pause in interest rate hikes to curb inflation.",
    //       image: "https://via.placeholder.com/400x200?text=Global+Markets",
    //       url: "https://example.com/markets-rally-fed"
    //     },
    //     {
    //       title: "NASA Plans 2026 Lunar Mission with AI-assisted Robots",
    //       description: "NASA's Artemis III mission will explore the moon using next-gen robots powered by artificial intelligence.",
    //       image: "https://via.placeholder.com/400x200?text=NASA+Moon+Mission",
    //       url: "https://example.com/nasa-lunar-2026"
    //     },
    //     {
    //       title: "Olympics 2028: India to Bid for Hosting Rights",
    //       description: "India has officially submitted its bid to host the 2028 Summer Olympics, proposing New Delhi as the primary venue.",
    //       image: "https://via.placeholder.com/400x200?text=Olympics+Bid+India",
    //       url: "https://example.com/olympics-india-bid"
    //     }
    //   ]);

    const [articles, setArticles] = useState([]);
    const [summaries, setSummaries] = useState({});

    useEffect(() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            setArticles(data.articles || []);
        })
        .catch(err => console.error('Error fetching news:', err));
    },[]);

    const summarizeArticle = async (article, index) => {
        try {
          const prompt = "Summarize the following news article in 3-4 lines:\n\n${article.title}\n\n${article.description || ''}";
          
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

    return(
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
    )
}
export default HomePage