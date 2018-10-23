import React, {Component, PropTypes} from 'react'
import {addWindowEventListener, removeWindowEventListener, preventEvent} from '../../../utlis/EventAttach'
import trim from 'lodash/trim'
import {is} from 'immutable'
import {isArray, isEmptyString, isEmptyValue} from '../../../utlis/CommonValidators'

export default class Policy extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        onItemSelected: PropTypes.func,
        onRemoveItem: PropTypes.func,
        onSearch: PropTypes.func,

        items: PropTypes.array,
        filteredItems: PropTypes.array,
        seletedItems: PropTypes.array
    };

    constructor(args) {
        super(args);

        this.state = {
            show: false,
            filterValue: '',
            inputValue: '',
        }
    }

    componentDidMount() {
        addWindowEventListener('click', this.hide.bind(this));
    }

    //todo: need to investigate how to limit this sub component auto refresh
    shouldComponentUpdate(nextProps, nextState) {
        //this check logic intends to prevent unnessary update to this component
        //if only other component updated but didn't impact this component.
        let isSameProps = this.props === nextProps || is(this.props, nextProps);
        let isSameState = this.state === nextState || is(this.state, nextState);

        if (!isSameProps || !isSameState) {
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        removeWindowEventListener("click", this.hide.bind(this));
    }

    click(evt) {
        this._input.focus();
        this.setState({show: true});
        this.setState({filterValue: ''});

        let clickHandler = this.props.onClick;
        if (clickHandler) {
            clickHandler();
        }

        preventEvent(evt);
    }

    handleItemSelect(policy) {
        // this.state.policies.push(policy);
        const {onItemSelected} = this.props;
        onItemSelected(policy);
        this.setState({show: false});
    }

    hide() {
        if (this.state.show) {
            this.setState({show: false});
        }
    }

    removeSelectedItem(selectedItem, evt) {
        const {onRemoveItem} = this.props;
        if (onRemoveItem) {
            onRemoveItem(selectedItem);
        }
        preventEvent(evt);
    }

    mapSelectedItems() {
        return this.props.seletedItems.map((selectedItem, index)=> {
            return (<div className="tag" key={selectedItem + index} onClick={evt=> {
                evt.preventDefault();
                evt.stopPropagation();
            }}>
                <span className="text">{selectedItem}</span>
                <i className="icon fa fa-close" onClick={this.removeSelectedItem.bind(this, selectedItem)}/>
            </div>)
        });
    }

    changeFilterValue(evt) {
        this.setState({filterValue: evt.target.value});
    }

    searchByFilterValue(evt) {
        this.props.onSearch(evt.target.value);
    }

    handleInputValue(evt) {
        if (evt.key !== 'Enter') {
            return;
        }

        let value = trim(evt.target.value);
        if (isEmptyValue(value)) {
            return;
        }

        if (value.indexOf(',') > 0) {
            let elems = value.split(',');
            elems.forEach(elem=> {
                elem = trim(elem);
                if (!isEmptyValue(elem)) {
                    this.handleItemSelect(elem);
                }
            });
        } else {
            this.handleItemSelect(value);
        }
        this.setState({inputValue: ''})
    }

    getItemsForSelection() {
        const {items, filteredItems} = this.props;
        let isValidItems = isArray(items);
        let isValidFilteredItems = isArray(filteredItems);
        if (!isValidItems && !isValidFilteredItems) {
            return [];
        }

        if (!isValidFilteredItems) {
            return items;
        }

        if (isEmptyString(this.state.filterValue)) {
            return items;
        }

        return filteredItems;
    }

    render() {
        let displayMenu = this.state.show ? "block" : "none";
        let items = this.getItemsForSelection();

        return (
            <div id="search-select" className="search select">
                <input type="hidden" name="country"/>
                <div className="content" onClick={this.click.bind(this)}>
                    {this.mapSelectedItems()}
                    <input type="text" className="info-text" placeholder="select..."
                           onKeyPress={this.handleInputValue.bind(this)}
                           value={this.state.inputValue}
                           onChange={evt=> this.setState({inputValue: evt.target.value})}
                           ref={(input)=>this._input = input}/>
                </div>
                <ul className="menu" style={{display: displayMenu, height: '20rem', overflowY: 'auto'}}>
                    <li className="input-item">
                        <div type="text" className="large icon-input block">
                            <input type="text" className="simple input" placeholder="Search"
                                   onClick={evt=> {
                                       evt.preventDefault();
                                       evt.stopPropagation();
                                   }}
                                   value={this.state.filterValue}
                                   onChange={this.changeFilterValue.bind(this)}
                                   onKeyUp={this.searchByFilterValue.bind(this)}
                            />
                            <i className="fa fa-search icon"/>
                        </div>
                    </li>
                    <li className="label item text align-left">
                        <strong>Total</strong> &nbsp;: {items.length}
                    </li>
                    {
                        items.map(item=> {
                            let itemHandler = this.handleItemSelect.bind(this, item, '22');
                            return (
                                <li key={item} className="item text align-left"
                                    onClick={itemHandler}>{item}</li>
                            );
                        })
                    }
                </ul>

            </div>
        );
    }

}