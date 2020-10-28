<template>
<div>
  <navgation-bar></navgation-bar>
  <!--标签页-->
  <div id="tabs">
    <el-tabs type="border-card" :value="IASelection">
      <!--转库申请单主页面-->
      <el-tab-pane label="转库申请单" name="转库申请单">
        <div style="height: 650px">
          <block><el-button type="success" id="create-list" @click="toCreateCreateShiftReq">新建转库申请单</el-button></block>
          <block>
            <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">转库申请单列表</el-tag></div>
            <el-input placeholder="请输入搜索信息" v-model="searchInfo" class="search-input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </block>
          <el-table :data="transferReqTableDataCom.slice((transferReqTableDataCurrentPage-1)*transferReqTableDataPagesize, transferReqTableDataCurrentPage*transferReqTableDataPagesize)" style="width: 100%">
            <el-table-column fixed prop="transferRequestId" label="序号" width="50px"></el-table-column>
            <el-table-column prop="transferRequestCode" label="订单编号" width="150px"></el-table-column>
            <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
            <el-table-column prop="storageIn" label="转入仓库" width="150px"></el-table-column>
            <el-table-column prop="storageOut" label="转出仓库" width="150px"></el-table-column>
            <el-table-column prop="transferRequestDate" label="申请日期" width="150px"></el-table-column>
            <el-table-column prop="departmentName" label="申请部门" width="150px"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="200px"></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="100px">
              <template slot-scope="scope">
                <el-button size="mini" v-if="scope.row.statusName === '草稿'" type="primary" icon="el-icon-edit" circle @click="editTransferReq(scope.row)"></el-button>
                <el-button size="mini" v-if="scope.row.statusName === '已审批'" type="success" icon="el-icon-document" circle @click="transferRequestDetail(scope.row)"></el-button>
                <el-button size="mini" v-if="scope.row.statusName === '草稿'" type="danger" icon="el-icon-delete" circle @click="deleteTransferReqById(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="transferReqTableDataCurrentPageChange"
              :current-page="transferReqTableDataCurrentPage"
              :page-size="transferReqTableDataPagesize"
              :total="transferReqTableData.length"
              layout="total, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!--转库单主页面-->
      <el-tab-pane label="转库单" name="转库单">
        <div style="height: 650px">
          <block>
            <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">转库单列表</el-tag></div>
            <el-input placeholder="请输入搜索信息" v-model="transferTableSearchInfo" class="search-input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </block>
          <el-table :data="transferTableDataCom.slice((transferTableDataCurrentPage - 1) * transferTableDataPagesize, transferTableDataCurrentPage * transferTableDataPagesize)" style="width: 100%">
            <el-table-column fixed prop="transferId" label="序号" width="50px"></el-table-column>
            <el-table-column prop="transferCode" label="订单编号" width="150px"></el-table-column>
            <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
            <el-table-column prop="storageInName" label="转入仓库" width="150px"></el-table-column>
            <el-table-column prop="storageOutName" label="转出仓库" width="150px"></el-table-column>
            <el-table-column prop="transferDate" label="出库日期" width="150px"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="200px"></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="100px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="scope.row.statusName === '草稿'" circle @click="editTransferDetail(scope.row)"></el-button>
                <el-button size="mini" type="success" icon="el-icon-document" v-if="scope.row.statusName === '已审批'" circle @click="lookTransferDetail(scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="scope.row.statusName === '草稿'" @click="deleteTransferDetail(scope.row)" circle ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="transferTableDataCurrentPageChange"
              :current-page="transferTableDataCurrentPage"
              :page-size="transferTableDataPagesize"
              :total="transferTableData.length"
              layout="total, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!--库存盘点主页面-->
      <el-tab-pane label="库存盘点" name="库存盘点">
        <div style="height: 650px">
          <block><el-button type="success" id="create-list" @click="toCreateInventoryCheck">新建库存盘点单</el-button></block>
          <block>
            <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">库存盘点单列表</el-tag></div>
            <el-input placeholder="请输入搜索信息" v-model="inventoryCheckSearchInfo" class="search-input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </block>
          <el-table :data="inventoryCheckDataCom.slice((inventoryCheckCurrentPage - 1) * inventoryCheckPagesize,inventoryCheckCurrentPage * inventoryCheckPagesize)" style="width: 100%">
            <el-table-column fixed prop="checkId" label="序号" width="50px"></el-table-column>
            <el-table-column prop="checkCode" label="盘点单号" width="150px"></el-table-column>
            <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
            <el-table-column prop="storageName" label="仓库" width="150px"></el-table-column>
            <el-table-column prop="date" label="盘点日期" width="150px"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="150px"></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="100px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="scope.row.statusName === '草稿'" circle></el-button>
                <el-button size="mini" type="success" icon="el-icon-document" v-if="scope.row.statusName === '已审批'" circle @click="inventoryCheckDetailsVisible = true"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="scope.row.statusName === '草稿'" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="inventoryCheckDataCurrentPageChange"
              :current-page="inventoryCheckCurrentPage"
              :page-size="inventoryCheckPagesize"
              :total="inventoryCheckDataCom.length"
              layout="total, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!--期初库存主页面-->
      <el-tab-pane label="期初库存" name="期初库存">
        <div style="height: 650px">
          <block><el-button type="success" id="create-list" @click="toCreateInitialInventory">新建期初库存</el-button></block>
          <block>
            <div class="tag-area"><el-tag type="primary" effect="plain" id="tag">期初库存单列表</el-tag></div>
            <el-input placeholder="请输入搜索信息" v-model="initSearchInfo" class="search-input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </block>
          <el-table :data="initialInventoryDataCom.slice((initialInventoryCurrentPage-1)*initialInventoryPagesize, initialInventoryCurrentPage*initialInventoryPagesize)" style="width: 100%">
            <el-table-column fixed prop="beginningStorageId" label="序号" width="50px"></el-table-column>
            <el-table-column prop="beginningStorageCode" label="单据编号" width="150px"></el-table-column>
            <el-table-column prop="inventoryOrganizationName" label="库存组织" width="300px"></el-table-column>
            <el-table-column prop="storageName" label="仓库" width="150px"></el-table-column>
            <el-table-column prop="beginningStorageDate" label="盘点日期" width="150px"></el-table-column>
            <el-table-column prop="statusName" label="状态" width="150px"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" width="150px"></el-table-column>
            <el-table-column prop="createDate" label="创建时间" width="300px"></el-table-column>
            <el-table-column fixed="right" prop="" label="操作" width="100px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" v-if="scope.row.statusName === '草稿'" @click="editInit(scope)" circle></el-button>
                <el-button size="mini" type="success" icon="el-icon-document" v-if="scope.row.statusName === '已审批'" circle @click="checkInitDetail(scope)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="scope.row.statusName === '草稿'" @click="deleteInitInv(scope)" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="initialInventoryPageChange"
              :current-page="initialInventoryCurrentPage"
              :page-size="initialInventoryPagesize"
              :total="initialInventoryData.length"
              layout="total, prev, pager, next, jumper">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!--转库申请单详请弹窗-->
  <el-dialog title="详情" :visible.sync="shiftReqDetailsVisible" width="80%">
    <div class="details">
      <el-table :data="transferReqDialogData.slice((transferReqDialogCurrentPage - 1)*transferReqDialogPagesize,transferReqDialogCurrentPage * transferReqDialogPagesize)" style="width: 100%">
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurement" label="单位" width="150px"></el-table-column>
        <el-table-column prop="requestAmount" label="申请数量" width="150px"></el-table-column>
        <el-table-column prop="nowAmount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="transferReqDialogPageChange"
        :current-page="transferReqDialogCurrentPage"
        :page-size="transferReqDialogPagesize"
        :total="transferReqDialogData.length"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>
  <!--转库单编辑弹框-->
  <el-dialog title="详情" :visible.sync="editDetailsVisible" width="80%">
    <div class="details">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-input style="width: 180px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="转入仓库">
          <el-input style="width: 180px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="转出仓库">
          <el-input style="width: 180px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-input style="width: 180px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" :disabled="true" :rows="3" class="remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="transferEditDialogData" style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="50px"></el-table-column>
        <el-table-column prop="" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="" label="规格" width="150px"></el-table-column>
        <el-table-column prop="" label="型号" width="150px"></el-table-column>
        <el-table-column prop="" label="单位" width="150px"></el-table-column>
        <el-table-column prop="" label="申请数量" width="150px"></el-table-column>
        <el-table-column prop="" label="实发数量" width="150px"></el-table-column>
        <el-table-column prop="" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="" label="转库申请单号" width="150px"></el-table-column>
        <el-table-column prop="" label="备注" width="150px"></el-table-column>
        <el-table-column prop="" label="备注" width="50px" fixed="right" >
          <el-button size="mini" type="primary" icon="el-icon-edit" circle ></el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="transferEditDialogPageChange"
        :current-page="transferEditDialogCurrentPage"
        :page-size="transferEditDialogPagesize"
        :total="transferEditDialogData.length"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <div class="edit-button-box">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提交</el-button>
      <el-button type="danger">取消</el-button>
    </div>
  </el-dialog>
  <!--转库单编辑弹窗-->
  <el-dialog title="详情" :visible.sync="shiftDetailsVisible" width="80%">
    <div class="details">
      <el-form :inline="true" ref="form" :model="transferForm" label-width="80px">
        <el-form-item label="库存组织">
          <el-input v-model="transferForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="转入仓库">
          <el-input v-model="transferForm.storageInName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="转出仓库">
          <el-input v-model="transferForm.storageOutName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-input v-model="transferForm.transferDate" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="transferDetailDialogData" style="width: 100%">
        <el-table-column fixed prop="transferDetailId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="requestAmount" label="申请数量" width="150px"></el-table-column>
        <el-table-column prop="realAmount" label="实发数量" width="150px">
          <template v-slot="slotProps">
            <el-input-number size="mini" v-model="slotProps.row.realAmount" width="90px" controls-position="right" :min="1" ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="nowAmount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="transferCode" label="转库申请单号" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="transferDetailDialogPageChange"
        :current-page="transferDetailDialogCurrentPage"
        :page-size="transferDetailDialogPagesize"
        :total="transferDetailDialogData.length"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
      <div class="edit-button-box">
        <el-button type="primary" @click="saveTransferDialog">保存</el-button>
        <el-button type="primary" @click="submitTransferDetailDialog">提交</el-button>
      </div>
    </div>
  </el-dialog>
  <!--转库单详情弹窗-->
  <el-dialog title="详情" :visible.sync="lookDetailsVisible" width="80%">
    <div class="details">
      <el-form :inline="true" ref="form" :model="transferForm" label-width="80px">
        <el-form-item label="库存组织">
          <el-input v-model="transferForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="转入仓库">
          <el-input v-model="transferForm.storageInName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="转出仓库">
          <el-input v-model="transferForm.storageOutName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="申请日期">
          <el-input v-model="transferForm.transferDate" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="transferDetailDialogData" style="width: 100%">
        <el-table-column fixed prop="transferDetailId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="requestAmount" label="申请数量" width="150px"></el-table-column>
        <el-table-column prop="realAmount" label="实发数量" width="150px"></el-table-column>
        <el-table-column prop="nowAmount" label="现存量" width="150px"></el-table-column>
        <el-table-column prop="transferCode" label="转库申请单号" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="transferDetailDialogPageChange"
        :current-page="transferDetailDialogCurrentPage"
        :page-size="transferDetailDialogPagesize"
        :total="transferDetailDialogData.length"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>
  <!--盘点单详情弹窗-->
  <el-dialog title="详情" :visible.sync="inventoryCheckDetailsVisible" width="80%">
    <div class="details">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="库存组织">
          <el-input :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="盘点仓库">
          <el-input :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="盘点日期">
          <el-input :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="textarea" :rows="3" class="remark" placeholder="备注" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="checkDetailDialogData" style="width: 100%">
        <el-table-column fixed prop="" label="序号" width="50px"></el-table-column>
        <el-table-column prop="" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="" label="规格" width="150px"></el-table-column>
        <el-table-column prop="" label="型号" width="150px"></el-table-column>
        <el-table-column prop="" label="单位" width="150px"></el-table-column>
        <el-table-column prop="" label="帐面数量" width="150px"></el-table-column>
        <el-table-column prop="" label="盘点数量" width="150px"></el-table-column>
        <el-table-column prop="" label="单价" width="150px"></el-table-column>
        <el-table-column prop="" label="金额" width="150px"></el-table-column>
        <el-table-column prop="" label="备注" width="150px"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="checkDetailDialogPageChange"
        :current-page="checkDetailDialogCurrentPage"
        :page-size="checkDetailDialogPagesize"
        :total="checkDetailDialogData.length"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>
  <!--期初库存详情弹框-->
  <el-dialog title="详情" :visible.sync="initialDetailsVisible" width="80%">
    <div class="details">
      <el-form :inline="true" ref="form" :model="initForm" label-width="80px">
        <el-form-item label="库存组织">
          <el-input v-model="initForm.inventoryOrganizationName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="仓库">
          <el-input v-model="initForm.storageName" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="录入日期">
          <el-input v-model="initForm.beginningStorageDate" :disabled="true" style="width: 180px"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="initialDetailDialogData.slice((initialDetailDialogCurrentPage-1)*initialDetailDialogPagesize, initialDetailDialogCurrentPage*initialDetailDialogPagesize)" style="width: 100%">
        <el-table-column fixed prop="beginningStorageId" label="序号" width="50px"></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="150px"></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="150px"></el-table-column>
        <el-table-column prop="specification" label="规格" width="150px"></el-table-column>
        <el-table-column prop="modelType" label="型号" width="150px"></el-table-column>
        <el-table-column prop="measurementName" label="单位" width="150px"></el-table-column>
        <el-table-column prop="inAmount" label="入库数量" width="150px"></el-table-column>
        <el-table-column prop="inPrice" label="入库单价" width="150px"></el-table-column>
        <el-table-column prop="inMoney" label="入库金额" width="150px"></el-table-column>
        <el-table-column prop="beginningStorageDetailDate" label="入库时间" width="150px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150px"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="initialDetailDialogPageChange"
        :current-page="initialDetailDialogCurrentPage"
        :page-size="initialDetailDialogPagesize"
        :total="initialDetailDialogData.length"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </el-dialog>
