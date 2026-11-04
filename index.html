<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Manul Kombat</title>
    <!-- ПОДКЛЮЧАЕМ СДК ВКОНТАКТЕ (VK BRIDGE) -->
    <script src="https://unpkg.com"></script>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #0d0d13;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1000px;
        }

        /* Высокотехнологичная кибер-сетка на фоне из чистого CSS */
        .meme-background {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(58, 134, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(58, 134, 255, 0.1) 1px, transparent 1px);
            background-size: 30px 30px;
            background-position: center;
            z-index: 1;
        }

        .game-container {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 420px;
            height: 100%;
            max-height: 750px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 30px 20px;
            box-sizing: border-box;
        }

        /* Стильный баланс */
        .balance-container {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 10px;
        }

        .coin-icon {
            font-size: 46px;
            filter: drop-shadow(0 0 15px #ffbe0b);
            animation: coinFloat 3s ease-in-out infinite;
        }

        #balance-text {
            font-size: 42px;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(255, 190, 11, 0.6);
        }

        .stats-text {
            color: #8a8a9e;
            font-size: 16px;
            margin-top: -15px;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        /* Контейнер кликера */
        .manul-clicker-container {
            position: relative;
            width: 260px;
            height: 260px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* Пульсирующий неоновый круг на фоне */
        .circle-glow {
            position: absolute;
            width: 290px;
            height: 290px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 190, 11, 0.25) 0%, rgba(0,0,0,0) 75%);
            z-index: -1;
            animation: pulseGlow 2s infinite alternate;
        }

        /* Золотой медальон с Манулом из чистого CSS */
        .manul-character {
            width: 230px;
            height: 230px;
            border-radius: 50%;
            background: radial-gradient(circle, #ffbe0b 0%, #d97706 100%);
            border: 8px solid #fff3b0;
            box-shadow: 
                0 0 35px rgba(255, 190, 11, 0.6), 
                inset 0 0 25px rgba(0, 0, 0, 0.4),
                0 10px 20px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: transform 0.08s ease-out;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 120px;
            -webkit-user-select: none;
            user-select: none;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        /* Эффект нажатия */
        .manul-character:active {
            transform: scale(0.90);
        }

        /* Вылетающий текст +Х */
        .floating-click-text {
            position: absolute;
            font-size: 34px;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 2px 10px rgba(0,0,0,1), 0 0 8px #ffbe0b;
            pointer-events: none;
            z-index: 10;
            animation: floatUp 0.6s ease-out forwards;
        }

        /* Кнопки прокачки */
        .shop-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 10px;
        }

        .upgrade-btn {
            width: 100%;
            height: 58px;
            border: none;
            border-radius: 16px;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-family: inherit;
            transition: filter 0.2s, transform 0.1s;
        }

        .upgrade-btn:active { transform: scale(0.98); }
        .upgrade-btn:disabled { filter: brightness(0.35); cursor: not-allowed; opacity: 0.5; }

        .btn-blue { background: linear-gradient(135deg, #3a86ff, #2563eb); color: white; box-shadow: 0 4px 15px rgba(58,134,255,0.3); }
        .btn-green { background: linear-gradient(135deg, #06d6a0, #059669); color: white; box-shadow: 0 4px 15px rgba(6,214,160,0.3); }
        .btn-gold { background: linear-gradient(135deg, #ffbe0b, #d97706); color: #111; font-weight: bold; box-shadow: 0 4px 15px rgba(255,190,11,0.4); }

        .btn-title { font-size: 15px; font-weight: 700; }
        .btn-price { font-size: 12px; opacity: 0.9; margin-top: 2px; }

        /* Анимации */
        @keyframes floatUp {
            0% { opacity: 1; transform: translateY(0) scale(1.1); }
            100% { opacity: 0; transform: translateY(-120px) scale(0.7); }
        }
        @keyframes coinFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
            0% { transform: scale(0.95); opacity: 0.6; }
            100% { transform: scale(1.05); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="meme-background"></div>

    <div class="game-container">
        <div class="balance-container">
            <span class="coin-icon">🪙</span>
            <span id="balance-text">0</span>
        </div>
        
        <div class="stats-text" id="stats-text">Клик: +1 | Секунда: +0</div>

        <div class="manul-clicker-container">
            <div class="circle-glow"></div>
            <!-- Наш крутой маскот прорисован прямо внутри золотого медальона -->
            <div id="manul-button" class="manul-character">🐱</div>
        </div>

        <div class="shop-container">
            <button id="btn-click" class="upgrade-btn btn-blue">
                <span class="btn-title">⚡ Прокачать Клик (Лвл <span id="lbl-click-lvl">1</span>)</span>
                <span class="btn-price">Цена: <span id="lbl-click-cost">10</span></span>
            </button>
            
            <button id="btn-farm" class="upgrade-btn btn-green">
                <span class="btn-title">🖥️ Купить Ферму (Лвл <span id="lbl-farm-lvl">0</span>)</span>
                <span class="btn-price">Цена: <span id="lbl-farm-cost">50</span></span>
            </button>
            
            <button id="btn-ad" class="upgrade-btn btn-gold">
                <span class="btn-title">🎬 Бонус: +500 коинов</span>
                <span class="btn-price">Посмотреть видеоролик</span>
            </button>
        </div>
    </div>

    <script src="game.js"></script>
</body>
</html>
