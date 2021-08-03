import React from 'react';
import Head from '../components/Head';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from "axios";

class CodePage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            data: '',
            path: props.location.pathname.substring(1),
        }
    }

    fetchFile = () => {
        axios.get(`http://localhost:8070/Project_Backend/getFileData?fileName=${this.state.path}`)
            .then((response) => {
                this.setState({
                    ...this.state,
                    data: response.data.data?? '',
                });
            });
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            data: this.props.location.state?.data ?? '',
            path: this.props.location.pathname.substring(1),
        });
        if(this.props.location.state == null) {
            console.log("is empty");
            this.fetchFile();
        }
    }

    downloadFile = () => {
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
                        <IconButton style={{ color: "white" }} aria-label="view-raw">
                            <EditTwoToneIcon />
                        </IconButton>
                        <IconButton
                            component={Link} to={{
                                pathname: "/raw",
                                //data: this.props.location?.state.data?? ''
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
                    <SyntaxHighlighter language="javascript" showLineNumbers style={atomDark} >
                        {/* {this.props.location.state.data} */}
                        {this.state.data}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }
}

export default CodePage;