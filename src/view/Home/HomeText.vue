<template>
    <div class="home-text">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item class="textarea-lable" label="请输入信息:" prop="desc">
                <el-input
                    type="textarea"
                    v-model="form.desc"
                    resize="none"
                    placeholder="请输入内容"
                    maxlength="200"
                    size="medium "
                    rows="15"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <div class="select-list" v-if="stringSelect.length > 0">
                <el-form-item v-for="item in stringSelect" :label="item.name + ':'" :key="item.id" :prop="item.id">
                    <el-select v-model="form[item.id]" :placeholder="item.name">
                        <el-option
                            v-for="(itemSon, idx) in item.data"
                            :key="idx"
                            :label="itemSon"
                            :value="itemSon"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>

            <div class="xl-buttonList">
                <el-form-item>
                    <el-button type="primary" @click="submitForm">传入</el-button>
                    <el-button @click="resetForm">取消</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import Vue from "vue";
export default {
    props: {
        arrlist: {
            type: Array,
            default: [],
        },
        stringSelect: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            form: {
                desc: "",
            },
            rules: {
                desc: [{ required: true, message: "请填写客户信息", trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    const data = this.extractData();
                    this.$emit("upload", data);
                    this.form.desc = "";
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$emit("cancel");
        },
        // 提取有效数据
        extractData() {
            let data = this.form.desc;
            const arrlist = this.arrlist;
            if (!data) return;
            data = data.split("\n").map((item, index) => {
                // 分割符
                const str = item.includes(":") ? ":" : "：";
                const itemPlus = [arrlist[index], item.split(str)[1].trim() || undefined];
                return itemPlus;
            });
            let result = this.arraysToObjects(data);
            for (const key in this.form) {
                if (key == "desc") continue;
                result[key] = this.form[key];
            }
            return result;
        },
        // 将嵌套数组转换为对象
        arraysToObjects(arrays) {
            var outputObject = {};

            arrays.forEach(function (arr) {
                if (Array.isArray(arr) && arr.length === 2) {
                    var key = arr[0];
                    var value = arr[1];
                    outputObject[key] = value;
                }
            });

            return outputObject;
        },
    },
    created() {
        if (this.stringSelect.length <= 0) return;
        this.stringSelect.forEach((item) => {
            // 将其设置为响应式对象
            this.$set(this.form, item.id, Vue.observable({}));
            this.form[item.id] = "";
            this.$set(this.rules, item.id, Vue.observable({}));
            this.rules[item.id] = item.rule;
        });
    },
};
</script>
<style lang="less" scoped>
.home-text {
    width: inherit;
    height: inherit;
}
.select-list {
    display: flex;
}
</style>
