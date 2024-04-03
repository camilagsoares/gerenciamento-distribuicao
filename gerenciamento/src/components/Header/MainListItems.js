import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { Tooltip } from "@mui/material"

export const MainListItems = ({ open }) => {

  const [session, setSession] = React.useState(JSON.parse(localStorage.getItem('session')) || null);


  return (
    <React.Fragment>

      <Tooltip title={!open ? "Início" : ""} placement="right-start">
        <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Início" />
          </ListItemButton>
        </NavLink>
      </Tooltip>

      { session && <Tooltip title={!open ? "Postar" : ""} placement="right-start">
        <NavLink to='/postar' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Postar" />
          </ListItemButton>
        </NavLink>
      </Tooltip>
      }

  

    </React.Fragment>
  )
}

