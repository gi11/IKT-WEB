import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    AppBar, Toolbar, Grid, Typography, Drawer, List, ListItem, withStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styleSheet = {
    drawerItem: {
        width: 200,
    },
    topMenuItem: {
        paddingRight: 30,
        cursor: "pointer",
    },
    sideBarIcon: {
        padding: 0,
        color: "white",
        cursor: "pointer",
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { drawerActive: false, drawerOpen: false };
    }

    componentWillMount() {
        this.setState({ drawerActive: (window.innerWidth <= 800) });
        window.addEventListener('resize', () => {
            this.setState({ drawerActive: (window.innerWidth <= 800) });
        });
    }

    render() {
        const drawerActive = this.state.drawerActive;
        return (
            <div>
                <CssBaseline />
                <AppBar >
                    {drawerActive ? (
                        <Toolbar>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <MenuIcon
                                    className={this.props.classes.sideBarIcon}
                                    onClick={() => { this.setState({ drawerOpen: true }) }}
                                />
                                <Typography color="inherit" variant="h5">Title</Typography>
                                <Typography color="inherit" variant="h5"></Typography>
                            </Grid>
                        </Toolbar>
                    ) : (
                            <Toolbar>
                                <Typography variant="h5" style={{ flexGrow: 1 }} color="inherit" >Title</Typography>
                                <Typography variant="subtitle2" className={this.props.classes.topMenuItem} color="inherit" >Option 1</Typography>
                                <Typography variant="subtitle2" className={this.props.classes.topMenuItem} color="inherit" >Option 2</Typography>
                                <Typography variant="subtitle2" className={this.props.classes.topMenuItem} color="inherit" >Option 3</Typography>
                            </Toolbar>
                        )
                    }
                </AppBar>
                {
                    drawerActive ? (
                        <Drawer
                            open={this.state.drawerOpen}
                            onClose={() => { this.setState({ drawerOpen: false }) }}
                            onOpen={() => { this.setState({ drawerOpen: true }) }}>

                            <div
                                role="button"
                                onClick={() => { this.setState({ drawerOpen: false }) }}
                                onKeyDown={() => { this.setState({ drawerOpen: false }) }}>

                                <List className={this.props.classes.drawerItem}>
                                    <ListItem key={1} button divider> Option 1 </ListItem>
                                    <ListItem key={2} button divider> Option 2 </ListItem>
                                    <ListItem key={3} button divider> Option 3 </ListItem>
                                </List>

                            </div>
                        </Drawer>
                    ) : (<div></div>)
                }

            </div>
        );
    }
}

export default withStyles(styleSheet)(HomePage);
