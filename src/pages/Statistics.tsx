import { useEffect, useState } from "react";
import "./styles/Statistics.css"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TokenPopup from "../components/TokenPopup";
import LoadingPopup from "../components/LoadingPopup";
import GroupPopup from "../components/GroupPopup";

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
    const [isGroupPopupVisible, setIsGroupPopupVisible] = useState(false);
    const [queryGroupString, setQueryGroupString] = useState("");
    const [isLoadingVisible, setIsLoadingVisible] = useState(true);

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
              setIsLoadingVisible(false);
            } catch (error) {
              console.error('Error fetching news:', error);
              setLoading(false);
              setIsLoadingVisible(false);
            }
          };
      
          fetchTopCallers();
    }, []);

    const handleSearch = (query: string) => {
        console.log('Search initiated with query:', query);
        setQueryString(query);
        setIsPopupVisible(true);
    };

    const handleGroupSearch = (query: string) => {
        console.log('Search group initiated with query:', query);
        setQueryGroupString(query);
        setIsGroupPopupVisible(true);
    };
    
    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const toggleGroupPopup = () => {
        setIsGroupPopupVisible(!isGroupPopupVisible);
    }

    const getImageNameFromUrl = (url: string) => {
        const parts = url.split('/');
        const imageName = parts[parts.length - 1];
        const imagePath = `/Shill-Guard/${imageName}`;
        return imagePath;
    };

    return(
        <div className="statistics">
            <div className="stats-top5-tokens">
                <h2>TOP 5 Tokens</h2>
                {topToken ?
                <div className="top-table-container">
                    <table className="top-callers-table">
                        <thead>
                        <tr>
                            <th className='ticker-title'>Name</th>
                            <th className='ticker-title'>Peak</th>
                            <th className='ticker-title'>Trace</th>
                        </tr>
                        </thead>
                        <tbody>
                        {topToken.map((item, index) => (
                            <tr className="" key={index}>
                                <td onClick={() => handleSearch(item.Name)}>#{index + 1} {item.Name}</td>
                                <td className="green">{item.AVG_FromCallToPeak}%</td>
                                <td className="green">{item.AVG_TracingImpact}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                :
                    <div>Loading Top 5 Tokens!</div>
                }
            </div>
            
            {topCaller ?
                <div className="stats-top5-tokens">
                    <h2>TOP 5 Callers</h2>
                    {topCaller ?
                        <div className="top-table-container">
                            <table className="top-callers-table">
                                <thead>
                                <tr>
                                    <th className='ticker-title'>Name</th>
                                    <th className='ticker-title'>CallEfc</th>
                                    <th className='ticker-title'>Peak</th>
                                    <th className='ticker-title'>Trace</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topCaller.map((item, index) => (
                                    <tr className="" key={index}>
                                        <td onClick={() => handleGroupSearch(item.Name)}>#{index + 1} {item.Name}</td>
                                        <td className="green">{item.AVG_CallImmediateEffect}%</td>
                                        <td className="green">{item.AVG_FromCallToPeak}%</td>
                                        <td className="green">{item.AVG_TracingImpact}%</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    :
                        <div>Loading Top 5 Tokens!</div>
                    }
                </div>
            :
                <div>Loading Top 5 Callers!</div>
            }

            <LoadingPopup isVisible={isLoadingVisible} />
            <TokenPopup query={queryString} isVisible={isPopupVisible} onClose={togglePopup} />
            <GroupPopup query={queryGroupString} isVisible={isGroupPopupVisible} onClose={toggleGroupPopup} />
        </div>
    )
}
export default Statistics;