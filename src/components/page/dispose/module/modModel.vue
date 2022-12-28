<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-23 14:36:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 10:57:26
 * @FilePath: \vue-manage-system\src\components\page\dispose\module\modModel.vue
-->
<template>
    <div class="mod">
            <el-drawer
                :title="tit"
                :visible.sync="drawer"
                :direction="direction"
                size="60%"
                custom-class="demo-drawer"
                ref="drawer"
                :before-close="handleClose">
                    <div class="demo-drawer__content">
                        <div class="con">
                              <p class="tit"><b></b> 组件基本信息</p>  
                              <div class="info">
                                  <el-row>
                                        <el-form :model="form">
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                             <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="活动名称" :label-width="formLabelWidth">
                                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-form> 
                                  </el-row>
                                  
                              </div>
                              <p class="tit"><b></b> 组件基本信息</p>  
                              <div class="info">
                                  <Selpart/>
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
                                        
                                        </el-table>
                              </div>
                              <p class="tit"><b></b> 配件清单</p>  
                              <div class="info">
                                   <el-table
                                        :data="tableData"
                                        @cell-dblclick="tableEdit"
                                        style="width: 100%">
                                            <el-table-column prop="name" label="姓名">
                                                <template slot-scope="scope">
                                                    <el-input 
                                                        size="small"
                                                        v-model="scope.row.name"
                                                        v-if="showInput==`name${scope.row.index}`"
                                                        v-focus
                                                        @blur='blurInput(scope.row.index,"name",scope.row.index)'
                                                    />
                                                    <p v-else>{{scope.row.name}}</p>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                v-for="(item,index) in columnList"
                                                :key="index"
                                                :prop="item.prop"
                                                :label="item.label"
                                                align="center"
                                            >
                                            </el-table-column>
                                        
                                        </el-table>
                              </div>
                        </div>
                        
                        <div class="demo-drawer__footer">
                            <el-button >取 消</el-button>
                            <el-button type="primary" @click="$refs.drawer.closeDrawer()" >确 定</el-button>
                        </div>
                    </div>
            </el-drawer>
    </div>
   
</template>
<script>
import Selpart from './../selPart.vue'
export default {
    components:{
        Selpart
    },
    data(){
        return{
            direction:"rtl",
            form:{
                
            },
            formLabelWidth: '80px',
            tableData:[{index:1,name:"huhu"},{index:2,name:"huhu"},{index:3,name:"huhu"},{index:4,name:"huhu"},{index:5,name:"huhu"},{index:6,name:"huhu"},{index:7},{index:8},{index:9},{index:10},{index:11},{index:12},],
            columnList: [{prop:"index",label:"货品编码"},
                        {prop:"name",label:"货品名称"},
                        {prop:"",label:"类型"},
                        {prop:"",label:"材质"},
                        {prop:"",label:"颜色"},
                        {prop:"",label:"备注"},
                        {prop:"",label:"来源"},
                        {prop:"",label:"图纸"},
            ],
            oldData:{},
            showInput:""
        } 
    },
    props:{
        drawer:{
            type:Boolean
        },
        tit:{
            type:String
        } 
    },
    directives:{
        focus:{
            inserted:function(el){
              
                if(el.tagName.toLocaleLowerCase()=='input'){
                    el.focus()
                }else{
                    if(el.getElementsByTagName("input")){
                        el.getElementsByTagName("input")[0].focus()
                    }
                }
                // el.focus()
            }
        }
    },
    methods:{
        handleClose(){
            this.$emit("close")
        },
        async blurInput(id,name,val){
           
            let obj ={}
            if(this.oldData[name] != val){
                obj[name] =val
                console.log(this.tableData)
            }
            this.showInput  = ''
        },
        tableEdit(row,col,e){
            this.showInput = col.property + row.index
            this.oldData[col.property] = row[col.property]
        }
    }
}
</script>
<style lang="less">
.mod{
    .el-drawer__body{
        padding:0 20px 20px 20px;
        height: calc(100% - 84px);
    }
    .el-drawer__body::-webkit-scrollbar{
        width: 0 !important;
    }
    .demo-drawer__content{
        // display: flex;
        // flex-direction: column;
        height: 100%;
        overflow: auto;
        .con{
            // flex:1
            
        }
    }
    .demo-drawer__footer{
        display: flex;
        .el-button{
            flex:1
        }
    }
    .tit{
        line-height: 20px;
        b{
            height: 14px;
            width: 3px;
            display: inline-block;
            background: chocolate;
        }
    }
    .info{
        border:1px dashed #ccc;
        border-radius: 5px;
        padding: 20px 15px 10px 10px;
        margin: 10px 0;
    }
}
</style>