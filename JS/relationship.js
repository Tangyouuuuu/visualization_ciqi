var svg = d3.select('svg');

const svgwidth = 1200;
const svgheight = 610;
const margin = 20;

//部分常数
let ii = 10;
let flag = 1;

//新建分组，存放力导向图
let relation = d3.select('.relationship')
    .append('svg')
    .attr('height', svgheight)
    .attr('width', svgwidth);

//新建一个力导向图
let forceSimulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-100))  //负数为斥力
    .force("links", d3.forceLink(d3.links))
    .force("center", d3.forceCenter())
    .force('collide', d3.forceCollide().radius(35).iterations(2))   //碰撞
    .velocityDecay(0.7);   //速度衰减率

//设置图形的中心位置
forceSimulation.force("center")
    .x(svgwidth / 2)
    .y(svgheight / 2);

//生成节点数据
forceSimulation.nodes(nodes)
    .on("tick", ticked);

//生成边数据
forceSimulation.force("links")
    .links(edges)
    .distance(function (d, i) {
        if (i <= 6)
            return 150;
        else {
            ii = (ii + 18) * flag;
            flag = flag * -1;
            return 120 + ii;
        }
    })

//测试是否抓到数据
// console.log(nodes);
// console.log(edges);

//绘制边
let links = relation.append("g")
    .attr("class", "linksLine")
    .selectAll("line")
    .data(edges)
    .join("line")
    .attr("stroke", function (d, i) {
        if (i <= 8)
            return "#687850";
        else
            return "rgba(161,146,140,0.54)";
    })
    .attr("stroke-width", 1)
    .attr("class", function (d, i) {
        if (i <= 8)
            return "dynasty";
        else
            return "ciqi";
    })
    .attr("id", (d, i) => "l" + i);

//节点分组
let gs = relation.selectAll(".circleText")
    .data(nodes)
    .join("g")
    .attr("class", "nodes")
    .attr("details", d => d.details)
    .attr("url", d => d.imageURL)
    .attr("id", d => "p" + d.id)
    .attr("transform", function (d, i) {
        let cirX = d.x;
        let cirY = d.y;
        return "translate(" + cirX + "," + cirY + ")";
    })
    .call(d3.drag()
        .on("start", started)
        .on("drag", dragged)
        .on("end", ended)
    );

//文本介绍
let intTexts = relation.append("g").selectAll('text');

//历史顺序文本
let dynasty = relation.append("text").text("▫新石器——先秦——秦汉——魏晋——南北朝——隋唐——五代十国——两宋——元朝——明清▫")
    .attr("transform", `translate(210,15)`)
    .attr("font-family", "楷体")
    .attr("fill", "#4c3e35")
    .attr("class", "dynasty")
    .attr("font-size", 19);
relation.append("text").text("【点击或拖拽朝代节点】")
    .attr("transform", `translate(523,40)`)
    .attr("font-family", "华文中宋")
    .attr("fill", "#aba39d")
    .attr("class", "dynasty")
    .attr("font-size", 15);
forceCreate();

