<template>
  <div class="moadl">
     <el-dialog title="新建工单" :visible.sync="dialogFormVisible" :before-close='beforclose' center>
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth" class="formitem">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" :label-width="formLabelWidth" class="formitem">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" :label-width="formLabelWidth" class="formitem">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" :label-width="formLabelWidth" class="formitem">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { produceTaskpage } from 'api/index'
export default {
    name: 'modal',
  
    props:{
        dialogFormVisible:{
            type:Boolean
        }
    },
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '80px'
        }
    },
    created(){
       
    },
    methods: {
       close(){
           this.$emit('close',false)
       },
       marksure(){

       },
       beforclose(){
          this.$emit('close',false)
       }
    }
}
</script>


<style lang='less'>
    .moadl{
        .el-dialog{
            border-radius: 5px;
        }
        .el-dialog__header{
            background-color: #409BAF;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
           .el-dialog__title{
               color: #fff;
           }
           .el-dialog__headerbtn .el-dialog__close{
               color: #fff;
           }
        }
        .formitem{
            width: 45%;
            float: left;
        }
    }

</style>
