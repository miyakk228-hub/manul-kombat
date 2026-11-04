// Игровые переменные
let coins = 0;          
let clickPower = 1;     
let passiveIncome = 0;  

let upgClickCost = 10;
let upgClickLevel = 1;
let upgFarmCost = 50;
let upgFarmLevel = 0;

// Элементы интерфейса
const balanceText = document.getElementById('balance-text');
const statsText = document.getElementById('stats-text');
const manulButton = document.getElementById('manul-button');

const btnClick = document.getElementById('btn-click');
const btnFarm = document.getElementById('btn-farm');
const btnAd = document.getElementById('btn-ad');

const lblClickLvl = document.getElementById('lbl-click-lvl');
const lblClickCost = document.getElementById('lbl-click-cost');
const lblFarmLvl = document.getElementById('lbl-farm-lvl');
const lblFarmCost = document.getElementById('lbl-farm-cost');

// Красивое разделение цифр пробелами (например: 1 000 000)
function formatCoins(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Перерисовка текстов и кнопок на экране
function updateUI() {
    if (balanceText) balanceText.innerText = formatCoins(coins);
    if (statsText) statsText.innerText = `Клик: +${clickPower} | Секунда: +${passiveIncome}`;
    
    if (lblClickLvl) lblClickLvl.innerText = upgClickLevel;
    if (lblClickCost) lblClickCost.innerText = formatCoins(upgClickCost);
    if (lblFarmLvl) lblFarmLvl.innerText = upgFarmLevel;
    if (lblFarmCost) lblFarmCost.innerText = formatCoins(upgFarmCost);
    
    if (btnClick) btnClick.disabled = coins < upgClickCost;
    if (btnFarm) btnFarm.disabled = coins < upgFarmCost;
}

// Создание летающего текста +Х над экраном
function createFloatingText(x, y, text) {
    const clickText = document.createElement('div');
    clickText.classList.add('floating-click-text');
    clickText.innerText = text;
    clickText.style.left = `${x - 15}px`;
    clickText.style.top = `${y - 20}px`;
    document.body.appendChild(clickText);
    setTimeout(() => { clickText.remove(); }, 600);
}

// Клик по главному коту
function processClick(e) {
    coins += clickPower;
    
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    // Поддержка тач-скринов смартфонов
    if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
    }
    
    createFloatingText(clientX, clientY, `+${clickPower}`);
    updateUI();
}

if (manulButton) {
    manulButton.addEventListener('click', processClick);
}

// Покупка силы клика (увеличивается бесконечно и равна уровню)
if (btnClick) {
    btnClick.addEventListener('click', () => {
        if (coins >= upgClickCost) {
            coins -= upgClickCost;
            upgClickLevel += 1;
            clickPower = upgClickLevel;
            upgClickCost = Math.floor(upgClickCost * 1.5);
            saveGame();
            updateUI();
        }
    });
}

// Покупка майнинг-фермы
if (btnFarm) {
    btnFarm.addEventListener('click', () => {
        if (coins >= upgFarmCost) {
            coins -= upgFarmCost;
            passiveIncome += 2;
            upgFarmLevel += 1;
            upgFarmCost = Math.floor(upgFarmCost * 1.6);
            saveGame();
            updateUI();
        }
    });
}

// Клик по золотой кнопке рекламного бонуса
if (btnAd) {
    btnAd.addEventListener('click', () => {
        showVKRewardVideoAd();
    });
}

// Таймер пассивного секундного дохода
setInterval(() => {
    coins += passiveIncome;
    updateUI();
}, 1000);

// --- НАДЕЖНАЯ СИСТЕМА СОХРАНЕНИЙ ---
function saveGame() {
    const gameData = { coins, clickPower, passiveIncome, upgClickCost, upgClickLevel, upgFarmCost, upgFarmLevel };
    localStorage.setItem('manulKombatVK_save_final', JSON.stringify(gameData));
    console.log('Прогресс успешно сохранен!');
}

function loadGame() {
    const savedData = localStorage.getItem('manulKombatVK_save_final');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            coins = Number(data.coins) || 0; 
            clickPower = Number(data.clickPower) || 1; 
            passiveIncome = Number(data.passiveIncome) || 0;
            upgClickCost = Number(data.upgClickCost) || 10; 
            upgClickLevel = Number(data.upgClickLevel) || 1;
            upgFarmCost = Number(data.upgFarmCost) || 50; 
            upgFarmLevel = Number(data.upgFarmLevel) || 0;
        } catch (e) {
            console.error('Ошибка чтения локальной памяти:', e);
        }
    }
    updateUI();
}

// --- ИНТЕГРАЦИЯ VK РЕКЛАМЫ ---
if (typeof vkBridge !== 'undefined') {
    vkBridge.send('VKWebAppInit').then(() => {
        loadGame(); // Сначала загружаем данные из памяти
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' }).catch(e => console.log(e));
    });

    setInterval(() => {
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' }).catch(e => console.log(e));
    }, 120000);
} else {
    setTimeout(loadGame, 100);
}

function showVKRewardVideoAd() {
    if (typeof vkBridge !== 'undefined') {
        vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
        .then(data => {
            if (data.result) {
                coins += 500;
                saveGame();
                updateUI();
                alert("Бонус +500 коинов зачислен!");
            }
        }).catch(e => alert("Реклама пока загружается"));
    } else {
        coins += 500;
        saveGame();
        updateUI();
        createFloatingText(window.innerWidth / 2, window.innerHeight / 2, "+500 Бонус!");
    }
}

// Автосохранение каждые 4 секунды
setInterval(saveGame, 4000);
