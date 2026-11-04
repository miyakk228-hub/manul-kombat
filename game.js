// Игровые переменные (изначально пустые, значения придут из памяти)
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

// Разделение цифр пробелами
function formatCoins(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Перерисовка текстов и кнопок
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

// Летающий текст +Х
function createFloatingText(x, y, text) {
    const clickText = document.createElement('div');
    clickText.classList.add('floating-click-text');
    clickText.innerText = text;
    clickText.style.left = `${x - 15}px`;
    clickText.style.top = `${y - 20}px`;
    document.body.appendChild(clickText);
    setTimeout(() => { clickText.remove(); }, 600);
}

// Клик по манулу
function processClick(e) {
    coins += clickPower;
    
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches.clientX;
        clientY = e.changedTouches.clientY;
    }
    
    createFloatingText(clientX, clientY, `+${clickPower}`);
    updateUI();
}

if (manulButton) {
    manulButton.addEventListener('click', processClick);
}

// Прокачка клика
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

// Прокачка фермы
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

if (btnAd) {
    btnAd.addEventListener('click', () => {
        showRewardVideoAd();
    });
}

// --- НАДЕЖНАЯ СИСТЕМА СОХРАНЕНИЙ ---
function saveGame() {
    const gameData = { coins, clickPower, passiveIncome, upgClickCost, upgClickLevel, upgFarmCost, upgFarmLevel };
    localStorage.setItem('manulKombatUltimateSave_v3', JSON.stringify(gameData));
    console.log('Прогресс засейвлен!');
}

function loadGame() {
    const savedData = localStorage.getItem('manulKombatUltimateSave_v3');
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
            console.log('Данные успешно восстановлены!');
        } catch (e) {
            console.error('Ошибка чтения памяти:', e);
        }
    }
    updateUI();
}

// СНАЧАЛА ЗАГРУЖАЕМ ДАННЫЕ И ОБНОВЛЯЕМ ЭКРАН
loadGame();

// ТОЛЬКО ПОСЛЕ ЗАГРУЗКИ ЗАПУСКАЕМ ТАЙМЕРЫ ДОХОДА И АВТОСОХРАНЕНИЯ
setInterval(() => {
    coins += passiveIncome;
    updateUI();
}, 1000);

setInterval(saveGame, 4000);

// --- ИНТЕГРАЦИЯ ЯНДЕКС РЕКЛАМЫ ---
let ysdkContext = null;
if (typeof YaGames !== 'undefined') {
    YaGames.init().then(ysdk => {
        ysdkContext = ysdk;
        ysdk.adv.showFullscreenAdv({ callbacks: {} });
    });
    setInterval(() => { if (ysdkContext) ysdkContext.adv.showFullscreenAdv({ callbacks: {} }); }, 120000);
}

function showRewardVideoAd() {
    if (ysdkContext) {
        ysdkContext.adv.showRewardedVideo({
            callbacks: {
                onRewarded: () => { coins += 500; saveGame(); updateUI(); }
            }
        });
    } else {
        coins += 500;
        saveGame();
        updateUI();
        createFloatingText(window.innerWidth / 2, window.innerHeight / 2, "+500 Бонус!");
    }
}







