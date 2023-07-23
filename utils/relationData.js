var nodes = [
    {name: "新石器",time: "前10000年",id: 1, imageURL:"./images/backgroundpictures/xinshiqi.png",details: "陶器是随着原始农业的出现和人类定居生活的需要而产生的。考古发现所获得的资料证明，我国的陶器生产距今已有10000多年的历史，陶器是原始先民主要的日常生产和生活用具。"},
    {name: "先  秦",time: "前21世纪-前221年",id: 2, imageURL:"./images/backgroundpictures/xianqin.png",details: "战国时期陶瓷生产更加专业化，印纹硬陶和原始瓷在南方获得普遍发展。秦始皇兵马俑充分体现了秦代高超的制陶水平和精湛的雕塑艺术。"},
    {name: "秦  汉",time: "前202年-220年",id: 3, imageURL:"./images/backgroundpictures/qinhan.png",details: "西汉时期北方发明了低温铅釉陶，为以后低温釉彩的发展奠定了工艺基础。东汉时期真正瓷器烧造成功，这是陶瓷发展史上的一项重大发明，也是中华民族对人类文明所作出的杰出贡献之一。"},
    {name: "魏  晋",time: "220－420年",id: 4, imageURL:"./images/backgroundpictures/weijin.png",details: "浙江既是瓷器的发源地，也是三国、两晋时期瓷器生产的中心。这一时期浙江瓷窑除大量烧造精美的青瓷外，还烧造黑釉瓷器。"},
    {name: "南北朝",time: "420－589年",id: 5, imageURL:"./images/backgroundpictures/nanbeichao.png",details: "南朝时期的制瓷业仍以烧造青釉瓷器为主。北朝瓷器品种有青瓷、黑瓷和白瓷等。由于北方青瓷与南方青瓷在胎、釉原料上均有所不同，致使二者的呈色亦有区别。"},
    {name: "隋  唐",time: "581－705年",id: 6, imageURL:"./images/backgroundpictures/suitang.png",details: "隋代陶瓷生产承前启后。至唐代，陶瓷业获得蓬勃发展。唐代陶瓷堪称中国陶瓷发展史上的一颗明珠，名窑遍布南北各地，器物造型千姿百态，装饰纹样丰富优美。"},
    {name: "五代十国",time: "907－979年",id: 7, imageURL:"./images/backgroundpictures/wudaishiguo.png",details: "五代为陶艺的重要蜕变期，也是由民间走向官方制窑。民窑与官窑分道扬镳，争奇斗艳，成为一色釉瓷器盛行的时期。"},
    {name: "两  宋",time: "960－1279年",id: 8, imageURL:"./images/backgroundpictures/liangsong.png",details: " 宋代陶瓷业蓬勃发展，名窑遍布全国各地，出现了陶瓷史上前所未有的兴盛局面。在民窑发展的基础上，朝廷也在南北各地设窑专门烧造宫廷用瓷，名曰“官窑”。汝、官、哥、定、钧窑等“五大名窑”瓷器备受后人推崇。"},
    {name: "元  朝",time: "1271－1388",id: 9, imageURL:"./images/backgroundpictures/yuanchao.png",details: "公元1279年，元王朝统一了中国。海外贸易的蓬勃发展，进一步刺激了陶瓷业的兴盛。钧窑、磁州窑、龙泉窑等继续生产传统陶瓷品种，其产品不但畅销国内，而且远销国外。"},
    {name: "明  清",time: "1368－1912",id: 10, imageURL:"./images/backgroundpictures/mingqing.png",details: "清代景德镇窑沿袭明制，亦分为官窑和民窑。清朝统治者革除了明朝在手工业方面的一些弊病，废除了官窑的编役制，将明末出现的“官搭民烧”作为定制，从而出现官民竞争的局面，刺激了民窑的进一步发展。"},
    {name: "彩 陶",id: 11, imageURL:"./images/backgroundpictures/xinshiqi_caitao.png",details: "彩陶是一种绘有黑、红、白、褐等色装饰纹样的陶器，彩料主要为含铁和锰的天然矿物原料，在陶坯上彩绘之后，经900℃左右的温度焙烧而成。"},
    {name: "黑 陶",id: 12, imageURL:"./images/backgroundpictures/xinshiqi_heitao.png",details: "龙山文化的黑陶，系用快轮拉坯成型，有些器物胎壁厚度仅有0.3—1毫米，故有“蛋壳黑陶”之美称，反映出古代陶工精湛的成型技艺。"},
    {name: "原始瓷器",id: 13, imageURL:"./images/backgroundpictures/xianqin_yuanshici.png",details: "原始瓷出现于商代中期。系以瓷土做胎、器表施一层透明石灰釉、入窑经1200℃以上温度焙烧而成的窑器。其胎质坚硬，器表光亮，但与真正的瓷器相比，仍带有一定的原始性，故称其为原始瓷。"},
    {name: "兵马俑",id: 14, imageURL:"./images/backgroundpictures/xianqin_bingmayong.png",details: "兵马俑，即秦始皇陵兵马俑，亦简称秦兵马俑或秦俑，是第一批全国重点文物保护单位、第一批中国世界遗产，位于今陕西省西安市临潼区秦始皇陵以东1.5千米处的兵马俑坑内。"},
    {name: "铅釉陶",id: 15, imageURL:"./images/backgroundpictures/qinhan_qianyoutao.png",details: "低温铅釉陶器最早出现于西汉时期的陕西关中地区，东汉时期盛行于全国各地。其釉料以氧化铁和氧化铜作呈色剂，以氧化铅作助熔剂，烧成温度约为700℃—900℃，釉面光亮，呈现绿、黄深浅不同的色调。"},
    {name: "黑釉瓷",id: 16, imageURL:"./images/backgroundpictures/weijin_heiyoutao.png",details: "以德清窑为代表的黑釉瓷器，釉色纯正，漆黑发亮，独具风格。与此同时，江苏、福建、江西、湖南、湖北及四川等省，亦相继设立瓷窑，烧造各具地方特色的瓷器。"},
    {name: "青 瓷",id: 17, imageURL:"./images/backgroundpictures/nanbeichao_qingci.png",details: "南朝时期的制瓷业仍以烧造青釉瓷器为主。北朝瓷器品种有青瓷、黑瓷和白瓷等。由于北方青瓷与南方青瓷在胎、釉原料上均有所不同，致使二者的呈色亦有区别。前者青翠，后者玻璃质感较强。"},
    {name: "越州窑",id: 18, imageURL:"./images/backgroundpictures/suitang_yuezhouyao.png",details: "越州窑亦称越窑，代表了中国当时青瓷生产的最高水平，主要分布在浙江省慈溪、上虞、余姚、镇海、黄岩、绍兴、湖州等地，以慈溪上林湖及附近的上岙湖、白洋湖为中心，上述各地生产出的青瓷统称为越州窑青瓷。"},
    {name: "釉下彩",id: 19, imageURL:"./images/backgroundpictures/suitang_youxiacai.png",details: "釉下彩是入窑高温（1200—1400℃）一次烧成。烧成后的图案被一层透明的釉膜覆盖在下边，表面光亮柔和、平滑不凸出，显得晶莹透亮。"},
    {name: "唐三彩",id: 20, imageURL:"./images/backgroundpictures/suitang_tangsancai.png",details: "唐三彩是唐代多色釉陶的简称，堪称唐代陶瓷中的著名品种。作为当时的随葬冥器主要发现于河南、陕西的唐代墓葬中。其造型繁多，釉色华丽，具有较高的艺术价值。"},
    {name: "南青北白",id: 21, imageURL:"./images/backgroundpictures/suitang_nanqingbeibai.png",details: "唐代瓷器生产，南方以青瓷为主，北方则以白瓷为主，形成“南青北白”的地域特征。"},
    {name: "汝窑",id: 22, imageURL:"./images/backgroundpictures/liangsong_ruyao.png",details: "汝窑遗址位于今河南省宝丰县，宝丰县在宋代归汝州管辖，故称“汝窑”。因曾烧造过宫廷用瓷，故也称“汝官窑”。传世汝窑瓷器数量很少，据粗略统计，全世界仅存70余件。"},
    {name: "官窑",id: 23, imageURL:"./images/backgroundpictures/liangsong_guanyao.png",details: "据文献记载，宋代宫廷曾在都城附近设立过三个官窑。即北宋朝廷在汴京（今河南省开封市）设立的“北宋官窑”和南宋朝廷在杭州附近先设立的“修内司官窑”，后设立的“郊坛下官窑”。"},
    {name: "哥窑",id: 24, imageURL:"./images/backgroundpictures/liangsong_geyao.png",details: "哥窑遗址至今尚未被发现，学术界有诸多说法，目前仍难以定论，但是宫中旧藏有哥窑瓷器则是不争的事实。哥窑瓷器釉面润泽如酥，颜色有炒米黄、青灰等。"},
    {name: "定窑",id: 25, imageURL:"./images/backgroundpictures/liangsong_dingyao.png",details: "定窑遗址位于今河北省曲阳县。因宋代曲阳县归定州管辖，故称“定窑”。唐代始烧白瓷，北宋时期曾进行工艺改革，创覆烧工艺，产量巨增。"},
    {name: "钧窑",id: 26, imageURL:"./images/backgroundpictures/liangsong_junyao.png",details: "钧窑遗址位于今河南省禹州市原禹县城北门的钧台与八卦洞附近，因钧台而得名钧窑，也称钧台窑。"},
    {name: "耀州窑",id: 27, imageURL:"./images/backgroundpictures/liangsong_yaozhouyao.png",details: "耀州窑遗址位于今陕西省铜川市，中心窑场在黄堡镇。因宋代铜川归耀州管辖，故名“耀州窑”。"},
    {name: "磁州窑",id: 28, imageURL:"./images/backgroundpictures/liangsong_cizhouyao.png",details: "磁州窑系列的陶瓷基本上在陶质胎土上施白化妆土，继而挂透明无色釉。磁州窑器形以瓶居多，但最独特的品种还是瓷枕。纹样不一，多为牡丹唐草纹。"},
    {name: "龙泉窑",id: 29, imageURL:"./images/backgroundpictures/liangsong_longquanyao.png",details: "龙泉窑遗址位于今浙江省龙泉市境内。创烧于北宋初期，此后窑火不歇，至今仍在烧造。"},
    {name: "景德镇窑",id: 30, imageURL:"./images/backgroundpictures/yuanchao_jingdezhenyao.png",details: "景德镇窑在五代时烧造青瓷和白瓷，质地比较粗糙。宋代改烧青白瓷，因胎薄质坚，追求青白玉的美感，且产量大，遂声誉日著。"},
    {name: "青花瓷",id: 31, imageURL:"./images/backgroundpictures/yuanchao_qinghuaci.png",details: "元代陶瓷史上值得大书特书的便是著名的青花瓷，即在白地上以青蓝色做图案的瓷器。青花本意为“青色的纹样”。"},
    {name: "釉里红",id: 32, imageURL:"./images/backgroundpictures/yuanchao_youlihong.png",details: "元代除了使用钴颜料生产青花瓷器外，还有使用红色的铜颜料制作所谓的“釉里红”。但铜颜料在高温下容易气化，很难产生鲜明的红色，因此当时的釉里红瓷器的色彩往往呈现暗红。"},
    {name: "斗 彩",id: 33, imageURL:"./images/backgroundpictures/mingqing_doucai.png",details: "斗彩系指先在成型后的胎体上以青花料勾描图案轮廓（有的还在此基础上画出图案局部），经高温烧成后，再在釉上施以各种釉上彩料并经二次低温烧成的一种瓷器装饰工艺。"},
    {name: "五 彩",id: 34, imageURL:"./images/backgroundpictures/mingqing_wucai.png",details: "五彩是瓷器彩绘技法之一，可分为青花五彩和纯釉上五彩两种。其釉上彩料多透明，因采用单线平涂法施彩，致使图案无浓淡深浅的层次变化。"},
    {name: "粉 彩",id: 35, imageURL:"./images/backgroundpictures/mingqing_fencai.png",details: "清代晚期粉彩瓷器多沿袭乾隆时期已有的品种，少有创新。除白地粉彩瓷以外，也有各种色地粉彩瓷。"},
    {name: "珐琅彩",id: 36, imageURL:"./images/backgroundpictures/mingqing_falangcai.png",details: "雍正以后，斗彩融合了粉彩和珐琅彩的工艺技法，遂使色彩种类更加丰富，画面更加柔和，物像更加逼真，给人以耳目一新之感。"}];

var edges = [
    {source: 0,target: 1},
    {source: 1,target: 2},
    {source: 2,target: 3},
    {source: 3,target: 4},
    {source: 4,target: 5},
    {source: 5,target: 6},
    {source: 6,target: 7},
    {source: 7,target: 8},
    {source: 8,target: 9},
    {source: 10,target: 0},
    {source: 11,target: 0},
    {source: 12,target: 1},
    {source: 13,target: 1},
    {source: 14,target: 2},
    {source: 15,target: 3},
    {source: 16,target: 4},
    {source: 17,target: 5},
    {source: 18,target: 5},
    {source: 19,target: 5},
    {source: 20,target: 5},
    {source: 21,target: 7},
    {source: 22,target: 7},
    {source: 23,target: 7},
    {source: 24,target: 7},
    {source: 25,target: 7},
    {source: 26,target: 7},
    {source: 27,target: 7},
    {source: 28,target: 7},
    {source: 29,target: 8},
    {source: 30,target: 8},
    {source: 31,target: 8},
    {source: 32,target: 9},
    {source: 33,target: 9},
    {source: 34,target: 9},
    {source: 35,target: 9}
    ];