//Pikaday v1.8.2 - https://github.com/Pikaday/Pikaday
!function (e, t) { "use strict"; var n; if ("object" == typeof exports) { try { n = require("moment") } catch (e) { } module.exports = t(n) } else "function" == typeof define && define.amd ? define(function (e) { try { n = e("moment") } catch (e) { } return t(n) }) : e.Pikaday = t(e.moment) }(this, function (e) { "use strict"; var t = "function" == typeof e, n = !!window.addEventListener, a = window.document, i = window.setTimeout, s = function (e, t, a, i) { n ? e.addEventListener(t, a, !!i) : e.attachEvent("on" + t, a) }, o = function (e, t, a, i) { n ? e.removeEventListener(t, a, !!i) : e.detachEvent("on" + t, a) }, r = function (e, t) { return -1 !== (" " + e.className + " ").indexOf(" " + t + " ") }, l = function (e, t) { r(e, t) || (e.className = "" === e.className ? t : e.className + " " + t) }, h = function (e, t) { var n; e.className = (n = (" " + e.className + " ").replace(" " + t + " ", " ")).trim ? n.trim() : n.replace(/^\s+|\s+$/g, "") }, d = function (e) { return /Array/.test(Object.prototype.toString.call(e)) }, u = function (e) { return /Date/.test(Object.prototype.toString.call(e)) && !isNaN(e.getTime()) }, c = function (e) { var t = e.getDay(); return 0 === t || 6 === t }, f = function (e) { return e % 4 == 0 && e % 100 != 0 || e % 400 == 0 }, g = function (e, t) { return [31, f(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t] }, m = function (e) { u(e) && e.setHours(0, 0, 0, 0) }, p = function (e, t) { return e.getTime() === t.getTime() }, D = function (e, t, n) { var a, i; for (a in t) (i = void 0 !== e[a]) && "object" == typeof t[a] && null !== t[a] && void 0 === t[a].nodeName ? u(t[a]) ? n && (e[a] = new Date(t[a].getTime())) : d(t[a]) ? n && (e[a] = t[a].slice(0)) : e[a] = D({}, t[a], n) : !n && i || (e[a] = t[a]); return e }, y = function (e, t, n) { var i; a.createEvent ? ((i = a.createEvent("HTMLEvents")).initEvent(t, !0, !1), i = D(i, n), e.dispatchEvent(i)) : a.createEventObject && (i = a.createEventObject(), i = D(i, n), e.fireEvent("on" + t, i)) }, b = function (e) { return e.month < 0 && (e.year -= Math.ceil(Math.abs(e.month) / 12), e.month += 12), e.month > 11 && (e.year += Math.floor(Math.abs(e.month) / 12), e.month -= 12), e }, v = { field: null, bound: void 0, ariaLabel: "Use the arrow keys to pick a date", position: "bottom left", reposition: !0, format: "YYYY-MM-DD", toString: null, parse: null, defaultDate: null, setDefaultDate: !1, firstDay: 0, firstWeekOfYearMinDays: 4, formatStrict: !1, minDate: null, maxDate: null, yearRange: 10, showWeekNumber: !1, pickWholeWeek: !1, minYear: 0, maxYear: 9999, minMonth: void 0, maxMonth: void 0, startRange: null, endRange: null, isRTL: !1, yearSuffix: "", showMonthAfterYear: !1, showDaysInNextAndPreviousMonths: !1, enableSelectionDaysInNextAndPreviousMonths: !1, numberOfMonths: 1, mainCalendar: "left", container: void 0, blurFieldOnSelect: !0, i18n: { months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }, theme: null, events: [], onSelect: null, onOpen: null, onClose: null, onDraw: null, keyboardInput: !0 }, _ = function (e, t, n) { for (t += e.firstDay; t >= 7;)t -= 7; return e.i18n.weekdaysShort[t] }, w = function (e) { var t = [], n = "false"; if (e.isEmpty) { if (!e.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>'; t.push("is-outside-current-month"), e.enableSelectionDaysInNextAndPreviousMonths || t.push("is-selection-disabled") } return e.isDisabled && t.push("is-disabled"), e.isToday && t.push("is-today"), e.isSelected && (t.push("is-selected"), n = "true"), e.hasEvent && t.push("has-event"), e.isInRange && t.push("is-inrange"), e.isStartRange && t.push("is-startrange"), e.isEndRange && t.push("is-endrange"), '<td data-day="' + e.day + '" class="' + t.join(" ") + '" aria-selected="' + n + '"><button class="pika-button pika-day" type="button" data-pika-year="' + e.year + '" data-pika-month="' + e.month + '" data-pika-day="' + e.day + '">' + e.day + "</button></td>" }, k = function (n, a, i, s) { var o = new Date(i, a, n); return '<td class="pika-week">' + (t ? e(o).isoWeek() : function (e, t) { e.setHours(0, 0, 0, 0); var n = e.getDate(), a = e.getDay(), i = t, s = i - 1, o = function (e) { return (e + 7 - 1) % 7 }; e.setDate(n + s - o(a)); var r = new Date(e.getFullYear(), 0, i), l = (e.getTime() - r.getTime()) / 864e5; return 1 + Math.round((l - s + o(r.getDay())) / 7) }(o, s)) + "</td>" }, M = function (e, t, n, a) { return '<tr class="pika-row' + (n ? " pick-whole-week" : "") + (a ? " is-selected" : "") + '">' + (t ? e.reverse() : e).join("") + "</tr>" }, x = function (e, t, n, a, i, s) { var o, r, l = e._o, h = n === l.minYear, d = n === l.maxYear, u = '<div id="' + s + '" class="pika-title" role="heading" aria-live="assertive">', c = !0, f = !0; return o = '<div class="pika-label">' + l.i18n.months[a] + "</div>", r = '<div class="pika-label">' + n + l.yearSuffix + "</div>", l.showMonthAfterYear ? u += r + o : u += o + r, h && (0 === a || l.minMonth >= a) && (c = !1), d && (11 === a || l.maxMonth <= a) && (f = !1), 0 === t && (u += '<button class="pika-prev' + (c ? "" : " is-disabled") + '" type="button"><svg><use xlink:href="#icon-arrow-backward"></use></svg></button>'), t === e._o.numberOfMonths - 1 && (u += '<button class="pika-next' + (f ? "" : " is-disabled") + '" type="button"><svg><use xlink:href="#icon-arrow-forward"></use></svg></button>'), u + "</div>" }, R = function (e, t, n) { return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + n + '">' + function (e) { var t, n = []; for (e.showWeekNumber && n.push("<th></th>"), t = 0; t < 7; t++)n.push('<th scope="col"><abbr title="' + _(e, t) + '">' + _(e, t) + "</abbr></th>"); return "<thead><tr>" + (e.isRTL ? n.reverse() : n).join("") + "</tr></thead>" }(e) + ("<tbody>" + t.join("") + "</tbody>") + "</table>" }, N = function (o) { var l = this, h = l.config(o); l._onMouseDown = function (e) { if (l._v) { var t = (e = e || window.event).target || e.srcElement; if (t) if (r(t, "is-disabled") || (!r(t, "pika-button") || r(t, "is-empty") || r(t.parentNode, "is-disabled") ? r(t, "pika-prev") ? l.prevMonth() : r(t, "pika-next") && l.nextMonth() : (l.setDate(new Date(t.getAttribute("data-pika-year"), t.getAttribute("data-pika-month"), t.getAttribute("data-pika-day"))), h.bound && i(function () { l.hide(), h.blurFieldOnSelect && h.field && h.field.blur() }, 100))), r(t, "pika-select")) l._c = !0; else { if (!e.preventDefault) return e.returnValue = !1, !1; e.preventDefault() } } }, l._onChange = function (e) { var t = (e = e || window.event).target || e.srcElement; t && (r(t, "pika-select-month") ? l.gotoMonth(t.value) : r(t, "pika-select-year") && l.gotoYear(t.value)) }, l._onKeyChange = function (e) { if (e = e || window.event, l.isVisible()) switch (e.keyCode) { case 13: case 27: h.field && h.field.blur(); break; case 37: l.adjustDate("subtract", 1); break; case 38: l.adjustDate("subtract", 7); break; case 39: l.adjustDate("add", 1); break; case 40: l.adjustDate("add", 7); break; case 8: case 46: l.setDate(null) } }, l._parseFieldValue = function () { if (h.parse) return h.parse(h.field.value, h.format); if (t) { var n = e(h.field.value, h.format, h.formatStrict); return n && n.isValid() ? n.toDate() : null } return new Date(Date.parse(h.field.value)) }, l._onInputChange = function (e) { var t; e.firedBy !== l && (t = l._parseFieldValue(), u(t) && l.setDate(t), l._v || l.show()) }, l._onInputFocus = function () { l.show() }, l._onInputClick = function () { l.show() }, l._onInputBlur = function () { var e = a.activeElement; do { if (r(e, "pika-single")) return } while (e = e.parentNode); l._c || (l._b = i(function () { l.hide() }, 50)), l._c = !1 }, l._onClick = function (e) { var t = (e = e || window.event).target || e.srcElement, a = t; if (t) { !n && r(t, "pika-select") && (t.onchange || (t.setAttribute("onchange", "return;"), s(t, "change", l._onChange))); do { if (r(a, "pika-single") || a === h.trigger) return } while (a = a.parentNode); l._v && t !== h.trigger && a !== h.trigger && l.hide() } }, l.el = a.createElement("div"), l.el.className = "pika-single" + (h.isRTL ? " is-rtl" : "") + (h.theme ? " " + h.theme : ""), s(l.el, "mousedown", l._onMouseDown, !0), s(l.el, "touchend", l._onMouseDown, !0), s(l.el, "change", l._onChange), h.keyboardInput && s(a, "keydown", l._onKeyChange), h.field && (h.container ? h.container.appendChild(l.el) : h.bound ? a.body.appendChild(l.el) : h.field.parentNode.insertBefore(l.el, h.field.nextSibling), s(h.field, "change", l._onInputChange), h.defaultDate || (h.defaultDate = l._parseFieldValue(), h.setDefaultDate = !0)); var d = h.defaultDate; u(d) ? h.setDefaultDate ? l.setDate(d, !0) : l.gotoDate(d) : l.gotoDate(new Date), h.bound ? (this.hide(), l.el.className += " is-bound", s(h.trigger, "click", l._onInputClick), s(h.trigger, "focus", l._onInputFocus), s(h.trigger, "blur", l._onInputBlur)) : this.show() }; return N.prototype = { config: function (e) { this._o || (this._o = D({}, v, !0)); var t = D(this._o, e, !0); t.isRTL = !!t.isRTL, t.field = t.field && t.field.nodeName ? t.field : null, t.theme = "string" == typeof t.theme && t.theme ? t.theme : null, t.bound = !!(void 0 !== t.bound ? t.field && t.bound : t.field), t.trigger = t.trigger && t.trigger.nodeName ? t.trigger : t.field, t.disableWeekends = !!t.disableWeekends, t.disableDayFn = "function" == typeof t.disableDayFn ? t.disableDayFn : null; var n = parseInt(t.numberOfMonths, 10) || 1; if (t.numberOfMonths = n > 4 ? 4 : n, u(t.minDate) || (t.minDate = !1), u(t.maxDate) || (t.maxDate = !1), t.minDate && t.maxDate && t.maxDate < t.minDate && (t.maxDate = t.minDate = !1), t.minDate && this.setMinDate(t.minDate), t.maxDate && this.setMaxDate(t.maxDate), d(t.yearRange)) { var a = (new Date).getFullYear() - 10; t.yearRange[0] = parseInt(t.yearRange[0], 10) || a, t.yearRange[1] = parseInt(t.yearRange[1], 10) || a } else t.yearRange = Math.abs(parseInt(t.yearRange, 10)) || v.yearRange, t.yearRange > 100 && (t.yearRange = 100); return t }, toString: function (n) { return n = n || this._o.format, u(this._d) ? this._o.toString ? this._o.toString(this._d, n) : t ? e(this._d).format(n) : this._d.toDateString() : "" }, getMoment: function () { return t ? e(this._d) : null }, setMoment: function (n, a) { t && e.isMoment(n) && this.setDate(n.toDate(), a) }, getDate: function () { return u(this._d) ? new Date(this._d.getTime()) : null }, setDate: function (e, t) { if (!e) return this._d = null, this._o.field && (this._o.field.value = "", y(this._o.field, "change", { firedBy: this })), this.draw(); if ("string" == typeof e && (e = new Date(Date.parse(e))), u(e)) { var n = this._o.minDate, a = this._o.maxDate; u(n) && e < n ? e = n : u(a) && e > a && (e = a), this._d = new Date(e.getTime()), m(this._d), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString(), y(this._o.field, "change", { firedBy: this })), t || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate()) } }, clear: function () { this.setDate(null) }, gotoDate: function (e) { var t = !0; if (u(e)) { if (this.calendars) { var n = new Date(this.calendars[0].year, this.calendars[0].month, 1), a = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1), i = e.getTime(); a.setMonth(a.getMonth() + 1), a.setDate(a.getDate() - 1), t = i < n.getTime() || a.getTime() < i } t && (this.calendars = [{ month: e.getMonth(), year: e.getFullYear() }], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), this.adjustCalendars() } }, adjustDate: function (e, t) { var n, a = this.getDate() || new Date, i = 24 * parseInt(t) * 60 * 60 * 1e3; "add" === e ? n = new Date(a.valueOf() + i) : "subtract" === e && (n = new Date(a.valueOf() - i)), this.setDate(n) }, adjustCalendars: function () { this.calendars[0] = b(this.calendars[0]); for (var e = 1; e < this._o.numberOfMonths; e++)this.calendars[e] = b({ month: this.calendars[0].month + e, year: this.calendars[0].year }); this.draw() }, gotoToday: function () { this.gotoDate(new Date) }, gotoMonth: function (e) { isNaN(e) || (this.calendars[0].month = parseInt(e, 10), this.adjustCalendars()) }, nextMonth: function () { this.calendars[0].month++, this.adjustCalendars() }, prevMonth: function () { this.calendars[0].month--, this.adjustCalendars() }, gotoYear: function (e) { isNaN(e) || (this.calendars[0].year = parseInt(e, 10), this.adjustCalendars()) }, setMinDate: function (e) { e instanceof Date ? (m(e), this._o.minDate = e, this._o.minYear = e.getFullYear(), this._o.minMonth = e.getMonth()) : (this._o.minDate = v.minDate, this._o.minYear = v.minYear, this._o.minMonth = v.minMonth, this._o.startRange = v.startRange), this.draw() }, setMaxDate: function (e) { e instanceof Date ? (m(e), this._o.maxDate = e, this._o.maxYear = e.getFullYear(), this._o.maxMonth = e.getMonth()) : (this._o.maxDate = v.maxDate, this._o.maxYear = v.maxYear, this._o.maxMonth = v.maxMonth, this._o.endRange = v.endRange), this.draw() }, setStartRange: function (e) { this._o.startRange = e }, setEndRange: function (e) { this._o.endRange = e }, draw: function (e) { if (this._v || e) { var t, n = this._o, a = n.minYear, s = n.maxYear, o = n.minMonth, r = n.maxMonth, l = ""; this._y <= a && (this._y = a, !isNaN(o) && this._m < o && (this._m = o)), this._y >= s && (this._y = s, !isNaN(r) && this._m > r && (this._m = r)); for (var h = 0; h < n.numberOfMonths; h++)t = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2), l += '<div class="pika-lendar">' + x(this, h, this.calendars[h].year, this.calendars[h].month, this.calendars[0].year, t) + this.render(this.calendars[h].year, this.calendars[h].month, t) + "</div>"; this.el.innerHTML = l, n.bound && "hidden" !== n.field.type && i(function () { n.trigger.focus() }, 1), "function" == typeof this._o.onDraw && this._o.onDraw(this), n.bound && n.field.setAttribute("aria-label", n.ariaLabel) } }, adjustPosition: function () { var e, t, n, i, s, o, r, d, u, c, f, g; if (!this._o.container) { if (this.el.style.position = "absolute", t = e = this._o.trigger, n = this.el.offsetWidth, i = this.el.offsetHeight, s = window.innerWidth || a.documentElement.clientWidth, o = window.innerHeight || a.documentElement.clientHeight, r = window.pageYOffset || a.body.scrollTop || a.documentElement.scrollTop, f = !0, g = !0, "function" == typeof e.getBoundingClientRect) d = (c = e.getBoundingClientRect()).left + window.pageXOffset, u = c.bottom + window.pageYOffset; else for (d = t.offsetLeft, u = t.offsetTop + t.offsetHeight; t = t.offsetParent;)d += t.offsetLeft, u += t.offsetTop; (this._o.reposition && d + n > s || this._o.position.indexOf("right") > -1 && d - n + e.offsetWidth > 0) && (d = d - n + e.offsetWidth, f = !1), (this._o.reposition && u + i > o + r || this._o.position.indexOf("top") > -1 && u - i - e.offsetHeight > 0) && (u = u - i - e.offsetHeight, g = !1), d < 0 && (d = 0), u < 0 && (u = 0), this.el.style.left = d + "px", this.el.style.top = u + "px", l(this.el, f ? "left-aligned" : "right-aligned"), l(this.el, g ? "bottom-aligned" : "top-aligned"), h(this.el, f ? "right-aligned" : "left-aligned"), h(this.el, g ? "top-aligned" : "bottom-aligned") } }, render: function (e, t, n) { var a = this._o, i = new Date, s = g(e, t), o = new Date(e, t, 1).getDay(), r = [], l = []; m(i), a.firstDay > 0 && (o -= a.firstDay) < 0 && (o += 7); for (var h = 0 === t ? 11 : t - 1, d = 11 === t ? 0 : t + 1, f = 0 === t ? e - 1 : e, D = 11 === t ? e + 1 : e, y = g(f, h), b = s + o, v = b; v > 7;)v -= 7; b += 7 - v; for (var _ = !1, x = 0, N = 0; x < b; x++) { var S = new Date(e, t, x - o + 1), C = !!u(this._d) && p(S, this._d), I = p(S, i), T = -1 !== a.events.indexOf(S.toDateString()), Y = x < o || x >= s + o, E = x - o + 1, O = t, j = e, W = a.startRange && p(a.startRange, S), F = a.endRange && p(a.endRange, S), A = a.startRange && a.endRange && a.startRange < S && S < a.endRange; Y && (x < o ? (E = y + E, O = h, j = f) : (E -= s, O = d, j = D)); var L = { day: E, month: O, year: j, hasEvent: T, isSelected: C, isToday: I, isDisabled: a.minDate && S < a.minDate || a.maxDate && S > a.maxDate || a.disableWeekends && c(S) || a.disableDayFn && a.disableDayFn(S), isEmpty: Y, isStartRange: W, isEndRange: F, isInRange: A, showDaysInNextAndPreviousMonths: a.showDaysInNextAndPreviousMonths, enableSelectionDaysInNextAndPreviousMonths: a.enableSelectionDaysInNextAndPreviousMonths }; a.pickWholeWeek && C && (_ = !0), l.push(w(L)), 7 == ++N && (a.showWeekNumber && l.unshift(k(x - o, t, e, a.firstWeekOfYearMinDays)), r.push(M(l, a.isRTL, a.pickWholeWeek, _)), l = [], N = 0, _ = !1) } return R(a, r, n) }, isVisible: function () { return this._v }, show: function () { this.isVisible() || (this._v = !0, this.draw(), h(this.el, "is-hidden"), this._o.bound && (s(a, "click", this._onClick), this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this)) }, hide: function () { var e = this._v; !1 !== e && (this._o.bound && o(a, "click", this._onClick), this._o.container || (this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto"), l(this.el, "is-hidden"), this._v = !1, void 0 !== e && "function" == typeof this._o.onClose && this._o.onClose.call(this)) }, destroy: function () { var e = this._o; this.hide(), o(this.el, "mousedown", this._onMouseDown, !0), o(this.el, "touchend", this._onMouseDown, !0), o(this.el, "change", this._onChange), e.keyboardInput && o(a, "keydown", this._onKeyChange), e.field && (o(e.field, "change", this._onInputChange), e.bound && (o(e.trigger, "click", this._onInputClick), o(e.trigger, "focus", this._onInputFocus), o(e.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el) } }, N });

//CustomSelect v2.2.0 - https://github.com/custom-select/custom-select
var CustomSelect = function (e) { var t = e.elem; mainClass = "dropdown-select", iconClass = "dropdown-select-icon", titleClass = "dropdown-select-title", listClass = "dropdown-select-list", selectedClass = "is-selected", openClass = "is-open", selectOptions = t.options, optionsLength = selectOptions.length, index = 0; var s = document.createElement("div"); s.className = mainClass, t.id && (s.id = "custom-" + t.id); var n = document.createElement("div"); n.className = iconClass, n.innerHTML = '<svg><use xlink:href="#icon-arrow-down"></use></svg>'; var a = document.createElement("button"); a.className = titleClass, a.textContent = selectOptions[0].textContent; var l = document.createElement("ul"); function i() { l.classList.remove(openClass) } l.className = listClass, function (e) { for (var s = 0; s < e.length; s++) { var n = document.createElement("li"); n.innerText = e[s].textContent, n.setAttribute("data-value", e[s].value), n.setAttribute("data-index", index++), selectOptions[t.selectedIndex].textContent === e[s].textContent && (n.classList.add(selectedClass), a.textContent = e[s].textContent), l.appendChild(n) } }(selectOptions), s.appendChild(n), s.appendChild(a), s.appendChild(l), s.addEventListener("click", function (e) { e.preventDefault(); var n = e.target; n.className === titleClass && l.classList.toggle(openClass); if ("LI" === n.tagName) { var a; s.querySelector("." + titleClass).innerText = n.innerText, t.options.selectedIndex = n.getAttribute("data-index"), "function" == typeof Event ? a = new Event("change") : (a = document.createEvent("Event")).initEvent("change", !0, !0), t.dispatchEvent(a), l.querySelector("." + selectedClass).classList.remove(selectedClass), n.classList.add(selectedClass), i() } }), t.parentNode.insertBefore(s, t), t.style.display = "none", document.addEventListener("click", function (e) { s.contains(e.target) || i() }) };

//Odometer v0.4.8 - https://github.com/HubSpot/odometer
(function () { var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G = [].slice; q = '<span class="odometer-value"></span>', n = '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' + q + "</span></span>", d = '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' + n + "</span></span>", g = '<span class="odometer-formatting-mark"></span>', c = "(,ddd).dd", h = /^\(?([^)]*)\)?(?:(.)(d+))?$/, i = 30, f = 2e3, a = 20, j = 2, e = .5, k = 1e3 / i, b = 1e3 / a, o = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", y = document.createElement("div").style, p = null != y.transition || null != y.webkitTransition || null != y.mozTransition || null != y.oTransition, w = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, l = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, s = function (a) { var b; return b = document.createElement("div"), b.innerHTML = a, b.children[0] }, v = function (a, b) { return a.className = a.className.replace(new RegExp("(^| )" + b.split(" ").join("|") + "( |$)", "gi"), " ") }, r = function (a, b) { return v(a, b), a.className += " " + b }, z = function (a, b) { var c; return null != document.createEvent ? (c = document.createEvent("HTMLEvents"), c.initEvent(b, !0, !0), a.dispatchEvent(c)) : void 0 }, u = function () { var a, b; return null != (a = null != (b = window.performance) && "function" == typeof b.now ? b.now() : void 0) ? a : +new Date }, x = function (a, b) { return null == b && (b = 0), b ? (a *= Math.pow(10, b), a += .5, a = Math.floor(a), a /= Math.pow(10, b)) : Math.round(a) }, A = function (a) { return 0 > a ? Math.ceil(a) : Math.floor(a) }, t = function (a) { return a - x(a) }, C = !1, (B = function () { var a, b, c, d, e; if (!C && null != window.jQuery) { for (C = !0, d = ["html", "text"], e = [], b = 0, c = d.length; c > b; b++)a = d[b], e.push(function (a) { var b; return b = window.jQuery.fn[a], window.jQuery.fn[a] = function (a) { var c; return null == a || null == (null != (c = this[0]) ? c.odometer : void 0) ? b.apply(this, arguments) : this[0].odometer.update(a) } }(a)); return e } })(), setTimeout(B, 0), m = function () { function a(b) { var c, d, e, g, h, i, l, m, n, o, p = this; if (this.options = b, this.el = this.options.el, null != this.el.odometer) return this.el.odometer; this.el.odometer = this, m = a.options; for (d in m) g = m[d], null == this.options[d] && (this.options[d] = g); null == (h = this.options).duration && (h.duration = f), this.MAX_VALUES = this.options.duration / k / j | 0, this.resetFormat(), this.value = this.cleanValue(null != (n = this.options.value) ? n : ""), this.renderInside(), this.render(); try { for (o = ["innerHTML", "innerText", "textContent"], i = 0, l = o.length; l > i; i++)e = o[i], null != this.el[e] && !function (a) { return Object.defineProperty(p.el, a, { get: function () { var b; return "innerHTML" === a ? p.inside.outerHTML : null != (b = p.inside.innerText) ? b : p.inside.textContent }, set: function (a) { return p.update(a) } }) }(e) } catch (q) { c = q, this.watchForMutations() } } return a.prototype.renderInside = function () { return this.inside = document.createElement("div"), this.inside.className = "odometer-inside", this.el.innerHTML = "", this.el.appendChild(this.inside) }, a.prototype.watchForMutations = function () { var a, b = this; if (null != l) try { return null == this.observer && (this.observer = new l(function (a) { var c; return c = b.el.innerText, b.renderInside(), b.render(b.value), b.update(c) })), this.watchMutations = !0, this.startWatchingMutations() } catch (c) { a = c } }, a.prototype.startWatchingMutations = function () { return this.watchMutations ? this.observer.observe(this.el, { childList: !0 }) : void 0 }, a.prototype.stopWatchingMutations = function () { var a; return null != (a = this.observer) ? a.disconnect() : void 0 }, a.prototype.cleanValue = function (a) { var b; return "string" == typeof a && (a = a.replace(null != (b = this.format.radix) ? b : ".", "<radix>"), a = a.replace(/[.,]/g, ""), a = a.replace("<radix>", "."), a = parseFloat(a, 10) || 0), x(a, this.format.precision) }, a.prototype.bindTransitionEnd = function () { var a, b, c, d, e, f, g = this; if (!this.transitionEndBound) { for (this.transitionEndBound = !0, b = !1, e = o.split(" "), f = [], c = 0, d = e.length; d > c; c++)a = e[c], f.push(this.el.addEventListener(a, function () { return b ? !0 : (b = !0, setTimeout(function () { return g.render(), b = !1, z(g.el, "odometerdone") }, 0), !0) }, !1)); return f } }, a.prototype.resetFormat = function () { var a, b, d, e, f, g, i, j; if (a = null != (i = this.options.format) ? i : c, a || (a = "d"), d = h.exec(a), !d) throw new Error("Odometer: Unparsable digit format"); return j = d.slice(1, 4), g = j[0], f = j[1], b = j[2], e = (null != b ? b.length : void 0) || 0, this.format = { repeating: g, radix: f, precision: e } }, a.prototype.render = function (a) { var b, c, d, e, f, g, h; for (null == a && (a = this.value), this.stopWatchingMutations(), this.resetFormat(), this.inside.innerHTML = "", f = this.options.theme, b = this.el.className.split(" "), e = [], g = 0, h = b.length; h > g; g++)c = b[g], c.length && ((d = /^odometer-theme-(.+)$/.exec(c)) ? f = d[1] : /^odometer(-|$)/.test(c) || e.push(c)); return e.push("odometer"), p || e.push("odometer-no-transitions"), f ? e.push("odometer-theme-" + f) : e.push("odometer-auto-theme"), this.el.className = e.join(" "), this.ribbons = {}, this.formatDigits(a), this.startWatchingMutations() }, a.prototype.formatDigits = function (a) { var b, c, d, e, f, g, h, i, j, k; if (this.digits = [], this.options.formatFunction) for (d = this.options.formatFunction(a), j = d.split("").reverse(), f = 0, h = j.length; h > f; f++)c = j[f], c.match(/0-9/) ? (b = this.renderDigit(), b.querySelector(".odometer-value").innerHTML = c, this.digits.push(b), this.insertDigit(b)) : this.addSpacer(c); else for (e = !this.format.precision || !t(a) || !1, k = a.toString().split("").reverse(), g = 0, i = k.length; i > g; g++)b = k[g], "." === b && (e = !0), this.addDigit(b, e) }, a.prototype.update = function (a) { var b, c = this; return a = this.cleanValue(a), (b = a - this.value) ? (v(this.el, "odometer-animating-up odometer-animating-down odometer-animating"), b > 0 ? r(this.el, "odometer-animating-up") : r(this.el, "odometer-animating-down"), this.stopWatchingMutations(), this.animate(a), this.startWatchingMutations(), setTimeout(function () { return c.el.offsetHeight, r(c.el, "odometer-animating") }, 0), this.value = a) : void 0 }, a.prototype.renderDigit = function () { return s(d) }, a.prototype.insertDigit = function (a, b) { return null != b ? this.inside.insertBefore(a, b) : this.inside.children.length ? this.inside.insertBefore(a, this.inside.children[0]) : this.inside.appendChild(a) }, a.prototype.addSpacer = function (a, b, c) { var d; return d = s(g), d.innerHTML = a, c && r(d, c), this.insertDigit(d, b) }, a.prototype.addDigit = function (a, b) { var c, d, e, f; if (null == b && (b = !0), "-" === a) return this.addSpacer(a, null, "odometer-negation-mark"); if ("." === a) return this.addSpacer(null != (f = this.format.radix) ? f : ".", null, "odometer-radix-mark"); if (b) for (e = !1; ;) { if (!this.format.repeating.length) { if (e) throw new Error("Bad odometer format without digits"); this.resetFormat(), e = !0 } if (c = this.format.repeating[this.format.repeating.length - 1], this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1), "d" === c) break; this.addSpacer(c) } return d = this.renderDigit(), d.querySelector(".odometer-value").innerHTML = a, this.digits.push(d), this.insertDigit(d) }, a.prototype.animate = function (a) { return p && "count" !== this.options.animation ? this.animateSlide(a) : this.animateCount(a) }, a.prototype.animateCount = function (a) { var c, d, e, f, g, h = this; if (d = +a - this.value) return f = e = u(), c = this.value, (g = function () { var i, j, k; return u() - f > h.options.duration ? (h.value = a, h.render(), void z(h.el, "odometerdone")) : (i = u() - e, i > b && (e = u(), k = i / h.options.duration, j = d * k, c += j, h.render(Math.round(c))), null != w ? w(g) : setTimeout(g, b)) })() }, a.prototype.getDigitCount = function () { var a, b, c, d, e, f; for (d = 1 <= arguments.length ? G.call(arguments, 0) : [], a = e = 0, f = d.length; f > e; a = ++e)c = d[a], d[a] = Math.abs(c); return b = Math.max.apply(Math, d), Math.ceil(Math.log(b + 1) / Math.log(10)) }, a.prototype.getFractionalDigitCount = function () { var a, b, c, d, e, f, g; for (e = 1 <= arguments.length ? G.call(arguments, 0) : [], b = /^\-?\d*\.(\d*?)0*$/, a = f = 0, g = e.length; g > f; a = ++f)d = e[a], e[a] = d.toString(), c = b.exec(e[a]), null == c ? e[a] = 0 : e[a] = c[1].length; return Math.max.apply(Math, e) }, a.prototype.resetDigits = function () { return this.digits = [], this.ribbons = [], this.inside.innerHTML = "", this.resetFormat() }, a.prototype.animateSlide = function (a) { var b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, s, t, u, v, w, x, y, z, B, C, D, E; if (s = this.value, j = this.getFractionalDigitCount(s, a), j && (a *= Math.pow(10, j), s *= Math.pow(10, j)), d = a - s) { for (this.bindTransitionEnd(), f = this.getDigitCount(s, a), g = [], b = 0, m = v = 0; f >= 0 ? f > v : v > f; m = f >= 0 ? ++v : --v) { if (t = A(s / Math.pow(10, f - m - 1)), i = A(a / Math.pow(10, f - m - 1)), h = i - t, Math.abs(h) > this.MAX_VALUES) { for (l = [], n = h / (this.MAX_VALUES + this.MAX_VALUES * b * e), c = t; h > 0 && i > c || 0 > h && c > i;)l.push(Math.round(c)), c += n; l[l.length - 1] !== i && l.push(i), b++ } else l = function () { E = []; for (var a = t; i >= t ? i >= a : a >= i; i >= t ? a++ : a--)E.push(a); return E }.apply(this); for (m = w = 0, y = l.length; y > w; m = ++w)k = l[m], l[m] = Math.abs(k % 10); g.push(l) } for (this.resetDigits(), D = g.reverse(), m = x = 0, z = D.length; z > x; m = ++x)for (l = D[m], this.digits[m] || this.addDigit(" ", m >= j), null == (u = this.ribbons)[m] && (u[m] = this.digits[m].querySelector(".odometer-ribbon-inner")), this.ribbons[m].innerHTML = "", 0 > d && (l = l.reverse()), o = C = 0, B = l.length; B > C; o = ++C)k = l[o], q = document.createElement("div"), q.className = "odometer-value", q.innerHTML = k, this.ribbons[m].appendChild(q), o === l.length - 1 && r(q, "odometer-last-value"), 0 === o && r(q, "odometer-first-value"); return 0 > t && this.addDigit("-"), p = this.inside.querySelector(".odometer-radix-mark"), null != p && p.parent.removeChild(p), j ? this.addSpacer(this.format.radix, this.digits[j - 1], "odometer-radix-mark") : void 0 } }, a }(), m.options = null != (E = window.odometerOptions) ? E : {}, setTimeout(function () { var a, b, c, d, e; if (window.odometerOptions) { d = window.odometerOptions, e = []; for (a in d) b = d[a], e.push(null != (c = m.options)[a] ? (c = m.options)[a] : c[a] = b); return e } }, 0), m.init = function () { var a, b, c, d, e, f; if (null != document.querySelectorAll) { for (b = document.querySelectorAll(m.options.selector || ".odometer"), f = [], c = 0, d = b.length; d > c; c++)a = b[c], f.push(a.odometer = new m({ el: a, value: null != (e = a.innerText) ? e : a.textContent })); return f } }, null != (null != (F = document.documentElement) ? F.doScroll : void 0) && null != document.createEventObject ? (D = document.onreadystatechange, document.onreadystatechange = function () { return "complete" === document.readyState && m.options.auto !== !1 && m.init(), null != D ? D.apply(this, arguments) : void 0 }) : document.addEventListener("DOMContentLoaded", function () { return m.options.auto !== !1 ? m.init() : void 0 }, !1), "function" == typeof define && define.amd ? define([], function () { return m }) : "undefined" != typeof exports && null !== exports ? module.exports = m : window.Odometer = m }).call(this);

//Text mask v1.0.0 - https://github.com/text-mask/text-mask/tree/master/vanilla
!function (e, r) { "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.vanillaTextMask = r() : e.vanillaTextMask = r() }(this, function () { return function (e) { function r(n) { if (t[n]) return t[n].exports; var o = t[n] = { exports: {}, id: n, loaded: !1 }; return e[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports } var t = {}; return r.m = e, r.c = t, r.p = "", r(0) }([function (e, r, t) { "use strict"; function n(e) { return e && e.__esModule ? e : { default: e } } function o(e) { var r = e.inputElement, t = (0, u.default)(e), n = function (e) { var r = e.target.value; return t.update(r) }; return r.addEventListener("input", n), t.update(r.value), { textMaskInputElement: t, destroy: function () { r.removeEventListener("input", n) } } } Object.defineProperty(r, "__esModule", { value: !0 }), r.conformToMask = void 0, r.maskInput = o; var i = t(2); Object.defineProperty(r, "conformToMask", { enumerable: !0, get: function () { return n(i).default } }); var a = t(5), u = n(a); r.default = o }, function (e, r) { "use strict"; Object.defineProperty(r, "__esModule", { value: !0 }), r.placeholderChar = "_", r.strFunction = "function" }, function (e, r, t) { "use strict"; function n() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u, t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}; if (!(0, i.isArray)(r)) { if (("undefined" == typeof r ? "undefined" : o(r)) !== a.strFunction) throw new Error("Text-mask:conformToMask; The mask property must be an array."); r = r(e, t), r = (0, i.processCaretTraps)(r).maskWithoutCaretTraps } var n = t.guide, s = void 0 === n || n, f = t.previousConformedValue, d = void 0 === f ? l : f, c = t.placeholderChar, p = void 0 === c ? a.placeholderChar : c, v = t.placeholder, h = void 0 === v ? (0, i.convertMaskToPlaceholder)(r, p) : v, m = t.currentCaretPosition, y = t.keepCharPositions, g = s === !1 && void 0 !== d, b = e.length, C = d.length, k = h.length, x = r.length, P = b - C, T = P > 0, O = m + (T ? -P : 0), M = O + Math.abs(P); if (y === !0 && !T) { for (var w = l, S = O; S < M; S++)h[S] === p && (w += p); e = e.slice(0, O) + w + e.slice(O, b) } for (var _ = e.split(l).map(function (e, r) { return { char: e, isNew: r >= O && r < M } }), j = b - 1; j >= 0; j--) { var V = _[j].char; if (V !== p) { var A = j >= O && C === x; V === h[A ? j - P : j] && _.splice(j, 1) } } var E = l, N = !1; e: for (var F = 0; F < k; F++) { var I = h[F]; if (I === p) { if (_.length > 0) for (; _.length > 0;) { var L = _.shift(), R = L.char, J = L.isNew; if (R === p && g !== !0) { E += p; continue e } if (r[F].test(R)) { if (y === !0 && J !== !1 && d !== l && s !== !1 && T) { for (var W = _.length, q = null, z = 0; z < W; z++) { var B = _[z]; if (B.char !== p && B.isNew === !1) break; if (B.char === p) { q = z; break } } null !== q ? (E += R, _.splice(q, 1)) : F-- } else E += R; continue e } N = !0 } g === !1 && (E += h.substr(F, k)); break } E += I } if (g && T === !1) { for (var D = null, G = 0; G < E.length; G++)h[G] === p && (D = G); E = null !== D ? E.substr(0, D + 1) : l } return { conformedValue: E, meta: { someCharsRejected: N } } } Object.defineProperty(r, "__esModule", { value: !0 }); var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }; r.default = n; var i = t(3), a = t(1), u = [], l = "" }, function (e, r, t) { "use strict"; function n() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l.placeholderChar; if (!o(e)) throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array."); if (e.indexOf(r) !== -1) throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n" + ("The placeholder character that was received is: " + JSON.stringify(r) + "\n\n") + ("The mask that was received is: " + JSON.stringify(e))); return e.map(function (e) { return e instanceof RegExp ? r : e }).join("") } function o(e) { return Array.isArray && Array.isArray(e) || e instanceof Array } function i(e) { return "string" == typeof e || e instanceof String } function a(e) { return "number" == typeof e && void 0 === e.length && !isNaN(e) } function u(e) { for (var r = [], t = void 0; t = e.indexOf(f), t !== -1;)r.push(t), e.splice(t, 1); return { maskWithoutCaretTraps: e, indexes: r } } Object.defineProperty(r, "__esModule", { value: !0 }), r.convertMaskToPlaceholder = n, r.isArray = o, r.isString = i, r.isNumber = a, r.processCaretTraps = u; var l = t(1), s = [], f = "[]" }, function (e, r) { "use strict"; function t(e) { var r = e.previousConformedValue, t = void 0 === r ? o : r, i = e.previousPlaceholder, a = void 0 === i ? o : i, u = e.currentCaretPosition, l = void 0 === u ? 0 : u, s = e.conformedValue, f = e.rawValue, d = e.placeholderChar, c = e.placeholder, p = e.indexesOfPipedChars, v = void 0 === p ? n : p, h = e.caretTrapIndexes, m = void 0 === h ? n : h; if (0 === l || !f.length) return 0; var y = f.length, g = t.length, b = c.length, C = s.length, k = y - g, x = k > 0, P = 0 === g, T = k > 1 && !x && !P; if (T) return l; var O = x && (t === s || s === c), M = 0, w = void 0, S = void 0; if (O) M = l - k; else { var _ = s.toLowerCase(), j = f.toLowerCase(), V = j.substr(0, l).split(o), A = V.filter(function (e) { return _.indexOf(e) !== -1 }); S = A[A.length - 1]; var E = a.substr(0, A.length).split(o).filter(function (e) { return e !== d }).length, N = c.substr(0, A.length).split(o).filter(function (e) { return e !== d }).length, F = N !== E, I = void 0 !== a[A.length - 1] && void 0 !== c[A.length - 2] && a[A.length - 1] !== d && a[A.length - 1] !== c[A.length - 1] && a[A.length - 1] === c[A.length - 2]; !x && (F || I) && E > 0 && c.indexOf(S) > -1 && void 0 !== f[l] && (w = !0, S = f[l]); for (var L = v.map(function (e) { return _[e] }), R = L.filter(function (e) { return e === S }).length, J = A.filter(function (e) { return e === S }).length, W = c.substr(0, c.indexOf(d)).split(o).filter(function (e, r) { return e === S && f[r] !== e }).length, q = W + J + R + (w ? 1 : 0), z = 0, B = 0; B < C; B++) { var D = _[B]; if (M = B + 1, D === S && z++, z >= q) break } } if (x) { for (var G = M, H = M; H <= b; H++)if (c[H] === d && (G = H), c[H] === d || m.indexOf(H) !== -1 || H === b) return G } else if (w) { for (var K = M - 1; K >= 0; K--)if (s[K] === S || m.indexOf(K) !== -1 || 0 === K) return K } else for (var Q = M; Q >= 0; Q--)if (c[Q - 1] === d || m.indexOf(Q) !== -1 || 0 === Q) return Q } Object.defineProperty(r, "__esModule", { value: !0 }), r.default = t; var n = [], o = "" }, function (e, r, t) { "use strict"; function n(e) { return e && e.__esModule ? e : { default: e } } function o(e) { var r = { previousConformedValue: void 0, previousPlaceholder: void 0 }; return { state: r, update: function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e, o = n.inputElement, s = n.mask, d = n.guide, m = n.pipe, g = n.placeholderChar, b = void 0 === g ? v.placeholderChar : g, C = n.keepCharPositions, k = void 0 !== C && C, x = n.showMask, P = void 0 !== x && x; if ("undefined" == typeof t && (t = o.value), t !== r.previousConformedValue) { ("undefined" == typeof s ? "undefined" : l(s)) === y && void 0 !== s.pipe && void 0 !== s.mask && (m = s.pipe, s = s.mask); var T = void 0, O = void 0; if (s instanceof Array && (T = (0, p.convertMaskToPlaceholder)(s, b)), s !== !1) { var M = a(t), w = o.selectionEnd, S = r.previousConformedValue, _ = r.previousPlaceholder, j = void 0; if (("undefined" == typeof s ? "undefined" : l(s)) === v.strFunction) { if (O = s(M, { currentCaretPosition: w, previousConformedValue: S, placeholderChar: b }), O === !1) return; var V = (0, p.processCaretTraps)(O), A = V.maskWithoutCaretTraps, E = V.indexes; O = A, j = E, T = (0, p.convertMaskToPlaceholder)(O, b) } else O = s; var N = { previousConformedValue: S, guide: d, placeholderChar: b, pipe: m, placeholder: T, currentCaretPosition: w, keepCharPositions: k }, F = (0, c.default)(M, O, N), I = F.conformedValue, L = ("undefined" == typeof m ? "undefined" : l(m)) === v.strFunction, R = {}; L && (R = m(I, u({ rawValue: M }, N)), R === !1 ? R = { value: S, rejected: !0 } : (0, p.isString)(R) && (R = { value: R })); var J = L ? R.value : I, W = (0, f.default)({ previousConformedValue: S, previousPlaceholder: _, conformedValue: J, placeholder: T, rawValue: M, currentCaretPosition: w, placeholderChar: b, indexesOfPipedChars: R.indexesOfPipedChars, caretTrapIndexes: j }), q = J === T && 0 === W, z = P ? T : h, B = q ? z : J; r.previousConformedValue = B, r.previousPlaceholder = T, o.value !== B && (o.value = B, i(o, W)) } } } } } function i(e, r) { document.activeElement === e && (g ? b(function () { return e.setSelectionRange(r, r, m) }, 0) : e.setSelectionRange(r, r, m)) } function a(e) { if ((0, p.isString)(e)) return e; if ((0, p.isNumber)(e)) return String(e); if (void 0 === e || null === e) return h; throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n " + JSON.stringify(e)) } Object.defineProperty(r, "__esModule", { value: !0 }); var u = Object.assign || function (e) { for (var r = 1; r < arguments.length; r++) { var t = arguments[r]; for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]) } return e }, l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e }; r.default = o; var s = t(4), f = n(s), d = t(2), c = n(d), p = t(3), v = t(1), h = "", m = "none", y = "object", g = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), b = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : setTimeout }]) });

//Keen-slider v5.4.0 - https://github.com/rcbyr/keen-slider
!function (t, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).KeenSlider = n() }(this, (function () { "use strict"; function t(t, n, e) { return n in t ? Object.defineProperty(t, n, { value: e, enumerable: !0, configurable: !0, writable: !0 }) : t[n] = e, t } function n(t, n) { var e = Object.keys(t); if (Object.getOwnPropertySymbols) { var r = Object.getOwnPropertySymbols(t); n && (r = r.filter((function (n) { return Object.getOwnPropertyDescriptor(t, n).enumerable }))), e.push.apply(e, r) } return e } function e(e) { for (var r = 1; r < arguments.length; r++) { var i = null != arguments[r] ? arguments[r] : {}; r % 2 ? n(Object(i), !0).forEach((function (n) { t(e, n, i[n]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach((function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t)) })) } return e } function r(t) { return function (t) { if (Array.isArray(t)) return i(t) }(t) || function (t) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t) }(t) || function (t, n) { if (!t) return; if ("string" == typeof t) return i(t, n); var e = Object.prototype.toString.call(t).slice(8, -1); "Object" === e && t.constructor && (e = t.constructor.name); if ("Map" === e || "Set" === e) return Array.from(t); if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return i(t, n) }(t) || function () { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function i(t, n) { (null == n || n > t.length) && (n = t.length); for (var e = 0, r = new Array(n); e < n; e++)r[e] = t[e]; return r } function o(t) { return Array.prototype.slice.call(t) } function a(t) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document; return "function" == typeof t ? o(t()) : "string" == typeof t ? o(n.querySelectorAll(t)) : t instanceof HTMLElement != !1 ? [t] : t instanceof NodeList != !1 ? t : [] } function u(t, n, e) { return Math.min(Math.max(t, n), e) } return Math.sign || (Math.sign = function (t) { return (t > 0) - (t < 0) || +t }), function (t) { var n, i, o, c, f, s, l, d, h, v, p, m, b, g, w, y, M, O, S, j, A, k, x, E, P, T, D, L, C, X, Y, z, H = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, I = "data-keen-slider-moves", V = "data-keen-slider-v", q = [], F = null, W = !1, _ = !1, K = 0, N = []; function R(t, n, e) { var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}; t.addEventListener(n, e, r), q.push([t, n, e, r]) } function U(t) { if (O && S === J(t) && ut()) { var e = Z(t).x; if (!nt(t) && E) return B(t); E && (Wt(), j = e, n.setAttribute(I, !0), E = !1), t.cancelable && t.preventDefault(), Xt(x(j - e, $t) * (ft() ? -1 : 1), t.timeStamp), j = e } } function $(t) { O || !ut() || tt(t.target) || (O = !0, E = !0, S = J(t), nt(t), ht(), M = v, j = Z(t).x, Xt(0, t.timeStamp), ot("dragStart")) } function B(t) { O && S === J(t, !0) && ut() && (n.removeAttribute(I), O = !1, mt(), ot("dragEnd")) } function G(t) { return t.changedTouches } function J(t) { var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e = n ? G(t) : Q(t); return e ? e[0] ? e[0].identifier : "error" : "default" } function Q(t) { return t.targetTouches } function Z(t) { var n = Q(t); return { x: lt() ? n ? n[0].screenY : t.pageY : n ? n[0].screenX : t.pageX, timestamp: t.timeStamp } } function tt(t) { return t.hasAttribute(y.preventEvent) } function nt(t) { var n = Q(t); if (!n) return !0; var e = n[0], r = lt() ? e.clientY : e.clientX, i = lt() ? e.clientX : e.clientY, o = void 0 !== A && void 0 !== k && Math.abs(k - i) <= Math.abs(A - r); return A = r, k = i, o } function et(t) { ut() && O && t.preventDefault() } function rt() { R(window, "orientationchange", Pt), R(window, "resize", (function () { return Et() })), R(n, "dragstart", (function (t) { ut() && t.preventDefault() })), R(n, "mousedown", $), R(y.cancelOnLeave ? n : window, "mousemove", U), y.cancelOnLeave && R(n, "mouseleave", B), R(window, "mouseup", B), R(n, "touchstart", $, { passive: !0 }), R(n, "touchmove", U, { passive: !1 }), R(n, "touchend", B, { passive: !0 }), R(n, "touchcancel", B, { passive: !0 }), R(window, "wheel", et, { passive: !1 }) } function it() { q.forEach((function (t) { t[0].removeEventListener(t[1], t[2], t[3]) })), q = [] } function ot(t) { y[t] && y[t]($t) } function at() { return y.centered } function ut() { return void 0 !== i ? i : y.controls } function ct() { return y.loop && o > 1 } function ft() { return y.rtl } function st() { return !y.loop && y.rubberband } function lt() { return !!y.vertical } function dt() { P = window.requestAnimationFrame(vt) } function ht() { P && (window.cancelAnimationFrame(P), P = null), T = null } function vt(t) { T || (T = t); var n = t - T, e = pt(n); if (n >= L) return Xt(D - X, !1), z ? z() : void ot("afterChange"); var r = Yt(e); if (0 === r || ct() || st() || Y) { if (0 !== r && st() && !Y) return Mt(); X += e, Xt(e, !1), dt() } else Xt(e - r, !1) } function pt(t) { return D * C(t / L) - X } function mt() { switch (ot("beforeChange"), y.mode) { case "free": wt(); break; case "free-snap": yt(); break; case "snap": default: bt() } } function bt() { gt((1 === l && 0 !== p ? M : v) + Math.sign(p)) } function gt(t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : y.duration, r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o = function (t) { return 1 + --t * t * t * t * t }; Ot(Vt(t = It(t, r, i)), e, o, n) } function wt() { if (0 === b) return !(!Yt(0) || ct()) && gt(v); var t = y.friction / Math.pow(Math.abs(b), -.5); Ot(Math.pow(b, 2) / t * Math.sign(b), 6 * Math.abs(b / t), (function (t) { return 1 - Math.pow(1 - t, 5) })) } function yt() { if (0 === b) return gt(v); var t = y.friction / Math.pow(Math.abs(b), -.5), n = Math.pow(b, 2) / t * Math.sign(b), e = 6 * Math.abs(b / t), r = (K + n) / (s / l); Ot((-1 === p ? Math.floor(r) : Math.ceil(r)) * (s / l) - K, e, (function (t) { return 1 - Math.pow(1 - t, 5) })) } function Mt() { if (ht(), 0 === b) return gt(v, !0); var t = .04 / Math.pow(Math.abs(b), -.5), n = Math.pow(b, 2) / t * Math.sign(b), e = function (t) { return --t * t * t + 1 }, r = b; Ot(n, 3 * Math.abs(r / t), e, !0, (function () { Ot(Vt(It(v)), 500, e, !0) })) } function Ot(t, n, e, r, i) { ht(), D = t, X = 0, L = n, C = e, Y = r, z = i, T = null, dt() } function St(e) { var r = a(t); r.length && (n = r[0], Et(e), rt(), ot("mounted")) } function jt() { var t, n = H.breakpoints || []; for (var r in n) window.matchMedia(r).matches && (t = r); if (t === F) return !0; var i = (F = t) ? n[F] : H; i.breakpoints && F && delete i.breakpoints, y = e(e(e({}, Ut), H), i), W = !0, h = null, xt() } function At(t) { return "function" == typeof t ? t() : u(t, 1, Math.max(ct() ? o - 1 : o, 1)) } function kt() { jt(), _ = !0, ot("created") } function xt(t, n) { t && (H = t), n && (F = null), Tt(), St(n) } function Et(t) { var e = window.innerWidth; if (jt() && (e !== h || t)) { h = e; var r = y.slides; "number" == typeof r ? (f = null, o = r) : (f = a(r, n), o = f ? f.length : 0); var i = y.dragSpeed; x = "function" == typeof i ? i : function (t) { return t * i }, s = lt() ? n.offsetHeight : n.offsetWidth, l = At(y.slidesPerView), d = u(y.spacing, 0, s / (l - 1) - 1), s += d, c = at() ? (s / 2 - s / l / 2) / s : 0, Lt(); var p = !_ || W && y.resetSlide ? y.initial : v; Rt(ct() ? p : zt(p)), lt() && n.setAttribute(V, !0), W = !1 } } function Pt(t) { Et(), setTimeout(Et, 500), setTimeout(Et, 2e3) } function Tt() { it(), Ct(), n && n.hasAttribute(V) && n.removeAttribute(V), ot("destroyed") } function Dt() { f && f.forEach((function (t, n) { var e = g[n].distance * s - n * (s / l - d / l - d / l * (l - 1)), r = lt() ? 0 : e, i = lt() ? e : 0, o = "translate3d(".concat(r, "px, ").concat(i, "px, 0)"); t.style.transform = o, t.style["-webkit-transform"] = o })) } function Lt() { f && f.forEach((function (t) { var n = "calc(".concat(100 / l, "% - ").concat(d / l * (l - 1), "px)"); lt() ? (t.style["min-height"] = n, t.style["max-height"] = n) : (t.style["min-width"] = n, t.style["max-width"] = n) })) } function Ct() { if (f) { var t = ["transform", "-webkit-transform"]; t = [].concat(r(t), lt ? ["min-height", "max-height"] : ["min-width", "max-width"]), f.forEach((function (n) { t.forEach((function (t) { n.style.removeProperty(t) })) })) } } function Xt(t) { var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Date.now(); Ft(t, e), n && (t = Kt(t)), K += t, _t() } function Yt(t) { var n = s * (o - 1 * (at() ? 1 : l)) / l, e = K + t; return e > n ? e - n : e < 0 ? e : 0 } function zt(t) { return u(t, 0, o - 1 - (at() ? 0 : l - 1)) } function Ht() { var t = Math.abs(w), n = K < 0 ? 1 - t : t; return { direction: p, progressTrack: n, progressSlides: n * o / (o - 1), positions: g, position: K, speed: b, relativeSlide: (v % o + o) % o, absoluteSlide: v, size: o, slidesPerView: l, widthOrHeight: s } } function It(t) { var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; return ct() ? n ? qt(t, e) : t : zt(t) } function Vt(t) { return -(-s / l * t + K) } function qt(t, n) { var e = (v % o + o) % o, r = e < (t = (t % o + o) % o) ? -e - o + t : -(e - t), i = e > t ? o - e + t : t - e, a = n ? Math.abs(r) <= i ? r : i : t < e ? r : i; return v + a } function Ft(t, n) { clearTimeout(m); var e = Math.sign(t); if (e !== p && Wt(), p = e, N.push({ distance: t, time: n }), m = setTimeout((function () { N = [], b = 0 }), 50), (N = N.slice(-6)).length <= 1 || 0 === p) return b = 0; var r = N.slice(0, -1).reduce((function (t, n) { return t + n.distance }), 0), i = N[N.length - 1].time, o = N[0].time; b = u(r / (i - o), -10, 10) } function Wt() { N = [] } function _t() { w = ct() ? K % (s * o / l) / (s * o / l) : K / (s * o / l), Nt(); for (var t = [], n = 0; n < o; n++) { var e = (1 / o * n - (w < 0 && ct() ? w + 1 : w)) * o / l + c; ct() && (e += e > (o - 1) / l ? -o / l : e < -o / l + 1 ? o / l : 0); var r = 1 / l, i = e + r, a = i < r ? i / r : i > 1 ? 1 - (i - 1) * l / 1 : 1; t.push({ portion: a < 0 || a > 1 ? 0 : a, distance: ft() ? -1 * e + 1 - r : e }) } g = t, Dt(), ot("move") } function Kt(t) { if (ct()) return t; var n = Yt(t); if (!st()) return t - n; if (0 === n) return t; var e; return t * (e = n / s, (1 - Math.abs(e)) * (1 - Math.abs(e))) } function Nt() { var t = Math.round(K / (s / l)); t !== v && (!ct() && (t < 0 || t > o - 1) || (v = t, ot("slideChanged"))) } function Rt(t) { ot("beforeChange"), Xt(Vt(t), !1), ot("afterChange") } var Ut = { centered: !1, breakpoints: null, controls: !0, dragSpeed: 1, friction: .0025, loop: !1, initial: 0, duration: 500, preventEvent: "data-keen-slider-pe", slides: ".keen-slider__slide", vertical: !1, resetSlide: !1, slidesPerView: 1, spacing: 0, mode: "snap", rtl: !1, rubberband: !0, cancelOnLeave: !0 }, $t = { controls: function (t) { i = t }, destroy: Tt, refresh: function (t) { xt(t, !0) }, next: function () { gt(v + 1, !0) }, prev: function () { gt(v - 1, !0) }, moveToSlide: function (t, n) { gt(t, !0, n) }, moveToSlideRelative: function (t) { var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], e = arguments.length > 2 ? arguments[2] : void 0; gt(t, !0, e, !0, n) }, resize: function () { Et(!0) }, details: function () { return Ht() }, options: function () { var t = e({}, y); return delete t.breakpoints, t } }; return kt(), $t } }));

//Gsap v3.7.0 - https://github.com/greensock/GSAP
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {}) }(this, function (e) { "use strict"; function _inheritsLoose(t, e) { t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e } function _assertThisInitialized(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t } function o(t) { return "string" == typeof t } function p(t) { return "function" == typeof t } function q(t) { return "number" == typeof t } function r(t) { return void 0 === t } function s(t) { return "object" == typeof t } function t(t) { return !1 !== t } function u() { return "undefined" != typeof window } function v(t) { return p(t) || o(t) } function M(t) { return (h = mt(t, ot)) && se } function N(t, e) { return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()") } function O(t, e) { return !e && console.warn(t) } function P(t, e) { return t && (ot[t] = e) && h && (h[t] = e) || ot } function Q() { return 0 } function $(t) { var e, r, i = t[0]; if (s(i) || p(i) || (t = [t]), !(e = (i._gsap || {}).harness)) { for (r = pt.length; r-- && !pt[r].targetTest(i);); e = pt[r] } for (r = t.length; r--;)t[r] && (t[r]._gsap || (t[r]._gsap = new Rt(t[r], e))) || t.splice(r, 1); return t } function _(t) { return t._gsap || $(wt(t))[0]._gsap } function aa(t, e, i) { return (i = t[e]) && p(i) ? t[e]() : r(i) && t.getAttribute && t.getAttribute(e) || i } function ba(t, e) { return (t = t.split(",")).forEach(e) || t } function ca(t) { return Math.round(1e5 * t) / 1e5 || 0 } function da(t, e) { for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r;); return i < r } function ea() { var t, e, r = ht.length, i = ht.slice(0); for (lt = {}, t = ht.length = 0; t < r; t++)(e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0) } function fa(t, e, r, i) { ht.length && ea(), t.render(e, r, i), ht.length && ea() } function ga(t) { var e = parseFloat(t); return (e || 0 === e) && (t + "").match(at).length < 2 ? e : o(t) ? t.trim() : t } function ha(t) { return t } function ia(t, e) { for (var r in e) r in t || (t[r] = e[r]); return t } function ja(t, e) { for (var r in e) r in t || "duration" === r || "ease" === r || (t[r] = e[r]) } function la(t, e) { for (var r in e) "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = s(e[r]) ? la(t[r] || (t[r] = {}), e[r]) : e[r]); return t } function ma(t, e) { var r, i = {}; for (r in t) r in e || (i[r] = t[r]); return i } function na(e) { var r = e.parent || R, i = e.keyframes ? ja : ia; if (t(e.inherit)) for (; r;)i(e, r.vars.defaults), r = r.parent || r._dp; return e } function qa(t, e, r, i) { void 0 === r && (r = "_first"), void 0 === i && (i = "_last"); var n = e._prev, a = e._next; n ? n._next = a : t[r] === e && (t[r] = a), a ? a._prev = n : t[i] === e && (t[i] = n), e._next = e._prev = e.parent = null } function ra(t, e) { !t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0 } function sa(t, e) { if (t && (!e || e._end > t._dur || e._start < 0)) for (var r = t; r;)r._dirty = 1, r = r.parent; return t } function va(t) { return t._repeat ? gt(t._tTime, t = t.duration() + t._rDelay) * t : 0 } function xa(t, e) { return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur) } function ya(t) { return t._end = ca(t._start + (t._tDur / Math.abs(t._ts || t._rts || U) || 0)) } function za(t, e) { var r = t._dp; return r && r.smoothChildTiming && t._ts && (t._start = ca(r._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), ya(t), r._dirty || sa(r, t)), t } function Aa(t, e) { var r; if ((e._time || e._initted && !e._dur) && (r = xa(t.rawTime(), e), (!e._dur || bt(0, e.totalDuration(), r) - e._tTime > U) && e.render(r, !0)), sa(t, e)._dp && t._initted && t._time >= t._dur && t._ts) { if (t._dur < t.duration()) for (r = t; r._dp;)0 <= r.rawTime() && r.totalTime(r._tTime), r = r._dp; t._zTime = -U } } function Ba(t, e, r, i) { return e.parent && ra(e), e._start = ca((q(r) ? r : r || t !== R ? yt(t, r, e) : t._time) + e._delay), e._end = ca(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), function _addLinkedListItem(t, e, r, i, n) { void 0 === r && (r = "_first"), void 0 === i && (i = "_last"); var a, s = t[i]; if (n) for (a = e[n]; s && s[n] > a;)s = s._prev; s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = s, e.parent = e._dp = t }(t, e, "_first", "_last", t._sort ? "_start" : 0), t._recent = e, i || Aa(t, e), t } function Ca(t, e) { return (ot.ScrollTrigger || N("scrollTrigger", e)) && ot.ScrollTrigger.create(e, t) } function Da(t, e, r, i) { return Xt(t, e), t._initted ? !r && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && f !== St.frame ? (ht.push(t), t._lazy = [e, i], 1) : void 0 : 1 } function Fa(t) { var e = t.data; return "isFromStart" === e || "isStart" === e } function Ia(t, e, r, i) { var n = t._repeat, a = ca(e) || 0, s = t._tTime / t._tDur; return s && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = n ? n < 0 ? 1e10 : ca(a * (n + 1) + t._rDelay * n) : a, s && !i ? za(t, t._tTime = t._tDur * s) : t.parent && ya(t), r || sa(t.parent, t), t } function Ja(t) { return t instanceof Nt ? sa(t) : Ia(t, t._dur) } function Ma(e, r, i) { var n, a, s = q(r[1]), o = (s ? 2 : 1) + (e < 2 ? 0 : 1), u = r[o]; if (s && (u.duration = r[1]), u.parent = i, e) { for (n = u, a = i; a && !("immediateRender" in n);)n = a.vars.defaults || {}, a = t(a.vars.inherit) && a.parent; u.immediateRender = t(n.immediateRender), e < 2 ? u.runBackwards = 1 : u.startAt = r[o - 1] } return new Wt(r[0], u, r[1 + o]) } function Na(t, e) { return t || 0 === t ? e(t) : e } function Pa(t) { if ("string" != typeof t) return ""; var e = st.exec(t); return e ? t.substr(e.index + e[0].length) : "" } function Sa(t, e) { return t && s(t) && "length" in t && (!e && !t.length || t.length - 1 in t && s(t[0])) && !t.nodeType && t !== i } function Wa(t) { return t.sort(function () { return .5 - Math.random() }) } function Xa(t) { if (p(t)) return t; var _ = s(t) ? t : { each: t }, m = Et(_.ease), g = _.from || 0, v = parseFloat(_.base) || 0, y = {}, e = 0 < g && g < 1, b = isNaN(g) || e, T = _.axis, w = g, x = g; return o(g) ? w = x = { center: .5, edges: .5, end: 1 }[g] || 0 : !e && b && (w = g[0], x = g[1]), function (t, e, r) { var i, n, a, s, o, u, h, l, f, d = (r || _).length, c = y[d]; if (!c) { if (!(f = "auto" === _.grid ? 0 : (_.grid || [1, X])[1])) { for (h = -X; h < (h = r[f++].getBoundingClientRect().left) && f < d;); f-- } for (c = y[d] = [], i = b ? Math.min(f, d) * w - .5 : g % f, n = b ? d * x / f - .5 : g / f | 0, l = X, u = h = 0; u < d; u++)a = u % f - i, s = n - (u / f | 0), c[u] = o = T ? Math.abs("y" === T ? s : a) : G(a * a + s * s), h < o && (h = o), o < l && (l = o); "random" === g && Wa(c), c.max = h - l, c.min = l, c.v = d = (parseFloat(_.amount) || parseFloat(_.each) * (d < f ? d - 1 : T ? "y" === T ? d / f : f : Math.max(f, d / f)) || 0) * ("edges" === g ? -1 : 1), c.b = d < 0 ? v - d : v, c.u = Pa(_.amount || _.each) || 0, m = m && d < 0 ? Bt(m) : m } return d = (c[t] - c.min) / c.max || 0, ca(c.b + (m ? m(d) : d) * c.v) + c.u } } function Ya(r) { var i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1; return function (t) { var e = Math.round(parseFloat(t) / r) * r * i; return (e - e % 1) / i + (q(t) ? 0 : Pa(t)) } } function Za(u, t) { var h, l, e = H(u); return !e && s(u) && (h = e = u.radius || X, u.values ? (u = wt(u.values), (l = !q(u[0])) && (h *= h)) : u = Ya(u.increment)), Na(t, e ? p(u) ? function (t) { return l = u(t), Math.abs(l - t) <= h ? l : t } : function (t) { for (var e, r, i = parseFloat(l ? t.x : t), n = parseFloat(l ? t.y : 0), a = X, s = 0, o = u.length; o--;)(e = l ? (e = u[o].x - i) * e + (r = u[o].y - n) * r : Math.abs(u[o] - i)) < a && (a = e, s = o); return s = !h || a <= h ? u[s] : t, l || s === t || q(t) ? s : s + Pa(t) } : Ya(u)) } function $a(t, e, r, i) { return Na(H(t) ? !e : !0 === r ? !!(r = 0) : !i, function () { return H(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * i) / i }) } function cb(e, r, t) { return Na(t, function (t) { return e[~~r(t)] }) } function fb(t) { for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a));)i = t.indexOf(")", e), n = "[" === t.charAt(e + 7), r = t.substr(e + 7, i - e - 7).match(n ? at : tt), s += t.substr(a, e - a) + $a(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5), a = i + 1; return s + t.substr(a, t.length - a) } function ib(t, e, r) { var i, n, a, s = t.labels, o = X; for (i in s) (n = s[i] - e) < 0 == !!r && n && o > (n = Math.abs(n)) && (a = i, o = n); return a } function kb(t) { return ra(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && Ot(t, "onInterrupt"), t } function pb(t, e, r) { return (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * Pt + .5 | 0 } function qb(t, e, r) { var i, n, a, s, o, u, h, l, f, d, c = t ? q(t) ? [t >> 16, t >> 8 & Pt, t & Pt] : 0 : kt.black; if (!c) { if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), kt[t]) c = kt[t]; else if ("#" === t.charAt(0)) { if (t.length < 6 && (t = "#" + (i = t.charAt(1)) + i + (n = t.charAt(2)) + n + (a = t.charAt(3)) + a + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(c = parseInt(t.substr(1, 6), 16)) >> 16, c >> 8 & Pt, c & Pt, parseInt(t.substr(7), 16) / 255]; c = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & Pt, t & Pt] } else if ("hsl" === t.substr(0, 3)) if (c = d = t.match(tt), e) { if (~t.indexOf("=")) return c = t.match(et), r && c.length < 4 && (c[3] = 1), c } else s = +c[0] % 360 / 360, o = c[1] / 100, i = 2 * (u = c[2] / 100) - (n = u <= .5 ? u * (o + 1) : u + o - u * o), 3 < c.length && (c[3] *= 1), c[0] = pb(s + 1 / 3, i, n), c[1] = pb(s, i, n), c[2] = pb(s - 1 / 3, i, n); else c = t.match(tt) || kt.transparent; c = c.map(Number) } return e && !d && (i = c[0] / Pt, n = c[1] / Pt, a = c[2] / Pt, u = ((h = Math.max(i, n, a)) + (l = Math.min(i, n, a))) / 2, h === l ? s = o = 0 : (f = h - l, o = .5 < u ? f / (2 - h - l) : f / (h + l), s = h === i ? (n - a) / f + (n < a ? 6 : 0) : h === n ? (a - i) / f + 2 : (i - n) / f + 4, s *= 60), c[0] = ~~(s + .5), c[1] = ~~(100 * o + .5), c[2] = ~~(100 * u + .5)), r && c.length < 4 && (c[3] = 1), c } function rb(t) { var r = [], i = [], n = -1; return t.split(Mt).forEach(function (t) { var e = t.match(rt) || []; r.push.apply(r, e), i.push(n += e.length + 1) }), r.c = i, r } function sb(t, e, r) { var i, n, a, s, o = "", u = (t + o).match(Mt), h = e ? "hsla(" : "rgba(", l = 0; if (!u) return t; if (u = u.map(function (t) { return (t = qb(t, e, 1)) && h + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")" }), r && (a = rb(t), (i = r.c).join(o) !== a.c.join(o))) for (s = (n = t.replace(Mt, "1").split(rt)).length - 1; l < s; l++)o += n[l] + (~i.indexOf(l) ? u.shift() || h + "0,0,0,0)" : (a.length ? a : u.length ? u : r).shift()); if (!n) for (s = (n = t.split(Mt)).length - 1; l < s; l++)o += n[l] + u[l]; return o + n[s] } function vb(t) { var e, r = t.join(" "); if (Mt.lastIndex = 0, Mt.test(r)) return e = At.test(r), t[1] = sb(t[1], e), t[0] = sb(t[0], e, rb(t[1])), !0 } function Eb(t) { var e = (t + "").split("("), r = Dt[e[0]]; return r && 1 < e.length && r.config ? r.config.apply(null, ~t.indexOf("{") ? [function _parseObjectInString(t) { for (var e, r, i, n = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, u = a.length; o < u; o++)r = a[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, i = r.substr(0, e), n[s] = isNaN(i) ? i.replace(It, "").trim() : +i, s = r.substr(e + 1).trim(); return n }(e[1])] : function _valueInParentheses(t) { var e = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", e); return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r) }(t).split(",").map(ga)) : Dt._CE && zt.test(t) ? Dt._CE("", t) : r } function Gb(t, e) { for (var r, i = t._first; i;)i instanceof Nt ? Gb(i, e) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === e || (i.timeline ? Gb(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next } function Ib(t, e, r, i) { void 0 === r && (r = function easeOut(t) { return 1 - e(1 - t) }), void 0 === i && (i = function easeInOut(t) { return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2 }); var n, a = { easeIn: e, easeOut: r, easeInOut: i }; return ba(t, function (t) { for (var e in Dt[t] = ot[t] = a, Dt[n = t.toLowerCase()] = r, a) Dt[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Dt[t + "." + e] = a[e] }), a } function Jb(e) { return function (t) { return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2 } } function Kb(r, t, e) { function Ol(t) { return 1 === t ? 1 : i * Math.pow(2, -10 * t) * J((t - a) * n) + 1 } var i = 1 <= t ? t : 1, n = (e || (r ? .3 : .45)) / (t < 1 ? t : 1), a = n / V * (Math.asin(1 / i) || 0), s = "out" === r ? Ol : "in" === r ? function (t) { return 1 - Ol(1 - t) } : Jb(Ol); return n = V / n, s.config = function (t, e) { return Kb(r, t, e) }, s } function Lb(e, r) { function Wl(t) { return t ? --t * t * ((r + 1) * t + r) + 1 : 0 } void 0 === r && (r = 1.70158); var t = "out" === e ? Wl : "in" === e ? function (t) { return 1 - Wl(1 - t) } : Jb(Wl); return t.config = function (t) { return Lb(e, t) }, t } var F, R, i, n, a, h, l, f, d, c, m, g, y, b, T, w, x, k, A, S, C, D, z, I, B, E, Y = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } }, L = { duration: .5, overwrite: !1, delay: 0 }, X = 1e8, U = 1 / X, V = 2 * Math.PI, j = V / 4, W = 0, G = Math.sqrt, K = Math.cos, J = Math.sin, Z = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function () { }, H = Array.isArray, tt = /(?:-?\.?\d|\.)+/gi, et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, nt = /[+-]=-?[.\d]+/, at = /[^,'"\[\]\s]+/gi, st = /[\d.+\-=]+(?:e[-+]\d*)*/i, ot = {}, ut = {}, ht = [], lt = {}, ft = {}, dt = {}, ct = 30, pt = [], _t = "", mt = function _merge(t, e) { for (var r in e) t[r] = e[r]; return t }, gt = function _animationCycle(t, e) { var r = Math.floor(t /= e); return t && r === t ? r - 1 : r }, vt = { _start: 0, endTime: Q, totalDuration: Q }, yt = function _parsePosition(t, e, r) { var i, n, a, s = t.labels, u = t._recent || vt, h = t.duration() >= X ? u.endTime(!1) : t._dur; return o(e) && (isNaN(e) || e in s) ? (i = e.charAt(0), a = "%" === e.substr(-1), "<" === i || ">" === i ? ("<" === i ? u._start : u.endTime(0 <= u._repeat)) + (parseFloat(e.substr(1)) || 0) * (a ? u.totalDuration() / 100 : 1) : (i = e.indexOf("=")) < 0 ? (e in s || (s[e] = h), s[e]) : (n = parseFloat(e.charAt(i - 1) + e.substr(i + 1)), a && r && (n = n / 100 * (H(r) ? r[0] : r).totalDuration()), 1 < i ? _parsePosition(t, e.substr(0, i - 1), r) + n : h + n)) : null == e ? h : +e }, bt = function _clamp(t, e, r) { return r < t ? t : e < r ? e : r }, Tt = [].slice, wt = function toArray(t, e, r) { return !o(t) || r || !n && Ct() ? H(t) ? function _flatten(t, e, r) { return void 0 === r && (r = []), t.forEach(function (t) { return o(t) && !e || Sa(t, 1) ? r.push.apply(r, wt(t)) : r.push(t) }) || r }(t, r) : Sa(t) ? Tt.call(t, 0) : t ? [t] : [] : Tt.call((e || a).querySelectorAll(t), 0) }, xt = function mapRange(e, t, r, i, n) { var a = t - e, s = i - r; return Na(n, function (t) { return r + ((t - e) / a * s || 0) }) }, Ot = function _callback(t, e, r) { var i, n, a = t.vars, s = a[e]; if (s) return i = a[e + "Params"], n = a.callbackScope || t, r && ht.length && ea(), i ? s.apply(n, i) : s.call(n) }, Pt = 255, kt = { aqua: [0, Pt, Pt], lime: [0, Pt, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, Pt], navy: [0, 0, 128], white: [Pt, Pt, Pt], olive: [128, 128, 0], yellow: [Pt, Pt, 0], orange: [Pt, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [Pt, 0, 0], pink: [Pt, 192, 203], cyan: [0, Pt, Pt], transparent: [Pt, Pt, Pt, 0] }, Mt = function () { var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b"; for (t in kt) e += "|" + t + "\\b"; return new RegExp(e + ")", "gi") }(), At = /hsl[a]?\(/, St = (x = Date.now, k = 500, A = 33, S = x(), C = S, z = D = 1e3 / 240, b = { time: 0, frame: 0, tick: function tick() { Kk(!0) }, deltaRatio: function deltaRatio(t) { return T / (1e3 / (t || 60)) }, wake: function wake() { l && (!n && u() && (i = n = window, a = i.document || {}, ot.gsap = se, (i.gsapVersions || (i.gsapVersions = [])).push(se.version), M(h || i.GreenSockGlobals || !i.gsap && i || {}), y = i.requestAnimationFrame), m && b.sleep(), g = y || function (t) { return setTimeout(t, z - 1e3 * b.time + 1 | 0) }, c = 1, Kk(2)) }, sleep: function sleep() { (y ? i.cancelAnimationFrame : clearTimeout)(m), c = 0, g = Q }, lagSmoothing: function lagSmoothing(t, e) { k = t || 1e8, A = Math.min(e, k, 0) }, fps: function fps(t) { D = 1e3 / (t || 240), z = 1e3 * b.time + D }, add: function add(t) { I.indexOf(t) < 0 && I.push(t), Ct() }, remove: function remove(t) { var e; ~(e = I.indexOf(t)) && I.splice(e, 1) && e <= w && w-- }, _listeners: I = [] }), Ct = function _wake() { return !c && St.wake() }, Dt = {}, zt = /^[\d.\-M][\d.\-,\s]/, It = /["']/g, Bt = function _invertEase(e) { return function (t) { return 1 - e(1 - t) } }, Et = function _parseEase(t, e) { return t && (p(t) ? t : Dt[t] || Eb(t)) || e }; function Kk(t) { var e, r, i, n, a = x() - C, s = !0 === t; if (k < a && (S += a - A), (0 < (e = (i = (C += a) - S) - z) || s) && (n = ++b.frame, T = i - 1e3 * b.time, b.time = i /= 1e3, z += e + (D <= e ? 4 : D - e), r = 1), s || (m = g(Kk)), r) for (w = 0; w < I.length; w++)I[w](i, T, n, t) } function lm(t) { return t < E ? B * t * t : t < .7272727272727273 ? B * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? B * (t -= 2.25 / 2.75) * t + .9375 : B * Math.pow(t - 2.625 / 2.75, 2) + .984375 } ba("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) { var r = e < 5 ? e + 1 : e; Ib(t + ",Power" + (r - 1), e ? function (t) { return Math.pow(t, r) } : function (t) { return t }, function (t) { return 1 - Math.pow(1 - t, r) }, function (t) { return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2 }) }), Dt.Linear.easeNone = Dt.none = Dt.Linear.easeIn, Ib("Elastic", Kb("in"), Kb("out"), Kb()), B = 7.5625, E = 1 / 2.75, Ib("Bounce", function (t) { return 1 - lm(1 - t) }, lm), Ib("Expo", function (t) { return t ? Math.pow(2, 10 * (t - 1)) : 0 }), Ib("Circ", function (t) { return -(G(1 - t * t) - 1) }), Ib("Sine", function (t) { return 1 === t ? 1 : 1 - K(t * j) }), Ib("Back", Lb("in"), Lb("out"), Lb()), Dt.SteppedEase = Dt.steps = ot.SteppedEase = { config: function config(t, e) { void 0 === t && (t = 1); var r = 1 / t, i = t + (e ? 0 : 1), n = e ? 1 : 0; return function (t) { return ((i * bt(0, .99999999, t) | 0) + n) * r } } }, L.ease = Dt["quad.out"], ba("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) { return _t += t + "," + t + "Params," }); var Ft, Rt = function GSCache(t, e) { this.id = W++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : aa, this.set = e ? e.getSetter : $t }, Lt = ((Ft = Animation.prototype).delay = function delay(t) { return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay }, Ft.duration = function duration(t) { return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur }, Ft.totalDuration = function totalDuration(t) { return arguments.length ? (this._dirty = 0, Ia(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur }, Ft.totalTime = function totalTime(t, e) { if (Ct(), !arguments.length) return this._tTime; var r = this._dp; if (r && r.smoothChildTiming && this._ts) { for (za(this, t), !r._dp || r.parent || Aa(r, this); r.parent;)r.parent._time !== r._start + (0 <= r._ts ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent; !this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && Ba(this._dp, this, this._start - this._delay) } return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === U || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), fa(this, t, e)), this }, Ft.time = function time(t, e) { return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + va(this)) % this._dur || (t ? this._dur : 0), e) : this._time }, Ft.totalProgress = function totalProgress(t, e) { return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio }, Ft.progress = function progress(t, e) { return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + va(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio }, Ft.iteration = function iteration(t, e) { var r = this.duration() + this._rDelay; return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? gt(this._tTime, r) + 1 : 1 }, Ft.timeScale = function timeScale(t) { if (!arguments.length) return this._rts === -U ? 0 : this._rts; if (this._rts === t) return this; var e = this.parent && this._ts ? xa(this.parent._time, this) : this._tTime; return this._rts = +t || 0, this._ts = this._ps || t === -U ? 0 : this._rts, function _recacheAncestors(t) { for (var e = t.parent; e && e.parent;)e._dirty = 1, e.totalDuration(), e = e.parent; return t }(this.totalTime(bt(-this._delay, this._tDur, e), !0)) }, Ft.paused = function paused(t) { return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ct(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && (this._tTime -= U) && Math.abs(this._zTime) !== U))), this) : this._ps }, Ft.startTime = function startTime(t) { if (arguments.length) { this._start = t; var e = this.parent || this._dp; return !e || !e._sort && this.parent || Ba(e, this, t - this._delay), this } return this._start }, Ft.endTime = function endTime(e) { return this._start + (t(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts) }, Ft.rawTime = function rawTime(t) { var e = this.parent || this._dp; return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? xa(e.rawTime(t), this) : this._tTime : this._tTime }, Ft.globalTime = function globalTime(t) { for (var e = this, r = arguments.length ? t : e.rawTime(); e;)r = e._start + r / (e._ts || 1), e = e._dp; return r }, Ft.repeat = function repeat(t) { return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Ja(this)) : -2 === this._repeat ? 1 / 0 : this._repeat }, Ft.repeatDelay = function repeatDelay(t) { return arguments.length ? (this._rDelay = t, Ja(this)) : this._rDelay }, Ft.yoyo = function yoyo(t) { return arguments.length ? (this._yoyo = t, this) : this._yoyo }, Ft.seek = function seek(e, r) { return this.totalTime(yt(this, e), t(r)) }, Ft.restart = function restart(e, r) { return this.play().totalTime(e ? -this._delay : 0, t(r)) }, Ft.play = function play(t, e) { return null != t && this.seek(t, e), this.reversed(!1).paused(!1) }, Ft.reverse = function reverse(t, e) { return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1) }, Ft.pause = function pause(t, e) { return null != t && this.seek(t, e), this.paused(!0) }, Ft.resume = function resume() { return this.paused(!1) }, Ft.reversed = function reversed(t) { return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -U : 0)), this) : this._rts < 0 }, Ft.invalidate = function invalidate() { return this._initted = this._act = 0, this._zTime = -U, this }, Ft.isActive = function isActive() { var t, e = this.parent || this._dp, r = this._start; return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - U)) }, Ft.eventCallback = function eventCallback(t, e, r) { var i = this.vars; return 1 < arguments.length ? (e ? (i[t] = e, r && (i[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete i[t], this) : i[t] }, Ft.then = function then(t) { var i = this; return new Promise(function (e) { function Bn() { var t = i.then; i.then = null, p(r) && (r = r(i)) && (r.then || r === i) && (i.then = t), e(r), i.then = t } var r = p(t) ? t : ha; i._initted && 1 === i.totalProgress() && 0 <= i._ts || !i._tTime && i._ts < 0 ? Bn() : i._prom = Bn }) }, Ft.kill = function kill() { kb(this) }, Animation); function Animation(t) { this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Ia(this, +t.duration, 1, 1), this.data = t.data, c || St.wake() } ia(Lt.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -U, _prom: 0, _ps: !1, _rts: 1 }); var Nt = function (n) { function Timeline(e, r) { var i; return void 0 === e && (e = {}), (i = n.call(this, e) || this).labels = {}, i.smoothChildTiming = !!e.smoothChildTiming, i.autoRemoveChildren = !!e.autoRemoveChildren, i._sort = t(e.sortChildren), R && Ba(e.parent || R, _assertThisInitialized(i), r), e.reversed && i.reverse(), e.paused && i.paused(!0), e.scrollTrigger && Ca(_assertThisInitialized(i), e.scrollTrigger), i } _inheritsLoose(Timeline, n); var e = Timeline.prototype; return e.to = function to(t, e, r) { return Ma(0, arguments, this), this }, e.from = function from(t, e, r) { return Ma(1, arguments, this), this }, e.fromTo = function fromTo(t, e, r, i) { return Ma(2, arguments, this), this }, e.set = function set(t, e, r) { return e.duration = 0, e.parent = this, na(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Wt(t, e, yt(this, r), 1), this }, e.call = function call(t, e, r) { return Ba(this, Wt.delayedCall(0, t, e), r) }, e.staggerTo = function staggerTo(t, e, r, i, n, a, s) { return r.duration = e, r.stagger = r.stagger || i, r.onComplete = a, r.onCompleteParams = s, r.parent = this, new Wt(t, r, yt(this, n)), this }, e.staggerFrom = function staggerFrom(e, r, i, n, a, s, o) { return i.runBackwards = 1, na(i).immediateRender = t(i.immediateRender), this.staggerTo(e, r, i, n, a, s, o) }, e.staggerFromTo = function staggerFromTo(e, r, i, n, a, s, o, u) { return n.startAt = i, na(n).immediateRender = t(n.immediateRender), this.staggerTo(e, r, n, a, s, o, u) }, e.render = function render(t, e, r) { var i, n, a, s, o, u, h, l, f, d, c, p, _ = this._time, m = this._dirty ? this.totalDuration() : this._tDur, g = this._dur, v = this !== R && m - U < t && 0 <= t ? m : t < U ? 0 : t, y = this._zTime < 0 != t < 0 && (this._initted || !g); if (v !== this._tTime || r || y) { if (_ !== this._time && g && (v += this._time - _, t += this._time - _), i = v, f = this._start, u = !(l = this._ts), y && (g || (_ = this._zTime), !t && e || (this._zTime = t)), this._repeat) { if (c = this._yoyo, o = g + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * o + t, e, r); if (i = ca(v % o), v === m ? (s = this._repeat, i = g) : ((s = ~~(v / o)) && s === v / o && (i = g, s--), g < i && (i = g)), d = gt(this._tTime, o), !_ && this._tTime && d !== s && (d = s), c && 1 & s && (i = g - i, p = 1), s !== d && !this._lock) { var b = c && 1 & d, T = b === (c && 1 & s); if (s < d && (b = !b), _ = b ? 0 : g, this._lock = 1, this.render(_ || (p ? 0 : ca(s * o)), e, !g)._lock = 0, this._tTime = v, !e && this.parent && Ot(this, "onRepeat"), this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1), _ && _ !== this._time || u != !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this; if (g = this._dur, m = this._tDur, T && (this._lock = 2, _ = b ? g : -1e-4, this.render(_, !0), this.vars.repeatRefresh && !p && this.invalidate()), this._lock = 0, !this._ts && !u) return this; Gb(this, p) } } if (this._hasPause && !this._forcing && this._lock < 2 && (h = function _findNextPauseTween(t, e, r) { var i; if (e < r) for (i = t._first; i && i._start <= r;) { if (!i._dur && "isPause" === i.data && i._start > e) return i; i = i._next } else for (i = t._last; i && i._start >= r;) { if (!i._dur && "isPause" === i.data && i._start < e) return i; i = i._prev } }(this, ca(_), ca(i))) && (v -= i - (i = h._start)), this._tTime = v, this._time = i, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, _ = 0), !_ && i && !e && (Ot(this, "onStart"), this._tTime !== v)) return this; if (_ <= i && 0 <= t) for (n = this._first; n;) { if (a = n._next, (n._act || i >= n._start) && n._ts && h !== n) { if (n.parent !== this) return this.render(t, e, r); if (n.render(0 < n._ts ? (i - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (i - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) { h = 0, a && (v += this._zTime = -U); break } } n = a } else { n = this._last; for (var w = t < 0 ? t : i; n;) { if (a = n._prev, (n._act || w <= n._end) && n._ts && h !== n) { if (n.parent !== this) return this.render(t, e, r); if (n.render(0 < n._ts ? (w - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (w - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) { h = 0, a && (v += this._zTime = w ? -U : U); break } } n = a } } if (h && !e && (this.pause(), h.render(_ <= i ? 0 : -U)._zTime = _ <= i ? 1 : -1, this._ts)) return this._start = f, ya(this), this.render(t, e, r); this._onUpdate && !e && Ot(this, "onUpdate", !0), (v === m && m >= this.totalDuration() || !v && _) && (f !== this._start && Math.abs(l) === Math.abs(this._ts) || this._lock || (!t && g || !(v === m && 0 < this._ts || !v && this._ts < 0) || ra(this, 1), e || t < 0 && !_ || !v && !_ && m || (Ot(this, v === m && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || v < m && 0 < this.timeScale() || this._prom()))) } return this }, e.add = function add(t, e) { var r = this; if (q(e) || (e = yt(this, e, t)), !(t instanceof Lt)) { if (H(t)) return t.forEach(function (t) { return r.add(t, e) }), this; if (o(t)) return this.addLabel(t, e); if (!p(t)) return this; t = Wt.delayedCall(0, t) } return this !== t ? Ba(this, t, e) : this }, e.getChildren = function getChildren(t, e, r, i) { void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === i && (i = -X); for (var n = [], a = this._first; a;)a._start >= i && (a instanceof Wt ? e && n.push(a) : (r && n.push(a), t && n.push.apply(n, a.getChildren(!0, e, r)))), a = a._next; return n }, e.getById = function getById(t) { for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)if (e[r].vars.id === t) return e[r] }, e.remove = function remove(t) { return o(t) ? this.removeLabel(t) : p(t) ? this.killTweensOf(t) : (qa(this, t), t === this._recent && (this._recent = this._last), sa(this)) }, e.totalTime = function totalTime(t, e) { return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ca(St.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts))), n.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime }, e.addLabel = function addLabel(t, e) { return this.labels[t] = yt(this, e), this }, e.removeLabel = function removeLabel(t) { return delete this.labels[t], this }, e.addPause = function addPause(t, e, r) { var i = Wt.delayedCall(0, e || Q, r); return i.data = "isPause", this._hasPause = 1, Ba(this, i, yt(this, t)) }, e.removePause = function removePause(t) { var e = this._first; for (t = yt(this, t); e;)e._start === t && "isPause" === e.data && ra(e), e = e._next }, e.killTweensOf = function killTweensOf(t, e, r) { for (var i = this.getTweensOf(t, r), n = i.length; n--;)qt !== i[n] && i[n].kill(t, e); return this }, e.getTweensOf = function getTweensOf(t, e) { for (var r, i = [], n = wt(t), a = this._first, s = q(e); a;)a instanceof Wt ? da(a._targets, n) && (s ? (!qt || a._initted && a._ts) && a.globalTime(0) <= e && a.globalTime(a.totalDuration()) > e : !e || a.isActive()) && i.push(a) : (r = a.getTweensOf(n, e)).length && i.push.apply(i, r), a = a._next; return i }, e.tweenTo = function tweenTo(t, e) { e = e || {}; var r = this, i = yt(r, t), n = e.startAt, a = e.onStart, s = e.onStartParams, o = e.immediateRender, u = Wt.to(r, ia({ ease: e.ease || "none", lazy: !1, immediateRender: !1, time: i, overwrite: "auto", duration: e.duration || Math.abs((i - (n && "time" in n ? n.time : r._time)) / r.timeScale()) || U, onStart: function onStart() { r.pause(); var t = e.duration || Math.abs((i - r._time) / r.timeScale()); u._dur !== t && Ia(u, t, 0, 1).render(u._time, !0, !0), a && a.apply(u, s || []) } }, e)); return o ? u.render(0) : u }, e.tweenFromTo = function tweenFromTo(t, e, r) { return this.tweenTo(e, ia({ startAt: { time: yt(this, t) } }, r)) }, e.recent = function recent() { return this._recent }, e.nextLabel = function nextLabel(t) { return void 0 === t && (t = this._time), ib(this, yt(this, t)) }, e.previousLabel = function previousLabel(t) { return void 0 === t && (t = this._time), ib(this, yt(this, t), 1) }, e.currentLabel = function currentLabel(t) { return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + U) }, e.shiftChildren = function shiftChildren(t, e, r) { void 0 === r && (r = 0); for (var i, n = this._first, a = this.labels; n;)n._start >= r && (n._start += t, n._end += t), n = n._next; if (e) for (i in a) a[i] >= r && (a[i] += t); return sa(this) }, e.invalidate = function invalidate() { var t = this._first; for (this._lock = 0; t;)t.invalidate(), t = t._next; return n.prototype.invalidate.call(this) }, e.clear = function clear(t) { void 0 === t && (t = !0); for (var e, r = this._first; r;)e = r._next, this.remove(r), r = e; return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), sa(this) }, e.totalDuration = function totalDuration(t) { var e, r, i, n = 0, a = this, s = a._last, o = X; if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t)); if (a._dirty) { for (i = a.parent; s;)e = s._prev, s._dirty && s.totalDuration(), o < (r = s._start) && a._sort && s._ts && !a._lock ? (a._lock = 1, Ba(a, s, r - s._delay, 1)._lock = 0) : o = r, r < 0 && s._ts && (n -= r, (!i && !a._dp || i && i.smoothChildTiming) && (a._start += r / a._ts, a._time -= r, a._tTime -= r), a.shiftChildren(-r, !1, -Infinity), o = 0), s._end > n && s._ts && (n = s._end), s = e; Ia(a, a === R && a._time > n ? a._time : n, 1, 1), a._dirty = 0 } return a._tDur }, Timeline.updateRoot = function updateRoot(t) { if (R._ts && (fa(R, xa(t, R)), f = St.frame), St.frame >= ct) { ct += Y.autoSleep || 120; var e = R._first; if ((!e || !e._ts) && Y.autoSleep && St._listeners.length < 2) { for (; e && !e._ts;)e = e._next; e || St.sleep() } } }, Timeline }(Lt); ia(Nt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 }); function Sb(t, e, r, i, n, a) { var u, h, l, f; if (ft[t] && !1 !== (u = new ft[t]).init(n, u.rawVars ? e[t] : function _processVars(t, e, r, i, n) { if (p(t) && (t = Ut(t, n, e, r, i)), !s(t) || t.style && t.nodeType || H(t) || Z(t)) return o(t) ? Ut(t, n, e, r, i) : t; var a, u = {}; for (a in t) u[a] = Ut(t[a], n, e, r, i); return u }(e[t], i, n, a, r), r, i, a) && (r._pt = h = new ne(r._pt, n, t, 0, 1, u.render, u, 0, u.priority), r !== d)) for (l = r._ptLookup[r._targets.indexOf(n)], f = u._props.length; f--;)l[u._props[f]] = h; return u } var qt, Yt = function _addPropTween(t, e, r, i, n, a, s, u, h) { p(i) && (i = i(n || 0, t, a)); var l, f = t[e], d = "get" !== r ? r : p(f) ? h ? t[e.indexOf("set") || !p(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](h) : t[e]() : f, c = p(f) ? h ? Kt : Gt : Qt; if (o(i) && (~i.indexOf("random(") && (i = fb(i)), "=" === i.charAt(1) && ((l = parseFloat(d) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (Pa(d) || 0)) || 0 === l && (i = l))), d !== i) return isNaN(d * i) || "" === i ? (f || e in t || N(e, i), function _addComplexStringPropTween(t, e, r, i, n, a, s) { var o, u, h, l, f, d, c, p, _ = new ne(this._pt, t, e, 0, 1, Ht, null, n), m = 0, g = 0; for (_.b = r, _.e = i, r += "", (c = ~(i += "").indexOf("random(")) && (i = fb(i)), a && (a(p = [r, i], t, e), r = p[0], i = p[1]), u = r.match(it) || []; o = it.exec(i);)l = o[0], f = i.substring(m, o.index), h ? h = (h + 1) % 5 : "rgba(" === f.substr(-5) && (h = 1), l !== u[g++] && (d = parseFloat(u[g - 1]) || 0, _._pt = { _next: _._pt, p: f || 1 === g ? f : ",", s: d, c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - d, m: h && h < 4 ? Math.round : 0 }, m = it.lastIndex); return _.c = m < i.length ? i.substring(m, i.length) : "", _.fp = s, (nt.test(i) || c) && (_.e = 0), this._pt = _ }.call(this, t, e, d, i, c, u || Y.stringFilter, h)) : (l = new ne(this._pt, t, e, +d || 0, i - (d || 0), "boolean" == typeof f ? Zt : Jt, 0, c), h && (l.fp = h), s && l.modifier(s, this, t), this._pt = l) }, Xt = function _initTween(e, r) { var i, n, a, s, o, u, h, l, f, d, c, p, m, g = e.vars, v = g.ease, y = g.startAt, b = g.immediateRender, T = g.lazy, w = g.onUpdate, x = g.onUpdateParams, O = g.callbackScope, P = g.runBackwards, k = g.yoyoEase, M = g.keyframes, A = g.autoRevert, S = e._dur, C = e._startAt, D = e._targets, z = e.parent, I = z && "nested" === z.data ? z.parent._targets : D, B = "auto" === e._overwrite && !F, E = e.timeline; if (!E || M && v || (v = "none"), e._ease = Et(v, L.ease), e._yEase = k ? Bt(Et(!0 === k ? v : k, L.ease)) : 0, k && e._yoyo && !e._repeat && (k = e._yEase, e._yEase = e._ease, e._ease = k), e._from = !E && !!g.runBackwards, !E) { if (p = (l = D[0] ? _(D[0]).harness : 0) && g[l.prop], i = ma(g, ut), C && C.render(-1, !0).kill(), y) if (ra(e._startAt = Wt.set(D, ia({ data: "isStart", overwrite: !1, parent: z, immediateRender: !0, lazy: t(T), startAt: null, delay: 0, onUpdate: w, onUpdateParams: x, callbackScope: O, stagger: 0 }, y))), r < 0 && e._startAt.render(-1, !0), b) { if (0 < r && !A && (e._startAt = 0), S && r <= 0) return void (r && (e._zTime = r)) } else !1 === A && (e._startAt = 0); else if (P && S) if (C) A || (e._startAt = 0); else if (r && (b = !1), a = ia({ overwrite: !1, data: "isFromStart", lazy: b && t(T), immediateRender: b, stagger: 0, parent: z }, i), p && (a[l.prop] = p), ra(e._startAt = Wt.set(D, a)), r < 0 && e._startAt.render(-1, !0), b) { if (!r) return } else _initTween(e._startAt, U); for (e._pt = 0, T = S && t(T) || T && !S, n = 0; n < D.length; n++) { if (h = (o = D[n])._gsap || $(D)[n]._gsap, e._ptLookup[n] = d = {}, lt[h.id] && ht.length && ea(), c = I === D ? n : I.indexOf(o), l && !1 !== (f = new l).init(o, p || i, e, c, I) && (e._pt = s = new ne(e._pt, o, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function (t) { d[t] = s }), f.priority && (u = 1)), !l || p) for (a in i) ft[a] && (f = Sb(a, i, e, c, o, I)) ? f.priority && (u = 1) : d[a] = s = Yt.call(e, o, a, "get", i[a], c, I, 0, g.stringFilter); e._op && e._op[n] && e.kill(o, e._op[n]), B && e._pt && (qt = e, R.killTweensOf(o, d, e.globalTime(0)), m = !e.parent, qt = 0), e._pt && T && (lt[h.id] = 1) } u && ie(e), e._onInit && e._onInit(e) } e._onUpdate = w, e._initted = (!e._op || e._pt) && !m }, Ut = function _parseFuncOrString(t, e, r, i, n) { return p(t) ? t.call(e, r, i, n) : o(t) && ~t.indexOf("random(") ? fb(t) : t }, Vt = _t + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase", jt = (Vt + ",id,stagger,delay,duration,paused,scrollTrigger").split(","), Wt = function (S) { function Tween(e, r, i, n) { var a; "number" == typeof r && (i.duration = r, r = i, i = null); var o, u, h, l, f, d, c, p, _ = (a = S.call(this, n ? r : na(r)) || this).vars, m = _.duration, g = _.delay, y = _.immediateRender, b = _.stagger, T = _.overwrite, w = _.keyframes, x = _.defaults, P = _.scrollTrigger, k = _.yoyoEase, M = r.parent || R, A = (H(e) || Z(e) ? q(e[0]) : "length" in r) ? [e] : wt(e); if (a._targets = A.length ? $(A) : O("GSAP target " + e + " not found. https://greensock.com", !Y.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = T, w || b || v(m) || v(g)) { if (r = a.vars, (o = a.timeline = new Nt({ data: "nested", defaults: x || {} })).kill(), o.parent = o._dp = _assertThisInitialized(a), o._start = 0, w) ia(o.vars.defaults, { ease: "none" }), w.forEach(function (t) { return o.to(A, t, ">") }); else { if (l = A.length, c = b ? Xa(b) : Q, s(b)) for (f in b) ~Vt.indexOf(f) && ((p = p || {})[f] = b[f]); for (u = 0; u < l; u++) { for (f in h = {}, r) jt.indexOf(f) < 0 && (h[f] = r[f]); h.stagger = 0, k && (h.yoyoEase = k), p && mt(h, p), d = A[u], h.duration = +Ut(m, _assertThisInitialized(a), u, d, A), h.delay = (+Ut(g, _assertThisInitialized(a), u, d, A) || 0) - a._delay, !b && 1 === l && h.delay && (a._delay = g = h.delay, a._start += g, h.delay = 0), o.to(d, h, c(u, d, A)) } o.duration() ? m = g = 0 : a.timeline = 0 } m || a.duration(m = o.duration()) } else a.timeline = 0; return !0 !== T || F || (qt = _assertThisInitialized(a), R.killTweensOf(A), qt = 0), Ba(M, _assertThisInitialized(a), i), r.reversed && a.reverse(), r.paused && a.paused(!0), (y || !m && !w && a._start === ca(M._time) && t(y) && function _hasNoPausedAncestors(t) { return !t || t._ts && _hasNoPausedAncestors(t.parent) }(_assertThisInitialized(a)) && "nested" !== M.data) && (a._tTime = -U, a.render(Math.max(0, -g))), P && Ca(_assertThisInitialized(a), P), a } _inheritsLoose(Tween, S); var e = Tween.prototype; return e.render = function render(t, e, r) { var i, n, a, s, o, u, h, l, f, d = this._time, c = this._tDur, p = this._dur, _ = c - U < t && 0 <= t ? c : t < U ? 0 : t; if (p) { if (_ !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) { if (i = _, l = this.timeline, this._repeat) { if (s = p + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * s + t, e, r); if (i = ca(_ % s), _ === c ? (a = this._repeat, i = p) : ((a = ~~(_ / s)) && a === _ / s && (i = p, a--), p < i && (i = p)), (u = this._yoyo && 1 & a) && (f = this._yEase, i = p - i), o = gt(this._tTime, s), i === d && !r && this._initted) return this; a !== o && (l && this._yEase && Gb(l, u), !this.vars.repeatRefresh || u || this._lock || (this._lock = r = 1, this.render(ca(s * a), !0).invalidate()._lock = 0)) } if (!this._initted) { if (Da(this, t < 0 ? t : i, r, e)) return this._tTime = 0, this; if (p !== this._dur) return this.render(t, e, r) } if (this._tTime = _, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = h = (f || this._ease)(i / p), this._from && (this.ratio = h = 1 - h), !i || d || e || Ot(this, "onStart"), i && !d && !e && (Ot(this, "onStart"), this._tTime !== _)) return this; for (n = this._pt; n;)n.r(h, n.d), n = n._next; l && l.render(t < 0 ? t : !i && u ? -U : l._dur * h, e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), Ot(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && Ot(this, "onRepeat"), _ !== this._tDur && _ || this._tTime !== _ || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0), !t && p || !(_ === this._tDur && 0 < this._ts || !_ && this._ts < 0) || ra(this, 1), e || t < 0 && !d || !_ && !d || (Ot(this, _ === c ? "onComplete" : "onReverseComplete", !0), !this._prom || _ < c && 0 < this.timeScale() || this._prom())) } } else !function _renderZeroDurationTween(t, e, r, i) { var n, a, s, o = t.ratio, u = e < 0 || !e && (!t._start && function _parentPlayheadIsBeforeStart(t) { var e = t.parent; return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e)) }(t) && (t._initted || !Fa(t)) || (t._ts < 0 || t._dp._ts < 0) && !Fa(t)) ? 0 : 1, h = t._rDelay, l = 0; if (h && t._repeat && (l = bt(0, t._tDur, e), a = gt(l, h), s = gt(t._tTime, h), t._yoyo && 1 & a && (u = 1 - u), a !== s && (o = 1 - u, t.vars.repeatRefresh && t._initted && t.invalidate())), u !== o || i || t._zTime === U || !e && t._zTime) { if (!t._initted && Da(t, e, i, r)) return; for (s = t._zTime, t._zTime = e || (r ? U : 0), r = r || e && !s, t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = l, n = t._pt; n;)n.r(u, n.d), n = n._next; t._startAt && e < 0 && t._startAt.render(e, !0, !0), t._onUpdate && !r && Ot(t, "onUpdate"), l && t._repeat && !r && t.parent && Ot(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (u && ra(t, 1), r || (Ot(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom())) } else t._zTime || (t._zTime = e) }(this, t, e, r); return this }, e.targets = function targets() { return this._targets }, e.invalidate = function invalidate() { return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), S.prototype.invalidate.call(this) }, e.kill = function kill(t, e) { if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? kb(this) : this; if (this.timeline) { var r = this.timeline.totalDuration(); return this.timeline.killTweensOf(t, e, qt && !0 !== qt.vars.overwrite)._first || kb(this), this.parent && r !== this.timeline.totalDuration() && Ia(this, this._dur * this.timeline._tDur / r, 0, 1), this } var i, n, a, s, u, h, l, f = this._targets, d = t ? wt(t) : f, c = this._ptLookup, p = this._pt; if ((!e || "all" === e) && function _arraysMatch(t, e) { for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r];); return r < 0 }(f, d)) return "all" === e && (this._pt = 0), kb(this); for (i = this._op = this._op || [], "all" !== e && (o(e) && (u = {}, ba(e, function (t) { return u[t] = 1 }), e = u), e = function _addAliasesToVars(t, e) { var r, i, n, a, s = t[0] ? _(t[0]).harness : 0, o = s && s.aliases; if (!o) return e; for (i in r = mt({}, e), o) if (i in r) for (n = (a = o[i].split(",")).length; n--;)r[a[n]] = r[i]; return r }(f, e)), l = f.length; l--;)if (~d.indexOf(f[l])) for (u in n = c[l], "all" === e ? (i[l] = e, s = n, a = {}) : (a = i[l] = i[l] || {}, s = e), s) (h = n && n[u]) && ("kill" in h.d && !0 !== h.d.kill(u) || qa(this, h, "_pt"), delete n[u]), "all" !== a && (a[u] = 1); return this._initted && !this._pt && p && kb(this), this }, Tween.to = function to(t, e, r) { return new Tween(t, e, r) }, Tween.from = function from(t, e) { return Ma(1, arguments) }, Tween.delayedCall = function delayedCall(t, e, r, i) { return new Tween(e, 0, { immediateRender: !1, lazy: !1, overwrite: !1, delay: t, onComplete: e, onReverseComplete: e, onCompleteParams: r, onReverseCompleteParams: r, callbackScope: i }) }, Tween.fromTo = function fromTo(t, e, r) { return Ma(2, arguments) }, Tween.set = function set(t, e) { return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Tween(t, e) }, Tween.killTweensOf = function killTweensOf(t, e, r) { return R.killTweensOf(t, e, r) }, Tween }(Lt); ia(Wt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }), ba("staggerTo,staggerFrom,staggerFromTo", function (r) { Wt[r] = function () { var t = new Nt, e = Tt.call(arguments, 0); return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e) } }); function bc(t, e, r) { return t.setAttribute(e, r) } function jc(t, e, r, i) { i.mSet(t, e, i.m.call(i.tween, r, i.mt), i) } var Qt = function _setterPlain(t, e, r) { return t[e] = r }, Gt = function _setterFunc(t, e, r) { return t[e](r) }, Kt = function _setterFuncWithParam(t, e, r, i) { return t[e](i.fp, r) }, $t = function _getSetter(t, e) { return p(t[e]) ? Gt : r(t[e]) && t.setAttribute ? bc : Qt }, Jt = function _renderPlain(t, e) { return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e) }, Zt = function _renderBoolean(t, e) { return e.set(e.t, e.p, !!(e.s + e.c * t), e) }, Ht = function _renderComplexString(t, e) { var r = e._pt, i = ""; if (!t && e.b) i = e.b; else if (1 === t && e.e) i = e.e; else { for (; r;)i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + i, r = r._next; i += e.c } e.set(e.t, e.p, i, e) }, te = function _renderPropTweens(t, e) { for (var r = e._pt; r;)r.r(t, r.d), r = r._next }, ee = function _addPluginModifier(t, e, r, i) { for (var n, a = this._pt; a;)n = a._next, a.p === i && a.modifier(t, e, r), a = n }, re = function _killPropTweensOf(t) { for (var e, r, i = this._pt; i;)r = i._next, i.p === t && !i.op || i.op === t ? qa(this, i, "_pt") : i.dep || (e = 1), i = r; return !e }, ie = function _sortPropTweensByPriority(t) { for (var e, r, i, n, a = t._pt; a;) { for (e = a._next, r = i; r && r.pr > a.pr;)r = r._next; (a._prev = r ? r._prev : n) ? a._prev._next = a : i = a, (a._next = r) ? r._prev = a : n = a, a = e } t._pt = i }, ne = (PropTween.prototype.modifier = function modifier(t, e, r) { this.mSet = this.mSet || this.set, this.set = jc, this.m = t, this.mt = r, this.tween = e }, PropTween); function PropTween(t, e, r, i, n, a, s, o, u) { this.t = e, this.s = i, this.c = n, this.p = r, this.r = a || Jt, this.d = s || this, this.set = o || Qt, this.pr = u || 0, (this._next = t) && (t._prev = this) } ba(_t + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (t) { return ut[t] = 1 }), ot.TweenMax = ot.TweenLite = Wt, ot.TimelineLite = ot.TimelineMax = Nt, R = new Nt({ sortChildren: !1, defaults: L, autoRemoveChildren: !0, id: "root", smoothChildTiming: !0 }), Y.stringFilter = vb; var ae = { registerPlugin: function registerPlugin() { for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)e[r] = arguments[r]; e.forEach(function (t) { return function _createPlugin(t) { var e = (t = !t.name && t.default || t).name, r = p(t), i = e && !r && t.init ? function () { this._props = [] } : t, n = { init: Q, render: te, add: Yt, kill: re, modifier: ee, rawVars: 0 }, a = { targetTest: 0, get: 0, getSetter: $t, aliases: {}, register: 0 }; if (Ct(), t !== i) { if (ft[e]) return; ia(i, ia(ma(t, n), a)), mt(i.prototype, mt(n, ma(t, a))), ft[i.prop = e] = i, t.targetTest && (pt.push(i), ut[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin" } P(e, i), t.register && t.register(se, i, ne) }(t) }) }, timeline: function timeline(t) { return new Nt(t) }, getTweensOf: function getTweensOf(t, e) { return R.getTweensOf(t, e) }, getProperty: function getProperty(i, t, e, r) { o(i) && (i = wt(i)[0]); var n = _(i || {}).get, a = e ? ha : ga; return "native" === e && (e = ""), i ? t ? a((ft[t] && ft[t].get || n)(i, t, e, r)) : function (t, e, r) { return a((ft[t] && ft[t].get || n)(i, t, e, r)) } : i }, quickSetter: function quickSetter(r, e, i) { if (1 < (r = wt(r)).length) { var n = r.map(function (t) { return se.quickSetter(t, e, i) }), a = n.length; return function (t) { for (var e = a; e--;)n[e](t) } } r = r[0] || {}; var s = ft[e], o = _(r), u = o.harness && (o.harness.aliases || {})[e] || e, h = s ? function (t) { var e = new s; d._pt = 0, e.init(r, i ? t + i : t, d, 0, [r]), e.render(1, e), d._pt && te(1, d) } : o.set(r, u); return s ? h : function (t) { return h(r, u, i ? t + i : t, o, 1) } }, isTweening: function isTweening(t) { return 0 < R.getTweensOf(t, !0).length }, defaults: function defaults(t) { return t && t.ease && (t.ease = Et(t.ease, L.ease)), la(L, t || {}) }, config: function config(t) { return la(Y, t || {}) }, registerEffect: function registerEffect(t) { var i = t.name, n = t.effect, e = t.plugins, a = t.defaults, r = t.extendTimeline; (e || "").split(",").forEach(function (t) { return t && !ft[t] && !ot[t] && O(i + " effect requires " + t + " plugin.") }), dt[i] = function (t, e, r) { return n(wt(t), ia(e || {}, a), r) }, r && (Nt.prototype[i] = function (t, e, r) { return this.add(dt[i](t, s(e) ? e : (r = e) && {}, this), r) }) }, registerEase: function registerEase(t, e) { Dt[t] = Et(e) }, parseEase: function parseEase(t, e) { return arguments.length ? Et(t, e) : Dt }, getById: function getById(t) { return R.getById(t) }, exportRoot: function exportRoot(e, r) { void 0 === e && (e = {}); var i, n, a = new Nt(e); for (a.smoothChildTiming = t(e.smoothChildTiming), R.remove(a), a._dp = 0, a._time = a._tTime = R._time, i = R._first; i;)n = i._next, !r && !i._dur && i instanceof Wt && i.vars.onComplete === i._targets[0] || Ba(a, i, i._start - i._delay), i = n; return Ba(R, a, 0), a }, utils: { wrap: function wrap(e, t, r) { var i = t - e; return H(e) ? cb(e, wrap(0, e.length), t) : Na(r, function (t) { return (i + (t - e) % i) % i + e }) }, wrapYoyo: function wrapYoyo(e, t, r) { var i = t - e, n = 2 * i; return H(e) ? cb(e, wrapYoyo(0, e.length - 1), t) : Na(r, function (t) { return e + (i < (t = (n + (t - e) % n) % n || 0) ? n - t : t) }) }, distribute: Xa, random: $a, snap: Za, normalize: function normalize(t, e, r) { return xt(t, e, 0, 1, r) }, getUnit: Pa, clamp: function clamp(e, r, t) { return Na(t, function (t) { return bt(e, r, t) }) }, splitColor: qb, toArray: wt, scopedSelector: function scopedSelector(r) { return r = wt(r)[0] || O("Invalid scope") || {}, function (t) { var e = r.current || r.nativeElement || r; return wt(t, e.querySelectorAll ? e : e === r ? O("Invalid scope") || a.createElement("div") : r) } }, mapRange: xt, pipe: function pipe() { for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)e[r] = arguments[r]; return function (t) { return e.reduce(function (t, e) { return e(t) }, t) } }, unitize: function unitize(e, r) { return function (t) { return e(parseFloat(t)) + (r || Pa(t)) } }, interpolate: function interpolate(e, r, t, i) { var n = isNaN(e + r) ? 0 : function (t) { return (1 - t) * e + t * r }; if (!n) { var a, s, u, h, l, f = o(e), d = {}; if (!0 === t && (i = 1) && (t = null), f) e = { p: e }, r = { p: r }; else if (H(e) && !H(r)) { for (u = [], h = e.length, l = h - 2, s = 1; s < h; s++)u.push(interpolate(e[s - 1], e[s])); h--, n = function func(t) { t *= h; var e = Math.min(l, ~~t); return u[e](t - e) }, t = r } else i || (e = mt(H(e) ? [] : {}, e)); if (!u) { for (a in r) Yt.call(d, e, a, "get", r[a]); n = function func(t) { return te(t, d) || (f ? e.p : e) } } } return Na(t, n) }, shuffle: Wa }, install: M, effects: dt, ticker: St, updateRoot: Nt.updateRoot, plugins: ft, globalTimeline: R, core: { PropTween: ne, globals: P, Tween: Wt, Timeline: Nt, Animation: Lt, getCache: _, _removeLinkedListItem: qa, suppressOverwrites: function suppressOverwrites(t) { return F = t } } }; ba("to,from,fromTo,delayedCall,set,killTweensOf", function (t) { return ae[t] = Wt[t] }), St.add(Nt.updateRoot), d = ae.to({}, { duration: 0 }); function nc(t, e) { for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;)r = r._next; return r } function pc(t, n) { return { name: t, rawVars: 1, init: function init(t, i, e) { e._onInit = function (t) { var e, r; if (o(i) && (e = {}, ba(i, function (t) { return e[t] = 1 }), i = e), n) { for (r in e = {}, i) e[r] = n(i[r]); i = e } !function _addModifiers(t, e) { var r, i, n, a = t._targets; for (r in e) for (i = a.length; i--;)(n = (n = t._ptLookup[i][r]) && n.d) && (n._pt && (n = nc(n, r)), n && n.modifier && n.modifier(e[r], t, a[i], r)) }(t, i) } } } } var se = ae.registerPlugin({ name: "attr", init: function init(t, e, r, i, n) { var a, s; for (a in e) (s = this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], i, n, 0, 0, a)) && (s.op = a), this._props.push(a) } }, { name: "endArray", init: function init(t, e) { for (var r = e.length; r--;)this.add(t, r, t[r] || 0, e[r]) } }, pc("roundProps", Ya), pc("modifiers"), pc("snap", Za)) || ae; Wt.version = Nt.version = se.version = "3.7.0", l = 1, u() && Ct(); function $c(t, e) { return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e) } function _c(t, e) { return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e) } function ad(t, e) { return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e) } function bd(t, e) { var r = e.s + e.c * t; e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e) } function cd(t, e) { return e.set(e.t, e.p, t ? e.e : e.b, e) } function dd(t, e) { return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e) } function ed(t, e, r) { return t.style[e] = r } function fd(t, e, r) { return t.style.setProperty(e, r) } function gd(t, e, r) { return t._gsap[e] = r } function hd(t, e, r) { return t._gsap.scaleX = t._gsap.scaleY = r } function id(t, e, r, i, n) { var a = t._gsap; a.scaleX = a.scaleY = r, a.renderTransform(n, a) } function jd(t, e, r, i, n) { var a = t._gsap; a[e] = r, a.renderTransform(n, a) } function nd(t, e) { var r = ue.createElementNS ? ue.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : ue.createElement(t); return r.style ? r : ue.createElement(t) } function od(t, e, r) { var i = getComputedStyle(t); return i[e] || i.getPropertyValue(e.replace(Fe, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && od(t, Ue(e) || e, 1) || "" } function rd() { (function _windowExists() { return "undefined" != typeof window })() && window.document && (oe = window, ue = oe.document, he = ue.documentElement, fe = nd("div") || { style: {} }, nd("div"), qe = Ue(qe), Ye = qe + "Origin", fe.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ce = !!Ue("perspective"), le = 1) } function sd(t) { var e, r = nd("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = this.parentNode, n = this.nextSibling, a = this.style.cssText; if (he.appendChild(r), r.appendChild(this), this.style.display = "block", t) try { e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = sd } catch (t) { } else this._gsapBBox && (e = this._gsapBBox()); return i && (n ? i.insertBefore(this, n) : i.appendChild(this)), he.removeChild(r), this.style.cssText = a, e } function td(t, e) { for (var r = e.length; r--;)if (t.hasAttribute(e[r])) return t.getAttribute(e[r]) } function ud(e) { var r; try { r = e.getBBox() } catch (t) { r = sd.call(e, !0) } return r && (r.width || r.height) || e.getBBox === sd || (r = sd.call(e, !0)), !r || r.width || r.x || r.y ? r : { x: +td(e, ["x", "cx", "x1"]) || 0, y: +td(e, ["y", "cy", "y1"]) || 0, width: 0, height: 0 } } function vd(t) { return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !ud(t)) } function wd(t, e) { if (e) { var r = t.style; e in ze && e !== Ye && (e = qe), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(Fe, "-$1").toLowerCase())) : r.removeAttribute(e) } } function xd(t, e, r, i, n, a) { var s = new ne(t._pt, e, r, 0, 1, a ? dd : cd); return (t._pt = s).b = i, s.e = n, t._props.push(r), s } function zd(t, e, r, i) { var n, a, s, o, u = parseFloat(r) || 0, h = (r + "").trim().substr((u + "").length) || "px", l = fe.style, f = Re.test(e), d = "svg" === t.tagName.toLowerCase(), c = (d ? "client" : "offset") + (f ? "Width" : "Height"), p = "px" === i, m = "%" === i; return i === h || !u || Ve[i] || Ve[h] ? u : ("px" === h || p || (u = zd(t, e, r, "px")), o = t.getCTM && vd(t), !m && "%" !== h || !ze[e] && !~e.indexOf("adius") ? (l[f ? "width" : "height"] = 100 + (p ? h : i), a = ~e.indexOf("adius") || "em" === i && t.appendChild && !d ? t : t.parentNode, o && (a = (t.ownerSVGElement || {}).parentNode), a && a !== ue && a.appendChild || (a = ue.body), (s = a._gsap) && m && s.width && f && s.time === St.time ? ca(u / s.width * 100) : (!m && "%" !== h || (l.position = od(t, "position")), a === t && (l.position = "static"), a.appendChild(fe), n = fe[c], a.removeChild(fe), l.position = "absolute", f && m && ((s = _(a)).time = St.time, s.width = a[c]), ca(p ? n * u / 100 : n && u ? 100 / n * u : 0))) : (n = o ? t.getBBox()[f ? "width" : "height"] : t[c], ca(m ? u / n * 100 : u / 100 * n))) } function Ad(t, e, r, i) { var n; return le || rd(), e in Ne && "transform" !== e && ~(e = Ne[e]).indexOf(",") && (e = e.split(",")[0]), ze[e] && "transform" !== e ? (n = Ke(t, i), n = "transformOrigin" !== e ? n[e] : n.svg ? n.origin : $e(od(t, Ye)) + " " + n.zOrigin + "px") : (n = t.style[e]) && "auto" !== n && !i && !~(n + "").indexOf("calc(") || (n = We[e] && We[e](t, e, r) || od(t, e) || aa(t, e) || ("opacity" === e ? 1 : 0)), r && !~(n + "").trim().indexOf(" ") ? zd(t, e, n, r) + r : n } function Bd(t, e, r, i) { if (!r || "none" === r) { var n = Ue(e, t, 1), a = n && od(t, n, 1); a && a !== r ? (e = n, r = a) : "borderColor" === e && (r = od(t, "borderTopColor")) } var s, o, u, h, l, f, d, c, p, _, m, g, v = new ne(this._pt, t.style, e, 0, 1, Ht), y = 0, b = 0; if (v.b = r, v.e = i, r += "", "auto" === (i += "") && (t.style[e] = i, i = od(t, e) || i, t.style[e] = r), vb(s = [r, i]), i = s[1], u = (r = s[0]).match(rt) || [], (i.match(rt) || []).length) { for (; o = rt.exec(i);)d = o[0], p = i.substring(y, o.index), l ? l = (l + 1) % 5 : "rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5) || (l = 1), d !== (f = u[b++] || "") && (h = parseFloat(f) || 0, m = f.substr((h + "").length), (g = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)), c = parseFloat(d), _ = d.substr((c + "").length), y = rt.lastIndex - _.length, _ || (_ = _ || Y.units[e] || m, y === i.length && (i += _, v.e += _)), m !== _ && (h = zd(t, e, f, _) || 0), v._pt = { _next: v._pt, p: p || 1 === b ? p : ",", s: h, c: g ? g * c : c - h, m: l && l < 4 || "zIndex" === e ? Math.round : 0 }); v.c = y < i.length ? i.substring(y, i.length) : "" } else v.r = "display" === e && "none" === i ? dd : cd; return nt.test(i) && (v.e = 0), this._pt = v } function Dd(t) { var e = t.split(" "), r = e[0], i = e[1] || "50%"; return "top" !== r && "bottom" !== r && "left" !== i && "right" !== i || (t = r, r = i, i = t), e[0] = je[r] || r, e[1] = je[i] || i, e.join(" ") } function Ed(t, e) { if (e.tween && e.tween._time === e.tween._dur) { var r, i, n, a = e.t, s = a.style, o = e.u, u = a._gsap; if ("all" === o || !0 === o) s.cssText = "", i = 1; else for (n = (o = o.split(",")).length; -1 < --n;)r = o[n], ze[r] && (i = 1, r = "transformOrigin" === r ? Ye : qe), wd(a, r); i && (wd(a, qe), u && (u.svg && a.removeAttribute("transform"), Ke(a, 1), u.uncache = 1)) } } function Id(t) { return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t } function Jd(t) { var e = od(t, qe); return Id(e) ? Qe : e.substr(7).match(et).map(ca) } function Kd(t, e) { var r, i, n, a, s = t._gsap || _(t), o = t.style, u = Jd(t); return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? Qe : u : (u !== Qe || t.offsetParent || t === he || s.svg || (n = o.display, o.display = "block", (r = t.parentNode) && t.offsetParent || (a = 1, i = t.nextSibling, he.appendChild(t)), u = Jd(t), n ? o.display = n : wd(t, "display"), a && (i ? r.insertBefore(t, i) : r ? r.appendChild(t) : he.removeChild(t))), e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u) } function Ld(t, e, r, i, n, a) { var s, o, u, h = t._gsap, l = n || Kd(t, !0), f = h.xOrigin || 0, d = h.yOrigin || 0, c = h.xOffset || 0, p = h.yOffset || 0, _ = l[0], m = l[1], g = l[2], v = l[3], y = l[4], b = l[5], T = e.split(" "), w = parseFloat(T[0]) || 0, x = parseFloat(T[1]) || 0; r ? l !== Qe && (o = _ * v - m * g) && (u = w * (-m / o) + x * (_ / o) - (_ * b - m * y) / o, w = w * (v / o) + x * (-g / o) + (g * b - v * y) / o, x = u) : (w = (s = ud(t)).x + (~T[0].indexOf("%") ? w / 100 * s.width : w), x = s.y + (~(T[1] || T[0]).indexOf("%") ? x / 100 * s.height : x)), i || !1 !== i && h.smooth ? (y = w - f, b = x - d, h.xOffset = c + (y * _ + b * g) - y, h.yOffset = p + (y * m + b * v) - b) : h.xOffset = h.yOffset = 0, h.xOrigin = w, h.yOrigin = x, h.smooth = !!i, h.origin = e, h.originIsAbsolute = !!r, t.style[Ye] = "0px 0px", a && (xd(a, h, "xOrigin", f, w), xd(a, h, "yOrigin", d, x), xd(a, h, "xOffset", c, h.xOffset), xd(a, h, "yOffset", p, h.yOffset)), t.setAttribute("data-svg-origin", w + " " + x) } function Od(t, e, r) { var i = Pa(e); return ca(parseFloat(e) + parseFloat(zd(t, "x", r + "px", i))) + i } function Vd(t, e, r, i, n, a) { var s, u, h = 360, l = o(n), f = parseFloat(n) * (l && ~n.indexOf("rad") ? Ie : 1), d = a ? f * a : f - i, c = i + d + "deg"; return l && ("short" === (s = n.split("_")[1]) && (d %= h) !== d % 180 && (d += d < 0 ? h : -h), "cw" === s && d < 0 ? d = (d + 36e9) % h - ~~(d / h) * h : "ccw" === s && 0 < d && (d = (d - 36e9) % h - ~~(d / h) * h)), t._pt = u = new ne(t._pt, e, r, i, d, _c), u.e = c, u.u = "deg", t._props.push(r), u } function Wd(t, e) { for (var r in e) t[r] = e[r]; return t } function Xd(t, e, r) { var i, n, a, s, o, u, h, l = Wd({}, r._gsap), f = r.style; for (n in l.svg ? (a = r.getAttribute("transform"), r.setAttribute("transform", ""), f[qe] = e, i = Ke(r, 1), wd(r, qe), r.setAttribute("transform", a)) : (a = getComputedStyle(r)[qe], f[qe] = e, i = Ke(r, 1), f[qe] = a), ze) (a = l[n]) !== (s = i[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Pa(a) !== (h = Pa(s)) ? zd(r, n, a, h) : parseFloat(a), u = parseFloat(s), t._pt = new ne(t._pt, i, n, o, u - o, $c), t._pt.u = h || 0, t._props.push(n)); Wd(i, l) } var oe, ue, he, le, fe, de, ce, pe = Dt.Power0, _e = Dt.Power1, me = Dt.Power2, ge = Dt.Power3, ve = Dt.Power4, ye = Dt.Linear, be = Dt.Quad, Te = Dt.Cubic, we = Dt.Quart, xe = Dt.Quint, Oe = Dt.Strong, Pe = Dt.Elastic, ke = Dt.Back, Me = Dt.SteppedEase, Ae = Dt.Bounce, Se = Dt.Sine, Ce = Dt.Expo, De = Dt.Circ, ze = {}, Ie = 180 / Math.PI, Be = Math.PI / 180, Ee = Math.atan2, Fe = /([A-Z])/g, Re = /(?:left|right|width|margin|padding|x)/i, Le = /[\s,\(]\S/, Ne = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" }, qe = "transform", Ye = qe + "Origin", Xe = "O,Moz,ms,Ms,Webkit".split(","), Ue = function _checkPropPrefix(t, e, r) { var i = (e || fe).style, n = 5; if (t in i && !r) return t; for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(Xe[n] + t in i);); return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? Xe[n] : "") + t }, Ve = { deg: 1, rad: 1, turn: 1 }, je = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" }, We = { clearProps: function clearProps(t, e, r, i, n) { if ("isFromStart" !== n.data) { var a = t._pt = new ne(t._pt, e, r, 0, 0, Ed); return a.u = i, a.pr = -10, a.tween = n, t._props.push(r), 1 } } }, Qe = [1, 0, 0, 1, 0, 0], Ge = {}, Ke = function _parseTransform(t, e) { var r = t._gsap || new Rt(t); if ("x" in r && !e && !r.uncache) return r; var i, n, a, s, o, u, h, l, f, d, c, p, _, m, g, v, y, b, T, w, x, O, P, k, M, A, S, C, D, z, I, B, E = t.style, F = r.scaleX < 0, R = "deg", L = od(t, Ye) || "0"; return i = n = a = u = h = l = f = d = c = 0, s = o = 1, r.svg = !(!t.getCTM || !vd(t)), m = Kd(t, r.svg), r.svg && (k = (!r.uncache || "0px 0px" === L) && !e && t.getAttribute("data-svg-origin"), Ld(t, k || L, !!k || r.originIsAbsolute, !1 !== r.smooth, m)), p = r.xOrigin || 0, _ = r.yOrigin || 0, m !== Qe && (b = m[0], T = m[1], w = m[2], x = m[3], i = O = m[4], n = P = m[5], 6 === m.length ? (s = Math.sqrt(b * b + T * T), o = Math.sqrt(x * x + w * w), u = b || T ? Ee(T, b) * Ie : 0, (f = w || x ? Ee(w, x) * Ie + u : 0) && (o *= Math.abs(Math.cos(f * Be))), r.svg && (i -= p - (p * b + _ * w), n -= _ - (p * T + _ * x))) : (B = m[6], z = m[7], S = m[8], C = m[9], D = m[10], I = m[11], i = m[12], n = m[13], a = m[14], h = (g = Ee(B, D)) * Ie, g && (k = O * (v = Math.cos(-g)) + S * (y = Math.sin(-g)), M = P * v + C * y, A = B * v + D * y, S = O * -y + S * v, C = P * -y + C * v, D = B * -y + D * v, I = z * -y + I * v, O = k, P = M, B = A), l = (g = Ee(-w, D)) * Ie, g && (v = Math.cos(-g), I = x * (y = Math.sin(-g)) + I * v, b = k = b * v - S * y, T = M = T * v - C * y, w = A = w * v - D * y), u = (g = Ee(T, b)) * Ie, g && (k = b * (v = Math.cos(g)) + T * (y = Math.sin(g)), M = O * v + P * y, T = T * v - b * y, P = P * v - O * y, b = k, O = M), h && 359.9 < Math.abs(h) + Math.abs(u) && (h = u = 0, l = 180 - l), s = ca(Math.sqrt(b * b + T * T + w * w)), o = ca(Math.sqrt(P * P + B * B)), g = Ee(O, P), f = 2e-4 < Math.abs(g) ? g * Ie : 0, c = I ? 1 / (I < 0 ? -I : I) : 0), r.svg && (k = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Id(od(t, qe)), k && t.setAttribute("transform", k))), 90 < Math.abs(f) && Math.abs(f) < 270 && (F ? (s *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, f += f <= 0 ? 180 : -180)), r.x = i - ((r.xPercent = i && (r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = n - ((r.yPercent = n && (r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = a + "px", r.scaleX = ca(s), r.scaleY = ca(o), r.rotation = ca(u) + R, r.rotationX = ca(h) + R, r.rotationY = ca(l) + R, r.skewX = f + R, r.skewY = d + R, r.transformPerspective = c + "px", (r.zOrigin = parseFloat(L.split(" ")[2]) || 0) && (E[Ye] = $e(L)), r.xOffset = r.yOffset = 0, r.force3D = Y.force3D, r.renderTransform = r.svg ? rr : ce ? er : Je, r.uncache = 0, r }, $e = function _firstTwoOnly(t) { return (t = t.split(" "))[0] + " " + t[1] }, Je = function _renderNon3DTransforms(t, e) { e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, er(t, e) }, Ze = "0deg", He = "0px", tr = ") ", er = function _renderCSSTransforms(t, e) { var r = e || this, i = r.xPercent, n = r.yPercent, a = r.x, s = r.y, o = r.z, u = r.rotation, h = r.rotationY, l = r.rotationX, f = r.skewX, d = r.skewY, c = r.scaleX, p = r.scaleY, _ = r.transformPerspective, m = r.force3D, g = r.target, v = r.zOrigin, y = "", b = "auto" === m && t && 1 !== t || !0 === m; if (v && (l !== Ze || h !== Ze)) { var T, w = parseFloat(h) * Be, x = Math.sin(w), O = Math.cos(w); w = parseFloat(l) * Be, T = Math.cos(w), a = Od(g, a, x * T * -v), s = Od(g, s, -Math.sin(w) * -v), o = Od(g, o, O * T * -v + v) } _ !== He && (y += "perspective(" + _ + tr), (i || n) && (y += "translate(" + i + "%, " + n + "%) "), !b && a === He && s === He && o === He || (y += o !== He || b ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + tr), u !== Ze && (y += "rotate(" + u + tr), h !== Ze && (y += "rotateY(" + h + tr), l !== Ze && (y += "rotateX(" + l + tr), f === Ze && d === Ze || (y += "skew(" + f + ", " + d + tr), 1 === c && 1 === p || (y += "scale(" + c + ", " + p + tr), g.style[qe] = y || "translate(0, 0)" }, rr = function _renderSVGTransforms(t, e) { var r, i, n, a, s, o = e || this, u = o.xPercent, h = o.yPercent, l = o.x, f = o.y, d = o.rotation, c = o.skewX, p = o.skewY, _ = o.scaleX, m = o.scaleY, g = o.target, v = o.xOrigin, y = o.yOrigin, b = o.xOffset, T = o.yOffset, w = o.forceCSS, x = parseFloat(l), O = parseFloat(f); d = parseFloat(d), c = parseFloat(c), (p = parseFloat(p)) && (c += p = parseFloat(p), d += p), d || c ? (d *= Be, c *= Be, r = Math.cos(d) * _, i = Math.sin(d) * _, n = Math.sin(d - c) * -m, a = Math.cos(d - c) * m, c && (p *= Be, s = Math.tan(c - p), n *= s = Math.sqrt(1 + s * s), a *= s, p && (s = Math.tan(p), r *= s = Math.sqrt(1 + s * s), i *= s)), r = ca(r), i = ca(i), n = ca(n), a = ca(a)) : (r = _, a = m, i = n = 0), (x && !~(l + "").indexOf("px") || O && !~(f + "").indexOf("px")) && (x = zd(g, "x", l, "px"), O = zd(g, "y", f, "px")), (v || y || b || T) && (x = ca(x + v - (v * r + y * n) + b), O = ca(O + y - (v * i + y * a) + T)), (u || h) && (s = g.getBBox(), x = ca(x + u / 100 * s.width), O = ca(O + h / 100 * s.height)), s = "matrix(" + r + "," + i + "," + n + "," + a + "," + x + "," + O + ")", g.setAttribute("transform", s), w && (g.style[qe] = s) }; ba("padding,margin,Width,Radius", function (e, r) { var t = "Right", i = "Bottom", n = "Left", o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(function (t) { return r < 2 ? e + t : "border" + t + e }); We[1 < r ? "border" + e : e] = function (e, t, r, i, n) { var a, s; if (arguments.length < 4) return a = o.map(function (t) { return Ad(e, t, r) }), 5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s; a = (i + "").split(" "), s = {}, o.forEach(function (t, e) { return s[t] = a[e] = a[e] || a[(e - 1) / 2 | 0] }), e.init(t, s, n) } }); var ir, nr, ar, sr = { name: "css", register: rd, targetTest: function targetTest(t) { return t.style && t.nodeType }, init: function init(t, e, r, i, n) { var a, s, o, u, h, l, f, d, c, p, _, m, g, v, y, b = this._props, T = t.style, w = r.vars.startAt; for (f in le || rd(), e) if ("autoRound" !== f && (s = e[f], !ft[f] || !Sb(f, e, r, i, t, n))) if (h = typeof s, l = We[f], "function" === h && (h = typeof (s = s.call(r, i, t, n))), "string" === h && ~s.indexOf("random(") && (s = fb(s)), l) l(this, t, f, s, r) && (y = 1); else if ("--" === f.substr(0, 2)) a = (getComputedStyle(t).getPropertyValue(f) + "").trim(), s += "", Mt.lastIndex = 0, Mt.test(a) || (d = Pa(a), c = Pa(s)), c ? d !== c && (a = zd(t, f, a, c) + c) : d && (s += d), this.add(T, "setProperty", a, s, i, n, 0, 0, f), b.push(f); else if ("undefined" !== h) { if (w && f in w ? (a = "function" == typeof w[f] ? w[f].call(r, i, t, n) : w[f], f in Y.units && !Pa(a) && (a += Y.units[f]), "=" === (a + "").charAt(1) && (a = Ad(t, f))) : a = Ad(t, f), u = parseFloat(a), (p = "string" === h && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), o = parseFloat(s), f in Ne && ("autoAlpha" === f && (1 === u && "hidden" === Ad(t, "visibility") && o && (u = 0), xd(this, T, "visibility", u ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== f && "transform" !== f && ~(f = Ne[f]).indexOf(",") && (f = f.split(",")[0])), _ = f in ze) if (m || ((g = t._gsap).renderTransform && !e.parseTransform || Ke(t, e.parseTransform), v = !1 !== e.smoothOrigin && g.smooth, (m = this._pt = new ne(this._pt, T, qe, 0, 1, g.renderTransform, g, 0, -1)).dep = 1), "scale" === f) this._pt = new ne(this._pt, g, "scaleY", g.scaleY, (p ? p * o : o - g.scaleY) || 0), b.push("scaleY", f), f += "X"; else { if ("transformOrigin" === f) { s = Dd(s), g.svg ? Ld(t, s, 0, v, 0, this) : ((c = parseFloat(s.split(" ")[2]) || 0) !== g.zOrigin && xd(this, g, "zOrigin", g.zOrigin, c), xd(this, T, f, $e(a), $e(s))); continue } if ("svgOrigin" === f) { Ld(t, s, 1, v, 0, this); continue } if (f in Ge) { Vd(this, g, f, u, s, p); continue } if ("smoothOrigin" === f) { xd(this, g, "smooth", g.smooth, s); continue } if ("force3D" === f) { g[f] = s; continue } if ("transform" === f) { Xd(this, s, t); continue } } else f in T || (f = Ue(f) || f); if (_ || (o || 0 === o) && (u || 0 === u) && !Le.test(s) && f in T) o = o || 0, (d = (a + "").substr((u + "").length)) !== (c = Pa(s) || (f in Y.units ? Y.units[f] : d)) && (u = zd(t, f, a, c)), this._pt = new ne(this._pt, _ ? g : T, f, u, p ? p * o : o - u, _ || "px" !== c && "zIndex" !== f || !1 === e.autoRound ? $c : bd), this._pt.u = c || 0, d !== c && (this._pt.b = a, this._pt.r = ad); else if (f in T) Bd.call(this, t, f, a, s); else { if (!(f in t)) { N(f, s); continue } this.add(t, f, a || t[f], s, i, n) } b.push(f) } y && ie(this) }, get: Ad, aliases: Ne, getSetter: function getSetter(t, e, i) { var n = Ne[e]; return n && n.indexOf(",") < 0 && (e = n), e in ze && e !== Ye && (t._gsap.x || Ad(t, "x")) ? i && de === i ? "scale" === e ? hd : gd : (de = i || {}) && ("scale" === e ? id : jd) : t.style && !r(t.style[e]) ? ed : ~e.indexOf("-") ? fd : $t(t, e) }, core: { _removeProperty: wd, _getMatrix: Kd } }; se.utils.checkPrefix = Ue, ar = ba((ir = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (nr = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) { ze[t] = 1 }), ba(nr, function (t) { Y.units[t] = "deg", Ge[t] = 1 }), Ne[ar[13]] = ir + "," + nr, ba("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) { var e = t.split(":"); Ne[e[1]] = ar[e[0]] }), ba("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) { Y.units[t] = "px" }), se.registerPlugin(sr); var or = se.registerPlugin(sr) || se, ur = or.core.Tween; e.Back = ke, e.Bounce = Ae, e.CSSPlugin = sr, e.Circ = De, e.Cubic = Te, e.Elastic = Pe, e.Expo = Ce, e.Linear = ye, e.Power0 = pe, e.Power1 = _e, e.Power2 = me, e.Power3 = ge, e.Power4 = ve, e.Quad = be, e.Quart = we, e.Quint = xe, e.Sine = Se, e.SteppedEase = Me, e.Strong = Oe, e.TimelineLite = Nt, e.TimelineMax = Nt, e.TweenLite = Wt, e.TweenMax = ur, e.default = or, e.gsap = or; if (typeof (window) === "undefined" || window !== e) { Object.defineProperty(e, "__esModule", { value: !0 }) } else { delete e.default } });

//Locomotive scroll v4.1.1 - https://github.com/locomotivemtl/locomotive-scroll
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).LocomotiveScroll = e() }(this, (function () { "use strict"; function t(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } function e(t, e) { for (var i = 0; i < e.length; i++) { var s = e[i]; s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s) } } function i(t, i, s) { return i && e(t.prototype, i), s && e(t, s), t } function s(t, e, i) { return e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = i, t } function n(t, e) { var i = Object.keys(t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(t); e && (s = s.filter((function (e) { return Object.getOwnPropertyDescriptor(t, e).enumerable }))), i.push.apply(i, s) } return i } function o(t) { for (var e = 1; e < arguments.length; e++) { var i = null != arguments[e] ? arguments[e] : {}; e % 2 ? n(Object(i), !0).forEach((function (e) { s(t, e, i[e]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach((function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e)) })) } return t } function r(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && a(t, e) } function l(t) { return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) { return t.__proto__ || Object.getPrototypeOf(t) })(t) } function a(t, e) { return (a = Object.setPrototypeOf || function (t, e) { return t.__proto__ = e, t })(t, e) } function c(t) { if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return t } function h(t, e) { return !e || "object" != typeof e && "function" != typeof e ? c(t) : e } function d(t) { var e = function () { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0 } catch (t) { return !1 } }(); return function () { var i, s = l(t); if (e) { var n = l(this).constructor; i = Reflect.construct(s, arguments, n) } else i = s.apply(this, arguments); return h(this, i) } } function u(t, e, i) { return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, i) { var s = function (t, e) { for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = l(t));); return t }(t, e); if (s) { var n = Object.getOwnPropertyDescriptor(s, e); return n.get ? n.get.call(i) : n.value } })(t, e, i || t) } function f(t, e) { return function (t) { if (Array.isArray(t)) return t }(t) || function (t, e) { if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return; var i = [], s = !0, n = !1, o = void 0; try { for (var r, l = t[Symbol.iterator](); !(s = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); s = !0); } catch (t) { n = !0, o = t } finally { try { s || null == l.return || l.return() } finally { if (n) throw o } } return i }(t, e) || m(t, e) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function p(t) { return function (t) { if (Array.isArray(t)) return v(t) }(t) || function (t) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t) }(t) || m(t) || function () { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() } function m(t, e) { if (t) { if ("string" == typeof t) return v(t, e); var i = Object.prototype.toString.call(t).slice(8, -1); return "Object" === i && t.constructor && (i = t.constructor.name), "Map" === i || "Set" === i ? Array.from(t) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? v(t, e) : void 0 } } function v(t, e) { (null == e || e > t.length) && (e = t.length); for (var i = 0, s = new Array(e); i < e; i++)s[i] = t[i]; return s } var y = { el: document, name: "scroll", offset: [0, 0], repeat: !1, smooth: !1, initPosition: { x: 0, y: 0 }, direction: "vertical", gestureDirection: "vertical", reloadOnContextChange: !1, lerp: .1, class: "is-inview", scrollbarContainer: !1, scrollbarClass: "c-scrollbar", scrollingClass: "has-scroll-scrolling", draggingClass: "has-scroll-dragging", smoothClass: "has-scroll-smooth", initClass: "has-scroll-init", getSpeed: !1, getDirection: !1, scrollFromAnywhere: !1, multiplier: 1, firefoxMultiplier: 50, touchMultiplier: 2, resetNativeScroll: !0, tablet: { smooth: !1, direction: "vertical", gestureDirection: "vertical", breakpoint: 1024 }, smartphone: { smooth: !1, direction: "vertical", gestureDirection: "vertical" } }, b = function () { function e() { var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; t(this, e), Object.assign(this, y, i), this.smartphone = y.smartphone, i.smartphone && Object.assign(this.smartphone, i.smartphone), this.tablet = y.tablet, i.tablet && Object.assign(this.tablet, i.tablet), this.namespace = "locomotive", this.html = document.documentElement, this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }, this.els = {}, this.currentElements = {}, this.listeners = {}, this.hasScrollTicking = !1, this.hasCallEventSet = !1, this.checkScroll = this.checkScroll.bind(this), this.checkResize = this.checkResize.bind(this), this.checkEvent = this.checkEvent.bind(this), this.instance = { scroll: { x: 0, y: 0 }, limit: { x: this.html.offsetWidth, y: this.html.offsetHeight }, currentElements: this.currentElements }, this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", this.isMobile && (this.direction = this[this.context].direction), "horizontal" === this.direction ? this.directionAxis = "x" : this.directionAxis = "y", this.getDirection && (this.instance.direction = null), this.getDirection && (this.instance.speed = 0), this.html.classList.add(this.initClass), window.addEventListener("resize", this.checkResize, !1) } return i(e, [{ key: "init", value: function () { this.initEvents() } }, { key: "checkScroll", value: function () { this.dispatchScroll() } }, { key: "checkResize", value: function () { var t = this; this.resizeTick || (this.resizeTick = !0, requestAnimationFrame((function () { t.resize(), t.resizeTick = !1 }))) } }, { key: "resize", value: function () { } }, { key: "checkContext", value: function () { if (this.reloadOnContextChange) { this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || this.windowWidth < this.tablet.breakpoint, this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint; var t = this.context; if (this.isMobile ? this.isTablet ? this.context = "tablet" : this.context = "smartphone" : this.context = "desktop", t != this.context) ("desktop" == t ? this.smooth : this[t].smooth) != ("desktop" == this.context ? this.smooth : this[this.context].smooth) && window.location.reload() } } }, { key: "initEvents", value: function () { var t = this; this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]")), this.setScrollTo = this.setScrollTo.bind(this), this.scrollToEls.forEach((function (e) { e.addEventListener("click", t.setScrollTo, !1) })) } }, { key: "setScrollTo", value: function (t) { t.preventDefault(), this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), { offset: t.currentTarget.getAttribute("data-".concat(this.name, "-offset")) }) } }, { key: "addElements", value: function () { } }, { key: "detectElements", value: function (t) { var e = this, i = this.instance.scroll.y, s = i + this.windowHeight, n = this.instance.scroll.x, o = n + this.windowWidth; Object.entries(this.els).forEach((function (r) { var l = f(r, 2), a = l[0], c = l[1]; if (!c || c.inView && !t || ("horizontal" === e.direction ? o >= c.left && n < c.right && e.setInView(c, a) : s >= c.top && i < c.bottom && e.setInView(c, a)), c && c.inView) if ("horizontal" === e.direction) { var h = c.right - c.left; c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (h + e.windowWidth), (o < c.left || n > c.right) && e.setOutOfView(c, a) } else { var d = c.bottom - c.top; c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (d + e.windowHeight), (s < c.top || i > c.bottom) && e.setOutOfView(c, a) } })), this.hasScrollTicking = !1 } }, { key: "setInView", value: function (t, e) { this.els[e].inView = !0, t.el.classList.add(t.class), this.currentElements[e] = t, t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"), t.repeat || (this.els[e].call = !1)) } }, { key: "setOutOfView", value: function (t, e) { var i = this; this.els[e].inView = !1, Object.keys(this.currentElements).forEach((function (t) { t === e && delete i.currentElements[t] })), t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"), t.repeat && t.el.classList.remove(t.class) } }, { key: "dispatchCall", value: function (t, e) { this.callWay = e, this.callValue = t.call.split(",").map((function (t) { return t.trim() })), this.callObj = t, 1 == this.callValue.length && (this.callValue = this.callValue[0]); var i = new Event(this.namespace + "call"); this.el.dispatchEvent(i) } }, { key: "dispatchScroll", value: function () { var t = new Event(this.namespace + "scroll"); this.el.dispatchEvent(t) } }, { key: "setEvents", value: function (t, e) { this.listeners[t] || (this.listeners[t] = []); var i = this.listeners[t]; i.push(e), 1 === i.length && this.el.addEventListener(this.namespace + t, this.checkEvent, !1), "call" === t && (this.hasCallEventSet = !0, this.detectElements(!0)) } }, { key: "unsetEvents", value: function (t, e) { if (this.listeners[t]) { var i = this.listeners[t], s = i.indexOf(e); s < 0 || (i.splice(s, 1), 0 === i.index && this.el.removeEventListener(this.namespace + t, this.checkEvent, !1)) } } }, { key: "checkEvent", value: function (t) { var e = this, i = t.type.replace(this.namespace, ""), s = this.listeners[i]; s && 0 !== s.length && s.forEach((function (t) { switch (i) { case "scroll": return t(e.instance); case "call": return t(e.callValue, e.callWay, e.callObj); default: return t() } })) } }, { key: "startScroll", value: function () { } }, { key: "stopScroll", value: function () { } }, { key: "setScroll", value: function (t, e) { this.instance.scroll = { x: 0, y: 0 } } }, { key: "destroy", value: function () { var t = this; window.removeEventListener("resize", this.checkResize, !1), Object.keys(this.listeners).forEach((function (e) { t.el.removeEventListener(t.namespace + e, t.checkEvent, !1) })), this.listeners = {}, this.scrollToEls.forEach((function (e) { e.removeEventListener("click", t.setScrollTo, !1) })), this.html.classList.remove(this.initClass) } }]), e }(), g = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}; function w(t, e) { return t(e = { exports: {} }, e.exports), e.exports } var x = w((function (t, e) { t.exports = { polyfill: function () { var t = window, e = document; if (!("scrollBehavior" in e.documentElement.style) || !0 === t.__forceSmoothScrollPolyfill__) { var i, s = t.HTMLElement || t.Element, n = { scroll: t.scroll || t.scrollTo, scrollBy: t.scrollBy, elementScroll: s.prototype.scroll || l, scrollIntoView: s.prototype.scrollIntoView }, o = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now, r = (i = t.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(i) ? 1 : 0); t.scroll = t.scrollTo = function () { void 0 !== arguments[0] && (!0 !== a(arguments[0]) ? p.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset) : n.scroll.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset)) }, t.scrollBy = function () { void 0 !== arguments[0] && (a(arguments[0]) ? n.scrollBy.call(t, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : p.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset))) }, s.prototype.scroll = s.prototype.scrollTo = function () { if (void 0 !== arguments[0]) if (!0 !== a(arguments[0])) { var t = arguments[0].left, e = arguments[0].top; p.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e) } else { if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted"); n.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop) } }, s.prototype.scrollBy = function () { void 0 !== arguments[0] && (!0 !== a(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : n.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop)) }, s.prototype.scrollIntoView = function () { if (!0 !== a(arguments[0])) { var i = u(this), s = i.getBoundingClientRect(), o = this.getBoundingClientRect(); i !== e.body ? (p.call(this, i, i.scrollLeft + o.left - s.left, i.scrollTop + o.top - s.top), "fixed" !== t.getComputedStyle(i).position && t.scrollBy({ left: s.left, top: s.top, behavior: "smooth" })) : t.scrollBy({ left: o.left, top: o.top, behavior: "smooth" }) } else n.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]) } } function l(t, e) { this.scrollLeft = t, this.scrollTop = e } function a(t) { if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0; if ("object" == typeof t && "smooth" === t.behavior) return !1; throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.") } function c(t, e) { return "Y" === e ? t.clientHeight + r < t.scrollHeight : "X" === e ? t.clientWidth + r < t.scrollWidth : void 0 } function h(e, i) { var s = t.getComputedStyle(e, null)["overflow" + i]; return "auto" === s || "scroll" === s } function d(t) { var e = c(t, "Y") && h(t, "Y"), i = c(t, "X") && h(t, "X"); return e || i } function u(t) { for (; t !== e.body && !1 === d(t);)t = t.parentNode || t.host; return t } function f(e) { var i, s, n, r, l = (o() - e.startTime) / 468; r = l = l > 1 ? 1 : l, i = .5 * (1 - Math.cos(Math.PI * r)), s = e.startX + (e.x - e.startX) * i, n = e.startY + (e.y - e.startY) * i, e.method.call(e.scrollable, s, n), s === e.x && n === e.y || t.requestAnimationFrame(f.bind(t, e)) } function p(i, s, r) { var a, c, h, d, u = o(); i === e.body ? (a = t, c = t.scrollX || t.pageXOffset, h = t.scrollY || t.pageYOffset, d = n.scroll) : (a = i, c = i.scrollLeft, h = i.scrollTop, d = l), f({ scrollable: a, method: d, startTime: u, startX: c, startY: h, x: s, y: r }) } } } })), S = (x.polyfill, function (e) { r(n, e); var s = d(n); function n() { var e, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; return t(this, n), (e = s.call(this, i)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0)), window.addEventListener("scroll", e.checkScroll, !1), void 0 === window.smoothscrollPolyfill && (window.smoothscrollPolyfill = x, window.smoothscrollPolyfill.polyfill()), e } return i(n, [{ key: "init", value: function () { this.instance.scroll.y = window.pageYOffset, this.addElements(), this.detectElements(), u(l(n.prototype), "init", this).call(this) } }, { key: "checkScroll", value: function () { var t = this; u(l(n.prototype), "checkScroll", this).call(this), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.instance.scroll.y = window.pageYOffset, Object.entries(this.els).length && (this.hasScrollTicking || (requestAnimationFrame((function () { t.detectElements() })), this.hasScrollTicking = !0)) } }, { key: "addDirection", value: function () { window.pageYOffset > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up") } }, { key: "addSpeed", value: function () { window.pageYOffset != this.instance.scroll.y ? this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0 } }, { key: "resize", value: function () { Object.entries(this.els).length && (this.windowHeight = window.innerHeight, this.updateElements()) } }, { key: "addElements", value: function () { var t = this; this.els = {}, this.el.querySelectorAll("[data-" + this.name + "]").forEach((function (e, i) { e.getBoundingClientRect(); var s, n, o, r = e.dataset[t.name + "Class"] || t.class, l = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : i, a = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset, c = e.dataset[t.name + "Repeat"], h = e.dataset[t.name + "Call"], d = e.dataset[t.name + "Target"], u = (o = void 0 !== d ? document.querySelector("".concat(d)) : e).getBoundingClientRect(); s = u.top + t.instance.scroll.y, n = u.left + t.instance.scroll.x; var f = s + o.offsetHeight, p = n + o.offsetWidth; c = "false" != c && (null != c || t.repeat); var m = t.getRelativeOffset(a), v = { el: e, targetEl: o, id: l, class: r, top: s += m[0], bottom: f -= m[1], left: n, right: p, offset: a, progress: 0, repeat: c, inView: !1, call: h }; t.els[l] = v, e.classList.contains(r) && t.setInView(t.els[l], l) })) } }, { key: "updateElements", value: function () { var t = this; Object.entries(this.els).forEach((function (e) { var i = f(e, 2), s = i[0], n = i[1], o = n.targetEl.getBoundingClientRect().top + t.instance.scroll.y, r = o + n.targetEl.offsetHeight, l = t.getRelativeOffset(n.offset); t.els[s].top = o + l[0], t.els[s].bottom = r - l[1] })), this.hasScrollTicking = !1 } }, { key: "getRelativeOffset", value: function (t) { var e = [0, 0]; if (t) for (var i = 0; i < t.length; i++)"string" == typeof t[i] ? t[i].includes("%") ? e[i] = parseInt(t[i].replace("%", "") * this.windowHeight / 100) : e[i] = parseInt(t[i]) : e[i] = t[i]; return e } }, { key: "scrollTo", value: function (t) { var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = parseInt(e.offset) || 0, s = !!e.callback && e.callback; if ("string" == typeof t) { if ("top" === t) t = this.html; else if ("bottom" === t) t = this.html.offsetHeight - window.innerHeight; else if (!(t = document.querySelector(t))) return } else if ("number" == typeof t) t = parseInt(t); else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid"); i = "number" != typeof t ? t.getBoundingClientRect().top + i + this.instance.scroll.y : t + i; var n = function () { return parseInt(window.pageYOffset) === parseInt(i) }; if (s) { if (n()) return void s(); var o = function t() { n() && (window.removeEventListener("scroll", t), s()) }; window.addEventListener("scroll", o) } window.scrollTo({ top: i, behavior: "smooth" }) } }, { key: "update", value: function () { this.addElements(), this.detectElements() } }, { key: "destroy", value: function () { u(l(n.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1) } }]), n }(b)), k = Object.getOwnPropertySymbols, T = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable; function A(t) { if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined"); return Object(t) } var O = function () { try { if (!Object.assign) return !1; var t = new String("abc"); if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1; for (var e = {}, i = 0; i < 10; i++)e["_" + String.fromCharCode(i)] = i; if ("0123456789" !== Object.getOwnPropertyNames(e).map((function (t) { return e[t] })).join("")) return !1; var s = {}; return "abcdefghijklmnopqrst".split("").forEach((function (t) { s[t] = t })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, s)).join("") } catch (t) { return !1 } }() ? Object.assign : function (t, e) { for (var i, s, n = A(t), o = 1; o < arguments.length; o++) { for (var r in i = Object(arguments[o])) T.call(i, r) && (n[r] = i[r]); if (k) { s = k(i); for (var l = 0; l < s.length; l++)E.call(i, s[l]) && (n[s[l]] = i[s[l]]) } } return n }; function D() { } D.prototype = { on: function (t, e, i) { var s = this.e || (this.e = {}); return (s[t] || (s[t] = [])).push({ fn: e, ctx: i }), this }, once: function (t, e, i) { var s = this; function n() { s.off(t, n), e.apply(i, arguments) } return n._ = e, this.on(t, n, i) }, emit: function (t) { for (var e = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[t] || []).slice(), s = 0, n = i.length; s < n; s++)i[s].fn.apply(i[s].ctx, e); return this }, off: function (t, e) { var i = this.e || (this.e = {}), s = i[t], n = []; if (s && e) for (var o = 0, r = s.length; o < r; o++)s[o].fn !== e && s[o].fn._ !== e && n.push(s[o]); return n.length ? i[t] = n : delete i[t], this } }; var C = D, L = w((function (t, e) { (function () { (null !== e ? e : this).Lethargy = function () { function t(t, e, i, s) { this.stability = null != t ? Math.abs(t) : 8, this.sensitivity = null != e ? 1 + Math.abs(e) : 100, this.tolerance = null != i ? 1 + Math.abs(i) : 1.1, this.delay = null != s ? s : 150, this.lastUpDeltas = function () { var t, e, i; for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)i.push(null); return i }.call(this), this.lastDownDeltas = function () { var t, e, i; for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)i.push(null); return i }.call(this), this.deltasTimestamp = function () { var t, e, i; for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)i.push(null); return i }.call(this) } return t.prototype.check = function (t) { var e; return null != (t = t.originalEvent || t).wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1)) }, t.prototype.isInertia = function (t) { var e, i, s, n, o, r, l; return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (s = e.slice(0, this.stability), i = e.slice(this.stability, 2 * this.stability), l = s.reduce((function (t, e) { return t + e })), o = i.reduce((function (t, e) { return t + e })), r = l / s.length, n = o / i.length, Math.abs(r) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && t) }, t.prototype.showLastUpDeltas = function () { return this.lastUpDeltas }, t.prototype.showLastDownDeltas = function () { return this.lastDownDeltas }, t }() }).call(g) })), M = { hasWheelEvent: "onwheel" in document, hasMouseWheelEvent: "onmousewheel" in document, hasTouch: "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch, hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, hasPointer: !!window.navigator.msPointerEnabled, hasKeyDown: "onkeydown" in document, isFirefox: navigator.userAgent.indexOf("Firefox") > -1 }, j = Object.prototype.toString, _ = Object.prototype.hasOwnProperty; function B(t, e) { return function () { return t.apply(e, arguments) } } var W = L.Lethargy, H = "virtualscroll", R = V, P = 37, Y = 38, I = 39, z = 40, X = 32; function V(t) { !function (t) { if (!t) return console.warn("bindAll requires at least one argument."); var e = Array.prototype.slice.call(arguments, 1); if (0 === e.length) for (var i in t) _.call(t, i) && "function" == typeof t[i] && "[object Function]" == j.call(t[i]) && e.push(i); for (var s = 0; s < e.length; s++) { var n = e[s]; t[n] = B(t[n], t) } }(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.el = window, t && t.el && (this.el = t.el, delete t.el), this.options = O({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: !1, unpreventTouchClass: "vs-touchmove-allowed", limitInertia: !1, useKeyboard: !0, useTouch: !0 }, t), this.options.limitInertia && (this._lethargy = new W), this._emitter = new C, this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null, void 0 !== this.options.passive && (this.listenerOptions = { passive: this.options.passive }) } function F(t, e, i) { return (1 - i) * t + i * e } function q(t) { var e = {}; if (window.getComputedStyle) { var i = getComputedStyle(t), s = i.transform || i.webkitTransform || i.mozTransform, n = s.match(/^matrix3d\((.+)\)$/); return n ? (e.x = n ? parseFloat(n[1].split(", ")[12]) : 0, e.y = n ? parseFloat(n[1].split(", ")[13]) : 0) : (n = s.match(/^matrix\((.+)\)$/), e.x = n ? parseFloat(n[1].split(", ")[4]) : 0, e.y = n ? parseFloat(n[1].split(", ")[5]) : 0), e } } function K(t) { for (var e = []; t && t !== document; t = t.parentNode)e.push(t); return e } V.prototype._notify = function (t) { var e = this._event; e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(H, { x: e.x, y: e.y, deltaX: e.deltaX, deltaY: e.deltaY, originalEvent: t }) }, V.prototype._onWheel = function (t) { var e = this.options; if (!this._lethargy || !1 !== this._lethargy.check(t)) { var i = this._event; i.deltaX = t.wheelDeltaX || -1 * t.deltaX, i.deltaY = t.wheelDeltaY || -1 * t.deltaY, M.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier), i.deltaX *= e.mouseMultiplier, i.deltaY *= e.mouseMultiplier, this._notify(t) } }, V.prototype._onMouseWheel = function (t) { if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) { var e = this._event; e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t) } }, V.prototype._onTouchStart = function (t) { var e = t.targetTouches ? t.targetTouches[0] : t; this.touchStartX = e.pageX, this.touchStartY = e.pageY }, V.prototype._onTouchMove = function (t) { var e = this.options; e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault(); var i = this._event, s = t.targetTouches ? t.targetTouches[0] : t; i.deltaX = (s.pageX - this.touchStartX) * e.touchMultiplier, i.deltaY = (s.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = s.pageX, this.touchStartY = s.pageY, this._notify(t) }, V.prototype._onKeyDown = function (t) { var e = this._event; e.deltaX = e.deltaY = 0; var i = window.innerHeight - 40; switch (t.keyCode) { case P: case Y: e.deltaY = this.options.keyStep; break; case I: case z: e.deltaY = -this.options.keyStep; break; case t.shiftKey: e.deltaY = i; break; case X: e.deltaY = -i; break; default: return }this._notify(t) }, V.prototype._bind = function () { M.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions), M.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions), M.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)), M.hasPointer && M.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)), M.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown) }, V.prototype._unbind = function () { M.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel), M.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel), M.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)), M.hasPointer && M.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)), M.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown) }, V.prototype.on = function (t, e) { this._emitter.on(H, t, e); var i = this._emitter.e; i && i[H] && 1 === i[H].length && this._bind() }, V.prototype.off = function (t, e) { this._emitter.off(H, t, e); var i = this._emitter.e; (!i[H] || i[H].length <= 0) && this._unbind() }, V.prototype.reset = function () { var t = this._event; t.x = 0, t.y = 0 }, V.prototype.destroy = function () { this._emitter.off(), this._unbind() }; var N = "function" == typeof Float32Array; function U(t, e) { return 1 - 3 * e + 3 * t } function $(t, e) { return 3 * e - 6 * t } function G(t) { return 3 * t } function J(t, e, i) { return ((U(e, i) * t + $(e, i)) * t + G(e)) * t } function Q(t, e, i) { return 3 * U(e, i) * t * t + 2 * $(e, i) * t + G(e) } function Z(t) { return t } var tt = function (t, e, i, s) { if (!(0 <= t && t <= 1 && 0 <= i && i <= 1)) throw new Error("bezier x values must be in [0, 1] range"); if (t === e && i === s) return Z; for (var n = N ? new Float32Array(11) : new Array(11), o = 0; o < 11; ++o)n[o] = J(.1 * o, t, i); function r(e) { for (var s = 0, o = 1; 10 !== o && n[o] <= e; ++o)s += .1; --o; var r = s + .1 * ((e - n[o]) / (n[o + 1] - n[o])), l = Q(r, t, i); return l >= .001 ? function (t, e, i, s) { for (var n = 0; n < 4; ++n) { var o = Q(e, i, s); if (0 === o) return e; e -= (J(e, i, s) - t) / o } return e }(e, r, t, i) : 0 === l ? r : function (t, e, i, s, n) { var o, r, l = 0; do { (o = J(r = e + (i - e) / 2, s, n) - t) > 0 ? i = r : e = r } while (Math.abs(o) > 1e-7 && ++l < 10); return r }(e, s, s + .1, t, i) } return function (t) { return 0 === t ? 0 : 1 === t ? 1 : J(r(t), e, s) } }, et = 38, it = 40, st = 32, nt = 9, ot = 33, rt = 34, lt = 36, at = 35, ct = function (e) { r(n, e); var s = d(n); function n() { var e, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; return t(this, n), history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0), (e = s.call(this, i)).inertia && (e.lerp = .1 * e.inertia), e.isScrolling = !1, e.isDraggingScrollbar = !1, e.isTicking = !1, e.hasScrollTicking = !1, e.parallaxElements = {}, e.stop = !1, e.scrollbarContainer = i.scrollbarContainer, e.checkKey = e.checkKey.bind(c(e)), window.addEventListener("keydown", e.checkKey, !1), e } return i(n, [{ key: "init", value: function () { var t = this; this.html.classList.add(this.smoothClass), this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction), this.instance = o({ delta: { x: this.initPosition.x, y: this.initPosition.y }, scroll: { x: this.initPosition.x, y: this.initPosition.y } }, this.instance), this.vs = new R({ el: this.scrollFromAnywhere ? document : this.el, mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : .4, firefoxMultiplier: this.firefoxMultiplier, touchMultiplier: this.touchMultiplier, useKeyboard: !1, passive: !0 }), this.vs.on((function (e) { t.stop || t.isDraggingScrollbar || requestAnimationFrame((function () { t.updateDelta(e), t.isScrolling || t.startScrolling() })) })), this.setScrollLimit(), this.initScrollBar(), this.addSections(), this.addElements(), this.checkScroll(!0), this.transformElements(!0, !0), u(l(n.prototype), "init", this).call(this) } }, { key: "setScrollLimit", value: function () { if (this.instance.limit.y = this.el.offsetHeight - this.windowHeight, "horizontal" === this.direction) { for (var t = 0, e = this.el.children, i = 0; i < e.length; i++)t += e[i].offsetWidth; this.instance.limit.x = t - this.windowWidth } } }, { key: "startScrolling", value: function () { this.startScrollTs = Date.now(), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass) } }, { key: "stopScrolling", value: function () { cancelAnimationFrame(this.checkScrollRaf), this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), this.scrollToRaf = null), this.isScrolling = !1, this.instance.scroll.y = Math.round(this.instance.scroll.y), this.html.classList.remove(this.scrollingClass) } }, { key: "checkKey", value: function (t) { var e = this; if (this.stop) t.keyCode == nt && requestAnimationFrame((function () { e.html.scrollTop = 0, document.body.scrollTop = 0, e.html.scrollLeft = 0, document.body.scrollLeft = 0 })); else { switch (t.keyCode) { case nt: requestAnimationFrame((function () { e.html.scrollTop = 0, document.body.scrollTop = 0, e.html.scrollLeft = 0, document.body.scrollLeft = 0, e.scrollTo(document.activeElement, { offset: -window.innerHeight / 2 }) })); break; case et: this.instance.delta[this.directionAxis] -= 240; break; case it: this.instance.delta[this.directionAxis] += 240; break; case ot: this.instance.delta[this.directionAxis] -= window.innerHeight; break; case rt: this.instance.delta[this.directionAxis] += window.innerHeight; break; case lt: this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis]; break; case at: this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis]; break; case st: document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement || (t.shiftKey ? this.instance.delta[this.directionAxis] -= window.innerHeight : this.instance.delta[this.directionAxis] += window.innerHeight); break; default: return }this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]), this.stopScrolling(), this.isScrolling = !0, this.checkScroll(), this.html.classList.add(this.scrollingClass) } } }, { key: "checkScroll", value: function () { var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; if (e || this.isScrolling || this.isDraggingScrollbar) { this.hasScrollTicking || (this.checkScrollRaf = requestAnimationFrame((function () { return t.checkScroll() })), this.hasScrollTicking = !0), this.updateScroll(); var i = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]), s = Date.now() - this.startScrollTs; if (!this.animatingScroll && s > 100 && (i < .5 && 0 != this.instance.delta[this.directionAxis] || i < .5 && 0 == this.instance.delta[this.directionAxis]) && this.stopScrolling(), Object.entries(this.sections).forEach((function (i) { var s = f(i, 2), n = (s[0], s[1]); n.persistent || t.instance.scroll[t.directionAxis] > n.offset[t.directionAxis] && t.instance.scroll[t.directionAxis] < n.limit[t.directionAxis] ? ("horizontal" === t.direction ? t.transform(n.el, -t.instance.scroll[t.directionAxis], 0) : t.transform(n.el, 0, -t.instance.scroll[t.directionAxis]), n.inView || (n.inView = !0, n.el.style.opacity = 1, n.el.style.pointerEvents = "all", n.el.setAttribute("data-".concat(t.name, "-section-inview"), ""))) : ((n.inView || e) && (n.inView = !1, n.el.style.opacity = 0, n.el.style.pointerEvents = "none", n.el.removeAttribute("data-".concat(t.name, "-section-inview"))), t.transform(n.el, 0, 0)) })), this.getDirection && this.addDirection(), this.getSpeed && (this.addSpeed(), this.speedTs = Date.now()), this.detectElements(), this.transformElements(), this.hasScrollbar) { var o = this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis] * this.scrollBarLimit[this.directionAxis]; "horizontal" === this.direction ? this.transform(this.scrollbarThumb, o, 0) : this.transform(this.scrollbarThumb, 0, o) } u(l(n.prototype), "checkScroll", this).call(this), this.hasScrollTicking = !1 } } }, { key: "resize", value: function () { this.windowHeight = window.innerHeight, this.windowWidth = window.innerWidth, this.checkContext(), this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }, this.update() } }, { key: "updateDelta", value: function (t) { var e, i = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection; e = "both" === i ? t.deltaX + t.deltaY : "vertical" === i ? t.deltaY : "horizontal" === i ? t.deltaX : t.deltaY, this.instance.delta[this.directionAxis] -= e * this.multiplier, this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0), this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]) } }, { key: "updateScroll", value: function (t) { this.isScrolling || this.isDraggingScrollbar ? this.instance.scroll[this.directionAxis] = F(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp) : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis] ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis]) : this.instance.scroll.y < 0 ? this.setScroll(this.instance.scroll[this.directionAxis], 0) : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]) } }, { key: "addDirection", value: function () { this.instance.delta.y > this.instance.scroll.y ? "down" !== this.instance.direction && (this.instance.direction = "down") : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up"), this.instance.delta.x > this.instance.scroll.x ? "right" !== this.instance.direction && (this.instance.direction = "right") : this.instance.delta.x < this.instance.scroll.x && "left" !== this.instance.direction && (this.instance.direction = "left") } }, { key: "addSpeed", value: function () { this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis] ? this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs) : this.instance.speed = 0 } }, { key: "initScrollBar", value: function () { if (this.scrollbar = document.createElement("span"), this.scrollbarThumb = document.createElement("span"), this.scrollbar.classList.add("".concat(this.scrollbarClass)), this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")), this.scrollbar.append(this.scrollbarThumb), this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar), this.getScrollBar = this.getScrollBar.bind(this), this.releaseScrollBar = this.releaseScrollBar.bind(this), this.moveScrollBar = this.moveScrollBar.bind(this), this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar), window.addEventListener("mouseup", this.releaseScrollBar), window.addEventListener("mousemove", this.moveScrollBar), this.hasScrollbar = !1, "horizontal" == this.direction) { if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return; this.hasScrollbar = !0, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height } } }, { key: "reinitScrollBar", value: function () { if (this.hasScrollbar = !1, "horizontal" == this.direction) { if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return; this.hasScrollbar = !0, this.scrollbarBCR = this.scrollbar.getBoundingClientRect(), this.scrollbarHeight = this.scrollbarBCR.height, this.scrollbarWidth = this.scrollbarBCR.width, "horizontal" === this.direction ? this.scrollbarThumb.style.width = "".concat(this.scrollbarWidth * this.scrollbarWidth / (this.instance.limit.x + this.scrollbarWidth), "px") : this.scrollbarThumb.style.height = "".concat(this.scrollbarHeight * this.scrollbarHeight / (this.instance.limit.y + this.scrollbarHeight), "px"), this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect(), this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height } } }, { key: "destroyScrollBar", value: function () { this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar), window.removeEventListener("mouseup", this.releaseScrollBar), window.removeEventListener("mousemove", this.moveScrollBar), this.scrollbar.remove() } }, { key: "getScrollBar", value: function (t) { this.isDraggingScrollbar = !0, this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass) } }, { key: "releaseScrollBar", value: function (t) { this.isDraggingScrollbar = !1, this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass) } }, { key: "moveScrollBar", value: function (t) { var e = this; this.isDraggingScrollbar && requestAnimationFrame((function () { var i = 100 * (t.clientX - e.scrollbarBCR.left) / e.scrollbarWidth * e.instance.limit.x / 100, s = 100 * (t.clientY - e.scrollbarBCR.top) / e.scrollbarHeight * e.instance.limit.y / 100; s > 0 && s < e.instance.limit.y && (e.instance.delta.y = s), i > 0 && i < e.instance.limit.x && (e.instance.delta.x = i) })) } }, { key: "addElements", value: function () { var t = this; this.els = {}, this.parallaxElements = {}, this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach((function (e, i) { var s, n, o, r = K(e), l = Object.entries(t.sections).map((function (t) { var e = f(t, 2); e[0]; return e[1] })).find((function (t) { return r.includes(t.el) })), a = e.dataset[t.name + "Class"] || t.class, c = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "el" + i, h = e.dataset[t.name + "Repeat"], d = e.dataset[t.name + "Call"], u = e.dataset[t.name + "Position"], p = e.dataset[t.name + "Delay"], m = e.dataset[t.name + "Direction"], v = "string" == typeof e.dataset[t.name + "Sticky"], y = !!e.dataset[t.name + "Speed"] && parseFloat(e.dataset[t.name + "Speed"]) / 10, b = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset, g = e.dataset[t.name + "Target"], w = (o = void 0 !== g ? document.querySelector("".concat(g)) : e).getBoundingClientRect(); null === l || l.inView ? (s = w.top + t.instance.scroll.y - q(o).y, n = w.left + t.instance.scroll.x - q(o).x) : (s = w.top - q(l.el).y - q(o).y, n = w.left - q(l.el).x - q(o).x); var x = s + o.offsetHeight, S = n + o.offsetWidth, k = { x: (S - n) / 2 + n, y: (x - s) / 2 + s }; if (v) { var T = e.getBoundingClientRect(), E = T.top, A = T.left, O = { x: A - n, y: E - s }; s += window.innerHeight, n += window.innerWidth, x = E + o.offsetHeight - e.offsetHeight - O[t.directionAxis], k = { x: ((S = A + o.offsetWidth - e.offsetWidth - O[t.directionAxis]) - n) / 2 + n, y: (x - s) / 2 + s } } h = "false" != h && (null != h || t.repeat); var D = [0, 0]; if (b) if ("horizontal" === t.direction) { for (var C = 0; C < b.length; C++)"string" == typeof b[C] ? b[C].includes("%") ? D[C] = parseInt(b[C].replace("%", "") * t.windowWidth / 100) : D[C] = parseInt(b[C]) : D[C] = b[C]; n += D[0], S -= D[1] } else { for (C = 0; C < b.length; C++)"string" == typeof b[C] ? b[C].includes("%") ? D[C] = parseInt(b[C].replace("%", "") * t.windowHeight / 100) : D[C] = parseInt(b[C]) : D[C] = b[C]; s += D[0], x -= D[1] } var L = { el: e, id: c, class: a, section: l, top: s, middle: k, bottom: x, left: n, right: S, offset: b, progress: 0, repeat: h, inView: !1, call: d, speed: y, delay: p, position: u, target: o, direction: m, sticky: v }; t.els[c] = L, e.classList.contains(a) && t.setInView(t.els[c], c), (!1 !== y || v) && (t.parallaxElements[c] = L) })) } }, { key: "addSections", value: function () { var t = this; this.sections = {}; var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]")); 0 === e.length && (e = [this.el]), e.forEach((function (e, i) { var s = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "section" + i, n = e.getBoundingClientRect(), o = { x: n.left - 1.5 * window.innerWidth - q(e).x, y: n.top - 1.5 * window.innerHeight - q(e).y }, r = { x: o.x + n.width + 2 * window.innerWidth, y: o.y + n.height + 2 * window.innerHeight }, l = "string" == typeof e.dataset[t.name + "Persistent"]; e.setAttribute("data-scroll-section-id", s); var a = { el: e, offset: o, limit: r, inView: !1, persistent: l, id: s }; t.sections[s] = a })) } }, { key: "transform", value: function (t, e, i, s) { var n; if (s) { var o = q(t), r = F(o.x, e, s), l = F(o.y, i, s); n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(r, ",").concat(l, ",0,1)") } else n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(i, ",0,1)"); t.style.webkitTransform = n, t.style.msTransform = n, t.style.transform = n } }, { key: "transformElements", value: function (t) { var e = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], s = this.instance.scroll.x + this.windowWidth, n = this.instance.scroll.y + this.windowHeight, o = { x: this.instance.scroll.x + this.windowMiddle.x, y: this.instance.scroll.y + this.windowMiddle.y }; Object.entries(this.parallaxElements).forEach((function (r) { var l = f(r, 2), a = (l[0], l[1]), c = !1; if (t && (c = 0), a.inView || i) switch (a.position) { case "top": c = e.instance.scroll[e.directionAxis] * -a.speed; break; case "elementTop": c = (n - a.top) * -a.speed; break; case "bottom": c = (e.instance.limit[e.directionAxis] - n + e.windowHeight) * a.speed; break; case "left": c = e.instance.scroll[e.directionAxis] * -a.speed; break; case "elementLeft": c = (s - a.left) * -a.speed; break; case "right": c = (e.instance.limit[e.directionAxis] - s + e.windowHeight) * a.speed; break; default: c = (o[e.directionAxis] - a.middle[e.directionAxis]) * -a.speed }a.sticky && (c = a.inView ? "horizontal" === e.direction ? e.instance.scroll.x - a.left + window.innerWidth : e.instance.scroll.y - a.top + window.innerHeight : "horizontal" === e.direction ? e.instance.scroll.x < a.left - window.innerWidth && e.instance.scroll.x < a.left - window.innerWidth / 2 ? 0 : e.instance.scroll.x > a.right && e.instance.scroll.x > a.right + 100 && a.right - a.left + window.innerWidth : e.instance.scroll.y < a.top - window.innerHeight && e.instance.scroll.y < a.top - window.innerHeight / 2 ? 0 : e.instance.scroll.y > a.bottom && e.instance.scroll.y > a.bottom + 100 && a.bottom - a.top + window.innerHeight), !1 !== c && ("horizontal" === a.direction || "horizontal" === e.direction && "vertical" !== a.direction ? e.transform(a.el, c, 0, !t && a.delay) : e.transform(a.el, 0, c, !t && a.delay)) })) } }, { key: "scrollTo", value: function (t) { var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, s = parseInt(i.offset) || 0, n = isNaN(parseInt(i.duration)) ? 1e3 : parseInt(i.duration), o = i.easing || [.25, 0, .35, 1], r = !!i.disableLerp, l = !!i.callback && i.callback; if (o = tt.apply(void 0, p(o)), "string" == typeof t) { if ("top" === t) t = 0; else if ("bottom" === t) t = this.instance.limit.y; else if ("left" === t) t = 0; else if ("right" === t) t = this.instance.limit.x; else if (!(t = document.querySelector(t))) return } else if ("number" == typeof t) t = parseInt(t); else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid"); if ("number" != typeof t) { var a = K(t).includes(this.el); if (!a) return; var c = t.getBoundingClientRect(), h = c.top, d = c.left, u = K(t), m = u.find((function (t) { return Object.entries(e.sections).map((function (t) { var e = f(t, 2); e[0]; return e[1] })).find((function (e) { return e.el == t })) })), v = 0; v = m ? q(m)[this.directionAxis] : -this.instance.scroll[this.directionAxis], s = "horizontal" === this.direction ? d + s - v : h + s - v } else s = t + s; var y = parseFloat(this.instance.delta[this.directionAxis]), b = Math.max(0, Math.min(s, this.instance.limit[this.directionAxis])), g = b - y, w = function (t) { r ? "horizontal" === e.direction ? e.setScroll(y + g * t, e.instance.delta.y) : e.setScroll(e.instance.delta.x, y + g * t) : e.instance.delta[e.directionAxis] = y + g * t }; this.animatingScroll = !0, this.stopScrolling(), this.startScrolling(); var x = Date.now(), S = function t() { var i = (Date.now() - x) / n; i > 1 ? (w(1), e.animatingScroll = !1, 0 == n && e.update(), l && l()) : (e.scrollToRaf = requestAnimationFrame(t), w(o(i))) }; S() } }, { key: "update", value: function () { this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(!0), this.reinitScrollBar(), this.checkScroll(!0) } }, { key: "startScroll", value: function () { this.stop = !1 } }, { key: "stopScroll", value: function () { this.stop = !0 } }, { key: "setScroll", value: function (t, e) { this.instance = o(o({}, this.instance), {}, { scroll: { x: t, y: e }, delta: { x: t, y: e }, speed: 0 }) } }, { key: "destroy", value: function () { u(l(n.prototype), "destroy", this).call(this), this.stopScrolling(), this.html.classList.remove(this.smoothClass), this.vs.destroy(), this.destroyScrollBar(), window.removeEventListener("keydown", this.checkKey, !1) } }]), n }(b); return function () { function e() { var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; t(this, e), this.options = i, Object.assign(this, y, i), this.smartphone = y.smartphone, i.smartphone && Object.assign(this.smartphone, i.smartphone), this.tablet = y.tablet, i.tablet && Object.assign(this.tablet, i.tablet), this.smooth || "horizontal" != this.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible"), this.tablet.smooth || "horizontal" != this.tablet.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"), this.smartphone.smooth || "horizontal" != this.smartphone.direction || console.warn("🚨 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"), this.init() } return i(e, [{ key: "init", value: function () { if (this.options.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || window.innerWidth < this.tablet.breakpoint, this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint, this.smooth && !this.options.isMobile || this.tablet.smooth && this.options.isTablet || this.smartphone.smooth && this.options.isMobile && !this.options.isTablet ? this.scroll = new ct(this.options) : this.scroll = new S(this.options), this.scroll.init(), window.location.hash) { var t = window.location.hash.slice(1, window.location.hash.length), e = document.getElementById(t); e && this.scroll.scrollTo(e) } } }, { key: "update", value: function () { this.scroll.update() } }, { key: "start", value: function () { this.scroll.startScroll() } }, { key: "stop", value: function () { this.scroll.stopScroll() } }, { key: "scrollTo", value: function (t, e) { this.scroll.scrollTo(t, e) } }, { key: "setScroll", value: function (t, e) { this.scroll.setScroll(t, e) } }, { key: "on", value: function (t, e) { this.scroll.setEvents(t, e) } }, { key: "off", value: function (t, e) { this.scroll.unsetEvents(t, e) } }, { key: "destroy", value: function () { this.scroll.destroy() } }]), e }() }));

//WP comments reply
window.addComment = function (v) { var I, C, h, E = v.document, b = { commentReplyClass: "comment-reply-link", commentReplyTitleId: "reply-title", cancelReplyId: "cancel-comment-reply-link", commentFormId: "commentform", temporaryFormId: "wp-temp-form-div", parentIdFieldId: "comment_parent", postIdFieldId: "comment_post_ID" }, e = v.MutationObserver || v.WebKitMutationObserver || v.MozMutationObserver, r = "querySelector" in E && "addEventListener" in v, n = !!E.documentElement.dataset; function t() { d(), e && new e(o).observe(E.body, { childList: !0, subtree: !0 }) } function d(e) { if (r && (I = g(b.cancelReplyId), C = g(b.commentFormId), I)) { I.addEventListener("touchstart", l), I.addEventListener("click", l); var t = function (e) { if ((e.metaKey || e.ctrlKey) && 13 === e.keyCode) return C.removeEventListener("keydown", t), e.preventDefault(), C.submit.click(), !1 }; C && C.addEventListener("keydown", t); for (var n, d = function (e) { var t = b.commentReplyClass; e && e.childNodes || (e = E); t = E.getElementsByClassName ? e.getElementsByClassName(t) : e.querySelectorAll("." + t); return t }(e), o = 0, i = d.length; o < i; o++)(n = d[o]).addEventListener("touchstart", a), n.addEventListener("click", a) } } function l(e) { var t, n, d = g(b.temporaryFormId); d && h && (g(b.parentIdFieldId).value = "0", t = d.textContent, d.parentNode.replaceChild(h, d), this.style.display = "none", n = (d = (n = g(b.commentReplyTitleId)) && n.firstChild) && d.nextSibling, d && d.nodeType === Node.TEXT_NODE && t && (n && "A" === n.nodeName && n.id !== b.cancelReplyId && (n.style.display = ""), d.textContent = t), e.preventDefault()) } function a(e) { var t = g(b.commentReplyTitleId), n = t && t.firstChild.textContent, d = this, o = m(d, "belowelement"), i = m(d, "commentid"), r = m(d, "respondelement"), t = m(d, "postid"), n = m(d, "replyto") || n; o && i && r && t && !1 === v.addComment.moveForm(o, i, r, t, n) && e.preventDefault() } function o(e) { for (var t = e.length; t--;)if (e[t].addedNodes.length) return void d() } function m(e, t) { return n ? e.dataset[t] : e.getAttribute("data-" + t) } function g(e) { return E.getElementById(e) } return r && "loading" !== E.readyState ? t() : r && v.addEventListener("DOMContentLoaded", t, !1), { init: d, moveForm: function (e, t, n, d, o) { var i = g(e); h = g(n); var r, l, a, m, c = g(b.parentIdFieldId), s = g(b.postIdFieldId), y = g(b.commentReplyTitleId), p = y && y.firstChild, u = p && p.nextSibling; if (i && h && c) { void 0 === o && (o = p && p.textContent), m = h, e = b.temporaryFormId, n = g(e), y = (y = g(b.commentReplyTitleId)) ? y.firstChild.textContent : "", n || ((n = E.createElement("div")).id = e, n.style.display = "none", n.textContent = y, m.parentNode.insertBefore(n, m)), d && s && (s.value = d), c.value = t, I.style.display = "", i.parentNode.insertBefore(h, i.nextSibling), p && p.nodeType === Node.TEXT_NODE && (u && "A" === u.nodeName && u.id !== b.cancelReplyId && (u.style.display = "none"), p.textContent = o), I.onclick = function () { return !1 }; try { for (var f = 0; f < C.elements.length; f++)if (r = C.elements[f], l = !1, "getComputedStyle" in v ? a = v.getComputedStyle(r) : E.documentElement.currentStyle && (a = r.currentStyle), (r.offsetWidth <= 0 && r.offsetHeight <= 0 || "hidden" === a.visibility) && (l = !0), "hidden" !== r.type && !r.disabled && !l) { r.focus(); break } } catch (e) { } return !1 } } } }(window);

//Slide toggle animation
const DOMAnimations = { slideUp: function (t, e) { t.style.height = t.offsetHeight + "px", t.style.transitionProperty = "height, margin, padding", t.style.transitionDuration = e + "ms", t.offsetHeight, t.style.overflow = "hidden", t.style.height = 0, t.style.paddingTop = 0, t.style.paddingBottom = 0, t.style.marginTop = 0, t.style.marginBottom = 0, setTimeout(function () { t.style.display = "none", t.style.removeProperty("height"), t.style.removeProperty("padding-top"), t.style.removeProperty("padding-bottom"), t.style.removeProperty("margin-top"), t.style.removeProperty("margin-bottom"), t.style.removeProperty("overflow"), t.style.removeProperty("transition-duration"), t.style.removeProperty("transition-property") }, e) }, slideDown: function (t, e) { t.style.display = "block"; var o = t.offsetHeight; t.style.overflow = "hidden", t.style.height = 0, t.style.paddingTop = 0, t.style.paddingBottom = 0, t.style.marginTop = 0, t.style.marginBottom = 0, t.offsetHeight, t.style.transitionProperty = "height, margin, padding", t.style.transitionDuration = e + "ms", t.style.height = o + "px", t.style.removeProperty("padding-top"), t.style.removeProperty("padding-bottom"), t.style.removeProperty("margin-top"), t.style.removeProperty("margin-bottom"), setTimeout(function () { t.style.removeProperty("height"), t.style.removeProperty("overflow"), t.style.removeProperty("transition-duration"), t.style.removeProperty("transition-property") }, e) }, slideToggle: function (t) { return "none" === window.getComputedStyle(t).display ? this.slideDown(t, 500) : this.slideUp(t, 500) } };

"use strict";



//Object.assign() polyfill
if (typeof Object.assign != 'function') {
	Object.defineProperty(Object, "assign", { value: function (e, r) { for (var t = Object(e), n = 1; n < arguments.length; n++) { var a = arguments[n]; if (null != a) for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (t[l] = a[l]) } return t }, writable: !0, configurable: !0 });
}

//IntersectionObserver polyfill
if (typeof window.IntersectionObserver === 'undefined') {
	var IntersectionObserver = function () { }

	IntersectionObserver.prototype.observe = function (target, callback) {
		callback(target);
	}
}

//Detect mobile devices
window.isMobile = /iPhone|iPad|iPod|Android|webOS/i.test(navigator.userAgent);


//Localization
let lang = document.documentElement.lang.substring(0, 2);
// let localhostUrlPattern = '.test';
// if (
// 	window.location.hostname === "localhost"
// 	|| location.hostname === "127.0.0.1"
// 	|| window.location.hostname.indexOf(localhostUrlPattern) >= 0) {
// 	lang = '';
// }

console.log('lang', lang);

const i18n = {
	ru: {
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		weekStart: 1,
		rated: 'Спасибо. Ваш голос засчитан!',
		alreadyRated: 'Вы уже голосовали за этот материал!',
		hours: ['час', 'часа', 'часов'],
		minutes: ['минута', 'минуты', 'минут'],
		redirect: 'https://www.uberem.com.ua/ru/spasibo',
		baseCleaning: ['базовая уборка', 'базовые уборки', 'базовых уборки'],
		supportCleaning: ['поддерживающая уборка', 'поддерживающие уборки', 'поддерживающих уборки'],
		calcTypeBase:'базовое',
		calcTypeSustaining:'поддерживающее',
	},
	uk: {
		months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
		weekdaysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
		weekStart: 1,
		rated: 'Дякую. Ваш голос зараховано!',
		alreadyRated: 'Ви вже голосували за цей матеріал!',
		hours: ['година', 'години', 'годин'],
		minutes: ['хвилина', 'хвилини', 'хвилин'],
		redirect: 'https://www.uberem.com.ua/dyakuemo',
		baseCleaning: ['базове прибирання', 'базових прибирання', 'базових прибирання'],
		supportCleaning: ['підтримуюче прибирання', 'підтримуючих прибирання', 'підтримуючих прибирання'],
		calcTypeBase:'базове',
		calcTypeSustaining:'підтримуюче',
	},
	en: {
		months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		weekStart: 0,
		rated: 'Thank you. Your vote has been counted!',
		alreadyRated: 'You have already voted for this material!',
		hours: ['hour', 'hours', 'hours'],
		minutes: ['minute', 'minutes', 'minutes'],
		redirect: 'https://www.uberem.com.ua/en/thank-you',
		baseCleaning: ['basic cleaning', 'basic cleaning', 'basic cleaning'],
		supportCleaning: ['sustaining cleaning', 'sustaining cleaning', 'sustaining cleaning'],
		calcTypeBase:'basic',
		calcTypeSustaining:'sustaining',
	}
}

	//Disable mobile Safari zoom and Hover callback
	; (function () {
		if ('ontouchstart' in window) {
			document.addEventListener('gesturestart', function (event) {
				event.preventDefault();
			});
			document.addEventListener('touchstart', function () { }, true);
		}
	})();

//Detect element to enter in viewport
function ScrollMonitor(items, callback, several) {
	if (items.length <= 0) {
		return
	}

	this.items = items.length ? items : [items];
	this.callback = callback;
	this.several = several;

	this.createObserver();
}

ScrollMonitor.prototype.createObserver = function () {
	const self = this;

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.intersectionRatio > 0) {
				if (!self.several) {
					observer.unobserve(entry.target);
				}
				self.callback(entry.target);
			}
		});
	}, { threshold: [0, .25, .5, .75, 1] });

	for (let i = 0; i < this.items.length; i++) {
		observer.observe(this.items[i], function (el) {
			self.callback(el);
		});
	}
}

//Faq spoiler
function Spoiler(items) {
	if (items.length === 0) {
		return;
	}

	this.items = items;

	this.addEvents();
}

Spoiler.prototype.addEvents = function () {
	for (let i = 0; i < this.items.length; i++) {
		this.items[i].addEventListener('click', this.onClick, false);
	}
}

Spoiler.prototype.onClick = function (event) {
	if (event.target.classList.contains('faq-item-title')) {
		const el = event.target.nextElementSibling;

		if (!el.style.height) {
			event.target.classList.toggle('faq-active');
			DOMAnimations.slideToggle(el);
		}
	}
}

const spoiler = new Spoiler(document.querySelectorAll('.faq-list'))

//Drawer menu
function Menu(btn) {
	this.btn = btn

	this.wrap = document.querySelector('.main-menu-wrap');
	this.onClick = this.onClick.bind(this);

	this.addEvents();
}

Menu.prototype.addEvents = function () {
	this.btn.addEventListener('click', this.onClick, false);
}

Menu.prototype.disableTouch = function (event) {
	event.preventDefault();
}

Menu.prototype.onClick = function (event) {
	if (document.body.classList.contains('menu-open')) {
		document.body.classList.remove('menu-open');
		document.removeEventListener('touchmove', this.disableTouch, { passive: false });
	} else {
		this.wrap.style.height = document.documentElement.clientHeight + 'px';
		document.body.classList.add('menu-open');
		document.addEventListener('touchmove', this.disableTouch, { passive: false });
	}
}

const menu = new Menu(document.querySelector('.btn-menu'));

//Phone mask
function Mask(items) {
	if (items.length <= 0) {
		return
	}

	this.items = items;
	this.controller = null;

	this.onFocus = this.onFocus.bind(this);
	this.onBlur = this.onBlur.bind(this);

	this.addEvents();
}

Mask.prototype.addEvents = function () {
	for (let i = 0; i < this.items.length; i++) {
		this.items[i].addEventListener('focus', this.onFocus, false);
		this.items[i].addEventListener('blur', this.onBlur, false);
	}
}

Mask.prototype.onFocus = function (event) {
	if (this.controller === null) {
		this.controller = vanillaTextMask.maskInput({
			inputElement: event.target,
			mask: ['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
			showMask: true
		});
	}

	setTimeout(function () {
		event.target.setSelectionRange(5, 5);
	}, 5);
}

Mask.prototype.onBlur = function (event) {
	if (event.target.value.indexOf('_') > -1) {
		this.controller.destroy();
		this.controller = null;
		event.target.value = '';
	}
}

const mask = new Mask(document.querySelectorAll('.tel-mask-input'));

//Dropdown select
function Dropdown(items) {
	if (items.length <= 0) {
		return
	}

	this.items = items;

	this.create();
}

Dropdown.prototype.create = function () {
	for (let i = 0; i < this.items.length; i++) {
		new CustomSelect({ elem: this.items[i] });
	}
}

const dropdown = new Dropdown(document.querySelectorAll('.select-input'));

//Video lazyload
function VideoLoad(items) {
	if (items.length <= 0) {
		return
	}

	this.items = items;

	this.onClick = this.onClick.bind(this);

	this.addEvents();
}

VideoLoad.prototype.addEvents = function () {
	for (let i = 0; i < this.items.length; i++) {
		this.items[i].addEventListener('click', this.onClick, false);
	}
}

VideoLoad.prototype.create = function (id) {
	const videoNode = document.createElement('iframe');
	videoNode.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?autoplay=1');
	videoNode.setAttribute('frameborder', 0);
	videoNode.setAttribute('allow', 'autoplay; fullscreen');

	return videoNode;
}

VideoLoad.prototype.onClick = function (event) {
	event.target.parentElement.appendChild(this.create(event.target.dataset.video))
}

const videoLoad = new VideoLoad(document.querySelectorAll('.video-load'));

//Social share buttons
function SocialShare(items) {
	if (items.length <= 0) {
		return
	}

	this.items = items;

	this.addEvents();
}

SocialShare.prototype.addEvents = function () {
	for (let i = 0; i < this.items.length; i++) {
		this.items[i].addEventListener('click', this.onClick, false);
	}
}

SocialShare.prototype.onClick = function (event) {
	const type = {
		fb: 'https://www.facebook.com/sharer.php?u=' + document.location,
		tw: 'https://twitter.com/share?url=' + document.location + '&amp;text=' + document.title + '&amp;hashtags=uberem'
	};

	window.open(type[event.target.dataset.type], document.title, 'scrollbars=yes,width=500,height=400,resizable=true,top=' + (window.innerHeight / 2 - 200) + ',left=' + (window.innerWidth / 2 - 250)).focus()
}

const socialShare = new SocialShare(document.querySelectorAll('.share-button'));

//API Google map
function Gmap(el) {
	if (el === null) {
		return
	}

	this.gmap = el;

	this.init = this.init.bind(this);
	this.load = this.load.bind(this);

	this.observer();
}

Gmap.prototype.init = function () {
	const lat = Number(this.gmap.dataset.lat),
		lng = Number(this.gmap.dataset.lng),
		position = new google.maps.LatLng(lat, lng),
		map = new google.maps.Map(this.gmap, {
			center: position,
			zoom: 17,
			streetViewControl: false,
			mapTypeControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}),
		marker = new google.maps.Marker({
			position: position,
			icon: '/wp-content/themes/uberem/img/gmap-marker.svg',
			map: map
		}),
		self = this;

	map.addListener('tilesloaded', function (event) {
		self.gmap.parentElement.classList.add('contact-gmap-loaded');
	});
}

Gmap.prototype.load = function () {
	const script = document.createElement('script');
	script.addEventListener('load', this.init);
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAd0XcUD2Fg7VbFEicTHGbvYZxb2x4_-nE';
	script.async = true;

	document.body.appendChild(script);
}

Gmap.prototype.observer = function () {
	new ScrollMonitor(this.gmap, this.load);
}

const gmap = new Gmap(document.getElementById('gmap'));

//Embed Google map
function EmbedGmap(el) {
	if (el === null) {
		return
	}

	this.gmap = el;

	this.onLoad = this.onLoad.bind(this);
	this.create = this.create.bind(this);

	this.observer();
}

EmbedGmap.prototype.onLoad = function () {
	this.gmap.classList.add('embed-gmap-loaded');
}

EmbedGmap.prototype.create = function () {
	const iframe = document.createElement('iframe');
	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('frameborder', '0');
	iframe.setAttribute('src', this.gmap.dataset.url);

	iframe.addEventListener('load', this.onLoad);

	this.gmap.appendChild(iframe);
}

EmbedGmap.prototype.observer = function () {
	new ScrollMonitor(this.gmap, this.create);
}

const embedGmap = new EmbedGmap(document.getElementById('embed-gmap'));

//Date picker
function Datepicker(items) {
	if (items.length <= 0) {
		return
	}

	this.items = items;
	this.options = {
		firstDay: i18n[lang].weekStart,
		minDate: new Date(),
		toString: function (date) {
			return date.toLocaleDateString('en-GB');
		},
		showDaysInNextAndPreviousMonths: true,
		i18n: i18n[lang]
	};

	this.create();
}

Datepicker.prototype.create = function () {
	for (let i = 0; i < this.items.length; i++) {
		new Pikaday(Object.assign({ field: this.items[i], container: this.items[i].parentElement }, this.options));
	}
}

const datepicker = new Datepicker(document.querySelectorAll('.date-input'));

//Toogle tabs
function Tabs(items) {
	if (items.length <= 0) {
		return
	}

	this.items = items;

	this.addEvents();
}

Tabs.prototype.addEvents = function () {
	for (let i = 0; i < this.items.length; i++) {
		this.items[i].addEventListener('click', this.onClick, false);
	}
}

Tabs.prototype.onClick = function (event) {
	const decoration = this.querySelector('.toogle-tabs-decoration');
	const tabs = document.getElementById(this.dataset.id);

	if (!this.classList.contains('toogle-tabs-initialized')) {
		decoration.style.width = this.firstElementChild.offsetWidth + 'px';
		decoration.offsetWidth;
		this.classList.add('toogle-tabs-initialized');
	}

	if (event.target.classList.contains('toogle-tabs-item') && !event.target.classList.contains('toogle-tabs-active')) {
		this.querySelector('.toogle-tabs-active').classList.remove('toogle-tabs-active');
		event.target.classList.add('toogle-tabs-active');

		const offsetLeft = event.target.offsetLeft;
		decoration.style.width = event.target.offsetWidth + 'px';
		decoration.style.left = offsetLeft + 'px';

		scrollToLeft(this.parentElement.parentElement, offsetLeft);

		if (tabs !== null) {
			tabs.querySelector('.tabs-panel-active').classList.remove('tabs-panel-active');
			tabs.querySelector('.tabs-panel:nth-child(' + event.target.dataset.index + ')').classList.add('tabs-panel-active');
		}
	}
}

Tabs.prototype.setPosition = function (active, decoration) {
	const offsetLeft = active.offsetLeft;
	decoration.style.width = active.offsetWidth + 'px';
	decoration.style.left = offsetLeft + 'px';

	scrollToLeft(active.parentElement.parentElement, offsetLeft);
}

Tabs.prototype.onResize = function () {
	if (!this.items) {
		return
	}

	for (let i = 0; i < this.items.length; i++) {
		const active = this.items[i].querySelector('.toogle-tabs-active');
		const decoration = this.items[i].querySelector('.toogle-tabs-decoration');

		this.setPosition(active, decoration);
	}
}

const tabs = new Tabs(document.querySelectorAll('.tabs'));

//Request handler
function Request(forms, args) {
	if (forms.length === 0) {
		return
	}

	this.forms = forms;
	this.args = args;

	this.submit = this.submit.bind(this);
	this.load = this.load.bind(this);

	for (var i = 0; i < this.forms.length; i++) {
		this.forms[i].addEventListener(this.args.event, this.submit);
	}
}

Request.prototype.submit = function (event) {
	event.preventDefault();

	if (event.type === 'submit') {
		event.target.classList.add('form-loading');
		const path = window.location.pathname;

		if (path.includes('b2b')) {
			dataLayer.push({'event': 'SendForm_OfficeСleaning'})
		} else {
			dataLayer.push({'event': 'SendForm_HomeСleaning'})
		}
	}

	const request = new XMLHttpRequest();
	request.addEventListener('load', function (e) {
		this.load(e, event.target);
	}.bind(this));
	let base_url = window.location.origin
	request.open('POST', base_url + '/' + lang + '/wp-admin/admin-ajax.php', true);
	request.setRequestHeader('accept', 'application/json');

	const formData = event.type === 'submit' ? new FormData(event.target) : new FormData();
	formData.append('action', this.args.action(event.target));
	formData.append('skip', '1');

	if (this.args.formdata) {
		formData.append('data', this.args.formdata(event.target));
	}

	request.send(formData);

};

Request.prototype.load = function (event, target) {
	if (event.currentTarget.responseText) {
		this.args.callback(event.currentTarget, target);
	} else {
		this.args.done();
	}
};

//Page rating
function Rating(el) {
	if (el === null) {
		return
	}

	this.input = el;
	this.value = el.querySelector('.rating-value');

	this.onMousemove = this.onMousemove.bind(this);
	this.onMouseleave = this.onMouseleave.bind(this);
	this.onClick = this.onClick.bind(this);

	this.addEvents();
}

Rating.prototype.addEvents = function () {
	this.input.addEventListener('mousemove', this.onMousemove);
	this.input.addEventListener('mouseleave', this.onMouseleave);
	this.input.addEventListener('click', this.onClick);
}

Rating.prototype.onMousemove = function (event) {
	const rect = this.input.getBoundingClientRect();
	const value = Math.round(((event.pageX - rect.x) / rect.width) * 100 / 20) * 20;

	this.value.style.width = value + '%';
}

Rating.prototype.onMouseleave = function () {
	const rect = this.input.getBoundingClientRect();
	const value = Math.ceil(this.input.dataset.rating * 2) / 2;

	this.value.style.width = (((rect.width / 5) * value) / rect.width) * 100 + '%';
}

Rating.prototype.onClick = function (event) {
	const rect = this.input.getBoundingClientRect();
	const id = this.input.dataset.id;
	const rated = localStorage.getItem('rated');
	const value = Math.round(((event.pageX - rect.x) / rect.width) * 100 / 20);

	if (rated) {
		const items = JSON.parse(rated);

		if (items.indexOf(id) > -1) {
			return this.notify(i18n[lang].alreadyRated, false);
		}

		this.save(items, id, value);
	} else {
		this.save(new Array(), id, value);
	}

	this.notify(i18n[lang].rated, true);
}

Rating.prototype.save = function (rated, id, value) {
	const request = new XMLHttpRequest();
	request.open('POST', lang + '/wp-admin/admin-ajax.php', true);
	request.setRequestHeader('accept', 'application/json');

	const formData = new FormData();
	formData.append('id', id);
	formData.append('rating', value);
	formData.append('action', 'page_rating');
	request.send(formData)

	rated.push(id);
	localStorage.setItem('rated', JSON.stringify(rated));
}

Rating.prototype.notify = function (text, recount) {
	this.input.style.pointerEvents = 'none';

	const notify = document.createElement('div');
	notify.className = 'rating-notify';
	notify.textContent = text;
	this.input.parentElement.appendChild(notify);

	if (recount) {
		document.querySelector('.page-reviews-count').textContent = ++this.input.dataset.reviews;
	}
}

const rating = new Rating(document.querySelector('.page-rating-input'));

//Modal handler
function Modal(html) {
	this.modal = null;
	this.html = html;

	this.close = this.close.bind(this);

	this.create();
	this.addEvents();
	this.open();
}

Modal.prototype.create = function () {
	this.modal = document.createElement('div');
	this.modal.className = 'modal-overlay';
	this.modal.innerHTML = this.html;
}

Modal.prototype.addEvents = function () {
	this.modal.addEventListener('click', this.close);
}

Modal.prototype.open = function () {
	document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth) + 'px';
	document.body.style.overflow = 'hidden';
	document.body.appendChild(this.modal);
}

Modal.prototype.close = function (event) {
	if (event.target.classList.contains('close-modal')) {
		this.modal.addEventListener('animationend', function (event) {
			event.target.remove();
		});
		document.body.style.removeProperty('padding');
		document.body.style.removeProperty('overflow');
		this.modal.classList.add('modal-out');
	}
}

//Reviews vertical slider
function ReviewSlider(el) {
	if (el === null) {
		return
	}

	this.el = el;
	this.slider = null;
	this.slides = this.el.childNodes;

	this.onMove = this.onMove.bind(this);
	this.autoPlay = this.autoPlay.bind(this);

	this.init();
	this.observer();
}

ReviewSlider.prototype.init = function () {
	this.slider = new KeenSlider(this.el, {
		slidesPerView: 5,
		vertical: true,
		loop: true,
		controls: false,
		spacing: 5,
		duration: 1600,
		breakpoints: {
			'(max-width: 767px)': {
				slidesPerView: 3
			}
		},
		move: this.onMove
	});
}

ReviewSlider.prototype.onMove = function (slider) {
	const details = slider.details();

	for (let i = 0; i < this.slides.length; i++) {
		this.setPosition(this.slides[i], i, details);
	}
}

ReviewSlider.prototype.setPosition = function (item, index, details) {
	const scaleSize = 0.6;
	const position = details.positions[index];
	let y = details.widthOrHeight * position.distance;
	let scale = 1;
	let zIndex = 4;
	const maxYOffset = details.widthOrHeight - (details.widthOrHeight / details.slidesPerView);

	if (y <= 0) {
		y = 0;
		scale = 1 - (scaleSize - scaleSize * position.portion);
		zIndex = 2;
	} else if (y >= maxYOffset) {
		y = maxYOffset;
		scale = (scaleSize + (1 - scaleSize) * position.portion);
		zIndex = 2;
	}

	gsap.set(item, { y: y, scale: scale, zIndex: zIndex, opacity: position.portion });
}

ReviewSlider.prototype.autoPlay = function () {
	this.slider.next();
	setInterval(this.slider.next, 5000);
}

ReviewSlider.prototype.observer = function () {
	new ScrollMonitor(this.el, this.autoPlay);
}

const reviewSlider = new ReviewSlider(document.getElementById('reviews-slider'));

//Load modal content
new Request(document.querySelectorAll('.btn-modal'), {
	event: 'click',
	action: function (el) {
		return el.dataset.action;
	},
	callback: function (response) {
		new Modal(response.responseText);
	},
	done: function () {
		document.location.reload(true);
	}
});

//Load more posts
new Request(document.querySelectorAll('.btn-load-post'), {
	event: 'click',
	action: function (el) {
		return el.dataset.action;
	},
	formdata: function (el) {
		el.dataset.paged++;

		return JSON.stringify({
			category: el.dataset.category,
			paged: el.dataset.paged,
			blog: el.dataset.blog
		});
	},
	callback: function (response, target) {
		const div = document.createElement('div');
		div.className = 'loaded-post-list';
		div.innerHTML = response.responseText;

		target.parentElement.previousElementSibling.appendChild(div);

		locoScroll.update();

		if (target.dataset.paged == target.dataset.pages) {
			target.style.display = 'none';
		}
	},
	done: function () {
		document.location.reload(true);
	}
});

//Load more services
function ServicesLoader(el) {
	if (el === null) {
		return
	}

	this.el = el;
	this.wrap = document.querySelector('.loading-post-wrap');

	this.request = this.request.bind(this);
	this.load = this.load.bind(this);

	this.observer();
}

ServicesLoader.prototype.request = function () {
	this.el.style.display = 'none';
	this.el.dataset.paged++;

	const request = new XMLHttpRequest();
	request.open('POST', lang + '/wp-admin/admin-ajax.php', true);
	request.setRequestHeader('accept', 'application/json');

	const formData = new FormData();
	formData.append('paged', this.el.dataset.paged);
	formData.append('blog', this.el.dataset.blog);
	formData.append('action', 'page_services');
	request.addEventListener('load', this.load);
	request.send(formData);
}

ServicesLoader.prototype.load = function (event) {
	const div = document.createElement('div');
	div.className = 'loaded-post-list';
	div.innerHTML = event.target.responseText;
	this.wrap.appendChild(div);

	locoScroll.update();

	if (this.el.dataset.paged >= this.el.dataset.pages) {
		this.el.style.display = 'none';
	} else {
		this.el.style.display = 'block';
	}
}

ServicesLoader.prototype.observer = function () {
	new ScrollMonitor(this.el, this.request, true);
}

const servicesLoader = new ServicesLoader(document.querySelector('.spinner'));


//Load more b2b services
function b2bLoader(el) {
	if (el === null) {
		return
	}

	this.el = el;
	this.wrap = document.querySelector('.loading-services-b2b');

	this.request = this.request.bind(this);
	this.load = this.load.bind(this);

	this.observer();
}

b2bLoader.prototype.request = function () {
	this.el.style.display = 'none';
	this.el.dataset.paged++;



	const request = new XMLHttpRequest();
	request.open('POST', appVars.ajaxUrl, true);
	request.setRequestHeader('accept', 'application/json');

	const formData = new FormData();
	formData.append('paged', this.el.dataset.paged);
	formData.append('blog', this.el.dataset.blog);
	formData.append('action', 'page_b2b');
	request.addEventListener('load', this.load);
	console.log('Request triggered');
	request.send(formData);
}

b2bLoader.prototype.load = function (event) {
	const div = document.createElement('div');
	div.className = 'loaded-post-list';
	div.innerHTML = event.target.responseText;
	this.wrap.appendChild(div);

	locoScroll.update();

	if (this.el.dataset.paged >= this.el.dataset.pages) {
		this.el.style.display = 'none';
	} else {
		this.el.style.display = 'block';
	}
}

b2bLoader.prototype.observer = function () {
	new ScrollMonitor(this.el, this.request, true);
}

const b2bLoaderInstance = new b2bLoader(document.querySelector('.spinner-b2b'));

//Google place autocomplete
function GooglePlace(el) {
	if (el === null) {
		return
	}

	this.el = el;
	this.autocomplete = null;

	this.load = this.load.bind(this);
	this.init = this.init.bind(this);
	this.onChange = this.onChange.bind(this);

	this.load();
}

GooglePlace.prototype.init = function () {
	this.autocomplete = new google.maps.places.Autocomplete(this.el, {
		types: ['address'],
		componentRestrictions: { country: 'UA' }
	});

	this.autocomplete.addListener('place_changed', this.onChange);
}

GooglePlace.prototype.onChange = function () {
	const place = this.autocomplete.getPlace();
	this.el.value = place.name;
}

GooglePlace.prototype.load = function () {
	const PLACE_API_KEY = 'AIzaSyAd0XcUD2Fg7VbFEicTHGbvYZxb2x4_-nE';

	const script = document.createElement('script');
	script.addEventListener('load', this.init);
	script.src = 'https://maps.googleapis.com/maps/api/js?key=' + PLACE_API_KEY + '&libraries=places';
	script.async = true;

	document.body.appendChild(script);
}

const autocomplete = new GooglePlace(document.getElementById('calc-address'))

//Reviews form rating
function ReviewsRating(el) {
	if (el === null) {
		return
	}

	this.input = el.querySelector('.rating-wrap');
	this.value = el.querySelector('.rating-value');
	this.hidden = el.querySelector('.comment-rating-value');

	this.onMousemove = this.onMousemove.bind(this);
	this.onMouseleave = this.onMouseleave.bind(this);
	this.onClick = this.onClick.bind(this);

	this.addEvents();
}

ReviewsRating.prototype.addEvents = function () {
	this.input.addEventListener('mousemove', this.onMousemove);
	this.input.addEventListener('mouseleave', this.onMouseleave);
	this.input.addEventListener('click', this.onClick);
}

ReviewsRating.prototype.onMousemove = function (event) {
	const rect = this.input.getBoundingClientRect();
	const value = Math.round(((event.pageX - rect.x) / rect.width) * 100 / 20) * 20;

	this.value.style.width = value + '%';
}

ReviewsRating.prototype.onMouseleave = function () {
	const rect = this.input.getBoundingClientRect();
	const value = Math.ceil(this.input.dataset.rating * 2) / 2;

	this.value.style.width = (((rect.width / 5) * value) / rect.width) * 100 + '%';
}

ReviewsRating.prototype.onClick = function () {
	const rect = this.input.getBoundingClientRect();
	const value = Math.round(((event.pageX - rect.x) / rect.width) * 100 / 20);

	this.input.dataset.rating = value;
	this.hidden.value = value;
}

const reviewsRating = new ReviewsRating(document.querySelector('.comment-rating-input'));

//Reviews loader
function ReviewsLoader(el) {
	if (el === null) {
		return
	}

	this.el = el;
	this.pagination = document.querySelector('.pagination');

	this.onClick = this.onClick.bind(this);
	this.load = this.load.bind(this);

	this.addEvents();
}

ReviewsLoader.prototype.addEvents = function () {
	this.el.addEventListener('click', this.onClick);
}

ReviewsLoader.prototype.onClick = function () {
	this.el.disabled = true;

	const request = new XMLHttpRequest();
	request.open('GET', this.pagination.querySelector('.next').href, true);
	request.setRequestHeader('accept', 'application/json');
	request.addEventListener('load', this.load);
	request.send(null);
}

ReviewsLoader.prototype.load = function (event) {
	const response = document.createElement('div');
	response.innerHTML = event.target.responseText;
	const comments = response.querySelector('.comments');

	this.pagination.previousElementSibling.appendChild(comments);

	locoScroll.update();

	const nav = response.querySelector('.pagination');
	if (nav.querySelector('.next')) {
		this.pagination.innerHTML = nav.outerHTML;
	} else {
		this.el.parentElement.style.display = 'none';
	}

	this.el.disabled = false;
}

const reviewsLoader = new ReviewsLoader(document.querySelector('.btn-load-more'));

//One Time calculator form
new Request(document.querySelectorAll('.onetime-calc-form'), {
	event: 'submit',
	action: function (el) {
		console.log('action')
		$('.btn-order-loader').addClass('send');
		return el.dataset.action;
	},
	formdata: function (el) {
		return JSON.stringify({
			type: el.querySelector('.toogle-tabs-active').textContent,
			total: document.getElementById('sticky-price-count').textContent,
			city: el.querySelector('.dropdown-select-title').textContent
		});
	},
	callback: function (response, el) {
		console.log('callback')
		$('.btn-order-loader.send').addClass('success');
		setTimeout(() => {
			window.location.href = i18n[lang].redirect;
		}, 1000)
	}
});


//Smooth scroll to X position
function scrollToLeft(el, to) {
	const start = el.scrollLeft;
	const time = Date.now();

	const animateScroll = function () {
		const dx = Math.min(1, (Date.now() - time) / 400);
		const pos = start + (to - start) * (dx * dx);

		el.scrollTo(pos, 0);

		if (dx < 1) {
			window.requestAnimationFrame(animateScroll)
		}
	}
	window.requestAnimationFrame(animateScroll);
}

//404 cursor
function Cursor(el) {
	if (el === null) {
		return
	}

	this.el = el;
	this.section = document.getElementById('error-section');
	this.offset = 70;
	this.animation = null;

	this.onMouseenter = this.onMouseenter.bind(this);
	this.onMouseleave = this.onMouseleave.bind(this);
	this.onMousemove = this.onMousemove.bind(this);

	this.addEvents();
}

Cursor.prototype.addEvents = function () {
	this.section.addEventListener('mouseenter', this.onMouseenter);
	this.section.addEventListener('mouseleave', this.onMouseleave);
	this.section.addEventListener('mousemove', this.onMousemove);
}

Cursor.prototype.onMouseenter = function () {
	this.el.style.removeProperty('transition');
}

Cursor.prototype.onMouseleave = function () {
	this.animation.pause();

	this.el.style.removeProperty('left');
	this.el.style.removeProperty('top');
	this.el.style.transition = 'left .35s linear, top .35s linear';
}

Cursor.prototype.onMousemove = function (event) {
	this.animation && this.animation.kill();

	this.animation = gsap.to(this.el, {
		top: event.clientY - this.offset,
		left: event.clientX,
		duration: .2,
		ease: 'power4.out',
	});
}

const cursor = new Cursor(document.getElementById('error-cursor'));

//Button magnitaze
function Magnetize(el) {
	if (el === null) {
		return;
	}

	this.el = el;
	this.distance = 40;

	this.move = this.move.bind(this);

	this.addEvents();
}

Magnetize.prototype.addEvents = function () {
	window.addEventListener('mousemove', this.move);
}

Magnetize.prototype.calculateDistance = function (rect, mouseX, mouseY) {
	return Math.floor(Math.sqrt(Math.pow(mouseX - (rect.centerX), 2) + Math.pow(mouseY - (rect.centerY), 2)));
}

Magnetize.prototype.move = function (event) {
	const rect = this.el.getBoundingClientRect();
	rect.centerX = rect.x + (rect.width / 2);
	rect.centerY = rect.y + (rect.height / 2);

	const mouseX = event.pageX;
	const mouseY = event.pageY;
	const deltaX = Math.floor((rect.centerX - mouseX)) * -0.45;
	const deltaY = Math.floor((rect.centerY - mouseY)) * -0.45;
	const distance = this.calculateDistance(rect, mouseX, mouseY);

	if (distance < this.distance) {
		gsap.to(this.el, { duration: .4, x: deltaX, y: deltaY, ease: 'power2.out' });
	} else {
		gsap.to(this.el, { duration: .45, x: 0, y: 0 });
	}
}

const magnetize = new Magnetize(document.getElementById('magnetize'));

//Filled canvas
function FilledCanvas(container) {
	this.context = null;

	if (container === null) {
		return
	}

	this.container = container;
	this.canvas = container.querySelector('.filled-canvas');
	this.cursor = container.querySelector('.canvas-section-cursor');
	this.cursorOffset = 0;
	this.cursorXPos = 0;
	this.isMobile = window.isMobile;
	this.color = '#06beb9';
	this.counter = 0;
	this.multiplier = this.isMobile ? 9.44 : 18.88;
	this.rate = 1.9;
	this.size = this.rate * this.multiplier;
	this.threshold = this.isMobile ? 10 : 600; //600
	this.point = {
		current: {
			x: null,
			y: null
		},
		last: {
			x: null,
			y: null
		}
	};
	this.context = this.canvas.getContext('2d');

	this.onMouseEnter = this.onMouseEnter.bind(this);
	this.onMouseLeave = this.onMouseLeave.bind(this);
	this.onMouseDown = this.onMouseDown.bind(this);
	this.onMouseMove = this.onMouseMove.bind(this);
	this.onMouseUp = this.onMouseUp.bind(this);
	this.onResize = this.onResize.bind(this);

	this.addEvents();
	this.onResize();
}

FilledCanvas.prototype.addEvents = function () {
	this.container.addEventListener('mouseenter', this.onMouseEnter);
	this.container.addEventListener('mouseleave', this.onMouseLeave);
	this.container.addEventListener('mousedown', this.onMouseDown);
	this.container.addEventListener('mousemove', this.onMouseMove);
	this.container.addEventListener('mouseup', this.onMouseUp);
}


FilledCanvas.prototype.onMouseEnter = function (event) {
	const e = event.touches ? event.touches[0] : event;
	const pos = this.getCursorPosition(e);

	if (!this.isTransitioning) {
		gsap.to(this.cursor, {
			x: pos.x - this.cursorOffset,
			y: pos.y - this.canvas.height,
			duration: .15
		});
	}
}

FilledCanvas.prototype.onMouseLeave = function () {
	this.point.last = this.point.current = {
		x: null,
		y: null
	};

	gsap.to(this.cursor, {
		x: this.cursorXPos,
		y: 0,
		duration: .3,
		clearProps: 'transform'
	});
}

FilledCanvas.prototype.onMouseDown = function (event) {
	const e = event.touches ? event.touches[0] : event;

	if (this.point.current = this.point.last = this.getCursorPosition(e), !this.isTransitioning) {
		this.update(this.point.last.x, this.point.last.y);
	}
}

FilledCanvas.prototype.getCursorPosition = function (event) {
	const rect = event.target.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

FilledCanvas.prototype.onMouseMove = function (event) {
	const n = this.isMobile ? 10 : 30;
	const e = event.touches ? event.touches[0] : event;
	const pos = this.getCursorPosition(e);

	if (this.point.last.x || (this.point.last = { x: pos.x, y: pos.y }), this.point.current = { x: pos.x, y: pos.y }, !this.isTransitioning && null !== this.point.current.x) {
		for (var i = this.calculateAngleBetween(this.point.last, this.point.current), r = this.calculateDistanceBetween(this.point.last, this.point.current), o = 0; o < r; o += 10) {
			const x = this.point.last.x + Math.sin(i) * o;
			const y = this.point.last.y + Math.cos(i) * o;

			this.update(x, y);
		}

		this.counter += Math.round(r);
	}

	this.point.last = this.point.current;
	this.counter > this.size * this.threshold && this.complete();
}

FilledCanvas.prototype.onMouseUp = function () {
	if (this.isMobile) {
		this.point.current = {
			x: null,
			y: null
		};
		this.counter < this.size * this.threshold && this.complete();
	}
}

FilledCanvas.prototype.onResize = function () {
	if (!this.canvas) {
		return
	}

	const height = this.container.offsetHeight;
	const width = this.container.offsetWidth;

	this.canvas.style.height = height + 'px';
	this.canvas.style.width = width + 'px';
	this.canvas.height = height;
	this.canvas.width = width;
	this.size = this.rate * this.multiplier;

	const rect = this.cursor.getBoundingClientRect();
	this.cursorOffset = rect.width / 2;
	this.cursorXPos = rect.x - this.container.parentElement.offsetLeft + 15;

	this.clear();
}

FilledCanvas.prototype.calculateAngleBetween = function (t, e) {
	return Math.atan2(e.x - t.x, e.y - t.y);
}

FilledCanvas.prototype.calculateDistanceBetween = function (t, e) {
	return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}

FilledCanvas.prototype.update = function (x, y) {
	gsap.to(this.cursor, { x: x - this.cursorOffset, y: y - this.canvas.height, duration: .1 });

	this.context.fillStyle = this.color;
	this.context.beginPath();
	this.context.arc(x, y, this.size, 0, 2 * Math.PI);
	this.context.fill();
	this.context.closePath();
}

FilledCanvas.prototype.complete = function () {
	this.isTransitioning = true;
	this.destroy();

	const bg = document.createElement('div');
	bg.className = 'filled-background';
	this.container.appendChild(bg);

	this.onMouseLeave();

	const self = this;
	gsap.to(bg, {
		opacity: 1,
		duration: .3,
		onComplete: function () {
			self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
			self.canvas = self.context = null;
		}
	});
}

FilledCanvas.prototype.clear = function () {
	this.onMouseLeave();
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

FilledCanvas.prototype.destroy = function () {
	this.container.removeEventListener('mouseenter', this.onMouseEnter);
	this.container.removeEventListener('mouseleave', this.onMouseLeave);
	this.container.removeEventListener('mousedown', this.onMouseDown);
	this.container.removeEventListener('mousemove', this.onMouseMove);
	this.container.removeEventListener('mouseup', this.onMouseUp);
}

const filledCanvas = new FilledCanvas(document.getElementById('canvas-card'));

//On page resize
function onResize() {
	//Tabs
	tabs.onResize();

	//Filled Canvas
	filledCanvas.onResize();
}
window.addEventListener('resize', onResize, false);
















//One Time Calculator
let type = 'base'; //support base
const tab = document.querySelector('.onetime-cleaning-section .tabs');

if (tab) {
	tab.addEventListener('click', function (event) {
		if (event.target.classList.contains('toogle-tabs-item')) {
			type = event.target.dataset.type;

			[].forEach.call(counters, function (el) {
				const item = document.getElementById(el.dataset.id);

				if (item != null) {
					let counter = el.querySelector('.form-element-counter-text');

					if (counter) {
						item.querySelector('.receipt-count').textContent = counter.value;

						////
						let price = 0;
						if (Number(el.dataset[type])) {
							price = counter.value * el.dataset[type];
						} else {
							price = JSON.parse(el.dataset[type])[counter.value - 1];
						}

						if (counter.value == 0) {
							price = 0
						}
						item.querySelector('.receipt-price').textContent = price;
						////
					} else {
						item.querySelector('.receipt-price').textContent = el.dataset[type];
					}
				}
			});

			calculateTotal();
		}
	});
}

//Calculator counter
const counters = document.querySelectorAll('.onetime-calc-card .form-element-counter');

[].forEach.call(counters, function (item) {
	item.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-counter')) {
			const counter = this.querySelector('.form-element-counter-text');
			const value = Number(counter.value) + Number(event.target.dataset.count);

			if (value <= Number(counter.min)) {
				this.firstElementChild.disabled = true;
			} else {
				this.firstElementChild.disabled = false;
			}

			if (value >= Number(counter.max)) {
				this.lastElementChild.disabled = true;
			} else {
				this.lastElementChild.disabled = false;
			}

			counter.value = value;

			const item = document.getElementById(this.dataset.id);
			item.querySelector('.receipt-count').textContent = value;

			////
			let price = 0;
			if (Number(this.dataset[type])) {
				price = counter.value * this.dataset[type];
			} else {
				price = JSON.parse(this.dataset[type])[counter.value - 1];
			}

			if (counter.value == 0) {
				price = 0
			}
			item.querySelector('.receipt-price').textContent = price;
			////

			calculateTotal();
		}
	}, false);
});

//Calculator checkbox
const checkbox = document.querySelectorAll('input[type=checkbox]');

[].forEach.call(checkbox, function (item) {
	item.addEventListener('change', function (event) {
		if (this.checked === true) {
			const content = this.parentElement.lastElementChild;
			let count = null;

			if (content.classList.contains('onetime-services-additional')) {
				count = content.querySelector('input').value;
			}

			addReceipt(this.value, this.dataset[type], this.id, count, this.dataset.units);
		} else {
			removeReceipt(this.id);
		}
	}, false);
});

function addReceipt(text, value, id, number, units) {
	const div = document.createElement('div');
	div.className = 'receipt-text receipt-added';
	div.id = 'receipt-' + id;

	const title = document.createElement('span');
	title.textContent = text;

	const price = document.createElement('span');
	price.className = 'receipt-price';
	price.textContent = value;

	if (number) {
		const count = document.createElement('span');
		count.className = 'receipt-count';
		count.textContent = number;

		price.textContent = value * number;

		title.appendChild(count);
		title.appendChild(document.createTextNode(units));
	}

	div.appendChild(title);
	div.appendChild(price);

	document.querySelector('.receipt-text-list').appendChild(div);

	calculateTotal();
}

function removeReceipt(id) {
	const el = document.getElementById('receipt-' + id);

	setTimeout(function () {
		el.parentElement.removeChild(el);
		calculateTotal();
	}, 300);

	el.classList.add('receipt-removed');

	calculateTotal();
}

function calculateTotal() {
	const items = document.querySelectorAll('.receipt-price');
	let sum = 0;

	for (let i = 0; i < items.length; i++) {
		sum += Number(items[i].textContent);
	}

	document.getElementById('sticky-price-count').textContent = sum;

	setValue(sum);
}

//Reciept more
const recieptMore = document.querySelector('.receipt-show-more');
if (recieptMore) {
	recieptMore.addEventListener('click', function () {
		DOMAnimations.slideToggle(this.previousElementSibling);
	});
}

//Sticky total price
const stickyElm = document.querySelector('.sticky-calculator-price');

if (stickyElm) {
	const observer = new IntersectionObserver(
		([e]) => e.target.classList.toggle('is-sticky', e.intersectionRatio < 1),
		{ threshold: [1], rootMargin: '50px 0px -1px 0px' }
	);
	observer.observe(stickyElm);
}







var digits;
var odometr = document.getElementsByClassName('number-ticker');

var defaultDigitNode = document.createElement('div');
defaultDigitNode.className = 'number-ticker-digit';
defaultDigitNode.textContent = '0123456789';

/*
for (var i = 0; i < 10; i++) {
		defaultDigitNode.innerHTML += i + '<br>';
}
*/

function setValue(number) {
	var s = number.toString().split('').reverse().join('');
	var l = s.length;

	if (l > digits.length) {
		generateDigits(l - digits.length);
	}

	for (var i = 0; i < digits.length; i++) {
		setDigit(i, s[i] || 0);
	}
}
function setDigit(digitIndex, number) {
	//digits[digitIndex].style.marginTop = '-' + number + 'em';
	//digits[digitIndex].style.top = '-' + number * 100 + '%';
	digits[digitIndex].style.transform = 'translate(0, ' + -number * 100 + '%)';
}

function generateDigits(amount) {
	for (var i = 0; i < amount; i++) {
		var d = defaultDigitNode.cloneNode(true);
		counter.appendChild(d);
		digits.unshift(d);
	}
}

[].forEach.call(odometr, function (counter) {
	//var currentValue = parseInt(counter.getAttribute('data-value')) || 0;

	//var currentValue = counter.dataset.value;
	//var digits = [];
	//generateDigits(currentValue.toString().length);
	//setValue(currentValue);

	digits = [].slice.call(counter.children, 0).reverse(); //Array.from(counter.children).reverse();


	/*
			function setValue(number) {
					var s = number.toString().split('').reverse().join('');
					var l = s.length;

					if (l > digits.length) {
							generateDigits(l - digits.length);
					}

					for (var i = 0; i < digits.length; i++) {
							setDigit(i, s[i] || 0);
					}
			}

			function setDigit(digitIndex, number) {
					//digits[digitIndex].style.marginTop = '-' + number + 'em';
					digits[digitIndex].style.top = '-' + number * 100 + '%';
			}

			function generateDigits(amount) {
					for (var i = 0; i < amount; i++) {
							var d = defaultDigitNode.cloneNode(true);
							counter.appendChild(d);
							digits.unshift(d);
					}
			}
	*/
});
















//Workers hover
const workersWrap = document.querySelector('.workers-list');

if (workersWrap) {
	workersWrap.addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-add')) {
			event.target.parentElement.classList.toggle('workers-card-active');
		}
	});
}




//Partners logo slider
function LogoSlider(el) {
	if (el === null) {
		return
	}

	const logoSlider = new KeenSlider(el, {
		slidesPerView: 6,
		loop: true,
		spacing: 15,
		dots: document.getElementById('logo-slider-dots'),
		onClick: function (event) {
			if (event.target.hasAttribute('data-id')) {
				logoSlider.moveToSlideRelative(event.target.dataset.id);
			}
		},
		created: function (instance) {
			if (this.dots !== null) {
				this.dots.addEventListener('click', this.onClick.bind(this));
			}
		},
		slideChanged: function (instance) {
			if (instance.details().relativeSlide % 2 === 0) {
				this.dots.querySelector('.dot-active').classList.remove('dot-active');
				this.dots.querySelectorAll('.dot')[instance.details().relativeSlide / 2].classList.add('dot-active');
			}
		},
		breakpoints: {
			'(max-width: 991px)': {
				slidesPerView: 4
			},
			'(max-width: 767px)': {
				slidesPerView: 2
			}
		}
	});
}

LogoSlider(document.getElementById('logo-slider'));




//Slider dots
function updateSliderDots(dots, next) {
	[].forEach.call(dots.children, function (dot, index) {
		index === next ? dot.classList.add('dot-active') : dot.classList.remove('dot-active');
	});
}

function clickSliderDots(dots, instance) {
	dots.addEventListener('click', function (event) {
		if (event.target.classList.contains('dot')) {
			instance.moveToSlide(event.target.dataset.id);
		}
	});
}




//Mention slider
const progress = document.querySelector('.mention-progress');

if (progress) {
	const mentionPhotoSlider = new KeenSlider('#mention-photo-slider', {
		vertical: true,
		slidesPerView: 3,
		loop: true,
		centered: true,
		controls: false,
		dots: document.getElementById('mention-photo-slider'),
		breakpoints: {
			'(max-width: 991px)': {
				vertical: false,
				slidesPerView: 7,
				centered: true,
			}
		},
		slideChanged: function (instance) {
			updateSliderDots(this.dots, instance.details().relativeSlide);
		},
	});

	let NAV = null;

	const mentionSlider = new KeenSlider('#mention-slider', {
		slidesPerView: 1,
		loop: true,
		controls: false,
		dots: document.getElementById('mention-slider-dots'),
		nav: document.getElementById('mention-nav'),
		created: function (instance) {
			this.nav.addEventListener('click', function (event) {
				if (event.target.classList.contains('btn-nav')) {
					const progress = document.querySelector('.mention-progress');

					if (parseInt(window.getComputedStyle(progress).getPropertyValue('stroke-dashoffset')) > 406) {
						return;
					}


					NAV = event.target.dataset.nav;


					progress.dispatchEvent(new CustomEvent('animationend', { animationName: 'StrokeReduceTo' }));
				}
			});
		},
		slideChanged: function (instance) {
			updateSliderDots(this.dots, instance.details().relativeSlide);
		}
	});

	function onAnimationend(event) {
		event.target.style.strokeDashoffset = window.getComputedStyle(event.target).getPropertyValue('stroke-dashoffset');
		const wraper = progress.parentElement;

		wraper.classList.add('mention-progress-hide');

		if (event.animationName == 'StrokeReduceTo') {


			if (NAV === null) {
				mentionSlider.next();
				mentionPhotoSlider.next();
			} else {
				mentionSlider[NAV]();
				mentionPhotoSlider[NAV]();
				NAV = null;
			}


			wraper.classList.remove('mention-progress-active', 'mention-progress-hide');

			setTimeout(function () {
				wraper.classList.add('mention-progress-active');
			}, 600);
		}
	}
	progress.addEventListener('animationend', onAnimationend);
}








//Features card spoiler
const featuresBtn = document.querySelectorAll('.features-btn');

if (featuresBtn.length > 0) {
	featuresBtn.forEach(function (el) {
		el.addEventListener('click', function () {
			const el = event.target.previousElementSibling;

			if (!el.style.height) {
				this.classList.toggle('features-active');
				DOMAnimations.slideToggle(el);
			}
		});
	});
}




/*
//Auto module
const module = document.getElementById('modal-auto');

if (module) {
	module.addEventListener('click', function(event){
		if (event.target.classList.contains('modal-wrap') || event.target.classList.contains('btn-close')) {
			module.classList.add('modal-out');

			setTimeout(function(){
				document.body.removeChild(module);
			}, 400);
		}
	}, false);

	setTimeout(function(){
		module.style.display = 'block';
	}, 6e4);
}
*/


//Workers slider
function WorkerSlider(el) {
	if (el === null) {
		return
	}

	if (window.innerWidth > 767) {
		return
	}

	const workerSlider = new KeenSlider(el, {
		slidesPerView: 1,
		loop: true,
		spacing: 10,
		slides: '.workers-column',
		dots: document.getElementById('worker-slider-dots'),
		onClick: function (event) {
			if (event.target.hasAttribute('data-id')) {
				workerSlider.moveToSlideRelative(event.target.dataset.id);
			}
		},
		created: function (instance) {
			if (this.dots !== null) {
				this.dots.addEventListener('click', this.onClick.bind(this));
			}
		},
		slideChanged: function (instance) {
			this.dots.querySelector('.dot-active').classList.remove('dot-active');
			this.dots.querySelectorAll('.dot')[instance.details().relativeSlide].classList.add('dot-active');
		}
	});
}

WorkerSlider(document.getElementById('worker-slider'));

//Order button
function Order(el) {
	if (el === null) {
		return;
	}

	this.el = el;
	this.textWrap = el.querySelector('.btn-order-text-wrap');
	this.text = el.querySelector('.btn-order-text');
	this.background = el.querySelector('.btn-order-background');
	this.distance = 150;

	this.move = this.move.bind(this);
	this.infinityRotate = this.infinityRotate.bind(this);
	this.onEnter = this.onEnter.bind(this);
	this.onLeave = this.onLeave.bind(this);

	this.addEvents();
	this.enterAnimation();
}

Order.prototype.enterAnimation = function () {
	gsap.to(this.el, { duration: .5, scale: 1, delay: 1.3, onComplete: this.infinityRotate });
}

Order.prototype.infinityRotate = function () {
	gsap.to(this.text, { rotation: 360, repeat: -1, ease: 'none', duration: 40 });
}

Order.prototype.addEvents = function () {
	window.addEventListener('mousemove', this.move);
	this.el.addEventListener('mouseenter', this.onEnter);
	this.el.addEventListener('mouseleave', this.onLeave);
}

Order.prototype.calculateDistance = function (rect, mouseX, mouseY) {
	return Math.floor(Math.sqrt(Math.pow(mouseX - (rect.centerX), 2) + Math.pow(mouseY - (rect.centerY), 2)));
}

Order.prototype.onEnter = function () {
	gsap.to(this.background, { duration: .4, scale: 1 });
}

Order.prototype.onLeave = function () {
	gsap.to(this.background, { duration: .4, scale: .77 });
}

Order.prototype.move = function (event) {
	const rect = this.el.getBoundingClientRect();
	rect.centerX = rect.x + (rect.width / 2);
	rect.centerY = rect.y + (rect.height / 2) + window.scrollY;

	const mouseX = event.pageX;
	const mouseY = event.pageY;
	const deltaX = Math.floor((rect.centerX - mouseX)) * -0.45;
	const deltaY = Math.floor((rect.centerY - mouseY)) * -0.45;
	const distance = this.calculateDistance(rect, mouseX, mouseY);

	if (window.innerWidth > 767) {
		if (distance < this.distance) {
			gsap.to(this.el, { duration: .4, x: deltaX, y: deltaY, ease: 'power2.out' });
			gsap.to(this.textWrap, { duration: .4, x: deltaX / 2, y: deltaY / 2, ease: 'power2.out' });
		} else {
			gsap.to(this.el, { duration: .45, x: 0, y: 0 });
			gsap.to(this.textWrap, { duration: .45, x: 0, y: 0 });
		}
	}
}

const order = new Order(document.getElementById('btn-order'));

//Works tooltip
function Tooltip(items) {
	if (items.length === 0) {
		return
	}

	this.items = items;
	this.mobile = 'ontouchstart' in window;

	this.onEnter = this.onEnter.bind(this);
	this.onLeave = this.onLeave.bind(this);
	this.onClick = this.onClick.bind(this);

	this.addEvents();
}

Tooltip.prototype.addEvents = function (event) {
	for (let i = 0; i < this.items.length; i++) {
		if (!this.mobile) {
			this.items[i].addEventListener('mouseenter', this.onEnter);
		}

		this.items[i].addEventListener('mouseleave', this.onLeave);
		this.items[i].addEventListener('click', this.onClick);
	}
}

Tooltip.prototype.onEnter = function (event) {
	this.open(event.target);
}

Tooltip.prototype.onLeave = function (event) {
	this.close(event.target);
}

Tooltip.prototype.onClick = function (event) {
	if (event.target.classList.contains('works-tooltip-active')) {
		this.close(event.target);
	} else {
		this.open(event.target);
	}
}

Tooltip.prototype.open = function (el) {
	el.classList.remove('works-tooltip-left', 'works-tooltip-right');

	if (el.offsetLeft < 90) {
		el.classList.add('works-tooltip-left');
	}

	if (el.parentElement.offsetWidth - el.offsetLeft - 90 < 0) {
		el.classList.add('works-tooltip-right');
	}

	el.classList.add('works-tooltip-active');
}

Tooltip.prototype.close = function (el) {
	el.classList.remove('works-tooltip-active');
}

const tooltip = new Tooltip(document.querySelectorAll('.works-tooltip'));

//Scroll header
function StickyHeader(el) {
	if (el === null) {
		return
	}

	this.el = el;

	this.animate = this.animate.bind(this);
}

StickyHeader.prototype.animate = function (obj) {
	// if (obj.scroll.y > 200) {
	// 	this.el.classList.add('fixed-header');
	// } else {
	// 	this.el.classList.remove('fixed-header');
	// }
	//
	// if (obj.scroll.y < 500) {
	// 	this.el.classList.remove('scroll-top', 'scroll-bottom');
	// } else {
	// 	if (obj.direction === 'up') {
	// 		this.el.classList.add('scroll-top');
	// 		this.el.classList.remove('scroll-bottom');
	// 	} else {
	// 		this.el.classList.remove('scroll-top');
	// 		this.el.classList.add('scroll-bottom');
	// 		document.querySelector('.location-switcher').classList.remove('location-open')
	// 	}
	// }
}

const stickyHeader = new StickyHeader(document.getElementById('header'));


//Background animation
const settings = {
	elements: '.service-price-section, .faq-section, .slider-logo-section, .depends-section, .trust-section, .article-comments-section, .price-content-section, .services-content-section, .page-template-office .additional-services-section, .service-reviews-business, .service-time, .page-template-office .similar-article-section',
	'wp-block-service-price service-price-section': {
		enter: '#f3f6fb',
		exit: '#fff',
		oneway: true
	},
	'wp-block-faq-questions faq-section': {
		enter: '#f3f6fb',
		exit: '#f3f6fb',
		oneway: false
	},
	'wp-block-home-depends depends-section': {
		enter: '#f3f6fb',
		exit: '#fff',
		oneway: true
	},
	'wp-block-home-trust trust-section': {
		enter: '#fff',
		exit: '#f3f6fb',
		oneway: true
	},
	'article-comments-section': {
		enter: '#f3f6fb',
		exit: '#fff',
		oneway: true
	},
	'wp-block-price-content price-content-section': {
		enter: '#fff',
		exit: '#f3f6fb',
		oneway: false
	},
	'wp-block-service-content services-content-section': {
		enter: '#fff',
		exit: '#f3f6fb',
		oneway: false
	},
	'wp-block-service-additional-office additional-services-section': {
		enter: '#f3f6fb',
		exit: '#fff',
		oneway: true
	},
	'wp-block-service-service-reviews-business service-reviews-business': {
		enter: '#fff',
		exit: '#f3f6fb',
		oneway: true
	},
	'wp-block-service-service-time service-time': {
		enter: '#f3f6fb',
		exit: '#fff',
		oneway: true
	},
	'wp-block-office-similar similar-article-section': {
		enter: '#f3f6fb',
		exit: '#f3f6fb',
		oneway: false
	},
}

const elems = document.querySelectorAll(settings.elements);

elems.forEach(function (el) {
	el.dataset.scroll = true;
	el.dataset.scrollRepeat = true;
	el.dataset.scrollCall = 'background';
	el.dataset.scrollOffset = '50%,50%';
	el.dataset.enter = settings[el.classList].enter;
	el.dataset.exit = settings[el.classList].exit;
	el.dataset.oneway = settings[el.classList].oneway;
});


//Custom scroll
const locoScroll = new LocomotiveScroll({
	el: document.getElementById('app'),
	smooth: true,
	getDirection: true
});

locoScroll.on('scroll', function (obj) {
	//Sticky header
	stickyHeader.animate(obj);
});

//Change page background on scroll
locoScroll.on('call', function (value, way, obj) {
	if (way === 'exit' && obj.el.dataset.oneway === 'true' && locoScroll.scroll.instance.direction === 'down') {
		return
	}

	gsap.to(document.body, { backgroundColor: obj.el.dataset[way] })
});




//Inverts order buttons background
const inverts = document.querySelectorAll('.scroll-counter-section, .canvas-section, .info-section, .trust-section, .footer');

const observer = new IntersectionObserver(function (entries) {
	entries.forEach(function (entry) {
		document.getElementById('btn-order').classList.toggle('btn-order-invert', entry.isIntersecting);
	});
}, { threshold: [0, 1], rootMargin: '-90% 0px 0px 0px' });

for (let i = 0; i < inverts.length; i++) {
	observer.observe(inverts[i]);
}



//Counter section
function counterSection(section) {

	if (section === null) {
		return
	}

	let idx = 0;
	let reviews = [];
	let odometer = null;

	const scrollMonitor = new ScrollMonitor(section, function () {
		onStart();
	});

	function onStart() {
		odometer = new Odometer({
			el: document.getElementById('scroll-counter'),
			value: '1234',
			format: '( ddd)'
		});
		odometer.update(odometer.el.dataset.counter);

		reviews = JSON.parse(section.dataset.reviews);

		gsap.to('.counter-review', {
			repeat: -1,
			yoyo: true,
			x: 10,
			ease: 'none',
			duration: 1.5
		});

		reviewAnimation();
	}

	function reviewAnimation() {
		setInterval(function () {
			odometer.update(++odometer.el.dataset.counter);

			if (idx >= reviews.length) {
				idx = 0;
			}

			document.querySelector('.scroll-counter-section').classList.toggle('left-counter-review');
			document.querySelector('.counter-review-text').textContent = reviews[idx].text;
			document.querySelector('.counter-review-author').textContent = reviews[idx].author;

			idx++;

			gsap.timeline()
				.to('.counter-review-wrap', {
					scale: 1,
					opacity: 1,
					duration: 1,
					delay: .5
				})
				.fromTo('.counter-review-wrap', {
					y: 0
				}, {
					y: -window.innerHeight / 2,
					duration: 5
				}, 0)
				.to('.counter-review-wrap', {
					scale: .8,
					opacity: 0,
					duration: 1
				}, '-=1')

			gsap.timeline()
				.to('.review-stars', {
					scale: 1,
					opacity: 1,
					duration: 1
				})
				.fromTo('.review-stars', {
					y: 0
				}, {
					y: -window.innerHeight / 2,
					duration: 4
				}, 0)
				.to('.review-stars', {
					scale: .8,
					opacity: 0,
					duration: 1
				}, '-=1')

		}, 5000);
	}

}

counterSection(document.querySelector('.scroll-counter-section'));




//CALCULATE FUNCTION
function pluralize(key, count, string, zero) {
	if (count === 0 && !zero) {
		return ''
	}

	switch (count) {
		case 1:
			return string.replace('{num}', count).replace('{text}', i18n[lang][key][0])
		case 2: case 3: case 4:
			return string.replace('{num}', count).replace('{text}', i18n[lang][key][1])
		default:
			return string.replace('{num}', count).replace('{text}', i18n[lang][key][2])
	}
}

function convertTime(num) {
	const hours = Math.floor(num / 60);
	const minutes = num % 60;

	return pluralize('hours', hours, '{num} {text}') + ' ' + pluralize('minutes', minutes, '{num} {text}');
}

function calc() {
	document.querySelectorAll('.price-calculator-column').forEach(function (el) {
		const data = JSON.parse(document.querySelector('.price-calculator-header .toogle-tabs-active').dataset[el.dataset.calculator]);
		const type = el.querySelector('.toogle-tabs-active').dataset.type;

		new Odometer({
			el: el.querySelector('.month-result-price-number'),
			value: el.querySelector('.month-result-price-number').textContent,
			format: '',
			theme: 'minimal'
		})
			.update(data[type].price);

		el.querySelector('.month-result-time-number').textContent = convertTime(data[type].time);
	});
}

const section = document.querySelector('.pricing-section');

if (section) {
	section.addEventListener('click', function (e) {
		if (e.target.classList.contains('toogle-tabs-item')) {
			calc();
		}
	});
}


//Order form
function orderForm(response) {
	const modal = new Modal(response.responseText);
	new Dropdown(modal.modal.querySelectorAll('.select-input'));
	new Mask(modal.modal.querySelectorAll('.tel-mask-input'));

	new Request(modal.modal.querySelectorAll('form'), {
		event: 'submit',
		action: function (el) {
			$('.btn-order-loader').addClass('send');
			return el.dataset.action;
		},
		formdata: function (el) {
			return JSON.stringify({
				city: el.querySelector('.dropdown-select-title').textContent
			});
		},
		callback: function (response, el) {
			$('.btn-order-loader.send').addClass('success');
			setTimeout(() => {
				window.location.href = i18n[lang].redirect;
			}, 1000)
		},
		done: function () {
			document.location.reload(true);
		}
	});
}

//Order modal
new Request(document.querySelectorAll('.btn-order'), {
	event: 'click',
	action: function (el) {
		return el.dataset.action;
	},
	callback: function (response) {
		orderForm(response);
	},
	done: function () {
		document.location.reload(true);
	}
});

//Auto modal
function autoModal() {
	const request = new XMLHttpRequest();
	request.addEventListener('load', function (event) {
		orderForm(event.currentTarget);
	});

	request.open('POST', lang + '/wp-admin/admin-ajax.php', true);
	request.setRequestHeader('accept', 'application/json');

	const formData = new FormData();
	formData.append('action', 'modal_auto');

	request.send(formData);
}
setTimeout(autoModal, 60000);


//Location switcher
let location_switcher = document.getElementById('location-switcher');
if( location_switcher ){
	location_switcher.addEventListener('click', function () {
		document.querySelector('.location-switcher').classList.toggle('location-open');
	});
}

//Month calculator
function calculator() {

	function calc() {
		const el = document.querySelector('.month-calculator-card');

		const type = el.querySelector('.toogle-tabs-active').dataset.type;
		const data = JSON.parse(document.querySelector('.month-calculator-header .toogle-tabs-active').dataset[type]);

		const base = el.querySelector('.month-counter-base');
		const support = el.querySelector('.month-counter-support');

		new Odometer({
			el: el.querySelector('.month-result-price-number'),
			value: el.querySelector('.month-result-price-number').textContent,
			format: '',
			theme: 'minimal'
		})
			.update(
				data.base * base.dataset.counter + data.support * support.dataset.counter
			);

		el.querySelector('.month-result-price-number').dataset.total = data.base * base.dataset.counter + data.support * support.dataset.counter;

		el.querySelector('.month-result-time').textContent = (pluralize('baseCleaning', +base.dataset.counter, '{num} {text}', true) + ' + ' + pluralize('supportCleaning', +support.dataset.counter, '{num} {text}', true));
	}

	const section = document.querySelector('.month-calculator-section');

	if (section) {
		section.addEventListener('click', function (e) {
			if (e.target.classList.contains('toogle-tabs-item')) {
				calc();
				fillHiddenInputs();
			}

			if (e.target.classList.contains('btn-counter')) {
				const counter = e.target.parentElement.querySelector('.form-element-counter-text');
				const value = counter.dataset.counter = Number(counter.dataset.counter) + Number(e.target.dataset.count);

				let min = 0;
				document.querySelectorAll('.month-counter-base, .month-counter-support').forEach(function (el) {
					min += Number(el.dataset.counter);
				});

				document.querySelectorAll('.month-counter-base, .month-counter-support').forEach(function (el) {
					el.parentElement.firstElementChild.disabled = min <= 2 || el.dataset.counter == 0;
				});

				counter.textContent = pluralize(counter.dataset.type + 'Cleaning', value, '{num} {text}', true);

				calc();
			}
		});
	}



}
calculator();

//Month calculator
new Request(document.querySelectorAll('.month-calc-form'), {
	event: 'submit',
	action: function (el) {
		$('.btn-order-loader').addClass('send');
		return el.dataset.action;
	},
	formdata: function (form) {
		const el = document.querySelector('.month-calculator-section');
		const price = el.querySelector('.month-result-price-number');

		return JSON.stringify({
			rooms: el.querySelector('.month-calculator-header .toogle-tabs-active').textContent,
			type: el.querySelector('.month-calculator-column .toogle-tabs-active').textContent,
			services: el.querySelector('.month-result-time').textContent,
			total: price.dataset.total ? price.dataset.total : price.textContent
		});
	},
	callback: function (response, el) {
		$('.btn-order-loader.send').addClass('success');
		setTimeout(() => {
			window.location.href = i18n[lang].redirect;
		}, 1000);
	}
});



//Split lines
function splitTitle() {
	const items = document.querySelectorAll('.splitted');

	if (items.length > 0) {
		if (window.innerWidth > 991) {
			items.forEach(function (item) {
				item.innerHTML = '<span class="splitted-line-wrap"><span class="splitted-line">' + item.innerHTML.split('<br>').join('</span></span><span class="splitted-line-wrap"><span class="splitted-line">') + '</span></span>';
			});
		} else {
			items.forEach(function (item) {
				item.innerHTML = '<span>' + item.textContent.split(' ').join('</span> <span>') + '</span>';

				Array.from(item.children).forEach(function (el) {
					if (el.offsetLeft + el.offsetWidth > item.offsetWidth) {
						el.insertAdjacentHTML('beforebegin', '<br>');
					}
				});

				item.innerHTML = '<span class="splitted-line-wrap"><span class="splitted-line">' + item.innerHTML.split('<br>').join('</span></span><span class="splitted-line-wrap"><span class="splitted-line">') + '</span></span>';
			});
		}
	}
}

//Preloader
document.addEventListener("DOMContentLoaded", function(event) {

	//Update scroll
	locoScroll.update();

	//Split title by line
	splitTitle();

	const timeout = 2000;// - (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart);

	setTimeout(function () {
		gsap.timeline({
			onComplete: function () {
				document.body.classList.add('preloader-done');

				new ScrollMonitor(document.querySelectorAll('.need-to-print'), function (el) {
					el.classList.add('printed');
				});
			}
		})
			.to('.preloader-content svg', {
				opacity: 0,
				duration: .8,
				ease: 'power4.out'
			})
			.to('.preloader-logo-wrap', {
				width: 0,
				height: 0,
				duration: 1,
				ease: 'power4.out'
			}, 0)
			.to('.preloader', {
				opacity: 0,
				duration: .8,
				ease: 'power4.out'
			}, '-=.4');
	}, timeout);

});


/*const forms = document.querySelectorAll('form');
forms.forEach(el => {
	let formName = el.className;
	let btn = el.querySelector('button[type="submit"]');
	el.addEventListener('click', function(e) {
		e.preventDefault();
		SendForm(formName);
		console.log(btn);
	})
})*/




/*! jQuery v3.6.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector | (c) OpenJS Foundation and other contributors | jquery.org/license */
!function (e, t) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) { if (!e.document) throw new Error("jQuery requires a window with a document"); return t(e) } : t(e) }("undefined" != typeof window ? window : this, function (g, e) { "use strict"; var t = [], r = Object.getPrototypeOf, s = t.slice, v = t.flat ? function (e) { return t.flat.call(e) } : function (e) { return t.concat.apply([], e) }, u = t.push, i = t.indexOf, n = {}, o = n.toString, y = n.hasOwnProperty, a = y.toString, l = a.call(Object), m = {}, b = function (e) { return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item }, x = function (e) { return null != e && e === e.window }, w = g.document, c = { type: !0, src: !0, nonce: !0, noModule: !0 }; function C(e, t, n) { var r, i, o = (n = n || w).createElement("script"); if (o.text = e, t) for (r in c) (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i); n.head.appendChild(o).parentNode.removeChild(o) } function T(e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e } var f = "3.6.0 -ajax,-ajax/jsonp,-ajax/load,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-deprecated/ajax-event-alias,-effects,-effects/Tween,-effects/animatedSelector", E = function (e, t) { return new E.fn.init(e, t) }; function d(e) { var t = !!e && "length" in e && e.length, n = T(e); return !b(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e) } E.fn = E.prototype = { jquery: f, constructor: E, length: 0, toArray: function () { return s.call(this) }, get: function (e) { return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e] }, pushStack: function (e) { var t = E.merge(this.constructor(), e); return t.prevObject = this, t }, each: function (e) { return E.each(this, e) }, map: function (n) { return this.pushStack(E.map(this, function (e, t) { return n.call(e, t, e) })) }, slice: function () { return this.pushStack(s.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, even: function () { return this.pushStack(E.grep(this, function (e, t) { return (t + 1) % 2 })) }, odd: function () { return this.pushStack(E.grep(this, function (e, t) { return t % 2 })) }, eq: function (e) { var t = this.length, n = +e + (e < 0 ? t : 0); return this.pushStack(0 <= n && n < t ? [this[n]] : []) }, end: function () { return this.prevObject || this.constructor() }, push: u, sort: t.sort, splice: t.splice }, E.extend = E.fn.extend = function () { var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1; for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || b(a) || (a = {}), s === u && (a = this, s--); s < u; s++)if (null != (e = arguments[s])) for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (E.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || E.isPlainObject(n) ? n : {}, i = !1, a[t] = E.extend(l, o, r)) : void 0 !== r && (a[t] = r)); return a }, E.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) { throw new Error(e) }, noop: function () { }, isPlainObject: function (e) { var t, n; return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = y.call(t, "constructor") && t.constructor) && a.call(n) === l) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, globalEval: function (e, t, n) { C(e, { nonce: t && t.nonce }, n) }, each: function (e, t) { var n, r = 0; if (d(e)) { for (n = e.length; r < n; r++)if (!1 === t.call(e[r], r, e[r])) break } else for (r in e) if (!1 === t.call(e[r], r, e[r])) break; return e }, makeArray: function (e, t) { var n = t || []; return null != e && (d(Object(e)) ? E.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n }, inArray: function (e, t, n) { return null == t ? -1 : i.call(t, e, n) }, merge: function (e, t) { for (var n = +t.length, r = 0, i = e.length; r < n; r++)e[i++] = t[r]; return e.length = i, e }, grep: function (e, t, n) { for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)!t(e[i], i) !== a && r.push(e[i]); return r }, map: function (e, t, n) { var r, i, o = 0, a = []; if (d(e)) for (r = e.length; o < r; o++)null != (i = t(e[o], o, n)) && a.push(i); else for (o in e) null != (i = t(e[o], o, n)) && a.push(i); return v(a) }, guid: 1, support: m }), "function" == typeof Symbol && (E.fn[Symbol.iterator] = t[Symbol.iterator]), E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) { n["[object " + t + "]"] = t.toLowerCase() }); var p = function (n) { var e, p, x, o, i, h, f, g, w, u, l, C, T, a, E, v, s, c, y, A = "sizzle" + 1 * new Date, d = n.document, N = 0, r = 0, m = ue(), b = ue(), S = ue(), k = ue(), D = function (e, t) { return e === t && (l = !0), 0 }, L = {}.hasOwnProperty, t = [], j = t.pop, q = t.push, O = t.push, P = t.slice, H = function (e, t) { for (var n = 0, r = e.length; n < r; n++)if (e[n] === t) return n; return -1 }, I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", R = "[\\x20\\t\\r\\n\\f]", B = "(?:\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", M = "\\[" + R + "*(" + B + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + B + "))|)" + R + "*\\]", W = ":(" + B + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)", F = new RegExp(R + "+", "g"), $ = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"), z = new RegExp("^" + R + "*," + R + "*"), _ = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"), U = new RegExp(R + "|>"), V = new RegExp(W), X = new RegExp("^" + B + "$"), Q = { ID: new RegExp("^#(" + B + ")"), CLASS: new RegExp("^\\.(" + B + ")"), TAG: new RegExp("^(" + B + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"), bool: new RegExp("^(?:" + I + ")$", "i"), needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i") }, Y = /HTML$/i, G = /^(?:input|select|textarea|button)$/i, K = /^h\d$/i, J = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])", "g"), ne = function (e, t) { var n = "0x" + e.slice(1) - 65536; return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)) }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function (e, t) { return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e }, oe = function () { C() }, ae = xe(function (e) { return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase() }, { dir: "parentNode", next: "legend" }); try { O.apply(t = P.call(d.childNodes), d.childNodes), t[d.childNodes.length].nodeType } catch (e) { O = { apply: t.length ? function (e, t) { q.apply(e, P.call(t)) } : function (e, t) { var n = e.length, r = 0; while (e[n++] = t[r++]); e.length = n - 1 } } } function se(t, e, n, r) { var i, o, a, s, u, l, c, f = e && e.ownerDocument, d = e ? e.nodeType : 9; if (n = n || [], "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d) return n; if (!r && (C(e), e = e || T, E)) { if (11 !== d && (u = Z.exec(t))) if (i = u[1]) { if (9 === d) { if (!(a = e.getElementById(i))) return n; if (a.id === i) return n.push(a), n } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n } else { if (u[2]) return O.apply(n, e.getElementsByTagName(t)), n; if ((i = u[3]) && p.getElementsByClassName && e.getElementsByClassName) return O.apply(n, e.getElementsByClassName(i)), n } if (p.qsa && !k[t + " "] && (!v || !v.test(t)) && (1 !== d || "object" !== e.nodeName.toLowerCase())) { if (c = t, f = e, 1 === d && (U.test(t) || _.test(t))) { (f = ee.test(t) && ye(e.parentNode) || e) === e && p.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = A)), o = (l = h(t)).length; while (o--) l[o] = (s ? "#" + s : ":scope") + " " + be(l[o]); c = l.join(",") } try { return O.apply(n, f.querySelectorAll(c)), n } catch (e) { k(t, !0) } finally { s === A && e.removeAttribute("id") } } } return g(t.replace($, "$1"), e, n, r) } function ue() { var r = []; return function e(t, n) { return r.push(t + " ") > x.cacheLength && delete e[r.shift()], e[t + " "] = n } } function le(e) { return e[A] = !0, e } function ce(e) { var t = T.createElement("fieldset"); try { return !!e(t) } catch (e) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } } function fe(e, t) { var n = e.split("|"), r = n.length; while (r--) x.attrHandle[n[r]] = t } function de(e, t) { var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex; if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function pe(t) { return function (e) { return "input" === e.nodeName.toLowerCase() && e.type === t } } function he(n) { return function (e) { var t = e.nodeName.toLowerCase(); return ("input" === t || "button" === t) && e.type === n } } function ge(t) { return function (e) { return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t } } function ve(a) { return le(function (o) { return o = +o, le(function (e, t) { var n, r = a([], e.length, o), i = r.length; while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n])) }) }) } function ye(e) { return e && "undefined" != typeof e.getElementsByTagName && e } for (e in p = se.support = {}, i = se.isXML = function (e) { var t = e && e.namespaceURI, n = e && (e.ownerDocument || e).documentElement; return !Y.test(t || n && n.nodeName || "HTML") }, C = se.setDocument = function (e) { var t, n, r = e ? e.ownerDocument || e : d; return r != T && 9 === r.nodeType && r.documentElement && (a = (T = r).documentElement, E = !i(T), d != T && (n = T.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), p.scope = ce(function (e) { return a.appendChild(e).appendChild(T.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length }), p.attributes = ce(function (e) { return e.className = "i", !e.getAttribute("className") }), p.getElementsByTagName = ce(function (e) { return e.appendChild(T.createComment("")), !e.getElementsByTagName("*").length }), p.getElementsByClassName = J.test(T.getElementsByClassName), p.getById = ce(function (e) { return a.appendChild(e).id = A, !T.getElementsByName || !T.getElementsByName(A).length }), p.getById ? (x.filter.ID = function (e) { var t = e.replace(te, ne); return function (e) { return e.getAttribute("id") === t } }, x.find.ID = function (e, t) { if ("undefined" != typeof t.getElementById && E) { var n = t.getElementById(e); return n ? [n] : [] } }) : (x.filter.ID = function (e) { var n = e.replace(te, ne); return function (e) { var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id"); return t && t.value === n } }, x.find.ID = function (e, t) { if ("undefined" != typeof t.getElementById && E) { var n, r, i, o = t.getElementById(e); if (o) { if ((n = o.getAttributeNode("id")) && n.value === e) return [o]; i = t.getElementsByName(e), r = 0; while (o = i[r++]) if ((n = o.getAttributeNode("id")) && n.value === e) return [o] } return [] } }), x.find.TAG = p.getElementsByTagName ? function (e, t) { return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : p.qsa ? t.querySelectorAll(e) : void 0 } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, x.find.CLASS = p.getElementsByClassName && function (e, t) { if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e) }, s = [], v = [], (p.qsa = J.test(T.querySelectorAll)) && (ce(function (e) { var t; a.appendChild(e).innerHTML = "<a id='" + A + "'></a><select id='" + A + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + R + "*(?:value|" + I + ")"), e.querySelectorAll("[id~=" + A + "-]").length || v.push("~="), (t = T.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + A + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]") }), ce(function (e) { e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>"; var t = T.createElement("input"); t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + R + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:") })), (p.matchesSelector = J.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) { p.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", W) }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = J.test(a.compareDocumentPosition), y = t || J.test(a.contains) ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, D = t ? function (e, t) { if (e === t) return l = !0, 0; var n = !e.compareDocumentPosition - !t.compareDocumentPosition; return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !p.sortDetached && t.compareDocumentPosition(e) === n ? e == T || e.ownerDocument == d && y(d, e) ? -1 : t == T || t.ownerDocument == d && y(d, t) ? 1 : u ? H(u, e) - H(u, t) : 0 : 4 & n ? -1 : 1) } : function (e, t) { if (e === t) return l = !0, 0; var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t]; if (!i || !o) return e == T ? -1 : t == T ? 1 : i ? -1 : o ? 1 : u ? H(u, e) - H(u, t) : 0; if (i === o) return de(e, t); n = e; while (n = n.parentNode) a.unshift(n); n = t; while (n = n.parentNode) s.unshift(n); while (a[r] === s[r]) r++; return r ? de(a[r], s[r]) : a[r] == d ? -1 : s[r] == d ? 1 : 0 }), T }, se.matches = function (e, t) { return se(e, null, null, t) }, se.matchesSelector = function (e, t) { if (C(e), p.matchesSelector && E && !k[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try { var n = c.call(e, t); if (n || p.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n } catch (e) { k(t, !0) } return 0 < se(t, T, null, [e]).length }, se.contains = function (e, t) { return (e.ownerDocument || e) != T && C(e), y(e, t) }, se.attr = function (e, t) { (e.ownerDocument || e) != T && C(e); var n = x.attrHandle[t.toLowerCase()], r = n && L.call(x.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0; return void 0 !== r ? r : p.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }, se.escape = function (e) { return (e + "").replace(re, ie) }, se.error = function (e) { throw new Error("Syntax error, unrecognized expression: " + e) }, se.uniqueSort = function (e) { var t, n = [], r = 0, i = 0; if (l = !p.detectDuplicates, u = !p.sortStable && e.slice(0), e.sort(D), l) { while (t = e[i++]) t === e[i] && (r = n.push(i)); while (r--) e.splice(n[r], 1) } return u = null, e }, o = se.getText = function (e) { var t, n = "", r = 0, i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling)n += o(e) } else if (3 === i || 4 === i) return e.nodeValue } else while (t = e[r++]) n += o(t); return n }, (x = se.selectors = { cacheLength: 50, createPseudo: le, match: Q, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e }, PSEUDO: function (e) { var t, n = !e[6] && e[2]; return Q.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && V.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3)) } }, filter: { TAG: function (e) { var t = e.replace(te, ne).toLowerCase(); return "*" === e ? function () { return !0 } : function (e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function (e) { var t = m[e + " "]; return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && m(e, function (e) { return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "") }) }, ATTR: function (n, r, i) { return function (e) { var t = se.attr(e, n); return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(F, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-")) } }, CHILD: function (h, e, t, g, v) { var y = "nth" !== h.slice(0, 3), m = "last" !== h.slice(-4), b = "of-type" === e; return 1 === g && 0 === v ? function (e) { return !!e.parentNode } : function (e, t, n) { var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling", c = e.parentNode, f = b && e.nodeName.toLowerCase(), d = !n && !b, p = !1; if (c) { if (y) { while (l) { a = e; while (a = a[l]) if (b ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1; u = l = "only" === h && !u && "nextSibling" } return !0 } if (u = [m ? c.firstChild : c.lastChild], m && d) { p = (s = (r = (i = (o = (a = c)[A] || (a[A] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === N && r[1]) && r[2], a = s && c.childNodes[s]; while (a = ++s && a && a[l] || (p = s = 0) || u.pop()) if (1 === a.nodeType && ++p && a === e) { i[h] = [N, s, p]; break } } else if (d && (p = s = (r = (i = (o = (a = e)[A] || (a[A] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === N && r[1]), !1 === p) while (a = ++s && a && a[l] || (p = s = 0) || u.pop()) if ((b ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++p && (d && ((i = (o = a[A] || (a[A] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [N, p]), a === e)) break; return (p -= v) === g || p % g == 0 && 0 <= p / g } } }, PSEUDO: function (e, o) { var t, a = x.pseudos[e] || x.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e); return a[A] ? a(o) : 1 < a.length ? (t = [e, e, "", o], x.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) { var n, r = a(e, o), i = r.length; while (i--) e[n = H(e, r[i])] = !(t[n] = r[i]) }) : function (e) { return a(e, 0, t) }) : a } }, pseudos: { not: le(function (e) { var r = [], i = [], s = f(e.replace($, "$1")); return s[A] ? le(function (e, t, n, r) { var i, o = s(e, null, r, []), a = e.length; while (a--) (i = o[a]) && (e[a] = !(t[a] = i)) }) : function (e, t, n) { return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop() } }), has: le(function (t) { return function (e) { return 0 < se(t, e).length } }), contains: le(function (t) { return t = t.replace(te, ne), function (e) { return -1 < (e.textContent || o(e)).indexOf(t) } }), lang: le(function (n) { return X.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), function (e) { var t; do { if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-") } while ((e = e.parentNode) && 1 === e.nodeType); return !1 } }), target: function (e) { var t = n.location && n.location.hash; return t && t.slice(1) === e.id }, root: function (e) { return e === a }, focus: function (e) { return e === T.activeElement && (!T.hasFocus || T.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: ge(!1), disabled: ge(!0), checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6) return !1; return !0 }, parent: function (e) { return !x.pseudos.empty(e) }, header: function (e) { return K.test(e.nodeName) }, input: function (e) { return G.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase()) }, first: ve(function () { return [0] }), last: ve(function (e, t) { return [t - 1] }), eq: ve(function (e, t, n) { return [n < 0 ? n + t : n] }), even: ve(function (e, t) { for (var n = 0; n < t; n += 2)e.push(n); return e }), odd: ve(function (e, t) { for (var n = 1; n < t; n += 2)e.push(n); return e }), lt: ve(function (e, t, n) { for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;)e.push(r); return e }), gt: ve(function (e, t, n) { for (var r = n < 0 ? n + t : n; ++r < t;)e.push(r); return e }) } }).pseudos.nth = x.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) x.pseudos[e] = pe(e); for (e in { submit: !0, reset: !0 }) x.pseudos[e] = he(e); function me() { } function be(e) { for (var t = 0, n = e.length, r = ""; t < n; t++)r += e[t].value; return r } function xe(s, e, t) { var u = e.dir, l = e.next, c = l || u, f = t && "parentNode" === c, d = r++; return e.first ? function (e, t, n) { while (e = e[u]) if (1 === e.nodeType || f) return s(e, t, n); return !1 } : function (e, t, n) { var r, i, o, a = [N, d]; if (n) { while (e = e[u]) if ((1 === e.nodeType || f) && s(e, t, n)) return !0 } else while (e = e[u]) if (1 === e.nodeType || f) if (i = (o = e[A] || (e[A] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e; else { if ((r = i[c]) && r[0] === N && r[1] === d) return a[2] = r[2]; if ((i[c] = a)[2] = s(e, t, n)) return !0 } return !1 } } function we(i) { return 1 < i.length ? function (e, t, n) { var r = i.length; while (r--) if (!i[r](e, t, n)) return !1; return !0 } : i[0] } function Ce(e, t, n, r, i) { for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s))); return a } function Te(p, h, g, v, y, e) { return v && !v[A] && (v = Te(v)), y && !y[A] && (y = Te(y, e)), le(function (e, t, n, r) { var i, o, a, s = [], u = [], l = t.length, c = e || function (e, t, n) { for (var r = 0, i = t.length; r < i; r++)se(e, t[r], n); return n }(h || "*", n.nodeType ? [n] : n, []), f = !p || !e && h ? c : Ce(c, s, p, n, r), d = g ? y || (e ? p : l || v) ? [] : t : f; if (g && g(f, d, n, r), v) { i = Ce(d, u), v(i, [], n, r), o = i.length; while (o--) (a = i[o]) && (d[u[o]] = !(f[u[o]] = a)) } if (e) { if (y || p) { if (y) { i = [], o = d.length; while (o--) (a = d[o]) && i.push(f[o] = a); y(null, d = [], i, r) } o = d.length; while (o--) (a = d[o]) && -1 < (i = y ? H(e, a) : s[o]) && (e[i] = !(t[i] = a)) } } else d = Ce(d === t ? d.splice(l, d.length) : d), y ? y(null, t, d, r) : O.apply(t, d) }) } function Ee(e) { for (var i, t, n, r = e.length, o = x.relative[e[0].type], a = o || x.relative[" "], s = o ? 1 : 0, u = xe(function (e) { return e === i }, a, !0), l = xe(function (e) { return -1 < H(i, e) }, a, !0), c = [function (e, t, n) { var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n)); return i = null, r }]; s < r; s++)if (t = x.relative[e[s].type]) c = [xe(we(c), t)]; else { if ((t = x.filter[e[s].type].apply(null, e[s].matches))[A]) { for (n = ++s; n < r; n++)if (x.relative[e[n].type]) break; return Te(1 < s && we(c), 1 < s && be(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && be(e)) } c.push(t) } return we(c) } return me.prototype = x.filters = x.pseudos, x.setFilters = new me, h = se.tokenize = function (e, t) { var n, r, i, o, a, s, u, l = b[e + " "]; if (l) return t ? 0 : l.slice(0); a = e, s = [], u = x.preFilter; while (a) { for (o in n && !(r = z.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = _.exec(a)) && (n = r.shift(), i.push({ value: n, type: r[0].replace($, " ") }), a = a.slice(n.length)), x.filter) !(r = Q[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({ value: n, type: o, matches: r }), a = a.slice(n.length)); if (!n) break } return t ? a.length : a ? se.error(e) : b(e, s).slice(0) }, f = se.compile = function (e, t) { var n, v, y, m, b, r, i = [], o = [], a = S[e + " "]; if (!a) { t || (t = h(e)), n = t.length; while (n--) (a = Ee(t[n]))[A] ? i.push(a) : o.push(a); (a = S(e, (v = o, m = 0 < (y = i).length, b = 0 < v.length, r = function (e, t, n, r, i) { var o, a, s, u = 0, l = "0", c = e && [], f = [], d = w, p = e || b && x.find.TAG("*", i), h = N += null == d ? 1 : Math.random() || .1, g = p.length; for (i && (w = t == T || t || i); l !== g && null != (o = p[l]); l++) { if (b && o) { a = 0, t || o.ownerDocument == T || (C(o), n = !E); while (s = v[a++]) if (s(o, t || T, n)) { r.push(o); break } i && (N = h) } m && ((o = !s && o) && u--, e && c.push(o)) } if (u += l, m && l !== u) { a = 0; while (s = y[a++]) s(c, f, t, n); if (e) { if (0 < u) while (l--) c[l] || f[l] || (f[l] = j.call(r)); f = Ce(f) } O.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r) } return i && (N = h, w = d), c }, m ? le(r) : r))).selector = e } return a }, g = se.select = function (e, t, n, r) { var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e); if (n = n || [], 1 === c.length) { if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && x.relative[o[1].type]) { if (!(t = (x.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n; l && (t = t.parentNode), e = e.slice(o.shift().value.length) } i = Q.needsContext.test(e) ? 0 : o.length; while (i--) { if (a = o[i], x.relative[s = a.type]) break; if ((u = x.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) { if (o.splice(i, 1), !(e = r.length && be(o))) return O.apply(n, r), n; break } } } return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n }, p.sortStable = A.split("").sort(D).join("") === A, p.detectDuplicates = !!l, C(), p.sortDetached = ce(function (e) { return 1 & e.compareDocumentPosition(T.createElement("fieldset")) }), ce(function (e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || fe("type|href|height|width", function (e, t, n) { if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2) }), p.attributes && ce(function (e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || fe("value", function (e, t, n) { if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue }), ce(function (e) { return null == e.getAttribute("disabled") }) || fe(I, function (e, t, n) { var r; if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null }), se }(g); E.find = p, E.expr = p.selectors, E.expr[":"] = E.expr.pseudos, E.uniqueSort = E.unique = p.uniqueSort, E.text = p.getText, E.isXMLDoc = p.isXML, E.contains = p.contains, E.escapeSelector = p.escape; var h = function (e, t, n) { var r = [], i = void 0 !== n; while ((e = e[t]) && 9 !== e.nodeType) if (1 === e.nodeType) { if (i && E(e).is(n)) break; r.push(e) } return r }, A = function (e, t) { for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e); return n }, N = E.expr.match.needsContext; function S(e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() } var k = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; function D(e, n, r) { return b(n) ? E.grep(e, function (e, t) { return !!n.call(e, t, e) !== r }) : n.nodeType ? E.grep(e, function (e) { return e === n !== r }) : "string" != typeof n ? E.grep(e, function (e) { return -1 < i.call(n, e) !== r }) : E.filter(n, e, r) } E.filter = function (e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? E.find.matchesSelector(r, e) ? [r] : [] : E.find.matches(e, E.grep(t, function (e) { return 1 === e.nodeType })) }, E.fn.extend({ find: function (e) { var t, n, r = this.length, i = this; if ("string" != typeof e) return this.pushStack(E(e).filter(function () { for (t = 0; t < r; t++)if (E.contains(i[t], this)) return !0 })); for (n = this.pushStack([]), t = 0; t < r; t++)E.find(e, i[t], n); return 1 < r ? E.uniqueSort(n) : n }, filter: function (e) { return this.pushStack(D(this, e || [], !1)) }, not: function (e) { return this.pushStack(D(this, e || [], !0)) }, is: function (e) { return !!D(this, "string" == typeof e && N.test(e) ? E(e) : e || [], !1).length } }); var L, j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/; (E.fn.init = function (e, t, n) { var r, i; if (!e) return this; if (n = n || L, "string" == typeof e) { if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : j.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e); if (r[1]) { if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : w, !0)), k.test(r[1]) && E.isPlainObject(t)) for (r in t) b(this[r]) ? this[r](t[r]) : this.attr(r, t[r]); return this } return (i = w.getElementById(r[2])) && (this[0] = i, this.length = 1), this } return e.nodeType ? (this[0] = e, this.length = 1, this) : b(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this) }).prototype = E.fn, L = E(w); var q = /^(?:parents|prev(?:Until|All))/, O = { children: !0, contents: !0, next: !0, prev: !0 }; function P(e, t) { while ((e = e[t]) && 1 !== e.nodeType); return e } E.fn.extend({ has: function (e) { var t = E(e, this), n = t.length; return this.filter(function () { for (var e = 0; e < n; e++)if (E.contains(this, t[e])) return !0 }) }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = "string" != typeof e && E(e); if (!N.test(e)) for (; r < i; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && E.find.matchesSelector(n, e))) { o.push(n); break } return this.pushStack(1 < o.length ? E.uniqueSort(o) : o) }, index: function (e) { return e ? "string" == typeof e ? i.call(E(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t)))) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }), E.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return h(e, "parentNode") }, parentsUntil: function (e, t, n) { return h(e, "parentNode", n) }, next: function (e) { return P(e, "nextSibling") }, prev: function (e) { return P(e, "previousSibling") }, nextAll: function (e) { return h(e, "nextSibling") }, prevAll: function (e) { return h(e, "previousSibling") }, nextUntil: function (e, t, n) { return h(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return h(e, "previousSibling", n) }, siblings: function (e) { return A((e.parentNode || {}).firstChild, e) }, children: function (e) { return A(e.firstChild) }, contents: function (e) { return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (S(e, "template") && (e = e.content || e), E.merge([], e.childNodes)) } }, function (r, i) { E.fn[r] = function (e, t) { var n = E.map(this, i, e); return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = E.filter(t, n)), 1 < this.length && (O[r] || E.uniqueSort(n), q.test(r) && n.reverse()), this.pushStack(n) } }); var H = /[^\x20\t\r\n\f]+/g; function I(e) { return e } function R(e) { throw e } function B(e, t, n, r) { var i; try { e && b(i = e.promise) ? i.call(e).done(t).fail(n) : e && b(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r)) } catch (e) { n.apply(void 0, [e]) } } E.Callbacks = function (r) { var e, n; r = "string" == typeof r ? (e = r, n = {}, E.each(e.match(H) || [], function (e, t) { n[t] = !0 }), n) : E.extend({}, r); var i, t, o, a, s = [], u = [], l = -1, c = function () { for (a = a || r.once, o = i = !0; u.length; l = -1) { t = u.shift(); while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1) } r.memory || (t = !1), i = !1, a && (s = t ? [] : "") }, f = { add: function () { return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) { E.each(e, function (e, t) { b(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== T(t) && n(t) }) }(arguments), t && !i && c()), this }, remove: function () { return E.each(arguments, function (e, t) { var n; while (-1 < (n = E.inArray(t, s, n))) s.splice(n, 1), n <= l && l-- }), this }, has: function (e) { return e ? -1 < E.inArray(e, s) : 0 < s.length }, empty: function () { return s && (s = []), this }, disable: function () { return a = u = [], s = t = "", this }, disabled: function () { return !s }, lock: function () { return a = u = [], t || i || (s = t = ""), this }, locked: function () { return !!a }, fireWith: function (e, t) { return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this }, fire: function () { return f.fireWith(this, arguments), this }, fired: function () { return !!o } }; return f }, E.extend({ Deferred: function (e) { var o = [["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2], ["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]], i = "pending", a = { state: function () { return i }, always: function () { return s.done(arguments).fail(arguments), this }, "catch": function (e) { return a.then(null, e) }, pipe: function () { var i = arguments; return E.Deferred(function (r) { E.each(o, function (e, t) { var n = b(i[t[4]]) && i[t[4]]; s[t[1]](function () { var e = n && n.apply(this, arguments); e && b(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments) }) }), i = null }).promise() }, then: function (t, n, r) { var u = 0; function l(i, o, a, s) { return function () { var n = this, r = arguments, e = function () { var e, t; if (!(i < u)) { if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution"); t = e && ("object" == typeof e || "function" == typeof e) && e.then, b(t) ? s ? t.call(e, l(u, o, I, s), l(u, o, R, s)) : (u++, t.call(e, l(u, o, I, s), l(u, o, R, s), l(u, o, I, o.notifyWith))) : (a !== I && (n = void 0, r = [e]), (s || o.resolveWith)(n, r)) } }, t = s ? e : function () { try { e() } catch (e) { E.Deferred.exceptionHook && E.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== R && (n = void 0, r = [e]), o.rejectWith(n, r)) } }; i ? t() : (E.Deferred.getStackHook && (t.stackTrace = E.Deferred.getStackHook()), g.setTimeout(t)) } } return E.Deferred(function (e) { o[0][3].add(l(0, e, b(r) ? r : I, e.notifyWith)), o[1][3].add(l(0, e, b(t) ? t : I)), o[2][3].add(l(0, e, b(n) ? n : R)) }).promise() }, promise: function (e) { return null != e ? E.extend(e, a) : a } }, s = {}; return E.each(o, function (e, t) { var n = t[2], r = t[5]; a[t[1]] = n.add, r && n.add(function () { i = r }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () { return s[t[0] + "With"](this === s ? void 0 : this, arguments), this }, s[t[0] + "With"] = n.fireWith }), a.promise(s), e && e.call(s, s), s }, when: function (e) { var n = arguments.length, t = n, r = Array(t), i = s.call(arguments), o = E.Deferred(), a = function (t) { return function (e) { r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i) } }; if (n <= 1 && (B(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || b(i[t] && i[t].then))) return o.then(); while (t--) B(i[t], a(t), o.reject); return o.promise() } }); var M = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/; E.Deferred.exceptionHook = function (e, t) { g.console && g.console.warn && e && M.test(e.name) && g.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t) }, E.readyException = function (e) { g.setTimeout(function () { throw e }) }; var W = E.Deferred(); function F() { w.removeEventListener("DOMContentLoaded", F), g.removeEventListener("load", F), E.ready() } E.fn.ready = function (e) { return W.then(e)["catch"](function (e) { E.readyException(e) }), this }, E.extend({ isReady: !1, readyWait: 1, ready: function (e) { (!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0) !== e && 0 < --E.readyWait || W.resolveWith(w, [E]) } }), E.ready.then = W.then, "complete" === w.readyState || "loading" !== w.readyState && !w.documentElement.doScroll ? g.setTimeout(E.ready) : (w.addEventListener("DOMContentLoaded", F), g.addEventListener("load", F)); var $ = function (e, t, n, r, i, o, a) { var s = 0, u = e.length, l = null == n; if ("object" === T(n)) for (s in i = !0, n) $(e, t, s, n[s], !0, o, a); else if (void 0 !== r && (i = !0, b(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) { return l.call(E(e), n) })), t)) for (; s < u; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n))); return i ? e : l ? t.call(e) : u ? t(e[0], n) : o }, z = /^-ms-/, _ = /-([a-z])/g; function U(e, t) { return t.toUpperCase() } function V(e) { return e.replace(z, "ms-").replace(_, U) } var X = function (e) { return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType }; function Q() { this.expando = E.expando + Q.uid++ } Q.uid = 1, Q.prototype = { cache: function (e) { var t = e[this.expando]; return t || (t = {}, X(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t }, set: function (e, t, n) { var r, i = this.cache(e); if ("string" == typeof t) i[V(t)] = n; else for (r in t) i[V(r)] = t[r]; return i }, get: function (e, t) { return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)] }, access: function (e, t, n) { return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t) }, remove: function (e, t) { var n, r = e[this.expando]; if (void 0 !== r) { if (void 0 !== t) { n = (t = Array.isArray(t) ? t.map(V) : (t = V(t)) in r ? [t] : t.match(H) || []).length; while (n--) delete r[t[n]] } (void 0 === t || E.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]) } }, hasData: function (e) { var t = e[this.expando]; return void 0 !== t && !E.isEmptyObject(t) } }; var Y = new Q, G = new Q, K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, J = /[A-Z]/g; function Z(e, t, n) { var r, i; if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(J, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) { try { n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : K.test(i) ? JSON.parse(i) : i) } catch (e) { } G.set(e, t, n) } else n = void 0; return n } E.extend({ hasData: function (e) { return G.hasData(e) || Y.hasData(e) }, data: function (e, t, n) { return G.access(e, t, n) }, removeData: function (e, t) { G.remove(e, t) }, _data: function (e, t, n) { return Y.access(e, t, n) }, _removeData: function (e, t) { Y.remove(e, t) } }), E.fn.extend({ data: function (n, e) { var t, r, i, o = this[0], a = o && o.attributes; if (void 0 === n) { if (this.length && (i = G.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) { t = a.length; while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = V(r.slice(5)), Z(o, r, i[r])); Y.set(o, "hasDataAttrs", !0) } return i } return "object" == typeof n ? this.each(function () { G.set(this, n) }) : $(this, function (e) { var t; if (o && void 0 === e) return void 0 !== (t = G.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0; this.each(function () { G.set(this, n, e) }) }, null, e, 1 < arguments.length, null, !0) }, removeData: function (e) { return this.each(function () { G.remove(this, e) }) } }), E.extend({ queue: function (e, t, n) { var r; if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, E.makeArray(n)) : r.push(n)), r || [] }, dequeue: function (e, t) { t = t || "fx"; var n = E.queue(e, t), r = n.length, i = n.shift(), o = E._queueHooks(e, t); "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () { E.dequeue(e, t) }, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return Y.get(e, n) || Y.access(e, n, { empty: E.Callbacks("once memory").add(function () { Y.remove(e, [t + "queue", n]) }) }) } }), E.fn.extend({ queue: function (t, n) { var e = 2; return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? E.queue(this[0], t) : void 0 === n ? this : this.each(function () { var e = E.queue(this, t, n); E._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && E.dequeue(this, t) }) }, dequeue: function (e) { return this.each(function () { E.dequeue(this, e) }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, t) { var n, r = 1, i = E.Deferred(), o = this, a = this.length, s = function () { --r || i.resolveWith(o, [o]) }; "string" != typeof e && (t = e, e = void 0), e = e || "fx"; while (a--) (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s)); return s(), i.promise(t) } }); var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"), ne = ["Top", "Right", "Bottom", "Left"], re = w.documentElement, ie = function (e) { return E.contains(e.ownerDocument, e) }, oe = { composed: !0 }; re.getRootNode && (ie = function (e) { return E.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument }); var ae = function (e, t) { return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === E.css(e, "display") }; var se = {}; function ue(e, t) { for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = se[s]) || (o = a.body.appendChild(a.createElement(s)), u = E.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), se[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n))); for (c = 0; c < f; c++)null != l[c] && (e[c].style.display = l[c]); return e } E.fn.extend({ show: function () { return ue(this, !0) }, hide: function () { return ue(this) }, toggle: function (e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () { ae(this) ? E(this).show() : E(this).hide() }) } }); var le, ce, fe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, pe = /^$|^module$|\/(?:java|ecma)script/i; le = w.createDocumentFragment().appendChild(w.createElement("div")), (ce = w.createElement("input")).setAttribute("type", "radio"), ce.setAttribute("checked", "checked"), ce.setAttribute("name", "t"), le.appendChild(ce), m.checkClone = le.cloneNode(!0).cloneNode(!0).lastChild.checked, le.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!le.cloneNode(!0).lastChild.defaultValue, le.innerHTML = "<option></option>", m.option = !!le.lastChild; var he = { thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] }; function ge(e, t) { var n; return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && S(e, t) ? E.merge([e], n) : n } function ve(e, t) { for (var n = 0, r = e.length; n < r; n++)Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval")) } he.tbody = he.tfoot = he.colgroup = he.caption = he.thead, he.th = he.td, m.option || (he.optgroup = he.option = [1, "<select multiple='multiple'>", "</select>"]); var ye = /<|&#?\w+;/; function me(e, t, n, r, i) { for (var o, a, s, u, l, c, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++)if ((o = e[p]) || 0 === o) if ("object" === T(o)) E.merge(d, o.nodeType ? [o] : o); else if (ye.test(o)) { a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = he[s] || he._default, a.innerHTML = u[1] + E.htmlPrefilter(o) + u[2], c = u[0]; while (c--) a = a.lastChild; E.merge(d, a.childNodes), (a = f.firstChild).textContent = "" } else d.push(t.createTextNode(o)); f.textContent = "", p = 0; while (o = d[p++]) if (r && -1 < E.inArray(o, r)) i && i.push(o); else if (l = ie(o), a = ge(f.appendChild(o), "script"), l && ve(a), n) { c = 0; while (o = a[c++]) pe.test(o.type || "") && n.push(o) } return f } var be = /^([^.]*)(?:\.(.+)|)/; function xe() { return !0 } function we() { return !1 } function Ce(e, t) { return e === function () { try { return w.activeElement } catch (e) { } }() == ("focus" === t) } function Te(e, t, n, r, i, o) { var a, s; if ("object" == typeof t) { for (s in "string" != typeof n && (r = r || n, n = void 0), t) Te(e, s, n, r, t[s], o); return e } if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = we; else if (!i) return e; return 1 === o && (a = i, (i = function (e) { return E().off(e), a.apply(this, arguments) }).guid = a.guid || (a.guid = E.guid++)), e.each(function () { E.event.add(this, t, i, r, n) }) } function Ee(e, i, o) { o ? (Y.set(e, i, !1), E.event.add(e, i, { namespace: !1, handler: function (e) { var t, n, r = Y.get(this, i); if (1 & e.isTrigger && this[i]) { if (r.length) (E.event.special[i] || {}).delegateType && e.stopPropagation(); else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n && n.value } else r.length && (Y.set(this, i, { value: E.event.trigger(E.extend(r[0], E.Event.prototype), r.slice(1), this) }), e.stopImmediatePropagation()) } })) : void 0 === Y.get(e, i) && E.event.add(e, i, xe) } E.event = { global: {}, add: function (t, e, n, r, i) { var o, a, s, u, l, c, f, d, p, h, g, v = Y.get(t); if (X(t)) { n.handler && (n = (o = n).handler, i = o.selector), i && E.find.matchesSelector(re, i), n.guid || (n.guid = E.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) { return "undefined" != typeof E && E.event.triggered !== e.type ? E.event.dispatch.apply(t, arguments) : void 0 }), l = (e = (e || "").match(H) || [""]).length; while (l--) p = g = (s = be.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), p && (f = E.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = E.event.special[p] || {}, c = E.extend({ type: p, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && E.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (d = u[p]) || ((d = u[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(p, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, c) : d.push(c), E.event.global[p] = !0) } }, remove: function (e, t, n, r, i) { var o, a, s, u, l, c, f, d, p, h, g, v = Y.hasData(e) && Y.get(e); if (v && (u = v.events)) { l = (t = (t || "").match(H) || [""]).length; while (l--) if (p = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p) { f = E.event.special[p] || {}, d = u[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; while (o--) c = d[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c)); a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || E.removeEvent(e, p, v.handle), delete u[p]) } else for (p in u) E.event.remove(e, p + t[l], n, r, !0); E.isEmptyObject(u) && Y.remove(e, "handle events") } }, dispatch: function (e) { var t, n, r, i, o, a, s = new Array(arguments.length), u = E.event.fix(e), l = (Y.get(this, "events") || Object.create(null))[u.type] || [], c = E.event.special[u.type] || {}; for (s[0] = u, t = 1; t < arguments.length; t++)s[t] = arguments[t]; if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) { a = E.event.handlers.call(this, u, l), t = 0; while ((i = a[t++]) && !u.isPropagationStopped()) { u.currentTarget = i.elem, n = 0; while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((E.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, u), u.result } }, handlers: function (e, t) { var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target; if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) { for (o = [], a = {}, n = 0; n < u; n++)void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < E(i, this).index(l) : E.find(i, this, null, [l]).length), a[i] && o.push(r); o.length && s.push({ elem: l, handlers: o }) } return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s }, addProp: function (t, e) { Object.defineProperty(E.Event.prototype, t, { enumerable: !0, configurable: !0, get: b(e) ? function () { if (this.originalEvent) return e(this.originalEvent) } : function () { if (this.originalEvent) return this.originalEvent[t] }, set: function (e) { Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) } }) }, fix: function (e) { return e[E.expando] ? e : new E.Event(e) }, special: { load: { noBubble: !0 }, click: { setup: function (e) { var t = this || e; return fe.test(t.type) && t.click && S(t, "input") && Ee(t, "click", xe), !1 }, trigger: function (e) { var t = this || e; return fe.test(t.type) && t.click && S(t, "input") && Ee(t, "click"), !0 }, _default: function (e) { var t = e.target; return fe.test(t.type) && t.click && S(t, "input") && Y.get(t, "click") || S(t, "a") } }, beforeunload: { postDispatch: function (e) { void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result) } } } }, E.removeEvent = function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n) }, E.Event = function (e, t) { if (!(this instanceof E.Event)) return new E.Event(e, t); e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? xe : we, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && E.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[E.expando] = !0 }, E.Event.prototype = { constructor: E.Event, isDefaultPrevented: we, isPropagationStopped: we, isImmediatePropagationStopped: we, isSimulated: !1, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = xe, e && !this.isSimulated && e.preventDefault() }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = xe, e && !this.isSimulated && e.stopPropagation() }, stopImmediatePropagation: function () { var e = this.originalEvent; this.isImmediatePropagationStopped = xe, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation() } }, E.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, code: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: !0 }, E.event.addProp), E.each({ focus: "focusin", blur: "focusout" }, function (e, t) { E.event.special[e] = { setup: function () { return Ee(this, e, Ce), !1 }, trigger: function () { return Ee(this, e), !0 }, _default: function () { return !0 }, delegateType: t } }), E.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, i) { E.event.special[e] = { delegateType: i, bindType: i, handle: function (e) { var t, n = e.relatedTarget, r = e.handleObj; return n && (n === this || E.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t } } }), E.fn.extend({ on: function (e, t, n, r) { return Te(this, e, t, n, r) }, one: function (e, t, n, r) { return Te(this, e, t, n, r, 1) }, off: function (e, t, n) { var r, i; if (e && e.preventDefault && e.handleObj) return r = e.handleObj, E(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this; if ("object" == typeof e) { for (i in e) this.off(i, t, e[i]); return this } return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = we), this.each(function () { E.event.remove(this, e, n, t) }) } }); var Ae = /<script|<style|<link/i, Ne = /checked\s*(?:[^=]|=\s*.checked.)/i, Se = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; function ke(e, t) { return S(e, "table") && S(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e } function De(e) { return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e } function Le(e) { return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e } function je(e, t) { var n, r, i, o, a, s; if (1 === t.nodeType) { if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), s) for (n = 0, r = s[i].length; n < r; n++)E.event.add(t, i, s[i][n]); G.hasData(e) && (o = G.access(e), a = E.extend({}, o), G.set(t, a)) } } function qe(n, r, i, o) { r = v(r); var e, t, a, s, u, l, c = 0, f = n.length, d = f - 1, p = r[0], h = b(p); if (h || 1 < f && "string" == typeof p && !m.checkClone && Ne.test(p)) return n.each(function (e) { var t = n.eq(e); h && (r[0] = p.call(this, e, t.html())), qe(t, r, i, o) }); if (f && (t = (e = me(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) { for (s = (a = E.map(ge(e, "script"), De)).length; c < f; c++)u = e, c !== d && (u = E.clone(u, !0, !0), s && E.merge(a, ge(u, "script"))), i.call(n[c], u, c); if (s) for (l = a[a.length - 1].ownerDocument, E.map(a, Le), c = 0; c < s; c++)u = a[c], pe.test(u.type || "") && !Y.access(u, "globalEval") && E.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? E._evalUrl && !u.noModule && E._evalUrl(u.src, { nonce: u.nonce || u.getAttribute("nonce") }, l) : C(u.textContent.replace(Se, ""), u, l)) } return n } function Oe(e, t, n) { for (var r, i = t ? E.filter(t, e) : e, o = 0; null != (r = i[o]); o++)n || 1 !== r.nodeType || E.cleanData(ge(r)), r.parentNode && (n && ie(r) && ve(ge(r, "script")), r.parentNode.removeChild(r)); return e } E.extend({ htmlPrefilter: function (e) { return e }, clone: function (e, t, n) { var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = ie(e); if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e))) for (a = ge(c), r = 0, i = (o = ge(e)).length; r < i; r++)s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && fe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue); if (t) if (n) for (o = o || ge(e), a = a || ge(c), r = 0, i = o.length; r < i; r++)je(o[r], a[r]); else je(e, c); return 0 < (a = ge(c, "script")).length && ve(a, !f && ge(e, "script")), c }, cleanData: function (e) { for (var t, n, r, i = E.event.special, o = 0; void 0 !== (n = e[o]); o++)if (X(n)) { if (t = n[Y.expando]) { if (t.events) for (r in t.events) i[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle); n[Y.expando] = void 0 } n[G.expando] && (n[G.expando] = void 0) } } }), E.fn.extend({ detach: function (e) { return Oe(this, e, !0) }, remove: function (e) { return Oe(this, e) }, text: function (e) { return $(this, function (e) { return void 0 === e ? E.text(this) : this.empty().each(function () { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e) }) }, null, e, arguments.length) }, append: function () { return qe(this, arguments, function (e) { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || ke(this, e).appendChild(e) }) }, prepend: function () { return qe(this, arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = ke(this, e); t.insertBefore(e, t.firstChild) } }) }, before: function () { return qe(this, arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return qe(this, arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, empty: function () { for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (E.cleanData(ge(e, !1)), e.textContent = ""); return this }, clone: function (e, t) { return e = null != e && e, t = null == t ? e : t, this.map(function () { return E.clone(this, e, t) }) }, html: function (e) { return $(this, function (e) { var t = this[0] || {}, n = 0, r = this.length; if (void 0 === e && 1 === t.nodeType) return t.innerHTML; if ("string" == typeof e && !Ae.test(e) && !he[(de.exec(e) || ["", ""])[1].toLowerCase()]) { e = E.htmlPrefilter(e); try { for (; n < r; n++)1 === (t = this[n] || {}).nodeType && (E.cleanData(ge(t, !1)), t.innerHTML = e); t = 0 } catch (e) { } } t && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function () { var n = []; return qe(this, arguments, function (e) { var t = this.parentNode; E.inArray(this, n) < 0 && (E.cleanData(ge(this)), t && t.replaceChild(e, this)) }, n) } }), E.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, a) { E.fn[e] = function (e) { for (var t, n = [], r = E(e), i = r.length - 1, o = 0; o <= i; o++)t = o === i ? this : this.clone(!0), E(r[o])[a](t), u.apply(n, t.get()); return this.pushStack(n) } }); var Pe = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"), He = function (e) { var t = e.ownerDocument.defaultView; return t && t.opener || (t = g), t.getComputedStyle(e) }, Ie = function (e, t, n) { var r, i, o = {}; for (i in t) o[i] = e.style[i], e.style[i] = t[i]; for (i in r = n.call(e), t) e.style[i] = o[i]; return r }, Re = new RegExp(ne.join("|"), "i"); function Be(e, t, n) { var r, i, o, a, s = e.style; return (n = n || He(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = E.style(e, t)), !m.pixelBoxStyles() && Pe.test(a) && Re.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a } function Me(e, t) { return { get: function () { if (!e()) return (this.get = t).apply(this, arguments); delete this.get } } } !function () { function e() { if (l) { u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l); var e = g.getComputedStyle(l); n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null } } function t(e) { return Math.round(parseFloat(e)) } var n, r, i, o, a, s, u = w.createElement("div"), l = w.createElement("div"); l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === l.style.backgroundClip, E.extend(m, { boxSizingReliable: function () { return e(), r }, pixelBoxStyles: function () { return e(), o }, pixelPosition: function () { return e(), n }, reliableMarginLeft: function () { return e(), s }, scrollboxSize: function () { return e(), i }, reliableTrDimensions: function () { var e, t, n, r; return null == a && (e = w.createElement("table"), t = w.createElement("tr"), n = w.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", re.appendChild(e).appendChild(t).appendChild(n), r = g.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, re.removeChild(e)), a } })) }(); var We = ["Webkit", "Moz", "ms"], Fe = w.createElement("div").style, $e = {}; function ze(e) { var t = E.cssProps[e] || $e[e]; return t || (e in Fe ? e : $e[e] = function (e) { var t = e[0].toUpperCase() + e.slice(1), n = We.length; while (n--) if ((e = We[n] + t) in Fe) return e }(e) || e) } var _e, Ue, Ve = /^(none|table(?!-c[ea]).+)/, Xe = /^--/, Qe = { position: "absolute", visibility: "hidden", display: "block" }, Ye = { letterSpacing: "0", fontWeight: "400" }; function Ge(e, t, n) { var r = te.exec(t); return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t } function Ke(e, t, n, r, i, o) { var a = "width" === t ? 1 : 0, s = 0, u = 0; if (n === (r ? "border" : "content")) return 0; for (; a < 4; a += 2)"margin" === n && (u += E.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= E.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= E.css(e, "border" + ne[a] + "Width", !0, i))) : (u += E.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += E.css(e, "border" + ne[a] + "Width", !0, i) : s += E.css(e, "border" + ne[a] + "Width", !0, i)); return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u } function Je(e, t, n) { var r = He(e), i = (!m.boxSizingReliable() || n) && "border-box" === E.css(e, "boxSizing", !1, r), o = i, a = Be(e, t, r), s = "offset" + t[0].toUpperCase() + t.slice(1); if (Pe.test(a)) { if (!n) return a; a = "auto" } return (!m.boxSizingReliable() && i || !m.reliableTrDimensions() && S(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === E.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === E.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px" } E.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = Be(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, gridArea: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnStart: !0, gridRow: !0, gridRowEnd: !0, gridRowStart: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function (e, t, n, r) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var i, o, a, s = V(t), u = Xe.test(t), l = e.style; if (u || (t = ze(s)), a = E.cssHooks[t] || E.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t]; "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = function (e, t, n, r) { var i, o, a = 20, s = r ? function () { return r.cur() } : function () { return E.css(e, t, "") }, u = s(), l = n && n[3] || (E.cssNumber[t] ? "" : "px"), c = e.nodeType && (E.cssNumber[t] || "px" !== l && +u) && te.exec(E.css(e, t)); if (c && c[3] !== l) { u /= 2, l = l || c[3], c = +u || 1; while (a--) E.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o; c *= 2, E.style(e, t, c + l), n = n || [] } return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i }(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (E.cssNumber[s] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n)) } }, css: function (e, t, n, r) { var i, o, a, s = V(t); return Xe.test(t) || (t = ze(s)), (a = E.cssHooks[t] || E.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Be(e, t, r)), "normal" === i && t in Ye && (i = Ye[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i } }), E.each(["height", "width"], function (e, u) { E.cssHooks[u] = { get: function (e, t, n) { if (t) return !Ve.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, u, n) : Ie(e, Qe, function () { return Je(e, u, n) }) }, set: function (e, t, n) { var r, i = He(e), o = !m.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === E.css(e, "boxSizing", !1, i), s = n ? Ke(e, u, n, a, i) : 0; return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Ke(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = E.css(e, u)), Ge(0, t, s) } } }), E.cssHooks.marginLeft = Me(m.reliableMarginLeft, function (e, t) { if (t) return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - Ie(e, { marginLeft: 0 }, function () { return e.getBoundingClientRect().left })) + "px" }), E.each({ margin: "", padding: "", border: "Width" }, function (i, o) { E.cssHooks[i + o] = { expand: function (e) { for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)n[i + ne[t] + o] = r[t] || r[t - 2] || r[0]; return n } }, "margin" !== i && (E.cssHooks[i + o].set = Ge) }), E.fn.extend({ css: function (e, t) { return $(this, function (e, t, n) { var r, i, o = {}, a = 0; if (Array.isArray(t)) { for (r = He(e), i = t.length; a < i; a++)o[t[a]] = E.css(e, t[a], !1, r); return o } return void 0 !== n ? E.style(e, t, n) : E.css(e, t) }, e, t, 1 < arguments.length) } }), E.fn.delay = function (r, e) { return r = E.fx && E.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) { var n = g.setTimeout(e, r); t.stop = function () { g.clearTimeout(n) } }) }, _e = w.createElement("input"), Ue = w.createElement("select").appendChild(w.createElement("option")), _e.type = "checkbox", m.checkOn = "" !== _e.value, m.optSelected = Ue.selected, (_e = w.createElement("input")).value = "t", _e.type = "radio", m.radioValue = "t" === _e.value; var Ze, et = E.expr.attrHandle; E.fn.extend({ attr: function (e, t) { return $(this, E.attr, e, t, 1 < arguments.length) }, removeAttr: function (e) { return this.each(function () { E.removeAttr(this, e) }) } }), E.extend({ attr: function (e, t, n) { var r, i, o = e.nodeType; if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? E.prop(e, t, n) : (1 === o && E.isXMLDoc(e) || (i = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? Ze : void 0)), void 0 !== n ? null === n ? void E.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = E.find.attr(e, t)) ? void 0 : r) }, attrHooks: { type: { set: function (e, t) { if (!m.radioValue && "radio" === t && S(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, removeAttr: function (e, t) { var n, r = 0, i = t && t.match(H); if (i && 1 === e.nodeType) while (n = i[r++]) e.removeAttribute(n) } }), Ze = { set: function (e, t, n) { return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n), n } }, E.each(E.expr.match.bool.source.match(/\w+/g), function (e, t) { var a = et[t] || E.find.attr; et[t] = function (e, t, n) { var r, i, o = t.toLowerCase(); return n || (i = et[o], et[o] = r, r = null != a(e, t, n) ? o : null, et[o] = i), r } }); var tt = /^(?:input|select|textarea|button)$/i, nt = /^(?:a|area)$/i; function rt(e) { return (e.match(H) || []).join(" ") } function it(e) { return e.getAttribute && e.getAttribute("class") || "" } function ot(e) { return Array.isArray(e) ? e : "string" == typeof e && e.match(H) || [] } E.fn.extend({ prop: function (e, t) { return $(this, E.prop, e, t, 1 < arguments.length) }, removeProp: function (e) { return this.each(function () { delete this[E.propFix[e] || e] }) } }), E.extend({ prop: function (e, t, n) { var r, i, o = e.nodeType; if (3 !== o && 8 !== o && 2 !== o) return 1 === o && E.isXMLDoc(e) || (t = E.propFix[t] || t, i = E.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t] }, propHooks: { tabIndex: { get: function (e) { var t = E.find.attr(e, "tabindex"); return t ? parseInt(t, 10) : tt.test(e.nodeName) || nt.test(e.nodeName) && e.href ? 0 : -1 } } }, propFix: { "for": "htmlFor", "class": "className" } }), m.optSelected || (E.propHooks.selected = { get: function (e) { var t = e.parentNode; return t && t.parentNode && t.parentNode.selectedIndex, null }, set: function (e) { var t = e.parentNode; t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex) } }), E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { E.propFix[this.toLowerCase()] = this }), E.fn.extend({ addClass: function (t) { var e, n, r, i, o, a, s, u = 0; if (b(t)) return this.each(function (e) { E(this).addClass(t.call(this, e, it(this))) }); if ((e = ot(t)).length) while (n = this[u++]) if (i = it(n), r = 1 === n.nodeType && " " + rt(i) + " ") { a = 0; while (o = e[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " "); i !== (s = rt(r)) && n.setAttribute("class", s) } return this }, removeClass: function (t) { var e, n, r, i, o, a, s, u = 0; if (b(t)) return this.each(function (e) { E(this).removeClass(t.call(this, e, it(this))) }); if (!arguments.length) return this.attr("class", ""); if ((e = ot(t)).length) while (n = this[u++]) if (i = it(n), r = 1 === n.nodeType && " " + rt(i) + " ") { a = 0; while (o = e[a++]) while (-1 < r.indexOf(" " + o + " ")) r = r.replace(" " + o + " ", " "); i !== (s = rt(r)) && n.setAttribute("class", s) } return this }, toggleClass: function (i, t) { var o = typeof i, a = "string" === o || Array.isArray(i); return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : b(i) ? this.each(function (e) { E(this).toggleClass(i.call(this, e, it(this), t), t) }) : this.each(function () { var e, t, n, r; if (a) { t = 0, n = E(this), r = ot(i); while (e = r[t++]) n.hasClass(e) ? n.removeClass(e) : n.addClass(e) } else void 0 !== i && "boolean" !== o || ((e = it(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || "")) }) }, hasClass: function (e) { var t, n, r = 0; t = " " + e + " "; while (n = this[r++]) if (1 === n.nodeType && -1 < (" " + rt(it(n)) + " ").indexOf(t)) return !0; return !1 } }); var at = /\r/g; E.fn.extend({ val: function (n) { var r, e, i, t = this[0]; return arguments.length ? (i = b(n), this.each(function (e) { var t; 1 === this.nodeType && (null == (t = i ? n.call(this, e, E(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = E.map(t, function (e) { return null == e ? "" : e + "" })), (r = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t)) })) : t ? (r = E.valHooks[t.type] || E.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(at, "") : null == e ? "" : e : void 0 } }), E.extend({ valHooks: { option: { get: function (e) { var t = E.find.attr(e, "value"); return null != t ? t : rt(E.text(e)) } }, select: { get: function (e) { var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length; for (r = o < 0 ? u : a ? o : 0; r < u; r++)if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !S(n.parentNode, "optgroup"))) { if (t = E(n).val(), a) return t; s.push(t) } return s }, set: function (e, t) { var n, r, i = e.options, o = E.makeArray(t), a = i.length; while (a--) ((r = i[a]).selected = -1 < E.inArray(E.valHooks.option.get(r), o)) && (n = !0); return n || (e.selectedIndex = -1), o } } } }), E.each(["radio", "checkbox"], function () { E.valHooks[this] = { set: function (e, t) { if (Array.isArray(t)) return e.checked = -1 < E.inArray(E(e).val(), t) } }, m.checkOn || (E.valHooks[this].get = function (e) { return null === e.getAttribute("value") ? "on" : e.value }) }), m.focusin = "onfocusin" in g; var st = /^(?:focusinfocus|focusoutblur)$/, ut = function (e) { e.stopPropagation() }; E.extend(E.event, { trigger: function (e, t, n, r) { var i, o, a, s, u, l, c, f, d = [n || w], p = y.call(e, "type") ? e.type : e, h = y.call(e, "namespace") ? e.namespace.split(".") : []; if (o = f = a = n = n || w, 3 !== n.nodeType && 8 !== n.nodeType && !st.test(p + E.event.triggered) && (-1 < p.indexOf(".") && (p = (h = p.split(".")).shift(), h.sort()), u = p.indexOf(":") < 0 && "on" + p, (e = e[E.expando] ? e : new E.Event(p, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : E.makeArray(t, [e]), c = E.event.special[p] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) { if (!r && !c.noBubble && !x(n)) { for (s = c.delegateType || p, st.test(s + p) || (o = o.parentNode); o; o = o.parentNode)d.push(o), a = o; a === (n.ownerDocument || w) && d.push(a.defaultView || a.parentWindow || g) } i = 0; while ((o = d[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || p, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && X(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault()); return e.type = p, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), t) || !X(n) || u && b(n[p]) && !x(n) && ((a = n[u]) && (n[u] = null), E.event.triggered = p, e.isPropagationStopped() && f.addEventListener(p, ut), n[p](), e.isPropagationStopped() && f.removeEventListener(p, ut), E.event.triggered = void 0, a && (n[u] = a)), e.result } }, simulate: function (e, t, n) { var r = E.extend(new E.Event, n, { type: e, isSimulated: !0 }); E.event.trigger(r, null, t) } }), E.fn.extend({ trigger: function (e, t) { return this.each(function () { E.event.trigger(e, t, this) }) }, triggerHandler: function (e, t) { var n = this[0]; if (n) return E.event.trigger(e, t, n, !0) } }), m.focusin || E.each({ focus: "focusin", blur: "focusout" }, function (n, r) { var i = function (e) { E.event.simulate(r, e.target, E.event.fix(e)) }; E.event.special[r] = { setup: function () { var e = this.ownerDocument || this.document || this, t = Y.access(e, r); t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1) }, teardown: function () { var e = this.ownerDocument || this.document || this, t = Y.access(e, r) - 1; t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r)) } } }), E.parseXML = function (e) { var t, n; if (!e || "string" != typeof e) return null; try { t = (new g.DOMParser).parseFromString(e, "text/xml") } catch (e) { } return n = t && t.getElementsByTagName("parsererror")[0], t && !n || E.error("Invalid XML: " + (n ? E.map(n.childNodes, function (e) { return e.textContent }).join("\n") : e)), t }; var lt, ct = /\[\]$/, ft = /\r?\n/g, dt = /^(?:submit|button|image|reset|file)$/i, pt = /^(?:input|select|textarea|keygen)/i; function ht(n, e, r, i) { var t; if (Array.isArray(e)) E.each(e, function (e, t) { r || ct.test(n) ? i(n, t) : ht(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i) }); else if (r || "object" !== T(e)) i(n, e); else for (t in e) ht(n + "[" + t + "]", e[t], r, i) } E.param = function (e, t) { var n, r = [], i = function (e, t) { var n = b(t) ? t() : t; r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n) }; if (null == e) return ""; if (Array.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, function () { i(this.name, this.value) }); else for (n in e) ht(n, e[n], t, i); return r.join("&") }, E.fn.extend({ serialize: function () { return E.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = E.prop(this, "elements"); return e ? E.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !E(this).is(":disabled") && pt.test(this.nodeName) && !dt.test(e) && (this.checked || !fe.test(e)) }).map(function (e, t) { var n = E(this).val(); return null == n ? null : Array.isArray(n) ? E.map(n, function (e) { return { name: t.name, value: e.replace(ft, "\r\n") } }) : { name: t.name, value: n.replace(ft, "\r\n") } }).get() } }), E.fn.extend({ wrapAll: function (e) { var t; return this[0] && (b(e) && (e = e.call(this[0])), t = E(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstElementChild) e = e.firstElementChild; return e }).append(this)), this }, wrapInner: function (n) { return b(n) ? this.each(function (e) { E(this).wrapInner(n.call(this, e)) }) : this.each(function () { var e = E(this), t = e.contents(); t.length ? t.wrapAll(n) : e.append(n) }) }, wrap: function (t) { var n = b(t); return this.each(function (e) { E(this).wrapAll(n ? t.call(this, e) : t) }) }, unwrap: function (e) { return this.parent(e).not("body").each(function () { E(this).replaceWith(this.childNodes) }), this } }), E.expr.pseudos.hidden = function (e) { return !E.expr.pseudos.visible(e) }, E.expr.pseudos.visible = function (e) { return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length) }, m.createHTMLDocument = ((lt = w.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === lt.childNodes.length), E.parseHTML = function (e, t, n) { return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((r = (t = w.implementation.createHTMLDocument("")).createElement("base")).href = w.location.href, t.head.appendChild(r)) : t = w), o = !n && [], (i = k.exec(e)) ? [t.createElement(i[1])] : (i = me([e], t, o), o && o.length && E(o).remove(), E.merge([], i.childNodes))); var r, i, o }, E.offset = { setOffset: function (e, t, n) { var r, i, o, a, s, u, l = E.css(e, "position"), c = E(e), f = {}; "static" === l && (e.style.position = "relative"), s = c.offset(), o = E.css(e, "top"), u = E.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), b(t) && (t = t.call(e, n, E.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f) } }, E.fn.extend({ offset: function (t) { if (arguments.length) return void 0 === t ? this : this.each(function (e) { E.offset.setOffset(this, t, e) }); var e, n, r = this[0]; return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset }) : { top: 0, left: 0 } : void 0 }, position: function () { if (this[0]) { var e, t, n, r = this[0], i = { top: 0, left: 0 }; if ("fixed" === E.css(r, "position")) t = r.getBoundingClientRect(); else { t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; while (e && (e === n.body || e === n.documentElement) && "static" === E.css(e, "position")) e = e.parentNode; e && e !== r && 1 === e.nodeType && ((i = E(e).offset()).top += E.css(e, "borderTopWidth", !0), i.left += E.css(e, "borderLeftWidth", !0)) } return { top: t.top - i.top - E.css(r, "marginTop", !0), left: t.left - i.left - E.css(r, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent; while (e && "static" === E.css(e, "position")) e = e.offsetParent; return e || re }) } }), E.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, i) { var o = "pageYOffset" === i; E.fn[t] = function (e) { return $(this, function (e, t, n) { var r; if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t]; r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n }, t, e, arguments.length) } }), E.each(["top", "left"], function (e, n) { E.cssHooks[n] = Me(m.pixelPosition, function (e, t) { if (t) return t = Be(e, n), Pe.test(t) ? E(e).position()[n] + "px" : t }) }), E.each({ Height: "height", Width: "width" }, function (a, s) { E.each({ padding: "inner" + a, content: s, "": "outer" + a }, function (r, o) { E.fn[o] = function (e, t) { var n = arguments.length && (r || "boolean" != typeof e), i = r || (!0 === e || !0 === t ? "margin" : "border"); return $(this, function (e, t, n) { var r; return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? E.css(e, t, i) : E.style(e, t, n, i) }, s, n ? e : void 0, n) } }) }), E.fn.extend({ bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) }, hover: function (e, t) { return this.mouseenter(e).mouseleave(t || e) } }), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) { E.fn[n] = function (e, t) { return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n) } }); var gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; E.proxy = function (e, t) { var n, r, i; if ("string" == typeof t && (n = e[t], t = e, e = n), b(e)) return r = s.call(arguments, 2), (i = function () { return e.apply(t || this, r.concat(s.call(arguments))) }).guid = e.guid = e.guid || E.guid++, i }, E.holdReady = function (e) { e ? E.readyWait++ : E.ready(!0) }, E.isArray = Array.isArray, E.parseJSON = JSON.parse, E.nodeName = S, E.isFunction = b, E.isWindow = x, E.camelCase = V, E.type = T, E.now = Date.now, E.isNumeric = function (e) { var t = E.type(e); return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e)) }, E.trim = function (e) { return null == e ? "" : (e + "").replace(gt, "") }, "function" == typeof define && define.amd && define("jquery", [], function () { return E }); var vt = g.jQuery, yt = g.$; return E.noConflict = function (e) { return g.$ === E && (g.$ = yt), e && g.jQuery === E && (g.jQuery = vt), E }, "undefined" == typeof e && (g.jQuery = g.$ = E), E });

/*! Slick 1.8.1 */
!function (i) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery) }(function (i) { "use strict"; var e = window.Slick || {}; (e = function () { var e = 0; return function (t, o) { var s, n = this; n.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: i(t), appendDots: i(t), arrows: !0, asNavFor: null, prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>', nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (e, t) { return i('<button type="button" />').text(t + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, focusOnChange: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, n.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, scrolling: !1, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, swiping: !1, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0) } }()).prototype.activateADA = function () { this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) { var s = this; if ("boolean" == typeof t) o = t, t = null; else if (t < 0 || t >= s.slideCount) return !1; s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) { i(t).attr("data-slick-index", e) }), s.$slidesCache = s.$slides, s.reinit() }, e.prototype.animateHeight = function () { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0); i.$list.animate({ height: e }, i.options.speed) } }, e.prototype.animateSlide = function (e, t) { var o = {}, s = this; s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({ left: e }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({ top: e }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({ animStart: s.currentLeft }).animate({ animStart: e }, { duration: s.options.speed, easing: s.options.easing, step: function (i) { i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o)) }, complete: function () { t && t.call() } })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () { s.disableTransition(), t.call() }, s.options.speed)) }, e.prototype.getNavTarget = function () { var e = this, t = e.options.asNavFor; return t && null !== t && (t = i(t).not(e.$slider)), t }, e.prototype.asNavFor = function (e) { var t = this.getNavTarget(); null !== t && "object" == typeof t && t.each(function () { var t = i(this).slick("getSlick"); t.unslicked || t.slideHandler(e, !0) }) }, e.prototype.applyTransition = function (i) { var e = this, t = {}; !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.autoPlay = function () { var i = this; i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed)) }, e.prototype.autoPlayClear = function () { var i = this; i.autoPlayTimer && clearInterval(i.autoPlayTimer) }, e.prototype.autoPlayIterator = function () { var i = this, e = i.currentSlide + i.options.slidesToScroll; i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e)) }, e.prototype.buildArrows = function () { var e = this; !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, e.prototype.buildDots = function () { var e, t, o = this; if (!0 === o.options.dots) { for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1)t.append(i("<li />").append(o.options.customPaging.call(this, o, e))); o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active") } }, e.prototype.buildOut = function () { var e = this; e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) { i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "") }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable") }, e.prototype.buildRows = function () { var i, e, t, o, s, n, r, l = this; if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) { for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) { var d = document.createElement("div"); for (e = 0; e < l.options.rows; e++) { var a = document.createElement("div"); for (t = 0; t < l.options.slidesPerRow; t++) { var c = i * r + (e * l.options.slidesPerRow + t); n.get(c) && a.appendChild(n.get(c)) } d.appendChild(a) } o.appendChild(d) } l.$slider.empty().append(o), l.$slider.children().children().children().css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" }) } }, e.prototype.checkResponsive = function (e, t) { var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width(); if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) { s = null; for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o])); null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l]) } }, e.prototype.changeSlide = function (e, t) { var o, s, n, r = this, l = i(e.currentTarget); switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) { case "previous": s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t); break; case "next": s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t); break; case "index": var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll; r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus"); break; default: return } }, e.prototype.checkNavigable = function (i) { var e, t; if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1]; else for (var o in e) { if (i < e[o]) { i = t; break } t = e[o] } return i }, e.prototype.cleanUpEvents = function () { var e = this; e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition) }, e.prototype.cleanUpSlideEvents = function () { var e = this; e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.cleanUpRows = function () { var i, e = this; e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i)) }, e.prototype.clickHandler = function (i) { !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault()) }, e.prototype.destroy = function (e) { var t = this; t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { i(this).attr("style", i(this).data("originalStyling")) }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t]) }, e.prototype.disableTransition = function (i) { var e = this, t = {}; t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t) }, e.prototype.fadeSlide = function (i, e) { var t = this; !1 === t.cssTransitions ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }), t.$slides.eq(i).animate({ opacity: 1 }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }), e && setTimeout(function () { t.disableTransition(i), e.call() }, t.options.speed)) }, e.prototype.fadeSlideOut = function (i) { var e = this; !1 === e.cssTransitions ? e.$slides.eq(i).animate({ opacity: 0, zIndex: e.options.zIndex - 2 }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 })) }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) { var e = this; null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit()) }, e.prototype.focusHandler = function () { var e = this; e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) { t.stopImmediatePropagation(); var o = i(this); setTimeout(function () { e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay()) }, 0) }) }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () { return this.currentSlide }, e.prototype.getDotCount = function () { var i = this, e = 0, t = 0, o = 0; if (!0 === i.options.infinite) if (i.slideCount <= i.options.slidesToShow) ++o; else for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (!0 === i.options.centerMode) o = i.slideCount; else if (i.options.asNavFor) for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll); return o - 1 }, e.prototype.getLeft = function (i) { var e, t, o, s, n = this, r = 0; return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e }, e.prototype.getOption = e.prototype.slickGetOption = function (i) { return this.options[i] }, e.prototype.getNavigableIndexes = function () { var i, e = this, t = 0, o = 0, s = []; for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;)s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow; return s }, e.prototype.getSlick = function () { return this }, e.prototype.getSlideCount = function () { var e, t, o = this; return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) { if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1 }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) { this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e) }, e.prototype.init = function (e) { var t = this; i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay()) }, e.prototype.initADA = function () { var e = this, t = Math.ceil(e.slideCount / e.options.slidesToShow), o = e.getNavigableIndexes().filter(function (i) { return i >= 0 && i < e.slideCount }); e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) { var s = o.indexOf(t); i(this).attr({ role: "tabpanel", id: "slick-slide" + e.instanceUid + t, tabindex: -1 }), -1 !== s && i(this).attr({ "aria-describedby": "slick-slide-control" + e.instanceUid + s }) }), e.$dots.attr("role", "tablist").find("li").each(function (s) { var n = o[s]; i(this).attr({ role: "presentation" }), i(this).find("button").first().attr({ role: "tab", id: "slick-slide-control" + e.instanceUid + s, "aria-controls": "slick-slide" + e.instanceUid + n, "aria-label": s + 1 + " of " + t, "aria-selected": null, tabindex: "-1" }) }).eq(e.currentSlide).find("button").attr({ "aria-selected": "true", tabindex: "0" }).end()); for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)e.$slides.eq(s).attr("tabindex", 0); e.activateADA() }, e.prototype.initArrowEvents = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler))) }, e.prototype.initDotEvents = function () { var e = this; !0 === e.options.dots && (i("li", e.$dots).on("click.slick", { message: "index" }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1)) }, e.prototype.initSlideEvents = function () { var e = this; e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1))) }, e.prototype.initializeEvents = function () { var e = this; e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", { action: "start" }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", { action: "move" }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", { action: "end" }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition) }, e.prototype.initUI = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show() }, e.prototype.keyHandler = function (i) { var e = this; i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({ data: { message: !0 === e.options.rtl ? "next" : "previous" } }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({ data: { message: !0 === e.options.rtl ? "previous" : "next" } })) }, e.prototype.lazyLoad = function () { function e(e) { i("img[data-lazy]", e).each(function () { var e = i(this), t = i(this).attr("data-lazy"), o = i(this).attr("data-srcset"), s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"), r = document.createElement("img"); r.onload = function () { e.animate({ opacity: 0 }, 100, function () { o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({ opacity: 1 }, 200, function () { e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading") }), n.$slider.trigger("lazyLoaded", [n, e, t]) }) }, r.onerror = function () { e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]) }, r.src = t }) } var t, o, s, n = this; if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad) for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++; e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)) }, e.prototype.loadSlider = function () { var i = this; i.setPosition(), i.$slideTrack.css({ opacity: 1 }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad() }, e.prototype.next = e.prototype.slickNext = function () { this.changeSlide({ data: { message: "next" } }) }, e.prototype.orientationChange = function () { var i = this; i.checkResponsive(), i.setPosition() }, e.prototype.pause = e.prototype.slickPause = function () { var i = this; i.autoPlayClear(), i.paused = !0 }, e.prototype.play = e.prototype.slickPlay = function () { var i = this; i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1 }, e.prototype.postSlide = function (e) { var t = this; t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus())) }, e.prototype.prev = e.prototype.slickPrev = function () { this.changeSlide({ data: { message: "previous" } }) }, e.prototype.preventDefault = function (i) { i.preventDefault() }, e.prototype.progressiveLazyLoad = function (e) { e = e || 1; var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider); d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () { s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad() }, r.onerror = function () { e < 3 ? setTimeout(function () { l.progressiveLazyLoad(e + 1) }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad()) }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l]) }, e.prototype.refresh = function (e) { var t, o, s = this; o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, { currentSlide: t }), s.init(), e || s.changeSlide({ data: { message: "index", index: t } }, !1) }, e.prototype.registerBreakpoints = function () { var e, t, o, s = this, n = s.options.responsive || null; if ("array" === i.type(n) && n.length) { s.respondTo = s.options.respondTo || "window"; for (e in n) if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) { for (t = n[e].breakpoint; o >= 0;)s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--; s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings } s.breakpoints.sort(function (i, e) { return s.options.mobileFirst ? i - e : e - i }) } }, e.prototype.reinit = function () { var e = this; e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e]) }, e.prototype.resize = function () { var e = this; i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () { e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition() }, 50)) }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) { var o = this; if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1; o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit() }, e.prototype.setCSS = function (i) { var e, t, o = this, s = {}; !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s))) }, e.prototype.setDimensions = function () { var i = this; !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({ padding: "0px " + i.options.centerPadding }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({ padding: i.options.centerPadding + " 0px" })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length))); var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width(); !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e) }, e.prototype.setFade = function () { var e, t = this; t.$slides.each(function (o, s) { e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({ position: "relative", right: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) : i(s).css({ position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0 }) }), t.$slides.eq(t.currentSlide).css({ zIndex: t.options.zIndex - 1, opacity: 1 }) }, e.prototype.setHeight = function () { var i = this; if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) { var e = i.$slides.eq(i.currentSlide).outerHeight(!0); i.$list.css("height", e) } }, e.prototype.setOption = e.prototype.slickSetOption = function () { var e, t, o, s, n, r = this, l = !1; if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s; else if ("multiple" === n) i.each(o, function (i, e) { r.options[i] = e }); else if ("responsive" === n) for (t in s) if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]]; else { for (e = r.options.responsive.length - 1; e >= 0;)r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--; r.options.responsive.push(s[t]) } l && (r.unload(), r.reinit()) }, e.prototype.setPosition = function () { var i = this; i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i]) }, e.prototype.setProps = function () { var i = this, e = document.body.style; i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType }, e.prototype.setSlideClasses = function (i) { var e, t, o, s, n = this; if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) { var r = n.options.slidesToShow % 2 == 0 ? 1 : 0; e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center") } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")); "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad() }, e.prototype.setupInfinite = function () { var e, t, o, s = this; if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) { for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned"); for (e = 0; e < o + s.slideCount; e += 1)t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned"); s.$slideTrack.find(".slick-cloned").find("[id]").each(function () { i(this).attr("id", "") }) } }, e.prototype.interrupt = function (i) { var e = this; i || e.autoPlay(), e.interrupted = i }, e.prototype.selectHandler = function (e) { var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index")); s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s) }, e.prototype.slideHandler = function (i, e, t) { var o, s, n, r, l, d = null, a = this; if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i)) if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () { a.postSlide(o) }) : a.postSlide(o)); else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function () { a.postSlide(o) }) : a.postSlide(o)); else { if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function () { a.postSlide(s) })) : a.postSlide(s), void a.animateHeight(); !0 !== t ? a.animateSlide(d, function () { a.postSlide(s) }) : a.postSlide(s) } }, e.prototype.startLoad = function () { var i = this; !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading") }, e.prototype.swipeDirection = function () { var i, e, t, o, s = this; return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical" }, e.prototype.swipeEnd = function (i) { var e, t, o = this; if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1; if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1; if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) { switch (t = o.swipeDirection()) { case "left": case "down": e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0; break; case "right": case "up": e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1 }"vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t])) } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {}) }, e.prototype.swipeHandler = function (i) { var e = this; if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) { case "start": e.swipeStart(i); break; case "move": e.swipeMove(i); break; case "end": e.swipeEnd(i) } }, e.prototype.swipeMove = function (i) { var e, t, o, s, n, r, l = this; return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft)))) }, e.prototype.swipeStart = function (i) { var e, t = this; if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1; void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0 }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () { var i = this; null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit()) }, e.prototype.unload = function () { var e = this; i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, e.prototype.unslick = function (i) { var e = this; e.$slider.trigger("unslick", [e, i]), e.destroy() }, e.prototype.updateArrows = function () { var i = this; Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, e.prototype.updateDots = function () { var i = this; null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active")) }, e.prototype.visibility = function () { var i = this; i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1) }, i.fn.slick = function () { var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length; for (i = 0; i < r; i++)if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t; return o } });

/**
 * Vanilla Javascript Sticky Table v1.0.4
 * https://zhitkovkostya.github.io/sticky-table
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).StickyTable=t()}(this,function(){"use strict";return class{constructor(e){this.originalTableElement=e,this.wrapperElement=this._wrapTable(),this.originalTableWrapperElement=this._wrapTableBody(),this.fixedTableWrapperElement=this._wrapTableHead(),this.fixedTableElement=this.fixedTableWrapperElement.querySelector("table"),this.scrollLeft=this.originalTableElement.scrollLeft,this._handleWindowScrollThrottled=this._throttle(this._handleWindowScroll.bind(this),20),this._handleWindowResizeThrottled=this._throttle(this._handleWindowResize.bind(this),20),this._handleFixedTableWrapperScrollThrottled=this._throttle(this._handleFixedTableWrapperScroll.bind(this),20),this._handleOriginalTableWrapperScrollThrottled=this._throttle(this._handleOriginalTableWrapperScroll.bind(this),20),this._syncColumnWidth(),this._syncHeadPosition(),this.fixedTableWrapperElement.addEventListener("scroll",this._handleFixedTableWrapperScrollThrottled,!1),this.originalTableWrapperElement.addEventListener("scroll",this._handleOriginalTableWrapperScrollThrottled,!1),window.addEventListener("scroll",this._handleWindowScrollThrottled,!1),window.addEventListener("resize",this._handleWindowResizeThrottled)}_wrapTable(){const e=document.createElement("div");return e.className="js-table-wrapper",this.originalTableElement&&this.originalTableElement.parentNode&&(this.originalTableElement.parentNode.insertBefore(e,this.originalTableElement),e.appendChild(this.originalTableElement)),e}_wrapTableHead(){const e=this.originalTableElement?this.originalTableElement.tHead:null;if(!e)throw new Error("<thead> is missing");var t=e.cloneNode(!0);const l=document.createElement("div");var i=document.createElement("table");return this._toggleHeadVisibility(e,!1),l.className="js-table-head-wrapper",l.dataset.isFixed="false",l.style.overflowX="auto",l.ariaHidden="true",l.appendChild(i).appendChild(t),this.wrapperElement&&this.originalTableWrapperElement&&this.wrapperElement.insertBefore(l,this.originalTableWrapperElement),l}_wrapTableBody(){const e=document.createElement("div");return e.className="js-table-body-wrapper",e.style.overflowX="auto",this.originalTableElement&&this.wrapperElement&&(this.wrapperElement.insertBefore(e,this.originalTableElement),e.appendChild(this.originalTableElement)),e}_syncColumnWidth(){var t=this.fixedTableElement,e=this.originalTableElement;if(t&&e&&e.tHead&&t.tHead)for(const i of e.tHead.rows)for(const r of i.cells){const a=t.tHead.rows[i.rowIndex].cells[r.cellIndex];var l=window.getComputedStyle(r);let e=Number(r.getBoundingClientRect().width.toFixed(2));"content-box"===l.boxSizing&&(e-=parseFloat(l.paddingLeft),e-=parseFloat(l.paddingRight)),a.style.minWidth=e+"px",a.style.maxWidth=e+"px"}}_syncFixedTableWrapperWidth(){var e,t;this.fixedTableWrapperElement&&this.originalTableWrapperElement&&(e=this.fixedTableWrapperElement.getBoundingClientRect()["width"],t=this.originalTableWrapperElement.getBoundingClientRect()["width"],e!==t&&(this.fixedTableWrapperElement.style.width=t+"px"))}_syncHeadPosition(){if(this.fixedTableWrapperElement&&this.originalTableWrapperElement){let e="true"===this.fixedTableWrapperElement.dataset.isFixed;var t=this.fixedTableWrapperElement.getBoundingClientRect()["height"],{top:l,width:i,height:r}=this.originalTableWrapperElement.getBoundingClientRect(),a=2*t,n=(e?0:t)<=l,s=r+l-t<=0;e&&(n||s)?(this.fixedTableWrapperElement.style.position="",this.fixedTableWrapperElement.style.top="",this.fixedTableWrapperElement.style.zIndex="",this.fixedTableWrapperElement.style.width="",this.originalTableWrapperElement.style.paddingTop="",this.fixedTableWrapperElement.dataset.isFixed="false",e=!1):e||n||s||(this.fixedTableWrapperElement.style.position="fixed",this.fixedTableWrapperElement.style.top="0",this.fixedTableWrapperElement.style.zIndex="2",this.fixedTableWrapperElement.style.width=i+"px",this.originalTableWrapperElement.style.paddingTop=t+"px",this.fixedTableWrapperElement.dataset.isFixed="true",e=!0),this.fixedTableWrapperElement.style.transform=e&&r+l<a?`translate3d(0, ${r+l-a}px, 0)`:""}}_syncHorizontalScroll(e,t){e=e.scrollLeft;this.scrollLeft!==e&&(this.scrollLeft=e,t.scrollLeft=e)}_toggleHeadVisibility(e,t=!1){if(!e)throw new Error("<thead> is missing");const l=Array.from(e.rows);var i=l.map(e=>Array.from(e.cells));const r=[].concat(...i);e.style.visibility=t?"":"collapse",r.forEach(e=>{e.style.height=t?"":"0",e.style.paddingTop=t?"":"0",e.style.paddingBottom=t?"":"0",e.style.lineHeight=t?"":"0"})}_handleFixedTableWrapperScroll(e){this.fixedTableWrapperElement&&this.originalTableWrapperElement&&this._syncHorizontalScroll(this.fixedTableWrapperElement,this.originalTableWrapperElement)}_handleOriginalTableWrapperScroll(e){this.fixedTableWrapperElement&&this.originalTableWrapperElement&&this._syncHorizontalScroll(this.originalTableWrapperElement,this.fixedTableWrapperElement)}_handleWindowScroll(){this._syncHeadPosition()}_handleWindowResize(){this._syncColumnWidth(),this._syncFixedTableWrapperWidth()}_throttle(t,l=100){let i=null;return(...e)=>{null===i&&(i=setTimeout(()=>{t.apply(this,e),i=null},l))}}destroy(){var e,t,l;for(window.removeEventListener("scroll",this._handleWindowScrollThrottled,!1),window.removeEventListener("resize",this._handleWindowResizeThrottled),null!==(l=this.fixedTableWrapperElement)&&void 0!==l&&l.removeEventListener("scroll",this._handleFixedTableWrapperScrollThrottled,!1),null!==(l=this.originalTableWrapperElement)&&void 0!==l&&l.removeEventListener("scroll",this._handleOriginalTableWrapperScrollThrottled,!1);null!==(e=this.originalTableWrapperElement)&&void 0!==e&&e.firstChild;)null!==(e=this.wrapperElement)&&void 0!==e&&e.insertBefore(null===(e=this.originalTableWrapperElement)||void 0===e?void 0:e.firstChild,this.originalTableWrapperElement);for(;null!==(t=this.wrapperElement)&&void 0!==t&&t.firstChild;)null!==(t=this.wrapperElement.parentElement)&&void 0!==t&&t.insertBefore(null===(t=this.wrapperElement)||void 0===t?void 0:t.firstChild,this.wrapperElement);this.originalTableElement&&this.originalTableElement.tHead&&this._toggleHeadVisibility(this.originalTableElement.tHead,!0),null!==(l=this.fixedTableWrapperElement)&&void 0!==l&&l.remove(),null!==(l=this.originalTableWrapperElement)&&void 0!==l&&l.remove(),null!==(l=this.wrapperElement)&&void 0!==l&&l.remove(),delete this.originalTableElement,delete this.fixedTableWrapperElement,delete this.fixedTableElement,delete this.originalTableWrapperElement,delete this.wrapperElement,delete this.scrollLeft}}});



document.addEventListener('DOMContentLoaded', () => {
	const tableElements = document.querySelectorAll('table');

	// console.log('tableElements', tableElements)

	tableElements.forEach(tableElement => {
		new window.StickyTable(tableElement);
	})
});



// Init slider 'Trust companies'
// -------------------------------//
if ($(window).width() < 992) {
	$('.trust-services-section-row').slick({
		slidesPerRow: 3,
		rows: 3,
		arrows: false,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesPerRow: 2,
				}
			},
		]
	});
}


// Iniit slider 'Additioanal service page Office'
// -------------------------------//
if ($(window).width() < 768) {
	$('.additional-services-slider').slick({
		slidesPerRow: 2,
		rows: 2,
		arrows: false,
		dots: true,
	});
}


// Service Day/Night
// -------------------------------//
$('.service-time-button').on('click', function () {
	$('.service-time').toggleClass('night-clear');
	if ($('.service-time').hasClass('night-clear')) {
		$('.service-time-item-day').removeClass('active');
		$('.service-time-item-night').addClass('active');
	} else {
		$('.service-time-item-night').removeClass('active');
		$('.service-time-item-day').addClass('active');
	}
});


// Slider Service Business
// -------------------------------//
if ($('.service-reviews-business-slide').length > 1) {

	var time = 5,
		$slider = $('.service-reviews-business-slider');

	var $bar,
		barRound,
		$slick,
		isPause,
		tick,
		percentTime;


	$bar = $('.service-reviews-progress-wrap .service-reviews-progress');
	$barRound = $('.service-reviews-progress');

	var $rbar = $('.service-reviews-progress circle');
	var rlen = 2 * Math.PI * $rbar.attr('r');


	$('.service-reviews-business-info').on({
		mouseenter: function () {
			if ($(window).width() > 1199) {
				isPause = true;
			}
		},
		mouseleave: function () {
			if ($(window).width() > 1199) {
				isPause = false;
			}
		}
	})


	function startProgressbar() {
		resetProgressbar();
		percentTime = 0;
		isPause = false;
		tick = setInterval(interval, 10);
	}


	function interval() {

		if (isPause === false) {
			percentTime += 1 / (time + 0.1);
			$rbar.css({
				'stroke-dasharray': rlen,
				'stroke-dashoffset': rlen * (1 - percentTime / 100)
			});

			if (percentTime >= 100) {
				$slider.slick('slickNext');
				startProgressbar();
			}
		}
	}


	function resetProgressbar() {
		clearTimeout(tick);
	}

	startProgressbar();


	$slider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: '.service-slider-next',
		prevArrow: '.service-slider-prev',
		dots: true,
		asNavFor: '.service-reviews-business-nav',
		fade: true,
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (isPause === true) {
			percentTime = 0;
			$rbar.css({
				'stroke-dasharray': 400 + 'px',
				'stroke-dashoffset': 400 + 'px'
			});
		}
		if ($(window).width() < 1199) {
			percentTime = 0;
			$rbar.css({
				'stroke-dasharray': 400 + 'px',
				'stroke-dashoffset': 400 + 'px'
			});
		}
	});

	$('.service-reviews-business-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.service-reviews-business-slider',
		centerMode: true,
		centerPadding: '0px',
		focusOnSelect: true,
		vertical: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					vertical: false,
					variableWidth: true
				}
			},
		]
	});
}

$(window).on('load', function() {
	if($(this).width() < 767) {
		$('.header-switcher').prependTo($('.main-menu-drawer'));
		if($('.main-menu-drawer').find('.header-switcher').length > 0) {
			$('.main-menu-drawer').find('.header-switcher').nextAll('.header-switcher').remove();
		}
	} else {
		$('.main-menu-drawer').find('.header-switcher').remove();
	}
});



const toggleItemBase = document.getElementById('toogle-tabs-item-base');
const toggleItemSupport = document.getElementById('toogle-tabs-item-support');
const cleaningTypeItem = document.getElementById('calculatorCleaningType');
// console.info('toggleItemBase');
// console.info('toggleItemSupport');
// console.info('cleaningTypeItem');

if (toggleItemBase && cleaningTypeItem) {
	toggleItemBase.addEventListener('click', function () {
		cleaningTypeItem.innerHTML = i18n[lang]['calcTypeBase'];
	})
}

if (toggleItemSupport && cleaningTypeItem) {
	toggleItemSupport.addEventListener('click', function () {
		cleaningTypeItem.innerHTML =  i18n[lang]['calcTypeSustaining'];
	})
}

const btnFaq = document.getElementById('btn-faq');
if (btnFaq) {
	btnFaq.addEventListener('click', function () {
		setTimeout(function () {
			window.BinotelCallTracking[505735].replacePhoneNumbersOnDynamicContent();
			}, 3000);
	})
}
// $('.btn-order').on('click', function(){
// 	console.log('btn click')
// 	$(document).ajaxStop(function() {
// 		console.log('ajax stop')
// 		if($('.modal-overlay').length){
// 			console.log('modal')
// 		}
// 	});
// });


// $(document).ajaxStop(function() {
// 	console.log('ajax stop')
// 	if($('.modal-overlay').length){
// 		console.log('modal')
// 	}
// });




//Career modal
new Request(document.querySelectorAll('.btn-career'), {
	event: 'click',
	action: function (el) {
		return el.dataset.action;
	},
	callback: function (response) {
		careerForm(response);
	},
	done: function () {
		document.location.reload(true);
	}
});


function careerForm(response) {
	const modal = new Modal(response.responseText);
	new Dropdown(modal.modal.querySelectorAll('.select-input'));
	new Mask(modal.modal.querySelectorAll('.tel-mask-input'));

	new Request(modal.modal.querySelectorAll('form'), {
		event: 'submit',
		action: function (el) {
			$('.btn-order-loader').addClass('send');
			return el.dataset.action;
		},
		formdata: function (el) {
			return JSON.stringify({
				position: el.querySelector('.dropdown-select-title').textContent
			});
		},
		callback: function (response, el) {
			$('.btn-order-loader.send').addClass('success');
			setTimeout(() => {
				window.location.href = i18n[lang].redirect;
			}, 1000)
		},
		done: function () {
			document.location.reload(true);
		}
	});
}



// Feedback form
// $('.feedback-form').on('submit', function (e) {
// 	e.preventDefault();
//
// 	let data = {
// 		'name' : $(this).find('input[name=name]').val(),
// 		'tel' : $(this).find('input[name=tel]').val()
// 	};
//
// 	jQuery.ajax({
// 		url: lang + '/wp-admin/admin-ajax.php',
// 		type: 'POST',
// 		data: {
// 			action: $(this).data('action'),
// 			data: data,
// 		},
// 		dataType: 'json',
//
// 		success: function (xhr) {
// 			if (xhr.success === true) {
// 				$('.feedback-form').find('input[name=name]').val('');
// 				$('.feedback-form').find('input[name=tel]').val('');
// 				$('.feedback-form').find('.feedback-response').text('Thanks for your request!')
// 			}
// 		},
// 		error: function (xhr) {
// 			console.log('error', xhr);
// 		}
// 	});
//
// });




// Month calculator
// new Request(document.querySelectorAll('.month-calc-form'), {
// 	event: 'submit',
// 	action: function (el) {
// 		$('.btn-order-loader').addClass('send');
// 		return el.dataset.action;
// 	},
// 	formdata: function (form) {
// 		const el = document.querySelector('.month-calculator-section');
// 		const price = el.querySelector('.month-result-price-number');

// 		return JSON.stringify({
// 			rooms: el.querySelector('.month-calculator-header .toogle-tabs-active').textContent,
// 			type: el.querySelector('.month-calculator-column .toogle-tabs-active').textContent,
// 			services: el.querySelector('.month-result-time').textContent,
// 			total: price.dataset.total ? price.dataset.total : price.textContent
// 		});
// 	},
// 	callback: function (response, el) {
// 		$('.btn-order-loader.send').addClass('success');
// 		setTimeout(() => {
// 			window.location.href = i18n[lang].redirect;
// 		}, 1000);
// 	}
// });




$('.price-calc-form').on('submit', function (e){
	e.preventDefault();

	let _this = $(this),
		submit = $(this).find(':submit'),
		btn_type = $(submit).data('type'),
		wrapper = $(submit).closest('.wp-block-price-type-calculator'),
		rooms = $(wrapper).find('.price-calculator-header .toogle-tabs-active').text(),
		type = $(submit).closest('.price-calc-form').find('.toogle-tabs-active').text(),
		service = $(submit).closest('.price-calc-form').find('.month-result-time-number').text(),
		type_attr = $(submit).closest('.price-calc-form').find('.toogle-tabs-active').attr('data-type'),
		dataset = JSON.parse( $(wrapper).find('.price-calculator-header .toogle-tabs-active').attr('data-'+btn_type) ),
		price = dataset[type_attr].price,
		tel = $(this).find("input[name='tel']").val();

	$.ajax({
		url: '/wp-admin/admin-ajax.php',
		type: 'POST',
		data: {
			action: 'theme_price_calc_form',
			data: JSON.stringify({
				rooms: rooms,
				type: type,
				price: price,
				tel: tel
			}),
		},
		dataType: 'json',
		beforeSend: function() {
			$(submit).addClass('send');
		},
		success: function (xhr) {
			$(submit).addClass('success');
			setTimeout(() => {
				window.location.href = i18n[lang].redirect;
			}, 1000);
		},
		error: function (xhr) {
			console.log('error', xhr);
			$(submit).removeClass('send');
		}

	});

});



// Feedback form
$('.feedback-form').on('submit', function (e) {
	e.preventDefault();

	let data = {
		'name' : $(this).find('input[name=name]').val(),
		'tel' : $(this).find('input[name=tel]').val()
	};


	jQuery.ajax({
		url: lang + '/wp-admin/admin-ajax.php',
		type: 'POST',
		data: {
			action: $(this).data('action'),
			data: data,
		},
		dataType: 'json',
		beforeSend: function() {
			$('.feedback-form.btn-order-loader').addClass('send');
		},
		success: function (xhr) {
			if (xhr.success === true) {
				$('.feedback-form .btn-feedback').addClass('success');
				setTimeout(() => {
					window.location.href = i18n[lang].redirect;
				}, 1000);
			}
		},
		error: function (xhr) {
			console.log('error', xhr);
		}
	});

});
