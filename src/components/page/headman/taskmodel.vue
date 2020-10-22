<template>
    <div class="matemodal">
        <el-dialog
            :title="titfile"
            :destroy-on-close="isclose"
            :visible.sync="dialogFormVisiblefile"
            width="40%"
            :before-close="beforclose"
            center
        >
            <el-row>
                     <el-col :span="22">
                       <el-table :data="tableData1" border  style="width: 100%">
                            <el-table-column
                                v-for="item in columnList"
                                :key="item.id"
                                :prop="item.prop"
                                :label="item.label"

                                align="center"
                            >
                            </el-table-column>
                           
                        </el-table>
                    </el-col>
               
            </el-row>
            <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="marksure('form')" :loading="sureload">确 定</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>

<script>
import { getBlob, saveAs, } from '@/utils/util';
import { getPartListByTaskPlanId } from 'api/index';
export default {
    name: 'filemodal',

    props: {
        dialogFormVisiblefile: {
            type: Boolean
        },
        titfile: {
            type: String
        }
    },
    data() {
        return {
            tableData1:[],
            isclose: true,
            sureload: false,
            columnList:[
                {prop:'index',label:'序号'},
                {prop:'partNumber',label:'元件编号(公司内部)'},
                {prop:'partCode',label:'部件编码'},
                {prop:'partName',label:'元件名称(规格)'},
            ]
        };
    },
    created() {
        // this.getProduceDeptList();
    },
    mounted() {},
    watch: {},
    methods: {
        //详情
       getall(val){
           let obj = {produceTaskPlanId:val.produceTaskPlanId}
           getPartListByTaskPlanId(obj).then(res=>{
               if(res.code==='0'){
               
                   res.data.map((item,index)=>{
                       item.index = index + 1
                   })
                   this.tableData1 = res.data
               }
           })
        //    pro.map((item,index)=>{
        //        item.index = index +1
        //    })
        //    this.tableData1 = pro
       },
      
        close(num) {
            this.init();
            this.$emit('closefile', num);
        },
        //初始化
        init() {
            this.tableData1 = []
        },
       
        beforclose() {
            this.init();
            this.$emit('closefile', false);
        }
    }
};
</script>


<style lang='less'>
.matemodal {
    .el-dialog {
        border-radius: 5px;
    }
    .el-dialog__header {
        background-color: #409baf;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        .el-dialog__title {
            color: #fff;
            letter-spacing: 2px;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #fff;
        }
    }
    .dialog-footer {
        text-align: end;
    }
    .el-form {
        display: flex;
        flex-wrap: wrap;
    }
    .el-select {
        width: 100%;
    }
    .el-col {
        margin-bottom: 20px;
    }
    // .formitem{
    //     width: 45%;

    //     margin-bottom: 40px;
    // }
    // .formitem1{
    //     margin-right: 5%;
    // }
}
</style>
