import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { NavLink } from 'react-router-dom';
import { Tooltip } from "@mui/material"

export const MainListItems = ({open}) => {
  return (
    <React.Fragment>

      <Tooltip placement="right-start" title={!open ? "Início" : ""}>
        <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Início" />
          </ListItemButton>
        </NavLink>
      </Tooltip>

      <Tooltip title={!open ? "Postar" : ""} placement="right-start">
        <NavLink to='/postar' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Postar" />
          </ListItemButton>
        </NavLink>
      </Tooltip>


      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>

    </React.Fragment>
  )
}
