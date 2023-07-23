const charts = d3.select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//非遗数据_按类别
function dataProcessing1(data) {
    let categories = [];      //数组
    let myData;
    myData = data.filter(function (d) {
        return d.category;
    })
    myData = myData.map(function (d) {
        categories.push(d.category);
        return {'category': d.category, 'number': d.number};
    });
    return {data: myData, categories: categories}
}

//非遗数据_按年份
function dataProcessing2(data) {
    let years = [];      //数组
    let myData;
    myData = data.filter(function (d) {
        return d.years;
    })
    myData = myData.map(function (d) {
        years.push(d.years);
        return {'year': d.years, 'amounts': d.amounts};
    });
    return {data: myData, years: years}
}

//饼图
function drawGraphs2(visData, figure) {

    let graphs = figure.append('g').attr('id', 'graphs').attr("transform", `translate(400,200)`);
    let pieChart = graphs.append('g').attr('id', 'pieChart');
    const N = d3.map(visData.data, d => d.category);
    const V = d3.map(visData.data, d => d.number);
    const I = d3.range(N.length).filter(i => !isNaN(V[i]));

    let names = new d3.InternSet(N);
    //颜色
    let colors = d3.quantize(t => d3.interpolateSpectral(t * 0.86 + 0.04), names.size);
    const color = d3.scaleOrdinal().domain(names).range(colors);

    //标题文本
    let title;
    if (title === undefined) {
        const formatValue = d3.format(",");
        title = i => `${N[i]}\n${formatValue(V[i])}`;
    } else {
        const O = d3.map(visData, d => d);
        const T = title;
        title = i => T(O[i], i, visData);
    }

    let innerRadius = 20;
    let outerRadius = Math.min(svgWidth, svgHeight) / 3.8
    let labelRadius = (innerRadius * 0.2 + outerRadius * 0.8)
    let stroke = innerRadius > 0 ? "none" : "white"
    let strokeWidth = 5
    let strokeLinejoin = "round"
    let padAngle = stroke === "none" ? 1 / outerRadius : 0

    //创建饼图
    const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
    //创建圆弧生成器
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);   //内外半径
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    pieChart.append("g")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", d => color(N[d.data]))
        .attr("d", arc)
        .append("title")
        .text(d => title(d.data));

    pieChart.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data(d => {
            const lines = `${title(d.data)}`.split(/\n/);
            return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
        })
        .join("tspan")
        .attr("x", 0)
        .attr("y", (_, i) => `${i * 2}em`)
        .attr("font-weight", (_, i) => i ? null : "bold")
        .text(d => d);
}

// 比例尺1
function drawAxis1(visData, figure) {
    let width = svgWidth;
    let height = svgHeight;

    let min = d3.min(visData.data, function (d) {
        return d.amounts;
    })
    let max = d3.max(visData.data, d => d.amounts);

    let scalesX = d3.scaleBand().domain(visData.years).range([0, width / 1.7]);        //这是个方法，domain range 两个成员函数
    let scalesY = d3.scaleLinear().domain([0, max]).range([0, height / 5]);
    let scalesM = d3.scaleLinear().domain([max+4, 0]).range([0, height / 5]);

    //比例尺_X轴
    let xAxis = figure.append('g').attr('id', 'xAxis');
    xAxis.call(d3.axisBottom(scalesX).ticks(width))
    xAxis.attr('transform', `translate(100,${height - 70})`)
    xAxis.attr('text-anchor', 'start')
    xAxis.call(d3.axisBottom(scalesX).ticks(width / (visData.data.length - 1)).tickSizeOuter(0));
    xAxis.selectAll('text').attr('transform', `rotate(30)`).attr('x', -5).attr('y', 20)

    //比例尺_Y轴
    let yAxis = figure.append('g').attr('id', 'yAxis');
    yAxis.attr('transform', `translate(100,${height - scalesY(max) - 70})`);
    yAxis.call(d3.axisLeft(scalesM).ticks(height / 100).tickValues(visData.data.amounts), ",d");
    // yAxis.select('.domain').remove(); //隐藏/显示Y轴135
    yAxis.append("text").text('非物质文化遗产数目（个）')
        .attr('transform', `translate(100,-30)`)
        .attr('fill', 'currentColor').attr("font-size", 12);
}

