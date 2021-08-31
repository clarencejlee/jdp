import React, {Fragment, useEffect} from 'react';

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TreeView from "@material-ui/lab/TreeView";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import {FolderOpen} from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// Components
import StyledTreeItem from "../../../../app/common/components/StyledTreeItem";
import StyledTable from "../../../../app/common/components/StyledTable";
import RouteLeavingGuard from "../../../../app/common/components/RouteLeavingGuard";

// Redux
import {connect} from 'react-redux';
import {
    getBrandsForDashboard, getCategoriesForDashboard, getFactsForDashboard,
    getMarketsForDashboard, getPeriodsForDashboard,
    setSelectedBrands,
    setSelectedCategories,
    setSelectedFacts,
    setSelectedMarkets,
    setSelectedPeriods,
    removeUnselected
} from '../../dashboardActions';
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { openModal, closeModal} from '../../../modals/modalActions';

const styles = (theme) => ({
    ...theme.styles,
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    blockMarket: {
        overflow: 'scroll',
        backgroundColor: '#FFFFFF',
        border: '1px solid RGB(232, 232, 232)',
        height: '85vh'
    },
    leftContainer: {
        minWidth: '250px',
        padding: '15px',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingBottom: '5px'
    },
    middleContainer: {
        padding: '15px',
        paddingLeft: '25px',
        paddingRight: '25px'
    },
    descriptionFilter: {
        position: 'relative',
        marginLeft: 'auto',
        whiteSpace: 'nowrap',
        marginTop: '5px',
        fontSize: '12px',
        marginRight: '15px'
    },
    searchArrowDropDown: {
        fontSize: '18px',
        position: 'absolute',

    },
    button: {
        minWidth: '100px',
        fontSize: '10px'
    },
    searchResultNumber: {
        marginTop: '5px',
        fontSize: '12px',
        marginRight: '10px',
        marginLeft: '5px'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.05),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        marginLeft: 0,
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 250,
        },
        [theme.breakpoints.up('lg')]: {
            width: 300,
        },
    },
});

const mapState = state => ({
    markets: state.data.markets,
    brands: state.data.brands,
    periods: state.data.periods,
    facts: state.data.facts,
    categories: state.data.categories,
    items: state.data.items,
    page: state.data.page,
    size: state.data.size,
    loading: state.async.loading
});

const actions = {
    setSelectedMarkets,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedPeriods,
    setSelectedFacts,
    getMarketsForDashboard,
    getBrandsForDashboard,
    getFactsForDashboard,
    getCategoriesForDashboard,
    getPeriodsForDashboard,
    removeUnselected,
    openModal,
    closeModal
};

