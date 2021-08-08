import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import axios from "axios";
import { api } from '../data/api';
import CircularProgress from '@material-ui/core/CircularProgress';

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxRows: 1,
            data: props.location.data ?? '',
            loading: false,
        };
    }

    saveFile = async () => {
        if (this.state.data === '') return;
        this.setState({
            ...this.state,
            loading: true,
        });
        if (this.props.location.data === undefined) {
            await axios.post(`${api}/saveFile`, {
                data: this.state.data,
                extension: this.props.extension,
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.props.history.push({
                        pathname: "/" + response.data + '.' + this.props.extension,
                        state: {
                            data: this.state.data,
                            lang: this.props.lang,
                        }
                    });
                }
            }).catch((error) => console.log(error));
        } else {
            await axios.post(`${api}/editFile`, {
                data: this.state.data,
                fileName: this.props.location.fileName,
            }).then((response) => {
                if (response.status === 200) {
                    this.props.history.push({
                        pathname: "/" + response.data,
                        state: {
                            data: this.state.data,
                            lang: this.props.location.lang,
                        }
                    });
                }
            }).catch((error) => console.log(error));
        }
    };



    render() {
        return (<div >
            <TextField
                id="standard-multiline-flexible"
                multiline
                style={{ background: "#0f0f0f", width: '98vw' }}
                value={this.state.data}
                maxRows={this.state.maxRows}
                onChange={(event) => {
                    this.setState({
                        ...this.state,
                        data: event.target.value,
                    });
                }}
                onKeyPress={() => { this.setState({ maxRows: this.state.maxRows + 1 }) }}
                inputProps={{
                    style: {
                        color: "white", height: '70vh', background: "#212121",
                        padding: '1vw', overflow: 'auto', borderRadius: 10
                    },
                }}
                InputProps={{ disableUnderline: true }}
                variant="filled"
            />
            {this.state.loading ? <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <CircularProgress />
            </div> : null}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    style={{
                        margin: '2vh 1vw', background: "#EF9A9A",
                        fontWeight: "bold", textTransform: 'none'
                    }}
                    onClick={this.saveFile}
                >
                    Save
                </Button>
            </div>
        </div >);
    }
}

export default withRouter(TextBox);