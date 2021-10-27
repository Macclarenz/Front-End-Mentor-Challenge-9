const dailyBtn = document.querySelector('.daily-btn');
const weeklyBtn = document.querySelector('.weekly-btn');
const monthlyBtn = document.querySelector('.monthly-btn');
const buttons = document.querySelectorAll('.user-container button');
const tabToggle = document.querySelectorAll('.tab-toggle');

let time = 'hrs';

dailyBtn.addEventListener('click', daily);
weeklyBtn.addEventListener('click', weekly);
monthlyBtn.addEventListener('click', monthly);

// INTRO TRANSITION 
const intro = () => {
    const introTl = gsap.timeline({defaults: {ease: 'power1.out'}});

    introTl.fromTo('.first-transition', {opacity: 0}, {opacity: 1, duration: .3, delay: .5})
    introTl.to('.first-transition', {opacity: 0, delay: 1})
    introTl.fromTo('.second-transition', {opacity: 0}, {opacity: 1, duration: .3}, '-=.2')
    introTl.to('.second-a', {left: '50%', duration: .3}, '-=.3')
    introTl.to('.second-b', {right: '50%', duration: .3}, '-=.3')
    introTl.to('.second-a', {opacity: 0, y: '-10%', duration: .3, delay: 1})
    introTl.to('.second-b', {opacity: 0, y: '-10%', duration: .3}, '-=.3')
    introTl.to('.slider-container', {opacity: 0, zIndex: -1, duration: .3})
}

intro()

async function daily() {
    const response = await fetch('./data.json')
    const data = await response.json();
    const tabDailyActive = document.querySelectorAll('.tab-daily');
    const tabHours = document.querySelectorAll('.tab-hours');
    const tabPrevHours = document.querySelectorAll('.tab-previous-hours');

    // CURRENT HOURS
    for(let i=0, y=0; i < data.length, y < tabHours.length; i++, y++) {
        tabHours[y].innerHTML = data[i].timeframes.daily.current + time;
    }

    // PREVIOUS HOURS
    for(let i=0, y=0; i < data.length, y < tabPrevHours.length; i++, y++) {
        tabPrevHours[y].innerHTML = 'Previous - ' + (data[i].timeframes.daily.previous + time);
    }

    activeEvent(dailyBtn);
    gsapTransition(tabHours, tabPrevHours)

    tabToggle.forEach(toggle => {
        toggle.classList.remove('tab-toggle-active');
    });

    tabDailyActive.forEach(tabDaily => {
        tabDaily.classList.add('tab-toggle-active');
    })
}

async function weekly() {
    const response = await fetch('./data.json')
    const data = await response.json();
    const tabWeeklyActive = document.querySelectorAll('.tab-weekly');
    const tabHours = document.querySelectorAll('.tab-hours');
    const tabPrevHours = document.querySelectorAll('.tab-previous-hours');

    for(let i=0, y=0; i < data.length, y < tabHours.length; i++, y++) {
        tabHours[y].innerHTML = data[i].timeframes.weekly.current + time;
    }

    // PREVIOUS HOURS
    for(let i=0, y=0; i < data.length, y < tabPrevHours.length; i++, y++) {
        tabPrevHours[y].innerHTML = 'Previous - ' + (data[i].timeframes.weekly.previous + time);
    }

    activeEvent(weeklyBtn);
    gsapTransition(tabHours, tabPrevHours)

    tabToggle.forEach(toggle => {
        toggle.classList.remove('tab-toggle-active');
    });

    tabWeeklyActive.forEach(tab => {
        tab.classList.add('tab-toggle-active');
    })
}

