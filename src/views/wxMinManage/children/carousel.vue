<template>
    <div style="padding:15px;height:100%">
        <card-table style="height:100%" >
            <template slot="header">
                <span class="title">轮播图列表</span>
                <el-button type="primary" size="small" @click="addShow = true">新增</el-button>
            </template>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="标题"
                        width="200">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="图片"
                        width="350">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <img :src="scope.row.url" alt="" class="large-img">
                            <div slot="reference" class="name-wrapper">
                                <img :src="scope.row.url" alt="" class="small-img">
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </card-table>
        <!-- 新增轮播图弹窗 -->
        <el-dialog
                title="新增首页轮播图"
                :visible.sync="addShow"
                width="40%"
                center>
            <div class="dia-item">
                <span>标题：</span>
                <el-input v-model="inputName" placeholder="请输入轮播图的标题"></el-input>
            </div>
            <div class="dia-item">
                <span>图片：</span>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :multiple="false"
                        :limit="1"
                        :file-list="imgList"
                        >
                    <el-input v-model="inputUrl" placeholder="点击上传图片(最多一张)" disabled></el-input>
                </el-upload>
            </div>

            <el-button type="success" size="small">提交新增</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import cardTable from "@/components/card-table";
    export default {
        name: "carousel",
        components:{
            cardTable
        },
        data(){
            return {
                imgList:[],
                inputName:"",
                inputUrl:"",
                addShow:false,
                tableData: [{
                    name: '图一',
                    url: 'https://vip.sap-unis.com//upload/Dealer/20190829091640_c859d08c0e4b43ec840e21aae409d034.jpg'
                }, {
                    name: '图二',
                    url: 'https://vip.sap-unis.com/jppc/upload/Dealer/20190829091640_50cabcbb92534e2cb6eeedb42ad9e962.jpg'
                }]
            }
        },
        methods:{

            /**
             *每列的编辑按钮
             * @param index：下标
             * @param row：下标对应值
             */
            handleEdit(index, row) {
                console.log(index, row);
            },
            /**
             * 每列的删除按钮
             * @param index：下标
             * @param row：下标对应值
             */
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped lang="less">
    .title{
        margin-right:50px;
        font-weight:bold;
        font-size:14px;
    }
    .small-img{
        width:200px;
        height:100px;
        border-radius:10px;
    }
    .large-img{
        width:100%;
    }
    .dia-item{
        display: flex;
        margin-bottom:2vw;
        span{
            margin:auto 0;
        }
        .el-input{
            width:30vw;
        }
    }
</style>