//比例尺2(全国非遗——瓷器）
function drawAxis2(visData, figure) {
    let width = 1200;
    let height = 610;

    let min = d3.min(visData.data, function (d) {
        return d.counts;
    })
    let max = d3.max(visData.data, d => d.counts);

    let scalesX = d3.scaleBand().domain(visData.province).range([0, width / 2.4]);        //这是个方法，domain range 两个成员函数
    let scalesY = d3.scaleLinear().domain([0, max]).range([0, height / 3]);
    let scalesM = d3.scaleLinear().domain([max+2, 0]).range([0, height / 3]);

    //比例尺_X轴
    let xAxis = figure.append('g').attr('id', 'xAxis');
    xAxis.call(d3.axisBottom(scalesX).ticks(width))
    xAxis.attr('transform', `translate(100,${height - 70})`)
    xAxis.attr('text-anchor', 'start')
    xAxis.call(d3.axisBottom(scalesX).ticks(width / (visData.data.length - 1)).tickSizeOuter(0));
    xAxis.selectAll('text').attr('transform', `rotate(30)`).attr('x', -5).attr('y', 20)

    //比例尺_Y轴
    let yAxis = figure.append('g').attr('id', 'yAxis');
    yAxis.attr('transform', `translate(100,${height - scalesY(max) - 70})`);
    yAxis.call(d3.axisLeft(scalesM).ticks(height / 135), ",d");
    // yAxis.select('.domain').remove(); //隐藏/显示Y轴
    yAxis.append("text").text('非物质文化遗产数目（个）')
        .attr('transform', `translate(100,-30)`)
        .attr('fill', 'currentColor').attr("font-size", 12);
}

//图表（折线图和柱状图）
function drawGraphs1(visData, figure, color1, color2, x1,x2) {

    let width = svgWidth;
    let height = svgHeight;
    let min = d3.min(visData.data, function (d) {
        return d.amounts;
    })
    let max = d3.max(visData.data, d => d.amounts);
    let scalesX = d3.scaleBand().domain(visData.years).range([0, width / 1.7]);        //这是个方法，domain range 两个成员函数
    let scalesY = d3.scaleLinear().domain([0, max+4]).range([0, height / 5]);
    let graphs = figure.append('g').attr('id', 'graphs');

    graphs.selectAll('rect').data(visData.data).join('rect')
        .attr('class', d => d.amounts)
        .attr('x', d => scalesX(d.year) + x1)
        .attr('y', d => height - scalesY(d.amounts) + 30)
        .attr('width', scalesX.bandwidth() * 0.3)
        .attr('height', d => scalesY(d.amounts))
        .attr('transform', `translate(86,-100)`)
        .attr('fill', color1)
        //柱状图动画
        //动画开始
        .attr("y", function () {
            let min = scalesY.domain()[0];
            return scalesY(min) + 600;
        })
        .attr("height", function () {
            return 0;
        })
        .transition()
        .delay(function (d, i) {
            return i * 100 + 1200;
        })
        .duration(1000)
        //动画结束
        .attr('y', function (d) {
            return height - scalesY(d.amounts) + 30;
        })
        .attr('height', function (d) {
            return scalesY(d.amounts);
        });

    let info = graphs.append('text').attr('id', 'info');

    graphs.selectAll('rect').on("mouseover", function () {
        d3.select(this).attr('fill', color2);
        info.attr('x', d3.select(this).attr('x'))
            .attr('y', d3.select(this).attr('y'))
            .attr('dx', 0)
            .attr('dy', scalesX.bandwidth() * -0.3)
            .text(d3.select(this).attr('class'))
            .attr('transform', `translate(80,-90)`)
    })
    graphs.selectAll('rect').on("mouseout", function () {
        d3.select(this).attr("fill", color1);
        info.text('')
    })

    //折线线段生成器
    let line1 = d3.line().defined(d => !isNaN(d.amounts))    //必须非空
        .curve(d3.curveLinear)
        .x(d => scalesX(d.year) + 0.2 * scalesX.bandwidth() + x2)
        .y(d => height - scalesY(d.amounts))
    graphs.append('path').attr('d', line1(visData.data)).attr('fill', 'none').attr('stroke', '#0a2363');
    graphs.selectAll('path').attr('transform', `translate(132,-70)`);

    //折线图动态(方形遮罩)
    graphs.append("g").append("rect").attr("x",101).attr("y",575).attr("fill", "#f7f6ec").attr("width", 320).attr("height", 150)
        .transition()
        .duration(1000)
        .attr("x",421).attr("y",575)
        .attr("width", 0).attr("height", 150);
}