</div>
</template>

<script>
import NavgationBar from '../../../components/NavgationBar'
import Block from '../../../components/Block'
import Card from '../../../components/Card'
import store from '../../../store/store'
import {
  createNewTransfer,
  findAllTransferReq,
  detailByTransferId,
  deleteTransferRequestById,
  findAllTransfer,
  findTransferByCode,
  saveTransferDetailDialog,
  submitTransferDetailDialog,
  deleteTransferDetailDialog, findAllCheck, createNewCheck
} from '../../../api/NormalUser/CenterWarehouse'
import {getAllInit, deleteInit, queryInitDetail} from '../../../api/NormalUser/MainWarehouse'

export default {
  beforeMount () {
    let _this = this
    // 获取库存盘点
    const checkResponse = findAllCheck()
    checkResponse.then(function (e) {
      _this.inventoryCheckData = e.data.data
    })
    // 获取转库申请单
    const response = findAllTransferReq()
    response.then(function (e) {
      _this.transferReqTableData = e.data.data
    })
    // 获取转库单
    const res = findAllTransfer()
    res.then(function (e) {
      _this.transferTableData = e.data.data
    })
    // 期初库存
    const allInit = getAllInit()
    allInit.then(function (e) {
      try {
        console.log(e.data.data)
        _this.initialInventoryData = e.data.data
      } catch (e) {
        console.log('获取数据失败')
      }
    })
    store.dispatch('changeInitState', 0)
  },
  name: 'InventoryAdjustment',
  components: {
    NavgationBar,
    Block,
    Card
  },
  data () {
    return {
      lookDetailsVisible: false,
      transferForm: [],
      searchInfo: '',
      editDetailsVisible: false,
      shiftReqDetailsVisible: false,
      shiftDetailsVisible: false,
      inventoryCheckDetailsVisible: false,
      initialDetailsVisible: false,
      transferDetailVisiable: false,
      tableData: [
        {}
      ],
      transferReqTableDataPagesize: 7,
      transferReqTableDataCurrentPage: 1,
      transferReqTableData: [],
      transferTableDataCurrentPage: 1,
      transferTableDataPagesize: 7,
      transferTableData: [],
      transferTableSearchInfo: '',
      inventoryCheckSearchInfo: '',
      inventoryCheckData: [],
      inventoryCheckCurrentPage: 1,
      inventoryCheckPagesize: 7,
      initialInventoryData: [],
      initialInventoryPagesize: 7,
      initialInventoryCurrentPage: 1,
      transferReqDialogData: [],
      transferReqDialogCurrentPage: 1,
      transferReqDialogPagesize: 6,
      transferEditDialogData: [],
      transferEditDialogPagesize: 6,
      transferEditDialogCurrentPage: 1,
      transferDetailDialogData: [],
      transferDetailDialogPagesize: 6,
      transferDetailDialogCurrentPage: 1,
      checkDetailDialogPagesize: 6,
      checkDetailDialogData: [],
      checkDetailDialogCurrentPage: 1,
      initialDetailDialogData: [],
      initialDetailDialogCurrentPage: 1,
      initialDetailDialogPagesize: 6,
      // 期初库存
      initSearchInfo: '',
      initForm: {
        inventoryOrganizationName: '',
        storageName: '',
        beginningStorageDate: ''
      }
    }
  },
  computed: {
    inventoryCheckDataCom () {
      const search = this.inventoryCheckSearchInfo
      if (search) {
        return this.inventoryCheckData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.inventoryCheckData
    },
    transferTableDataCom () {
      const search = this.transferTableSearchInfo
      if (search) {
        return this.transferTableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.transferTableData
    },
    transferReqTableDataCom () {
      const search = this.searchInfo
      if (search) {
        return this.transferReqTableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.transferReqTableData
    },
    initialInventoryDataCom () {
      const search = this.initSearchInfo
      if (search) {
        return this.initialInventoryData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.initialInventoryData
    },
    IASelection () {
      return store.state.IASelection
    }
  },
  methods: {
    // 删除转库单
    deleteTransferDetail (row) {
      let _this = this
      const response = deleteTransferDetailDialog({transferId: row.transferId})
      let temp = _this.transferDetailDialogData
      response.then(function (e) {
        if (e.data.code === 0) {
          for (let i = 0; i < temp.length; i++) {
            if (row.transferId === temp[i].transferId) {
              continue
            }
            _this.transferDetailDialogData[i] = temp[i]
          }
        }
      })
    },
    // 查看转库单详情
    lookTransferDetail (row) {
      for (let i = 0; i < this.transferTableData.length; i++) {
        if (row.transferCode === this.transferTableData[i].transferCode) {
          this.transferForm = this.transferTableData[i]
          break
        }
      }
      let _this = this
      console.log(row)
      const response = findTransferByCode({transferCode: row.transferCode})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.transferDetailDialogData = e.data.data
          _this.lookDetailsVisible = true
        }
      })
    },
    // 提交转库单弹框
    submitTransferDetailDialog () {
      let _this = this
      const response = submitTransferDetailDialog(this.transferDetailDialogData)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.shiftDetailsVisible = false
        }
      })
    },
    // 保存转库单弹框
    saveTransferDialog () {
      let _this = this
      const response = saveTransferDetailDialog(this.transferDetailDialogData)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.shiftDetailsVisible = false
        }
      })
    },
    // 编辑转库单
    editTransferDetail (row) {
      for (let i = 0; i < this.transferTableData.length; i++) {
        if (row.transferCode === this.transferTableData[i].transferCode) {
          this.transferForm = this.transferTableData[i]
          break
        }
      }
      let _this = this
      console.log(row)
      const response = findTransferByCode({transferCode: row.transferCode})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.transferDetailDialogData = e.data.data
          _this.shiftDetailsVisible = true
        }
      })
    },
    // 新建转库申请
    toCreateCreateShiftReq () {
      this.$store.dispatch('setInventoryTransferState', 0)
      let _this = this
      console.log(store.state.userInfo)
      const response = createNewTransfer({creatorName: store.state.userInfo.username, userId: store.state.userInfo.id})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$router.push('/CreateShiftReq')
          _this.$store.dispatch('setNewTransferReq', e.data.data)
        }
      })
    },
    toCenterCreateTransfer () {
      this.$router.push('/CenterCreateTransfer')
    },
    toCreateInventoryCheck () {
      let _this = this
      this.$store.dispatch('setInventoryCheckState', 0)
      console.log(store.state.inventoryCheckState)
      const response = createNewCheck()
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.$router.push('/CreateInventoryCheck')
          _this.$store.dispatch('setCurrentInventoryCheck', {checkId: e.data.data})
        }
      })
    },
    toCreateInitialInventory () {
      this.$router.push('/CreateInitialInventory')
    },
    // 页码跳转
    transferReqTableDataCurrentPageChange (value) {
      this.transferReqTableDataCurrentPage = value
    },
    transferTableDataCurrentPageChange (value) {
      this.transferTableDataCurrentPage = value
    },
    inventoryCheckDataCurrentPageChange (value) {
      this.inventoryCheckCurrentPage = value
    },
    initialInventoryPageChange (value) {
      this.initialInventoryCurrentPage = value
    },
    transferReqDialogPageChange (value) {
      this.transferReqDialogCurrentPage = value
    },
    transferEditDialogPageChange (value) {
      this.transferEditDialogCurrentPage = value
    },
    transferDetailDialogPageChange (value) {
      this.transferDetailDialogCurrentPage = value
    },
    initialDetailDialogPageChange (value) {
      this.initialDetailDialogCurrentPage = value
    },
    checkDetailDialogPageChange (value) {
      this.checkDetailDialogCurrentPage = value
    },
    editTransferReq (row) {
      this.$store.dispatch('setInventoryTransferState', 1)
      this.$store.dispatch('setNewTransferReq', row)
      this.$router.push('/CenterCreateShiftReq')
    },
    transferRequestDetail (row) {
      this.shiftReqDetailsVisible = true
      let _this = this
      const response = detailByTransferId({transferRequestId: row.transferRequestId})
      response.then(function (e) {
        _this.transferReqDialogData = e.data.data
      })
    },
    // 删除转库申请单
    deleteTransferReqById (row) {
      let _this = this
      const response = deleteTransferRequestById({transferRequestId: row.transferRequestId})
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.transferReqTableData = e.data.data
        }
      })
    },
    /* 期初库存 */
    // 删除一条期初库存
    deleteInitInv (scope) {
      let _this = this
      let parameter = {beginningStorageId: scope.row.beginningStorageId}
      const response = deleteInit(parameter)
      response.then(function (e) {
        if (e.data.code === 0) {
          _this.initialInventoryData.splice(scope.$index, 1)
          _this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 查询期初库存明细
    checkInitDetail (scope) {
      let _this = this
      this.initForm.inventoryOrganizationName = scope.row.inventoryOrganizationName
      this.initForm.storageName = scope.row.storageName
      this.initForm.beginningStorageDate = scope.row.beginningStorageDate
      let parameter = {beginningStorageId: scope.row.beginningStorageId}
      const response = queryInitDetail(parameter)
      response.then(function (e) {
        _this.initialDetailDialogData = e.data.data
        _this.initialDetailsVisible = true
      })
    },
    // 编辑期初库存
    editInit (scope) {
      store.dispatch('changeInitState', 1)
      let _this = this
      let editForm = {
        inventoryOrganizationName: '',
        storageName: '',
        beginningStorageDate: '',
        beginningStorageCode: ''
      }
      editForm.inventoryOrganizationName = scope.row.inventoryOrganizationName
      editForm.storageName = scope.row.storageName
      editForm.beginningStorageDate = scope.row.beginningStorageDate
      editForm.beginningStorageCode = scope.row.beginningStorageCode
      store.dispatch('changeInitMain', editForm)
      let parameter = {beginningStorageId: scope.row.beginningStorageId}
      const response = queryInitDetail(parameter)
      response.then(function (e) {
        store.dispatch('changeInitDetail', e.data.data)
        if (store.state.initDetail !== null) {
          _this.$router.push('/CreateInitialInventory')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#tabs
  width 1250px
  margin-left 100px
#create-list
  margin-top 10px
.search-input
  width 300px
  height 40px
  float right
#tag-area
  width 200px
  float left
.details
  height 600px
.remark
  width 1073px
  position relative
  left 10px
.edit-button-box
  position relative
  left 900px
</style>
