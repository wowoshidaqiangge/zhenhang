<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-24 09:27:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 09:51:12
 * @FilePath: \vue-manage-system\src\components\page\dispose\selPart.vue
-->
<template>
    <div class="selpart">
        <div class="sel_con">
             <p>配件类型选择：</p>
           
             <el-radio-group v-model="area"  @change="(e)=>changerad(e,'area')">
                <el-radio  v-for="city in partList" :label="city.name" :key="city.id" >{{city.name}}</el-radio >
              </el-radio-group>
          </div>
           <div class="sel_con">
             <p>配件名称选择：</p>
           
             <el-radio-group v-model="areaname" @change="(e)=>changeradchild(e)">
                <el-radio  v-for="city in nameList" :label="city.name" :key="city.id" >{{city.name}}</el-radio >
              </el-radio-group>
          </div>
           <div class="sel_con sel_flex">
               <p>属性选择：</p>
             <div class="con_left">
                    
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                        placeholder="请输入内容"
                        style="width:20%;margin:0 15px"
                        v-model="value">
                    </el-input>
                    <el-button type="add" icon="el-icon-search" @click="search">查 询</el-button>
             </div>
             <div>
                 <slot name="but">

                 </slot>
                 <!-- <el-button type="add" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
                 <el-button type="primary" icon="el-icon-folder">EXCEL导入</el-button>
                 <el-button type="success" icon="el-icon-folder-opened">EXCEL导出</el-button> -->
             </div>
          </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            area:'塑料',
            partList:[
                {name:"塑料",id:1,children:[{name:"塑料配件",id:11,children:[
                       
                        {prop:"",label:"货品编码"},
                        {prop:"",label:"货品名称"},
                        {prop:"",label:"类型"},
                        {prop:"",label:"材质"},
                        {prop:"",label:"颜色"},
                        {prop:"",label:"备注"},
                        {prop:"",label:"来源"},
                        {prop:"",label:"图纸"},]},
                    {name:"塑料圈和螺纹圈",id:12,children:[
                        {prop:"",label:"货品编码"},
                        {prop:"",label:"货品名称"},
                        {prop:"",label:"货品规格"},
                        {prop:"",label:"材质"},
                        {prop:"",label:"备注"},
                        {prop:"",label:"图纸"},
                        {prop:"",label:"来源"},]},
                    {name:"放水阀",id:13},{name:"油杯",id:14},{name:"导流管",id:15}]},
                {name:"五金",id:2,children:[{name:"封口板",id:21},{name:"封口杯盖",id:22},{name:"螺纹板",id:23},{name:"弹簧/弹片",id:24},{name:"外壳",id:25},{name:"铝盖板",id:26},{name:"五金配件",id:27}]},
                {name:"上下盖中心管",id:3},
                {name:"其它",id:4},
            ],
            nameList:[],
            areaname:"",
            value:'',
            options:[],
        }
    },
    mounted(){
       this.nameList = this.partList[0].children   
       this.areaname = this.partList[0].children[0].name
       this.columnList = this.partList[0].children[0].children
    },
    methods:{
        changerad(val){
            let pro = this.partList.filter(v=>v.name===val)
            if(pro.length>0){
                this.nameList = pro[0].children   
                this.areaname = pro[0].children[0].name
                this.columnList = pro[0].children[0].children
            }else{
                this.nameList = []   
                this.areaname = ""
            }
        },
        changeradchild(val){
           this.$emit("changechild",val)
        },
        search(){
            let obj = {
                area:this.area,
                areaname:this.areaname
            }
            this.$emit("search",obj)
        }
    }
}
</script>
<style lang="less">
.selpart{
    .sel_con{
          display: flex;
          align-items: center;
          padding: 10px;
        //   border-bottom: 1px dashed #ccc;
          .con_all{
            margin-right: 30px;
          }
          p{
              margin-right: 10px;
          }
          .el-radio__input{
            display: none;
          }
          .el-radio{
             padding: 5px;
             border-radius: 5px;
          }
          .el-radio__label{
              padding:  0 10px;
          }
          .is-checked{
            background: #409baF;
            .el-radio__label{
              color: #fff;
            }
          }
        }
        .sel_flex{
          
            .con_left{
                flex:1;
                display: flex;
                align-items: center;
            }
        }
}
</style>