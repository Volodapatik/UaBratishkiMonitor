const { GameDig } = require('gamedig');

console.log("🔍 Спроба №3: Шукаємо через counterstrike16...");

GameDig.query({
    type: 'counterstrike16', 
    host: '91.211.118.77',
    port: 27040,
    socketTimeout: 5000
}).then((state) => {
    console.log("✅ Є КОНТАКТ!");
    console.log("🎮 Назва:", state.name);
    console.log("👥 Гравці:", state.players.length, "/", state.maxplayers);
}).catch((error) => {
    console.log("❌ Знову помилка.");
    console.log("Текст помилки:", error.message);
    
    console.log("\n💡 ДАВАЙ ПЕРЕВІРИМО, ЩО ТВОЯ БІБЛІОТЕКА ВЗАГАЛІ ПІДТРИМУЄ:");
    // Спробуємо вивести список ігор, якщо метод доступний
    try {
        const types = require('gamedig/lib/games.json'); 
        console.log("Доступні типи ігор (перші 10):", Object.keys(types).slice(0, 10).join(', '));
    } catch(e) {
        console.log("Не вдалося вивести список ігор.");
    }
});
