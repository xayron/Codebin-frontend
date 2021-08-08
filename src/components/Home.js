import React from 'react';
import Body from '../components/Body';
import Head from '../components/Head';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import languages from '../data/constants';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '1.5vw 2.5vw',
        marginBottom: '0',
        minWidth: 130,
    },
    menuPaper: {
        maxHeight: '60vh',
        color: 'white',
        background: 'black',
    },
    hiddenScroll: { overflow: 'hidden' },
    select: { color: 'white' },
    icon: { color: 'white' },
}));

function Home(props) {
    const classes = useStyles();

    const [lang, setLang] = React.useState('text');
    const [ext, setExt] = React.useState('txt');

    const handleChange = (event) => {
        languages.forEach(element => {
            if (element.value === event.target.value) {
                setLang(element.value);
                setExt(element.extension ?? 'txt');
            }
        });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Head />
                <FormControl className={classes.formControl}>
                    <InputLabel style={{ color: "#EF9A9A", }}>Language</InputLabel>
                    <Select
                        disableUnderline
                        value={lang}
                        onChange={handleChange}
                        classes={{
                            select: classes.select,
                            icon: classes.icon,
                        }}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                        {languages.map((lang) =>
                            <MenuItem
                                key={lang.lang}
                                value={lang.value}>{lang.lang}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </div>
            <Body lang={lang === 'text' ? '' : lang} extension={ext} data={props.location.data ?? ""} />
        </div>
    );
};

export default Home;