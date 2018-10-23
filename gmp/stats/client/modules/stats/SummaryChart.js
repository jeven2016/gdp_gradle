import React, {Component, PropTypes} from 'react'
import is from 'is_js'
import ECharts from 'react-echarts';

export default class SummaryChart extends Component {
    constructChartData() {
        let summaryData = this.props.summary;
        //for xAxis
        let timeArray = summaryData['time'];
        let policySumary = summaryData['data'];
        let keys = Object.keys(policySumary);

        let option = {
            title: {
                //text: 'Policy execution chart',
                //subtext: 'The following diagram indicates the policies execution count within given period'
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'mousemove',
               // backgroundColor: 'yellow',
                //textStyle: {color: 'black'},
                formatter: getTooltipContent(timeArray)
            },
            legend: {
                data: []
            },
            toolbox: {
                show: true,
                feature: {
                    // magicType: {show: true, type: ['stack', 'tiled']},
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: []
        };

        for (let i = 1; i <= timeArray.length; i++) {
            option.xAxis.data.push(i);
        }
        option.legend.data = [...keys];

        Object.keys(policySumary).forEach(key => {
            option.series.push({
                name: key,
                type: 'line',
                smooth: true,
                data: policySumary[key]
            });
        });

        return option;
    }

    render() {
        let summaryData = this.props.summary;
        if (!summaryData) {
            return null;
        }

        let labels = summaryData['time'];
        if (!is.array(labels) || is.empty(labels)) {
            return null;
        }


        return ( <div>
            <ECharts
                option={this.constructChartData()}
                notMerge
                style={{width: '100%', height: '500px'}}
            />
        </div>)

    }
}

SummaryChart.propTypes = {
    summary: PropTypes.shape({
        time: PropTypes.array,
        data: PropTypes.object
    })
};

const getTooltipContent = (timeArray) => (params) => {
    if (is.not.array(params)) {
        throw new Error("the params is not an array!");
    }

    let periodInfo = null;
    let rows = [];
    for (let data of params) {
        if (is.null(periodInfo)) {
            let dataIndex = data.dataIndex;
            let timeInfo = timeArray[dataIndex];
            if (is.undefined(timeInfo)) {
                throw new Error(`the timeinfo(${timeInfo}) is invalid!`);
            }

            let timeDetails = timeInfo.split(/\s+/);
            let date = timeDetails[0];
            let hour = parseInt(timeDetails[1]);

            periodInfo = `<h5>Period: ${date} (${hour}:00 - ${hour + 1}:00)</h5>`;
        }

        if(data.data > 0){
            rows.push(`<tr><td>${data.seriesName}:</td><td>${data.data}</td></tr>`);
        }
    }

    let table = `<table border='1'>${rows.join('')}</table>`;

    return periodInfo + table;
    /* return params[0].name + '? test now<br/>'
     + params[0].seriesName + ' : ' + params[0].value + ' yes now<br/>';*/
};