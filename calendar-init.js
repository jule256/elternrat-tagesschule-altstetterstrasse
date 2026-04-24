// ===================================
// FULLCALENDAR INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');

    if (!calendarEl) return;

    // calculate date 365 days from now
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 365);

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'list',
        locale: 'de',
        views: {
            list: {
                type: 'list',
                duration: { days: 365 },
                buttonText: 'Nächste 365 Tage'
            }
        },
        headerToolbar: false,
        listDayFormat: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
        validRange: {
            start: today,
            end: endDate
        },
        events: 'assets/events.json',
        eventContent: function (arg) {
            // customize event rendering to include location and description
            let arrayOfDomNodes = [];

            // time
            let timeEl = document.createElement('div');
            timeEl.classList.add('fc-list-event-time');
            timeEl.innerHTML = arg.timeText;
            arrayOfDomNodes.push(timeEl);

            // title, location, and description
            let contentEl = document.createElement('div');
            contentEl.classList.add('fc-list-event-title');

            let content = `<strong>${arg.event.title}</strong>`;

            if (arg.event.extendedProps.location) {
                content += `<br><span style="color: #7E899A; font-size: 0.9em;">Wo: ${arg.event.extendedProps.location}</span>`;
            }

            if (arg.event.extendedProps.description) {
                content += `<br><span style="color: ${arg.event.extendedProps.description ? 'var(--text-gray)' : '#7E899A'}; font-size: 0.9em; font-style: italic;">${arg.event.extendedProps.description}</span>`;
            }

            contentEl.innerHTML = content;
            arrayOfDomNodes.push(contentEl);

            return { domNodes: arrayOfDomNodes };
        },
        noEventsContent: 'Keine Termine vorhanden',
        height: 'auto'
    });

    calendar.render();
});
