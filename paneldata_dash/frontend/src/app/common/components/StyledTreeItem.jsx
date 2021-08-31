import React from 'react';

// MUI Stuff
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {fade} from "@material-ui/core";

const styles = (theme) => ({
    ...theme.styles,
    root: {
        color: theme.palette.text.secondary,
        "&:focus > $content": {
            backgroundColor: '#E4F2FE',
        }
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    content: {
        color: theme.palette.text.secondary,

        paddingRight: theme.spacing(0),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular
        }
    },
    group: {

        "& $content": {
            paddingLeft: theme.spacing(0)
        }
    },
    expanded: {},
    label: {
        fontWeight: "inherit",
        color: "inherit"
    },
    labelRoot: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5, 0)
    },
    labelIcon: {
        marginRight: theme.spacing(1)
    },
    labelText: {
        fontWeight: "inherit",
        flexGrow: 1
    }
});

const StyledTreeItem = ({
                        classes,
                        children,
                        labelText,
                        depth = 0, // default depth to 0
                        labelIcon: LabelIcon,
                        labelInfo,
                        color,
                        bgColor,
                        ...other
                        }) => {
    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="primary" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>

                </div>
            }
            style={{
                "--tree-view-color": color,
                "--tree-view-bg-color": bgColor,
                "--node-depth": depth
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                group: classes.group,
                label: classes.label
            }}
            {...other}
        >
            {React.Children.map(children, child => {
                // include depth property to child element
                return React.cloneElement(child, { depth: depth + 1 });
            })}
        </TreeItem>
    );
};

export default withStyles(styles)(StyledTreeItem);
