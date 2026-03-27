using { cuid, managed } from '@sap/cds/common';

namespace taskflow;

entity Tasks : cuid, managed {
    title                : String(100)  @title: 'Título';
    description          : String(500)  @title: 'Descrição';
    status               : String(20)   @title: 'Status';
    priority             : String(20)   @title: 'Prioridade';
    responsible          : String(100)  @title: 'Responsável';
    criticality_status   : Integer      @Core.Computed: true;
    criticality_priority : Integer      @Core.Computed: true;
}

entity StatusValues {
    key code : String(20);
        name : String(50);
}

entity PriorityValues {
    key code : String(20);
        name : String(50);
}