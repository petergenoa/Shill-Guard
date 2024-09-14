import { useState } from "react";
import Youtb from '../assets/socialMedia/ytube.svg';
import TikTok from '../assets/socialMedia/tiktok.svg';
import Insta from '../assets/socialMedia/inst.svg';
import AddIcon from '@mui/icons-material/Add';
import Logo from '../assets/logo-blue.png';
import Discord from '../assets/tasks/discord.png';
import Telegram from '../assets/tasks/telegram.png';
import XCom from '../assets/tasks/xcom.png';
import Tik from '../assets/tasks/tiktok.png';
import Instagram from '../assets/tasks/instagram.png';
import Youtube from '../assets/tasks/youtube.png';
import Utya from '../assets/tasks/duck.png';

import "./styles/Tasks.css";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <div className="tab-panel-content">
            {children}
            </div>
        )}
        </div>
    );
};



interface TaskItem {
    image: string;
    taskTitle: string;
    reward: string;
  }
  
  const taskItems: TaskItem[] = [
    {
      image: `${XCom}`,
      taskTitle: 'Follow us on X',
      reward: '7,777 $SGTON',
    },
    {
      image: `${Telegram}`,
      taskTitle: 'Join our Telegram',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Youtube}`,
      taskTitle: 'Join our Youtube',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Tik}`,
      taskTitle: 'Join our TikTok',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Instagram}`,
      taskTitle: 'Join our Instagram',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Telegram}`,
      taskTitle: 'Join our Bot 1',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Telegram}`,
      taskTitle: 'Join our Bot 2',
      reward: '5,000 $SGTON',
    },
  ];

  const specialItems: TaskItem[] = [
    {
      image: `${XCom}`,
      taskTitle: 'Follow this group on X',
      reward: '7,777 $SGTON',
    },
    {
      image: `${Telegram}`,
      taskTitle: 'Join this group on Telegram',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Youtube}`,
      taskTitle: 'Join this channel on Youtube',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Tik}`,
      taskTitle: 'Join our partner on TikTok',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Instagram}`,
      taskTitle: 'Join this chat in Instagram',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Telegram}`,
      taskTitle: 'Join this call group',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Discord}`,
      taskTitle: 'Join this call group on Discord',
      reward: '5,000 $SGTON',
    },
    {
      image: `${Telegram}`,
      taskTitle: 'Join second call group',
      reward: '5,000 $SGTON',
    },
  ];

  const friendsItems: TaskItem[] = [
    {
        image: `${Utya}`,
        taskTitle: 'Invite 1 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 2 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 3 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 4 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 5 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 6 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 7 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 8 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 9 friend',
        reward: '7,777 $SGTON',
    },
    {
        image: `${Utya}`,
        taskTitle: 'Invite 10 friend',
        reward: '7,777 $SGTON',
    },
  ];

const Tasks = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (newValue: number) => {
        setTabValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    
    return (
        <div className='tasks-container'>
          <h2>Missions</h2>
          <h5>Complete tasks and earn more</h5>
    
            <div className="tab-bar">
                <div className="tabs">
                    <button
                    className={`tab ${tabValue === 0 ? 'selected' : ''}`}
                    onClick={() => handleTabChange(0)}
                    {...a11yProps(0)}
                    >
                    Promo
                    </button>
                    <button
                    className={`tab ${tabValue === 1 ? 'selected' : ''}`}
                    onClick={() => handleTabChange(1)}
                    {...a11yProps(1)}
                    >
                    Special
                    </button>
                    <button
                    className={`tab ${tabValue === 2 ? 'selected' : ''}`}
                    onClick={() => handleTabChange(2)}
                    {...a11yProps(2)}
                    >
                    Ref
                    </button>
                    <button
                    className={`tab ${tabValue === 3 ? 'selected' : ''}`}
                    onClick={() => handleTabChange(3)}
                    {...a11yProps(3)}
                    >
                    Contest
                    </button>
                </div>
                <TabPanel value={tabValue} index={0}>
                    {taskItems.map((task, index) => (
                        <div className='task-first-tab' key={index}>
                            <div className="task-table-row">
                                <div className="task-table-left">
                                    <img className="left-image" src={task.image} alt="" />
                                    <div className="task-table-left-inner">
                                        <div className="task-title">{task.taskTitle}</div>
                                        <div className="task-table-left-inner-bottom">
                                            <img src={Logo} alt="" />
                                            <div>{task.reward}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="task-table-right">Start</div>
                        </div>
                    ))}
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    {specialItems.map((task, index) => (
                        <div className='task-first-tab' key={index}>
                            <div className="task-table-row">
                                <div className="task-table-left">
                                    <img className="left-image" src={task.image} alt="" />
                                    <div className="task-table-left-inner">
                                        <div className="task-title">{task.taskTitle}</div>
                                        <div className="task-table-left-inner-bottom">
                                            <img src={Logo} alt="" />
                                            <div>{task.reward}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="task-table-right">Start</div>
                        </div>
                    ))}
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    {friendsItems.map((task, index) => (
                        <div className='task-first-tab' key={index}>
                            <div className="task-table-row">
                                <div className="task-table-left">
                                    <img className="left-image" src={task.image} alt="" />
                                    <div className="task-table-left-inner">
                                        <div className="task-title">{task.taskTitle}</div>
                                        <div className="task-table-left-inner-bottom">
                                            <img src={Logo} alt="" />
                                            <div>{task.reward}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="task-table-right">Start</div>
                        </div>
                    ))}
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    <div className="social-tab">
                        <h2>Tell others about ShillGuard App</h2>
                        <div className='social-media-icons'>
                            <img src={Youtube} alt="youtube" />
                            <img src={Tik} alt="tiktok" />
                            <img src={Instagram} alt="instagram" />
                        </div>
                        <div className='divider'></div>
                        <div className='up-to-rewards'>
                            <div>And get up to</div>
                            <div className='up-to-rewards-middle'><img src={Logo} alt="ton-image" />10,000,000 $SGTON</div>
                            <div>Earn $SGTON for each video</div>
                        </div>
                        <div className='divider'></div>
                        <button className='add-social-content'><AddIcon /> Add content and Earn</button>
                        <div className='rules'>
                            <ul>
                                <li><b>Create Content:</b> Make a fan video about SPIN App for YouTube Shorts, Instagram Reels, or TikTok.</li>
                                <li><b>Include your ID or Invite Link:</b> Attach your ID or invite link in the video description.</li>
                                <button className="invite-input">Get Your Invite Link</button>
                                <li><b>Send the Link:</b> Once your video reaches 100+ views, send us the link.</li>
                                <li><b>Earn Rewards:</b> The more views your video gets, the better your reward. You can earn up to <b>10,000,000 SPIN</b> for a single video.</li>
                            </ul>
                        </div>
                    </div>
                </TabPanel>
            </div>
            
            {/* <SocialPopup isVisible={isPopupVisible} onClose={togglePopup} /> */}
        </div>
      );
}
export default Tasks;