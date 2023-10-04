(function () {
    $(document).ready(function () {
        tableau.extensions.initializeAsync({ 'configure': configure }).then(function () {
            const dashboardObject = tableau.extensions.dashboardContent.dashboard.objects.find(
                (object) => object.name === tableau.extensions.settings.get('dashboardObject')
              );
              const waitPeriod = +tableau.extensions.settings.get('waitPeriod');
              const showHideToggle = tableau.extensions.settings.get('showHideToggle') === 'true';
              const showHideValue = showHideToggle ? tableau.DashboardObjectVisibilityType.Hide : tableau.DashboardObjectVisibilityType.Show;
              if (dashboardObject) {
                toggleObject(dashboardObject, waitPeriod, showHideValue);
              }
        });

        function waitFor(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function toggleObject(dashboardObject, waitPeriod, showHideToggle) {
            let zoneVisibilityMap = {};
            let dahboardObjectId = dashboardObject.id;
            zoneVisibilityMap[dahboardObjectId] = showHideToggle;
            await waitFor(waitPeriod).then(() => {
                tableau.extensions.dashboardContent.dashboard.setZoneVisibilityAsync(zoneVisibilityMap);
            });
        }

        function configure() {
            tableau.extensions.ui.displayDialogAsync('config.html', null, { width: 250, height: 250 }).then((closePayload) => {
                // handle close payload
            }).catch((error) => {
                // handle error
            });
        }
    })
})();