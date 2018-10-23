let option = {
    title: {
        text: 'Policy execution chart',
        subtext: 'The following diagram indicates the policies execution count within given period'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            return params[0].name + '? test now<br/>'
                + params[0].seriesName + ' : ' + params[0].value + ' yes now<br/>';
        }
    },
    legend: {
        data: ['Plicy_A', 'Plicy_B', 'Plicy_C', 'Plicy_D', 'Plicy_E', 'Plicy_F', 'Plicy_G', 'Plicy_H', "Plicy_I", 'Plicy_J']
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
        data: ['0', '1', '2', '3', '4', '5', '6']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: 'Plicy_A',
        type: 'line',
        smooth: true,
        data: [10, 12, 21, 54, 260, 830, 710]
    },
        {
            name: 'Plicy_B',
            type: 'line',
            smooth: true,
            data: [30, 182, 32, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_C',
            type: 'line',
            smooth: true,
            data: [20, 1132, 43, 234, 120, 90, 20]
        },
        {
            name: 'Plicy_D',
            type: 'line',
            smooth: true,
            data: [30, 182, 56, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_E',
            type: 'line',
            smooth: true,
            data: [30, 182, 12, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_F',
            type: 'line',
            smooth: true,
            data: [30, 182, 345, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_G',
            type: 'line',
            smooth: true,
            data: [30, 182, 56, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_H',
            type: 'line',
            smooth: true,
            data: [30, 182, 87, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_I',
            type: 'line',
            smooth: true,
            data: [30, 182, 89, 791, 390, 30, 10]
        },
        {
            name: 'Plicy_J',
            type: 'line',
            smooth: true,
            data: [30, 182, 12, 791, 390, 30, 10]
        }
    ]
};

export default option;