export default function RawCode(props) {

    return <div style={{color: 'white', whiteSpace: 'pre-wrap', height: '100vh', overflow: 'auto'}}>
        <p>{props.location.data}</p>
    </div>
}