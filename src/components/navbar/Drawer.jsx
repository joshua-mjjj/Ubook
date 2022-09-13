import * as React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    right: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
	      <ListItem onClick={() => window.location.href = "/"}>
	        <ListItemButton>
	          <ListItemText primary="Home" onClick={() => window.location.href = "/"}/>
	        </ListItemButton>
	      </ListItem>
	      <Divider />
	      <ListItem >
	        <ListItemButton>
	          <ListItemText primary="Search" />
	        </ListItemButton>
	      </ListItem>
	      <Divider />
	      <ListItem >
	        <ListItemButton>
	          <ListItemText primary="Contact Us" />
	        </ListItemButton>
	      </ListItem>
	      <Divider />
	      <ListItem >
	        <ListItemButton>
	          <ListItemText primary="About Us" />
	        </ListItemButton>
	      </ListItem>
	      <Divider />
	      <ListItem >
	        <ListItemButton>
	          <ListItemText primary="Become a client" onClick={() => window.location.href = "/"}/>
	        </ListItemButton>
	      </ListItem>
	      <Divider />
	      <ListItem >
	        <ListItemButton>
	          <ListItemText primary="Sigin in" onClick={() => window.location.href = "/login"}/>
	        </ListItemButton>
	      </ListItem>
	      <Divider />
	      <ListItem >
	        <ListItemButton>
	          <ListItemText primary="Register" onClick={() => window.location.href = "/register"}/>
	        </ListItemButton>
	      </ListItem>
	      <Divider />
      </List>
     
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer("right", true)}>{" "}</Button>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => {
            	toggleDrawer("right", false)
            	props.set_close_menu()
           }}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
