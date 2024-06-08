function showNotification(message, link) {
    var popup = document.getElementById('notification-popup');
    var messageElement = document.getElementById('notification-message');
    var linkElement = document.getElementById('notification-link');

    messageElement.textContent = message;
    linkElement.href = link;

    popup.classList.remove('hidden');
}

function closeNotification() {
    var popup = document.getElementById('notification-popup');
    popup.classList.add('hidden');
}