//柱状图2(全国非遗——瓷器）
function drawGraphs3(visData, figure) {

    let width = 1200;
    let height = 610;

    let min = d3.min(visData.data, function (d) {
        return d.counts;
    })
    let max = d3.max(visData.data, d => d.counts);

    let scalesX = d3.scaleBand().domain(visData.province).range([0, width / 2.4]);        //这是个方法，domain range 两个成员函数
    let scalesY = d3.scaleLinear().domain([0, max+2]).range([0, height / 3]);

    let graphs = figure.append('g').attr('id', 'graphs');

    graphs.selectAll('rect').data(visData.data).join('rect')
        .attr('class', d => d.counts)
        .attr('x', d => scalesX(d.province) + 33)
        .attr('y', d => height - scalesY(d.counts) + 30)
        .attr('width', scalesX.bandwidth() * 0.3)
        .attr('height', d => scalesY(d.counts))
        .attr('transform', `translate(84,-100)`)
        .attr('fill', "#378ead")
        //柱状图动画
        //动画开始
        .attr("y", function (d) {
            return height - scalesY(d.counts) + 30;
        })
        .attr("height", function (d) {
            return 0;
        })
        .transition()
        .delay(function (d, i) {
            return i * 200;
        })
        .duration(1000)
        //动画结束
        .attr('y', function (d) {
            return height - scalesY(d.counts) + 30;
        })
        .attr('height', function (d) {
            return scalesY(d.counts);
        })
        .attr('width', scalesX.bandwidth() * 0.3);

    let info = graphs.append('text').attr('id', 'info');

    graphs.selectAll('rect').on("mouseover", function (event) {
        d3.select(this).attr('fill', '#e3ad4a');
        info.attr('x', d3.select(this).attr('x'))
            .attr('y', d3.select(this).attr('y'))
            .attr('dx', 28)
            .attr('dy', scalesX.bandwidth() * -0.3)
            .text(d3.select(this).attr('class'))
            .attr('transform', `translate(60,-90)`)
            .attr("font-size", 12)

    })
    graphs.selectAll('rect').on("mouseout", function (event) {
        d3.select(this).attr("fill", '#378ead');
        info.text('')
    })
}

// 柱状图调用
let builder1 = function (data, charts,color1,color2,x1,x2) {
    let figure1 = charts.append('g').attr('id', 'figure1');
    figure1.attr('transform', `translate(60,-120)`)
    let visData1 = dataProcessing2(data);
    dataProcessing2(data);
    drawAxis1(visData1, figure1);
    drawGraphs1(visData1, figure1,color1,color2,x1,x2);
}

// 饼图调用
let builder2 = function (data, charts) {
    let figure2 = charts.append('g').attr('id', 'figure2')
        .attr('transform', `translate(-60,0)`)
    figure2.append("text").text('非物质文化遗产项目个数(个）')
        .attr('transform', `translate(340,390)`)
        .attr("font-size", 12)
        .attr('fill', 'currentColor')
    let visData2 = dataProcessing1(data);
    dataProcessing1(data);
    drawGraphs2(visData2, figure2);
}

