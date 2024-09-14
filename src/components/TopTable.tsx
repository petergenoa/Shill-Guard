import { useEffect, useState } from "react";
import "./styled/TopTable.css";
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import TokenPopup from "./TokenPopup";

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
    TokenSymbol: string;
}

const TopTable: React.FC = () => {
    const [tableData, setTableData] = useState<MainTableItem[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [queryString, setQueryString] = useState("");

    useEffect(() => {
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
        <div className='table-container'>
                {tableLoading ? (
                    <p>Loading data...</p>
                ) : (
                    <div className="table-content">
                        {tableData.map((item, index) => (
                            <div className={`table-item ${index % 2 === 0 ? "even-row" : "odd-row"}`} key={index}>
                                <div>
                                    <div className='table-item-first-row'>
                                        <img src={`${getImageNameFromUrl(item.CryptoGroupImage)}`} alt={""} className="table-image" />
                                        <div className='table-item-title'>
                                            <div className='table-item-title-inner'>
                                                <span className='index-title'><span>#{index + 1}. </span>{item.NameOfCallGroup}</span>
                                                <div className='table-item-social'>
                                                    {item.TelegramLink ? <TelegramIcon className='telegram' /> : <></>}
                                                    {item.TwitterLink ? <XIcon className='twitter' /> : <></>}
                                                </div>
                                            </div>
                                            <div className='table-item-second-row'>
                                                <div className='table-item-token-name'><b className='index-title'>Token:</b> <div className='inner' onClick={() => handleSearch(item.TokenName)}>${item.TokenSymbol}</div></div>
                                                <div className='table-item-timestamp'>{item.Timestamp} UTC</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-item-data'>
                                        <div>
                                            <div className='ticker-title'>CallMCp</div>
                                            <div>{item.TotalMarketCapIN}</div>
                                        </div>
                                        <div>
                                            <div className='ticker-title'>MktCp</div>
                                            <div>{item.TotalMarketCap}</div>
                                        </div>
                                        <div>
                                            <div className='ticker-title'>Vol.</div>
                                            <div>{item.VolumeGenereted_h1}</div>
                                        </div>

                                        <div>
                                            <div className='ticker-title'>CallEfc</div>
                                            <div className={parseFloat(item.ImpactOfCall) >= 0 ? "green" : "red"}>{item.ImpactOfCall}</div>
                                        </div>

                                        <div>
                                            <div className='ticker-title'>Trace</div>
                                            <div className={parseFloat(item.SuccessRate) >= 0 ? "green" : "red"}>{item.SuccessRate}</div>
                                        </div>

                                        <div>
                                            <div className='ticker-title'>Peak</div>
                                            <div className="green">{item.FromCalltoPeak}</div>
                                        </div>
                                    </div>
                                    <div className='table-item-buttons'>
                                        <div className='table-item-buy'><a href={item.BuyLink}><AttachMoneyIcon />Buy</a></div>
                                        <div className='table-item-chart'><a href={item.BuyLink}><ShowChartIcon />Chart</a></div>
                                        <div className='table-item-scan'><a href={item.BuyLink}><TravelExploreOutlinedIcon />EthScan</a></div>
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
                <TokenPopup query={queryString} isVisible={isPopupVisible} onClose={togglePopup} />
            </div>
    )
};

export default TopTable;