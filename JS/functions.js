//文本换行函数
function appendMultiText(container, str, posX, posY, width, fontsize, classes, fontfamily) {
    if (arguments.length < 6) {
        fontsize = 14;
    }

    if (arguments.length < 7) {
        fontfamily = "simsun, arial";
    }

    //获取分割后的字符串
    var strs = splitByLine(str, width, fontsize);

    var mulText = container.append("text")
        .attr("class", classes)
        .attr("x", posX)
        .attr("y", posY)
        .style("font-size", fontsize)
        .style("line-height", 20)
        .style("font-family", fontfamily);

    mulText.selectAll("tspan")
        .data(strs)
        .enter()
        .append("tspan")
        .attr("x", mulText.attr("x"))
        .attr("dy", "1em")
        .text(function (d) {
            return d;
        });

    return mulText;

    function splitByLine(str, max, fontsize) {
        var curLen = 0;
        var result = [];
        var start = 0, end = 0;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            var pixelLen = code > 255 ? fontsize : fontsize / 2;
            curLen += pixelLen;
            if (curLen > max) {
                end = i;
                result.push(str.substring(start, end));
                start = i;
                curLen = pixelLen;
            }
            if (i === str.length - 1) {
                end = i;
                result.push(str.substring(start, end + 1));
            }
        }
        return result;
    }
}

//图片按钮生成函数
function culClickDraw(container, url, width) {
    container.append("image")
        .attr("class", "clkimages")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("width", width)
        .attr("xlink:href", url)
        .attr("transform", `translate(-10,-75)`)
}

//工艺图片生成函数
function gongyiDraw(container, url, width) {
    container.append("image")
        .attr("class", "clkimages")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("transform", `translate(-10,400)`)
        .attr("width", width)
        .transition()
        .duration((d, i) => i * 150 + 1000)
        .attr("xlink:href", url)
        .attr("transform", `translate(-10,-75)`)
}

//地图生成函数,含坐标交互
function mapDraw(container, data, fillColor, strokeColor) {
    container.selectAll("path")
        .data(data.features)
        .join("path")
        .attr("d", d3.geoPath().projection(d3.geoMercator()
            .fitExtent(
                [
                    [380, 380], //左上角坐标
                    [840, 840], //右下角坐标
                ], data))
        )
        .attr("stroke", strokeColor)
        .attr("fill", fillColor)
        .attr("stroke-width", 1)
        .attr("transform", `translate(-20,-300)`);

    const projection = d3.geoMercator()
        .fitExtent(
            [
                [380, 380], //左上角坐标
                [840, 840], //右下角坐标
            ], data);

    let coo = function (data) {
        let lngLat = data.properties.center;
        let coo = projection(lngLat);
        return coo;
    };

    let coo2 = function (data) {
        let lngLat = data.geometry.coordinates;
        let coo2 = projection(lngLat);
        return coo2;
    }

    container.append("g")
        .selectAll("text")
        .data(data.features)
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
        .attr('fill', '#22363f')
        .attr("transform", `translate(-20,-300)`);

    let contain = container.append("g").selectAll("svg").data(data.points.features).join("svg").attr("class", "point");
    let tuli = container.append("g").attr("class", "tuli");

    //搜索指数图例
    tuli.append("circle")
        .attr("cx", 680)
        .attr("cy", 540)
        .attr("r", 10)
        .attr("fill", "rgba(255,188,121,0.56)");

    tuli.append("text")
        .text("2011至今的搜索趋势(来源：百度指数和360趋势)")
        .attr("x", 700)
        .attr("y", 545)
        .attr("font-family", "仿宋");

    //搜索指数
    contain.append("circle")
        .attr("class", "trends")
        .attr("cx", function (d) {
            return coo2(d)[0];
        })
        .attr("cy", function (d) {
            return coo2(d)[1];
        })
        .attr("transform", `translate(-20,-300)`)
        .attr("fill", "rgba(255,188,121,0.56)")
        .attr("r", d => Math.sqrt(d.objects.trend));

    contain.append("circle")
        .attr("class", "address")
        .attr("cx", function (d) {
            return coo2(d)[0];
        })
        .attr("cy", function (d) {
            return coo2(d)[1];
        })
        .attr("fill", "#ffe079")
        .attr("r", 3)
        .attr("transform", `translate(-20,-300)`);

    let i = 200;
    let j = 870;

    contain.append("text")
        .text(d => d.objects.name)
        .attr("font-size", 19)
        .attr("font-family", "华文中宋")
        .attr("x", function () {
            j = j + 40;
            return j;
        })
        .attr("y", function () {
            i = i + 35 * flag;
            flag = -flag;
            return i;
        })
        .attr("fill", "#624d3e")
        .attr('writing-mode', 'tb-rl');

    contain.on("mouseover", function (d) {
        d3.select(this)
            .select("circle.address")
            .attr("fill", "#fa8035")
            .attr("stroke", "#ffe193")
            .attr("stroke-width", 2);

        d3.select(this)
            .select("circle.trends")
            .attr("fill", "rgba(98,236,182,0.49)");

        d3.select(this)
            .select("text")
            .transition()
            .duration(500)
            .attr("transform", `translate(0, -50)`)
            .attr("fill", "#d3571e");

        d3.select(this)
            .append("text")
            .attr("class", "trends")
            .text(d => d.objects.trend)
            .attr("x", function (d) {
                return coo2(d)[0];
            })
            .attr("y", function (d) {
                return coo2(d)[1];
            })
            .attr("transform", `translate(-30,-320)`)
            .attr("font-size", 15)
            .attr("fill", "#0d3e6b")

    })
        .on("mouseout", function (d) {
            d3.select(this)
                .select("circle.address")
                .attr("fill", "#ffe079")
                .attr("stroke", "none");

            d3.select(this)
                .select("circle.trends")
                .attr("fill", "rgba(255,188,121,0.56)");

            d3.select(this)
                .select("text")
                .transition()
                .duration(500)
                .attr("transform", `translate(0, 0)`)
                .attr("fill", "#624d3e");

            d3.select(this)
                .select("text.trends")
                .remove()
        })
}

//釉色圆点生成函数
function circleDraw(container, data, cx) {
    container.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", cx)
        .attr("cy", function (d) {
            return d.id * 17 + 10;
        })
        .transition()
        .duration((d, i) => i * 230 + 200)
        .attr("fill", function (d) {
            return d.color;
        })
        .attr("r", 8);
}

//切换页面
function deleteRemove() {
    d3.select("g.indexPage").remove();
    d3.select("g.culFeiyi").remove();
    d3.select("g.culGongyi").remove();
    d3.select("g.culWenwu").remove();
    d3.select("g.culYinshi").remove();
    d3.select("g.culZongjiao").remove();
    d3.selectAll("image.clkimages")
        .attr("xlink:href", d => d.imageURL1);
    d3.selectAll("text.culclkText")
        .attr("fill", "#615045");
}
