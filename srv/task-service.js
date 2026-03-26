const cds = require('@sap/cds');
const { randomUUID } = require('crypto');

module.exports = cds.service.impl(async function () {
    const { Tasks } = this.entities;

    this.before('CREATE', Tasks, (req) => {
        const data = req.data;

        if (!data.ID) {
            data.ID = randomUUID();
        }

        if (!data.createdAt) {
            data.createdAt = new Date().toISOString();
        }

        if (!data.status) {
            data.status = 'TO-DO';
        }

        if (!data.priority) {
            data.priority = 'MEDIUM';
        }

        if (!data.title || !data.title.trim()) {
            return req.reject(400, 'O título da tarefa é obrigatório.');
        }

        if (!data.description || !data.description.trim()) {
            return req.reject(400, 'A descrição da tarefa é obrigatória.');
        }

        if (!data.responsible || !data.responsible.trim()) {
            return req.reject(400, 'O responsável pela tarefa é obrigatório.');
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