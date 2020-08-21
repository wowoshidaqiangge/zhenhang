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
      <el-row>
        <el-form
          id="addProduct"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-col :span="11">
            <el-form-item
              label="产品编码"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="productCode"
            >
              <el-input v-model="form.productCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="产品名称"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="productName"
            >
              <el-input v-model="form.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="规格型号"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="model"
            >
              <el-input v-model="form.model"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11"></el-col>

          <el-col :span="11">
            <el-form-item
              label="物料选择"
              :label-width="formLabelWidth"
              class="formitem formitem1"
              prop="stuff"
            >
              <el-cascader
                :props="casprops"
                v-model="infolist"
                :show-all-levels="false"
                multiple
                @change="changesel"
                @remove-tag="removetag"
              ></el-cascader>
              <!-- <el-select v-model="itemIds" @change='changesel' @remove-tag='removetag' multiple  placeholder="请选择">
                        <el-option
                            v-for="item in rolelist"
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
      <el-dialog
        width="50%"
        title="物料修改"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-row>
          <el-form :model="form1" ref="form1">
            <el-col :span="11">
              <el-form-item
                label="物料名称"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="itemName"
              >
                <el-input
                  v-model="form1.itemName"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="物料编码"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="itemCode"
              >
                <el-input
                  v-model="form1.itemCode"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="规格型号"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="model"
              >
                <el-input v-model="form1.model" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="材质"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="material"
              >
                <el-input
                  v-model="form1.material"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="数量"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="itemCount"
              >
                <el-input v-model="form1.itemCount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="单位"
                :label-width="formLabelWidth"
                class="formitem formitem1"
                prop="unit"
              >
                <el-input v-model="form1.unit" disabled></el-input>
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
  getListByIds,
  productadd,
  productid,
  productput
} from 'api/main';
import { deviceTypeList } from 'api/index';

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
      form1: {
        itemCode: '',
        itemName: '',
        model: '',
        material: '',
        itemCount: '',
        unit: ''
      },
      formLabelWidth: '90px',
      rules: {
        productCode: [
          {
            required: true,
            message: '请输入产品编码',
            trigger: 'blur'
          }
        ],
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
        stuff: [{ message: '请选择物料', trigger: 'blur' }]
      },
      tableData1: [],
      columnList: [
        { prop: 'itemCode', label: '物料编码' },
        { prop: 'itemName', label: '物料名称' },
        { prop: 'model', label: '规格型号' },
        { prop: 'material', label: '材质' },
        { prop: 'itemCount', label: '数量' },
        { prop: 'unit', label: '单位' }
      ],
      caslist1: [],
      caslist2: [],
      caslist0: [],
      innerVisible: false,
      itemIds: [],
      infolist: [],
      productId: '' //修改时根据id 查询数量
    };
  },
  created() {
    this.getproducetasklist();
    let that = this;
    this.casprops = {
      multiple: true,
      lazy: true,
      lazyLoad(node, resolve) {
        if (node.level == 0) {
          producetasklist().then(res => {
            if (res.code === '0') {
              const cities = res.data.itemList.map((value, i) =>
                value.dataIsEmpty == 'true'
                  ? {
                      value: value.id,
                      label: value.itemName,
                      leaf: node.level >= 2
                    }
                  : {
                      value: value.id,
                      label: value.itemName,
                      leaf: node.level >= 0
                    }
              );
              resolve(cities);
            }
          });
        } else if (node.level == 1) {
          producetasklist({ itemName: node.label }).then(res => {
            if (res.code === '0') {
              const cities = res.data.itemList.map((value, i) =>
                value.dataIsEmpty == 'true'
                  ? {
                      value: value.id,
                      label: value.material,
                      leaf: node.level >= 2
                    }
                  : {
                      value: value.id,
                      label: value.material,
                      leaf: node.level >= 1
                    }
              );
              resolve(cities);
            }
          });
        } else if (node.level == 2) {
          producetasklist({ material: node.label }).then(res => {
            if (res.code === '0') {
              const cities = res.data.itemList.map((value, i) => ({
                value: value.id,
                label: value.model,
                leaf: node.level >= 2
              }));
              resolve(cities);
            }
          });
        }
      }
    };
  },
  mounted() {},
  watch: {},
  methods: {
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
    getproductid(id) {
      this.productId = id.id;
      productid(id).then(res => {
        if (res.code == '0') {
          let arr = [];
          res.data.itemList.map(item => {
            arr.push(item.id);
          });
          this.form = res.data;
          this.itemIds = arr;
          this.tableData1 = res.data.itemList;
        }
      });
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
        this.getListByIds({ itemIds: this.itemIds.toString() });
      } else {
        this.getListByIds({
          itemIds: this.itemIds.toString(),
          productId: this.productId
        });
      }
    },
    getListByIds(ids) {
      getListByIds(ids).then(res => {
        if (res.code === '0') {
          res.data.map(item => {
            if (!item.itemCount) {
              item.itemCount = 1;
            }
          });
          this.tableData1 = res.data;
        }
      });
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
          this.tableData1[index].itemCount = this.form1.itemCount;
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
    },
    marksure(form) {
      let arr = [];
      console.log(this.tableData1);
      this.tableData1.map(item => {
        arr.push({
          itemCode: item.itemCode,
          itemCount: item.itemCount
        });
      });
      this.form.productItemList = arr;
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.tit == '新增产品') {
            productadd(this.form).then(res => {
              if (res.code == '0') {
                this.$message.success(res.msg);
                this.close('0');
              }
            });
          } else {
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
          console.log(arr1);
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
