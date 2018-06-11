var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (message) {
    var date = new Date(message.createdAt);
    var minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    var formattedTime = date.getHours() + ':' + minutes;
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var date = new Date(message.createdAt);
    var minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
    var formattedTime = date.getHours() + ':' + minutes;
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();
    var messageInput = jQuery('[name=message]');
    if (messageInput.val().trim() === '') {
        messageInput.trigger('focus');
        return;
    }
    socket.emit('createMessage', {
        from: 'User',
        text: messageInput.val()
    }, function () {
        messageInput.val('');
        messageInput.trigger('focus');
    })
});

var locationBtn = jQuery('#send-location');

locationBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationBtn.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationBtn.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}