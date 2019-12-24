
document.addEventListener( "plusready",  function()
{
    var _BARCODE = 'plugintest',
        B = window.plus.bridge;
    var plugintest =
    {
        PluginTestFunction : function (Argus, successCallback, errorCallback )
        {
            var success = typeof successCallback !== 'function' ? null : function(args)
            {
                successCallback(args);
            },
            fail = typeof errorCallback !== 'function' ? null : function(code)
            {
                errorCallback(code);
            };
            callbackID = B.callbackId(success, fail);
            return B.exec(_BARCODE, "PluginTestFunction", [callbackID, Argus]);
        },
        //注册拉起回调
                registerWakeUpHandler: function (Argus,successCallback, errorCallback) {
                    var success = typeof successCallback !== 'function' ? null : function(args)
                                         {
                                             successCallback(args);
                                         },
                                         fail = typeof errorCallback !== 'function' ? null : function(code)
                                         {
                                             errorCallback(code);
                                         };
                                         callbackID = B.callbackId(success, fail);
                                       return B.exec(_BARCODE, "registerWakeUpHandler",  [callbackID, Argus]);
                },
         PluginNotification : function(Argus,successCallback, errorCallback) {
         var success = typeof successCallback !== 'function' ? null : function(args)
                     {
                         successCallback(args);
                     },
                     fail = typeof errorCallback !== 'function' ? null : function(code)
                     {
                         errorCallback(code);
                     };
                     callbackID = B.callbackId(success, fail);
                   return B.exec(_BARCODE, "PluginNotification",  [callbackID, Argus]);
                },

              PluginTestJwd : function(Argus,successCallback, errorCallback) {
                         var success = typeof successCallback !== 'function' ? null : function(args)
                                    {
                                         successCallback(args);
                                     },
                                     fail = typeof errorCallback !== 'function' ? null : function(code)
                                     {
                                         errorCallback(code);
                                     };
                                     callbackID = B.callbackId(success, fail);
                                   return B.exec(_BARCODE, "PluginTestJwd",  [callbackID, Argus]);
                                },
            PluginHideKeyboard : function(Argus,successCallback, errorCallback) {
                          var success = typeof successCallback !== 'function' ? null : function(args)
                                  {
                                          successCallback(args);
                                    },
                             fail = typeof errorCallback !== 'function' ? null : function(code)
                            {
                             errorCallback(code);
                          };
                              callbackID = B.callbackId(success, fail);
                       return B.exec(_BARCODE, "PluginHideKeyboard",  [callbackID, Argus]);
                           }
    };
    window.plus.plugintest = plugintest;
}, true );