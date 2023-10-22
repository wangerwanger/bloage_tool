<template>
    <div class="home-container">
        <div class="export-button">
            <el-button type="success" icon="el-icon-upload2" @click="xport">表格导出</el-button>
        </div>

        <HomeTable :tableColumn="tableColumn" :tableData="tableData" ref="Table2XLSX" />
        <HomeText
            @upload="onUpload($event)"
            @cancel="onCancel()"
            :arrlist="extractDataId"
            :stringSelect="stringSelect"
        />
    </div>
</template>
<script>
import HomeTable from "@/view/Home/HomeTable.vue";
import HomeText from "@/view/Home/HomeText.vue";
import XLSX from "xlsx";
// 表头数据
const tableColumn = [
    {
        name: "微信号",
        id: "weChat",
    },
    {
        name: "年龄",
        id: "age",
    },
    {
        name: "性别",
        id: "gender",
    },
    {
        name: "艺名",
        id: "stageName",
    },
    {
        name: "有无设备",
        id: "equipment",
    },
    {
        name: "有无直播经验",
        id: "experience",
    },
    {
        name: "兼/全职",
        id: "partTime",
    },
    {
        name: "时间段",
        id: "period",
    },
    {
        name: "渠道",
        id: "channel",
    },
    {
        name: "推送",
        id: "push",
    },
    {
        name: "人事",
        id: "personnel",
    },
    {
        name: "对接",
        id: "docking",
    },
];
// 微信收集表
const extractDataId = [
    "state", //状态
    "weChat", //微信号
    "age", //年龄
    "gender", //性别
    "partTime", //兼，全职
    "specialties", //特长
    "period", //时间段
    "isQuiet", //安静
    "equipment", //设备
    "experience", //经验
    "training", //培训
    "broadcast", //上播
    "Remark", //备注
];
// 三选项
const stringSelect = [
    {
        id: "channel",
        name: "渠道",
        data: ["boos", "小红书"],
        rule: [{ required: true, message: "请选择渠道", trigger: "change" }],
    },
    {
        id: "push",
        name: "推送",
        data: ["晚风"],
        rule: [{ required: true, message: "请选择推送人", trigger: "change" }],
    },
    {
        id: "personnel",
        name: "人事",
        data: ["星空"],
        rule: [{ required: true, message: "请选择人事", trigger: "change" }],
    },
    {
        id: "docking",
        name: "对接人",
        data: ["aq"],
        rule: [{ required: false, message: "请选择对接人", trigger: "change" }],
    },
];
export default {
    components: {
        HomeTable,
        HomeText,
    },
    data() {
        return {
            tableColumn,
            extractDataId,
            stringSelect,
            tableData: [],
        };
    },
    methods: {
        // 上传
        onUpload(e) {
            if (!e) return;
            if (e instanceof Object && Object.keys(e).length > 0) {
                this.tableData.push(e);
            }
        },
        // 撤销
        onCancel() {
            if (this.tableData.length <= 0) return;
            this.tableData.pop();
        },
        // 导出excl表
        xport() {
            if (this.tableData.length === 0) {
                alert("请输入数据");
                return;
            }

            /*创建工作表*/
            let ws = XLSX.utils.json_to_sheet(this.tableDataOrder());
            /* 创建工作薄并导出 */
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "SheetJSExportAOO.xlsx");
        },
        // 处理tableData使其可以导出为xlsx
        tableDataOrder() {
            const data = this.tableData.reduce((accumulator, currentValue) => {
                let result = {};
                this.tableColumn.forEach((item) => {
                    result[item.name] = currentValue[item.id] || " ";
                });
                accumulator.push(result);
                return accumulator;
            }, []);
            return data;
        },
    },
};
</script>
<style lang="less" scoped>
.home-container {
    position: relative;
    width: 100%;
    max-height: 60%;
}
.export-button {
    position: absolute;
    right: 100px;
    top: -50px;
    z-index: 10;
}
.home-text {
    margin-top: 50px;
}
</style>
