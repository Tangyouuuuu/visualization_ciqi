var svg = d3.select('svg');

const svgWidth = 900;
const svgHeight = 650;
const padding = 10;
const x0 = padding;
const y0 = padding;
const x1 = svgWidth - padding * 2;
const y1 = svgHeight - padding * 2;
const map = d3.select(".map")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
const color = d3.schemeSet3;

let s = 40;
let y = 60;
let y2 = 73;
let f = 264;
let n = 130;
let m = 252;

const projection = d3.geoMercator()
    .fitExtent(
        [
            [x0, y0], //左上角坐标
            [x1, y1], //右下角坐标
        ], ChinaMap);

const pathGenerator = d3.geoPath().projection(projection);

//省份中心坐标获取
let points = ChinaMap.features.map(d => {
    return {name: d.properties.name}
});

//省份坐标转换
let coo = function (d) {
    // 获取经纬度
    let lngLat = d.properties.cp;
    // 转为映射在地图上的坐标
    let coo = projection(lngLat);
    return coo;
}

//新建地图容器
const mapPath = map.append('g')
    .selectAll("path")
    .data(ChinaMap.features) //数据绑定
    .join("path")
    .attr("d", pathGenerator) //绘制path
    .attr("stroke-width", 0.5)
    .attr("stroke", "rgb(205,255,232)")
    .attr("fill", "#8dd3c7")
    .attr("name", function (d) {
        return d.properties.name;
    });

//省份名
let texts = map.append('g')
    .selectAll("text")
    .data(ChinaMap.features)
    .join("text")
    .text(d => d.properties.name)
    .attr("x", function (d) {
        return coo(d)[0];
    })
    .attr("y", function (d) {
        return coo(d)[1];
    })
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .attr('fill', '#115c29');

//下拉框
let selectBox = d3.select('#selectBox').append("g").append('select')
    .attr('class', 'select').attr('width', '50px')
    .attr('height', '20px')
    .attr('stroke', 'black');

// 地图鼠标交互
mapPath.data(ChinaMap.features)
    .on("mouseover", function (event) {
        d3.select(this)
            .attr("fill", "rgba(25,194,116,0.75)")
            .attr("stroke", "rgb(205,255,232)")
            .attr("stroke-width", 0.5)
            .attr("x", function (d) {
                return coo(d)[0];
            })
            .attr("y", function (d) {
                return coo(d)[1];
            })
    })
    //鼠标移开
    .on('mouseout', function (event) {
        d3.select(this)
            .attr('opacity', 1)
            .attr('stroke-width', 1)
            .attr("fill", "#8dd3c7");
    })
    //鼠标按下
    .on('mousedown', function (d) {
        d3.select(this)
            .attr("stroke", "rgb(238,147,106)")
            .attr("fill", "rgb(248,227,150)")
            .attr("stroke-width", 2)
    })
    //鼠标松开
    .on('mouseup', function (d) {
        d3.select(this)
            .attr("fill", "#8dd3c7")
            .attr("stroke", "rgb(205,255,232)")
            .attr("stroke-width", 0.5)
    });

//单击重庆河南地图跳转页面
mapPath.data(ChinaMap.features)
    .attr("id", d => "p" + d.properties.childNum)
    .attr("class", d => d.properties.id)
    .on("click", function (d) {
        if (d3.select(this).attr("class") === "50") {
            window.location.href = "Chongqing.html"
        } else if (d3.select(this).attr("class") === "41") {
            window.location.href = "Henan.html"
        } else if (d3.select(this).attr("class") === "35") {
            window.location.href = "Fujian.html"
        }else if (d3.select(this).attr("class") === "36") {
            window.location.href = "jiangxi.html"
        }
    })

//区域颜色图例
let selectArea = d3.select("#selectArea").append("svg").attr("id", "selRect")
    .attr("width", 300).attr("height", 230);

selectArea.attr('transform', `translate(40,-10)`).append("text").text("分布查询").attr("transform", `translate(0,16)`);

let selData = ChinaMap.address.features;

selectArea.selectAll('rect')
    .data(selData)
    .join('rect')
    .attr('class', 'selects')
    .attr('width', '30')
    .attr('height', '17')
    .attr('x', 0)
    .attr('y', function (d, i) {
        if (i > 0) {
            y = y + s;
            return y;
        }
    })
    .attr('fill', function (d, i) {
        f = f - 40;
        n = n - 25;
        m = m - 15;
        if (i > 0) {
            return d3.rgb(m, f, n);
        } else
            return "none";
    })
    .attr('name', function (d, i) {
        if (i > 0)
            return d.properties.name;
        else
            return "none";
    })
    .attr("transform", `translate(-5,-30)`);

