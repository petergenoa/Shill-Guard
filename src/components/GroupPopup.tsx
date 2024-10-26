import React, { useEffect, useState } from 'react';
import "./styled/GroupPopup.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TokenPopup from './TokenPopup';

interface GroupPopupProps {
  isVisible: boolean;
  query: string;
  onClose: () => void;
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
    TokenSymbol: string;
    BuyLinkFlozz: string;
    ScanLink: string;
}

const GroupPopup: React.FC<GroupPopupProps> = ({ query, isVisible, onClose }) => {
    const [groupData, setGroupData] = useState<MainTableItem[]>();
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [queryString, setQueryString] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (query !== "") {
            const fetchTokenInfo = async () => {
            try {
                const response = await fetch(`https://shillguard-001-site6.etempurl.com/signals/GetAllSignalsByCallGroupName/${query}`);
                const data = await response.json();
                setGroupData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
            };

            fetchTokenInfo();
        }
    }, [query]);

    const getImageNameFromUrl = (url: string) => {
        const parts = url.split('/');
        const imageName = parts[parts.length - 1];
        const imagePath = `/Shill-Guard/${imageName}`;
        return imagePath;
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const tokenSelected = (query: string) => {
        setQueryString(query);
        setIsPopupVisible(true);
    }

    const showFull = () => {
        setShowAll(!showAll);
    }

  return (
    <>
    {isVisible && 
    <div className="popup-overlay">
      <div className="popup-content popup-conditions">
        <div className='close-button' onClick={onClose}><CloseOutlinedIcon /></div>
        {groupData ?
            <div className='token-stat'>
                <div className='top-group'>
                    <div className='token-stat-first-row'>
                        <div className='group-info-title-info'>
                            <span>{groupData[0].NameOfCallGroup}</span>
                            <div className='table-item-social'>
                                {groupData[0].TelegramLink ? <a href={groupData[0].TelegramLink} target="_blank" rel="noopener noreferrer"><TelegramIcon className='telegram' /></a> : <></>}
                                {groupData[0].TwitterLink ?  <a href={groupData[0].TwitterLink} target="_blank" rel="noopener noreferrer"><XIcon className='twitter' /></a> : <></>}
                            </div>
                        </div>
                        <div className='group-info-title'>
                            <img src={getImageNameFromUrl(groupData[0].CryptoGroupImage)} alt="image" />
                            <span className='group-info-info'>{groupData[0].CryptoGroupInfo}</span>
                        </div>
                    </div>

                    <div className='group-stat-second-row'>
                        <div className='second-row-title'>Group Success Rate</div>
                        <div className='group-table-item-data'>
                            <div>
                                <div className='ticker-title'>CallEfc</div>
                                <div className={groupData[0].AVG_CallImmediateEffect >= 0 ? "green" : "red"}>{groupData[0].AVG_CallImmediateEffect}</div>
                            </div>
                            <div>
                                <div className='ticker-title'>Trace</div>
                                <div className={groupData[0].AVG_TracingImpact >= 0 ? "green" : "red"}>{groupData[0].AVG_TracingImpact}</div>
                            </div>
                            <div>
                                <div className='ticker-title'>Peak</div>
                                <div className={groupData[0].AVG_FromCallToPeak >= 0 ? "green" : "red"}>{groupData[0].AVG_FromCallToPeak}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`all-time-group-container ${showAll && 'all-time-shown'}`}>
                    <div className="all-time-group-title" onClick={() => showFull()}>
                        <div>All-Time Top Performers</div>
                        <ExpandLessIcon />
                    </div>
                    {groupData
                    ?.filter(item => [1, 2, 3].includes(item.OrderNumber)) // Keep items with OrderNumber 1, 2, or 3
                    .sort((a, b) => a.OrderNumber - b.OrderNumber) // Sort them in ascending order
                    .map((item, index) => (
                        <div className='token-group-stats' key={index}>
                        <div className="token-item-first-row" onClick={() => tokenSelected(item.TokenHash)}>
                            <span className="token-index">#{index + 1}</span>
                            <img src={item.TokenImage} alt={item.TokenName} className="token-group-image" />
                            <span className='name-of-group'>{item.TokenName}</span> 
                        </div>

                        <div className='token-group-second-row'>
                            <div>
                                <span className='gray'>Date:</span> <span className='white'>{item.Timestamp}</span>
                            </div>
                            <div>
                                <span className='gray'>Peak:</span> <b className='green'>{item.FromCalltoPeak}</b>
                            </div>
                        </div>

                        <div className='token-group-third-row'>
                            <div>
                                <span className='gray'>CallMCap:</span> <span className='white'>{item.TotalMarketCapIN}</span>
                            </div>
                            <div>
                                <span className='gray'>ReachMCap:</span> <span className='green'>{item.TotalMarketCap}</span>
                            </div>
                        </div>

                        <div className='table-item-buttons' style={{ paddingTop: '20px' }}>
                            <div className='table-item-buy'><a href={item.BuyLinkFlozz} target="_blank" rel="noopener noreferrer"><AttachMoneyIcon />Buy</a></div>
                            <div className='table-item-chart'><a href={item.BuyLink} target="_blank" rel="noopener noreferrer"><ShowChartIcon />Chart</a></div>
                            <div className='table-item-scan'><a href={item.ScanLink} target="_blank" rel="noopener noreferrer"><TravelExploreOutlinedIcon />Scan</a></div>
                        </div>
                    </div>
                    ))}
                </div>

                {groupData?.filter(item => item.OrderNumber === 0).map((item, index) => (
                    <div className='token-group-stats' key={index}>
                        <div className="token-item-first-row" onClick={() => tokenSelected(item.TokenHash)}>
                            <span className="token-index">#{index + 1}</span>
                            <img src={item.TokenImage} alt={item.TokenName} className="token-group-image" />
                            <span className='name-of-group'>{item.TokenName}</span> 
                        </div>

                        <div className='token-group-second-row'>
                            <div>
                                <span className='gray'>Date:</span> <span className='white'>{item.Timestamp}</span>
                            </div>
                            <div>
                                <span className='gray'>Peak:</span> <b className='green'>{item.FromCalltoPeak}</b>
                            </div>
                        </div>

                        <div className='token-group-third-row'>
                            <div>
                                <span className='gray'>CallMCap:</span> <span className='white'>{item.TotalMarketCapIN}</span>
                            </div>
                            <div>
                                <span className='gray'>ReachMCap:</span> <span className='green'>{item.TotalMarketCap}</span>
                            </div>
                        </div>

                        <div className='table-item-buttons' style={{ paddingTop: '20px' }}>
                            <div className='table-item-buy'><a href={item.BuyLinkFlozz} target="_blank" rel="noopener noreferrer"><AttachMoneyIcon />Buy</a></div>
                            <div className='table-item-chart'><a href={item.BuyLink} target="_blank" rel="noopener noreferrer"><ShowChartIcon />Chart</a></div>
                            <div className='table-item-scan'><a href={item.ScanLink} target="_blank" rel="noopener noreferrer"><TravelExploreOutlinedIcon />Scan</a></div>
                        </div>
                    </div>
                ))}
            </div>
        :
            <div>
                Loading group info... Please wait...
            </div>
        }
        <button onClick={onClose}>Close</button>
      </div>
      <TokenPopup query={queryString} isVisible={isPopupVisible} onClose={togglePopup} />
    </div>
      }
    </>
  );
};

export default GroupPopup;
