<template>
    <div class="home-table">
        <el-table :data="tableData" style="width: 100%" v-if="tableColumn.length">
            <!-- <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column> -->
            <el-table-column
                v-for="column in tableColumn"
                :prop="column.id"
                :label="column.name"
                :key="column.id"
                width="150"
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        tableColumn: {
            type: Array,
            default: [],
        },
        tableData: {
            type: Array,
            default: [],
        },
    },
    computed: {
        tableListName: function () {
            if (!this.tableColumn.length) return;
            return this.tableColumn.map((item) => item.id);
        },
    },
    data() {
        return {
            // tableData: [
            //     // {
            //     //     date: "2016-05-02",
            //     //     name: "王小虎",
            //     //     address: "上海市普陀区金沙江路 1518 弄",
            //     // },
            //     // {
            //     //     date: "2016-05-04",
            //     //     name: "王小虎",
            //     //     address: "上海市普陀区金沙江路 1517 弄",
            //     // },
            //     // {
            //     //     date: "2016-05-01",
            //     //     name: "王小虎",
            //     //     address: "上海市普陀区金沙江路 1519 弄",
            //     // },
            //     // {
            //     //     date: "2016-05-03",
            //     //     name: "王小虎",
            //     //     address: "上海市普陀区金沙江路 1516 弄",
            //     // },
            // ],
        };
    },
};
</script>
<style lang="less" scoped>
.home-text {
    width: inherit;
    height: inherit;
}
</style>
