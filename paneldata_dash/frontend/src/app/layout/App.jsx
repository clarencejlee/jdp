import React, { Component, Fragment } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Route, Switch, withRouter } from 'react-router-dom';

//utils
import themeObject from '../common/util/theme';

// Components
import Dashboard from '../../features/dashboard/Dashboard/Dashboard'
import HomePage from '../../features/home/HomePage'
import ModalManager from "../../features/modals/ModalManager";
import Login from "../../features/auth/Login/Login";


const theme = createMuiTheme(themeObject);

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <ModalManager />
                <Route exact path='/' component={HomePage} />
                <Route
                    path='/(.+)'
                    render={() => (
                        <Fragment>
                            <div className='main'>
                                <Switch key={this.props.location.key}>
                                    <Route  path='/login' component={Login} />
                                    <Route  path='/dashboard' component={Dashboard} />
                                </Switch>
                            </div>
                        </Fragment>
                    )}
                />
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
