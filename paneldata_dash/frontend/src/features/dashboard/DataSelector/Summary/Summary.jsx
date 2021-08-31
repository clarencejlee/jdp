import React from 'react';

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StyledTreeItem from "../../../../app/common/components/StyledTreeItem";
import TreeView from "@material-ui/lab/TreeView";

// Icons
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {FolderOpen} from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const styles = (theme) => ({
    ...theme.styles,
    blockMarket: {
        overflow: 'scroll',
        backgroundColor: '#FFFFFF',
        border: '1px solid RGB(232, 232, 232)',
        height: '85vh'
    },
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
    summaryContainer: {
        minWidth: '250px',
        padding: '15px',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingBottom: '5px',
        minHeight: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '100%'
    }


});
const Summary = ({classes, handleCsvExport, brands, markets, categories, allSelected, facts, periods, resetSelected}) => {

    const styledButton = [classes.button];
    if(allSelected)
        styledButton.push(classes.activeButton);

    let mappedSummary = [];
    if(markets.length > 0){
        mappedSummary.push({id: 1, name: 'Markets', values:[...markets]})
    }
    if(categories.length > 0){
        mappedSummary.push({id: 2, name: 'Categories', values:[...categories]})
    }
    if(brands.length > 0){
        mappedSummary.push({id: 3, name: 'Brands', values:[...brands]})
    }
    if(periods.length > 0){
        mappedSummary.push({id:4, name: 'Periods', values:[...periods]})
    }
    if(facts.length > 0){
        mappedSummary.push({id:5, name: 'Facts', values:[...facts]})
    }

    return (
        <Grid item xs={12} sm={3}>
            <div className={classes.blockMarket}>
                <Grid container spacing={0}
                      className={classes.summaryContainer}>
                    <Grid item xs={12}
                          style={{'display': 'flex', 'justifyContent': 'space-between'}}>
                        <Typography type="title" color="inherit">
                            Summary
                        </Typography>
                        <div>
                            {/* <Button className={classes.button} variant="outlined" color="primary"
                                                            to="/">Save</Button>*/}
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <TreeView
                            className={classes.root}
                            defaultExpanded={["3"]}
                            defaultCollapseIcon={<ArrowDropDownIcon/>}
                            defaultExpandIcon={<ArrowRightIcon/>}
                            defaultEndIcon={<div style={{width: 24}}/>}>
                            {mappedSummary && mappedSummary.map(summary =>
                                <StyledTreeItem key={summary.id} nodeId={summary.id} labelText={summary.name}
                                                labelIcon={FolderOpen}>
                                    <StyledTreeItem
                                        key={summary.id}
                                        nodeId={summary.id + 'Characteristics'}
                                        labelText="Characteristics"
                                        labelIcon={FolderOpen}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe">

                                        <StyledTreeItem
                                            nodeId={summary.id + summary.name}
                                            labelText={summary.name + ' Description'}
                                            labelIcon={FolderOpen}
                                            color="#a250f5"
                                            bgColor="#f3e8fd">

                                            {summary && summary.values.map(val =>
                                                <StyledTreeItem
                                                    key={val}
                                                    nodeId={val.id.toString()}
                                                    labelText={val.name}
                                                    labelIcon={FiberManualRecordIcon}
                                                    color="#e3742f"
                                                    bgColor="#fcefe3"/>
                                            )}

                                        </StyledTreeItem>
                                    </StyledTreeItem>
                                </StyledTreeItem>
                            )}

                        </TreeView>
                    </Grid>
                    <Grid item xs={12}
                          style={{'display': 'flex', 'justifyContent': 'flex-end'}}>
                        <div>
                            <Button style={{'marginRight': '5px'}} className={classes.button}
                                    onClick={e => resetSelected()}
                                    variant="outlined" color="primary"
                                    to="/">Cancel</Button>
                        </div>
                        <div>

                            { allSelected ?
                                <Button  onClick={handleCsvExport} className={styledButton.join(' ')} variant="outlined"
                                         color={allSelected ? 'primary':'secondary'}
                                         to="/">OK</Button>:
                                <Button className={styledButton.join(' ')} variant="outlined"
                                        color={allSelected ? 'primary':'secondary'}
                                        to="/">OK</Button>}
                        </div>

                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
};

export default (withStyles(styles)(Summary));





