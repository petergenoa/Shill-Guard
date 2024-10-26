import React, { useEffect, useState } from 'react';
import "./styled/TokenPopup.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

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
}

interface StatisticsData {
    CallGroupImage: string;
    CalledAtMarketCap: string;
    DateOfCall: string;
    NameOfCallGroup: string;
    Peak: string;
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
                            <div><span className='gray'>Date:</span> {tokenStat.DateOfFirstCall}</div>
                    </div>

                    <div className='token-stat-second-row'>
                        <div>
                            <span className='gray'>CallMCap:</span> <b>{tokenStat.FirstCallMarketCap}</b>
                        </div>
                        <div>
                            <span className='gray'>Total Calls:</span> <b>{tokenStat.TotalCalls}</b>
                        </div>
                    </div>
                </div>

                {tokenStat.TokenStatisticData.map((item, index) => (
                    <div className='token-group-stats' key={index}>
                        <div className="token-item-first-row">
                            <span className="token-index">#{index + 1}</span>
                            <img src={getImageNameFromUrl(item.CallGroupImage)} alt={item.NameOfCallGroup} className="token-group-image" />
                            <span className='name-of-group'>{item.NameOfCallGroup}</span>
                        </div>

                        <div className='token-group-second-row'>
                            <div>
                                <span className='gray'>Date:</span> <span className='white'>{item.DateOfCall}</span>
                            </div>
                            <div>
                                <span className='gray'>Peak:</span> <b className='green'>{item.Peak}</b>
                            </div>
                        </div>

                        <div className='token-group-third-row'>
                            <div>
                                <span className='gray'>CallMCap:</span> <span className='white'>{item.CalledAtMarketCap}</span>
                            </div>
                            <div>
                                <span className='gray'>ReachMCap:</span> <span className='green'>{item.ReachedMarketCap}</span>
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
