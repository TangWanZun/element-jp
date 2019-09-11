<template>
    <div style="padding:15px;height:100%">
        <card-table style="height:100%" :noborder="true">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="访问列表" name="first">访问列表</el-tab-pane>
                <el-tab-pane label="收藏列表" name="second">收藏列表</el-tab-pane>
            </el-tabs>
        </card-table>
    </div>
</template>

<script>
    import cardTable from "@/components/card-table";
    export default {
        name: "user",
        components:{
            cardTable
        },
        data() {
            return {
                activeName:"first"
            }
        },
        methods:{
            handleClick() {

            }
        }
    }
</script>

<style scoped>
.card-header{

}
</style>