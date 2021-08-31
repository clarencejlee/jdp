import React, {Component, Fragment} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router';


// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// Components
import NavBar from "../../nav/NavBar/NavBar";
import Data from "./Data/Data";
import ScreenShotModal from "../../modals/ScreenShotModal";
import Summary from "./Summary/Summary"

// Redux
import { connect } from 'react-redux';

import {
    exportCsv
} from "../dashboardActions";


const styles = (theme) => ({
    ...theme.styles,
    activeButton: {
        color: 'green',
        border: '1px solid rgb(63, 191, 63)',
        '&:hover': {
            backgroundColor: 'rgb(63, 191, 63, 0.3)',
            border: '1px solid rgb(63, 191, 63, 1)',
        },
    },
    button: {
        minWidth: '100px',
        fontSize: '10px'
    },
    blockMarket: {
        overflow: 'scroll',
        backgroundColor: '#FFFFFF',
        border: '1px solid RGB(232, 232, 232)',
        height: '85vh'
    }

});

const mapState = state => ({
    markets: state.data.markets,
    brands: state.data.brands,
    periods: state.data.periods,
    facts: state.data.facts,
    categories: state.data.categories,
    allSelected: state.data.allSelected
});


const actions = {
    exportCsv
};
class DataSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            functionToCallInChild: null,
            modalVisible: false
        }
    }

    componentDidUpdate(prevProps, prevState){

    }

    render() {

        const marketHeadCells = [
            {id: 'name', numeric: false, disablePadding: true, label: 'Market Description'},
        ];
        const categoryHeadCells = [
            {id: 'name', numeric: false, disablePadding: true, label: 'Category Description'},
        ];
        const brandHeadCells = [
            {id: 'name', numeric: false, disablePadding: true, label: 'Brand Description'},
        ];
        const periodHeadCells = [
            {id: 'name', numeric: false, disablePadding: true, label: 'Period Description'},
        ];
        const factHeadCells = [
            {id: 'name', numeric: false, disablePadding: true, label: 'Fact Description'},
        ];


        const {classes, allSelected, markets, brands, categories, periods, facts, exportCsv} = this.props;

        //console.log(createCsvData(markets, brands, categories, periods));

        //console.log(createCsvColumns(facts))
        const {modalVisible} = this.state;

        const styledButton = [classes.button];
        if(allSelected)
            styledButton.push(classes.activeButton);



        const resetSelected = () =>{
            this.state.functionToCallInChild()
        };
        const showFeedbackModal = () => this.setState({
            modalVisible: true
        });
        const closeFeedbackModal = () => {
            this.setState({
                modalVisible: false
            })
        }
        const handleExportCsv = () => {
            let params = '';
            let marketstr = markets.map((elem)=>elem.name).join(',');
            params += "markets=" + marketstr + '&';
            let brandstr =brands.map((elem)=>elem.name).join(',');
            params += "brands=" + brandstr + '&';
            let categoriestr =categories.map((elem)=>elem.name).join(',');
            params += "categories=" + categoriestr + '&';
            let factstr =facts.map((elem)=>elem.name).join(',');
            params += "facts=" + factstr.replace(/&/g, encodeURIComponent('&')) + '&';
            let periodstr =periods.map((elem)=>elem.name).join(',');
            params += "periods=" + periodstr;

            exportCsv(params);
        };


        return (
            <Route
                path='/(.+)'
                render={() => (
                    <Fragment>
                        <ScreenShotModal
                            visible={modalVisible}
                             onCancel={closeFeedbackModal}
                             onConfirm={closeFeedbackModal}/>
                        <div className='main'>
                            <NavBar
                                selectedMarkets={markets.length > 0}
                                selectedCategories={categories.length > 0}
                                selectedBrands={brands.length > 0}
                                selectedPeriods={periods.length > 0}
                                selectedFacts={facts.length > 0}
                                showFeedbackModal={showFeedbackModal}

                            />
                            <Grid container spacing={3}>
                                <Switch key={this.props.location.key}>
                                    <Route exact path="/dashboard/data" render={() => (
                                        <Redirect to="/dashboard/data/markets"/>
                                    )}/>
                                    <Route exact path='/dashboard/data/markets' render={(props) => <Data {...props}
                                                                                                         setCallable={callable => this.setState({functionToCallInChild: callable})}
                                                                                                         headCells={marketHeadCells}
                                    />}/>
                                    <Route exact path='/dashboard/data/categories' render={(props) => <Data {...props}
                                                                                                            setCallable={callable => this.setState({functionToCallInChild: callable})}
                                                                                                            headCells={categoryHeadCells}

                                    />}/>
                                    <Route exact path='/dashboard/data/brands' render={(props) => <Data {...props}
                                                                                                        setCallable={callable => this.setState({functionToCallInChild: callable})}
                                                                                                        headCells={brandHeadCells}
                                    />}/>
                                    <Route exact path='/dashboard/data/periods' render={(props) => <Data {...props}
                                                                                                         setCallable={callable => this.setState({functionToCallInChild: callable})}
                                                                                                         headCells={periodHeadCells}
                                    />}/>
                                    <Route exact path='/dashboard/data/facts' render={(props) => <Data {...props}
                                                                                                       setCallable={callable => this.setState({functionToCallInChild: callable})}
                                                                                                       headCells={factHeadCells}
                                    />}/>
                                </Switch>
                               <Summary allSelected={allSelected }
                                        markets={markets}
                                        categories={categories}
                                        brands={brands}
                                        periods={periods}
                                        facts={facts}
                                        resetSelected={resetSelected}
                                   handleCsvExport={handleExportCsv}/>

                            </Grid>

                        </div>
                    </Fragment>
                )}
            />

        );
    }

}

export default connect(mapState, actions)(withRouter(withStyles(styles)(DataSelector)));
