sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.app.employeedetails.controller.Details", {
        onInit: function() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onEmployeeDetailsLoad, this); 
        },
        onEmployeeDetailsLoad: function(oEvent ){
            const {empId} = oEvent.getParameter("arguments");
            const sRouterName = oEvent.getParameter("name");
            const oForm = this.getView().byId("idEmployeeDetailsForm");

            oForm.bindElement(`/Employee(${empId})`, {
                expand: 'salary,address'
            });
            debugger;
        }
      });
    }
  );