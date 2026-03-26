using TaskService as service from '../../srv/task-service';

annotate service.Tasks with {
    description @UI.MultiLineText;

    status @(
        Common.Label: 'Status',
        Common.ValueList: {
            CollectionPath: 'StatusValues',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterOut',
                    LocalDataProperty: status,
                    ValueListProperty: 'code'
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'name'
                }
            ]
        }
    );

    priority @(
        Common.Label: 'Prioridade',
        Common.ValueList: {
            CollectionPath: 'PriorityValues',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterOut',
                    LocalDataProperty: priority,
                    ValueListProperty: 'code'
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'name'
                }
            ]
        }
    );
};

annotate service.Tasks with @(
    Capabilities.InsertRestrictions: {
        Insertable: true
    },

    Capabilities.DeleteRestrictions: {
        Deletable: true
    },

    UI.HeaderInfo: {
        TypeName      : 'Tarefa',
        TypeNamePlural: 'Tarefas',
        Title         : { Value: title },
        Description   : { Value: responsible }
    },

    UI.SelectionFields: [
        status,
        priority,
        responsible
    ],

    UI.LineItem: [
        {
            $Type: 'UI.DataField',
            Value: title
        },
        {
            $Type      : 'UI.DataField',
            Value      : status,
            Criticality: criticality_status
        },
        {
            $Type      : 'UI.DataField',
            Value      : priority,
            Criticality: criticality_priority
        },
        {
            $Type: 'UI.DataField',
            Value: responsible
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt
        }
    ],

    UI.HeaderFacets: [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'HeaderSummary',
            Label : 'Resumo da Tarefa',
            Target: '@UI.FieldGroup#HeaderSummary'
        }
    ],

    UI.FieldGroup #HeaderSummary: {
        $Type: 'UI.FieldGroupType',
        Data : [
            { $Type: 'UI.DataField', Value: title },
            {
                $Type      : 'UI.DataField',
                Value      : status,
                Criticality: criticality_status
            },
            {
                $Type      : 'UI.DataField',
                Value      : priority,
                Criticality: criticality_priority
            },
            { $Type: 'UI.DataField', Value: responsible }
        ]
    },

    UI.Facets: [
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'OverviewSection',
            Label : 'Visão Geral',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'FacetDescription',
                    Label : 'Descrição',
                    Target: '@UI.FieldGroup#Description'
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'FacetStatus',
                    Label : 'Status e Prioridade',
                    Target: '@UI.FieldGroup#Execution'
                }
            ]
        },
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'OwnershipSection',
            Label : 'Responsável',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'FacetOwner',
                    Label : 'Responsabilidade',
                    Target: '@UI.FieldGroup#Owner'
                }
            ]
        },
        {
            $Type : 'UI.CollectionFacet',
            ID    : 'SystemSection',
            Label : 'Informações do Sistema',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'FacetMetadata',
                    Label : 'Metadados',
                    Target: '@UI.FieldGroup#Metadata'
                }
            ]
        }
    ],

    UI.FieldGroup #Description: {
        $Type: 'UI.FieldGroupType',
        Data : [
            { $Type: 'UI.DataField', Value: title },
            { $Type: 'UI.DataField', Value: description }
        ]
    },

    UI.FieldGroup #Execution: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type      : 'UI.DataField',
                Value      : status,
                Criticality: criticality_status
            },
            {
                $Type      : 'UI.DataField',
                Value      : priority,
                Criticality: criticality_priority
            }
        ]
    },

    UI.FieldGroup #Owner: {
        $Type: 'UI.FieldGroupType',
        Data : [
            { $Type: 'UI.DataField', Value: responsible }
        ]
    },

    UI.FieldGroup #Metadata: {
        $Type: 'UI.FieldGroupType',
        Data : [
            { $Type: 'UI.DataField', Value: ID },
            { $Type: 'UI.DataField', Value: createdAt }
        ]
    },

    UI.Identification: [
        { $Type: 'UI.DataField', Value: title },
        { $Type: 'UI.DataField', Value: description },
        {
            $Type      : 'UI.DataField',
            Value      : status,
            Criticality: criticality_status
        },
        {
            $Type      : 'UI.DataField',
            Value      : priority,
            Criticality: criticality_priority
        },
        { $Type: 'UI.DataField', Value: responsible },
        { $Type: 'UI.DataField', Value: createdAt }
    ]
);