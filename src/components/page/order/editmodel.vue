<template>
    <div class="editmodal">
        <el-dialog
            :title="titfile"
            :destroy-on-close="isclose"
            :visible.sync="dialogFormVisibleedit"
            width="50%"
            :before-close="beforclose"
            center
        >
            <el-row>
                    <el-form :model="form" ref="form" >
                       
                        <el-col :span="11">
                            <el-form-item label="订单号" :label-width="formLabelWidth" class="formitem formitem1" prop="orderNumber" >
                                <el-input
                                v-model="form.orderNumber" disabled></el-input>
                            </el-form-item>
                        </el-col>
                       <el-col :span="11">
                            <el-form-item label="臻航号" :label-width="formLabelWidth" class="formitem formitem1" prop="zhNumber" >
                                <el-input
                                v-model="form.zhNumber"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="客户型号" :label-width="formLabelWidth" class="formitem formitem1" prop="customerModel" >
                                <el-input
                                v-model="form.customerModel"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="客户要求型号" :label-width="formLabelWidth" class="formitem formitem1" prop="customerRequireModel" >
                                <el-input
                                v-model="form.customerRequireModel"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="制造商" :label-width="formLabelWidth" class="formitem formitem1" prop="manufacturer" >
                                <el-input
                                v-model="form.manufacturer"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="订单数量" :label-width="formLabelWidth" class="formitem formitem1" prop="orderCount" >
                                <el-input
                                v-model="form.orderCount"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="喷涂塑粉" :label-width="formLabelWidth" class="formitem formitem1" prop="sparyPowder" >
                                <el-input
                                v-model="form.sparyPowder"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="装箱数" :label-width="formLabelWidth" class="formitem formitem1" prop="encasementCount" >
                                <el-input
                                v-model="form.encasementCount"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="11">
                            <el-form-item label="滤材" :label-width="formLabelWidth" class="formitem formitem1" prop="filterMaterial" >
                                <el-input
                                v-model="form.filterMaterial"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="22">
                            <el-form-item label="备注" :label-width="formLabelWidth" class="formitem formitem1" prop="remark" >
                                <el-input
                                v-model="form.remark"  type="textarea" :rows="2"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-form>
               
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="marksure('form')" :loading="sureload">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getBlob, saveAs, } from '@/utils/util';

import {orderupdateById} from 'api/main'
export default {
    name: 'editmodal',

    props: {
        dialogFormVisibleedit: {
            type: Boolean
        },
        titfile: {
            type: String,
        }
    },
    data() {
        return {
            tableData1:[],
            isclose: true,
            sureload: false,
            formLabelWidth:'100px',
            columnList:[
                {prop:'index',label:'序号'},
                {prop:'technologyName',label:'文件名称'},
                {prop:'uid',label:'文件ID'},
            ],
            form:{}
        };
    },
    created() {
        // this.getProduceDeptList();
    },
    mounted() {},
    watch: {},
    methods: {
        marksure(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    delete this.form.createTime
                    orderupdateById(this.form).then(res=>{
                        if(res.code==='0'){
                            this.$message.success(res.msg)
                            this.init()
                            this.close('0')
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }})
        },
        //详情
       getall(val){
           let pro = JSON.parse(JSON.stringify(val))
           this.form = pro
       },
       
        close(num) {
            this.init();
            this.$emit('closeedit', num);
        },
        //初始化
        init() {
            this.form = {}
        },
       
        beforclose() {
            this.init();
            this.$emit('closeedit', false);
        }
    }
};
</script>


<style lang='less'>
.editmodal {
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
