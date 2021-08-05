import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'
import axios from "axios";

class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxRows: 1,
            data: '',
        };
    }

    saveFile = async () => {

        await axios
            .post(`https://codebin-backend.herokuapp.com/saveFile`, {
                data: this.state.data,
                extension: this.props.extension,
            })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    this.props.history.push({
                        pathname: "/" + response.data + '.' + this.props.extension,
                        state: {
                            data: this.state.data,
                            lang: this.props.lang,
                            extension: this.props.extension,
                            fileName: response.data
                        }
                    });
                }
            })
            .catch((error) => console.log(error));
    };



    render() {
        return (<div >
            <TextField
                id="standard-multiline-flexible"
                multiline
                style={{ background: "#0f0f0f", width: '98vw' }}
                maxRows={this.state.maxRows}
                onChange={(event) => {
                    this.setState({
                        ...this.state,
                        data: event.target.value,
                    });
                }}
                onKeyPress={() => { this.setState({ maxRows: this.state.maxRows + 1 }) }}
                inputProps={{
                    style: { color: "white", height: '70vh', background: "#212121", padding: '1vw', overflow: 'auto', borderRadius: 10 },
                }}
                InputProps={{ disableUnderline: true }}
                variant="filled"
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ margin: '2vh 0vw', color: "#EF9A9A", fontWeight: "bold" }}
                    onClick={this.saveFile}
                // component={Link} to={{
                //     pathname: "/asdd",
                //     state: {
                //         data: this.state.data,
                //         lang: this.props.lang,
                //         extension: this.props.extension,
                //         fileName: 'asdd'
                //     }
                // }}
                >
                    Save
                </Button>
            </div>
        </div >);
    }
}

export default withRouter(TextBox);