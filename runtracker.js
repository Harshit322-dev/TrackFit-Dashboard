document.addEventListener('DOMContentLoaded', function() {
    // Update current date
    const currentDate = new Date();
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Initialize charts
    initializeCharts();

    // Populate run history
    populateRunHistory();

    // Add event listeners for control buttons
    document.getElementById('start-button').addEventListener('click', startRun);
    document.getElementById('pause-button').addEventListener('click', pauseRun);
    document.getElementById('stop-button').addEventListener('click', stopRun);

    // Add event listeners for filters
    document.getElementById('run-date-filter').addEventListener('change', updateRunHistory);
    document.getElementById('run-type-filter').addEventListener('change', updateRunHistory);

    // Create scenery elements
    createScenery();
});

// Chart initialization
function initializeCharts() {
    // Pace Chart
    const paceCtx = document.getElementById('paceChart').getContext('2d');
    new Chart(paceCtx, {
        type: 'line',
        data: {
            labels: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00'],
            datasets: [{
                label: 'Current Pace',
                data: [5.2, 5.1, 5.3, 5.0, 5.2, 5.4, 5.1],
                borderColor: '#1a73e8',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Minutes per Kilometer'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 4,
                    max: 7
                }
            }
        }
    });

    // Heart Rate Chart
    const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
    new Chart(heartRateCtx, {
        type: 'line',
        data: {
            labels: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00'],
            datasets: [{
                label: 'Heart Rate',
                data: [120, 135, 142, 138, 145, 150, 148],
                borderColor: '#ea4335',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Beats per Minute'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 100,
                    max: 160
                }
            }
        }
    });

    // Elevation Chart
    const elevationCtx = document.getElementById('elevationChart').getContext('2d');
    new Chart(elevationCtx, {
        type: 'line',
        data: {
            labels: ['0:00', '5:00', '10:00', '15:00', '20:00', '25:00', '30:00'],
            datasets: [{
                label: 'Elevation',
                data: [0, 10, 25, 15, 30, 20, 5],
                borderColor: '#34a853',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Meters'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Weekly Distance Chart
    const weeklyDistanceCtx = document.getElementById('weeklyDistanceChart').getContext('2d');
    new Chart(weeklyDistanceCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Distance (km)',
                data: [5.2, 0, 7.5, 0, 6.8, 10.2, 0],
                backgroundColor: '#fbbc05'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Kilometers'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Run history data
const runHistoryData = [
    {
        date: '2024-03-20',
        distance: '5.2',
        time: '00:26:15',
        pace: '5\'03"',
        calories: '320',
        type: 'Easy'
    },
    {
        date: '2024-03-18',
        distance: '7.5',
        time: '00:37:30',
        pace: '5\'00"',
        calories: '450',
        type: 'Tempo'
    },
    {
        date: '2024-03-15',
        distance: '6.8',
        time: '00:34:00',
        pace: '5\'00"',
        calories: '410',
        type: 'Easy'
    },
    {
        date: '2024-03-13',
        distance: '10.2',
        time: '00:51:00',
        pace: '5\'00"',
        calories: '620',
        type: 'Long'
    }
];

// Populate run history table
function populateRunHistory() {
    const tbody = document.getElementById('run-history-body');
    tbody.innerHTML = '';

    runHistoryData.forEach(run => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${run.date}</td>
            <td>${run.distance} km</td>
            <td>${run.time}</td>
            <td>${run.pace}</td>
            <td>${run.calories}</td>
            <td>${run.type}</td>
        `;
        tbody.appendChild(row);
    });
}

// Update run history based on filters
function updateRunHistory() {
    const dateFilter = document.getElementById('run-date-filter').value;
    const typeFilter = document.getElementById('run-type-filter').value;

    let filteredData = [...runHistoryData];

    // Apply date filter
    const today = new Date();
    const daysAgo = new Date(today);
    daysAgo.setDate(today.getDate() - parseInt(dateFilter));
    
    filteredData = filteredData.filter(run => {
        const runDate = new Date(run.date);
        return runDate >= daysAgo;
    });

    // Apply type filter
    if (typeFilter !== 'all') {
        filteredData = filteredData.filter(run => run.type.toLowerCase() === typeFilter.toLowerCase());
    }

    // Update table
    const tbody = document.getElementById('run-history-body');
    tbody.innerHTML = '';

    filteredData.forEach(run => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${run.date}</td>
            <td>${run.distance} km</td>
            <td>${run.time}</td>
            <td>${run.pace}</td>
            <td>${run.calories}</td>
            <td>${run.type}</td>
        `;
        tbody.appendChild(row);
    });
}

// Create scenery elements (trees and clouds)
function createScenery() {
    const scenery = document.getElementById('scenery');
    
    // Create trees
    for (let i = 0; i < 5; i++) {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.style.left = `${Math.random() * 100}%`;
        scenery.appendChild(tree);
    }
    
    // Create clouds
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.left = `${Math.random() * 100}%`;
        cloud.style.top = `${Math.random() * 50}%`;
        scenery.appendChild(cloud);
    }
}

// Run tracking variables
let isRunning = false;
let startTime;
let timerInterval;
let distance = 0;
let calories = 0;

// Start run
function startRun() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        
        // Update button states
        document.getElementById('start-button').disabled = true;
        document.getElementById('pause-button').disabled = false;
        document.getElementById('stop-button').disabled = false;
        
        // Start timer
        timerInterval = setInterval(updateStats, 1000);
        
        // Start runner animation
        document.getElementById('runner').style.animationPlayState = 'running';
    }
}

// Pause run
function pauseRun() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        
        // Update button states
        document.getElementById('start-button').disabled = false;
        document.getElementById('pause-button').disabled = true;
        
        // Pause runner animation
        document.getElementById('runner').style.animationPlayState = 'paused';
    }
}

// Stop run
function stopRun() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        
        // Reset stats
        distance = 0;
        calories = 0;
        
        // Update displays
        document.getElementById('distance-value').textContent = '0.00 km';
        document.getElementById('time-value').textContent = '00:00:00';
        document.getElementById('pace-value').textContent = '0\'00"';
        document.getElementById('calories-value').textContent = '0';
        
        // Update button states
        document.getElementById('start-button').disabled = false;
        document.getElementById('pause-button').disabled = true;
        document.getElementById('stop-button').disabled = true;
        
        // Stop runner animation
        document.getElementById('runner').style.animationPlayState = 'paused';
    }
}

// Update run statistics
function updateStats() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    
    // Update time display
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    
    document.getElementById('time-value').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Simulate distance increase (random between 0.1 and 0.3 km per second)
    distance += (Math.random() * 0.2 + 0.1) / 60;
    document.getElementById('distance-value').textContent = `${distance.toFixed(2)} km`;
    
    // Calculate pace (minutes per kilometer)
    const paceMinutes = Math.floor(minutes / distance);
    const paceSeconds = Math.floor((minutes % distance) / distance * 60);
    document.getElementById('pace-value').textContent = `${paceMinutes}'${String(paceSeconds).padStart(2, '0')}"`;
    
    // Simulate calories burned (approximately 60 calories per kilometer)
    calories = Math.floor(distance * 60);
    document.getElementById('calories-value').textContent = calories;
}