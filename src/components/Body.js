import React from "react";
import TextBox from '../components/TextBox'

function Body(props) {
    console.log(props);
    return (
        <div style={{ margin: "0vh 1vw" }}>
            <TextBox
                lang={props.lang === 'Text' ? '' : props.lang}
                extension={props.extension}
            />
        </div>
    );
}

export default Body;
