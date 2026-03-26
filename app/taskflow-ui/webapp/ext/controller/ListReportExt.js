sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (JSONModel, Fragment, MessageToast, MessageBox) {
    "use strict";

    let _oCreateDialog;
    let _oHostView;

    const oDialogController = {
        onOpenCreateDialog: async function () {
            const oView =
                this?._view ||
                this?._controller?.getView?.() ||
                this?.base?.getView?.() ||
                this?.getView?.();

            if (!oView) {
                console.error("Contexto recebido pela action:", this);
                MessageBox.error("Não foi possível localizar a view da aplicação.");
                return;
            }

            _oHostView = oView;

            if (!_oCreateDialog) {
                _oCreateDialog = await Fragment.load({
                    id: oView.getId(),
                    name: "taskflow.ui.taskflowui.ext.fragment.CreateTaskDialog",
                    controller: oDialogController
                });

                oView.addDependent(_oCreateDialog);
            }

            const oCreateModel = new JSONModel({
                title: "",
                description: "",
                status: "TO-DO",
                priority: "MEDIUM",
                responsible: ""
            });

            _oCreateDialog.setModel(oCreateModel, "createTask");
            _oCreateDialog.open();
        },

        onCancelCreateDialog: function () {
            console.log("Cancel clicado");
            if (_oCreateDialog) {
                _oCreateDialog.close();
            }
        },

        onSaveCreateDialog: async function () {
    console.log("Save clicado");

    if (!_oCreateDialog || !_oHostView) {
        MessageBox.error("Não foi possível acessar o formulário de criação.");
        return;
    }

    const oModel = _oHostView.getModel();
    const oI18n = _oHostView.getModel("i18n").getResourceBundle();
    const oData = _oCreateDialog.getModel("createTask").getData();

    console.log("Dados enviados para criação:", oData);

    if (!oData.title || !oData.title.trim()) {
        MessageBox.warning("O campo Título é obrigatório.");
        return;
    }

    if (!oData.description || !oData.description.trim()) {
        MessageBox.warning("O campo Descrição é obrigatório.");
        return;
    }

    if (!oData.responsible || !oData.responsible.trim()) {
        MessageBox.warning("O campo Responsável é obrigatório.");
        return;
    }

    try {
        const oListBinding = oModel.bindList("/Tasks");

        const oContext = oListBinding.create({
            title: oData.title,
            description: oData.description,
            status: oData.status,
            priority: oData.priority,
            responsible: oData.responsible
        });

        await oContext.created();

        if (oModel.submitBatch) {
            await oModel.submitBatch("$auto");
        }

        MessageToast.show(oI18n.getText("createSuccess"));
        _oCreateDialog.close();
        oModel.refresh();
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        MessageBox.error(error?.message || oI18n.getText("createError"));
    }
}
    };

    return oDialogController;
});