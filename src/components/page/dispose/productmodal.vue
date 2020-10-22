
<template>
  <div class="productmodal">
    <el-dialog
      :title="tit"
      :destroy-on-close="isclose"
      :visible.sync="dialogFormVisible"
      width="60%"
      :before-close="beforclose"
      center
    >
      <el-row v-if="tit==='新增产品'">
        <el-form
          id="addProduct"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-col :span="11">
            <el-form-item
              label="货品编码"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="productCode"
            >
              <el-input v-model="form.productCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="臻航号"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="zhNumber"
            >
              <el-input v-model="form.zhNumber"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="11">
            <el-form-item
              label="规格型号"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="model"
            >
              <el-input v-model="form.model"></el-input>
            </el-form-item>
          </el-col> -->
        

          <el-col :span="11">
            <el-form-item
              label="部件编码"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="partCode"
            >
             <el-input v-model="form.partCode"></el-input>
              <!-- <el-cascader
                :props="casprops1"
                v-model="infolist"
                @change='changesel'
                 collapse-tags
                :options="filteroption"
                @remove-tag="removetag"
                filterable
              ></el-cascader> -->
              <!-- <el-select v-model="itemIds" @change='changesel' @remove-tag='removetag' multiple  placeholder="请选择">
                        <el-option
                            v-for="item in rolelist"
                              :key="isResouceShow"
                              :filter-method ="dataFilter"
                            :key="item.id"
                            :label="item.itemName"
                            :value="item.id">
                        </el-option>
                    </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-button
              type="add"
              @click="addpro"
              style="margin-left:20px"
              >添加</el-button
            >
          </el-col>
          <el-col :span="24" v-if="this.tableData1.length > 0">
            <el-table :data="tableData1" border style="width: 100%">
              <el-table-column
                v-for="item in columnList"
                :key="item.id"
                :prop="item.prop"
                :label="item.label"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="150"
              >
                <template slot-scope="scope">
                  <el-button
                    type="info"
                    plain
                    @click="handleEdit1(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    type="danger"
                    plain
                    class="red"
                    @click="handledistribute(scope.row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-form>
      </el-row>
      <el-row v-if="tit==='修改产品'">
        <el-form
          id="addProduct"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-col :span="11">
            <el-form-item
              label="货品编码"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="productCode"
            >
              <el-input v-model="form.productCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="臻航号"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="zhNumber"
            >
              <el-input v-model="form.zhNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="部件编码"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="partCode"
            >
             <el-input v-model="form.partCode"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="元件编号"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="partNumber"
            >
             <el-input v-model="form.partNumber"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="元件名称"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="partName"
            >
             <el-input v-model="form.partName"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="发料工序"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="stWorkprocess"
            >
             <el-input v-model="form.stWorkprocess"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="来源"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="source"
            >
             <el-input v-model="form.source"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="单件用量"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="useCount"
            >
             <el-input v-model="form.useCount"></el-input>
            
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="基本单位"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="unit"
            >
             <el-input v-model="form.unit"></el-input>
            
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-dialog
        width="50%"
        title="部件修改"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-row>
          <el-form :model="form1" ref="form1">
            <el-col :span="11">
              <el-form-item
                label="部件编号"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="partCode"
              >
                <el-input
                  v-model="form1.partCode"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="发料工序"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="stWorkprocess"
              >
                <el-input
                  v-model="form1.stWorkprocess"
                  
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="元件编号"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="partNumber"
              >
                <el-input v-model="form1.partNumber" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="元件名称"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="partName"
              >
                <el-input
                  v-model="form1.partName"
                  
                ></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="11">
              <el-form-item
                label="来源"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="source"
              >
                <el-input v-model="form1.source"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="数量"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="useCount"
              >
                <el-input v-model="form1.useCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="单位"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="unit"
              >
                <!-- <el-input v-model="form1.unit" ></el-input> -->
                <el-select v-model="form1.unit" placeholder="请选择">
                                <el-option
                                    v-for="item in deptlist"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >{{item.name}}</el-option>
                            </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="close1">取 消</el-button>
          <el-button type="primary" @click="marksure1"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button
          type="primary"
          @click="marksure('form')"
          :loading="sureload"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  producetasklist,
  producetasklistTreet,
  getListByIds,
  productadd,
  productid,
  productput,
  partInfoByProductCodeAndPartCode,
  productaddExcel
} from 'api/main';
import { deviceTypeList } from 'api/index';
// import { delete } from 'vue/types/umd';

