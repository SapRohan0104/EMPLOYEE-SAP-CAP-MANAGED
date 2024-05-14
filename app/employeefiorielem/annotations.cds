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
    ],

    FieldGroup #generalInformation : {
        $Type : 'UI.FieldGroupType',
        Data: [
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
                Value: fName
            },
            {
                $Type: 'UI.DataField',
                Value: lName
            },
        ]
    },
});

annotate service.Department with @(
    UI.FieldGroup #department:{
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                $Type: 'UI.DataField',
                Value: name
            },
            {
                $Type: 'UI.DataField',
                Value: description
            }
        ]
    }
);

annotate service.Salary with @(
    UI.FieldGroup #salary: {
        $Type: 'UI.FieldGroupType',
        Data: [
            {
                $Type: 'UI.DataField',
                Value : costToCompany,
            },
            {
                $Type: 'UI.DataField',
                Value: nps
            },
            {
                $Type: 'UI.DataField',
                Value : employeePf,
            },
            {
                $Type: 'UI.DataField',
                Value : employerPf,
            },
            {
                $Type: 'UI.DataField',
                Value : vpf,
            },

        ]
    }
);

annotate service.Address with @(
    UI.LineItem #addressTable: [
        {
            $Type: 'UI.DataField',
            Value: city
        },
        {
            $Type: 'UI.DataField',
            Value: address
        },
        {
            $Type: 'UI.DataField',
            Value: pincode
        },
        {
            $Type: 'UI.DataField',
            Value: street
        }

    ]
);



annotate service.Employee with @(
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'GeneralInformationFacet',
            Label: 'General Information',
            Target: '@UI.FieldGroup#generalInformation'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'DepartmentInformationFacet',
            Label: 'Department',
            Target: 'department/@UI.FieldGroup#department'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'SalaryInformationFacet',
            Label: 'Salary',
            Target: 'salary/@UI.FieldGroup#salary'
        },
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'AddressInformationFacet',
            Label: 'Address',
            Target: 'address/@UI.LineItem#addressTable'
        }

    ]
);

