function showNotification(message, link) {
    var container = document.getElementById('notifications-container');

    var popup = document.createElement('div');
    popup.className = 'notification';

    var messageElement = document.createElement('span');
    messageElement.textContent = message;
    popup.appendChild(messageElement);

    var linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = link;
    linkElement.target = '_blank';
    popup.appendChild(linkElement);

    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
        container.removeChild(popup);
    };
    popup.appendChild(closeButton);

    container.appendChild(popup);

    setTimeout(function() {
        if (popup.parentNode) {
            container.removeChild(popup);
        }
    }, 2000);
}
