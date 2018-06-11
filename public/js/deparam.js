(function ($) {
    $.deparam = $.deparam || function (uri) {
        if (uri === undefined) {
            uri = window.location.search;
        }
        var queryString = {};
        var query = uri.replace(/\+/g, '%20');
        query = query.replace(/^\?/, '');
        query = decodeURIComponent(query);
        var items = query.split('&');
        for (var i = 0; i < items.length; i++) {
            var piece = items[i].split('=');
            queryString[piece[0]] = piece[1];
        }
        return queryString;
    };
})(jQuery);
