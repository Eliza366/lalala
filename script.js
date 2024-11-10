let shape = document.querySelector('.image');
shape.addEventListener('click', function(){
    anime({
        targets: '.image',
        translateX: {
            value: 250,
            duration: 800
        },
        rotate: {
            value: 360,
            duration: 1800,
            easing: 'easeInOutSine'
        },
        scale: {
            value: 2,
            duration: 1600,
            delay: 800,
            easing: 'easeInOutQuart'
        },
        delay: 250, // All properties except 'scale' inherit 250ms delay
        complete: function(anim) {
            // Повернення об'єкта до початкового стану після завершення анімації
            anime({
                targets: '.image',
                translateX: 0,
                rotate: 0,
                scale: 1,
                duration: 800,
                easing: 'easeInOutSine'
            });
        }
    });
});

// Зберігаємо дані меню для кожного дня
let menuData = {
    "Понеділок": [],
    "Вівторок": [],
    "Середа": [],
    "Четвер": [],
    "П'ятниця": [],
    "Субота": [],
    "Неділя": []
};

// Приблизний список ПП страв для генерації
const randomMeals = [
    { name: 'вівсянка з фруктами', calories: 350 },
    { name: 'Салат з куркою', calories: 400 },
    { name: 'Смузі з ягід', calories: 200 },
    { name: 'Гречка з овочами', calories: 300 },
    { name: 'Куряча грудка на пару', calories: 250 },
    { name: 'Запечена риба', calories: 450 },
    { name: 'Рисова запіканка з овочами', calories: 511 },
    { name: 'Соковиті курячі котлети', calories: 280 },
    { name: 'Ліниві голубці', calories: 404 },
    { name: 'Салат Тбілісі', calories: 785 },
    { name: 'Вівсяні млинці з яблуками та корицею', calories: 604 },
    { name: 'Ліниві роли з тунцем', calories: 363 },
    { name: 'Сирники з тофу (тофники)', calories: 508  },
    { name: 'Салат з яйцями і куркою', calories: 350 },
    { name: 'Крем-паста з журавлиною', calories: 407 },
    { name: 'Овочевий суп', calories: 150 }
];

// Функція для оновлення відображення меню для обраного дня
function updateMenuDisplay(selectedDay) {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';
    let totalCalories = 0;

    menuData[selectedDay].forEach((meal) => {
        const li = document.createElement('li');
        li.innerHTML = `${meal.name} - ${meal.calories} ккал`;
        menuList.appendChild(li);
        totalCalories += meal.calories;
    });

    document.getElementById('total-calories').textContent = totalCalories;
}

// Функція для генерації рандомного меню
function generateRandomMenu() {
    const selectedDay = document.getElementById('selected-day').textContent;
    menuData[selectedDay] = [];

    for (let i = 0; i < 3; i++) {
        const randomMeal = randomMeals[Math.floor(Math.random() * randomMeals.length)];
        menuData[selectedDay].push(randomMeal);
    }

    updateMenuDisplay(selectedDay);
    saveToLocalStorage();
}

// Функція для додавання власної страви
function addCustomMeal() {
    const selectedDay = document.getElementById('selected-day').textContent;
    const mealName = document.getElementById('meal-input').value;
    const calories = parseInt(document.getElementById('calories-input').value);

    if (mealName && calories) {
        menuData[selectedDay].push({ name: mealName, calories: calories });

        document.getElementById('meal-input').value = '';
        document.getElementById('calories-input').value = '';

        updateMenuDisplay(selectedDay);
        saveToLocalStorage();
    } else {
        alert('Будь ласка, введіть назву страви та кількість калорій');
    }
}

// Збереження даних у localStorage
function saveToLocalStorage() {
    localStorage.setItem('menuData', JSON.stringify(menuData));
}

// Завантаження даних з localStorage
function loadFromLocalStorage() {
    const storedData = localStorage.getItem('menuData');
    if (storedData) {
        menuData = JSON.parse(storedData);
        updateMenuDisplay('Понеділок');
    }
}

// Обробник зміни дня тижня
document.querySelectorAll('#day-list li').forEach((li) => {
    li.addEventListener('click', function () {
        const selectedDay = this.getAttribute('data-day');
        document.getElementById('selected-day-title').textContent = selectedDay;
        document.getElementById('selected-day').textContent = selectedDay;
        updateMenuDisplay(selectedDay);
    });
});

// Обробники для кнопок
document.getElementById('generate-menu').addEventListener('click', generateRandomMenu);
document.getElementById('add-meal').addEventListener('click', addCustomMeal);

// Ініціалізація
loadFromLocalStorage();
updateMenuDisplay('Понеділок');
