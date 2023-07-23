const svgWidth = 600;
const svgHeight = 800;
const padding = 30;

const map = d3.select(".map")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

/**
 * 获取投影，并配置
 */
const x0 = padding;
const y0 = padding;
const x1 = svgWidth - padding * 2;
const y1 = svgHeight - padding * 2;
const projection = d3.geoMercator()
    .fitExtent(
        [
            [x0, y0], //左上角坐标
            [x1, y1], //右下角坐标
        ], Fujian);
console.log(projection);
/**
 * 获取geographic path generator，并配置
 */
const pathGenerator = d3.geoPath().projection(projection);
/**
 * 利用pathGenerator与features生成path路径，绘制地图
 */
const mapPath = map.selectAll("path")
    .data(Fujian.features) //数据绑定
    .join("path")
    .attr("d", pathGenerator) //绘制path
    .attr("stroke-width", 1);

mapPath.attr("stroke", "#e6f1f0")
    .attr("fill", "#bbc6d3")
    .attr('transform', `translate(50,-50)`);

//地图标点
let points = Fujian.points.features;

let coo = function (d) {
    // 获取经纬度
    let lngLat = d.geometry.coordinates;
    // 转为映射在地图上的坐标
    let coo = projection(lngLat);
    return coo;
}

//保护单位名称
let info = map.append("text").attr("id", "info");

map.selectAll('circle')
    .data(points)
    .join('circle')
    .attr("class", "point")
    .attr("cx", function (d) {
        return coo(d)[0];
    })
    .attr("cy", function (d) {
        return coo(d)[1];
    })
    .attr("fill", "#f67c6a")
    .attr("r", 5)
    .attr('transform', `translate(50,-50)`)
    .attr("name", function (d) {
        return d.objects.name;
    })
    .attr("details", function (d) {
        return d.objects.details;
    });

map.selectAll("circle")
    .data(points)
    .attr('class', d => d.properties.name)
    .on("mouseover", function (event) {
        d3.select(this).style("fill", "#579f97").attr("stroke", "#ffffff").attr("stroke-width", 2)
        //移除图表
        d3.selectAll("g").remove("figure1" + "figure2");
        //添加文字
        info.text(appendMultiText(map, d3.select(this).attr('class'), d3.select(this).attr("cx"), d3.select(this).attr("cy"), 170, 14, "infoes", "simsun").attr("dx", -20).attr("dy", -40))
        info.text(appendMultiText(charts, d3.select(this).attr('name'), 110, 100, 500, 23, "infoes", "微软雅黑"))
        info.text(appendMultiText(charts, d3.select(this).attr('details'), 110, 200, 500, 18, "infoes", "仿宋"))


    })
map.selectAll("circle")
    .on("mouseout", function (event) {
        d3.select(this).style("fill", "#f67c6a").attr("stroke", "none");
        //鼠标移开重新渲染

        d3.csv("data/fujiandata_1.csv", d3.autoType).then(function (data) {
            builder2(data, charts);
        });
        d3.csv("data/fujiandata_2.csv", d3.autoType).then(function (data) {
            builder1(data, charts,"#5a7494","#6c9ac0", 40, -10);
        });
        info.text('')
        charts.selectAll("text.infoes").remove();
        map.selectAll("text.infoes").remove();
    })

//数据，调用对应图表函数
d3.csv("data/fujiandata_1.csv", d3.autoType).then(function (data) {
    builder2(data, charts);
});
d3.csv("data/fujiandata_2.csv", d3.autoType).then(function (data) {
    builder1(data, charts,"#5a7494","#6c9ac0",40,-10);
});