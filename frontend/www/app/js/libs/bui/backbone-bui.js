Backbone.BUI = (function (Backbone, _, $, require) {

    var BUI = {};
    BUI.Config = {};

    /* Get current configuration path by getting main library script entry  */
    /* This requires that backbone-bui keeps the same                       */
    /* We can always change its default location on the class options       */
    BUI.Config.PATH = (function () {
        var sc = $('script[src*="backbone-bui"]').attr('src');
        return sc.length ? sc.substr(0, sc.lastIndexOf('/') + 1) : '';
    }());

    BUI.Config.REDACTOR = BUI.Config.PATH + 'redactor/';
    BUI.Config.BOOTSTRAP = BUI.Config.PATH + 'bootstrap/';
    BUI.Config.JQUERYUI = BUI.Config.PATH + 'jquery-ui/';

    /*
     BUI Loader
     Utility to load asset libraries
     */
    BUI.Loader = {
        jqueryUICore:'jquery.ui.core',
        jqueryUIWidget:'jquery.ui.widget',
        jqueryUIMouse:'jquery.ui.mouse',
        jqueryUIPosition:'jquery.ui.position',
        jqueryUIAutocomplete:'jquery.ui.autocomplete',
        jqueryUIDatepicker:'jquery.ui.datepicker',
        jqueryUIDraggable:'jquery.ui.draggable',
        jqueryUIDroppable:'jquery.ui.droppable',
        jqueryUISortable:'jquery.ui.sortable',
        jqueryUISlider:'jquery.ui.slider',

        bootstrapAlert:'bootstrap-alert.js',
        bootstrapButton:'bootstrap-button.js',
        bootstrapCarousel:'bootstrap-carousel.js',
        bootstrapCollapse:'bootstrap-collapse.js',
        bootstrapDropdown:'bootstrap-dropdown.js',
        bootstrapModal:'bootstrap-modal.js',
        boostrapScrollspy:'bootstrap-scrollspy.js',
        boostrapTag:'bootstrap-tab.js',
        bootstrapTooltip:'bootstrap-tooltip.js',
        bootstrapPopover:'bootstrap-popover.js',
        bootstrapTransition:'bootstrap-transition.js',
        bootstrapTypeahead:'bootstrap-typeahead.js',

        redactorEditor:'redactor.js',

        loadAll:function (path, callback) {

            var libs = this._getLibs.apply(this, [path]);

            require(libs, callback || $.noop);
        },

        load:function (libs, path, callback) {
            libs = libs ? (!_.isArray(libs) ? [libs] : libs) : [];

            libs = _.filter(this._getLibs.apply(this, [path]), function (l) {
                return _.include(libs, l.substr(l.lastIndexOf('/') + 1));
            });

            require(libs, callback || $.noop);

        },
        loadCss:function (url) {
            if ($('link[href="' + url + '"]').length) {
                // library already loaded, return
                return;
            }
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },
        _getLibs:function (path) {
            path = path || BUI.Config.BOOTSTRAP;

            var filtered = _.values(_.filter(this, function (k) {
                return !_.isFunction(k);
            }));

            return _.map(filtered, function (v) {
                return path + v;
            })
        }
    };

    /*
     Templates object has a reference to the different templates used by the library
     */
    var Templates = {};

    Templates.Alert = {};
    Templates.Alert.ButtonClose = '<a class="close" data-dismiss="alert">×</a>';

    Templates.Modal = '<div class="modal-header">' +
        '<a class="close" data-dismiss="modal">x</a><h3><%=header%></h3></div>' +
        '<div class="modal-body"><p><%=body%></p></div>' +
        '<div class="modal-footer"></div>';

    Templates.Accordion = {};
    Templates.Accordion.Group = '<div class="accordion-group">' +
        '<div class="accordion-heading">' +
        '<a class="accordion-toggle" data-toggle="collapse" data-parent="<%=parent%>" href="#<%=id%>"><%=header%></a> ' +
        '</div>' +
        '<div id="<%=id%>" class="accordion-body collapse">' +
        '<div class="accordion-inner"><%=content%></div>' +
        '</div>' +
        '</div>';

    /* configuration options */
    _.extend(BUI.Config, {
            States:{
                DISABLED:'disabled',
                ACTIVE:'active'
            }
        },
        /* button specific options */
        {
            Button:{
                Styles:{
                    DEFAULT:'btn-default',
                    PRIMARY:'btn-primary',
                    INFO:'btn-info',
                    SUCCESS:'btn-success',
                    WARNING:'btn-warning',
                    DANGER:'btn-danger',
                    INVERSE:'btn-inverse'
                },
                Sizes:{
                    LARGE:'btn-large',
                    SMALL:'btn-small',
                    MIN:'btn-mini'
                }
            }});


    /* button view object */
    BUI.Button = Backbone.View.extend({

        tagName:'a',
        className:'btn',

        initialize:function (options, events) {
            /* we could use a configuration object instead */
            this._config = _.extend({
                ctype:BUI.Config.Button.Styles.DEFAULT,
                label:'Button',
                size:null,
                state:null,
                renderTo:null
            }, options);

            this.attributes = _.extend(this.attributes, options.attributes || {});
            this.events = _.extend({}, events || {});

            /*
             in order to apply unique styles to own element
             we use HTML5 attribute types
             */
            if (typeof this.id === 'undefined') {
                /* make sure it is unique */
                this.el.id = this.cid;
            }
            this._styles.apply(this);


        },
        render:function () {
            if (this.tagName.match(/input/i)) {
                this.$el.attr({value:this._config.label});
            }
            else {
                this.$el.text(this._config.label);
            }

            if (this._config.renderTo && this._config.renderTo.jquery) {
                this._config.renderTo.append(this.el);
            }

            return this;
        },

        close:function () {
            this.undelegateEvents();
        },

        _styles:function () {
            var conf = _.compact([this._getType.apply(this._config), this._getState.apply(this._config), this._getSize.apply(this._config)]);
            if (conf.length) {
                this.$el.addClass(conf.join(' '));

            }
        },

        _getType:function () {
            return  _.indexOf(_.values(BUI.Config.Button.Styles), this.ctype) >= 0 ? this.ctype : '';
        },

        _getState:function () {
            return  _.indexOf(_.values(BUI.Config.States), this.state) >= 0 ? this.state : '';
        },

        _getSize:function () {
            return  _.indexOf(_.values(BUI.Config.Button.Sizes), this.size) >= 0 ? this.size : '';
        }
    });

    /* alerts */
    _.extend(BUI.Config, {
        Alert:{
            DEFAULT:'',
            ERROR:'alert-error',
            SUCCESS:'alert-success',
            INFO:'alert-info',
            BLOCK:'alert-block'
        }
    });

    BUI.Alert = Backbone.View.extend({
        className:'alert',

        initialize:function (options) {
            this._config = _.extend({
                bootstrapAlert:BUI.Loader.bootstrapAlert,
                bootstrapPath:BUI.Config.BOOTSTRAP,
                ctype:BUI.Config.Alert.DEFAULT,
                onClose:$.noop,
                onShow:$.noop,
                renderTo:null,
                title:null,
                message:'Alert',
                closeButton:true,
                timeout:5000
            }, options);

            if (typeof this.id === 'undefined') {
                /* make sure it is unique */
                this.el.id = this.cid;
            }

            this._styles.apply(this);

        },
        render:function () {
            var that = this;

            BUI.Loader.load([this._config.bootstrapAlert], this._config.bootstrapPath, function () {
                if (that._config.closeButton) {
                    that.$el.append(Templates.Alert.ButtonClose);
                }
                that.$el.append(that._getTitle.apply(that._config));
                that.$el.append(that._config.message);

                if (that._config.renderTo && that._config.renderTo.jquery) {
                    that._config.renderTo.append(that.el);
                }
                if (_.isFunction(that.onShow)) {
                    that.onShow();
                }
                if (_.isNumber(that._config.timeout) && that._config.timeout > 0) {
                    setTimeout(function () {
                        that.$el.fadeOut('slow', function () {
                            that.close();
                        });
                    }, 5000);
                }
                return that;
            });
        },
        close:function () {
            this.clear.apply(this);

            if (_.isFunction(this.onClose)) {
                this.onClose();
            }
        },

        clear:function () {
            this.undelegateEvents();
            this.remove();
        },
        _styles:function () {
            var conf = _.compact([this._getType.apply(this._config), this._getIsBlock.apply(this)]);
            if (conf.length) {
                this.$el.addClass(conf.join(' '));
            }
        },
        _getIsBlock:function () {
            return (this._getTitle.apply(this)).length ? BUI.Config.Alert.BLOCK : '';
        },
        _getType:function () {
            return  _.indexOf(_.values(BUI.Config.Alert), this.ctype) >= 0 ? this.ctype : '';
        },
        _getTitle:function () {
            return !_.isNull(this.title) ? '<h4 class="alert-heading">' + this.title + '</h4>' : '';
        }
    });

    /* modal dialogs */
    _.extend(BUI.Config, {
        Modal:{
            ALERT:'modal-alert',
            CONFIRM:'modal-confirm'
        }
    });

    BUI.Modal = Backbone.View.extend({
        id:'modal',
        className:'modal',

        initialize:function (options) {
            this._config = _.extend({
                bootstrapModal:BUI.Loader.bootstrapModal,
                bootstrapPath:BUI.Config.BOOTSTRAP,
                ctype:BUI.Config.Modal.ALERT,
                confirmLabel:null,
                cancelLabel:null,
                onConfirm:$.noop,
                onCancel:$.noop,
                onShow:$.noop,
                onHide:$.noop,
                header:'Modal',
                body:'Backbone BUI',
                backdrop:true,
                keyboard:true
            }, options);

            if (typeof this.id === 'undefined') {
                /* make sure it is unique */
                this.el.id = this.cid;
            }

            this._styles.apply(this);
        },

        render:function () {
            var that = this;

            BUI.Loader.load([this._config.bootstrapModal], this._config.bootstrapPath, function () {
                var options = {
                    header:that._config.header,
                    body:that._config.body
                };
                that.$el.html(_.template(Templates.Modal, options));

                var confirmBtn = null;
                var cancelBtn = new BUI.Button({
                    label:that._config.cancelLabel,
                    renderTo:that.$('.modal-footer')
                }, {
                    'click':function () {
                        that.cancel.apply(that);
                    }
                });

                cancelBtn.render();

                if (that._config.ctype === BUI.Config.Modal.CONFIRM) {
                    confirmBtn = new BUI.Button({
                        label:that._config.confirmLabel,
                        ctype:BUI.Config.Button.Styles.PRIMARY,
                        renderTo:that.$('.modal-footer')
                    }, {
                        'click':function () {
                            that.confirm.apply(that);
                        }
                    });

                    confirmBtn.render();
                }

                if (_.isFunction(that._config.onShow)) {
                    that.$el.on('show', that._config.onShow);
                }

                that.$el.on('hidden', function () {
                    console.log('Hidden From Modal');

                    if (_.isFunction(that._config.onHide)) {
                        that._config.onHide();
                    }
                    confirmBtn && confirmBtn.close();
                    cancelBtn && cancelBtn.close();
                })

                that.$el.modal('show');
            });
        },

        confirm:function (e) {
            e && e.preventDefault();

            var close = true;
            if (_.isFunction(this._config.onConfirm)) {
                close = this._config.onConfirm();  /* if we return false we wish to cancel the closing */
            }
            if(close)
            {
                this.close.apply(this);
            }

        },

        cancel:function (e) {
            e && e.preventDefault();

            if (_.isFunction(this._config.onCancel)) {
                this._config.onCancel();
            }

            this.close.apply(this);
        },

        close:function () {

            this.$el.modal('hide');
            this.undelegateEvents();
            this.remove();
        },

        _styles:function () {
            if (this._config.ctype === BUI.Config.Modal.ALERT) {
                this._config.cancelLabel = this._config.cancelLabel || 'Ok';
            }
            if (this._config.ctype === BUI.Config.Modal.CONFIRM) {
                this._config.cancelLabel = this._config.cancelLabel || 'Cancel';
                this._config.confirmLabel = this._config.confirmLabel || 'Confirm';
            }
        }
    });

    /* accordion */

    BUI.Accordion = Backbone.View.extend({
        className:'accordion',
        _ajaxContent:[],
        initialize:function (options) {
            this._config = _.extend({
                bootstrapCollapse:BUI.Loader.bootstrapCollapse,
                bootstrapPath:BUI.Config.BOOTSTRAP,
                groups:[
                    {
                        /*id:_.uniqueId(),*/ /* ids should be placed */
                        header:'Collapsible Group',
                        content:'This is default content'
                    }
                ],
                renderTo:null
            }, options);

            if (typeof this.id === 'undefined') {
                this.el.id = this.cid;
            }

            this._config.groups = this._buildGroups.apply(this);
        },

        render:function () {

            var that = this;

            BUI.Loader.load([this._config.bootstrapCollapse], this._config.bootstrapPath, function () {

                that.$el.append(that._config.groups.join(''));

                /* get ajax contents */
                _.each(that._ajaxContent, function (c) {
                    $.get(c.source).then(function (r) {
                        that.$('#' + c.id).find('span.groupajaxcontent').replaceWith(r);
                    }, function () {
                        that.$('#' + c.id).find('span.groupajaxcontent').replaceWith('AJAX call failed...');
                    });

                });

                if (that._config.renderTo && that._config.renderTo.jquery) {
                    that._config.renderTo.append(that.el);
                }
            });
        },

        _buildGroups:function () {
            var that = this;
            var temp = _.template(Templates.Accordion.Group);


            return _.map(this._config.groups, function (g) {
                g.id = g.id || 'group' + _.uniqueId();
                g.parent = that.el.id;
                if (g.source) {
                    /* add pointer to source and group id for later rendering ajax'ed content */
                    that._ajaxContent.push({id:g.id, source:g.source});
                    g.content = '<span class="groupajaxcontent"></span>';
                }
                return temp(g);
            });
        }

    });

    BUI.Redactor = Backbone.View.extend({

        tagName:'textarea',

        initialize:function (options) {
            console.log(this.attributes);
            this._config = _.extend({
                redactorEditor:BUI.Loader.redactorEditor,
                redactorPath:BUI.Config.REDACTOR,
                redactorCSS:'css/redactor.css',
                redactorOptions:{},
                renderTo:null,
                width:'500px'
            }, options);

            if (typeof this.id === 'undefined') {
                this.el.id = this.cid;
            }

            BUI.Loader.loadCss(this._config.redactorPath + this._config.redactorCSS);
        },

        render:function () {

            var that = this;

            BUI.Loader.load([this._config.redactorEditor], this._config.redactorPath, function () {

                $wrapper = $('<div style="width:' + that._config.width + '"/>');
                $wrapper.append(that.el);

                if (that._config.renderTo && that._config.renderTo.jquery) {
                    that._config.renderTo.append($wrapper);
                }
                else {
                    $('body').append($wrapper);
                }

                that.$el.redactor(that._config.redactorOptions);
            });
        }

    });

    return BUI;

})(Backbone, _, $, require);