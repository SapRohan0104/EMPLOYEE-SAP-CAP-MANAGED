using {EmployeeService} from './employee-service';


annotate EmployeeService.Employee with {
    fName  @title: '{i18n>FName}';
    lName  @title: '{i18n>LName}';
    DOB    @title: '{i18n>DOB}';
    email  @title: '{i18n>Email}';
    gender @title: '{i18n>Gender}';
    phone  @title: '{i18n>phone}';
};

annotate EmployeeService.Salary with {
    costToCompany @title : 'Cost To Company';
    employeePf @title : 'Employee PF';
    employerPf @title : 'Employer PF';
    nps @title : 'NPS';
    vpf @title : 'VPF';

};



// annotate EmployeeService.Employee with @restrict: [{
//         grant: '*',
//         to   : 'Admin'
//     }];
