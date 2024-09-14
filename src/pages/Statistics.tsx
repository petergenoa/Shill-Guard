import { useEffect, useState } from "react";
import "./styles/Statistics.css"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TokenPopup from "../components/TokenPopup";

interface TopToken {
    Name: string;
    BuyLink: string;
    Image: string;
    AVG_CallImmediateEffect: string;
    AVG_TracingImpact: string;
    AVG_FromCallToPeak: string;
    volume: number;
    UpOrLow: string;
}

const Statistics = () => {
    const [topToken, setTopToken] = useState<TopToken[]>();
    const [topCaller, setTopCallers] = useState<TopToken[]>();
    const [loading, setLoading] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [queryString, setQueryString] = useState("");

    useEffect(() => {
        const fetchTopSignals = async () => {
          try {
            const response = await fetch(`https://shillguard-001-site6.etempurl.com/signals/GetTop5Signals`);
            const data = await response.json();
            setTopToken(data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
          }
        };
    
        fetchTopSignals();

        const fetchTopCallers = async () => {
            try {
              const response = await fetch(`https://shillguard-001-site6.etempurl.com/signals/GetTop5Callers`);
              const data = await response.json();
              setTopCallers(data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching news:', error);
              setLoading(false);
            }
          };
      
          fetchTopCallers();
    }, []);

    const handleSearch = (query: string) => {
        console.log('Search initiated with query:', query);
        setQueryString(query);
        setIsPopupVisible(true);
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const getImageNameFromUrl = (url: string) => {
        const parts = url.split('/');
        const imageName = parts[parts.length - 1];
        const imagePath = `/Shill-Guard/${imageName}`;
        return imagePath;
    };

    return(
        <div className="statistics">
            <h2>TOP 5 Tokens</h2>
            {topToken ?
            <div>
                {topToken.map((item, index) => (
                    <div className={`top-token-item ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
                        <div className="top-token-item-first-row">
                            <div className="name-image">
                                <img src={item.Image} alt={item.Name} />
                                <div className="title" onClick={() => handleSearch(item.Name)}>#{index + 1} {item.Name}</div>
                            </div>
                            <div className='top-token-buy'><a href={item.BuyLink}><AttachMoneyIcon />Buy</a></div>
                        </div>
                        <div className='table-item-data'>
                            <div>
                                <div className='ticker-title'>CallEfc</div>
                                <div className="green">{item.AVG_CallImmediateEffect}%</div>
                            </div>
                            <div>
                                <div className='ticker-title'>Peak</div>
                                <div className="green">{item.AVG_FromCallToPeak}%</div>
                            </div>
                            <div>
                                <div className='ticker-title'>Trace</div>
                                <div className="green">{item.AVG_TracingImpact}%</div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            :
                <div>Loading Top 5 Tokens!</div>
            }

            <h2 className="second-title">TOP 5 Callers</h2>
            {topCaller ?
            <div>
                {topCaller.map((item, index) => (
                    <div className={`top-token-item ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
                        <div className="top-token-item-first-row">
                            <div className="name-image">
                                <img src={getImageNameFromUrl(item.Image)} alt={item.Name} />
                                <div className="title">#{index + 1} {item.Name}</div>
                            </div>
                        </div>
                        <div className='table-item-data'>
                            <div>
                                <div className='ticker-title'>CallEfc</div>
                                <div className="green">{item.AVG_CallImmediateEffect}%</div>
                            </div>
                            <div>
                                <div className='ticker-title'>Peak</div>
                                <div className="green">{item.AVG_FromCallToPeak}%</div>
                            </div>
                            <div>
                                <div className='ticker-title'>Trace</div>
                                <div className="green">{item.AVG_TracingImpact}%</div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            :
                <div>Loading Top 5 Callers!</div>
            }
            <TokenPopup query={queryString} isVisible={isPopupVisible} onClose={togglePopup} />
        </div>
    )
}
export default Statistics;