//名瓷、名陶、产区分布文字介绍
let text2 = selectArea.append('g')
    .selectAll('text')
    .data(selData)
    .join('text')
    .text(function (d, i) {
        if (i > 0)
            return d.properties.name;
    })
    .attr('x', 100)
    .attr('y', function (d, i) {
        if (i > 0) {
            y2 = y2 + s;
            return y2;
        }
    })
    .attr('text-anchor', 'right')
    .attr('font-size', 15)
    .attr('fill', '#1d4538')
    .attr('font-family', '微软雅黑')
    .attr("transform", `translate(-5,-30)`);

//简介文本区域
let selectText = d3.select("#selectText").append("svg").attr('height', 300).attr('width', 320)

//下拉框交互，显示区域
d3.json("./data/China.json").then(data => {
    //下拉框
    selectBox.selectAll('option').data(data.features).join('option')
        .attr('value', d => 'p' + d.properties.id)
        .text(d => d.properties.name)
        .attr('name', d => d.properties.details);

    let infos0 = selectText.select(".selectText")
        .append("text")
        .join('text')
        .text(appendMultiText(selectText, '中国是一个文明古国，在悠久的历史长河中，陶瓷是物质文明和精神文明的标志之一。远在10000多年前的新石器时代早期，我们的祖先就在中华大地上发明了制陶术，使我国成为世界上最早制作和使用陶器的国家之一。', -2, 30, 250, 22, "infos", "隶书").attr("fill", "#6f5950"));

    selectBox.on('change', function () {
        let selectId = this[this.selectedIndex].value;
        switch (selectId) {

            case 'p0':
                selectText.selectAll('text.infos').remove();
                let infos0 = selectText.select(".selectText").append("text").join('text').text(appendMultiText(selectText, '中国是一个文明古国，在悠久的历史长河中，陶瓷是物质文明和精神文明的标志之一。远在10000多年前的新石器时代早期，我们的祖先就在中华大地上发明了制陶术，使我国成为世界上最早制作和使用陶器的国家之一。', -2, 30, 250, 22, "infos", "隶书").attr("fill", "#6f5950"))
                map.selectAll("path").attr("fill", "#8dd3c7");
                break;

            case 'p1':
                map.selectAll("path").attr("fill", "#8dd3c7");
                selectText.selectAll('text.infos').remove();
                let infos1 = selectText.select(".selectText").append("text").join('text').text(appendMultiText(selectText, '宋代五大名窑之说，始见于明代皇室收藏目录《宣德鼎彝谱》：“内库所藏柴、汝、官、哥、钧、定名窑器皿，款式典雅者，写图进呈。”清代许之衡《饮流斋说瓷》中说：“吾华制瓷可分三大时期：曰宋，曰明、曰清。宋最有名之有五，所谓柴、汝、官、哥、定是也。更有钧窑，亦甚可贵。”由于柴窑至今未发现窑址，又无实物，因此通常将钧窑列入，与汝、官、哥、定并称为宋代五大名窑。', -2, 30, 250, 19, "infos", "华文中宋").attr("fill", "#5a493e"));
                map.selectAll("path#p1").attr('fill', 'rgb(232,214,75)');
                map.selectAll("path#p11").attr('fill', 'rgb(232,214,75)');
                break;

            case 'p2':
                map.selectAll("path").attr("fill", "#8dd3c7");
                selectText.selectAll('text.infos').remove();
                let infos2 = selectText.select(".selectText").append("text").join('text').text(appendMultiText(selectText, '中国四大名陶，是指江苏宜兴紫砂陶、云南建水紫陶、广西钦州坭兴陶、重庆荣昌安富陶。1953年，在北京举办的全国民间工艺品展览会上，江苏宜兴紫砂陶、广西钦州坭兴陶、云南建水五彩陶、四川荣昌陶器（荣昌区现为重庆市管辖，故“四川荣昌陶”改称“重庆荣昌陶”）以其悠久的历史，卓然不凡的陶瓷品相和深厚的文化内涵，被国家轻工部命名为“中国四大名陶”。', -2, 30, 250, 19, "infos", "华文中宋").attr("fill", "#5a493e"));
                map.selectAll("path#p2").attr('fill', 'rgb(212,164,60)');
                map.selectAll("path#p22").attr('fill', 'rgb(212,164,60)');
                break;

            case 'p3':
                map.selectAll("path").attr("fill", "#8dd3c7");
                selectText.selectAll('text.infos').remove();
                let infos3 = selectText.select(".selectText").append("text").join('text').text(appendMultiText(selectText, '中国现今主要的陶瓷产区分布于江苏省，河南省，河北省，广东省，湖南省，山东省，江西省，福建省。', -2, 30, 250, 19, "infos", "华文中宋").attr("fill", "#5a493e"));
                map.selectAll("path#p11").attr('fill', 'rgb(192,114,25)');
                map.selectAll("path#p22").attr('fill', 'rgb(192,114,25)');
                map.selectAll("path#p3").attr('fill', 'rgb(192,114,25)');
                break;

        }
    });
})

