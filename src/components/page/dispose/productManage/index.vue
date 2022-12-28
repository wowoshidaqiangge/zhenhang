<!--
 * @Descripttion: 
 * @version: 
 * @Author: renqiang_hu
 * @Date: 2021-08-18 17:05:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-25 15:24:43
 * @FilePath: \vue-manage-system\src\components\page\dispose\productManage\index.vue
-->
<template>
  <div class="productManage">
      <div class="pro_top">
         <div class="pro_left">
            <span>属性选择：</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="input" style="width:15%;margin:0 15px" placeholder="请输入内容"></el-input>
              <el-button icon="el-icon-search">搜 索</el-button>

         </div>
          <div class="pro_right">
             <el-button type="primary" icon="el-icon-folder">EXCEL导入</el-button>
                 <el-button type="success" icon="el-icon-folder-opened">EXCEL导出</el-button>
          </div>
      </div>
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
            <el-table-column label="操作" align="center" width="250">
                    <template slot-scope="scope">
                         <el-button type="primary" size="mini">编辑</el-button>
                          <el-button type="warning" size="mini"  @click="hischange">删 除</el-button>
                           <el-button type="info" size="mini" @click="hischange">历史修改</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-dialog title="历史修改记录" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </el-dialog>
  </div>  
</template>
<script>
export default {
  data(){
    return{
      options:[],
      value:"",
      columnList:[
        {prop:'index',label:"货品编号"},
        {prop:'',label:"臻航号"},
        {prop:'',label:"通用号"},
        {prop:'',label:"外径"},
        {prop:'',label:"高度"},
        {prop:'',label:"螺纹规格"},
        {prop:'',label:"内盒尺寸"},
        {prop:'',label:"可印字尺寸"},
        {prop:'',label:"备注"},
        {prop:'',label:"单位"},
      ],
      tableData:[1],
      dialogTableVisible:false,
      gridData:[]
    }
  },
  methods:{
    hischange(){
       this.dialogTableVisible = true
     
      // setTimeout(function () {console.log(2)}, 2000);
    },
   
  },
  mounted(){
    // for (var i = 0; i < 10; ++i) {
    //     setTimeout(function () {
    //       console.log(i)
    //     }, 0);
    // }
    for (var i = 0; i < 10; ++i) {
        setTimeout(function (i) {
          console.log(i)
        }, 0,(i));
    }
  }
}
</script>
<style lang="less">
.productManage{
  padding: 10px;
  .pro_top{
    display: flex;
    margin: 10px 0 15px 0;
    .pro_left{
      flex:1;
      display: flex;
      align-items: center;
    }
  }
}
</style>