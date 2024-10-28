import React, { useEffect, useState } from 'react';
import "./styled/TokenPopup.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';

interface TokenPopupProps {
  isVisible: boolean;
  query: string;
  onClose: () => void;
}

interface TokenStat {
    DateOfFirstCall: string;
    FirstCallMarketCap: string;
    TokenChain: string;
    TokenHash: string;
    TokenName: string;
    TokenStatisticData: StatisticsData[];
    TotalCalls: string;
    TokenSymbol: string;
    Volume: string;
    BuyLink: string;
    PriceUSD: string;
    TokenLink: string;
    TokenChart: string;
    UpdateBioButtonLink: string;
    TokenImage: string;
    CurrentMarketCap: string;
    ATXMarketCap: string;
    BioToken: string;
}

interface StatisticsData {
    CallGroupImage: string;
    CalledAtMarketCap: string;
    DateOfCall: string;
    NameOfCallGroup: string;
    Peak: string;
    CallEfc: string;
    Trace: string;
    ReachedMarketCap: string;
    SignalId: string;
}

const TokenPopup: React.FC<TokenPopupProps> = ({ query, isVisible, onClose }) => {
    const [tokenStat, setTokenStat] = useState<TokenStat>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query !== "") {
            const fetchTokenInfo = async () => {
                try {
                    const response = await fetch(`https://shillguard-001-site6.etempurl.com/signals/GetTokenStat/${query}`);
                    const data = await response.json();
                    setTokenStat(data);
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

  return (
    <>
    {isVisible && 
    <div className="popup-overlay">
      <div className="popup-content popup-conditions">
        <div className='close-button' onClick={onClose}><CloseOutlinedIcon /></div>
        {tokenStat ?
            <div className='token-stat'>
                <div className='top-group'>
                    <div className='token-stat-first-row'>
                            <div><span className='gray'>Token:</span> {tokenStat.TokenName}</div>
                    </div>

                    <div className='token-stat-second-row'>
                        <div>
                            <span className='gray'>CallMCap:</span> <b>{tokenStat.FirstCallMarketCap}</b>
                        </div>
                        <div>
                            <span className='gray'>MCapATH:</span> <b>{tokenStat.ATXMarketCap}</b>
                        </div>
                        <div>
                            <span className='gray'>Volume:</span> <b>{tokenStat.Volume}</b>
                        </div>
                        <div>
                            <span className='gray'>Calls:</span> <b>{tokenStat.TotalCalls}</b>
                        </div>
                    </div>
                    <div className='table-item-buttons'>
                        <div className='table-item-buy'><a href={tokenStat.BuyLink} target="_blank" rel="noopener noreferrer"><AttachMoneyIcon />Buy</a></div>
                        <div className='table-item-chart'><a href={tokenStat.TokenChart} target="_blank" rel="noopener noreferrer"><ShowChartIcon />Chart</a></div>
                        <div className='table-item-scan'><a href={tokenStat.TokenLink} target="_blank" rel="noopener noreferrer"><TravelExploreOutlinedIcon />Scan</a></div>
                    </div>
                </div>

                {tokenStat.TokenStatisticData.map((item, index) => (
                    <div className='token-group-stats' key={index}>
                        <div className="token-item-first-row">
                            <span className='group-first-row-token'>
                                <span className="token-index">#{index + 1}</span>
                                <img src={getImageNameFromUrl(item.CallGroupImage)} alt={item.NameOfCallGroup} className="token-group-image" />
                                <span className='name-of-group'>{item.NameOfCallGroup}</span>
                            </span>
                            <div><span className='gray'>Date:</span> {item.DateOfCall}</div>
                        </div>

                        <div className='table-item-data'>
                            <div>
                                <div className='ticker-title'>CallMCp</div>
                                <div>{item.CalledAtMarketCap}</div>
                            </div>

                            <div>
                                <div className='ticker-title'>CallEfc</div>
                                <div className={parseFloat(item.CallEfc) >= 0 ? "green" : "red"}>{item.CallEfc}</div>
                            </div>

                            <div>
                                <div className='ticker-title'>Trace</div>
                                <div className={parseFloat(item.Trace) >= 0 ? "green" : "red"}>{item.Trace}</div>
                            </div>

                            <div>
                                <div className='ticker-title'>Peak</div>
                                <div className="green">{item.Peak}</div>
                            </div>
                        </div>
                </div>
                ))}
            </div>
        :
            <div>
                Loading token info...Please wait...
            </div>
        }
        <button onClick={onClose}>Close</button>
      </div>
    </div>
      }
    </>
  );
};

export default TokenPopup;
