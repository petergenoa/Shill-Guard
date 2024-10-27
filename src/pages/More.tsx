import { TonConnectButton } from "@tonconnect/ui-react";
import "./styles/More.css";
import { useUserContext } from "../contexts/UserContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTonConnect } from "../hooks/useTonConnect";
import { useEffect } from "react";

const More = () => {
    const { user, updateUser } = useUserContext();
    const { connected, wallet } = useTonConnect();

    const handleShare = () => {
        const message = `Check out Gangster Games! Join through this link: https://t.me/https://t.me/ShillGuardAppBot/Shill-Guard?startapp=refId${user?.userId}`;
        const url = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
        window.Telegram.WebApp.openTelegramLink(url);
    };

    useEffect(() => {
        if (user && !user.earnInfo.tonWalletConnected && connected) {
          const newCoins = user.coins + 500000;
          updateUser({
            ...user,
            coins: newCoins,
            earnInfo: {
              ...user.earnInfo,
              tonWalletConnected: true,
              tonWallet: wallet ?? '',
            }
          });
        }
    }, [connected]);

    if(!user) {
        return;
    }

    return(
        <div className="more">
            <div className="more-inner">
                <div className="title padding">Hello, <b>{user.username}</b></div>
                <div className="title padding">Balance: <b>{user.coins} $SGTON</b></div>
                <button className="title padding" onClick={() => { navigator.clipboard.writeText(`${user.userId}`); alert('User ID copied to clipboard')}}>Your ID: <b>{user.userId}</b><ContentCopyIcon /></button>
                <div className='padding'>
                    <div className='title padding'>Invite Friend</div>
                    <div className='invite-button-container'>
                        <button onClick={handleShare} className='task-button'>Share</button>
                        <button onClick={() => { navigator.clipboard.writeText('https://t.me/ShillGuardAppBot/Shill-Guard?startapp=refId' + user.userId); alert('Invite link copied to clipboard') }} className='task-button'>Invite Link <ContentCopyIcon /></button>
                    </div>
                </div>

            </div>
                <TonConnectButton />
        </div>
    )
}
export default More;