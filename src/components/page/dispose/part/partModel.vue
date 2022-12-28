<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-19 14:44:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-23 14:01:34
 * @FilePath: \vue-manage-system\src\components\page\dispose\part\partModel.vue
-->
<template>
    <div class="partmodal">
    <el-dialog 
    :title="tit" 
    :visible.sync="dialogFormVisible"
    width='50%' 
    :before-close='beforclose' 
    center>
    <el-row>
         <el-form :model="form" :rules="rules" ref="form">
             <el-col :span="11" v-for="(item,index) in columnList" :key="index">
                 <el-form-item :label="item.label" :label-width="formLabelWidth" class="formitem formitem1" :prop="item.prop">
                        <el-input v-model="form[`${item.prop}`]" ></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="11">
                 <el-form-item label="货品名称" :label-width="formLabelWidth" class="formitem formitem1" prop="model">
                        <el-input v-model="form.model" ></el-input>
                </el-form-item>
             </el-col>
             
            <el-col :span="11">
                <el-form-item label="设备类型" :label-width="formLabelWidth" class="formitem formitem1" prop="toType">
                    <el-select v-model="form.toType" placeholder="请选择">
                        <el-option
                        v-for="item in deptlist"
                        :key="item.enumKey"
                        :label="item.enumValue"
                        :value="item.enumKey">
                         {{item.enumValue}}
                        </el-option>
                    </el-select>
                    
                </el-form-item>
            </el-col>
            <el-col :span="11">
                <el-form-item label="所属车间" :label-width="formLabelWidth"  class="formitem formitem1" prop="type">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option
                            v-for="item in rolelist"
                            :key="item.enumKey"
                            :label="item.enumValue"
                            :value="item.enumKey">
                        {{item.enumValue}}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="11">
                 <el-form-item label="生产厂家" :label-width="formLabelWidth" class="formitem formitem1" prop="manufacturers">
                        <el-input v-model="form.manufacturers" ></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="11">
                 <el-form-item label="供应商" :label-width="formLabelWidth" class="formitem formitem1" prop="suppliers">
                        <el-input v-model="form.suppliers" ></el-input>
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
import { deviceToTypeList,devicesave,deviceid,deviceupdate} from 'api/main'
import { deviceTypeList} from 'api/index'

export default {
    name: 'partmodal',
  
    props:{
        dialogFormVisible:{
            type:Boolean
        },
        tit:{
            type:String
        },
        columnList:{
            type:Array
        }
    },
    data() {
        return {
            isclose:true,
            sureload:false,
            deptlist:[],
            rolelist:[],
            form: {
              
            },
            formLabelWidth: '90px',
            rules: {
                name: [{ required: true, message: '请输入', trigger: 'blur' }],
                model: [{ required: true, message: '请输入', trigger: 'blur' }],
                number: [{ required: true, message: '请输入', trigger: 'blur' }],
                toType: [{ required: true, message: '请输入', trigger: 'blur' }],               
                type: [{ required: true, message: '请输入', trigger: 'blur' }],               
            },
            // formlist:[
            //     {name:'货品编码',prop:"",type:''},
            //     {name:'货品名称',prop:"",type:''},
            //     {name:'货品规格',prop:"",type:''},
            //     {name:'类型',prop:"",type:''},
            //     {name:'材质',prop:"",type:''},
            //     {name:'颜色',prop:"",type:''},
            //     {name:'折高',prop:"",type:''},
            //     {name:'折宽',prop:"",type:''},
            //     {name:'折数',prop:"",type:''},
            //     {name:'滤材',prop:"",type:''},
            //     {name:'外径',prop:"",type:''},
            //     {name:'高度',prop:"",type:''},
            //     {name:'表面处理',prop:"",type:''},
            //     {name:'线径',prop:"",type:''},
            //     {name:'内径',prop:"",type:''},
            // ]
        }
    },
    created(){
     
    },
    mounted(){
        
    },
    watch:{
     
    },
    methods: {
      
       close(num){
           this.init()
           this.$emit('close',num)
       },
       //初始化
       init(){
           this.form= {
             
            }
       },
       marksure(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                 
                   
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
       },
       beforclose(){
          this.init()
          this.$emit('close',false)
       }
    }
}
</script>


<style lang='less'>
    .partmodal{
        .el-dialog{
            border-radius: 5px;
        }
        .el-dialog__header{
            background-color: #409BAF;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
           
           .el-dialog__title{
               color: #fff;
                 letter-spacing: 2px;
           }
           .el-dialog__headerbtn .el-dialog__close{
               color: #fff;
             
           }
        }
        .dialog-footer{
            text-align: end;
        }
        .el-form{
            display: flex;
            flex-wrap: wrap;
        }
        .el-select {
            width: 100%;
        }
        .el-col{
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