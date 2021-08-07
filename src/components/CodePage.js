import React from 'react';
import Head from '../components/Head';
import { Link } from 'react-router-dom'
import { Typography } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from "axios";
import { localApi, api } from '../data/api';
import CircularProgress from '@material-ui/core/CircularProgress';

class CodePage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data: '',
            path: props.location.pathname.substring(1),
            lang: props.location.state?.lang ?? '',
            loaded: false,
            error: false,
        }
    }

    fetchFile = () => {
        axios.get(`${localApi}/getFileData/${this.state.path}`)
            .then((response) => {
                if (response.data !== '') {
                    this.setState({
                        ...this.state,
                        data: response.data ?? '',
                        loaded: true,
                    });
                } else if (response.data === '') {
                    this.props.history.push({
                        pathname: "/",
                    });
                } else {
                    this.setState({
                        ...this.state,
                        loaded: true,
                        error: true,
                    });
                }
            }).catch((error) => console.log(error));
    }

    componentDidMount() {
        if (this.props.location.state == null) {
            this.fetchFile();
        } else {
            this.setState({
                ...this.state,
                loaded: true,
                data: this.props.location.state.data ?? '',
                path: this.props.location.pathname.substring(1),
            });
        }
    }

    downloadFile = () => {
        if (this.props.location.state === undefined)
            return;
        const url = window.URL.createObjectURL(new Blob([this.props.location.state.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `${this.props.location.state.fileName}.${this.props.location.state.extension}`
        );
        document.body.appendChild(link);
        link.click();
    }

    render() {
        return (
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Head />
                    <div style={{
                        fontWeight: "bold",
                        margin: "1vw",
                    }}>
                        <IconButton
                            component={Link} to={{
                                pathname: "/",
                                data: this.state.data,
                            }}
                            style={{ color: "white" }} aria-label="view-raw">
                            <EditTwoToneIcon />
                        </IconButton>
                        <IconButton
                            component={Link} to={{
                                pathname: "/raw",
                                data: this.state.data,
                            }}
                            style={{ color: "white" }} aria-label="view-raw">
                            <DescriptionTwoToneIcon />
                        </IconButton>
                        <IconButton onClick={this.downloadFile} style={{ color: "white" }} aria-label="view-raw">
                            <GetAppTwoToneIcon />
                        </IconButton>
                    </div>
                </div>
                <div style={{ height: '90vh', overflow: 'auto' }}>
                    {this.state.loaded ?
                        !this.state.error ?
                            <SyntaxHighlighter language={this.state.lang} showLineNumbers style={atomDark} >
                                {this.state.data}
                            </SyntaxHighlighter> : <div
                                style={{
                                    position: 'absolute', left: '50%', top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <Typography
                                    style={{
                                        color: "#E57373",
                                        fontWeight: "bold",
                                        fontSize: "calc(1.3 *calc(0.75vh + 0.75vw))",
                                        marginBottom: 0,
                                        textTransform: 'none',
                                    }}
                                >
                                    Something went wrong. Please try again !
                                </Typography>
                            </div> :
                        <div
                            style={{
                                position: 'absolute', left: '50%', top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <CircularProgress />
                        </div>}
                </div>
            </div>
        );
    }
}

export default CodePage;