const Data = ({
                             classes,
                             openModal,
                             closeModal,
                             setCallable,
                             location,
                             history,
                             headCells,
                             setSelectedMarkets,
                             markets,
                             setSelectedCategories,
                             categories,
                             setSelectedBrands,
                             brands,
                             setSelectedPeriods,
                             periods,
                             setSelectedFacts,
                             removeUnselected,
                             facts,
                             items,
                             pagePaginated,
                             size,
                             getMarketsForDashboard,
                             getBrandsForDashboard,
                             getFactsForDashboard,
                             getCategoriesForDashboard,
                             getPeriodsForDashboard,
                             loading
                         }) => {

    const [isSummaryUpdated, setIsSummaryUpdated] = React.useState(false);
    const [checked, setChecked] = React.useState([0]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [isDate, setIsDate] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [radioFilter, setRadioFilter] = React.useState('');

    //set as state so when changed it will trigger child rendering.
    const [filteredRows, setFilteredRows] = React.useState(items);
    const [selected, setSelected] = React.useState([]);


    const updateData = (page, size) => {
        if (location && location.pathname.includes('markets')) {
            getMarketsForDashboard(page, size);
            setSelected(markets)
        } else if (location && location.pathname.includes('brands')) {
            getBrandsForDashboard(page, size);
            setSelected(brands)
        } else if (location && location.pathname.includes('categories')) {
            getCategoriesForDashboard(page, size);
            setSelected(categories)
        } else if (location && location.pathname.includes('periods')) {
            getPeriodsForDashboard(page, size);
            setSelected(periods)
            setIsDate(true)
        } else if (location && location.pathname.includes('facts')) {
            getFactsForDashboard(page, size);
            setSelected(facts)
        }
        setFilteredRows(items)
    }
    /*eslint-disable */
    useEffect(() => {
        updateData(page, size)

    }, [location.path]);
    useEffect(() => {
        setFilteredRows(items)
    }, [items])

    useEffect(() => {
        setCallable(resetSelected);
    }, []);

    /*eslint-enable */
   /* const setRowsPerPage = (page, size) => {
       // updateData(page, size)
    }
    const setPage = (page, size) => {
       //updateData(page, size)
    }*/

    const setSelectedData = async (selected) => {
        try {
            //depending on the page view set markets, categories etc..
            if (location && location.pathname.includes('markets')) {
                await setSelectedMarkets(selected);
            } else if (location && location.pathname.includes('brand')) {
                if(categories.length === 0 && selected.length >0){
                    openModal('PromptModal', {message: `Please select ${selected[0].category.name} in the previous tab`, visible:true, onConfirm: closeModal});
                }
                await setSelectedBrands(selected)
            } else if (location && location.pathname.includes('categories')) {
                if(markets.length === 0 && selected.length >0){
                    openModal('PromptModal', {message: `Please select ${selected[0].market.name} in the previous tab`, visible:true, onConfirm: closeModal});
                }
                await setSelectedCategories(selected)
            } else if (location && location.pathname.includes('periods')) {
                await setSelectedPeriods(selected)
            } else if (location && location.pathname.includes('facts')) {
                await setSelectedFacts(selected)
            }
            removeUnselected()
            setIsSummaryUpdated(true);
        } catch (error) {
            console.log(error);
        }
    };

    const pendingChanges = () => {
        if (location && location.pathname.includes('markets')) {
            return selected.length !== markets.length;
        } else if (location && location.pathname.includes('brand')) {
            return selected.length !== brands.length;
        } else if (location && location.pathname.includes('categories')) {
            return selected.length !== categories.length;
        } else if (location && location.pathname.includes('periods')) {
            return selected.length !== periods.length;
        } else if (location && location.pathname.includes('facts')) {
            return selected.length !== facts.length;
        }
    }

    const handleSearch = (evt) => {
        if (evt && evt.target) {
            let temp = items.filter(f => f.name.toLowerCase().includes(evt.target.value.toLowerCase()))
            setFilteredRows(temp);

        } else {
            setFilteredRows(items)
        }
    }

    const mapRowsToSelected = (rows) => {
        let selectedValues = [];
        for (let item of rows) {
            selectedValues.push(item)
        }
        return selectedValues;
    };

    const mapRowsToSelectedExcept = (rows) => {
        let selectedValues = mapRowsToSelected(rows);
        selectedValues = selectedValues.filter((el) => !selected.includes(el));
        return selectedValues;
    };


    const handleRadioFilterChange = (event) => {
        setRadioFilter(event.target.value);
        if (event.target.value === 'All') {
            setSelected(mapRowsToSelected(items));
        } else {
            setSelected(mapRowsToSelectedExcept(items))
        }
    };

    const resetSelected = () => {
        setSelected([]);
    }

    return (
        <Fragment>
            {loading ? <LoadingComponent />:null}
            <RouteLeavingGuard
                when={true}
                // Navigate function
                navigate={path => history.push(path)}
                shouldBlockNavigation={location => {
                    return !!pendingChanges();

                }}
            />
            {/*Left market block*/}
            <Grid item xs={12} sm={3} style={{'position':'relative'}}>
                <div className={classes.blockMarket}>
                    <Grid container spacing={0}
                          className={classes.leftContainer}>
                        <Grid item xs={12} style={{'display': 'inline-flex'}}>
                            <Typography type="title" fontWeight="Bold" color="inherit">
                                Characteristics
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <TreeView
                                className={classes.root}
                                defaultExpanded={["3"]}
                                defaultCollapseIcon={<ArrowDropDownIcon/>}
                                defaultExpandIcon={<ArrowRightIcon/>}
                                defaultEndIcon={<div style={{width: 24}}/>}>
                                {headCells && headCells.map(cell =>
                                    <StyledTreeItem key={cell.label} nodeId="3" labelText={cell.label}
                                                    labelIcon={FolderOpen}>
                                        {/* No Child elements*/}
                                    </StyledTreeItem>
                                )}


                            </TreeView>
                        </Grid>
                    </Grid>

                </div>
            </Grid>
            {/* Middle market block*/}
            <Grid item xs={12} sm={6}>
                <div className={classes.blockMarket}>
                    <Grid
                        className={classes.middleContainer}
                        container
                        spacing={0}>
                        <Grid item xs={12} style={{'display': 'flex'}}>
                            <Typography type="title" color="inherit">
                                Descriptions
                            </Typography>
                            <div style={{'display': 'inline-flex', 'marginLeft': 'auto'}}>
                                <Typography className={classes.searchResultNumber} type="body1" color="inherit">
                                    Found {filteredRows.length}
                                </Typography>
                                <Button onClick={e => setSelectedData(selected)}
                                        className={classes.button} variant="outlined" color="primary"
                                        to="/">Update</Button>

                            </div>
                        </Grid>

                        <Grid item xs={12} style={{'display': 'inline-flex', 'marginTop': '10px'}}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    onKeyUp={handleSearch}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                />

                            </div>


                            <FormControl component="fieldset" style={{'margin': 'auto', 'marginRight': '0'}}>
                                <RadioGroup aria-label="position" name="position" value={radioFilter}
                                            onChange={handleRadioFilterChange} row>

                                    <FormControlLabel
                                        value="AllExcept"
                                        control={<Radio color="primary" size="small"/>}
                                        label="All Except"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="All"
                                        control={<Radio color="primary" size="small"/>}
                                        label="All"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={classes.root}>
                                <div className={classes.paper}>
                                    <StyledTable
                                        rows={filteredRows}
                                        rowCount={filteredRows.length}
                                        headCells={headCells}
                                        checked={checked}
                                        order={order}
                                        isDate={isDate}
                                        orderBy={orderBy}
                                        selected={selected}
                                        page={page}
                                        dense={dense}
                                        rowsPerPage={rowsPerPage}
                                        setOrder={setOrder}
                                        setOrderBy={setOrderBy}
                                        setSelected={setSelected}
                                        setPage={setPage}
                                        setDense={setDense}
                                        setRowsPerPage={setRowsPerPage}
                                        setChecked={setChecked}>
                                    </StyledTable>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </div>
            </Grid>
        </Fragment>
    );
};


export default connect(
    mapState,
    actions,
    null, {
        forwardRef: true
    }
)(withStyles(styles)(Data));
