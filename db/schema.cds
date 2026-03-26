namespace taskflow;

entity Tasks {
    key ID                   : UUID;
        title                : String(100)  @title: 'Título'       @mandatory;
        description          : String(500)  @title: 'Descrição'    @mandatory;
        status               : String(20)   @title: 'Status'       @mandatory;
        priority             : String(20)   @title: 'Prioridade'   @mandatory;
        responsible          : String(100)  @title: 'Responsável'  @mandatory;
        createdAt            : Timestamp    @title: 'Criado em';
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