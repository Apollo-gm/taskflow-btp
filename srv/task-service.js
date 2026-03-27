const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
    const { Tasks } = this.entities;

    this.before('CREATE', Tasks, (req) => {
        const data = req.data;

        if (!data.title || !data.title.trim()) {
            req.reject(400, 'O título é obrigatório.');
        }

        if (!data.description || !data.description.trim()) {
            req.reject(400, 'A descrição é obrigatória.');
        }

        if (!data.responsible || !data.responsible.trim()) {
            req.reject(400, 'O responsável é obrigatório.');
        }

        if (!data.status) {
            data.status = 'TO-DO';
        }

        if (!data.priority) {
            data.priority = 'MEDIUM';
        }
    });

    this.before('UPDATE', Tasks, (req) => {
        const data = req.data;

        if ('title' in data && (!data.title || !data.title.trim())) {
            req.reject(400, 'O título não pode ficar vazio.');
        }

        if ('description' in data && (!data.description || !data.description.trim())) {
            req.reject(400, 'A descrição não pode ficar vazia.');
        }

        if ('responsible' in data && (!data.responsible || !data.responsible.trim())) {
            req.reject(400, 'O responsável não pode ficar vazio.');
        }
    });

    this.after('READ', Tasks, (tasks) => {
        const list = Array.isArray(tasks) ? tasks : [tasks];

        list.forEach(task => {
            if (!task) return;

            switch (task.status) {
                case 'DONE':
                    task.criticality_status = 3;
                    break;
                case 'DOING':
                    task.criticality_status = 2;
                    break;
                case 'TO-DO':
                    task.criticality_status = 0;
                    break;
                default:
                    task.criticality_status = 0;
            }

            switch (task.priority) {
                case 'HIGH':
                    task.criticality_priority = 1;
                    break;
                case 'MEDIUM':
                    task.criticality_priority = 2;
                    break;
                case 'LOW':
                    task.criticality_priority = 3;
                    break;
                default:
                    task.criticality_priority = 0;
            }
        });
    });
});