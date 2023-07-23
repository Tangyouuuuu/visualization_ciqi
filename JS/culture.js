var svg = d3.select('svg');

let intrudeStr1 = '陶瓷文化是人类历史上的重要文化遗产之一，它是人类文明进步的产物。自古以来，人们就喜欢用陶瓷制造日常生活用品，如餐具、容器、烟袋等。在古代，陶瓷还被用来制作建筑、宗教用品和艺术品等。'
let intrudeStr2 = '陶瓷的历史可以追溯到远古时代，最早的陶器出现在中国和日本等地，约有1万多年的历史。在中国，陶瓷的发展经历了先陶后瓷、原始陶器、新石器时代陶器、商周青铜器与陶器的并存、汉代陶器与瓷器共同发展、唐宋时期的盛世、明清时期的精湛工艺等阶段。陶瓷不仅是中国文化的重要组成部分，也对世界陶瓷文化的发展做出了巨大的贡献。'
let intrudeStr3 = '陶瓷文化不仅是一种传统文化，也是一种时尚文化。随着时代的发展，陶瓷的发展与传承也备受关注，相关非物质文化遗产的申报、复合了多种现代新型材料的现代陶瓷的争先问世，无一不昭示着这个领域的活力。它们的存在，更证明了陶瓷文化的与时俱进。'

//新建画布
let culture = d3.select('.culture')
    .append('svg')
    .attr('height', svgheight)
    .attr('width', svgwidth);

//click组
let culClick = culture.selectAll(".clks")
    .data(clicks)
    .join("g")
    .attr("class", d => d.id)
    .attr("transform", `translate(60,-20)`)

//click文字组
culClick.append("text")
    .attr("x", function (d) {
        return d.x;
    })
    .attr("y", function (d) {
        return d.y;
    })
    .attr("class", "culclkText")
    .attr("font-size", 15)
    .attr("font-family", "华文中宋")
    .text(function (d) {
        return d.type;
    })
    .attr("transform", `translate(78,-55)`)
    .attr("fill", "#615045")
    .attr('writing-mode', 'tb-rl') //文本竖排显示

//click图片组
culClickDraw(culClick, d => d.imageURL1, 80);

//首页容器
let indexPage = culture.append("g")
    .attr("class", "indexPage");

//首页介绍文本
appendMultiText(indexPage, intrudeStr1, 500, 100, 550, 20, "intrudeStr", "华文中宋")
    .attr("fill", "#655143");
appendMultiText(indexPage, intrudeStr2, 500, 200, 550, 20, "intrudeStr", "华文中宋")
    .attr("fill", "#655143");
appendMultiText(indexPage, intrudeStr3, 500, 340, 550, 20, "intrudeStr", "华文中宋")
    .attr("fill", "#655143");

