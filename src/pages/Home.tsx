import { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

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

interface MainTableItem {
    ID: string;
    IDSignal: string;
    NameOfCallGroup: string;
    PairAddress: string;
    TokenHash: string;
    TokenCallTime: string;
    Chain: string;
    TokenName: string;
    SuccessRate: string;
    VolumeGenereted_h1: string;
    VolumeGenereted_h24: string;
    CommunityEngagement: string;
    PriceUSD: string;
    TotalSuply: string;
    TotalMarketCap: string;
    BuyLink: string;
    IdCryptoTokenCall: string;
    Timestamp: string;
    CryptoTokenCall: string;
    Holders: string;
    TotalMarketCapIN: string;
    ImpactOfCall: string;
    ATX: string;
    FromCalltoPeak: string;
    FromCallToPeak_double: number;
    Source: string;
    AVG_CallImmediateEffect: number;
    AVG_TracingImpact: number;
    AVG_FromCallToPeak: number;
    CryptoGroupInfo: string;
    CryptoGroupImage: string;
    TelegramLink: string;
    TwitterLink: string;
    OrderNumber: number;
    isActive: boolean;
    isTop3: boolean;
    TokenImage: string;
}

const Home = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [tableData, setTableData] = useState<MainTableItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);
    const tickerRef = useRef<HTMLDivElement | null>(null); // Ref for the ticker content

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

        const fetchTableData = async () => {
            try {
                const response = await fetch('https://shillguard-001-site6.etempurl.com/signals/GetAllSignals');
                const data = await response.json();
                setTableData(data);
                setTableLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setTableLoading(false);
            }
        };

        fetchTableData();
    }, []);


    return(
        <div>
            <div className="news-bar-container">
                {loading ? (
                    <p>Loading news...</p>
                ) : (
                    <div className="news-bar-content"  ref={tickerRef}>
                        {newsItems.map((item, index) => (
                            <div className="news-item" key={index}>
                                <span className='news-index'>#{index + 1}</span>
                                <img src={item.Image} alt={item.Name} className="news-image" />
                                <span>{item.Name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='table-container'>
                {tableLoading ? (
                    <p>Loading data...</p>
                ) : (
                    <div className="table-content">
                        {tableData.map((item, index) => (
                            <div className={`table-item ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
                                <div>
                                    <div className='table-item-first-row'>
                                        <img src="https://via.placeholder.com/50" alt={""} className="table-image" />
                                        <div className='table-item-title'>
                                            <div className='table-item-title-inner'>
                                                #{index + 1}. {item.NameOfCallGroup}
                                                <div className='table-item-social'>
                                                    {item.TelegramLink ? <TelegramIcon className='telegram' /> : <></>}
                                                    {item.TwitterLink ? <XIcon className='twitter' /> : <></>}
                                                </div>
                                            </div>
                                            <div className='table-item-second-row'>
                                                <div className='table-item-token-name'><b>Token:</b> <div className='inner'>{item.TokenName}</div></div>
                                                <div className='table-item-timestamp'>{item.Timestamp}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-item-data'>
                                        <div>
                                            <div>CallMCp</div>
                                            <div>{item.TotalMarketCapIN}</div>
                                        </div>
                                        <div>
                                            <div>MktCp</div>
                                            <div>{item.TotalMarketCap}</div>
                                        </div>
                                        <div>
                                            <div>Vol.</div>
                                            <div>{item.VolumeGenereted_h1}</div>
                                        </div>

                                        <div>
                                            <div>CallEfc</div>
                                            <div className={parseFloat(item.ImpactOfCall) >= 0 ? "green" : "red"}>{item.ImpactOfCall}</div>
                                        </div>

                                        <div>
                                            <div>Trace</div>
                                            <div className={parseFloat(item.SuccessRate) >= 0 ? "green" : "red"}>{item.SuccessRate}</div>
                                        </div>

                                        <div>
                                            <div>Peak</div>
                                            <div className={parseFloat(item.FromCalltoPeak) >= 0 ? "green" : "red"}>{item.FromCalltoPeak}</div>
                                        </div>
                                    </div>
                                    <div className='table-item-buttons'>
                                        <div className='table-item-buy'><a href={item.BuyLink}>Buy</a></div>
                                        <div className='table-item-chart'><a href={item.BuyLink}>Chart</a></div>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Home;