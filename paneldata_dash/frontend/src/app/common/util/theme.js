export default {
    palette: {
        primary: {
            light: '#4dabf5',
            main: '#2196f3',
            dark: '#1769aa',
            contrastText: '#fff'
        },
        secondary: {
            light: '#f73378',
            main: '#f50057',
            dark: '#ab003c',
            contrastText: '#000',
        },
        green: {
            main: 'green',
        }
    },
    typography:{
        useNextVariants:true
    },
    styles:{
        form: {
            textAlign: 'center'
        },
        image:{
            margin: '20px auto 20px auto'
        },
        pageTitle:{
            margin: '10px auto 10px auto'
        },
        textField:{
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        customError:{
            color: 'red',
            fontSize: '0.8rem',
            marginTop: '10px'
        },
        progress:{
            position: 'absolute'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        paper: {
            padding: 20
        },

        buttons: {
            minWidth:'500px',
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            },

        }
    }
}
