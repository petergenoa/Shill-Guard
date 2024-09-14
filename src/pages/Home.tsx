import { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import Logo from '../assets/logo-blue.png';
import Search from '../components/Search';
import NewsBar from '../components/NewsBar';
import TopTable from '../components/TopTable';
import TokenPopup from '../components/TokenPopup';

const Home = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [queryString, setQueryString] = useState("");

    const handleSearch = (query: string) => {
        console.log('Search initiated with query:', query);
        setQueryString(query);
        setIsPopupVisible(true);
    };

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return(
        <div>
            <div className='header'>
                <img src={Logo} alt="" />
                <Search onSearch={handleSearch} />
            </div>
            <NewsBar />
            <TopTable />
            <TokenPopup query={queryString} isVisible={isPopupVisible} onClose={togglePopup} />
        </div>
    )
}
export default Home;