<template>
  <div class="mainstatistics">
       <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="deviceName"
                label="名称"
                width="180">
            </el-table-column>
             <el-table-column
                v-for="(item,index) in columnlist"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                align="center"
                >
            </el-table-column>
          
      
        </el-table>
  </div>
</template>

<script>
import { selectDeviceMaintainData } from 'api/index'
export default {
    name: 'mainstatistics',
    data() {
        return {
            tableData:[],
            columnlist:[]
        }
    },
    created(){
        this.getselectDeviceMaintainData()
    },
    methods: {
      getselectDeviceMaintainData(){
          selectDeviceMaintainData().then(res=>{
              debugger
              if(res.code==='0'){
                  let arr = []
                   var arr1 = {}
                  res.data.map((item,index) => {

                    arr1 = {}
                    item.deviceMaintainList.map((h,j)=>{
                        if(index=='0'){
                            this.columnlist.push({label: h.dateTime,prop:`state${j}`})
                        }
                        arr1[`dateTime${j}`] = h.dateTime
                        arr1[`dateList${j}`] = h.dateList
                        arr1[`state${j}`] = h.state
                    })
                    
                        arr.push({ ...item,...arr1})
                    });
                    this.tableData = arr
                  console.log(this.columnlist)
              }
          })
      }
    }
}
</script>


<style lang='less'>
    .mainstatistics{
        width: 100%;
        height: 100%;
    }
</style>