//鼠标点击交互，切换分组
culClick.on("click", function () {
    let selectId = d3.select(this).attr("class");
    switch (selectId) {
        //饮食文化
        case 'p1':
            //图标切换
            deleteRemove();
            d3.select(this).select("image.clkimages")
                .attr("xlink:href", d => d.imageURL2);
            d3.select(this).select("text.culclkText")
                .attr("fill", "#ea5a0c");

            //饮食内容容器
            let culYinshi = culture.append("g").attr("class", "culYinshi")
                .attr("transform", `translate(0,-10)`);

            let culYPic = culYinshi.append("g").attr("class", "culYPic");

            culYinshi.append("text")
                .attr("font-size", 15)
                .attr("font-family", "华文中宋")
                .attr("fill", "#4d4334")
                .attr("transform",`translate(650,550)`)
                .transition()
                .delay(2500)
                .text("部分具有考据的饮食器皿文物");

            //颜色比例尺
            let ycolors = d3.quantize(d3.interpolateHcl("#a16d58", "#8d4e34"), yinshi.length);
            const ycolor = d3.scaleOrdinal().domain(yinshi).range(ycolors);

            culYPic.selectAll("rect")
                .data(yinshi)
                .join("rect")
                .attr("width", 100)
                .attr("height", 300)
                .attr("fill", (d, i) => ycolor(i))
                .attr("x", (d, i) => i * 180 + 430)
                .attr("y", (d, i) => 150 + 1000 * Math.pow(-1, i))
                .transition()
                .duration((d, i) => i * 1000 + 600)
                .attr("y", (d, i) => 150 + 50 * Math.pow(-1, i));

            culYPic.selectAll("image")
                .data(yinshi)
                .join("image")
                .attr("width", 180)
                .attr("x", (d, i) => i * 180 + 390)
                .attr("y", (d, i) => 150 + 1000 * Math.pow(-1, i))
                .transition()
                .duration((d, i) => i * 1000 + 600)
                .attr("y", (d, i) => 65 + 50 * Math.pow(-1, i))
                .attr("xlink:href", d => d.imgurl);

            culYPic.selectAll("text")
                .data(yinshi)
                .join("text")
                .attr("x", (d, i) => i * 180 + 480)
                .attr("y", (d, i) => 150 + 1000 * Math.pow(-1, i))
                .transition()
                .duration((d, i) => i * 1000 + 600)
                .attr("y", (d, i) => 280 + 50 * Math.pow(-1, i))
                .text(d => d.description)
                .attr("font-family", "华文新魏")
                .attr("font-size", 20)
                .attr("fill", "#f5e8e4")
                .attr('writing-mode', 'tb-rl');

            break;

        //宗教文化
        case 'p2':
            //图标切换
            deleteRemove();
            d3.select(this).select("image.clkimages")
                .attr("xlink:href", d => d.imageURL2);
            d3.select(this).select("text.culclkText")
                .attr("fill", "#ea910c");

            //宗教内容容器
            let culZongjiao = culture.append("g").attr("class", "culZongjiao");
            let culZChart = culZongjiao.append("g").attr("class", "culZChart");
            d3.csv("data/zongjiaodata.csv", d3.autoType).then(function (data) {
                buildAxisZongjiao(data, culZChart);
            });
            culZChart.append("text").text("各时期宗教发展历程").attr("transform", `translate(650,350)`)
                .attr("font-family", "华文中宋").attr("fill", "#59433e");

            let culZRect = culZongjiao.append("g").attr("class", "culZRect");
            let culPic = culZongjiao.append("g").attr("class", "culPic").attr("transform",`translate(0,-50)`);

            //颜色比例尺
            let colors = d3.quantize(d3.interpolateHcl("#f8df7d", "#c06c24"), zongjiao.length);
            const color = d3.scaleOrdinal().domain(zongjiao).range(colors);

            culZRect.selectAll("rect")
                .data(zongjiao)
                .join("rect")
                .attr("x", d => d.x + 200)
                .attr("y", d => d.y + 50)
                .attr("width", 0)
                .attr("height", d => d.height)
                .transition()
                .duration((d, i) => i * 1500 + 500)
                .attr("width", d => d.width)
                .attr("fill", (d, i) => color(i));

            culZRect.selectAll("circle")
                .data(zongjiao)
                .join("circle")
                .attr("cx", 300)
                .attr("cy", (d, i) => i * 15 + 350)
                .attr("fill", (d, i) => color(i))
                .attr("r", 5);

            culZRect.selectAll("text")
                .data(zongjiao)
                .join("text")
                .text(d => d.name)
                .attr("x", 320)
                .attr("y", (d, i) => i * 15 + 355)
                .attr("fill", "#694f44")
                .attr("font-family", "仿宋")
                .attr("font-size", 13);

            culPic.selectAll("text")
                .data(zjImage)
                .join("text")
                .attr("x", function (d,i) {
                    if(i<=1)
                        return 480;
                    else
                        return i * 140 + 360;
                })
                .attr("y", function (d,i) {
                    if(i<=1)
                        return 110 + i * 115;
                    else
                        return 250;
                })
                .text(d => d.detail)
                .attr("font-family", "华文中宋")
                .attr("font-size", "15")
                .attr("fill", "#594b40")
                .attr('writing-mode', function (d,i) {
                    if (i <= 1)
                        return "tb-rl";
                })
                .attr('text-anchor', 'middle');

            culPic.selectAll("image")
                .data(zjImage)
                .join("image")
                .attr("x", function (d,i) {
                    if(i<=1)
                        return 350;
                    else
                        return i * 140 + 300;
                })
                .attr("y", function (d,i) {
                    if(i<=1)
                        return 50 + i * 115;
                    else
                        return 100;
                })
                .attr("xlink:href", d => d.image)
                .attr("width", 110);

            culPic.selectAll("image")
                .on("mouseover", function (d) {
                    d3.select(this).transition().duration(200).attr("width", 130);
                })
                .on("mouseout", function (d,i) {
                        d3.select(this).transition().duration(200).attr("width", 110);
                })

            break;

        //制瓷工艺
        case 'p3':
            //图标切换
            deleteRemove();
            d3.select(this).select("image.clkimages")
                .attr("xlink:href", d => d.imageURL2);
            d3.select(this).select("text.culclkText")
                .attr("fill", "#c4af47");

            let culGongyi = culture.append("g").attr("class", "culGongyi");
            let culYouse = culGongyi.append("g").attr("class", "culYouse").attr("transform", `translate(70,-255)`);
            let culYouCir = culYouse.append("g").attr("class", "culYouCir").attr("transform", `translate(333,315)`);
            let culGyText = culGongyi.append("g").attr("transform", `translate(333,315)`);
            let culGyPic = culGongyi.append("g").selectAll("g").data(gongyiPic).join("g")
                .attr("class", "culGyPic")
                .attr("transform", `translate(160,35)`);
            culYouCir.append("text").text("釉色更迭").attr('writing-mode', 'tb-rl').attr("font-family", "隶书")
                .attr("x", -40).attr("y", -33).attr("fill", "#655143").attr("font-size", 19);
            d3.csv("data/gongyi.csv", d3.autoType).then(function (data) {
                buildAxis(data, culYouse);
            });

            //釉色
            circleDraw(culYouCir, xinshiqi, 7);
            circleDraw(culYouCir, xianqin, 70);
            circleDraw(culYouCir, qinhan, 132);
            circleDraw(culYouCir, weijin, 193);
            circleDraw(culYouCir, nanbeichao, 254);
            circleDraw(culYouCir, suitang, 317);
            circleDraw(culYouCir, wudai, 378);
            circleDraw(culYouCir, liangsong, 439);
            circleDraw(culYouCir, yuanchao, 500);
            circleDraw(culYouCir, mingchaoqian, 561);
            circleDraw(culYouCir, mingchaozhonghou, 623);
            circleDraw(culYouCir, qingchaoqian, 685);
            circleDraw(culYouCir, qingchaohou, 746);

            gongyiDraw(culGyPic, d => d.imageurl, 100);

            culGyPic.append("text")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                })
                .attr("class", "culgText")
                .attr("font-size", 15)
                .attr("font-family", "华文中宋")
                .attr("transform", `translate(100,400)`)
                .transition()
                .duration((d, i) => i * 150 + 1000)
                .attr("transform", `translate(100,-65)`)
                .text(function (d) {
                    return d.name;
                })
                .attr("fill", "#615045")
                .attr('writing-mode', 'tb-rl') //文本竖排显示

            culGyText.append("text").text("制作流程").attr('writing-mode', 'tb-rl').attr("font-family", "隶书")
                .attr("x", 29).attr("y", -20).attr("fill", "#655143").attr("font-size", 19);

            break;

        //文物馆藏
        case 'p4':
            //图标切换
            deleteRemove();
            d3.select(this).select("image.clkimages")
                .attr("xlink:href", d => d.imageURL2);
            d3.select(this).select("text.culclkText")
                .attr("fill", "#58a64b");

            //文物内容容器
            let culWenwu = culture.append("g").attr("class", "culWenwu");
            let culWChart = culWenwu.append("g").attr("class", "culWChart");

            //各朝代文物出土数（数据来源：故宫博物馆）
            d3.csv("./data/wenwu.csv", d3.autoType).then(function (data) {

                //颜色比例尺
                let colors = d3.quantize(d3.interpolateHcl("#ea775d", "#99d3aa"), data.length);
                const color = d3.scaleOrdinal().domain(dataProcessing4(data).dynasties).range(colors);

                //图表容器
                let Wchart = culWChart.append("g").attr("transform", `translate(100,-50)`);

                //线性比例尺
                let scaleRadius = d3.scaleLinear()
                    .domain([50, d3.max(data.map((d) => d.accounts))])
                    .range([145, d3.min([210, 210])]);

                let drawData = d3.pie()
                    .value(function (d) {
                        return d.accounts;
                    })
                    .startAngle(0)
                    .endAngle(Math.PI * 2)(data);

                // 扇形绘制组
                const arcs = Wchart.append("g")
                    .attr("class", "pie")
                    .attr("transform", `translate(500,300)`);

                //标题
                arcs.append("text")
                    .attr("transform", `translate(-75,700)`)
                    .transition()
                    .duration(1100)
                    .text("中国各时期陶瓷文物馆藏")
                    .attr("transform", `translate(-75,290)`)
                    .attr("font-family", "华文中宋")
                    .attr("fill", "#735e4f");
                arcs.append("text")
                    .attr("transform", `translate(-63,700)`)
                    .transition()
                    .duration(1100)
                    .text("数据来源：故宫博物院")
                    .attr("transform", `translate(-63,310)`)
                    .attr("font-family", "华文中宋")
                    .attr("font-size", 15)
                    .attr("fill", "#735e4f");

                const scaleTextDx = d3
                    .scaleLinear()
                    .domain([10, Math.PI / 2])
                    .range([10, 10 * 3]);

                //文本偏移函数
                function getArcCentorid(outerRadius, d, averageLength) {
                    if (averageLength)
                        outerRadius = Math.sqrt(outerRadius * 1320);
                    return d3.arc().outerRadius(outerRadius).innerRadius(0).centroid(d)
                }

                // 文字
                arcs.append("g")
                    .attr("class", "pieText")
                    .selectAll("text")
                    .data(drawData)
                    .join("text")
                    .attr("text-anchor", (d) => {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start"
                    })
                    .attr("dy", "0.35em")
                    .attr("dx", function (d) {
                        const middleAngle = (d.endAngle + d.startAngle) / 2;
                        let dx = "";
                        if (middleAngle < Math.PI) {
                            dx = scaleTextDx(Math.abs(middleAngle - Math.PI / 2)) - 30;
                        } else {
                            dx = -scaleTextDx(Math.abs(middleAngle - (Math.PI * 3) / 13)) + 25;
                        }
                        return dx;
                    })
                    .attr("transform", (d) => {
                        return 'translate(' + getArcCentorid(scaleRadius(d.data.accounts), d, true) + ')'
                    })
                    .transition()
                    .duration(1200)
                    .text((d) => d.data.accounts)
                    .attr("font-size", 10);

                // 生成连线的点
                const linePoints = drawData.map((d) => {
                    const line = [];
                    // 文本位置点
                    const tempPoint = getArcCentorid(scaleRadius(d.data.accounts) - 10, d, true);
                    line.push(getArcCentorid(scaleRadius(d.data.accounts) * 2, d))
                    line.push(tempPoint)
                    return line;
                })

                const generateLine = d3.line()
                    .x((d) => d[0])
                    .y((d) => d[1]);

                //连线
                arcs.append("g")
                    .attr("class", "lines")
                    .selectAll()
                    .data(linePoints)
                    .enter()
                    .insert('path', ':first-child')
                    .attr("d", d3.line().x(0).y(0))
                    .attr("stroke", "none")
                    .transition()
                    .duration(1200)
                    .attr("d", generateLine)
                    .attr("stroke", "rgba(99,126,89,0.5)");

                // 绘制扇形
                arcs.append("g")
                    .attr("class", "piePath")
                    .selectAll("path")
                    .data(drawData)
                    .join("path")
                    .attr("class", (d, i) => "arc arc-" + i)
                    .attr("fill", (d, i) => color(i))
                    .attr("stroke", 'rgba(99,126,89,0.5)')
                    .attr("stroke-width", 1)
                    .transition()
                    .duration(1000)
                    .attrTween("d", function (d) {
                        // 半径插值
                        const interpolate = d3.interpolate(0, scaleRadius(d.data.accounts))
                        // 弧度插值
                        let fn = d3.interpolate(
                            {
                                endAngle: d.startAngle
                            },
                            d
                        )
                        return function (t) {
                            let arc = d3.arc().outerRadius(interpolate(t)).innerRadius(0);
                            return arc(fn(t));
                        }
                    });

                //图例组
                let arcsT = arcs.append("g").attr("transform", `translate(200,-100)`);

                arcsT.selectAll("rect")
                    .data(dataProcessing4(data).dynasties)
                    .join("rect")
                    .attr("width", 12)
                    .attr("height", 8)
                    .attr("x", 150)
                    .attr("y", 700)
                    .transition()
                    .duration(1100)
                    .attr("x", 150)
                    .attr("y", (d, i) => 220 + i * 20)
                    .attr("fill", (d, i) => color(i))
                    .attr("stroke", "rgba(111,140,122,0.47)");

                //文字
                arcsT.selectAll("text")
                    .data(drawData)
                    .join("text")
                    .attr("x", 165)
                    .attr("y", 700)
                    .transition()
                    .duration(1100)
                    .attr("x", 165)
                    .attr("y", (d, i) => 228 + i * 20)
                    .attr("font-size", 14)
                    .text(d => d.data.dynasty)
                    .attr("font-family", "宋体")
                    .attr("fill", "#655143");

                function arcTweenMouse(type) {

                    // 设置缓动函数,为鼠标事件使用
                    return function () {
                        d3.select(this)
                            .transition()
                            .attrTween('d', function (d) {
                                let interpolate = null
                                if (type) {
                                    interpolate = d3.interpolate(scaleRadius(d.data.accounts), scaleRadius(d.data.accounts + 750))
                                } else {
                                    interpolate = d3.interpolate(scaleRadius(d.data.accounts + 750), scaleRadius(d.data.accounts))
                                }
                                return function (t) {
                                    let arc = d3.arc().outerRadius(interpolate(t)).innerRadius(0)
                                    return arc(d);
                                }
                            })
                    }
                }

                d3.selectAll('path.arc').on('mouseover', arcTweenMouse(true)).on('mouseout', arcTweenMouse(false))
            })
            break;

        //非遗
        case 'p5':
            //图标切换
            deleteRemove();
            d3.select(this).select("image.clkimages")
                .attr("xlink:href", d => d.imageURL2);
            d3.select(this).select("text.culclkText")
                .attr("fill", "#3978a4");

            //非遗内容容器
            let culFeiyi = culture.append("g").attr("class", "culFeiyi");
            let culCircle = culFeiyi.selectAll("g")
                .data(mapCircle).join("g").attr("class", "culCir")
                .attr("transform", `translate(240,-30)`)
                .attr("id", function (d) {
                    return "q" + d.id;
                });
            let culChart = culFeiyi.append("g").attr("class", "culChart")
                .attr("transform", `translate(354,-50)`);
            let culMap = culFeiyi.append("svg").attr("class", "culMap");
            let feiyiText = '目前，全国共有28个瓷器烧制技艺相关项目列入国家级非遗代表性项目名录，涉及浙江、河南、河北等10个省份。';

            appendMultiText(culChart, feiyiText, 180, 500, 450, 20, "culFeiyi", "仿宋")
                .attr("fill", "#5d4c40");

            culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");

            //全国瓷器相关非遗柱状图_按省份
            d3.csv("data/feiyidata.csv", d3.autoType).then(function (data) {
                builder3(data, culChart);
            });

            culFeiyi.append("text")
                .text("各省非遗分布")
                .attr("font-size", 15)
                .attr("font-family", "华文中宋")
                .attr("fill", "#4d4334")
                .attr("transform",`translate(1020,25)`);

            //地图切换圆标及省份简称
            culCircle.append("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("fill", "#74b0e7")
                .attr("r", 13);

            culCircle.append("text")
                .text(d => d.proName)
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("font-size", 15)
                .attr("font-family", "华文中宋")
                .attr("fill", "#dee5ea")
                .attr("transform", `translate(-7,4)`);

            //省份地图切换交互
            culCircle.on("click", function () {
                let selectId = d3.select(this).attr("id");
                switch (selectId) {
                    case 'q1':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#669898").attr("stroke", "#98cb98").attr("stroke-width", 3).attr("r", 15);
                        mapDraw(culMap, Zhejiang, "#669898", "#98cb98");
                        break;

                    case 'q2':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#666698").attr("stroke", "#9898cb").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Henan, "#666698", "#9898cb");
                        break;

                    case 'q3':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#cbcb98").attr("stroke", "#fdfdcb").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Hebei, "#cbcb98", "#fdfdcb");
                        break;

                    case 'q4':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#ad7842").attr("stroke", "#cb9866").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Guangdong, "#ad7842", "#cb9866");
                        break;

                    case 'q5':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#4186be").attr("stroke", "#6fd7e0").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Jiangxi, "#4186be", "#6fd7e0");
                        break;

                    case 'q6':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#989866").attr("stroke", "#cbcb98").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Shanxi2, "#989866", "#cbcb98");
                        break;

                    case 'q7':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#986666").attr("stroke", "#989898").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Fujian, "#986666", "#989898");
                        break;

                    case 'q8':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#5d9a80").attr("stroke", "#a3d5bc").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Hunan, "#5d9a80", "#a3d5bc");
                        break;

                    case 'q9':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#8a6f9b").attr("stroke", "#b7a0c5").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Shandong, "#8a6f9b", "#b7a0c5");
                        break;

                    case 'q10':
                        culMap.selectAll("g").remove();
                        culChart.selectAll("g").remove();
                        culChart.select("text.culFeiyi").remove();
                        culCircle.selectAll("circle").attr("fill", "#74b0e7").attr("r", 13).attr("stroke", "none");
                        d3.select(this).select("circle").attr("fill", "#b77f68").attr("stroke", "#d0b0a3").attr("stroke-width", 3).attr("r", 15)
                        mapDraw(culMap, Shanxi1, "#b77f68", "#d0b0a3");
                        break;
                }
            })
            break;
    }
})

