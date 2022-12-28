<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-18 17:07:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 10:06:13
 * @FilePath: \vue-manage-system\src\components\page\dispose\part\index.vue
-->
<template>
    <div class="part">
        <Selpart @changechild="changechild">
            <div slot="but">
                 <el-button type="add" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
                 <el-button type="primary" icon="el-icon-folder">EXCEL导入</el-button>
                 <el-button type="success" icon="el-icon-folder-opened">EXCEL导出</el-button>
            </div>
        </Selpart>
         <!-- <div class="sel_con">
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
                    <el-button type="add" icon="el-icon-search">查 询</el-button>
             </div>
             <div>
                 <el-button type="add" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
                 <el-button type="primary" icon="el-icon-folder">EXCEL导入</el-button>
                 <el-button type="success" icon="el-icon-folder-opened">EXCEL导出</el-button>
             </div>
          </div> -->
          <section>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    v-for="(item,index) in columnList"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                   >
                </el-table-column>
                
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                         <el-button type="text" size="small">编辑</el-button>
                          <el-button type="text" size="small">编辑</el-button>
                           <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                </el-table>
          </section>
          <partModel :dialogFormVisible="dialogFormVisible" :tit="tit" @close="close" :columnList="columnList"/>
    </div>
</template>
<script>
import partModel from "./partModel.vue"
import Selpart from './../selPart.vue'
export default {
    components:{
        partModel,Selpart
    },
    data(){
        return{
            dialogFormVisible:false,
            tit:'新增',
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
            tableData:[],
            columnList:[
               
            ]
        }
    },
    mounted(){
       this.nameList = this.partList[0].children   
       this.areaname = this.partList[0].children[0].name
       this.columnList = this.partList[0].children[0].children
    },
    methods:{
        add(){
            this.dialogFormVisible = true
        },
        close(){
            this.dialogFormVisible = false
        },
     
        changechild(val){
             let pro = this.nameList.filter(v=>v.name===val)
            if(pro.length>0){
                this.columnList = pro[0].children   
                // this.areaname = pro[0].children[0].name
                // this.columnList = pro[0].children[0].children
            }else{
                // this.columnList = []   
              
            }
        },
        
        
    }
}
</script>
<style lang="less">
    .part{
      
    }
</style>