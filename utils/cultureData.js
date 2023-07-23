var clicks = [
    {type: "饮食", id: "p1", x: "70", y:"100", imageURL1: "./images/culclk/yinshi_1.png", imageURL2: "./images/culclk/yinshi_2.png"},
    {type: "宗教", id: "p2", x: "45", y:"220", imageURL1: "./images/culclk/zongjiao_1.png", imageURL2: "./images/culclk/zongjiao_2.png"},
    {type: "工艺", id: "p3", x: "30", y:"340", imageURL1: "./images/culclk/gongyi_1.png", imageURL2: "./images/culclk/gongyi_2.png"},
    {type: "文物", id: "p4", x: "45", y:"460", imageURL1: "./images/culclk/wenwu_1.png", imageURL2: "./images/culclk/wenwu_2.png"},
    {type: "非遗", id: "p5", x: "70", y:"580", imageURL1: "./images/culclk/feiyi_1.png", imageURL2: "./images/culclk/feiyi_2.png"}
]

var gongyiPic = [
    {id: 1, x: "320", y: "315", imageurl: "./images/gongyi/gongyi1.png", name:"一·选矿"},
    {id: 2, x: "400", y: "520", imageurl: "./images/gongyi/gongyi2.png", name:"二·筛洗"},
    {id: 3, x: "480", y: "315", imageurl: "./images/gongyi/gongyi3.png", name:"三·稠化"},
    {id: 4, x: "560", y: "520", imageurl: "./images/gongyi/gongyi4.png", name:"四·揉泥"},
    {id: 5, x: "640", y: "315", imageurl: "./images/gongyi/gongyi5.png", name:"五·拉坯"},
    {id: 6, x: "720", y: "520", imageurl: "./images/gongyi/gongyi6.png", name:"六·晒坯"},
    {id: 7, x: "800", y: "315", imageurl: "./images/gongyi/gongyi7.png", name:"七·上釉"},
    {id: 8, x: "880", y: "520", imageurl: "./images/gongyi/gongyi8.png", name:"八·补釉"},
]

var mapCircle = [
    {proName: "浙", id: "1", x: "300", y: "50"},
    {proName: "豫", id: "2", x: "350", y: "50"},
    {proName: "冀", id: "3", x: "400", y: "50"},
    {proName: "粤", id: "4", x: "450", y: "50"},
    {proName: "赣", id: "5", x: "500", y: "50"},
    {proName: "陕", id: "6", x: "550", y: "50"},
    {proName: "闽", id: "7", x: "600", y: "50"},
    {proName: "湘", id: "8", x: "650", y: "50"},
    {proName: "鲁", id: "9", x: "700", y: "50"},
    {proName: "晋", id: "10", x: "750", y: "50"}
]

var xinshiqi = [
    {id: 1, color: "#e8d1b1"},
    {id: 2, color: "#525253"}
]

var xianqin = [
    {id: 1, color: "#d1b283"},
    {id: 2, color: "#cac7c2"}
]

var qinhan = [
    {id: 1, color: "#b19d79"},
    {id: 2, color: "#8a5e4b"},
    {id: 3, color: "#2f5d39"},
]

var weijin = [
    {id: 1, color: "#bfbd9a"},
    {id: 2, color: "#30282e"}
]

var nanbeichao = [
    {id: 1, color: "#a49d88"},
    {id: 2, color: "#b4c9b9"}
]

var  suitang = [
    {id: 1, color: "#325190"},
    {id: 2, color: "#74906e"},
    {id: 3, color: "#c5a075"},
    {id: 4, color: "#998e70"},
    {id: 5, color: "#edf1ec"},
    {id: 6, color: "#ad8039"}
]

var wudai = [
    {id: 1, color: "#d2d2d6"},
    {id: 2, color: "#98754f"},
]

var liangsong = [
    {id: 1, color: "#daebe0"},
    {id: 2, color: "#99d8cd"},
    {id: 3, color: "#8fbc8e"},
    {id: 4, color: "#9fb1b0"},
    {id: 5, color: "#ead4d6"},
    {id: 6, color: "#756d66"},
    {id: 7, color: "#7e7b96"},
    {id: 8, color: "#a58a8b"}
]

var yuanchao = [
    {id: 1, color: "#949d96"},
    {id: 2, color: "#82422c"},
    {id: 3, color: "#394977"},
    {id: 4, color: "#6d878b"},
    {id: 5, color: "#a2a48d"}
]

var mingchaoqian = [
    {id: 1, color: "#4c5050"},
    {id: 2, color: "#7fcae1"},
    {id: 3, color: "#dfefef"},
    {id: 4, color: "#ed7e3f"},
    {id: 5, color: "#51b38f"},
    {id: 6, color: "#f2c667"},
    {id: 7, color: "#fd815b"}
]

var mingchaozhonghou = [
    {id: 1, color: "#f99f5d"},
    {id: 2, color: "#fcca3b"},
    {id: 3, color: "#687eb1"},
    {id: 4, color: "#9e6091"},
    {id: 5, color: "#facf97"},
    {id: 6, color: "#4c8146"},
    {id: 7, color: "#9895c2"},
    {id: 8, color: "#b9795d"}
]

var qingchaoqian = [
    {id: 1, color: "#6a669f"},
    {id: 2, color: "#7c8f80"},
    {id: 3, color: "#dcb248"},
    {id: 4, color: "#fbd5b6"},
    {id: 5, color: "#9f76ae"},
    {id: 6, color: "#db4e26"}
]

var qingchaohou = [
    {id: 1, color: "#ac2b1a"},
    {id: 2, color: "#01728d"},
    {id: 3, color: "#575f41"},
    {id: 4, color: "#2f5b87"},
    {id: 5, color: "#4d7d89"},
    {id: 6, color: "#6d6254"},
    {id: 7, color: "#c4962f"},
    {id: 8, color: "#b7b4ac"}
]

var zongjiao = [
    {name: "原始宗教", x: 95, y: 400, width: 140, height: 8},
    {name: "儒教", x: 220, y: 390, width: 760, height: 8},
    {name: "道教", x: 300, y: 380, width: 680, height: 8},
    {name: "佛教", x: 280, y: 370, width: 700, height: 8},
    {name: "伊斯兰教", x: 535, y: 360, width: 445, height: 8},
    {name: "基督教", x: 940, y: 350, width: 40, height: 8}
]

var yinshi = [
    {id: 1, imgurl: "./images/yinshi/ys1.png", description: "青釉玉璧形底碗"},
    {id: 2, imgurl: "./images/yinshi/ys2.png", description: "定窑酱釉花口盘"},
    {id: 3, imgurl: "./images/yinshi/ys3.png", description: "三彩杯盘"},
    {id: 4, imgurl: "./images/yinshi/ys4.png", description: "青釉凤首龙柄壶"},
]

var zjImage = [
    {id:1,image: "./images/zongjiao/anbaxian.png",detail: "暗八仙纹"},
    {id:2,image: "./images/zongjiao/lianwen1.png",detail: "莲花纹"},
    {id:3,image: "./images/zongjiao/xsq1.png",detail: "新石器宗教器皿"},
    {id:4,image: "./images/zongjiao/fojiao.png",detail: "佛教瓷器"},
    {id:5,image: "./images/zongjiao/daojiao1.png",detail: "道教瓷器"},
    {id:6,image: "./images/zongjiao/yslj1.png",detail: "伊斯兰教瓷器"}
]