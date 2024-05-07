sap.ui.define(["./BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,o,i,a){"use strict";return e.extend("com.app.employeedetails.controller.Home",{onInit:function(){const e=new i({fName:"",lName:"",gender:"",DOB:"",contractStarted:"",email:"",phone:""});this.getView().setModel(e,"localModel");this.getRouter().attachRoutePatternMatched(this.onEmployeeListLoad,this)},onEmployeeListLoad:function(){this.getView().byId("idEmployeeTable").getBinding("items").refresh()},onGoPress:function(){const e=this.getView(),i=e.byId("idFNameFilterValue"),a=i.getValue(),l=e.byId("idEmployeeTable"),n=[];a?n.push(new t("fName",o.EQ,a)):"";l.getBinding("items").filter(n)},onSelectEmployee:function(e){const{ID:t,fName:o}=e.getSource().getSelectedItem().getBindingContext().getObject();const i=this.getRouter();i.navTo("RouteDetails",{empId:t,empName:o})},onCreateBtnPress:async function(){if(!this.oCreateEmployeeDialog){this.oCreateEmployeeDialog=await this.loadFragment("CreateEmployeeDialog")}this.oCreateEmployeeDialog.open()},onCloseDialog:function(){if(this.oCreateEmployeeDialog.isOpen()){this.oCreateEmployeeDialog.close()}},onCreateEmployee:async function(){const e=this.getView().getModel("localModel").getProperty("/"),t=this.getView().getModel("ModelV2");try{await this.createData(t,e,"/Employee");this.getView().byId("idEmployeeTable").getBinding("items").refresh();this.oCreateEmployeeDialog.close()}catch(e){this.oCreateEmployeeDialog.close();a.error("Some technical Issue")}}})});