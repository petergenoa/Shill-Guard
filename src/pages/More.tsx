import { TonConnectButton } from "@tonconnect/ui-react";
import "./styles/More.css";

const More = () => {

    return(
        <div className="more">
            <div className="more-inner">Hello, username</div>
            <div className="more-inner">$SGTON Balance: 40,000</div>
            <div className="more-inner"><TonConnectButton /></div>
            <div className="more-inner"># My ID 123123123</div>
            <div className="more-inner">Invite Friend</div>
            <div className="more-inner">Privacy Policy</div>
            <div className="more-inner">Terms and Conditions</div>
        </div>
    )
}
export default More;