import React from 'react';
import Body from '../components/Body';
import Head from '../components/Head';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import languages from '../data/constants';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'black',
        margin: '1.5vw 2vw',
        marginBottom: 0,
        background: 'lightblue',
        textTransform: 'none',
        '&:hover': {
            color: 'black',
            margin: '1.5vw 2vw',
            marginBottom: 0,
            textTransform: 'none',
            background: 'lightblue',
        },
    },
    formControl: {
        margin: '1.5vw 2vw',
        marginBottom: '0',
        minWidth: 120,
    },
    icon: { color: "white" },
    select: {
        color: 'white',
        background: "#202020",
        padding: '1vh 0.8vw',
        borderRadius: 5
    },
    menuPaper: {
        backgroundColor: "#0f0f0f",
        color: 'white',
    }
}));

const Home = () => {
    const classes = useStyles();

    const [lang, setLang] = React.useState('Text');
    const[ext, setExt] = React.useState('txt');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (val) => {
        setAnchorEl(null);
    };

    const changeValue = (langVal, extVal) => {
        setLang(langVal);
        setExt(extVal);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Head />
                <Button classes={{ root: classes.button }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {lang}
                </Button>
                <Menu
                    classes={{ paper: classes.menuPaper }}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {languages.map((lang) =>
                        <MenuItem
                            key={lang.lang}
                            onClick={() => {
                                changeValue(lang.lang, lang.extension?? "txt");
                                handleClose();
                            }}
                            value={lang.value}>{lang.lang}</MenuItem>)
                    }
                </Menu>
            </div>
            <Body lang={lang} extension={ext}/>
        </div>
    );
};

export default Home;