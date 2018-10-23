import {Component} from "React";
import {addWindowEventListener, removeWindowEventListener} from '../enhancer/WindowEventHandlers'

export let WindowEventEnhancer = (registedListener, removedListener) => class extends Component {
    componentDidMount() {
        addWindowEventListener('click', registedListener.bind(this));
    }

    componentWillUnmount() {
        let listener = removedListener ? removedListener : registedListener;
        removeWindowEventListener("click", listener.bind(this));
    }
};