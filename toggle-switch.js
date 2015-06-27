var toggleSwitch = angular.module('toggleSwitch', []);
toggleSwitch
    .directive('toggleSwitch', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '=?',
                tsToggleChange: '&?',
                tsToggleClick: '&?',
                val: '=ngModel',
                tsDefault: '=?',
                tsTrueVal: '=?',
                tsFalseVal: '=?',
                tsNullVal: '=?',
                tsWidth: '=?',
                tsHeight: '=?',
                tsTrueTip: '=?',
                tsFalseTip: '=?',
                tsNullTip: '=?',
                borderRadius: '=?'
            },
            template: '<div class="toggle-switch-wrap" ng-style="styleWrap" ng-class="{\'vertical\': vertical}"><div class="toggle-switch-switch" ng-style="styleSwitch" ng-class="{\'true\': val==tsTrueVal, \'false\': val==tsFalseVal}" ng-click="toggle()"><div class="toggle-switch-false"></div><div class="toggle-switch-true"></div><div class="toggle-switch-handle" ng-style="styleHandle"></div></div><div class="toggle-switch-tooltip" ng-show="tooltip"><span ng-class="{\'active\': showTooltip1}"><span ng-show="tooltip1"></span>{{tooltip1}}&nbsp;&bull;</span><br ng-show="triToggle"><span ng-class="{\'active\': showTooltip2}" ng-show="triToggle"><span ng-show="tooltip2"></span>{{tooltip2}}&nbsp;&bull;</span><br><span ng-class="{\'active\': showTooltip3}"><span ng-show="tooltip3"></span>{{tooltip3}}&nbsp;&bull;</span></div></div>',
            link: function(scope, element, attrs) {

                /* Catch Config, allow attr overrides */

                if (angular.isDefined(scope.config)) {

                    /* Tri-toggle Setting */

                    if (angular.isDefined(scope.config.triToggle) && !angular.isDefined(attrs.triToggle)) {
                        if (scope.config.triToggle) {
                            attrs.triToggle = scope.config.triToggle;
                        }
                    }

                    /* ngToggleChange Function */
                    if (angular.isDefined(scope.config.change) && !angular.isDefined(attrs.tsToggleChange)) {
                        scope.tsToggleChange = scope.config.change;
                    }

                    /* ngToggleClick Function */

                    if (angular.isDefined(scope.config.click) && !angular.isDefined(attrs.tsToggleClick)) {
                        scope.tsToggleClick = scope.config.click;
                    }

                    /* Model Binding */

                    if (angular.isDefined(scope.config.val) && !angular.isDefined(attrs.val)) {
                        scope.val = scope.config.val;
                    }

                    /* Default Value */

                    if (angular.isDefined(scope.config.default) && !angular.isDefined(attrs.tsDefault)) {
                        scope.tsDefault = scope.config.default;
                    }

                    /* Values */

                    if (angular.isDefined(scope.config.trueVal) && !angular.isDefined(attrs.tsTrueVal)) {
                        scope.tsTrueVal = scope.config.trueVal;
                    }
                    if (angular.isDefined(scope.config.falseVal) && !angular.isDefined(attrs.tsFalseVal)) {
                        scope.tsFalseVal = scope.config.falseVal;
                    }
                    if (angular.isDefined(scope.config.nullVal) && !angular.isDefined(attrs.tsNullVal)) {
                        scope.tsNullVal = scope.config.nullVal;
                    }

                    /* Width & Height */

                    if (angular.isDefined(scope.config.width) && !angular.isDefined(attrs.tsWidth)) {
                        scope.tsWidth = scope.config.width;
                    }
                    if (angular.isDefined(scope.config.height) && !angular.isDefined(attrs.tsHeight)) {
                        scope.tsHeight = scope.config.height;
                    }

                    /* Custom Colors */

                    if (angular.isDefined(scope.config.falseColor) && !angular.isDefined(attrs.tsFalseColor)) {
                        attrs.nsFalseColor = scope.config.falseColor;
                    }
                    if (angular.isDefined(scope.config.nullColor) && !angular.isDefined(attrs.tsNullColor)) {
                        attrs.tsNullColor = scope.config.nullColor;
                    }
                    if (angular.isDefined(scope.config.trueColor) && !angular.isDefined(attrs.tsTrueColor)) {
                        attrs.tsTrueColor = scope.config.trueColor;
                    }

                    /* Vertical Setting */

                    if (angular.isDefined(scope.config.vertical) && !angular.isDefined(attrs.vertical)) {
                        attrs.vertical = scope.config.vertical;
                    }

                    /* ToolTips */

                    if (angular.isDefined(scope.config.trueTip) && !angular.isDefined(attrs.tsTrueTip)) {
                        scope.tsTrueTip = scope.config.trueTip;
                    }
                    if (angular.isDefined(scope.config.falseTip) && !angular.isDefined(attrs.tsFalseTip)) {
                        scope.tsFalseTip = scope.config.falseTip;
                    }
                    if (angular.isDefined(scope.config.nullTip) && !angular.isDefined(attrs.tsNullTip)) {
                        scope.tsNullTip = scope.config.nullTip;
                    }
                    if (!angular.isDefined(scope.tsTrueTip) && !angular.isDefined(attrs.tsFalseTip) && !angular.isDefined(attrs.tsNullTip)) {
                        scope.tooltip = false;
                    } else {
                        scope.tooltip = true;
                    }

                    /* Border Radius */

                    if (angular.isDefined(scope.config.borderRadius) && !angular.isDefined(attrs.borderRadius)) {
                        scope.borderRadius = scope.config.borderRadius;
                    }
                }

                /* Default Styling */

                scope.triToggle = false;
                scope.vertical = false;
                scope.styleWrap = {};
                scope.styleSwitch = {};
                scope.styleHandle = {};

                /* Is TriToggle? */

                if (angular.isDefined(attrs.triToggle)) {
                    scope.triToggle = true;
                }

                /* Custom Container Size */

                if (angular.isDefined(scope.tsWidth)) {
                    scope.styleWrap.width = scope.tsWidth + 6 + 'px';
                }
                if (angular.isDefined(scope.tsHeight)) {
                    scope.styleWrap.height = scope.tsHeight + 6 + 'px';
                }

                /* Custom Switch and Handle Size */

                if (angular.isDefined(attrs.vertical) && attrs.vertical) {

                    scope.vertical = true;

                    scope.tooltip1 = scope.tsTrueTip;
                    scope.tooltip2 = scope.tsNullTip;
                    scope.tooltip3 = scope.tsFalseTip;

                    if (angular.isDefined(scope.tsWidth)) {
                        scope.styleSwitch.height = scope.tsWidth + 'px';
                        scope.styleHandle.height = scope.tsWidth - 6 + 'px';
                    }
                    if (angular.isDefined(scope.tsHeight)) {
                        scope.styleSwitch.width = scope.tsHeight + 'px';
                        scope.styleHandle.width = scope.tsHeight * 0.428 + 'px';
                    }
                } else {

                    scope.tooltip1 = scope.tsFalseTip;
                    scope.tooltip2 = scope.tsNullTip;
                    scope.tooltip3 = scope.tsTrueTip;

                    if (angular.isDefined(scope.tsWidth)) {
                        scope.styleSwitch.width = scope.tsWidth + 'px';
                        scope.styleHandle.width = scope.tsWidth * 0.428 + 'px';
                    }
                    if (angular.isDefined(scope.tsHeight)) {
                        scope.styleSwitch.height = scope.tsHeight + 'px';
                        scope.styleHandle.height = scope.tsHeight - 6 + 'px';
                    }
                }

                /* Custom Border Radii */

                if (angular.isDefined(scope.borderRadius)) {
                    scope.styleSwitch['border-radius'] = scope.borderRadius + 'px';
                    scope.styleHandle['border-radius'] = scope.borderRadius + 'px';
                } else {
                    if (angular.isDefined(scope.tsWidth) && angular.isDefined(scope.tsHeight)) {
                        if (scope.tsWidth <= scope.tsHeight) {
                            scope.styleSwitch['border-radius'] = (scope.tsHeight + 6) / 2 + 'px';
                            scope.styleHandle['border-radius'] = scope.tsHeight / 2 + 'px';
                        } else {
                            scope.styleSwitch['border-radius'] = (scope.tsWidth + 6) / 2 + 'px';
                            scope.styleHandle['border-radius'] = scope.tsWidth / 2 + 'px';
                        }
                    } else if (angular.isDefined(scope.tsWidth)) {
                        if (scope.tsWidth <= 30) {
                            scope.styleSwitch['border-radius'] = 18 + 'px';
                            scope.styleHandle['border-radius'] = 15 + 'px';
                        } else {
                            scope.styleSwitch['border-radius'] = (scope.tsWidth + 6) / 2 + 'px';
                            scope.styleHandle['border-radius'] = scope.tsWidth / 2 + 'px';
                        }
                    } else if (angular.isDefined(scope.tsHeight)) {
                        if (scope.tsHeight >= 56) {
                            scope.styleSwitch['border-radius'] = 31 + 'px';
                            scope.styleHandle['border-radius'] = 28 + 'px';
                        } else {
                            scope.styleSwitch['border-radius'] = (scope.tsHeight + 6) / 2 + 'px';
                            scope.styleHandle['border-radius'] = scope.tsHeight / 2 + 'px';
                        }
                    }
                }


                /* Custom CSS Color Overrides */

                function updateCustomColor() {
                    if (angular.equals(scope.val, scope.tsTrueVal)) {
                        if (angular.isDefined(attrs.tsTrueColor)) {
                            scope.styleSwitch['background-color'] = attrs.tsTrueColor;
                        }
                        return;
                    }
                    if (angular.equals(scope.val, scope.tsFalseVal)) {
                        if (angular.isDefined(attrs.tsFalseColor)) {
                            scope.styleSwitch['background-color'] = attrs.tsFalseColor;
                        }
                        return;
                    }
                    if (scope.triToggle) {
                        if (angular.isDefined(attrs.tsNullColor)) {
                            scope.styleSwitch['background-color'] = attrs.tsNullColor;
                        }
                    }
                }

                /* Custom Position Maintenance */

                function updatePosition() {
                    if (angular.equals(scope.val, scope.tsFalseVal)) {
                        if (angular.isDefined(scope.tsWidth)) {
                            scope.styleHandle.left = 3 + 'px';
                        }
                    } else if (angular.equals(scope.val, scope.tsNullVal)) {
                        if (scope.triToggle) {
                            if (angular.isDefined(attrs.vertical) && attrs.vertical) {
                                if (angular.isDefined(scope.tsHeight)) {
                                    scope.styleHandle.left = scope.tsHeight * 0.22 + 3 + 'px';
                                }
                            } else if (angular.isDefined(scope.tsWidth)) {
                                scope.styleHandle.left = scope.tsWidth * 0.22 + 3 + 'px';
                            }
                        }
                    } else {
                        if (angular.isDefined(attrs.vertical) && attrs.vertical) {
                            if (angular.isDefined(scope.tsHeight)) {
                                scope.styleHandle.left = (scope.tsHeight) * 0.517 + 'px';
                            }
                        } else if (angular.isDefined(scope.tsWidth)) {
                            scope.styleHandle.left = (scope.tsWidth) * 0.517 + 'px';
                        }
                    }
                }

                /* Custom Tooltip */

                function updateTooltip() {
                    scope.showTooltip1 = false;
                    scope.showTooltip2 = false;
                    scope.showTooltip3 = false;
                    if (angular.equals(scope.val, scope.tsTrueVal)) {
                        if (scope.vertical) {
                            scope.showTooltip1 = true;
                        } else {
                            scope.showTooltip3 = true;
                        }
                    } else if (angular.equals(scope.val, scope.tsFalseVal)) {
                        if (scope.vertical) {
                            scope.showTooltip3 = true;
                        } else {
                            scope.showTooltip1 = true;
                        }
                    } else {
                        if (scope.triToggle) {
                            scope.showTooltip2 = true;
                        }
                    }
                }

                /* Logic */

                scope.toggle = function() {
                    if (scope.val === scope.tsTrueVal) {
                        scope.val = scope.tsFalseVal;
                    } else if (scope.val === scope.tsFalseVal && scope.triToggle) {
                        scope.val = scope.tsNullVal;
                    } else {
                        scope.val = scope.tsTrueVal;
                    }
                    if (typeof scope.tsToggleClick != 'undefined') {
                        $timeout(function() {
                            scope.tsToggleClick(scope.val);
                        });
                    }
                };

                scope.$watch('val', function(val) {
                    updateCustomColor();
                    updatePosition();
                    updateTooltip();
                    if (typeof scope.tsToggleChange != 'undefined') {
                        $timeout(function() {
                            scope.tsToggleChange(scope.val);
                        });
                    }
                }, true);

                /* Value Configuration */

                if (!angular.isDefined(scope.tsTrueVal)) {
                    scope.tsTrueVal = 1;
                }
                if (!angular.isDefined(scope.tsFalseVal)) {
                    scope.tsFalseVal = 0;
                }
                if (!angular.isDefined(scope.tsNullVal)) {
                    scope.tsNullVal = null;
                }
                if (!angular.isDefined(scope.val)) {
                    if (angular.isDefined(scope.tsDefault)) {
                        scope.val = scope.tsDefault;
                    } else {
                        scope.val = scope.tsNullVal;
                    }
                }
            },
        };
    }]);