export default {
  name: 'productmodal',

  props: {
    dialogFormVisible: {
      type: Boolean
    },
    tit: {
      type: String
    }
  },
  data() {
    return {
      isclose: true,
      sureload: false,
      rolelist: [],
      form: {
        productName: '',
        productCode: '',
        model: '',
        productItemList: []
      },
       deptlist: [
                { name: '个', id: '个' },
                { name: '只', id: '只' },
                { name: '件', id: '件' }
            ],
      form1: {
        stWorkprocess: '',
        partCode: '',
        partNumber: '',
        partName: '',
        useCount: '',
        unit: '',
        source:''
      },
      formLabelWidth: '90px',
      rules: {
        // productCode: [
        //   {
        //     required: true,
        //     message: '请输入货品编码',
        //     trigger: 'blur'
        //   }
        // ],
        // productName: [
        //   {
        //     required: true,
        //     message: '请输入产品名称',
        //     trigger: 'blur'
        //   }
        // ],
        // model: [
        //   {
        //     required: true,
        //     message: '请输入规格型号',
        //     trigger: 'blur'
        //   }
        // ],
        zhNumber: [{ required: true,message: '请输入', trigger: 'blur' }],
        stWorkprocess: [{ required: true,message: '请输入', trigger: 'blur' }],
        partNumber: [{ required: true,message: '请输入', trigger: 'blur' }],
        partName: [{ required: true,message: '请输入', trigger: 'blur' }],
        useCount: [{ required: true,message: '请输入', trigger: 'blur' }],
        source: [{ required: true,message: '请输入', trigger: 'blur' }],
        unit: [{ required: true,message: '请输入', trigger: 'blur' }],
      },
      tableData1: [],
      columnList: [
          {prop:'stWorkprocess',label:'发料工序'},
          {prop:'partCode',label:'部件编码'},
          {prop:'partNumber',label:'元件编号(内部)'},
          {prop:'partName',label:'元件名(名称)'},
          {prop:'useCount',label:'单件用量'},
          {prop:'source',label:'来源'},
          {prop:'unit',label:'单位'},
      ],
      caslist1: [],
      caslist2: [],
      caslist0: [],
      innerVisible: false,
       isResouceShow: "0",
      itemIds: [],
      infolist: [],
      filteroption:[],
      copy:[],
      seachval:'',
      productId: '' ,//修改时根据id 查询数量，
      casprops1:{
        multiple: true,
        value: 'id',
        label: 'itemName',
      },
      casprops:{},
      a:0
    };
  },
  created() {
    // this.getproducetasklist();
    //  this.getload()
    this.getData();
  },
  mounted() {},
  watch: {},
  methods: {
    
   
    getData(data) {
      //  这里写获取数据的方法然后让options_cascader等于返回来的值
      // this.filteroption=data
      producetasklistTreet().then(res=>{
        if(res.code==='0'){
          this.filteroption = res.data
        }
      })
    },
    changesel(val) {
      let arr = [];
      val.map(item => {
        let a = item.length - 1;
        arr.push(item[a]);
      });
      this.itemIds = arr;
    },
    removetag(val) {
      let len = val.length - 1;
      let arr = this.itemIds;
      arr.map((item, index) => {
        if (item === val[len]) {
          arr.splice(index, 1);
        }
      });
      // console.log(this[`caslist${len}`])
      this.itemIds = arr;
    },
    //产品详情
    getproductid(val) {
 
      let res = JSON.parse(JSON.stringify(val))
      this.form = res
      // this.productId = id.id;
      // productid(id).then(res => {
      //   if (res.code == '0') {
      //     let arr = [];
      //     let arr1 = []
      //     res.data.itemList.map(item => {
      //       arr.push(item.id);
      //       arr1.push([1,2,item.id])
      //     });
      //     this.infolist = arr1
      //     this.form = res.data;
      //     this.itemIds = arr;
      //     this.tableData1 = res.data.itemList;
      //   }
      // });
    },
    // 物料列表
    getproducetasklist() {
      producetasklist().then(res => {
        if (res.code === '0') {
          this.rolelist = res.data.itemList;
        }
      });
    },
    // 添加
    addpro() {
      if (this.tit === '新增产品') {
        // if(!this.form.productCode){
        //   this.$message.error('请先输入货品编号')
        //   return
        // }
        this.getListByIds();
      } 
    },
    getListByIds(ids) {
      // getListByIds(ids).then(res => {
      //   if (res.code === '0') {
      //     res.data.map(item => {
      //       if (!item.itemCount) {
      //         item.itemCount = 1;
      //       }
      //     });
      //     this.tableData1 = res.data;
      //   }
      // });
      let obj = {
        // productCode:this.form.productCode,
        partCode:this.form.partCode
      }
      partInfoByProductCodeAndPartCode(obj).then(res=>{
        if(res.code==='0'){
         
          this.form.partCode = ''
          if(res.data.length>0){
            let result = this.tableData1.filter(v=>v.id===res.data[0].id)
            if(result&&result.length>0){
              this.$message.error('该部件已存在')
            }else{
              this.tableData1 = [...this.tableData1,...res.data];
            }
          }else{
            this.$message.error('暂无数据')
          }
          
        }
      })
    },
    // 修改
    handleEdit1(h, m) {
      this.form1 = JSON.parse(JSON.stringify(m));
      this.innerVisible = true;
    },
    // 二级弹窗关闭
    close1() {
      this.innerVisible = false;
    },
    // 二级弹窗确认
    marksure1() {
      this.tableData1.map((item, index) => {
        if (item.id === this.form1.id) {
          this.tableData1[index].useCount = this.form1.useCount;
        }
      });
      this.$forceUpdate();
      this.innerVisible = false;
    },
    close(num) {
      this.init();
      this.$emit('close', num);
    },
    //初始化
    init() {
      this.form = {
        productName: '',
        productCode: '',
        model: '',
        productItemList: []
      };
      this.productId = '';
      this.tableData1 = [];
      this.itemIds = [];
      this.infolist = ''
    },
    marksure(form) {
      let arr = JSON.parse(JSON.stringify(this.tableData1))
      console.log(this.tableData1);
       arr.map((item,index)=>{
              item.productCode = this.form.productCode
              item.zhNumber = this.form.zhNumber
              delete item.id
              delete item.createTime
              delete item.updateTime
      })
      // this.tableData1.map(item => {
      //   arr.push({
      //     itemCode: item.itemCode,
      //     useCount: item.useCount
      //   });
      // });
      // this.form.productItemList = arr;
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.tit == '新增产品') {
            // productadd(this.form).then(res => {
            //   if (res.code == '0') {
            //     this.$message.success(res.msg);
            //     this.close('0');
            //   }
            // });
            productaddExcel(arr).then(res=>{
                 if (res.code == '0') {
                  this.$message.success(res.msg);
                  this.close('0');
                }else{
                  this.$message.error(res.msg)
                }
            })
          } else {
            if(this.form.createTime){
              delete this.form.createTime
            }
            productput(this.form).then(res => {
              if (res.code == '0') {
                this.$message.success(res.msg);
                this.close('0');
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    beforclose() {
      this.init();
      this.$emit('close', false);
    },
    //删除
    handledistribute(m) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功');
          let arr = this.tableData1;
          let arr1 = this.infolist;
          this.tableData1.map((item, index) => {
            if (item.id === m) {
              arr.splice(index, 1);
            }
          });
          this.tableData1 = arr;

          arr1.map((item, index) => {
            let a = item.length - 1;
            if (item[a] === m) {
              arr1.splice(index, 1);
            }
          });
          this.infolist = arr1;
          this.$forceUpdate();
         
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scpoed>
.productmodal {
  .el-form {
    display: flex;
    flex-wrap: wrap;
  }
  .el-select {
    width: 100%;
  }

  // .formitem{
  //     width: 45%;

  //     margin-bottom: 40px;
  // }
  // .formitem1{
  //     margin-right: 5%;
  // }
  .el-col {
    margin-bottom: 20px;
  }
}

.el-dialog {
  border-radius: 5px;
}
.el-dialog__header {
  background-color: #409baf;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
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
</style>
<style scoped>
#addProduct >>> .el-cascader {
  width: 100%;
}
</style>
