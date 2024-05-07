//@ui5-bundle com/app/employeedetails/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/app/employeedetails/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/app/employeedetails/model/models"],function(e,t,i){"use strict";return e.extend("com.app.employeedetails.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/app/employeedetails/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("com.app.employeedetails.controller.App",{onInit:function(){}})});
},
	"com/app/employeedetails/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment"],function(e,t){"use strict";return e.extend("com.app.employeedetails.controller.BaseController",{getRouter:function(){return this.getOwnerComponent().getRouter()},loadFragment:async function(e){const n=await t.load({id:this.getView().getId(),name:`com.app.employeedetails.fragments.${e}`,controller:this});this.getView().addDependent(n);return n},createData:function(e,t,n){return new Promise((r,o)=>{e.create(n,t,{refreshAfterChange:true,success:function(e){r(e)},error:function(e){o(e)}})})},deleteData:function(e,t,n){return new Promise((r,o)=>{e.remove(`${t}/${n}`,{success:function(e){r(e)},error:function(e){o(e)}})})}})});
},
	"com/app/employeedetails/controller/Details.controller.js":function(){sap.ui.define(["./BaseController","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("com.app.employeedetails.controller.Details",{onInit:function(){const e=this.getOwnerComponent().getRouter();e.attachRoutePatternMatched(this.onEmployeeDetailsLoad,this)},onEmployeeDetailsLoad:function(e){const{empId:t}=e.getParameter("arguments");this.ID=t;const o=e.getParameter("name");const a=this.getView().byId("idEmployeeDetailsObjectPage");a.bindElement(`/Employee(${t})`,{expand:"salary,address"})},onDeleteEmployee:async function(){const e=this.getView().getModel("ModelV2");try{await this.deleteData(e,"/Employee",this.ID);this.getRouter().navTo("RouteHome")}catch(e){t.error("Some Technical Issue")}}})});
},
	"com/app/employeedetails/controller/Home.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t,o,i,a){"use strict";return e.extend("com.app.employeedetails.controller.Home",{onInit:function(){const e=new i({fName:"",lName:"",gender:"",DOB:"",contractStarted:"",email:"",phone:""});this.getView().setModel(e,"localModel");this.getRouter().attachRoutePatternMatched(this.onEmployeeListLoad,this)},onEmployeeListLoad:function(){this.getView().byId("idEmployeeTable").getBinding("items").refresh()},onGoPress:function(){const e=this.getView(),i=e.byId("idFNameFilterValue"),a=i.getValue(),l=e.byId("idEmployeeTable"),n=[];a?n.push(new t("fName",o.EQ,a)):"";l.getBinding("items").filter(n)},onSelectEmployee:function(e){const{ID:t,fName:o}=e.getSource().getSelectedItem().getBindingContext().getObject();const i=this.getRouter();i.navTo("RouteDetails",{empId:t,empName:o})},onCreateBtnPress:async function(){if(!this.oCreateEmployeeDialog){this.oCreateEmployeeDialog=await this.loadFragment("CreateEmployeeDialog")}this.oCreateEmployeeDialog.open()},onCloseDialog:function(){if(this.oCreateEmployeeDialog.isOpen()){this.oCreateEmployeeDialog.close()}},onCreateEmployee:async function(){const e=this.getView().getModel("localModel").getProperty("/"),t=this.getView().getModel("ModelV2");try{await this.createData(t,e,"/Employee");this.getView().byId("idEmployeeTable").getBinding("items").refresh();this.oCreateEmployeeDialog.close()}catch(e){this.oCreateEmployeeDialog.close();a.error("Some technical Issue")}}})});
},
	"com/app/employeedetails/fragments/Address.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns="sap.m"\n><Table\n        id="idEmployeeAddressTable"\n        alternateRowColors="true"\n        items="{address}"\n    ><columns><Column id="idCityColumn"><Title\n                    id="idCityColumnHeader"\n                    text="City"\n                /></Column><Column id="idAddressColumn"><Title\n                    id="idAddressColumnHeader"\n                    text="Address"\n                /></Column><Column id="idPincodeColumn"><Title\n                    id="idPincodeColumnHeader"\n                    text="Pincode"\n                /></Column><Column id="idStreetColumn"><Title\n                    id="idStreetColumnHeader"\n                    text="Street"\n                /></Column><Column id="idLandmarkColumn"><Title\n                    id="idLandmarkColumnHeader"\n                    text="Landmark"\n                /></Column></columns><items><ColumnListItem id="idEmployeeAddressColumnList"><Text\n                    id="idCityColumnValue"\n                    text="{city}"\n                /><Text\n                    id="idAddressColumnValue"\n                    text="{address}"\n                /><Text\n                    id="idPinCodeColumnValue"\n                    text="{pincode}"\n                /><Text\n                    id="idStreetColumnValue"\n                    text="{street}"\n                /><Text\n                    id="idLandmarkColumnValue"\n                    text="{landmark}"\n                /></ColumnListItem></items></Table></core:FragmentDefinition>\n',
	"com/app/employeedetails/fragments/CreateEmployeeDialog.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><Dialog\n        id="idCreateEMployeeDialog"\n        resizable="true"\n        draggable="true"\n        contentWidth="30%"\n        title="Create Employee"\n    ><beginButton><Button\n                id="idCreateButton"\n                text="Create"\n                press="onCreateEmployee"\n                type="Success"\n            /></beginButton><endButton><Button\n                id="idCancelButton"\n                text="Cancel"\n                press="onCloseDialog"\n                type="Negative"\n            /></endButton><content><form:SimpleForm\n                id="idEmployeeDetailsForm"\n                editable="true"\n                layout="ResponsiveGridLayout"\n                labelSpanXL="3"\n                labelSpanL="3"\n                labelSpanM="3"\n                labelSpanS="12"\n                adjustLabelSpan="false"\n                emptySpanXL="4"\n                emptySpanL="4"\n                emptySpanM="4"\n                emptySpanS="0"\n                columnsXL="1"\n                columnsL="1"\n                columnsM="1"\n                singleContainerFullSize="false"\n            ><Label\n                    id="idFirstNameLabel"\n                    text="First Name"\n                /><Input\n                    id="idFirstNameInput"\n                    value="{localModel>/fName}"\n                /><Label\n                    id="idLastNameLabel"\n                    text="Last Name"\n                /><Input\n                    id="idLastNameInput"\n                    value="{localModel>/lName}"\n                /><Label\n                    id="idGenderLabel"\n                    text="Gender"\n                /><Input\n                    id="idGenderInput"\n                    value="{localModel>/gender}"\n                /><Label\n                    id="idDOBLabel"\n                    text="DOB"\n                /><Input\n                    id="idDOBInput"\n                    value="{localModel>/DOB}"\n                /><Label\n                    id="idContractStartedLabel"\n                    text="Contract Started"\n                /><Input\n                    id="idContractStartedInput"\n                    value="{localModel>/contractStarted}"\n                /><Label\n                    id="idEmailLabel"\n                    text="Email"\n                /><Input\n                    id="idEmailInput"\n                    value="{localModel>/email}"\n                /><Label\n                    id="idPhoneNumberLabel"\n                    text="Phone Number"\n                /><Input\n                    id="idPhoneNumberInput"\n                    value="{localModel>/phone}"\n                /></form:SimpleForm></content></Dialog></core:FragmentDefinition>\n',
	"com/app/employeedetails/fragments/GeneralInformation.fragment.xml":'<core:FragmentDefinition\n    xmlns:core="sap.ui.core"\n    xmlns:form="sap.ui.layout.form"\n    xmlns="sap.m"\n><form:SimpleForm\n        id="idEmployeeDetailsForm"\n        editable="false"\n        layout="ColumnLayout"\n        columnsM="2"\n        columnsL="3"\n        columnsXL="4"\n    ><Label\n            id="idNameLabel"\n            text="Name"\n        /><Text\n            id="idNameText"\n            text="{fName} {lName}"\n        /><Label\n            id="idEmailLabel"\n            text="Email"\n        /><Text\n            id="idEmailText"\n            text="{email}"\n        /><Label\n            id="idPhoneLabel"\n            text="Phone"\n        /><Text\n            id="idPhoneText"\n            text="{phone}"\n        /></form:SimpleForm></core:FragmentDefinition>\n',
	"com/app/employeedetails/i18n/i18n.properties":'# This is the resource bundle for com.app.employeedetails\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Employee Application\n\n#YDES: Application description\nappDescription=Employee Application\n#XTIT: Main view title\ntitle=Employee Application\n\n#XFLD,60\nflpTitle=Employee Application\n\n#XFLD,60\nflpSubtitle=Employee Application\n\n#XFLD Subtitle\nSubTitle=Details Of the employee\n\n\n\n',
	"com/app/employeedetails/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"com.app.employeedetails","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.13.2","toolsId":"b6352967-d377-4196-b311-62d5b76e00d7"},"dataSources":{"mainService":{"uri":"EmployeeSRV/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}},"mainServiceV2":{"uri":"v2/EmployeeSRV/","type":"OData","settings":{"annotations":[],"odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"EmployeeDetails-display":{"semanticObject":"EmployeeDetails","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.123.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.app.employeedetails.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"ModelV2":{"dataSource":"mainServiceV2","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.app.employeedetails.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteHome","pattern":":?query:","target":["TargetHome"]},{"name":"RouteDetails","pattern":"EmployeeDetails/{empId}/:empName:","target":["TargetDetails"]}],"targets":{"TargetHome":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Home","viewName":"Home"},"TargetDetails":{"viewType":"XML","transition":"slide","viewId":"Details","viewName":"Details"}}},"rootView":{"viewName":"com.app.employeedetails.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"EMPLOYEE-CAP-MANAGED"}}',
	"com/app/employeedetails/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/app/employeedetails/view/App.view.xml":'<mvc:View controllerName="com.app.employeedetails.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/app/employeedetails/view/Details.view.xml":'<mvc:View\n    xmlns:form="sap.ui.layout.form"\n    xmlns:uxap="sap.uxap"\n    controllerName="com.app.employeedetails.controller.Details"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns:core="sap.ui.core"\n    displayBlock="true"\n    xmlns="sap.m"\n><uxap:ObjectPageLayout\n        id="idEmployeeDetailsObjectPage"\n        upperCaseAnchorBar="true"\n    ><uxap:headerTitle><uxap:ObjectPageDynamicHeaderTitle id="idObjectPageDynamicTitle"><uxap:expandedHeading><Title\n                        id="idEmployeeDetailsTitle"\n                        text="{fName} {lName}"\n                    /></uxap:expandedHeading><uxap:actions><Button\n                        id="idBtnDelete"\n                        icon="sap-icon://delete"\n                        tooltip="Delete Employee"\n                        type="Negative"\n                        press="onDeleteEmployee"\n                    /></uxap:actions></uxap:ObjectPageDynamicHeaderTitle></uxap:headerTitle><uxap:sections><uxap:ObjectPageSection\n                titleUppercase="true"\n                id="generalInfo"\n                title="General Information"\n            ><uxap:subSections><uxap:ObjectPageSubSection id="idGeneralInfoSubSection"><uxap:blocks><core:Fragment\n                                type="XML"\n                                fragmentName="com.app.employeedetails.fragments.GeneralInformation"\n                            /></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection><uxap:ObjectPageSection\n                id="idAddressSection"\n                title="Address Details"\n                titleUppercase="true"\n            ><uxap:subSections><uxap:ObjectPageSubSection id="idAddressSubSection"><uxap:blocks><core:Fragment\n                                type="XML"\n                                fragmentName="com.app.employeedetails.fragments.Address"\n                            /></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection></uxap:sections></uxap:ObjectPageLayout></mvc:View>\n',
	"com/app/employeedetails/view/Home.view.xml":'<mvc:View\n    xmlns:layout="sap.ui.layout"\n    xmlns:f="sap.f"\n    controllerName="com.app.employeedetails.controller.Home"\n    xmlns:mvc="sap.ui.core.mvc"\n    displayBlock="true"\n    xmlns="sap.m"\n><f:DynamicPage\n        id="idEmployeeListPage"\n        headerExpanded="true"\n    ><f:title><f:DynamicPageTitle id="idEmployeeListPageTitle"><f:heading><Title\n                        id="idEmployeePageHeadingTitle"\n                        text="{i18n>title}"\n                    /></f:heading><f:expandedContent><Label\n                        id="idEmployeeListPageECL"\n                        text="{i18n>SubTitle}"\n                    /></f:expandedContent><f:snappedContent><Label\n                        id="idEmployeeListPageESL"\n                        text="{i18n>SubTitle}"\n                    /></f:snappedContent><f:snappedTitleOnMobile><Title\n                        id="idEmployeeListPageEST"\n                        text="{i18n>SubTitle}"\n                    /></f:snappedTitleOnMobile><f:navigationActions><Button\n                        id="idBtnFullScreen"\n                        icon="sap-icon://full-screen"\n                        type="Transparent"\n                    /><Button\n                        id="idBtnDecline"\n                        icon="sap-icon://decline"\n                        type="Transparent"\n                    /></f:navigationActions></f:DynamicPageTitle></f:title><f:header><f:DynamicPageHeader\n                id="idDynamicPageHeader"\n                pinnable="true"\n            ><HBox id="idFilterHLayout" alignContent="SpaceAround" width="100vw"><VBox id="idEmailFilter" class="sapUiSmallMarginEnd"><Label\n                            id="idEmailFilterLabel"\n                            text="Email:"\n                        /><Input\n                            id="idEmailFilterValue"\n                            value=""\n                        /></VBox><VBox id="idFNameFilter" class="sapUiSmallMarginEnd"><Label\n                            id="idFNameFilterLabel"\n                            text="First Name:"\n                        /><Input\n                            id="idFNameFilterValue"\n                            value=""\n                        /></VBox><VBox id="idLNameFilter" class="sapUiSmallMarginEnd"><Label\n                            id="idLNameFilterLabel"\n                            text="Last Name:"\n                        /><Input\n                            id="idLNameFilterValue"\n                            value=""\n                        /></VBox><VBox id="iPhoneFilter" class="sapUiSmallMarginEnd"><Label\n                            id="iPhoneFilterLabel"\n                            text="Phone:"\n                        /><Input\n                            id="iPhoneFilterValue"\n                            value=""\n                        /></VBox><VBox id="idGoButton" class="sapUiSmallMarginEnd"><Label\n                            id="idGoButtonLabel"\n                            text=""\n                        /><Button\n                            id="idGoButtonValue"\n                            text="Go"\n                            type="Emphasized"\n                            press="onGoPress"\n                        /></VBox><VBox id="idClearFilterButton" class="sapUiSmallMarginEnd"><Label\n                            id="idClearFilterButtonLabel"\n                            text=""\n                        /><Button\n                            id="idClearFilterButtonValue"\n                            text="Clear Filter"\n                            type="Emphasized"\n                            press="onClearFilterPress"\n                        /></VBox></HBox></f:DynamicPageHeader></f:header><f:content><Table\n                id="idEmployeeTable"\n                mode="SingleSelectMaster"\n                alternateRowColors="true"\n                items="{/Employee}"\n                selectionChange="onSelectEmployee"\n            ><headerToolbar><OverflowToolbar id="idEmployeeTableHeader"><Title\n                            id="idTableHeaderTitle"\n                            text="Employees"\n                        /><ToolbarSpacer id="idTableHeaderSpacer" /><Button\n                            id="idBtnCreate"\n                            icon="sap-icon://add"\n                            tooltip="Create Employee"\n                            type="Success"\n                            press="onCreateBtnPress"\n                        /></OverflowToolbar></headerToolbar><columns><Column id="idNameCol"><Title\n                            id="idNameColTitle"\n                            text="Name"\n                        /></Column><Column id="idGenderCol"><Title\n                            id="idGenderColTitle"\n                            text="Gender"\n                        /></Column><Column id="idDOBCol"><Title\n                            id="idDOBColTitle"\n                            text="Date Of Birth"\n                        /></Column><Column id="idEmailCol"><Title\n                            id="idEmailColTitle"\n                            text="Email"\n                        /></Column><Column id="idPhoneCol"><Title\n                            id="idPhoneColTitle"\n                            text="Phone Number"\n                        /></Column></columns><items><ColumnListItem id="idEmployeeTableColListItem" type="Navigation"><cells><Text\n                                id="idNameColValue"\n                                text="{fName} {lName}"\n                            /><Text\n                                id="idGenderColValue"\n                                text="{gender}"\n                            /><Text\n                                id="idDOBColValue"\n                                text="{DOB}"\n                            /><Text\n                                id="idEmailColValue"\n                                text="{email}"\n                            /><Text\n                                id="idPhoneColValue"\n                                text="{phone}"\n                            /></cells></ColumnListItem></items></Table></f:content></f:DynamicPage></mvc:View>\n'
}});
