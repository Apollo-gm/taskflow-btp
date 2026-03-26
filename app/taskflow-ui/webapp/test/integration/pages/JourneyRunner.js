sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"taskflow/ui/taskflowui/test/integration/pages/TasksList",
	"taskflow/ui/taskflowui/test/integration/pages/TasksObjectPage"
], function (JourneyRunner, TasksList, TasksObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('taskflow/ui/taskflowui') + '/test/flp.html#app-preview',
        pages: {
			onTheTasksList: TasksList,
			onTheTasksObjectPage: TasksObjectPage
        },
        async: true
    });

    return runner;
});

