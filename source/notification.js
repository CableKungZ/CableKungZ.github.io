function showNotification(message, link) {
    var container = document.getElementById('notifications-container');

    var popup = document.createElement('div');
    popup.className = 'notification';

    var messageElement = document.createElement('span');
    messageElement.textContent = message;
    popup.appendChild(messageElement);

    if (link) {
        var linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = link;
        linkElement.target = '_blank';
        popup.appendChild(linkElement);
    }

    var progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    popup.appendChild(progressBar);

    container.appendChild(popup);

    var duration = 5000;
    var step = 10;
    var decrement = 100 / (duration / step);
    var width = 100;

    var interval = setInterval(function() {
        width -= decrement;
        progressBar.style.width = width + '%';
        if (width <= 0) {
            clearInterval(interval);
            if (popup.parentNode) {
                container.removeChild(popup);
            }
        }
    }, step);

    setTimeout(function() {
        clearInterval(interval);
        if (popup.parentNode) {
            container.removeChild(popup);
        }
    }, duration);
}
