import element from 'virtual-element';


export default {
    render({
        props: {
            symbol,
            color,
            onRemove
        }
    }) {
        return <div class="stocktag">
            <div>{symbol}</div>
            <div class="colorblock" style={`background-color:${color};`}></div>
            <button class="closebtn" onClick={onRemove}>&#x274c;</button>
        </div>;
    }
};