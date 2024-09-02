

document.addEventListener('DOMContentLoaded', () => {
    const studyInput = document.getElementById('studyDuration');
    const breakInput = document.getElementById('breakDuration');
    const historyList = document.getElementById('historyList');

    // Load durations from localStorage if available
    if (localStorage.getItem('studyDuration')) {
        studyInput.value = localStorage.getItem('studyDuration');
    }

    if (localStorage.getItem('breakDuration')) {
        breakInput.value = localStorage.getItem('breakDuration');
    }

    // Save durations to localStorage 
    studyInput.addEventListener('input', () => {
        localStorage.setItem('studyDuration', studyInput.value);
    });

    breakInput.addEventListener('input', () => {
        localStorage.setItem('breakDuration', breakInput.value);
    });

    // Load session history 
    loadSessionHistory(historyList);
});

const startButton = document.getElementById('startButton');
const progressBar = document.getElementById('progressBar');
let interval;

startButton.addEventListener('click', startSession);

function startSession() {
    const studyTime = parseInt(document.getElementById('studyDuration').value) * 60;//nesekonds
    const breakTime = parseInt(document.getElementById('breakDuration').value) * 60; 
    const totalTime = studyTime + breakTime;

    let elapsedTime = 0;
    clearInterval(interval); 

    interval = setInterval(() => {
        elapsedTime += 1;
        const progressPercent = (elapsedTime / totalTime) * 100;
        progressBar.style.width = progressPercent + '%';

        // Alert user when study time is over and break starts
        if (elapsedTime === studyTime) {
            alert('Break time!');
        }

        // When times up stop the interval
        if (elapsedTime >= totalTime) {
            clearInterval(interval);
            alert('Session complete!');
            logSession(studyTime / 60, breakTime / 60); // Log the session
        }
    }, 1000);
}

function logSession(studyMinutes, breakMinutes) {
    const now = new Date();
    const sessionLog = `Date: ${now.toLocaleDateString()}, Time: ${now.toLocaleTimeString()}, Study: ${studyMinutes} minutes, Break: ${breakMinutes} minutes`;

    // Save<<<<localStorage
    let history = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    history.push(sessionLog);
    localStorage.setItem('sessionHistory', JSON.stringify(history));

    // Display the history in the historyList element
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = sessionLog;
    historyList.appendChild(listItem);
}

function loadSessionHistory(historyList) {
    const history = JSON.parse(localStorage.getItem('sessionHistory')) || [];

    // Clear any existing items
    historyList.innerHTML = '';

    // Append each item in history to the historyList
    history.forEach(session => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = session;
        historyList.appendChild(listItem);
    });
}
