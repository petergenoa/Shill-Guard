import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, People, Home as HomeIcon, Assignment, MoreHoriz } from '@mui/icons-material';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import './styles/NavBar.css';

const NavBar = () => {
  return (
    <div className="NavBar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "NavItem active" : "NavItem")}
        end
      >
        <HomeIcon className="NavIcon" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/statistics"
        className={({ isActive }) => (isActive ? "NavItem active" : "NavItem")}
      >
        <StackedLineChartOutlinedIcon className="NavIcon" />
        <span>Stats</span>
      </NavLink>

      <NavLink
        to="/tasks"
        className={({ isActive }) => (isActive ? "NavItem active" : "NavItem")}
      >
        <AssignmentOutlinedIcon className="NavIcon" />
        <span>Tasks</span>
      </NavLink>


      <NavLink
        to="/more"
        className={({ isActive }) => (isActive ? "NavItem active" : "NavItem")}
      >
        <MoreHorizOutlinedIcon className="NavIcon" />
        <span>More</span>
      </NavLink>
    </div>
  );
};

export default NavBar;