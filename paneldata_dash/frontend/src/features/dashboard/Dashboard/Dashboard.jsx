import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router';
import {connect} from 'react-redux';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

// Components
import SideBar from "../../nav/SideBar/SideBar";
import DataSelector from "../DataSelector/DataSelector";
import SQL from "../SQL/SQL";
import CsvUpload from "../CsvUpload/CsvUpload";


const styles = (theme) => ({
    ...theme.styles,
    main: {
        width: '100%',
        marginLeft: '15px'
    },
    sideBarWrap:{
        border: '1px solid RGB(232, 232, 232)'
    },
    mainBarWrap: {
        'backgroundColor':'#FBFCFD'
    }

});

class Dashboard extends Component {

    render() {
        const {classes, auth} = this.props;
        if(!auth.authenticated){
           return <Redirect to="/login"/>
        }
        return (
            <div style={{'display':'flex'}}>
                <Grid  spacing={3} className={classes.main}>
                    <div style={{'display':'flex'}}>
                        <SideBar/>
                        <Grid item xs={12} sm={12} className={classes.mainBarWrap}>
                            <Route
                                path='/(.+)'
                                render={() => (
                                    <Fragment>
                                        <div className='main'>
                                            <Switch key={this.props.location.key}>
                                                <Route path='/dashboard/data' component={DataSelector} />
                                                <Route path='/dashboard/upload' component={CsvUpload} />
                                                <Route path='/dashboard/sql' component={SQL} />
                                            </Switch>
                                        </div>
                                    </Fragment>
                                )}
                            />

                        </Grid>
                    </div>

                </Grid>

            </div>


        );
    }
}


const mapState = state => ({
    auth: state.auth,
    loading: state.async.loading
});

export default withRouter(connect(mapState, null)(withStyles(styles)(Dashboard)));
