document.addEventListener('DOMContentLoaded', function() {
    // Update current date
    const currentDate = new Date();
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Initialize calendar
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = null;

    // Create modal for workout details
    const modal = document.createElement('div');
    modal.className = 'workout-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modal-date"></h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div id="workout-list"></div>
                <button class="add-workout-to-day">Add Workout</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .workout-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #5f6368;
        }

        .add-workout-to-day {
            background-color: #1a73e8;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            width: 100%;
        }

        .workout-item-modal {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #dadce0;
        }

        .workout-item-modal:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(modalStyles);

    // Sample workout data with more details
    const workoutData = {
        '2024-03-20': [
            { 
                type: 'running', 
                name: 'Morning Run', 
                time: '7:00 AM',
                duration: '30 min',
                distance: '5 km',
                calories: '350'
            },
            { 
                type: 'strength', 
                name: 'Upper Body', 
                time: '6:00 PM',
                duration: '45 min',
                exercises: ['Bench Press', 'Pull-ups', 'Shoulder Press'],
                calories: '280'
            }
        ],
        '2024-03-22': [
            { 
                type: 'cycling', 
                name: 'Cycling Class', 
                time: '5:30 PM',
                duration: '60 min',
                distance: '20 km',
                calories: '450'
            }
        ],
        '2024-03-25': [
            { 
                type: 'running', 
                name: 'Evening Run', 
                time: '6:00 PM',
                duration: '45 min',
                distance: '7 km',
                calories: '490'
            }
        ]
    };

    // Add event listeners for navigation buttons
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal when clicking close button
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Add workout to selected day
    document.querySelector('.add-workout-to-day').addEventListener('click', () => {
        if (selectedDate) {
            const dateString = selectedDate.toISOString().split('T')[0];
            if (!workoutData[dateString]) {
                workoutData[dateString] = [];
            }
            
            // Add sample workout (in real app, this would open a form)
            workoutData[dateString].push({
                type: 'running',
                name: 'New Workout',
                time: '9:00 AM',
                duration: '30 min',
                distance: '5 km',
                calories: '350'
            });
            
            updateCalendar();
            showWorkoutDetails(selectedDate);
        }
    });

    function showWorkoutDetails(date) {
        const dateString = date.toISOString().split('T')[0];
        const workouts = workoutData[dateString] || [];
        
        document.getElementById('modal-date').textContent = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const workoutList = document.getElementById('workout-list');
        workoutList.innerHTML = '';

        if (workouts.length === 0) {
            workoutList.innerHTML = '<p>No workouts scheduled for this day.</p>';
        } else {
            workouts.forEach(workout => {
                const workoutElement = document.createElement('div');
                workoutElement.className = 'workout-item-modal';
                workoutElement.innerHTML = `
                    <div class="workout-icon ${workout.type}">
                        <i class="fas fa-${getWorkoutIcon(workout.type)}"></i>
                    </div>
                    <div class="workout-details">
                        <div class="workout-name">${workout.name}</div>
                        <div class="workout-time">${workout.time} - ${workout.duration}</div>
                        ${workout.distance ? `<div>Distance: ${workout.distance}</div>` : ''}
                        ${workout.exercises ? `<div>Exercises: ${workout.exercises.join(', ')}</div>` : ''}
                        <div>Calories: ${workout.calories}</div>
                    </div>
                `;
                workoutList.appendChild(workoutElement);
            });
        }

        modal.style.display = 'flex';
    }

    function getWorkoutIcon(type) {
        const icons = {
            'running': 'running',
            'cycling': 'bicycle',
            'swimming': 'swimmer',
            'strength': 'dumbbell'
        };
        return icons[type] || 'dumbbell';
    }

    function updateCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        // Update month display
        document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Clear existing days
        const existingDays = document.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());

        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if it's today
            const today = new Date();
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }

            // Add day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            // Check for workouts on this day
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (workoutData[dateString]) {
                dayElement.classList.add('has-events');
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'day-events';
                
                workoutData[dateString].forEach(workout => {
                    const eventDot = document.createElement('span');
                    eventDot.className = `event-dot ${workout.type}`;
                    eventsContainer.appendChild(eventDot);
                });
                
                dayElement.appendChild(eventsContainer);
            }

            // Add click event to show workout details
            dayElement.addEventListener('click', () => {
                selectedDate = new Date(currentYear, currentMonth, day);
                showWorkoutDetails(selectedDate);
            });

            calendarGrid.appendChild(dayElement);
        }

        // Update monthly summary
        updateMonthlySummary();
    }

    function updateMonthlySummary() {
        let totalWorkouts = 0;
        let totalHours = 0;
        let totalCalories = 0;
        let totalDistance = 0;

        Object.values(workoutData).forEach(workouts => {
            totalWorkouts += workouts.length;
            workouts.forEach(workout => {
                if (workout.duration) {
                    const hours = parseFloat(workout.duration) / 60;
                    totalHours += hours;
                }
                if (workout.calories) {
                    totalCalories += parseInt(workout.calories);
                }
                if (workout.distance) {
                    totalDistance += parseFloat(workout.distance);
                }
            });
        });

        document.querySelector('.workout-stat-value:nth-child(1)').textContent = totalWorkouts;
        document.querySelector('.workout-stat-value:nth-child(2)').textContent = totalHours.toFixed(1);
        document.querySelector('.workout-stat-value:nth-child(3)').textContent = totalCalories.toLocaleString();
        document.querySelector('.workout-stat-value:nth-child(4)').textContent = totalDistance.toFixed(0);
    }

    // Add workout button functionality
    document.querySelector('.add-workout-btn').addEventListener('click', function() {
        if (selectedDate) {
            showWorkoutDetails(selectedDate);
        } else {
            alert('Please select a date first');
        }
    });

    // Initialize calendar
    updateCalendar();
}); 