//全国瓷器非遗_按省份
function dataProcessing3(data) {
    let provinces = [];      //数组
    let myData;
    myData = data.filter(function (d) {
        return d.province;
    })
    myData = myData.map(function (d) {
        provinces.push(d.province);
        return {'province': d.province, 'counts': d.counts};
    });
    return {data: myData, province: provinces}
}

// 柱状图调用(全国非遗——瓷器）
let builder3 = function (data, culChart) {
    let figure1 = culChart.append('g').attr('id', 'figure1');
    figure1.attr('transform', `translate(60,-120)`)
    let visData1 = dataProcessing3(data);
    dataProcessing3(data);
    drawAxis2(visData1, figure1);
    drawGraphs3(visData1, figure1);
}

//工艺釉色数量
function dataProcessing4(data) {
    let dynasties = [];      //数组
    let myData;
    myData = data.filter(function (d) {
        return d.dynasty;
    })
    myData = myData.map(function (d) {
        dynasties.push(d.dynasty);
        return {'dynasty': d.dynasty, 'accounts': d.accounts};
    });
    return {data: myData, dynasties: dynasties}
}
//工艺釉色比例尺
function drawAxis3(visData, figure) {
    let width = 1200;
    let height = 610;
    let scalesX = d3.scaleBand().domain(visData.dynasties).range([0, width / 1.5]);        //这是个方法，domain range 两个成员函数
    //比例尺_X轴
    let xAxis = figure.append('g').attr('id', 'xAxis');
    xAxis.call(d3.axisBottom(scalesX).ticks(width))
    xAxis.attr('transform', `translate(250,${height - 170})`)
    xAxis.attr('text-anchor', 'middle')
    xAxis.call(d3.axisBottom(scalesX).ticks(width / (visData.data.length - 1)).tickSizeOuter(0));
    xAxis.selectAll('text').attr("font-size", 13).attr("font-family", "华文中宋").attr("y", -41)
        .attr('writing-mode', 'tb-rl');
}
//工艺比例尺生成
let buildAxis = function (data, charts) {
    let figure1 = charts.append('g').attr('id', 'figure1');
    figure1.attr('transform', `translate(60,-120)`)
    let visData1 = dataProcessing4(data);
    dataProcessing4(data);
    drawAxis3(visData1, figure1);
}

//宗教时间数据
function dataProcessing5(data) {
    let dynasties = [];      //数组
    let myData;
    myData = data.filter(function (d) {
        return d.dynasty;
    })
    myData = myData.map(function (d) {
        dynasties.push(d.dynasty);
        return {'dynasty': d.dynasty};
    });
    return {data: myData, dynasties: dynasties}
}
//宗教时间轴
function drawAxis4(visData, figure) {
    let width = 1200;
    let height = 610;
    let scalesX = d3.scaleBand().domain(visData.dynasties).range([0, width / 1.3]);        //这是个方法，domain range 两个成员函数
    //比例尺_X轴
    let xAxis = figure.append('g').attr('id', 'xAxis');
    xAxis.call(d3.axisBottom(scalesX).ticks(width))
    xAxis.attr('transform', `translate(250,${height - 170})`)
    xAxis.attr('text-anchor', 'start')
    xAxis.call(d3.axisBottom(scalesX).ticks(width / (visData.data.length - 1)).tickSizeOuter(0));
    xAxis.selectAll('text').attr("font-size", 13).attr("font-family", "华文中宋").attr("y", 0)
        .attr('writing-mode', 'tb-rl');
}
//宗教时间轴生成
let buildAxisZongjiao = function (data, charts) {
    let figure1 = charts.append('g').attr('id', 'figure1');
    figure1.attr('transform', `translate(25,30)`)
    let visData1 = dataProcessing5(data);
    dataProcessing5(data);
    drawAxis4(visData1, figure1);
}

