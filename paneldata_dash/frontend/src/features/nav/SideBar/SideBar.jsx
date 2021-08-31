import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

// MUI stuff
import Typography from '@material-ui/core/Typography';
import Dashboard from '@material-ui/icons/Dashboard'
import Laptop from '@material-ui/icons/Laptop'
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import Tooltip from "@material-ui/core/Tooltip";

// Redux
import {connect} from "react-redux";
import {openDrawer, closeDrawer} from "../navActions";


const styles = (theme) => ({
    ...theme.styles,
    title: {
        marginTop: '0px',
        textAlign: 'center'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    collapseButton: {
        display: 'flex',
        marginLeft: '75%'
    },
    collapseButtonClosed: {
        margin: 'auto'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },

});

const drawerWidth = 240;

const mapState = state => ({
    drawerOpen: state.nav.drawerOpen
});

const actions = {
    openDrawer,
    closeDrawer
};


const SideBar = ({classes, drawerOpen, closeDrawer, openDrawer}) => {

    const handleDrawer = () => {
        if (drawerOpen) {
            closeDrawer()
        } else {
            openDrawer()
        }
    };
    const styledCollapseButton = [classes.collapseButton];
    if (!drawerOpen)
        styledCollapseButton.push(classes.collapseButtonClosed);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                }),
            }}>
            <div className="wrapper">
                <IconButton onClick={handleDrawer} className={styledCollapseButton}>
                    {!drawerOpen ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
                <Typography component="div" className={classes.title}>
                    <Box fontWeight="Bold" m={1}>
                        {drawerOpen ? "Johnson Scanner Data" : "JSD"}
                    </Box>
                </Typography>
                <hr/>
                <div/>
                <List>
                    {!drawerOpen ? <Tooltip title="Data Selector" placement="top-start">
                        <ListItem button key="Data Selector" component={NavLink} to='/dashboard/data/'>
                            <ListItemIcon><Laptop/></ListItemIcon>
                            <ListItemText primary="Data Selector"/>
                        </ListItem>
                    </Tooltip>:  <ListItem button key="Data Selector" component={NavLink} to='/dashboard/data/'>
                        <ListItemIcon><Laptop/></ListItemIcon>
                        <ListItemText primary="Data Selector"/>
                    </ListItem>}

                    {!drawerOpen ? <Tooltip title="SQL" placement="top-start">
                        <ListItem button key="SQL" component={NavLink} to='/dashboard/sql/'>
                            <ListItemIcon><Dashboard/></ListItemIcon>
                            <ListItemText primary="SQL"/>
                        </ListItem>
                    </Tooltip>: <ListItem button key="SQL" component={NavLink} to='/dashboard/sql/'>
                        <ListItemIcon><Dashboard/></ListItemIcon>
                        <ListItemText primary="SQL"/>
                    </ListItem>}

                </List>
            </div>
        </Drawer>

    );
}

export default connect(mapState, actions)(withRouter(withStyles(styles)(SideBar)));
