// Chart.js configuration
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
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    new Chart(activityCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Steps',
                data: [8500, 9200, 7800, 10500, 8900, 12000, 9500],
                borderColor: '#1a73e8',
                backgroundColor: 'rgba(26, 115, 232, 0.1)',
                tension: 0.4
            }, {
                label: 'Calories',
                data: [2100, 2300, 1900, 2500, 2200, 2800, 2400],
                borderColor: '#34a853',
                backgroundColor: 'rgba(52, 168, 83, 0.1)',
                tension: 0.4
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

    // Exercise Distribution Chart
    const exerciseCtx = document.getElementById('exerciseChart').getContext('2d');
    new Chart(exerciseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Running', 'Cycling', 'Swimming', 'Walking', 'Gym'],
            datasets: [{
                data: [35, 25, 15, 15, 10],
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

    // Heart Rate Zones Chart
    const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    new Chart(heartRateCtx, {
        type: 'bar',
        data: {
            labels: ['Rest', 'Light', 'Moderate', 'Vigorous', 'Maximum'],
            datasets: [{
                label: 'Minutes',
                data: [120, 45, 30, 15, 5],
                backgroundColor: [
                    '#4285f4',
                    '#34a853',
                    '#fbbc05',
                    '#ea4335',
                    '#1a73e8'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Minutes'
                    }
                }
            }
        }
    });

    // Sleep Quality Chart
    const sleepCtx = document.getElementById('sleepChart').getContext('2d');
    new Chart(sleepCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sleep Duration (hours)',
                data: [7.5, 6.8, 8.2, 7.0, 7.8, 8.5, 7.2],
                borderColor: '#4285f4',
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                tension: 0.4
            }, {
                label: 'Sleep Quality (%)',
                data: [85, 75, 90, 80, 88, 92, 87],
                borderColor: '#fbbc05',
                backgroundColor: 'rgba(251, 188, 5, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Populate history table with mock data
    const historyData = [
        { date: '2024-04-10', activity: 'Running', duration: '45 min', calories: '450', distance: '5.2 km' },
        { date: '2024-04-09', activity: 'Cycling', duration: '60 min', calories: '600', distance: '20 km' },
        { date: '2024-04-08', activity: 'Swimming', duration: '30 min', calories: '300', distance: '1.5 km' },
        { date: '2024-04-07', activity: 'Running', duration: '40 min', calories: '400', distance: '4.8 km' },
        { date: '2024-04-06', activity: 'Cycling', duration: '45 min', calories: '450', distance: '15 km' }
    ];

    const historyTableBody = document.getElementById('historyTableBody');
    historyData.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.activity}</td>
            <td>${record.duration}</td>
            <td>${record.calories}</td>
            <td>${record.distance}</td>
        `;
        historyTableBody.appendChild(row);
    });

    // Handle history filters
    const dateFilter = document.getElementById('dateFilter');
    const typeFilter = document.getElementById('typeFilter');

    function updateHistoryTable() {
        const selectedDate = dateFilter.value;
        const selectedType = typeFilter.value;
        
        // Here you would typically make an API call to get filtered data
        console.log('Filters:', { date: selectedDate, type: selectedType });
    }

    dateFilter.addEventListener('change', updateHistoryTable);
    typeFilter.addEventListener('change', updateHistoryTable);

    // Update summary cards with real-time data
    function updateSummaryCards() {
        // Here you would typically make an API call to get the latest data
        // For now, we'll use sample data
        const summaryData = {
            calories: '2,450',
            distance: '34.2',
            heartRate: '72',
            bloodPressure: '120/80'
        };

        document.querySelector('.calories-value').textContent = summaryData.calories;
        document.querySelector('.distance-value').textContent = summaryData.distance;
        document.querySelector('.heart-rate-value').textContent = summaryData.heartRate;
        document.querySelector('.blood-pressure-value').textContent = summaryData.bloodPressure;
    }

    // Update data every 5 minutes
    updateSummaryCards();
    setInterval(updateSummaryCards, 300000);
}); 