async function monthly() {
    const response = await fetch('./data.json')
    const data = await response.json();
    const tabMonthlyActive = document.querySelectorAll('.tab-monthly');
    const tabHours = document.querySelectorAll('.tab-hours');
    const tabPrevHours = document.querySelectorAll('.tab-previous-hours');

    // CURRENT HOURS
    for(let i=0, y=0; i < data.length, y < tabHours.length; i++, y++) {
        tabHours[y].innerHTML = data[i].timeframes.monthly.current + time;
    }

    // PREVIOUS HOURS
    for(let i=0, y=0; i < data.length, y < tabPrevHours.length; i++, y++) {
        tabPrevHours[y].innerHTML = 'Previous - ' + (data[i].timeframes.monthly.previous + time);
    }

    activeEvent(monthlyBtn);
    gsapTransition(tabHours, tabPrevHours)

    tabToggle.forEach(toggle => {
        toggle.classList.remove('tab-toggle-active');
    });

    tabMonthlyActive.forEach(tab => {
        tab.classList.add('tab-toggle-active');
    })
}

// INITIAL STARTING DATA
weekly()

// ACTIVE EVENT FOR SIDE BUTTON
const activeEvent = (evt) => {
    buttons.forEach(button => {
        button.classList.remove('active');
    })

    evt.classList.add('active');
}


// ELLIPSIS BUTTON

function ttlDisplay(name) {
    document.getElementById(name).classList.toggle('tab-toggle-list-active');
}

// ELLIPSIS BUTTON - DAILY

async function dailyTab(name, index, evt, parentId) {
    const response = await fetch('./data.json')
    const data = await response.json();
    const tabHour = document.querySelector(name);
    const tabPrevHour = tabHour.nextElementSibling;

    // SINGLE CURRENT HOUR
    tabHour.innerHTML = (data[index].timeframes.daily.current) + time;

    // SINGLE PREVIOUS HOUR
    tabPrevHour.innerHTML = 'Previous - ' + (data[index].timeframes.daily.previous) + time;

    activeTabEvent(evt, parentId)
    gsapTransition(tabHour, tabPrevHour)
}

// ELLIPSIS BUTTON - WEEKLY

async function weeklyTab(name, index, evt, parentId) {
    const response = await fetch('./data.json')
    const data = await response.json();
    const tabHour = document.querySelector(name);
    const tabPrevHour = tabHour.nextElementSibling;

    // SINGLE CURRENT HOUR
    tabHour.innerHTML = (data[index].timeframes.weekly.current) + time;

    // SINGLE PREVIOUS HOUR
    tabPrevHour.innerHTML = 'Previous - ' + (data[index].timeframes.weekly.previous) + time;

    activeTabEvent(evt, parentId)
    gsapTransition(tabHour, tabPrevHour)
}

// ELLIPSIS BUTTON - MONTHLY

async function monthlyTab(name, index, evt, parentId) {
    const response = await fetch('./data.json')
    const data = await response.json();
    const tabHour = document.querySelector(name);
    const tabPrevHour = tabHour.nextElementSibling;

    // SINGLE CURRENT HOUR
    tabHour.innerHTML = (data[index].timeframes.monthly.current) + time;

    // SINGLE PREVIOUS HOUR
    tabPrevHour.innerHTML = 'Previous - ' + (data[index].timeframes.monthly.previous) + time;

    activeTabEvent(evt, parentId)
    gsapTransition(tabHour, tabPrevHour)
}

// ACTIVE TAB EVENT

const activeTabEvent = (evt, parentId) => {
    const tabToggle = document.querySelectorAll(parentId);
 
    tabToggle.forEach(tab => {
        tab.classList.remove('tab-toggle-active');
    })
    document.getElementById(evt).classList.add('tab-toggle-active');
}

// TRANSITION GSAP 

const gsapTransition = (tabHour, tabPrevHour) => {
    const tl = gsap.timeline({defaults: {ease: 'power1.out'}});

    tl.fromTo(tabHour, {opacity: 0}, {opacity: 1, duration: .5})
    tl.fromTo(tabPrevHour, {opacity: 0}, {opacity: 1, duration: .5})
}


