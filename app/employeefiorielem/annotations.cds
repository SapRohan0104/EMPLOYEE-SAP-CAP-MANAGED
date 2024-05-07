using EmployeeService as service from '../../srv/employee-service';

annotate service.Employee with @(UI: {
    SelectionFields: [
        email,
        phone
    ],
    LineItem       : [
        {
            $Type: 'UI.DataField',
            Value: fName
        },
        {
            $Type: 'UI.DataField',
            Value: lName
        },
        {
            $Type: 'UI.DataField',
            Value: email
        },
        {
            $Type: 'UI.DataField',
            Value: phone
        },
        {
            $Type: 'UI.DataField',
            Value: gender
        },
        {
            $Type: 'UI.DataField',
            Value: DOB
        },
        {
            $Type: 'UI.DataField',
            Value: age
        },
        {
            $Type: 'UI.DataField',
            Value: contractStarted
        },
    ]
});
