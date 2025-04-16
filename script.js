// Initialize data from localStorage or set defaults
let fitnessData = JSON.parse(localStorage.getItem('fitnessData')) || {
    steps: 0,
    calories: 0,
    goals: []
};

// Sidebar toggle functionality
function setupSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const navTexts = document.querySelectorAll('.nav-text');
    
    // Check if sidebar state is saved in localStorage
    const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        
        // Hide all nav texts
        navTexts.forEach(text => {
            text.style.display = 'none';
        });
    }
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Toggle visibility of nav texts
        navTexts.forEach(text => {
            text.style.display = sidebar.classList.contains('collapsed') ? 'none' : 'block';
        });
        
        // Save sidebar state to localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            link.parentElement.classList.add('active');
            
            // Handle logout
            if (link.getAttribute('href') === '#logout') {
                if (confirm('Are you sure you want to logout?')) {
                    // Clear local storage
                    localStorage.removeItem('fitnessData');
                    // Redirect to login page (you can change this to your login page URL)
                    window.location.href = '#login';
                }
            }
        });
    });
}

// Update current date
function updateDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}

// Update steps
function updateSteps() {
    const stepsInput = prompt('Enter number of steps to add:');
    if (stepsInput && !isNaN(stepsInput)) {
        fitnessData.steps += parseInt(stepsInput);
        updateUI();
        saveData();
    }
}

// Update calories
function updateCalories() {
    const caloriesInput = prompt('Enter number of calories to add:');
    if (caloriesInput && !isNaN(caloriesInput)) {
        fitnessData.calories += parseInt(caloriesInput);
        updateUI();
        saveData();
    }
}

// Add new goal
function addGoal() {
    const goalInput = document.getElementById('new-goal');
    const goalText = goalInput.value.trim();
    
    if (goalText) {
        fitnessData.goals.push({
            text: goalText,
            completed: false,
            id: Date.now()
        });
        goalInput.value = '';
        updateUI();
        saveData();
    }
}

// Delete goal
function deleteGoal(id) {
    fitnessData.goals = fitnessData.goals.filter(goal => goal.id !== id);
    updateUI();
    saveData();
}

// Toggle goal completion
function toggleGoal(id) {
    const goal = fitnessData.goals.find(g => g.id === id);
    if (goal) {
        goal.completed = !goal.completed;
        updateUI();
        saveData();
    }
}

// Update UI elements
function updateUI() {
    // Update steps
    document.getElementById('steps-count').textContent = fitnessData.steps;
    const stepsProgress = (fitnessData.steps / 10000) * 100;
    document.querySelector('.steps-card .progress-circle').style.background = 
        `conic-gradient(#1a73e8 ${stepsProgress}%, #f0f2f5 ${stepsProgress}%)`;

    // Update calories
    document.getElementById('calories-count').textContent = fitnessData.calories;
    const caloriesProgress = (fitnessData.calories / 2000) * 100;
    document.querySelector('.calories-card .progress-circle').style.background = 
        `conic-gradient(#1a73e8 ${caloriesProgress}%, #f0f2f5 ${caloriesProgress}%)`;

    // Update goals list
    const goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = '';
    
    fitnessData.goals.forEach(goal => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${goal.completed ? 'line-through' : 'none'}">
                ${goal.text}
            </span>
            <div>
                <button onclick="toggleGoal(${goal.id})" class="toggle-btn">
                    ${goal.completed ? '✓' : '○'}
                </button>
                <button onclick="deleteGoal(${goal.id})" class="delete-btn">×</button>
            </div>
        `;
        goalsList.appendChild(li);
    });
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('fitnessData', JSON.stringify(fitnessData));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    setupSidebarToggle();
    setupNavigation();
    updateDate();
    updateUI();
    
    // Update date every minute
    setInterval(updateDate, 60000);
}); 