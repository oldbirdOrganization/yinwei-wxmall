const ImgPath = "../../../static/images/index/";
//获取应用实例
const app = getApp();
Page({
  data: {
    topList: [
      { name: "强电类", id: "1" },
      { name: "弱电类", id: "2" },
      { name: "给排水类", id: "3" },
      { name: "其他", id: "4" }
    ],
    list: [],
    listOne: [
      { name: "换灯泡", price: "8", unit: "只" },
      { name: "换灯座", price: "8", unit: "只" },
      { name: "换灯头", price: "8", unit: "只" },
      { name: "换日光顶管", price: "8", unit: "只" },
      { name: "换日光灯脚", price: "18", unit: "只" },
      { name: "换（装）启辉器", price: "8", unit: "只" },
      { name: "换镇流器", price: "18", unit: "只" },
      { name: "换环形灯管", price: "8", unit: "只" },
      { name: "安装单管日光灯", price: "28", unit: "盏" },
      { name: "安装双管日光灯", price: "38", unit: "盏" },
      { name: "安装壁灯、床头灯、镜前灯", price: "18", unit: "盏" },
      { name: "安装吸顶灯", price: "28", unit: "盏" },
      { name: "安装吊灯（直径60CM以内）", price: "130", unit: "盏" },
      { name: "安装吊灯（直径60CM-100CM）", price: "260", unit: "盏" },
      { name: "地暖及居家中央空调锅炉补（放）水", price: "8", unit: "次" },
      { name: "更换房间地暖、空调温控开关面板", price: "18", unit: "次" },
      { name: "更换地暖、空调电动二通阀", price: "40", unit: "次" },
      {
        name: "空调过滤网清洗（壁挂、中央空调）",
        price: "10",
        unit: "个（进风口）"
      },
      { name: "空调室外机翅片清洁（无需高空作业）", price: "70", unit: "台" },
      { name: "空调冷凝水管路堵塞疏通", price: "50", unit: "台" },
      {
        name: "空调加雪种（无需高空作业，小于1匹按1匹计）",
        price: "50",
        unit: "匹"
      },
      { name: "换浴霸开关", price: "20", unit: "只" },
      { name: "安装浴霸（不包括开孔、布线）", price: "50", unit: "套" },
      { name: "换电源插座、漏电保护器", price: "18", unit: "个" },
      { name: "换单相电表", price: "35", unit: "只" },
      { name: "换三相电表", price: "55", unit: "只" },
      { name: "换电源插头、开关面板", price: "8", unit: "只" },
      { name: "换单相空气开关", price: "18", unit: "只" },
      { name: "换三相空气开关", price: "38", unit: "只" },
      { name: "布明线（槽、管）", price: "5", unit: "米" },
      { name: "换消毒柜发热器、紫外线管", price: "10", unit: "根" },
      {
        name: "强电线路故障排查（半小时起计时）",
        price: "25",
        unit: "半小时/人"
      }
    ],
    listTwo: [
      { name: "有线电视信号调试", price: "10", unit: "次" },
      { name: "整理终端面板", price: "18", unit: "次" },
      { name: "整理用户线", price: "30", unit: "箱" },
      { name: "整理影视设备连接线", price: "20", unit: "次" },
      { name: "做射频接头", price: "10", unit: "只" },
      { name: "做电话、宽带水晶头", price: "10", unit: "根" },
      { name: "安装电话机、宽带明线", price: "15", unit: "台" },
      { name: "可视对讲、安防总机送修", price: "50", unit: "次" },
      {
        name: "报警按钮安装、移位",
        price: "50",
        unit: "只",
        desc: "（不含开槽布线）"
      },
      {
        name: "可视对讲、安防系统控制面板移位",
        price: "138",
        unit: "台",
        desc: "（不含开槽布线）"
      },
      {
        name: "红外、幕帘、报警器等安装或移位",
        price: "50",
        unit: "只",
        desc: "（不含开槽布线）"
      },
      {
        name: "弱电箱移位",
        price: "138",
        unit: "台",
        desc: "（不含开槽布线）"
      },
      {
        name: "弱电线路故障排查、调试",
        price: "25",
        unit: "半小时/人",
        desc: "（半小时起计时）"
      },
      { name: "换管箍、管卡、管堵头", price: "10", unit: "个" },
      { name: "换弯头", price: "10", unit: "只" },
      { name: "换三通", price: "18", unit: "只" }
    ],
    listThree: [
      { name: "换波纹管、S型弯管", price: "10", unit: "只" },
      { name: "换1.5M软管", price: "10", unit: "条" },
      { name: "换三角阀、球阀、闸阀", price: "10", unit: "只" },
      { name: "换存水弯、伸缩节", price: "18", unit: "只" },
      { name: "换水表接头、内外线", price: "18", unit: "只" },
      { name: "换进水总闸、水表", price: "28", unit: "只" },
      { name: "换检修盖", price: "10", unit: "只" },
      { name: "换普通水嘴", price: "10", unit: "只" },
      { name: "换双联水嘴", price: "35", unit: "只" },
      { name: "换三联水嘴", price: "35", unit: "只" },
      { name: "换面盆落水", price: "10", unit: "只" },
      { name: "换浴缸落水（开放式）", price: "15", unit: "只" },
      { name: "换洗菜盆落水", price: "15", unit: "只" },
      { name: "换落水管皮圈、水嘴垫皮", price: "10", unit: "只" },
      { name: "换单水槽（上嵌）", price: "50", unit: "个" },
      { name: "换组合水槽（上嵌）", price: "78", unit: "个" },
      { name: "换水斗", price: "10", unit: "个" },
      { name: "换马桶圈盖", price: "10", unit: "只" },
      { name: "换马桶水箱配件（普通）", price: "30", unit: "套" },
      { name: "换装马桶", price: "100", unit: "个" },
      { name: "紧固台盆龙头", price: "10", unit: "只" },
      { name: "清洗水龙头过滤网", price: "10", unit: "只" },
      { name: "更换洗衣机进水管", price: "10", unit: "根" },
      { name: "疏通浴缸落水", price: "18", unit: "根" },
      { name: "皮吸疏通管道", price: "10", unit: "次" },
      { name: "手摇疏通管道（1米起计量）", price: "10", unit: "米" },
      { name: "电动疏通管道（住宅）", price: "58", unit: "次" },
      { name: "电动疏通管道（商铺）", price: "138", unit: "次" }
    ],
    listFour: [
      { name: "换锁扣", price: "10", unit: "个" },
      { name: "换锁芯", price: "10", unit: "个" },
      { name: "换月牙锁（移门、窗户）", price: "10", unit: "把" },
      { name: "换信报箱锁、抽屉锁", price: "10", unit: "把" },
      { name: "换球形锁", price: "18", unit: "把" },
      { name: "换入户门锁体（非防盗门）", price: "58", unit: "套" },
      { name: "换铝门窗封条", price: "5", unit: "米" },
      { name: "换窗把手", price: "18", unit: "幅" },
      { name: "换窗滑轮", price: "28", unit: "扇" },
      { name: "换门滑轮", price: "38", unit: "扇" },
      { name: "换（调整）柜门烟斗合页", price: "15", unit: "幅" },
      { name: "换木门合页", price: "38", unit: "扇" },
      { name: "安装门吸", price: "15", unit: "个" },
      { name: "换猫眼", price: "10", unit: "个" },
      { name: "安装门铃", price: "18", unit: "套" },
      { name: "门、窗校正", price: "18", unit: "套" },
      { name: "安装（换）不锈钢铰链（侧开窗）", price: "50", unit: "套" },
      { name: "安装（换）不锈钢铰链（悬开窗）", price: "80", unit: "套" },
      { name: "换玻璃门不锈钢合页", price: "100", unit: "对" },
      { name: "换地弹簧", price: "138", unit: "个" },
      { name: "安装淋浴间玻璃门挡水条", price: "10", unit: "根" },
      { name: "换密码锁电池", price: "5", unit: "把" },
      { name: "换煤气橡皮管", price: "15", unit: "条" },
      { name: "换热水器/燃气灶电池", price: "10", unit: "台" },
      { name: "打硅胶", price: "10", unit: "米" },
      { name: "木板开孔（直径《5CM）", price: "18", unit: "孔" },
      { name: "墙面打孔（直径《18CM）", price: "10", unit: "孔" },
      { name: "墙面打孔（直径《18-20CM）", price: "18", unit: "孔" },
      { name: "安装排气扇（侧排）", price: "28", unit: "台" },
      { name: "安装排气扇（吸顶）", price: "50", unit: "台" },
      {
        name: "挂厨卫五金架（按安装时需打孔数量计费）",
        price: "10",
        unit: "孔"
      },
      { name: "安装窗帘（不含轨道安装）", price: "10", unit: "米" },
      { name: "安装窗帘（含轨道安装）", price: "25", unit: "米" },
      { name: "挂画（《50*50CM）", price: "10", unit: "幅" },
      { name: "挂画（《100*80CM）", price: "15", unit: "幅" },
      { name: "挂画（》120*90CM）", price: "20", unit: "幅" },
      { name: "挂钟（普通）", price: "10", unit: "个" },
      { name: "安装镜子（《50*50CM）", price: "20", unit: "面" },
      { name: "安装镜子（《100*80CM）", price: "50", unit: "面" },
      { name: "挂液晶电视（40寸以下）", price: "50", unit: "台" },
      { name: "挂液晶电视（40寸以上）", price: "80", unit: "台" },
      { name: "清洗抽油烟机", price: "78", unit: "台" },
      { name: "水平台刷漆", price: "30", unit: "平方米" },
      { name: "铁艺栏杆刷漆", price: "50", unit: "米" }
    ],
    activeId: "1"
  },
  onPullDownRefresh() {},
  onLoad() {
    this.setData({
      list: this.data.listOne
    });
  },
  changeType: function(ev) {
    const map = {
      1: "listOne",
      2: "listTwo",
      3: "listThree",
      4: "listFour"
    };
    const id = ev.currentTarget.dataset.id;
    this.setData({
      activeId: id,
      list: this.data[map[id]]
    });
  }
});
