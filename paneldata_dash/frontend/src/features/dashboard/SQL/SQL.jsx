import React, {Fragment} from 'react';

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

// Icons
import StorageIcon from '@material-ui/icons/Storage';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import LoadingComponent from "../../../app/layout/LoadingComponent";
// Redux
import {connect} from 'react-redux';
import {
    customQueryCsvExport,
    getCustomQueryData,
    uploadCsv
} from "../dashboardActions";
import {fade} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import {objectParamsToArray} from "../../../app/common/util/helpers";
import Typography from "@material-ui/core/Typography";




const styles = (theme) => ({
    ...theme.styles,
    search: {
        height:'100%',
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

        },
        [theme.breakpoints.down('sm')]: {
           marginBottom:'15px'

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
        width:'100%',
        color: 'inherit',
    },
    inputInput: {
        marginLeft: 0,
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',

    },
    sqlContainer: {
        margin: 'auto',
        marginTop:'30px',
        display:'flex',
        [theme.breakpoints.down('sm')]: {
            display:'block'

        },

    },
    button: {
        minWidth: '100px',
        fontSize: '10px'
    },
    table: {
        minWidth: 650,
    },
    resultTable:{
        marginTop:'30px'
    },
    hintContainer:{
        maxWidth:'1200px'
    },
    hintHeading:{
        marginTop:'15px',
        fontSize:'21px',
        lineHeight:'25px',
        color:'#1D1D1D'
    },
    hintQuery:{
        marginLeft:'5px',
        marginTop:'4px',
        fontSize:'16px',
        lineHeight:'18px',
        color:'#16AB88'
    },
    listOfColumns:{
        marginTop:'15px',
        marginLeft:'5px',
        fontSize:'16px',
        lineHeight:'18px',
        color:'#1D1D1D'
    }
});

const mapState = state => ({
    loading: state.async.loading,
    query: state.data.query
});

const actions = {
    uploadCsv,
    getCustomQueryData,
    customQueryCsvExport
};

const SQL = ({classes, uploadCsv, getCustomQueryData,customQueryCsvExport, loading, query}) => {


    const [sqlQuery, setSqlQuery] = React.useState('');

    const handleSQLExport = () => {

        customQueryCsvExport(sqlQuery)

    }

    const handleSQLQuery = () => {
        getCustomQueryData(sqlQuery)
    }
    const handleShowTables = () => {
        getCustomQueryData('show tables');
    }
    const changeSqlQuery = (evt) => {
        if (evt && evt.target) {
            setSqlQuery(evt.target.value);

        }
    }

    const headCells = [];
    const filteredRows = [];
    if(query && query.length>0){
        let row = query[0]
        for (let prop in row) {
            headCells.push({id: prop, numeric: false, disablePadding: true, label: prop})
        }
        for(let row in query){
            let tempData = {}
            for(const [key, value] of Object.entries(query[row])){
                tempData[key] = value
            }
            filteredRows.push(tempData);
        }

    }
    return (
        <Fragment>
            {loading ? <LoadingComponent />:null}
            <div className={classes.hintContainer}>
                <Typography variant="h3" className={classes.hintHeading}>
                    Here are some queries to try out:
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    SELECT * FROM brands
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    SELECT id, name FROM brands
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    SELECT id, name AS market_name FROM markets
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    SELECT d.retailer, d.department, p.name AS period_name, b.name AS brand_name FROM johnson_scanner_data d JOIN brands b ON d.brand_id = b.id JOIN periods p ON p.id = d.period_id
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    DESCRIBE markets
                </Typography>

                <Typography variant="h3" className={classes.listOfColumns}>
                    List of of available commands:
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                   SELECT
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    DESCRIBE
                </Typography>
                <Typography variant="h3" className={classes.listOfColumns}>
                    List of of the columns you can use in order to form a different queries:
                </Typography>
                <Typography variant="h3" className={classes.hintQuery}>
                    "id", "brand_id", "description", "brand_name", "category_id", "category_name", "period_id", "value", "name","johnson_scanner_data_id", "period_name", "market_id", "market_name","fact_id", "fact_name", "department", "retailer"

                </Typography>


            </div>
            <div  className={classes.sqlContainer}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <StorageIcon/>
                        </div>
                        <InputBase
                            onKeyUp={changeSqlQuery}
                            placeholder="SQL Query..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />

                    </div>

                    <div className={classes.buttons}>
                        <Button onClick={handleSQLQuery}
                                style={{'marginRight':'5px'}}
                                className={classes.button} variant="outlined" color="primary"
                                to="/">Execute</Button>
                        <Button onClick={handleSQLExport}
                                style={{'marginRight':'10px'}}
                                className={classes.button} variant="outlined" color="primary"
                                to="/">Export CSV</Button>

                        <Button onClick={handleShowTables}
                                className={classes.button} variant="outlined" color="primary"
                                to="/">Show tables</Button>
                    </div>

            </div>
            <Grid container className={classes.resultTable}>
                <Grid item xs={12}>
                    <TableContainer component={Paper} style={{'width':'94%'}}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headCells.map(cell => (
                                        <TableCell>{cell.id}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredRows.map(row => (

                                    <TableRow key={row.id}>

                                        {objectParamsToArray(row).map(item => (
                                            <TableCell key={item[0]} align="">{item[1]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Fragment>
    );
};


export default connect(
    mapState,
    actions,

)(withStyles(styles)(SQL))
