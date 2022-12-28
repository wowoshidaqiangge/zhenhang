<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-18 17:07:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-23 14:53:54
 * @FilePath: \vue-manage-system\src\components\page\dispose\module\index.vue
-->
<template>
    <div class="part">
         <div class="sel_con">
             <p>配件类型选择：</p>
           
             <el-radio-group v-model="area"  @change="(e)=>changerad(e,'area')">
                <el-radio  v-for="city in partList" :label="city.name" :key="city.id" >{{city.name}}</el-radio >
              </el-radio-group>
          </div>
          
           <div class="sel_con sel_flex">
               <p>属性选择：</p>
             <div class="con_left">
                    
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.label"
                        :label="item.label"
                        :value="item.label">
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
          </div>
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
          <modModel :drawer="drawer" :tit="tit" @close="close" />
    </div>
</template>
<script>
import modModel from "./modModel.vue"
export default {
    components:{
        modModel
    },
    data(){
        return{
            drawer:false,
            tit:'新增',
            area:'端盖组件',
            partList:[
                {name:"端盖组件",id:1,children:[
                       
                        {prop:"",label:"货品编码"},
                        {prop:"",label:"货品名称"},
                        {prop:"",label:"类型"},
                        {prop:"",label:"材质"},
                        {prop:"",label:"颜色"},
                        {prop:"",label:"备注"},
                        {prop:"",label:"来源"},
                        {prop:"",label:"图纸"},]},
                {name:"密板组件",id:2,children:[
                       
                        {prop:"",label:"货品编码"},
                        {prop:"",label:"货品名称"},
                        {prop:"",label:"类型"},
                        {prop:"",label:"材质"},
                        {prop:"",label:"颜色"},
                        {prop:"",label:"备注"},
                        {prop:"",label:"来源"},
                        {prop:"",label:"图纸"}]},
                {name:"旁通阀组件",id:3},
                {name:"外壳组件",id:4},
                {name:"纸芯组件",id:5},
                {name:"其它组件",id:6},
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
       this.columnList = this.partList[0].children
       this.options = this.partList[0].children
    },
    methods:{
        add(){
            this.drawer = true
            
        },
        close(){
            this.drawer = false
        },
        changerad(val){
            let pro = this.partList.filter(v=>v.name===val)
            if(pro.length>0){
                this.columnList = pro[0].children
                this.options = pro[0].children
            }
        },
    }
}
</script>
<style lang="less">
    .part{
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