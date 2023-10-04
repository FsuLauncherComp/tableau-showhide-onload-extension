//Wrap this into an anonymous function to avoid polluting the global namespace
// Trigger on document ready using ES6

(function () {
    $(document).ready(function () {
        tableau.extensions.initializeDialogAsync().then((payload) => {
            const dashboard = tableau.extensions.dashboardContent.dashboard;

            // Populate objectSelect dropdown
            populateObjectDropdown(dashboard);

            // Set existing settings in the UI
            setExistingSettings();

            // Set up the apply button event
            document.getElementById('applyButton').addEventListener('click', () => {
                saveSettings();
                tableau.extensions.ui.closeDialog('');
            });
        });

        function populateObjectDropdown(dashboard) {
            const optionSelect = document.getElementById('objectSelect');
            const selectedObject = tableau.extensions.settings.get('dashboardObject');
            dashboard.objects.forEach(object => {
                const option = document.createElement('option');
                const objectName = object.name;
                option.text = objectName;
                option.value = objectName;
                if (selectedObject === objectName) {
                    option.selected = true;
                }
                optionSelect.add(option);
            });
        }

        function setExistingSettings() {
            const waitInput = document.getElementById('waitInput');
            const toggleSwitch = document.getElementById('toggleSwitch');
            waitInput.value = tableau.extensions.settings.get('waitPeriod') ?? '';
            toggleSwitch.checked = tableau.extensions.settings.get('showHideToggle') === 'true';
        }

        function saveSettings() {
            tableau.extensions.settings.set('dashboardObject', document.getElementById('objectSelect').value);
            tableau.extensions.settings.set('waitPeriod', document.getElementById('waitInput').value);
            tableau.extensions.settings.set('showHideToggle', document.getElementById('toggleSwitch').checked.toString());
            tableau.extensions.settings.saveAsync();
        }
    })
})();