//节点鼠标交互（节点拓展）
gs.on("click", function () {
    let selectId = d3.select(this).attr("id");
    switch (selectId) {
        case "p1":
            forceVisible();
            relation.select("line#l9").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l10").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g10").attr("fill", "rgb(250,154,89)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("circle#g11").attr("fill", "rgb(251,166,95)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g10").text("彩陶");
            gs.select("text#g11").text("黑陶");
            break;
        case "p2":
            forceVisible();
            relation.select("line#l11").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l12").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g12").attr("fill", "rgb(252,177,103)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("circle#g13").attr("fill", "rgb(253,188,110)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g12").text("原始瓷器");
            gs.select("text#g13").text("兵马俑");
            break;
        case "p3":
            forceVisible();
            relation.select("line#l13").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g14").attr("fill", "rgb(251,197,118)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g14").text("铅釉陶");
            break;
        case "p4":
            forceVisible();
            relation.select("line#l14").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g15").attr("fill", "rgb(252,207,127)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g15").text("黑釉瓷");
            break;
        case "p5":
            forceVisible();
            relation.select("line#l15").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g16").attr("fill", "rgb(252,216,135)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g16").text("青瓷");
            break;
        case "p6":
            forceVisible();
            relation.select("line#l16").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l17").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l18").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l19").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g17").attr("fill", "rgb(252,224,144)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g17").text("越州窑");
            gs.select("circle#g18").attr("fill", "rgb(252,231,154)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g18").text("釉下彩");
            gs.select("circle#g19").attr("fill", "rgb(252,237,162)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g19").text("唐三彩");
            gs.select("circle#g20").attr("fill", "rgb(251,242,169)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g20").text("南青北白");
            break;
        case "p7":
            forceVisible();
            break;
        case "p8":
            forceVisible();
            relation.select("line#l20").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l21").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l22").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l23").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l24").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l25").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l26").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l27").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g21").attr("fill", "rgb(250,246,174)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g21").text("汝窑");
            gs.select("circle#g22").attr("fill", "rgb(248,248,175)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g22").text("官窑");
            gs.select("circle#g23").attr("fill", "rgb(245,249,173)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g23").text("哥窑");
            gs.select("circle#g24").attr("fill", "rgb(240,248,170)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g24").text("定窑");
            gs.select("circle#g25").attr("fill", "rgb(234,246,165)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g25").text("钧窑");
            gs.select("circle#g26").attr("fill", "rgb(227,243,161)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g26").text("耀州窑");
            gs.select("circle#g27").attr("fill", "rgb(219,240,158)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g27").text("磁州窑");
            gs.select("circle#g28").attr("fill", "rgb(209,236,157)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g28").text("龙泉窑");
            break;
        case "p9":
            forceVisible();
            relation.select("line#l28").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l29").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l30").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g29").attr("fill", "rgb(199,232,158)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g29").text("景德镇窑");
            gs.select("circle#g30").attr("fill", "rgb(187,227,159)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g30").text("青花瓷");
            gs.select("circle#g31").attr("fill", "rgb(175,222,160)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g31").text("釉里红");
            break;
        case "p10":
            forceVisible();
            relation.select("line#l31").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l32").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l33").attr("stroke", "rgba(161,146,140,0.54)");
            relation.select("line#l34").attr("stroke", "rgba(161,146,140,0.54)");
            gs.select("circle#g32").attr("fill", "rgb(162,217,162)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g32").text("斗彩");
            gs.select("circle#g33").attr("fill", "rgb(149,212,163)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g33").text("五彩");
            gs.select("circle#g34").attr("fill", "rgb(136,206,164)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g34").text("粉彩");
            gs.select("circle#g35").attr("fill", "rgb(123,199,165)").attr("stroke", "rgba(220,197,177,0.53)");
            gs.select("text#g35").text("珐琅彩");
            break;
    }
})

//力导向图相关函数
function ticked() {
    links.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });

    gs.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    gs.attr("cx", function (d) {
        if (d.y <= 450 && d.y >= 0 && d.x <= svgwidth && d.x >= 0)
            return d.x = Math.max(80, Math.min(svgwidth - 100, d.x));
        else if (d.y > 450 && d.y <= svgheight && d.x <= 450 && d.x >= 0)
            return d.x = Math.max(80, Math.min(svgwidth - 300, d.x));
        else
            return d.x = Math.max(80, Math.min(svgwidth - 100, d.x));
    })
        .attr("cy", function (d) {
            if (d.x <= 450 && d.y > 470 && d.x >= 0 && d.y <= svgheight)
                return d.y = Math.max(80, Math.min(svgheight - 300, d.y));
            else if (d.x > 450 && d.y <= svgheight && d.x <= svgwidth)
                return d.y = Math.max(80, Math.min(svgheight - 100, d.y));
            else
                return d.y = Math.max(80, Math.min(svgheight - 100, d.y));
        });
}

