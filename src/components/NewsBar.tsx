import React, { useEffect, useState, useRef } from 'react';
import "./styled/NewsBar.css";

interface NewsItem {
    Name: string;
    BuyLink: string;
    Image: string;
    AVG_CallImmediateEffect: string;
    AVG_TracingImpact: string;
    AVG_FromCallToPeak: string;
    Volume: string;
    UpOrLow: string;
}

const NewsBar: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const tickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await fetch('https://shillguard-001-site6.etempurl.com/signals/GetTopTrendingTokens');
            const data = await response.json();
            setNewsItems(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
          }
        };
    
        fetchNews();
    }, []);

    return (
        <div className="news-bar-container">
            {loading ? (
                <p>Loading news...</p>
            ) : (
                <div className="news-bar-content" ref={tickerRef}>
                {newsItems.map((item, index) => (
                    <div className="news-item" key={index}>
                    <span className="news-index">#{index + 1}</span>
                    <img src={item.Image} alt={item.Name} className="news-image" />
                    <span>{item.Name}</span>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
    
}

export default NewsBar;