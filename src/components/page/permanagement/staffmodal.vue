<template>
  <div class="moadl">
    <el-dialog 
    :title="tit" 
    :destroy-on-close='isclose'
    :visible.sync="dialogFormVisible"
    width='40%' 
    :before-close='beforclose' 
    center>
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="用户姓名" :label-width="formLabelWidth" class="formitem formitem1" prop="name">
                    <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="用户手机" :label-width="formLabelWidth" class="formitem" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号名称" :label-width="formLabelWidth" class="formitem formitem1" prop="username">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号密码" :label-width="formLabelWidth" class="formitem" prop="password" >
                    <el-input v-model="form.password" autocomplete="off" show-password></el-input>
            </el-form-item>

            <el-form-item label="所属部门" :label-width="formLabelWidth" class="formitem formitem1" prop="deptId">
                <el-select v-model="form.deptId" placeholder="请选择">
                    <el-option
                    v-for="item in deptlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                   {{item.name}}
                    </el-option>
                </el-select>
                  
            </el-form-item>
            <el-form-item label="IC卡号" :label-width="formLabelWidth" class="formitem" prop="icCard">
                    <el-input v-model="form.icCard" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" :label-width="formLabelWidth"  class="formitem formitem1" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请选择">
                 <el-option
                    v-for="item in rolelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                   {{item.name}}
                 </el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="marksure('form')" :loading="sureload">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>

<script>
import { dept,rolePage,authUser,authputUser,authputUserid } from 'api/index'
export default {
    name: 'staffmodal',
  
    props:{
        dialogFormVisible:{
            type:Boolean
        },
        tit:{
            type:String
        },
        isedit:{
            type:Boolean
        }
    },
    data() {
        return {
            isclose:true,
            sureload:false,
            deptlist:[],
            rolelist:[{name:'班组长',id:'1000'}],
            form: {
                name: '',
                phone: '',
                roleId: '',
                icCard: '',
                deptId: '',
                username: '',
                password:''
            },
            formLabelWidth: '80px',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                 phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号格式有误' }
                ],
                 password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                 username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                 icCard: [
                    { required: true, message: '请输入IC卡号', trigger: 'blur' },
                ],
                roleId:[
                    { required: true, message: '请选择用户角色', trigger: 'blur' },
                ],
                 deptId:[
                    { required: true, message: '请选择部门', trigger: 'blur' },
                ]
            }
        }
    },
    created(){
       this.getdept()
       this.getrolePage()
    },
    mounted(){
        
    },
    watch:{
     
    },
    methods: {
        getauthputUserid(id){
            authputUserid(id).then(res=>{
                if(res.code === '0'){
                    this.form = res.data
                }
            })
        },
       getrolePage(){
           rolePage().then(res=>{
               if(res.code==='0'){
                //    this.rolelist =[{name:'班组长',id:'1000'}]
                   this.rolelist.push(...res.data.records) 
               }
           })
       },
       getdept(){
           dept().then(res=>{
               if(res.code==='0'){
                   this.deptlist = res.data
               }
           })
       },
       close(){
           this.init()
           this.$emit('close',false)
       },
       //初始化
       init(){
           this.form= {
                name: '',
                phone: '',
                roleId: '',
                icCard: '',
                deptId: '',
                username: '',
                password:''
            }
       },
       marksure(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.sureload = true
                    // 判断是编辑还是新增
                    if(!this.isedit){
                        authUser(this.form).then(res=>{
                            if(res.code==='0'){
                                this.$message.success(res.msg);   
                                this.init()
                                this.sureload = false
                                this.$emit('close','0')
                            }
                        })
                    }else{
                        authputUser(this.form).then(res=>{
                            if(res.code === '0'){
                                this.$message.success(res.msg);   
                                this.sureload = false
                                this.$emit('close','0') 
                            }
                        })
                    }
                    
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
        .formitem{
            width: 45%;
         
            margin-bottom: 40px;
        }
        .formitem1{
            margin-right: 5%;
        }
    }

</style>
