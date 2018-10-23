import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory} from 'react-router'

import CardExampleControlled from './CardExampleControlled'
// import './test.css'
import './test.scss'

const App = React.createClass({
    render() {
        return (
            <div>
                <h1>App--Home</h1>
                <ul>
                    <li><Link to="/about" activeClassName="activeLink">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <li><Link to="/card">Card</Link></li>
                    <li><Link to="/inbox/messages/25">message25</Link></li>
                    <li><Link to="/inbox/messages/25/hello">hello</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})

const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
})

const Inbox = React.createClass({
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        )
    }
})

const Message = React.createClass({
    render() {
        return <h3>Message {this.props.params.id}</h3>
    }
})

const Home = React.createClass({
    render() {
        return <h3>Home Page</h3>
    }
})


const Hello = React.createClass({
    render() {
        return <h3>Hello Page</h3>
    }
})

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="about" component={About} activeClass="activeLink"/>
            <Route path="inbox" component={Inbox}>
                <Route path="messages/:id" component={Message}>
                    <Route path="hello" component={Hello}/>
                </Route>
            </Route>
            <Route path="card" component={CardExampleControlled}/>
        </Route>
    </Router>
), document.getElementById('root'));