function started(d) {
    if (!d.active) {
        forceSimulation.alphaTarget(0.8).restart();//设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.subject.x = d.x;
    d.subject.y = d.y;
}

function ended(d) {
    if (!d.active) {
        forceSimulation.alphaTarget(0);
    }
    d.x = null;
    d.y = null;
}

//力导向图
function forceCreate() {
    let r = 246;
    let g = 231;
    let b = 137;
    let temp = 20;
    let p = 0.27;

    //绘制节点
    gs.append("circle")
        .attr("r", function (d) {
            if (d.id <= 10)
                return 35;
            else
                return 22;
        })
        .attr("fill", function (d, i) {
            let colors = d3.quantize(t => d3.interpolateSpectral(t * 1.23 + p), nodes.length);
            const colorScale = d3.scaleOrdinal().domain(nodes).range(colors);
            if (d.id <= 10) {
                temp = temp + 23;
                return d3.rgb(r - temp / 2, g - temp / 4, b - temp / 4);
            }
            p = p + 0.02;
            return colorScale(i);
        })
        .attr("stroke", "rgba(220,197,177,0.53)")
        .attr("class", function (d) {
            if (d.id <= 10)
                return "dynasty";
            else
                return "ciqi";
        })
        .attr("stroke-width", 5)
        .attr("id", (d, i) => "g" + i);

    //绘制朝代节点细节
    gs.append("circle")
        .attr("r", function (d) {
            if (d.id <= 10)
                return 40;
            else
                return null;
        })
        .attr("fill", "none")
        .attr("stroke", "rgba(196,160,135,0.53)")
        .attr("stroke-width", 2)
        .attr("class", function (d) {
            if (d.id <= 10)
                return "dynasty";
            else
                return "ciqi";
        })
        .attr("id", (d, i) => "g" + i);

    //节点文字1-朝代
    gs.append("text")
        .attr("x", d => d.cx)
        .attr("y", d => d.cy)
        .attr("dy", 5)
        .attr("dx", function (d) {
            if (d.id == 1 || d.id == 5)
                return -35;
            else if (d.id == 7)
                return -50;
            else if (d.id <= 10)
                return -28;
            else
                return -18;
        })
        .text(function (d) {
            return d.name;
        })
        .attr("font-size", function (d) {
            if (d.id <= 10)
                return 25;
            else
                return 13;
        })
        .attr("fill", "#5a4b40")
        .attr("font-family", function (d) {
            if (d.id <= 10)
                return "华文隶书";
            else
                return "微软雅黑"
        })
        .attr("class", function (d) {
            if (d.id <= 10)
                return "dynasty";
            else
                return "ciqi";
        })
        .attr("id", (d, i) => "g" + i);

    //节点文字2-年份
    gs.append("text")
        .attr("x", d => d.cx)
        .attr("y", d => d.cy)
        .attr("dx", function (d) {
            if (d.id == 1)
                return -28;
            else if (d.id == 2)
                return -46;
            else if (d.id == 3)
                return -36;
            else
                return -30;
        })
        .attr("dy", 20)
        .text(function (d) {
            if (d.id <= 10) {
                return d.time;
            }
        })
        .attr("font-size", 11)
        .attr("fill", "#716055")
        .attr("class", function (d) {
            if (d.id <= 10)
                return "dynasty";
            else
                return "ciqi";
        })
        .attr("id", (d, i) => "g" + i);
}

//力导向图伸缩
function forceVisible() {
    gs.selectAll("circle").remove();
    gs.selectAll("text").remove();
    relation.selectAll("line.ciqi").attr("stroke", "none");
    forceCreate();
    gs.selectAll("circle.ciqi").attr("stroke", "none").attr("fill", "none");
    gs.selectAll("text.ciqi").text('');
    gs.on("mouseover", function (d) {
        let x = d.x;
        let y = d.y;
        let str = d3.select(this).attr("details");
        //介绍文本
        let intRects = relation.append("image")
            .data(nodes)
            .attr("class", "images").attr("xlink:href", d3.select(this).attr("url"))
            .attr("x", 25)
            .attr("y", 430)
            .attr("width", 405);
        intTexts.text(appendMultiText(relation, str, 155, 466, 247, 16, "info", "华文中宋").attr("fill", "#635d4b"))
    })
        .on("mouseout", function (d) {
            d3.selectAll("text.info").transition().duration(500).remove();
            d3.selectAll("image.images").transition().duration(500).remove();
        })
}