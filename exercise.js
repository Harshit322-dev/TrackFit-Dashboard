document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Weekly Activity Chart
    const weeklyActivityCtx = document.getElementById('weeklyActivityChart').getContext('2d');
    new Chart(weeklyActivityCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Steps',
                data: [7500, 8200, 6800, 9500, 7900, 11000, 8547],
                backgroundColor: '#1a73e8',
                borderRadius: 5
            }, {
                label: 'Active Minutes',
                data: [35, 40, 30, 45, 35, 60, 45],
                backgroundColor: '#34a853',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Activity Types Chart
    const activityTypesCtx = document.getElementById('activityTypesChart').getContext('2d');
    new Chart(activityTypesCtx, {
        type: 'pie',
        data: {
            labels: ['Running', 'Cycling', 'Walking', 'Swimming', 'Gym'],
            datasets: [{
                data: [40, 25, 20, 10, 5],
                backgroundColor: [
                    '#1a73e8',
                    '#34a853',
                    '#fbbc05',
                    '#ea4335',
                    '#4285f4'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Calories Chart
    const caloriesCtx = document.getElementById('caloriesChart').getContext('2d');
    new Chart(caloriesCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Calories Burned',
                data: [350, 380, 320, 420, 360, 480, 425],
                borderColor: '#ea4335',
                backgroundColor: 'rgba(234, 67, 53, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Calories'
                    }
                }
            }
        }
    });

    // Heart Rate Chart
    const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    new Chart(heartRateCtx, {
        type: 'line',
        data: {
            labels: ['0 min', '5 min', '10 min', '15 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min'],
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: [72, 85, 95, 105, 115, 120, 125, 130, 135, 140],
                borderColor: '#fbbc05',
                backgroundColor: 'rgba(251, 188, 5, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 160,
                    title: {
                        display: true,
                        text: 'Heart Rate (bpm)'
                    }
                }
            }
        }
    });

    // Populate exercise history table with mock data
    const exerciseHistoryData = [
        { date: '2024-04-10', activity: 'Running', duration: '45 min', distance: '5.2 km', calories: '425', heartRate: '135 bpm' },
        { date: '2024-04-09', activity: 'Cycling', duration: '60 min', distance: '20 km', calories: '600', heartRate: '125 bpm' },
        { date: '2024-04-08', activity: 'Walking', duration: '30 min', distance: '2.5 km', calories: '150', heartRate: '95 bpm' },
        { date: '2024-04-07', activity: 'Running', duration: '40 min', distance: '4.8 km', calories: '380', heartRate: '130 bpm' },
        { date: '2024-04-06', activity: 'Swimming', duration: '45 min', distance: '1.5 km', calories: '350', heartRate: '120 bpm' },
        { date: '2024-04-05', activity: 'Cycling', duration: '50 min', distance: '15 km', calories: '450', heartRate: '115 bpm' },
        { date: '2024-04-04', activity: 'Running', duration: '35 min', distance: '4.0 km', calories: '320', heartRate: '128 bpm' }
    ];

    const exerciseHistoryBody = document.getElementById('exercise-history-body');
    exerciseHistoryData.forEach(record => {
        const row = document.createElement('tr');
        
        // Format date to be more readable
        const dateObj = new Date(record.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        // Create activity badge based on activity type
        let activityBadgeClass = '';
        switch(record.activity.toLowerCase()) {
            case 'running':
                activityBadgeClass = 'running';
                break;
            case 'cycling':
                activityBadgeClass = 'cycling';
                break;
            case 'swimming':
                activityBadgeClass = 'swimming';
                break;
            case 'walking':
                activityBadgeClass = 'walking';
                break;
        }
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td><span class="activity-badge ${activityBadgeClass}">${record.activity}</span></td>
            <td>${record.duration}</td>
            <td>${record.distance}</td>
            <td>${record.calories}</td>
            <td>${record.heartRate}</td>
        `;
        exerciseHistoryBody.appendChild(row);
    });

    // Handle exercise filters
    const dateFilter = document.getElementById('exercise-date-filter');
    const typeFilter = document.getElementById('exercise-type-filter');

    function updateExerciseHistory() {
        const selectedDate = dateFilter.value;
        const selectedType = typeFilter.value;
        
        // Here you would typically make an API call to get filtered data
        console.log('Exercise Filters:', { date: selectedDate, type: selectedType });
    }

    dateFilter.addEventListener('change', updateExerciseHistory);
    typeFilter.addEventListener('change', updateExerciseHistory);

    // Handle start exercise button
    const startExerciseBtn = document.getElementById('start-exercise');
    const activityStatus = document.getElementById('activity-status');
    const runner = document.querySelector('.runner');
    let isExercising = false;

    startExerciseBtn.addEventListener('click', function() {
        isExercising = !isExercising;
        
        if (isExercising) {
            startExerciseBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Exercise';
            startExerciseBtn.classList.remove('btn-primary');
            startExerciseBtn.classList.add('btn-danger');
            activityStatus.textContent = 'Currently exercising - Running';
            runner.style.animationPlayState = 'running';
            
            // Start updating stats in real-time
            startRealTimeUpdates();
        } else {
            startExerciseBtn.innerHTML = '<i class="fas fa-play"></i> Start Exercise';
            startExerciseBtn.classList.remove('btn-danger');
            startExerciseBtn.classList.add('btn-primary');
            activityStatus.textContent = 'Not exercising';
            runner.style.animationPlayState = 'paused';
            
            // Stop updating stats
            stopRealTimeUpdates();
        }
    });

    // Simulate real-time updates during exercise
    let updateInterval;
    
    function startRealTimeUpdates() {
        let steps = 8547;
        let distance = 6.8;
        let calories = 425;
        let activeTime = 45;
        
        updateInterval = setInterval(() => {
            // Increment values
            steps += Math.floor(Math.random() * 10) + 5;
            distance += (Math.random() * 0.05).toFixed(2);
            calories += Math.floor(Math.random() * 3) + 1;
            activeTime += 1;
            
            // Update UI
            document.getElementById('steps-count').textContent = steps.toLocaleString();
            document.getElementById('distance-value').textContent = distance.toFixed(1) + ' km';
            document.getElementById('calories-value').textContent = calories;
            document.getElementById('active-time').textContent = activeTime + ' min';
        }, 3000); // Update every 3 seconds
    }
    
    function stopRealTimeUpdates() {
        clearInterval(updateInterval);
    }
}); 