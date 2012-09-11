define([
    'jquery'
], function($){
    /* http status code and descriptions */
    var HTTP_STATUS = [
        [100, 'Continue'],
        [101, 'Switching Protocols'],
        [200, 'OK'],
        [201, 'Created'],
        [202, 'Accepted'],
        [203, 'Non-Authoritative Information'],
        [204, 'No Content'],
        [205, 'Reset Content'],
        [206, 'Partial Content'],
        [300, 'Multiple Choices'],
        [301, 'Moved Permanently'],
        [302, 'Found'],
        [303, 'See Other'],
        [304, 'Not Modified'],
        [305, 'Use Proxy'],
        [306, '(Unused)'],
        [307, 'Temporary Redirect'],
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [402, 'Payment Required'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [406, 'Not Acceptable'],
        [407, 'Proxy Authentication Required'],
        [408, 'Request Timeout'],
        [409, 'Conflict'],
        [410, 'Gone'],
        [411, 'Length Required'],
        [412, 'Precondition Failed'],
        [413, 'Request Entity Too Large'],
        [414, 'Request-URI Too Long'],
        [415, 'Unsupported Media Type'],
        [416, 'Requested Range Not Satisfiable'],
        [417, 'Expectation Failed'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable'],
        [504, 'Gateway Timeout'],
        [505, 'HTTP Version Not Supported']
    ];
    /* array positions */
    var HTTP_CODE = 0;
    var HTTP_DESC = 1;

    return {
        initialize: function(options){
            $.ajaxSetup(options);
        },
        isUnAuthorized:function(number){
            number = parseInt(number) || 0;

            return number === 401 || number === 400;
        },
        onAjaxError: function(callback, statusCodes)
        {
            if(statusCodes === undefined)
            {
                statusCodes = [400,401,402,403,404,405,406,407,408,409,411,412,413,414,415,416,417,500,501,502,503,504,505];
            }
            $(document).ajaxError(function(e, jqXhr, settings, exception){
                  if($.inArray(jqXhr.status,statusCodes) && typeof callback === 'function')
                  {
                      callback(jqXhr.status);
                  }
            });
            return this;
        },

        onAjaxStart: function(callback){
            if($.isFunction(callback))
            {
                $(document).ajaxStart(callback);
            }
            return this;
        },

        onAjaxComplete: function(callback){
            if($.isFunction(callback))
            {
                $(document).ajaxComplete(callback);
            }
            return this;
        },

        getStatusDescription: function(statusCode)
        {
            var j=0;
            for(i=0,cnt=HTTP_STATUS.length;i<cnt;i++)
            {
                if(HTTP_STATUS[i][HTTP_CODE]==statusCode)
                {
                    return HTTP_STATUS[i][HTTP_DESC];
                }
            }
            return false;
        }
    };
});
