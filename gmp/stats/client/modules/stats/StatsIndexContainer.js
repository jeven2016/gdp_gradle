import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as StatsActions from './actions/StatsAction'
import StatsIndex from './components/StatsIndex'


//将state绑定到props
const mapStateToProps = (state = {rawData: null, policies: [], filteredPolicies: []})=> {
    return {
        rawData: state.rawData,
        policies: state.policies,
        filteredPolicies: state.filteredPolicies

    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators(StatsActions, dispatch)
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(StatsIndex)