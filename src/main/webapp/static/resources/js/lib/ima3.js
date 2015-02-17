// Copyright 2011 Google Inc. All Rights Reserved.
(function () {
    var g, l = this, p = function (a) {
        return void 0 !== a
    }, q = function (a, b, c) {
        a = a.split(".");
        c = c || l;
        a[0]in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());)!a.length && p(b) ? c[d] = b : c[d] ? c = c[d] : c = c[d] = {}
    }, aa = function (a, b) {
        for (var c = a.split("."), d = b || l, e; e = c.shift();)if (null != d[e])d = d[e]; else return null;
        return d
    }, ba = function (a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return"array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" ==
                c)return"object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return"array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return"function"
        } else return"null"; else if ("function" == b && "undefined" == typeof a.call)return"object";
        return b
    }, r = function (a) {
        return"array" == ba(a)
    }, ca = function (a) {
        var b = ba(a);
        return"array" ==
            b || "object" == b && "number" == typeof a.length
    }, t = function (a) {
        return"string" == typeof a
    }, da = function (a) {
        return"number" == typeof a
    }, ea = function (a) {
        return"function" == ba(a)
    }, fa = function (a) {
        var b = typeof a;
        return"object" == b && null != a || "function" == b
    }, ga = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, ha = function (a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b,
                    c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, u = function (a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ga : ha;
        return u.apply(null, arguments)
    }, ia = Date.now || function () {
        return+new Date
    }, v = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.R = b.prototype;
        a.prototype = new c;
        a.sd = function (a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    };
    Function.prototype.bind = Function.prototype.bind || function (a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return u.apply(null, c)
        }
        return u(this, a)
    };
    var ja;
    var ka = function (a) {
            return/^[\s\xa0]*$/.test(a)
        }, la = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, ta = function (a) {
            if (!ma.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(na, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(oa, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(pa, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(qa, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(ra, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(sa, "&#0;"));
            return a
        }, na = /&/g, oa = /</g,
        pa = />/g, qa = /"/g, ra = /'/g, sa = /\x00/g, ma = /[\x00&<>"']/, w = function (a, b) {
            return-1 != a.toLowerCase().indexOf(b.toLowerCase())
        }, ua = function (a) {
            return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
        }, va = function (a) {
            return null == a ? "" : String(a)
        }, xa = function (a, b) {
            for (var c = 0, d = la(String(a)).split("."), e = la(String(b)).split("."), f = Math.max(d.length, e.length), h = 0; 0 == c && h < f; h++) {
                var k = d[h] || "", n = e[h] || "", m = RegExp("(\\d*)(\\D*)", "g"), s = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var F = m.exec(k) ||
                        ["", "", ""], B = s.exec(n) || ["", "", ""];
                    if (0 == F[0].length && 0 == B[0].length)break;
                    c = wa(0 == F[1].length ? 0 : parseInt(F[1], 10), 0 == B[1].length ? 0 : parseInt(B[1], 10)) || wa(0 == F[2].length, 0 == B[2].length) || wa(F[2], B[2])
                } while (0 == c)
            }
            return c
        }, wa = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        }, ya = 2147483648 * Math.random() | 0, za = function () {
            return"transform".replace(/\-([a-z])/g, function (a, b) {
                return b.toUpperCase()
            })
        }, Ba = function (a) {
            var b = t(void 0) ? ua(void 0) : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"),
                function (a, b, e) {
                    return b + e.toUpperCase()
                })
        };
    var Ca = function (a) {
        Ca[" "](a);
        return a
    };
    Ca[" "] = function () {
    };
    var Da = function (a, b) {
        try {
            return Ca(a[b]), !0
        } catch (c) {
        }
        return!1
    };
    var Ea = function (a) {
        try {
            return!!a && null != a.location.href && Da(a, "foo")
        } catch (b) {
            return!1
        }
    };
    var Fa = document, x = window;
    var Ga = function (a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        if (a.stack) {
            a = a.stack;
            var c = b;
            try {
                -1 == a.indexOf(c) && (a = c + "\n" + a);
                for (var d; a != d;)d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                b = a.replace(/\n */g, "\n")
            } catch (e) {
                b = c
            }
        }
        return b
    };
    var Ha = function (a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    }, Ja = function (a) {
        if (!a)return!1;
        var b = !0;
        Ha(Ia.prototype, function (c, d) {
            b && d in a && typeof c == typeof a[d] || (b = !1)
        });
        return b
    };
    var Ka = !!window.g, La = Ka && window.parent || window, Ma = function () {
        if (Ka && !Ea(La)) {
            for (var a = "." + Fa.domain; 2 < a.split(".").length && !Ea(La);)Fa.domain = a = a.substr(a.indexOf(".") + 1), La = window.parent;
            Ea(La) || (La = window)
        }
        return La
    };
    var Na = Array.prototype, Oa = function (a, b) {
        if (t(a))return t(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
        for (var c = 0; c < a.length; c++)if (c in a && a[c] === b)return c;
        return-1
    }, y = function (a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, Pa = function (a, b, c) {
        for (var d = a.length, e = [], f = 0, h = t(a) ? a.split("") : a, k = 0; k < d; k++)if (k in h) {
            var n = h[k];
            b.call(c, n, k, a) && (e[f++] = n)
        }
        return e
    }, Qa = function (a, b, c) {
        for (var d = a.length, e = Array(d), f = t(a) ? a.split("") : a, h = 0; h < d; h++)h in f && (e[h] = b.call(c, f[h],
            h, a));
        return e
    }, Ra = function (a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return!0;
        return!1
    }, Ta = function (a, b, c) {
        b = Sa(a, b, c);
        return 0 > b ? null : t(a) ? a.charAt(b) : a[b]
    }, Sa = function (a, b, c) {
        for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
        return-1
    }, Va = function () {
        var a = Ua;
        if (!r(a))for (var b = a.length - 1; 0 <= b; b--)delete a[b];
        a.length = 0
    }, Wa = function (a) {
        return Na.concat.apply(Na, arguments)
    }, Xa = function (a) {
        var b = a.length;
        if (0 < b) {
            for (var c =
                Array(b), d = 0; d < b; d++)c[d] = a[d];
            return c
        }
        return[]
    }, Ya = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c], e;
            if (r(d) || (e = ca(d)) && Object.prototype.hasOwnProperty.call(d, "callee"))a.push.apply(a, d); else if (e)for (var f = a.length, h = d.length, k = 0; k < h; k++)a[f + k] = d[k]; else a.push(d)
        }
    }, Za = function (a, b, c) {
        return 2 >= arguments.length ? Na.slice.call(a, b) : Na.slice.call(a, b, c)
    }, $a = function (a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            r(d) ? b.push.apply(b, $a.apply(null, d)) : b.push(d)
        }
        return b
    };
    var Ia = function (a) {
        this.b = {};
        for (var b = 0, c = arguments.length; b < c; ++b)this.b[arguments[b]] = ""
    };
    Ia.prototype.xb = function (a) {
        return this.b.hasOwnProperty(a) ? this.b[a] : ""
    };
    Ia.prototype.geil = Ia.prototype.xb;
    var ab = !0, bb = {}, eb = function (a, b, c, d) {
        var e = cb, f, h = ab;
        try {
            f = b()
        } catch (k) {
            try {
                var n = Ga(k);
                b = "";
                k.fileName && (b = k.fileName);
                var m = -1;
                k.lineNumber && (m = k.lineNumber);
                h = e(a, n, b, m, c)
            } catch (s) {
                try {
                    var F = Ga(s);
                    a = "";
                    s.fileName && (a = s.fileName);
                    c = -1;
                    s.lineNumber && (c = s.lineNumber);
                    cb("pAR", F, a, c, void 0, void 0)
                } catch (B) {
                    db({context: "mRE", msg: B.toString() + "\n" + (B.stack || "")}, void 0)
                }
            }
            if (!h)throw k;
        } finally {
            if (d)try {
                d()
            } catch (Aa) {
            }
        }
        return f
    }, cb = function (a, b, c, d, e, f) {
        var h = {};
        if (e)try {
            e(h)
        } catch (k) {
        }
        h.context = a;
        h.msg =
            b.substring(0, 512);
        c && (h.file = c);
        0 < d && (h.line = d.toString());
        h.url = Fa.URL.substring(0, 512);
        h.ref = Fa.referrer.substring(0, 512);
        fb(h);
        db(h, f);
        return ab
    }, db = function (a, b) {
        try {
            if (Math.random() < (b || .01)) {
                var c = "/pagead/gen_204?id=jserror" + gb(a), d = "http" + ("http:" == x.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c, c = d = d.substring(0, 2E3);
                x.google_image_requests || (x.google_image_requests = []);
                var e = x.document.createElement("img");
                e.src = c;
                x.google_image_requests.push(e)
            }
        } catch (f) {
        }
    }, fb = function (a) {
        var b =
            a || {};
        Ha(bb, function (a, d) {
            b[d] = x[a]
        })
    }, hb = function (a, b, c, d, e) {
        return function () {
            var f = arguments;
            return eb(a, function () {
                return b.apply(c, f)
            }, d, e)
        }
    }, ib = function (a, b) {
        return hb(a, b, void 0, void 0, void 0)
    }, gb = function (a) {
        var b = "";
        Ha(a, function (a, d) {
            if (0 === a || a)b += "&" + d + "=" + ("function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a))
        });
        return b
    };
    var jb = function (a) {
        for (var b = a, c = 0; a != a.parent;)a = a.parent, c++, Ea(a) && (b = a);
        return b
    };
    var mb = function (a) {
        this.S = a;
        z(this, 3, null);
        z(this, 4, 0);
        z(this, 5, 0);
        z(this, 6, 0);
        z(this, 15, 0);
        z(this, 7, "C" == Ma().google_pstate_rc_expt ? (new Date).getTime() : Math.floor(Math.random() * Math.pow(2, 43)));
        z(this, 8, {});
        z(this, 9, {});
        z(this, 10, {});
        z(this, 11, []);
        z(this, 12, 0);
        a = Ma();
        if (kb(a)) {
            var b;
            b = a.b || {};
            b = this.S[lb(14)] = b;
            a.b = b
        } else z(this, 14, {})
    }, nb = {}, kb = function (a) {
        return"E" == a.google_pstate_expt || "EU" == a.google_pstate_expt
    }, pb = function () {
        var a = Ma();
        if (kb(a)) {
            var b;
            t:{
                var c, d;
                try {
                    var e = a.google_pstate;
                    if (c = ob(e)) {
                        e.C = (e.C || 0) + 1;
                        b = e;
                        break t
                    }
                } catch (f) {
                    d = Ga(f)
                }
                db({context: "ps::eg", msg: d, L: p(c) ? c ? 1 : 0 : 2, url: a.location.href}, 1);
                b = a.google_pstate = new mb({})
            }
            return b
        }
        b = Ka ? "google_persistent_state_async" : "google_persistent_state";
        if (nb[b])return nb[b];
        c = "google_persistent_state_async" == b ? {} : a;
        d = a[b];
        return ob(d) ? nb[b] = d : a[b] = nb[b] = new mb(c)
    }, ob = function (a) {
        return"object" == typeof a && "object" == typeof a.S
    }, lb = function (a) {
        switch (a) {
            case 3:
                return"google_exp_persistent";
            case 4:
                return"google_num_sdo_slots";
            case 5:
                return"google_num_0ad_slots";
            case 6:
                return"google_num_ad_slots";
            case 7:
                return"google_correlator";
            case 8:
                return"google_prev_ad_formats_by_region";
            case 9:
                return"google_prev_ad_slotnames_by_region";
            case 10:
                return"google_num_slots_by_channel";
            case 11:
                return"google_viewed_host_channels";
            case 12:
                return"google_num_slot_to_show";
            case 14:
                return"gaGlobal";
            case 15:
                return"google_num_reactive_ad_slots"
        }
        throw Error("unexpected state");
    }, z = function (a, b, c) {
        a = a.S;
        b = lb(b);
        void 0 === a[b] && (a[b] = c)
    };
    var qb, rb = function () {
        if (qb)return!0;
        var a;
        a = pb();
        var b = lb(3);
        return(a = a.S[b]) && a && ("object" == typeof a || "function" == typeof a) && Ja(a) ? (qb = a, !0) : !1
    };
    var sb = "StopIteration"in l ? l.StopIteration : Error("StopIteration"), tb = function () {
    };
    tb.prototype.next = function () {
        throw sb;
    };
    tb.prototype.ra = function () {
        return this
    };
    var ub = function (a) {
        if (a instanceof tb)return a;
        if ("function" == typeof a.ra)return a.ra(!1);
        if (ca(a)) {
            var b = 0, c = new tb;
            c.next = function () {
                for (; ;) {
                    if (b >= a.length)throw sb;
                    if (b in a)return a[b++];
                    b++
                }
            };
            return c
        }
        throw Error("Not implemented");
    }, wb = function (a, b, c) {
        if (ca(a))try {
            y(a, b, c)
        } catch (d) {
            if (d !== sb)throw d;
        } else {
            a = ub(a);
            try {
                for (; ;)b.call(c, a.next(), void 0, a)
            } catch (e) {
                if (e !== sb)throw e;
            }
        }
    };
    var xb = function (a, b, c) {
            for (var d in a)b.call(c, a[d], d, a)
        }, zb = function (a) {
            var b = yb, c;
            for (c in b)if (a.call(void 0, b[c], c, b))return!0;
            return!1
        }, Ab = function (a) {
            var b = [], c = 0, d;
            for (d in a)b[c++] = a[d];
            return b
        }, Bb = function (a) {
            var b = [], c = 0, d;
            for (d in a)b[c++] = d;
            return b
        }, Db = function (a) {
            var b = Cb, c;
            for (c in b)if (a.call(void 0, b[c], c, b))return c
        }, Eb = function (a) {
            var b = {}, c;
            for (c in a)b[c] = a[c];
            return b
        }, Fb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        Gb = function (a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d)a[c] = d[c];
                for (var f = 0; f < Fb.length; f++)c = Fb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var A = function (a, b) {
        this.g = {};
        this.b = [];
        this.j = this.h = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)Hb(this, arguments[d], arguments[d + 1])
        } else if (a) {
            a instanceof A ? (c = a.ia(), d = a.$()) : (c = Bb(a), d = Ab(a));
            for (var e = 0; e < c.length; e++)Hb(this, c[e], d[e])
        }
    };
    g = A.prototype;
    g.ga = function () {
        return this.h
    };
    g.$ = function () {
        Ib(this);
        for (var a = [], b = 0; b < this.b.length; b++)a.push(this.g[this.b[b]]);
        return a
    };
    g.ia = function () {
        Ib(this);
        return this.b.concat()
    };
    g.isEmpty = function () {
        return 0 == this.h
    };
    g.clear = function () {
        this.g = {};
        this.j = this.h = this.b.length = 0
    };
    var Kb = function (a, b) {
        Jb(a.g, b) && (delete a.g[b], a.h--, a.j++, a.b.length > 2 * a.h && Ib(a))
    }, Ib = function (a) {
        if (a.h != a.b.length) {
            for (var b = 0, c = 0; b < a.b.length;) {
                var d = a.b[b];
                Jb(a.g, d) && (a.b[c++] = d);
                b++
            }
            a.b.length = c
        }
        if (a.h != a.b.length) {
            for (var e = {}, c = b = 0; b < a.b.length;)d = a.b[b], Jb(e, d) || (a.b[c++] = d, e[d] = 1), b++;
            a.b.length = c
        }
    };
    A.prototype.get = function (a, b) {
        return Jb(this.g, a) ? this.g[a] : b
    };
    var Hb = function (a, b, c) {
        Jb(a.g, b) || (a.h++, a.b.push(b), a.j++);
        a.g[b] = c
    };
    A.prototype.forEach = function (a, b) {
        for (var c = this.ia(), d = 0; d < c.length; d++) {
            var e = c[d], f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    A.prototype.clone = function () {
        return new A(this)
    };
    A.prototype.ra = function (a) {
        Ib(this);
        var b = 0, c = this.b, d = this.g, e = this.j, f = this, h = new tb;
        h.next = function () {
            for (; ;) {
                if (e != f.j)throw Error("The map has changed since the iterator was created");
                if (b >= c.length)throw sb;
                var h = c[b++];
                return a ? h : d[h]
            }
        };
        return h
    };
    var Jb = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var C;
    t:{
        var Lb = l.navigator;
        if (Lb) {
            var Mb = Lb.userAgent;
            if (Mb) {
                C = Mb;
                break t
            }
        }
        C = ""
    }
    var D = function (a) {
        return-1 != C.indexOf(a)
    };
    var Nb, Ob, Pb = D("Opera") || D("OPR"), E = D("Trident") || D("MSIE"), Qb = D("Gecko") && !w(C, "WebKit") && !(D("Trident") || D("MSIE")), Rb = w(C, "WebKit"), Sb = C;
    Nb = !!Sb && -1 != Sb.indexOf("Android");
    Ob = !!Sb && -1 != Sb.indexOf("iPhone");
    var Tb = !!Sb && -1 != Sb.indexOf("iPad"), Ub = function () {
        var a = l.document;
        return a ? a.documentMode : void 0
    }, Vb = function () {
        var a = "", b;
        if (Pb && l.opera)return a = l.opera.version, ea(a) ? a() : a;
        Qb ? b = /rv\:([^\);]+)(\)|;)/ : E ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Rb && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(C)) ? a[1] : "");
        return E && (b = Ub(), b > parseFloat(a)) ? String(b) : a
    }(), Wb = {}, G = function (a) {
        return Wb[a] || (Wb[a] = 0 <= xa(Vb, a))
    }, Xb = l.document, Yb = Xb && E ? Ub() || ("CSS1Compat" == Xb.compatMode ? parseInt(Vb, 10) : 5) : void 0;
    var Zb = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, ac = function (a) {
        if ($b) {
            $b = !1;
            var b = l.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = ac(c)[3] || null) ? decodeURI(c) : c) && c != b.hostname)throw $b = !0, Error();
            }
        }
        return a.match(Zb)
    }, $b = Rb, bc = /#|$/;
    var cc = function (a, b) {
        var c;
        a instanceof cc ? (this.fa = p(b) ? b : a.fa, dc(this, a.ea), this.Aa = a.Aa, this.Z = a.Z, ec(this, a.za), this.pa = a.pa, fc(this, a.b.clone()), this.ya = a.ya) : a && (c = ac(String(a))) ? (this.fa = !!b, dc(this, c[1] || "", !0), this.Aa = gc(c[2] || ""), this.Z = gc(c[3] || "", !0), ec(this, c[4]), this.pa = gc(c[5] || "", !0), fc(this, c[6] || "", !0), this.ya = gc(c[7] || "")) : (this.fa = !!b, this.b = new hc(null, 0, this.fa))
    };
    g = cc.prototype;
    g.ea = "";
    g.Aa = "";
    g.Z = "";
    g.za = null;
    g.pa = "";
    g.ya = "";
    g.fa = !1;
    g.toString = function () {
        var a = [], b = this.ea;
        b && a.push(ic(b, jc, !0), ":");
        if (b = this.Z) {
            a.push("//");
            var c = this.Aa;
            c && a.push(ic(c, jc, !0), "@");
            a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            b = this.za;
            null != b && a.push(":", String(b))
        }
        if (b = this.pa)this.Z && "/" != b.charAt(0) && a.push("/"), a.push(ic(b, "/" == b.charAt(0) ? kc : lc, !0));
        (b = this.b.toString()) && a.push("?", b);
        (b = this.ya) && a.push("#", ic(b, mc));
        return a.join("")
    };
    g.clone = function () {
        return new cc(this)
    };
    var dc = function (a, b, c) {
        a.ea = c ? gc(b, !0) : b;
        a.ea && (a.ea = a.ea.replace(/:$/, ""))
    }, nc = function (a) {
        return a.Z
    }, ec = function (a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)throw Error("Bad port number " + b);
            a.za = b
        } else a.za = null
    }, fc = function (a, b, c) {
        b instanceof hc ? (a.b = b, oc(a.b, a.fa)) : (c || (b = ic(b, pc)), a.b = new hc(b, 0, a.fa))
    }, gc = function (a, b) {
        return a ? b ? decodeURI(a) : decodeURIComponent(a) : ""
    }, ic = function (a, b, c) {
        return t(a) ? (a = encodeURI(a).replace(b, qc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
    }, qc = function (a) {
        a =
            a.charCodeAt(0);
        return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, jc = /[#\/\?@]/g, lc = /[\#\?:]/g, kc = /[\#\?]/g, pc = /[\#\?@]/g, mc = /#/g, hc = function (a, b, c) {
        this.h = a || null;
        this.j = !!c
    }, sc = function (a) {
        if (!a.b && (a.b = new A, a.g = 0, a.h))for (var b = a.h.split("&"), c = 0; c < b.length; c++) {
            var d = b[c].indexOf("="), e = null, f = null;
            0 <= d ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c];
            e = decodeURIComponent(e.replace(/\+/g, " "));
            e = rc(a, e);
            d = a;
            f = f ? decodeURIComponent(f.replace(/\+/g, " ")) : "";
            sc(d);
            d.h = null;
            var e = rc(d, e),
                h = d.b.get(e);
            h || Hb(d.b, e, h = []);
            h.push(f);
            d.g++
        }
    };
    hc.prototype.b = null;
    hc.prototype.g = null;
    hc.prototype.ga = function () {
        sc(this);
        return this.g
    };
    var tc = function (a, b) {
        sc(a);
        b = rc(a, b);
        Jb(a.b.g, b) && (a.h = null, a.g -= a.b.get(b).length, Kb(a.b, b))
    };
    hc.prototype.clear = function () {
        this.b = this.h = null;
        this.g = 0
    };
    hc.prototype.isEmpty = function () {
        sc(this);
        return 0 == this.g
    };
    var uc = function (a, b) {
        sc(a);
        b = rc(a, b);
        return Jb(a.b.g, b)
    };
    g = hc.prototype;
    g.ia = function () {
        sc(this);
        for (var a = this.b.$(), b = this.b.ia(), c = [], d = 0; d < b.length; d++)for (var e = a[d], f = 0; f < e.length; f++)c.push(b[d]);
        return c
    };
    g.$ = function (a) {
        sc(this);
        var b = [];
        if (t(a))uc(this, a) && (b = Wa(b, this.b.get(rc(this, a)))); else {
            a = this.b.$();
            for (var c = 0; c < a.length; c++)b = Wa(b, a[c])
        }
        return b
    };
    g.get = function (a, b) {
        var c = a ? this.$(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    g.toString = function () {
        if (this.h)return this.h;
        if (!this.b)return"";
        for (var a = [], b = this.b.ia(), c = 0; c < b.length; c++)for (var d = b[c], e = encodeURIComponent(String(d)), d = this.$(d), f = 0; f < d.length; f++) {
            var h = e;
            "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
            a.push(h)
        }
        return this.h = a.join("&")
    };
    g.clone = function () {
        var a = new hc;
        a.h = this.h;
        this.b && (a.b = this.b.clone(), a.g = this.g);
        return a
    };
    var rc = function (a, b) {
        var c = String(b);
        a.j && (c = c.toLowerCase());
        return c
    }, oc = function (a, b) {
        b && !a.j && (sc(a), a.h = null, a.b.forEach(function (a, b) {
            var e = b.toLowerCase();
            b != e && (tc(this, b), tc(this, e), 0 < a.length && (this.h = null, Hb(this.b, rc(this, e), Xa(a)), this.g += a.length))
        }, a));
        a.j = b
    };
    var vc = function (a) {
        var b;
        if (rb())b = qb; else {
            b = pb();
            var c = new Ia(2, 1, 3, 4, 7, 10, 12, 13, 14, 16, 17, 19, 20, 23, 24, 25, 26, 27);
            b = qb = b.S[lb(3)] = c
        }
        b = b.xb(10);
        if ("317150305" == b || "317150306" == b)return null;
        if (b = Ma().h)if (c = b[3], a && (c = b[4]), c)return c + "";
        return null
    };

    function wc(a, b) {
        var c = vc();
        return c ? c : b ? a.referrer : a.URL
    };
    var H = function (a, b, c) {
        this.j = b;
        this.b = c;
        this.h = a
    };
    g = H.prototype;
    g.Sa = function () {
        return this.g
    };
    g.zb = function () {
        return this.j
    };
    g.yb = function () {
        return this.b
    };
    g.qc = function () {
        return 1E3 > this.b ? this.b : 900
    };
    g.rc = function () {
        return this.h
    };
    g.toString = function () {
        return"AdError " + this.yb() + ": " + this.zb() + (null != this.Sa() ? " Caused by: " + this.Sa() : "")
    };
    var xc = function () {
        this.K = this.K;
        this.M = this.M
    };
    xc.prototype.K = !1;
    xc.prototype.F = function () {
        this.K || (this.K = !0, this.A())
    };
    xc.prototype.A = function () {
        if (this.M)for (; this.M.length;)this.M.shift()()
    };
    var yc = function (a) {
        a && "function" == typeof a.F && a.F()
    }, zc = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            ca(d) ? zc.apply(null, d) : yc(d)
        }
    };
    var I = function (a, b) {
        this.type = a;
        this.b = this.target = b;
        this.vb = !0
    };
    I.prototype.F = function () {
    };
    I.prototype.h = function () {
        this.vb = !1
    };
    var Ac = function (a, b) {
        I.call(this, "adError");
        this.g = a;
        this.j = b ? b : null
    };
    v(Ac, I);
    Ac.prototype.k = function () {
        return this.g
    };
    Ac.prototype.l = function () {
        return this.j
    };
    var J = function () {
        this.h = "always";
        this.k = 4;
        this.b = !1;
        this.g = !0;
        this.l = !1;
        this.j = "en"
    }, Bc = "af am ar bg bn ca cs da de el en en_gb es es_419 et eu fa fi fil fr fr_ca gl gu he hi hr hu id in is it iw ja kn ko lt lv ml mr ms nb nl no pl pt_br pt_pt ro ru sk sl sr sv sw ta te th tr uk ur vi zh_cn zh_hk zh_tw zu".split(" ");
    g = J.prototype;
    g.cd = function (a) {
        this.h = a
    };
    g.$a = function () {
        return this.h
    };
    g.dd = function (a) {
        this.k = a
    };
    g.ab = function () {
        return this.k
    };
    g.ed = function (a) {
        this.m = a
    };
    g.bb = function () {
        return this.m
    };
    g.od = function (a) {
        this.b = a
    };
    g.bd = function (a) {
        this.g = a
    };
    g.cb = function () {
        return this.g
    };
    g.nd = function (a) {
        this.l = a
    };
    g.oa = function () {
        return this.l
    };
    g.md = function (a) {
        if (null != a) {
            a = a.toLowerCase().replace("-", "_");
            if (!(0 <= Oa(Bc, a) || (a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "", 0 <= Oa(Bc, a))))return;
            this.j = a
        }
    };
    g.Ya = function () {
        return this.j
    };
    var Cc = new J;
    var Cb = {Bb: "start", FIRST_QUARTILE: "firstquartile", MIDPOINT: "midpoint", THIRD_QUARTILE: "thirdquartile", COMPLETE: "complete", jc: "metric", Ab: "pause", lc: "resume", SKIPPED: "skip", nc: "viewable_impression", kc: "mute", mc: "unmute", FULLSCREEN: "fullscreen", ic: "exitfullscreen"}, Dc = {Qd: -1, Bb: 0, FIRST_QUARTILE: 1, MIDPOINT: 2, THIRD_QUARTILE: 3, COMPLETE: 4, jc: 5, Ab: 6, lc: 7, SKIPPED: 8, nc: 9, kc: 10, mc: 11, FULLSCREEN: 12, ic: 13};
    var K = function (a, b) {
        this.x = p(a) ? a : 0;
        this.y = p(b) ? b : 0
    };
    K.prototype.clone = function () {
        return new K(this.x, this.y)
    };
    K.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    K.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    K.prototype.scale = function (a, b) {
        var c = da(b) ? b : a;
        this.x *= a;
        this.y *= c;
        return this
    };
    var L = function (a, b) {
        this.width = a;
        this.height = b
    };
    g = L.prototype;
    g.clone = function () {
        return new L(this.width, this.height)
    };
    g.isEmpty = function () {
        return!(this.width * this.height)
    };
    g.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    g.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    g.scale = function (a, b) {
        var c = da(b) ? b : a;
        this.width *= a;
        this.height *= c;
        return this
    };
    var Ec = !E || E && 9 <= Yb;
    !Qb && !E || E && E && 9 <= Yb || Qb && G("1.9.1");
    E && G("9");
    var Hc = function (a) {
        return a ? new Fc(Gc(a)) : ja || (ja = new Fc)
    }, Ic = function () {
        var a = document;
        return a.querySelectorAll && a.querySelector ? a.querySelectorAll("SCRIPT") : a.getElementsByTagName("SCRIPT")
    }, Kc = function (a, b) {
        xb(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Jc ? a.setAttribute(Jc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, Jc = {cellpadding: "cellPadding", cellspacing: "cellSpacing", colspan: "colSpan", frameborder: "frameBorder",
        height: "height", maxlength: "maxLength", role: "role", rowspan: "rowSpan", type: "type", usemap: "useMap", valign: "vAlign", width: "width"}, Lc = function (a) {
        var b = Rb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView;
        return E && G("10") && a.pageYOffset != b.scrollTop ? new K(b.scrollLeft, b.scrollTop) : new K(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    }, M = function (a) {
        return a ? a.parentWindow || a.defaultView : window
    }, Nc = function (a, b, c) {
        var d = arguments, e = document,
            f = d[0], h = d[1];
        if (!Ec && h && (h.name || h.type)) {
            f = ["<", f];
            h.name && f.push(' name="', ta(h.name), '"');
            if (h.type) {
                f.push(' type="', ta(h.type), '"');
                var k = {};
                Gb(k, h);
                delete k.type;
                h = k
            }
            f.push(">");
            f = f.join("")
        }
        f = e.createElement(f);
        h && (t(h) ? f.className = h : r(h) ? f.className = h.join(" ") : Kc(f, h));
        2 < d.length && Mc(e, f, d);
        return f
    }, Mc = function (a, b, c) {
        function d(c) {
            c && b.appendChild(t(c) ? a.createTextNode(c) : c)
        }

        for (var e = 2; e < c.length; e++) {
            var f = c[e];
            !ca(f) || fa(f) && 0 < f.nodeType ? d(f) : y(Oc(f) ? Xa(f) : f, d)
        }
    }, Pc = function (a) {
        a &&
            a.parentNode && a.parentNode.removeChild(a)
    }, Qc = function (a, b) {
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    }, Gc = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, Rc = function (a) {
        return a.contentWindow || M(a.contentDocument || a.contentWindow.document)
    }, Oc = function (a) {
        if (a && "number" == typeof a.length) {
            if (fa(a))return"function" == typeof a.item ||
                "string" == typeof a.item;
            if (ea(a))return"function" == typeof a.item
        }
        return!1
    }, Fc = function (a) {
        this.b = a || l.document || document
    }, Sc = function (a) {
        return Lc(a.b)
    };
    Fc.prototype.appendChild = function (a, b) {
        a.appendChild(b)
    };
    Fc.prototype.contains = Qc;
    var Tc = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    g = Tc.prototype;
    g.clone = function () {
        return new Tc(this.top, this.right, this.bottom, this.left)
    };
    g.contains = function (a) {
        return this && a ? a instanceof Tc ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    g.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    g.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    g.scale = function (a, b) {
        var c = da(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= c;
        this.bottom *= c;
        return this
    };
    var Uc = function (a, b) {
        var c;
        t:{
            c = Gc(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break t
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }, Vc = function (a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return{left: 0, top: 0, right: 0, bottom: 0}
        }
        E && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }, Wc = function (a) {
        if (E && !(E && 8 <= Yb))return a.offsetParent;
        var b = Gc(a), c = Uc(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)if (c = Uc(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))return a;
        return null
    }, Xc = function (a) {
        var b, c = Gc(a), d = Uc(a, "position"), e = Qb && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) &&
            (0 > b.screenX || 0 > b.screenY), f = new K(0, 0), h;
        b = c ? Gc(c) : document;
        (h = !E || E && 9 <= Yb) || (h = "CSS1Compat" == Hc(b).b.compatMode);
        h = h ? b.documentElement : b.body;
        if (a == h)return f;
        if (a.getBoundingClientRect)b = Vc(a), a = Sc(Hc(c)), f.x = b.left + a.x, f.y = b.top + a.y; else if (c.getBoxObjectFor && !e)b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(h), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY; else {
            b = a;
            do {
                f.x += b.offsetLeft;
                f.y += b.offsetTop;
                b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
                if (Rb && "fixed" == Uc(b, "position")) {
                    f.x += c.body.scrollLeft;
                    f.y += c.body.scrollTop;
                    break
                }
                b = b.offsetParent
            } while (b && b != a);
            if (Pb || Rb && "absolute" == d)f.y -= c.body.offsetTop;
            for (b = a; (b = Wc(b)) && b != c.body && b != h;)f.x -= b.scrollLeft, Pb && "TR" == b.tagName || (f.y -= b.scrollTop)
        }
        return f
    }, Yc = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
    var Zc = !E || E && 9 <= Yb, $c = E && !G("9");
    !Rb || G("528");
    Qb && G("1.9b") || E && G("8") || Pb && G("9.5") || Rb && G("528");
    Qb && !G("8") || E && G("9");
    Qb && G(17);
    var ad = function (a, b) {
        I.call(this, a ? a.type : "");
        this.b = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.g = null;
        if (a) {
            this.type = a.type;
            this.target = a.target || a.srcElement;
            this.b = b;
            var c = a.relatedTarget;
            c && Qb && Da(c, "nodeName");
            this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
            this.screenX = a.screenX || 0;
            this.screenY = a.screenY || 0;
            this.button = a.button;
            this.ctrlKey =
                a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.g = a;
            a.defaultPrevented && this.h()
        }
    };
    v(ad, I);
    ad.prototype.h = function () {
        ad.R.h.call(this);
        var a = this.g;
        if (a.preventDefault)a.preventDefault(); else if (a.returnValue = !1, $c)try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)a.keyCode = -1
        } catch (b) {
        }
    };
    var bd = "closure_listenable_" + (1E6 * Math.random() | 0), cd = function (a) {
        return!(!a || !a[bd])
    }, fd = 0;
    var gd = function (a, b, c, d, e) {
        this.listener = a;
        this.b = null;
        this.src = b;
        this.type = c;
        this.va = !!d;
        this.Ba = e;
        this.Qa = ++fd;
        this.ja = this.wa = !1
    }, hd = function (a) {
        a.ja = !0;
        a.listener = null;
        a.b = null;
        a.src = null;
        a.Ba = null
    };
    var id = function (a) {
        this.src = a;
        this.b = {};
        this.g = 0
    }, kd = function (a, b, c, d, e, f) {
        var h = b.toString();
        b = a.b[h];
        b || (b = a.b[h] = [], a.g++);
        var k = jd(b, c, e, f);
        -1 < k ? (a = b[k], d || (a.wa = !1)) : (a = new gd(c, a.src, h, !!e, f), a.wa = d, b.push(a));
        return a
    }, ld = function (a, b) {
        var c = b.type;
        if (!(c in a.b))return!1;
        var d = a.b[c], e = Oa(d, b), f;
        (f = 0 <= e) && Na.splice.call(d, e, 1);
        f && (hd(b), 0 == a.b[c].length && (delete a.b[c], a.g--));
        return f
    }, md = function (a, b, c, d, e) {
        a = a.b[b.toString()];
        b = -1;
        a && (b = jd(a, c, d, e));
        return-1 < b ? a[b] : null
    }, jd = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ja && f.listener == b && f.va == !!c && f.Ba == d)return e
        }
        return-1
    };
    var nd = "closure_lm_" + (1E6 * Math.random() | 0), od = {}, pd = 0, qd = function (a, b, c, d, e) {
        if (r(b)) {
            for (var f = 0; f < b.length; f++)qd(a, b[f], c, d, e);
            return null
        }
        c = rd(c);
        return cd(a) ? a.r(b, c, d, e) : sd(a, b, c, !1, d, e)
    }, sd = function (a, b, c, d, e, f) {
        if (!b)throw Error("Invalid event type");
        var h = !!e, k = td(a);
        k || (a[nd] = k = new id(a));
        c = kd(k, b, c, d, e, f);
        if (c.b)return c;
        d = ud();
        c.b = d;
        d.src = a;
        d.listener = c;
        a.addEventListener ? a.addEventListener(b.toString(), d, h) : a.attachEvent(vd(b.toString()), d);
        pd++;
        return c
    }, ud = function () {
        var a = wd, b = Zc ?
            function (c) {
                return a.call(b.src, b.listener, c)
            } : function (c) {
            c = a.call(b.src, b.listener, c);
            if (!c)return c
        };
        return b
    }, xd = function (a, b, c, d, e) {
        if (r(b)) {
            for (var f = 0; f < b.length; f++)xd(a, b[f], c, d, e);
            return null
        }
        c = rd(c);
        return cd(a) ? kd(a.Y, String(b), c, !0, d, e) : sd(a, b, c, !0, d, e)
    }, yd = function (a, b, c, d, e) {
        if (r(b))for (var f = 0; f < b.length; f++)yd(a, b[f], c, d, e); else c = rd(c), cd(a) ? a.xa(b, c, d, e) : a && (a = td(a)) && (b = md(a, b, c, !!d, e)) && zd(b)
    }, zd = function (a) {
        if (da(a) || !a || a.ja)return!1;
        var b = a.src;
        if (cd(b))return ld(b.Y, a);
        var c =
            a.type, d = a.b;
        b.removeEventListener ? b.removeEventListener(c, d, a.va) : b.detachEvent && b.detachEvent(vd(c), d);
        pd--;
        (c = td(b)) ? (ld(c, a), 0 == c.g && (c.src = null, b[nd] = null)) : hd(a);
        return!0
    }, vd = function (a) {
        return a in od ? od[a] : od[a] = "on" + a
    }, Bd = function (a, b, c, d) {
        var e = 1;
        if (a = td(a))if (b = a.b[b.toString()])for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f && f.va == c && !f.ja && (e &= !1 !== Ad(f, d))
        }
        return Boolean(e)
    }, Ad = function (a, b) {
        var c = a.listener, d = a.Ba || a.src;
        a.wa && zd(a);
        return c.call(d, b)
    }, wd = function (a, b) {
        if (a.ja)return!0;
        if (!Zc) {
            var c = b || aa("window.event"), d = new ad(c, this), e = !0;
            if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                t:{
                    var f = !1;
                    if (0 == c.keyCode)try {
                        c.keyCode = -1;
                        break t
                    } catch (h) {
                        f = !0
                    }
                    if (f || void 0 == c.returnValue)c.returnValue = !0
                }
                c = [];
                for (f = d.b; f; f = f.parentNode)c.push(f);
                for (var f = a.type, k = c.length - 1; 0 <= k; k--)d.b = c[k], e &= Bd(c[k], f, !0, d);
                for (k = 0; k < c.length; k++)d.b = c[k], e &= Bd(c[k], f, !1, d)
            }
            return e
        }
        return Ad(a, new ad(b, this))
    }, td = function (a) {
        a = a[nd];
        return a instanceof id ? a : null
    }, Cd = "__closure_events_fn_" + (1E9 * Math.random() >>>
        0), rd = function (a) {
        if (ea(a))return a;
        a[Cd] || (a[Cd] = function (b) {
            return a.handleEvent(b)
        });
        return a[Cd]
    };
    var N = function () {
        xc.call(this);
        this.Y = new id(this);
        this.ha = this;
        this.X = null
    };
    v(N, xc);
    N.prototype[bd] = !0;
    g = N.prototype;
    g.addEventListener = function (a, b, c, d) {
        qd(this, a, b, c, d)
    };
    g.removeEventListener = function (a, b, c, d) {
        yd(this, a, b, c, d)
    };
    g.dispatchEvent = function (a) {
        var b, c = this.X;
        if (c)for (b = []; c; c = c.X)b.push(c);
        var c = this.ha, d = a.type || a;
        if (t(a))a = new I(a, c); else if (a instanceof I)a.target = a.target || c; else {
            var e = a;
            a = new I(d, c);
            Gb(a, e)
        }
        var e = !0, f;
        if (b)for (var h = b.length - 1; 0 <= h; h--)f = a.b = b[h], e = Dd(f, d, !0, a) && e;
        f = a.b = c;
        e = Dd(f, d, !0, a) && e;
        e = Dd(f, d, !1, a) && e;
        if (b)for (h = 0; h < b.length; h++)f = a.b = b[h], e = Dd(f, d, !1, a) && e;
        return e
    };
    g.A = function () {
        N.R.A.call(this);
        if (this.Y) {
            var a = this.Y, b = 0, c;
            for (c in a.b) {
                for (var d = a.b[c], e = 0; e < d.length; e++)++b, hd(d[e]);
                delete a.b[c];
                a.g--
            }
        }
        this.X = null
    };
    g.r = function (a, b, c, d) {
        return kd(this.Y, String(a), b, !1, c, d)
    };
    g.xa = function (a, b, c, d) {
        var e;
        e = this.Y;
        a = String(a).toString();
        if (a in e.b) {
            var f = e.b[a];
            b = jd(f, b, c, d);
            -1 < b ? (hd(f[b]), Na.splice.call(f, b, 1), 0 == f.length && (delete e.b[a], e.g--), e = !0) : e = !1
        } else e = !1;
        return e
    };
    var Dd = function (a, b, c, d) {
        b = a.Y.b[String(b)];
        if (!b)return!0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.ja && h.va == c) {
                var k = h.listener, n = h.Ba || h.src;
                h.wa && ld(a.Y, h);
                e = !1 !== k.call(n, d) && e
            }
        }
        return e && 0 != d.vb
    };
    var Ed = function (a, b) {
        N.call(this);
        this.h = a || 1;
        this.g = b || l;
        this.k = u(this.m, this);
        this.l = ia()
    };
    v(Ed, N);
    Ed.prototype.j = !1;
    Ed.prototype.b = null;
    Ed.prototype.m = function () {
        if (this.j) {
            var a = ia() - this.l;
            0 < a && a < .8 * this.h ? this.b = this.g.setTimeout(this.k, this.h - a) : (this.b && (this.g.clearTimeout(this.b), this.b = null), this.dispatchEvent("tick"), this.j && (this.b = this.g.setTimeout(this.k, this.h), this.l = ia()))
        }
    };
    Ed.prototype.start = function () {
        this.j = !0;
        this.b || (this.b = this.g.setTimeout(this.k, this.h), this.l = ia())
    };
    var Fd = function (a) {
        a.j = !1;
        a.b && (a.g.clearTimeout(a.b), a.b = null)
    };
    Ed.prototype.A = function () {
        Ed.R.A.call(this);
        Fd(this);
        delete this.g
    };
    var Gd = function (a, b, c) {
        if (ea(a))c && (a = u(a, c)); else if (a && "function" == typeof a.handleEvent)a = u(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < b ? -1 : l.setTimeout(a, b || 0)
    };
    var Hd = !1, Id = function (a) {
        if (a = a.match(/[\d]+/g))a.length = 3
    };
    if (navigator.plugins && navigator.plugins.length) {
        var Jd = navigator.plugins["Shockwave Flash"];
        Jd && (Hd = !0, Jd.description && Id(Jd.description));
        navigator.plugins["Shockwave Flash 2.0"] && (Hd = !0)
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var Kd = navigator.mimeTypes["application/x-shockwave-flash"];
        (Hd = Kd && Kd.enabledPlugin) && Id(Kd.enabledPlugin.description)
    } else try {
        var Ld = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), Hd = !0;
        Id(Ld.GetVariable("$version"))
    } catch (Md) {
        try {
            Ld = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
                Hd = !0
        } catch (Nd) {
            try {
                Ld = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Hd = !0, Id(Ld.GetVariable("$version"))
            } catch (Od) {
            }
        }
    }
    var Pd = Hd;
    var Qd, Rd, Sd, Td, Ud, Vd, Wd;
    Wd = Vd = Ud = Td = Sd = Rd = Qd = !1;
    var Xd = C;
    Xd && (-1 != Xd.indexOf("Firefox") ? Qd = !0 : -1 != Xd.indexOf("Camino") ? Rd = !0 : -1 != Xd.indexOf("iPhone") || -1 != Xd.indexOf("iPod") ? Sd = !0 : -1 != Xd.indexOf("iPad") ? Td = !0 : -1 != Xd.indexOf("Chrome") ? Vd = !0 : -1 != Xd.indexOf("Android") ? Ud = !0 : -1 != Xd.indexOf("Safari") && (Wd = !0));
    var Yd = Qd, Zd = Rd, $d = Sd, ae = Td, be = Ud, ce = Vd, de = Wd;
    if (Fa && Fa.URL)var ee = Fa.URL, ab = !(ee && (0 < ee.indexOf("?google_debug") || 0 < ee.indexOf("&google_debug")));
    var fe = function (a, b, c, d) {
        c = hb(d || "osd_or_lidar::" + b, c, void 0, void 0, void 0);
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c);
        return c
    };
    var ge = {};
    q("gteh", hb("osd_or_lidar::gteh_ex", function (a, b) {
        var c = ge[a];
        ea(c) && c(b)
    }), void 0);
    var he = function (a, b) {
            var c = a || x;
            c.top != c && (c = c.top);
            try {
                var d;
                if (c.document && !c.document.body)d = new L(-1, -1); else {
                    var e;
                    if (b)e = new L(c.innerWidth, c.innerHeight); else {
                        var f = (c || window).document, h = "CSS1Compat" == f.compatMode ? f.documentElement : f.body;
                        e = new L(h.clientWidth, h.clientHeight)
                    }
                    d = e
                }
                return d
            } catch (k) {
                return new L(-12245933, -12245933)
            }
        }, ie = 0, ne = function () {
            var a = 0 <= je ? O() - je : -1, b = ke ? O() - le : -1, c = 0 <= me ? O() - me : -1, d = a;
            -1 != b && b < a && (d = b);
            return-1 != c && 1500 < c && 4E3 > c ? 500 : 2E3 > d ? 250 : 4E3 > d ? 500 : 1E3
        }, oe = (new Date).getTime(),
        je = -1, ke = !1, le = -1, me = -1, O = function () {
            return(new Date).getTime() - oe
        }, pe = function (a) {
            var b = [];
            xb(a, function (a, d) {
                d in Object.prototype || "undefined" == typeof a || (r(a) && (a = a.join(",")), b.push([d, "=", a].join("")))
            });
            return b.join("&")
        };
    var se = function (a, b, c, d, e, f, h, k, n) {
        this.b = qe.clone();
        this.j = this.M = 0;
        this.Ta = this.Va = this.Ca = -1;
        this.O = [0, 0, 0, 0, 0];
        this.K = [0, 0, 0, 0, 0];
        this.k = [0, 0, 0, 0, 0];
        this.ka = [0, 0, 0, 0, 0];
        this.w = d;
        this.B = this.Da = -1;
        this.P = e;
        this.Ua = function () {
        };
        this.Ga = this.g = c;
        this.Db = 0;
        this.Cb = -1;
        this.N = n || qe;
        this.m = "";
        this.Hb = null;
        this.Ib = "";
        this.h = {};
        this.h.le = 0;
        this.h.nt = 2;
        this.h.Fr = 3;
        this.l = this.Xa = this.Wa = this.Ia = null;
        this.ba = 0;
        this.W = !1;
        this.ma = null;
        this.Fa = !1;
        this.Fb = f;
        this.Gb = !1;
        this.Eb = void 0;
        this.ha = [];
        this.U = void 0;
        this.aa = !1;
        this.D = void 0;
        this.Ha = 0;
        this.X = -1;
        this.Ea = this.H = 0;
        this.J = void 0;
        this.o = 0;
        this.q = !1;
        re(this, a, f)
    }, qe = new Tc(0, 0, 0, 0), ue = function (a, b, c, d, e) {
        if (!(0 > a.w)) {
            var f = x.innerWidth, h = x.innerHeight, k = new Tc(Math.round(x.mozInnerScreenY), Math.round(x.mozInnerScreenX + f), Math.round(x.mozInnerScreenY + h), Math.round(x.mozInnerScreenX));
            c = new Tc(x.screenY + d, x.screenX + c.width, x.screenY + c.height, x.screenX);
            e || (d = new Tc(k.top - c.top, k.right - c.left, k.bottom - c.top, k.left - c.left), d.top > a.b.top ? a.b = d : (a.b.right =
                a.b.left + f, a.b.bottom = a.b.top + h), a.M = f * h);
            te(a, k, c, b, e, !0)
        }
    }, we = function (a, b, c) {
        var d = ve(a, x && x.document);
        if (d) {
            c || re(a, x, !0);
            var e = Math.floor((a.b.left + a.b.right) / 2), f = Math.floor((a.b.top + a.b.bottom) / 2), h = Lc(document), d = d(e - h.x, f - h.y) ? .5 : 0;
            te(a, a.b, d, b, c, !0)
        }
    }, ve = function (a, b) {
        xe(a);
        if (!a.Ia) {
            var c = [];
            y(Bb(a.h), function (a) {
                c[this.h[a] + 1] = a
            }, a);
            var d = c.join(""), d = b && b[d];
            a.Ia = d && u(d, b)
        }
        return a.Ia
    }, xe = function (a) {
        a.h.e = -1;
        a.h.i = 6;
        a.h.n = 7;
        a.h.t = 8
    }, ze = function (a, b, c, d) {
        var e = ye;
        0 > a.w || (d || re(a, x, e),
            Boolean(null) && d && (x.clearInterval(a.Wa), a.Wa = null), Boolean(null) && d && (x.clearInterval(a.Xa), a.Xa = null), null != a.ma && (d ? (x.clearInterval(a.l), a.l = null, a.W = !1) : a.Fa && !a.l && (a.l = x.setInterval(ib("osd_or_lidar::adblock::iem_int", u(a.nb, a, x, 1E3)), 1E3), a.nb(x))), te(a, a.b, c, b, d, !1))
    }, te = function (a, b, c, d, e, f) {
        var h = d - a.w || 1, k = null;
        da(c) ? b = Ae(a, c) : (k = c, b = Ae(a, b, k));
        if (!a.U) {
            c = b;
            var n = a.Da, m = k;
            f = f && -1 != n && 2 >= n;
            var s = -1 == n || -1 == c ? -1 : Math.max(n, c);
            f = f ? s : n;
            -1 != f && (a.O[f] += h);
            (m = m || null) ? (-1 != f && 2 >= f && -1 != a.B &&
                (a.ka[a.B] += h), m = 100 * a.M / ((m.bottom - m.top) * (m.right - m.left)), a.B = 20 <= m ? 0 : 10 <= m ? 1 : 5 <= m ? 2 : 2.5 <= m ? 3 : 4) : a.B = -1;
            if (7 == a.P) {
                m = Be(a);
                n = -1 != f && 2 >= f;
                !n && p(a.J) && 0 < a.J && (a.H += h);
                a.H > a.Ea && (a.Ea = a.H);
                if (n || !p(m) || 0 >= m)a.H = 0;
                a.J = m
            }
            for (m = f; 0 <= m && 4 >= m; m++)a.k[m] += h, a.k[m] > a.K[m] && (a.K[m] = a.k[m]);
            for (m = 0; m < a.k.length; ++m)if (m < c || e || -1 == c)a.k[m] = 0
        }
        a.Da = e ? -1 : b;
        a.w = d;
        -1 != b && (0 > a.Ca && (a.Ca = d), a.Ta = d);
        -1 == a.Va && 1E3 <= Math.max(a.k[2], a.K[2]) && (a.Va = d);
        a.Ua(a, k || qe)
    }, Ae = function (a, b, c) {
        if (a.q && 7 == a.P)return a.j = 1, Ge(a.j);
        var d = null;
        if (da(b))a.j = b; else {
            c = new Tc(Math.max(b.top, c.top), Math.min(b.right, c.right), Math.min(b.bottom, c.bottom), Math.max(b.left, c.left));
            if (0 >= a.M || c.top >= c.bottom || c.left >= c.right)return a.j = 0, -1;
            var d = c.clone(), e = -b.left;
            b = -b.top;
            e instanceof K ? (d.left += e.x, d.right += e.x, d.top += e.y, d.bottom += e.y) : (d.left += e, d.right += e, da(b) && (d.top += b, d.bottom += b));
            d = (c.bottom - c.top) * (c.right - c.left);
            a.j = d / a.M
        }
        return Ge(a.j)
    }, Ge = function (a) {
        var b = -1;
        1 <= a ? b = 0 : .75 <= a ? b = 1 : .5 <= a ? b = 2 : .25 <= a ? b = 3 : 0 < a && (b = 4);
        return b
    };
    se.prototype.nb = function (a, b) {
        var c = ve(this, a && a.document);
        if (c) {
            re(this, a, !0);
            var d = Math.floor((this.b.left + this.b.right) / 2), e = Math.floor((this.b.top + this.b.bottom) / 2), f = Lc(document), c = Boolean(c(d - f.x, e - f.y)), d = b || 0;
            c ? (this.ba += this.W ? d : 0, this.W = !0) : (this.ba = 0, this.W = !1);
            1E3 <= this.ba && (a.clearInterval(this.l), this.l = null, this.Fa = !1, this.ma = "v");
            re(this, a, !1)
        } else a.clearInterval(this.l), this.l = null, this.Fa = !1, this.ma = "i"
    };
    var re = function (a, b, c) {
        b = c ? b : b.top;
        try {
            var d = qe.clone(), e = new K(0, 0);
            if (a.Ga) {
                var d = a.Ga.getBoundingClientRect(), f = a.Ga, h = new K(0, 0), k = M(Gc(f));
                do {
                    var n;
                    if (k == b)n = Xc(f); else {
                        var m = f, s = void 0;
                        if (m.getBoundingClientRect)var F = Vc(m), s = new K(F.left, F.top); else var B = Sc(Hc(m)), Aa = Xc(m), s = new K(Aa.x - B.x, Aa.y - B.y);
                        c = void 0;
                        if (Qb && !G(12)) {
                            var vb = void 0;
                            var Ce, dd = void 0;
                            i:{
                                var De = za();
                                if (void 0 === m.style[De]) {
                                    var Lg = (Rb ? "Webkit" : Qb ? "Moz" : E ? "ms" : Pb ? "O" : null) + Ba(De);
                                    if (void 0 !== m.style[Lg]) {
                                        dd = (Rb ? "-webkit" :
                                            Qb ? "-moz" : E ? "-ms" : Pb ? "-o" : null) + "-transform";
                                        break i
                                    }
                                }
                                dd = "transform"
                            }
                            if (Ce = Uc(m, dd) || Uc(m, "transform"))var ed = Ce.match(Yc), vb = ed ? new K(parseFloat(ed[1]), parseFloat(ed[2])) : new K(0, 0); else vb = new K(0, 0);
                            c = new K(s.x + vb.x, s.y + vb.y)
                        } else c = s;
                        n = c
                    }
                    c = n;
                    h.x += c.x;
                    h.y += c.y
                } while (k && k != b && (f = k.frameElement) && (k = k.parent));
                e = h
            }
            var Mg = d.right - d.left, Ng = d.bottom - d.top, Ee = e.x + a.N.left, Fe = e.y + a.N.top, Og = a.N.right || Mg, Pg = a.N.bottom || Ng;
            a.b = new Tc(Math.round(Fe), Math.round(Ee + Og), Math.round(Fe + Pg), Math.round(Ee))
        } catch (gi) {
            a.b =
                a.N
        } finally {
            a.h.Po = 5, a.h.me = 1, a.h.om = 4
        }
        a.M = (a.b.bottom - a.b.top) * (a.b.right - a.b.left);
        a.Gb = 2 != a.P && 3 != a.P && 6 != a.P || 0 != a.M ? !1 : !0
    }, He = function (a, b) {
        var c = a.Ha;
        ke || a.U || -1 == a.X || (c += b - a.X);
        return c
    }, Be = function (a) {
        if (a.g && a.g.sdkVolume && ea(a.g.sdkVolume))try {
            return Number(a.g.sdkVolume())
        } catch (b) {
            return-1
        }
    }, Ie = function (a, b) {
        for (var c = b - a.ha.length + 1, d = [], e = 0; e < c; e++)d[e] = 0;
        Ya(a.ha, d);
        a.ha[b] = (100 * a.j | 0) / 100
    }, Q = function (a) {
        if (a.Fb)return{"if": 0};
        var b = a.b.clone();
        b.round();
        var c = Qa(a.ha, function (a) {
            return 100 *
                a | 0
        }), b = {"if": ye ? 1 : void 0, sdk: a.D ? a.D : void 0, p: [b.top, b.left, b.bottom, b.right], tos: a.O, mtos: a.K, ps: void 0, pt: c, vht: He(a, O()), mut: a.Ea};
        Je && (b.ps = [Je.width, Je.height]);
        a.aa && (b.ven = "1");
        a.o && (b.vds = a.o);
        P() ? b.c = (100 * a.j | 0) / 100 : b.tth = O() - ie;
        return b
    };
    var Ke = function () {
        return D("iPad") || D("Android") && !D("Mobile") || D("Silk")
    };
    var Le = null, Me = null, Ne = null, Oe = !1, Re = function () {
        Pe(!1);
        Qe()
    }, Qe = function () {
        R(S, !1)
    }, af = function () {
        Se && (Te = he(x, Se));
        var a = Te, b = Ue, c = Ve;
        if (We) {
            a = b;
            Pe(!1);
            var d = Xe, e = d.height - a;
            0 >= e && (e = d.height, a = 0);
            Te = new L(d.width, e);
            e = new Ye;
            e.l = !0;
            e.j = Te;
            e.h = d;
            e.g = a;
            return e
        }
        if (c)return a = new Ye, a.k = !0, a;
        if (Ze)return a = new Ye, a.m = !0, a;
        if ($e)return a = new Ye, a.q = !0, a;
        t:{
            b = new Ye;
            b.j = a;
            b.b = !1;
            if (null != a && -1 != a.width && -1 != a.height && -12245933 != a.width && -12245933 != a.height) {
                try {
                    var c = Se, f = x || x, f = f.top, e = a || he(f, c), h =
                        Sc(Hc(f.document)), d = -1 == e.width || -12245933 == e.width ? new Tc(e.width, e.width, e.width, e.width) : new Tc(h.y, h.x + e.width, h.y + e.height, h.x)
                } catch (k) {
                    a = b;
                    break t
                }
                b.o = d;
                b.b = !0
            }
            a = b
        }
        return a
    }, R = function (a, b) {
        if (!bf && 0 != a.length) {
            var c = af();
            window.clearTimeout(cf);
            cf = null;
            try {
                var d = O();
                if (c.l)for (var e = 0; e < a.length; e++)ue(a[e], d, c.h, c.g, b); else if (c.k)for (e = 0; e < a.length; e++)we(a[e], d, b); else if ($e)y(a, function () {
                }); else if (c.m)y(a, function () {
                }); else if (c.b)for (e = 0; e < a.length; e++)ze(a[e], d, c.o, b);
                ++df
            } finally {
                b ||
                ef()
            }
        }
    }, ff = function () {
        var a = P();
        if (a) {
            if (!ke) {
                var b = O();
                le = b;
                y(S, function (a) {
                    a.Ha = He(a, b)
                })
            }
            ke = !0;
            Pe(!0)
        } else b = O(), ke = !1, ie = b, y(S, function (a) {
            0 <= a.w && (a.X = b)
        });
        R(S, !a)
    }, P = function () {
        if (gf())return!0;
        var a;
        a = x.document;
        a = {visible: 1, hidden: 2, prerender: 3, preview: 4}[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0;
        return 1 == a || 0 == a
    }, ef = function () {
        x && (cf = x.setTimeout(ib("osd_or_lidar::psamp_to", function () {
            R(S, !1)
        }), ne()))
    }, hf = function (a) {
        return null != Ta(S, function (b) {
            return b.g ==
                a
        })
    }, S = [], bf = !1, Te = null, Xe = null, Je = null, cf = null, ye = !Ea(x.top), Ue = 0, We = !1, Ve = !1, Ze = !1, $e = !1, Se = Ke() || !Ke() && (D("iPod") || D("iPhone") || D("Android") || D("IEMobile")), df = 0, jf = function () {
        var a = x.document;
        return a.body && a.body.getBoundingClientRect ? !0 : !1
    }, Pe = function (a) {
        Te = he(x, Se);
        if (!a) {
            Xe = x.outerWidth ? new L(x.outerWidth, x.outerHeight) : new L(-12245933, -12245933);
            a = x;
            a.top != a && (a = a.top);
            var b = 0, c = 0, d = Te;
            try {
                var e = a.document, f = e.body, h = e.documentElement;
                if ("CSS1Compat" == e.compatMode && h.scrollHeight)b = h.scrollHeight !=
                    d.height ? h.scrollHeight : h.offsetHeight, c = h.scrollWidth != d.width ? h.scrollWidth : h.offsetWidth; else {
                    var k = h.scrollHeight, n = h.scrollWidth, m = h.offsetHeight, s = h.offsetWidth;
                    h.clientHeight != m && (k = f.scrollHeight, n = f.scrollWidth, m = f.offsetHeight, s = f.offsetWidth);
                    k > d.height ? k > m ? (b = k, c = n) : (b = m, c = s) : k < m ? (b = k, c = n) : (b = m, c = s)
                }
                Je = new L(c, b)
            } catch (F) {
                Je = new L(-12245933, -12245933)
            }
        }
    }, kf = function (a) {
        y(a, function (a) {
            hf(a.g) || S.push(a)
        })
    }, gf = function () {
        return Ra(S, function (a) {
            return a.q
        })
    }, Ye = function () {
        this.h = this.j =
            null;
        this.g = 0;
        this.o = null;
        this.b = this.q = this.m = this.k = this.l = !1
    };
    var lf = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }, of = function (a) {
        var b = [];
        mf(new nf, a, b);
        return b.join("")
    }, nf = function () {
    }, mf = function (a, b, c) {
        switch (typeof b) {
            case "string":
                pf(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (r(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), mf(a, b[f], c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (e in b)Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), pf(e, c), c.push(":"), mf(a, f, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }, qf = {'"': '\\"',
        "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b"}, rf = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, pf = function (a, b) {
        b.push('"', a.replace(rf, function (a) {
            if (a in qf)return qf[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return qf[a] = e + b.toString(16)
        }), '"')
    };
    var sf = function (a, b) {
        return a.dataset ? b in a.dataset ? a.dataset[b] : null : a.getAttribute("data-" + String(b).replace(/([A-Z])/g, "-$1").toLowerCase())
    };
    var tf = !1, uf = function () {
        if (!Oe) {
            Oe = !0;
            Le = Le || fe(x, "scroll", Qe, "osd_or_lidar::scroll");
            Me = Me || fe(x, "resize", Re, "osd_or_lidar::resize");
            var a;
            Fa.mozVisibilityState ? a = "mozvisibilitychange" : Fa.webkitVisibilityState ? a = "webkitvisibilitychange" : Fa.visibilityState && (a = "visibilitychange");
            a && (Ne = Ne || fe(Fa, a, ff, "osd_or_lidar::visibility"));
            ff()
        }
    };
    var vf = !1, wf = function () {
        vf = !0;
        try {
            je = O(), jb(x), Pe(!1), jf() ? (window.setTimeout(function () {
            }, 1), uf()) : tf = !0
        } catch (a) {
            throw S = [], a;
        }
    }, Lf = function (a, b, c) {
        vf || wf();
        var d = {};
        Gb(d, {opt_videoAdElement: void 0, opt_VideoAdLength: void 0, opt_fullscreen: void 0}, c || {});
        var e = a.toLowerCase();
        if (a = Db(function (a) {
            return a == e
        })) {
            a = {e: Dc[a], hd: bf ? "1" : "0", v: "219", hdr: void 0, a: void 0};
            if (tf)return a.msg = "ue", pe(a);
            b = xf(b, d);
            if (!b)return a.msg = "nf", pe(a);
            c = d.opt_fullscreen;
            p(c) && (b.q = Boolean(c));
            a.a = Be(b);
            p(b.J) && (a.la =
                b.J);
            c = {};
            c.start = yf;
            c.firstquartile = zf;
            c.midpoint = Af;
            c.thirdquartile = Bf;
            c.complete = Cf;
            c.metric = Df;
            c.pause = Ef;
            c.resume = Ff;
            c.skip = Gf;
            c.viewable_impression = Df;
            c.mute = Hf;
            c.unmute = If;
            c.fullscreen = Jf;
            c.exitfullscreen = Kf;
            if (c = c[e]) {
                d = c(b, d);
                if (!p(d) || t(d))return d;
                Gb(a, d);
                return pe(a)
            }
        }
    }, yf = function (a, b) {
        bf = !1;
        Mf(a, b);
        Ie(a, 0);
        return Q(a)
    }, zf = function (a) {
        Ie(a, 1);
        R([a], !P());
        return Q(a)
    }, Af = function (a) {
        Ie(a, 2);
        R([a], !P());
        return Q(a)
    }, Bf = function (a) {
        Ie(a, 3);
        R([a], !P());
        return Q(a)
    }, Cf = function (a) {
        Ie(a, 4);
        R([a], !P());
        var b = Q(a);
        a.q = !1;
        Nf(a.m);
        return b
    }, Ef = function (a) {
        a.Ha = He(a, O());
        var b = !P();
        R([a], b);
        a.U = !0;
        return Q(a)
    }, Ff = function (a) {
        var b = P();
        a.U && !b && (a.X = O());
        R([a], !b);
        a.U = !1;
        return Q(a)
    }, Df = function (a) {
        return Q(a)
    }, Gf = function (a) {
        var b = !P();
        R([a], b);
        b = Q(a);
        a.q = !1;
        Nf(a.m);
        return b
    }, Hf = function (a) {
        R([a], !P());
        return Q(a)
    }, If = function (a) {
        R([a], !P());
        return Q(a)
    }, Jf = function (a) {
        a.q = !0;
        R([a], !P());
        return Q(a)
    }, Kf = function (a) {
        a.q = !1;
        R([a], !P());
        return Q(a)
    }, Mf = function (a, b) {
        b && b.opt_VideoAdLength &&
        (a.Eb = b.opt_VideoAdLength);
        var c = O();
        me = c;
        a.O = [0, 0, 0, 0, 0];
        a.K = [0, 0, 0, 0, 0];
        a.k = [0, 0, 0, 0, 0];
        a.ka = [0, 0, 0, 0, 0];
        a.w = -1;
        a.Ca = -1;
        a.Ta = -1;
        a.Db = 0;
        a.Cb = -1;
        a.Da = -1;
        a.B = -1;
        a.j = 0;
        a.w = c;
        var d = !1;
        P() || (d = !0, a.X = c);
        R([a], d)
    }, Nf = function (a) {
        if (t(a)) {
            var b = Sa(S, function (b) {
                return b.m == a
            });
            0 <= b && Na.splice.call(S, b, 1)
        }
    }, xf = function (a, b) {
        if (b.opt_videoAdElement)return Of(a, b.opt_videoAdElement);
        var c = Pf(a);
        return c ? c : c = Ta(S, function (b) {
            return b.m == a
        })
    }, Of = function (a, b) {
        var c = Ta(S, function (a) {
            return a.g == b
        });
        c || (c = Qf(b),
            c.m = a, c.D = "h");
        return c
    }, Pf = function (a) {
        var b = Ta(S, function (b) {
            return b.g ? Rf(b.g) == a : !1
        });
        if (b)return b;
        b = Sf();
        b = Ta(b, function (b) {
            return Rf(b) == a
        });
        if (!b)return null;
        b = Qf(b);
        b.D = "as";
        Tf(b);
        return b
    }, Tf = function (a) {
        var b = Rf(a.g);
        t(b) && (a.m = b)
    }, Sf = function () {
        var a = x.document, b = $a(Qa(["embed", "object"], function (b) {
            return Xa(a.getElementsByTagName(b))
        }));
        return b = Pa(b, function (a) {
            if (!a || !fa(a) || 1 != a.nodeType)return!1;
            var b = a.getBoundingClientRect();
            return 0 != b.width && 0 != b.height && a.metricID && ea(a.metricID) ?
                !0 : !1
        })
    }, Rf = function (a) {
        if (!a || !a.metricID || !ea(a.metricID))return null;
        var b;
        try {
            b = a.metricID()
        } catch (c) {
            return null
        }
        return b.queryID
    }, Qf = function (a) {
        var b = O();
        sf(a, "admeta") || sf(a, "admetaDfp");
        var c = sf(a, "ord") || "", d;
        t:if (c) {
            d = x.document.getElementsByTagName("script");
            for (var c = new RegExp(".doubleclick.net/(N.+/)?(pf)?(ad[ijx])/.*;ord=" + ua(c)), e = 0; e < d.length; e++) {
                var f = d[e];
                if (f && f.src && c.test(f.src)) {
                    d = f.src;
                    break t
                }
            }
            d = x != x.top && c.test(x.location.href) ? x.location.href : ""
        } else d = "";
        a = new se(x, 0,
            a, b, 7, ye);
        b = d.match(/.doubleclick.net\/(N.+\/)?(pf)?(ad[ijx])\//);
        a.Hb = b ? {adi: "adi", adj: "adj", adx: "adx"}[b[3]] : "";
        if (d) {
            t:{
                if (d && (b = d.match(/\/\/.*(;u=xb[^;\?]*)/i)) && (b = b[b.length - 1].split("=")) && 2 == b.length) {
                    b = b[1];
                    break t
                }
                b = null
            }
            a.Ib = b
        }
        a.Ua = Uf;
        kf([a]);
        uf();
        return a
    }, Uf = function (a) {
        if (2E3 <= Math.max(a.k[2], a.K[2]) && !a.aa && !ye) {
            var b = "as" == a.D, c = "h" == a.D, d = aa("ima.common.triggerViewEvent"), e = Q(a);
            e.e = 9;
            try {
                var f = pe(e);
                c ? ea(d) ? (d(a.m, f), a.aa = !0) : a.o = 4 : b ? a.g && a.g.triggerViewEvent ? (a.g.triggerViewEvent(f),
                    a.aa = !0) : a.o = 1 : a.o = 5
            } catch (h) {
                a.o = a.o || 2
            }
        } else a.o = 3
    };
    q("Goog_AdSense_Lidar_startMetricMeasurement", hb("lidar::startmm_ex", function (a, b) {
        var c = b || {};
        if (!t(a)) {
            var d = xf(a, c);
            d && Mf(d, c)
        }
    }), void 0);
    q("Goog_AdSense_Lidar_stopMetricMeasurement", hb("lidar::stopmm_ex", Nf), void 0);
    q("Goog_AdSense_Lidar_getMetric", hb("lidar::getmetric_ex", function (a) {
        var b = Ta(S, function (b) {
            return b.m === a
        });
        if (!b)return"-1";
        var c = {xsj: b.O, mkdj: b.K};
        P() ? c.c7 = (100 * b.j | 0) / 100 : c.ftr = O() - ie;
        return of(c)
    }), void 0);
    q("Goog_AdSense_Lidar_sendVastMessage", hb("lidar::handlevast_ex", Lf), void 0);
    var T = function (a, b, c) {
        I.call(this, a);
        this.k = b;
        this.j = null != c ? c : null
    };
    v(T, I);
    T.prototype.m = function () {
        return this.k
    };
    T.prototype.o = function () {
        return this.j
    };
    var U = function (a) {
        xc.call(this);
        this.h = a;
        this.g = {}
    };
    v(U, xc);
    var Vf = [];
    U.prototype.r = function (a, b, c, d) {
        return Wf(this, a, b, c, d)
    };
    var Wf = function (a, b, c, d, e, f) {
        r(c) || (c && (Vf[0] = c.toString()), c = Vf);
        for (var h = 0; h < c.length; h++) {
            var k = qd(b, c[h], d || a.handleEvent, e || !1, f || a.h || a);
            if (!k)break;
            a.g[k.Qa] = k
        }
        return a
    }, Xf = function (a, b, c, d, e, f) {
        if (r(c))for (var h = 0; h < c.length; h++)Xf(a, b, c[h], d, e, f); else(b = xd(b, c, d || a.handleEvent, e, f || a.h || a)) && (a.g[b.Qa] = b)
    };
    U.prototype.xa = function (a, b, c, d, e) {
        if (r(b))for (var f = 0; f < b.length; f++)this.xa(a, b[f], c, d, e); else c = c || this.handleEvent, e = e || this.h || this, c = rd(c), d = !!d, b = cd(a) ? md(a.Y, String(b), c, d, e) : a ? (a = td(a)) ? md(a, b, c, d, e) : null : null, b && (zd(b), delete this.g[b.Qa]);
        return this
    };
    U.prototype.A = function () {
        U.R.A.call(this);
        xb(this.g, zd);
        this.g = {}
    };
    U.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Yf = function () {
        N.call(this);
        this.b = null;
        this.j = new U(this);
        this.h = new A;
        this.g = !1
    };
    v(Yf, N);
    var Zf = null, $f = function () {
        null != Zf || (Zf = new Yf);
        return Zf
    }, ag = function (a, b, c, d) {
        if (a.g) {
            var e = {};
            (a = d ? a.h.get(d) : Cc.o) && (e.opt_videoAdElement = a);
            return Lf(b, c, e) || ""
        }
        return""
    };
    Yf.prototype.k = function (a) {
        var b = a.I, c = b.queryId, d = {};
        d.timeoutId = b.timeoutId;
        switch (a.G) {
            case "getViewability":
                d.viewabilityString = ag(this, "metric", c) || "";
                this.b.send("activityMonitor", "viewability", d);
                break;
            case "reportVastEvent":
                d.viewabilityString = ag(this, b.vastEvent, c, b.osdId), this.b.send("activityMonitor", "viewability", d)
        }
    };
    q("ima.common.sdkVolume", function () {
        var a = -1;
        null != ($f(), null) && (a = ($f(), null)());
        return a
    }, void 0);
    q("ima.common.triggerViewEvent", function (a, b) {
        var c = {};
        c.queryId = a;
        c.viewabilityString = b;
        var d;
        (d = $f().b) ? d.send("activityMonitor", "viewableImpression", c) : $f().dispatchEvent(new T("viewable_impression", null, c))
    }, void 0);
    var bg = function (a, b, c) {
        this.g = c;
        0 == b.length && (b = [
            []
        ]);
        this.b = Qa(b, function (b) {
            b = a.concat(b);
            for (var c = [], f = 0, h = 0; f < b.length;) {
                var k = b[f++];
                if (128 > k)c[h++] = String.fromCharCode(k); else if (191 < k && 224 > k) {
                    var n = b[f++];
                    c[h++] = String.fromCharCode((k & 31) << 6 | n & 63)
                } else {
                    var n = b[f++], m = b[f++];
                    c[h++] = String.fromCharCode((k & 15) << 12 | (n & 63) << 6 | m & 63)
                }
            }
            return new RegExp(c.join(""))
        })
    };
    bg.prototype.match = function (a) {
        return Ra(this.b, function (b) {
            b = a.match(b);
            return null == b ? !1 : !this.g || 1 <= b.length && "3.1.71" == b[1] || 2 <= b.length && "3.1.71" == b[2] ? !0 : !1
        }, this)
    };
    var cg = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47], dg = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 46, 50, 109, 100, 110, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47], eg = [
        [97, 102, 105, 92, 46, 106, 115],
        [105, 109, 97, 51, 92, 46, 106, 115],
        [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115],
        [105, 109, 97, 51, 95, 116, 101, 115, 116, 46, 106, 115],
        [105, 109,
            97, 51, 95, 108, 111, 97, 100, 101, 114, 92, 46, 106, 115],
        [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]
    ], fg = [
        [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 91, 97, 45, 122, 93, 91, 97, 45, 122, 93, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
        [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 91, 97, 45, 122, 93, 91, 97, 45, 122, 93, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
        [98, 114, 105, 100, 103, 101, 40, 91, 48,
            45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 116, 101, 115, 116, 40, 95, 91, 97, 45, 122, 93, 91, 97, 45, 122, 93, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]
    ], gg = new bg(cg, eg, !1), hg = new bg(cg, fg, !0), ig = new bg(dg, eg, !1), jg = new bg(dg, fg, !0), kg = new bg([104, 116, 116, 112, 115, 63, 58, 47, 47, 119, 119, 119, 46, 103, 115, 116, 97, 116, 105, 99, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 106, 115, 47, 97, 112, 118, 95, 116, 101, 109, 112, 108, 97, 116, 101, 115, 46, 106, 115], [], !1), lg = new bg([104, 116, 116, 112, 115, 63, 58, 47, 47, 109, 105, 110, 116, 45, 109, 97, 100, 46,
        115, 97, 110, 100, 98, 111, 120, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47, 102, 111, 114, 109, 97, 116, 115, 47, 97, 112, 118, 95, 116, 101, 109, 112, 108, 97, 116, 101, 115, 46, 106, 115], [], !1), mg = new bg([104, 116, 116, 112, 115, 63, 58, 47, 47, 103, 111, 111, 103, 108, 101, 97, 100, 115, 46, 103, 46, 100, 111, 117, 98, 108, 101, 99, 108, 105, 99, 107, 46, 110, 101, 116, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99], [], !1), ng = new bg([104, 116, 116, 112, 115, 63, 58, 47, 47, 118, 105, 100, 101, 111, 45, 97, 100, 45, 116, 101, 115, 116, 46,
        97, 112, 112, 115, 112, 111, 116, 46, 99, 111, 109, 47], [], !1), yb = {l: gg, k: hg, o: ig, m: jg, b: kg, g: lg, h: mg, j: ng};
    var og = function (a) {
        return(a = a.exec(C)) ? a[1] : ""
    };
    (function () {
        if (Yd)return og(/Firefox\/([0-9.]+)/);
        if (E || Pb)return Vb;
        if (ce)return og(/Chrome\/([0-9.]+)/);
        if (de)return og(/Version\/([0-9.]+)/);
        if ($d || ae) {
            var a;
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(C))return a[1] + "." + a[2]
        } else {
            if (be)return(a = og(/Android\s+([0-9.]+)/)) ? a : og(/Version\/([0-9.]+)/);
            if (Zd)return og(/Camino\/([0-9.]+)/)
        }
        return""
    })();
    var pg = {}, qg = "", rg = /OS (\S+) like/, sg = /Android (\S+);/, tg = function () {
        return Nb || w(C, "Mobile")
    }, ug = function () {
        return Ob || w(C, "iPod")
    }, vg = function () {
        return ug() || Tb
    }, wg = function (a, b) {
        if (null == pg[b]) {
            var c;
            ka(qg) && (c = a.exec(C)) && (qg = c[1]);
            (c = qg) ? (c = c.replace(/_/g, "."), pg[b] = 0 <= xa(c, b)) : pg[b] = !1
        }
        return pg[b]
    };
    var xg = ["://secure-...imrworldwide.com/", "://cdn.imrworldwide.com/", "://aksecure.imrworldwide.com/", "www.google.com/pagead/sul", "www.youtube.com/gen_204\\?a=sul"], yg = function (a) {
        return ka(va(a)) ? !1 : null != Ta(xg, function (b) {
            return null != a.match(b)
        })
    }, zg = function (a) {
        a = yg(a) ? 'javascript:"data:text/html,<body><img src=\\"' + a + '\\"></body>"' : a;
        var b = Nc("iframe", {src: a, style: "display:none"});
        a = Gc(b).body;
        var c, d = Gd(function () {
            zd(c);
            Pc(b)
        }, 15E3);
        c = xd(b, ["load", "error"], function () {
            Gd(function () {
                l.clearTimeout(d);
                Pc(b)
            }, 5E3)
        });
        a.appendChild(b)
    };
    var Ag = {Fd: "video/mp4", Hd: "video/mpeg", Cd: "application/x-mpegURL", Id: "video/ogg", Od: "video/3gpp", Sd: "video/webm", Ed: "audio/mpeg", Gd: "audio/mp4"};
    var Bg = ["*.googlesyndication.com"], Cg = ["*.youtu.be", "*.youtube.com"], Dg = "ad.doubleclick.net bid.g.doubleclick.net corp.google.com ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" "), Fg = function (a, b) {
        try {
            var c = nc(new cc(b)), c = c.replace(/^www./i,
                "");
            return Ra(a, function (a) {
                return Eg(a, c)
            })
        } catch (d) {
            return!1
        }
    }, Eg = function (a, b) {
        if (ka(va(b)))return!1;
        a = a.toLowerCase();
        b = b.toLowerCase();
        return"*." == a.substr(0, 2) ? (a = a.substr(2), a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
    }, Gg = function (a) {
        var b;
        if (b = "https:" == window.location.protocol)b = (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + Dg.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)", "i")).test(a);
        return b ? (a = new cc(a), dc(a, "https"),
            a.toString()) : a
    };
    var Hg = function (a) {
        a = Gg(a);
        zg(a)
    };
    var Ig = function () {
        this.g = .05 > Math.random();
        this.b = Math.floor(4503599627370496 * Math.random())
    };
    Ig.getInstance = function () {
        return Ig.b ? Ig.b : Ig.b = new Ig
    };
    var Qg = function (a, b, c, d) {
        if (!(vg() && wg(rg, 8) || !a.g && !d)) {
            c = c || {};
            c.lid = b;
            c = Jg(a, c);
            var e = new cc("http://pagead2.googlesyndication.com/pagead/gen_204");
            xb(c, function (a, b) {
                var c = e.b, d = b, m = null != a ? "boolean" == typeof a ? a ? "t" : "f" : "" + a : "";
                sc(c);
                c.h = null;
                d = rc(c, d);
                uc(c, d) && (c.g -= c.b.get(d).length);
                Hb(c.b, d, [m]);
                c.g++
            }, a);
            a = Kg();
            dc(e, a.ea);
            Hg(e.toString())
        }
    }, Jg = function (a, b) {
        b.id = "ima_html5";
        var c = Kg();
        b.c = a.b;
        b.domain = c.Z;
        return b
    }, Kg = function () {
        var a = M(), b = document;
        return new cc(a.parent == a ? a.location.href :
            b.referrer)
    };
    var Rg = function () {
        this.b = -1
    }, Sg = new Rg;
    Rg.prototype.clear = function () {
    };
    var Tg = function (a) {
        this.g = a
    };
    Tg.prototype.b = function () {
        return this.g
    };
    var Ug = function () {
        N.call(this);
        this.currentTime = 0
    };
    v(Ug, N);
    var Vg = function (a, b) {
        this.message = a;
        this.errorCode = b
    }, Wg = new Vg("Invalid usage of the API. Cause: {0}", 900), Xg = new Vg("The provided {0} information: {1} is invalid.", 1101), Yg = function (a, b, c) {
        var d;
        d = b || null;
        if (!(d instanceof H)) {
            var e = a.errorCode, f = a.message, h = Za(arguments, 2);
            if (0 < h.length)for (var k = 0; k < h.length; k++)f = f.replace(new RegExp("\\{" + k + "\\}", "ig"), h[k]);
            e = new H("adPlayError", f, e);
            e.g = d;
            d = e
        }
        return d
    };
    var Zg = function (a) {
        Ug.call(this);
        this.currentTime = a.currentTime;
        if (!("currentTime"in a) || isNaN(a.currentTime))throw Yg(Xg, null, "content", "currentTime");
        this.g = a;
        this.b = new Ed(250);
        this.h = new U(this);
        Wf(this.h, this.b, "tick", this.j, !1, this)
    };
    v(Zg, Ug);
    Zg.prototype.start = function () {
        this.b.start()
    };
    Zg.prototype.A = function () {
        Zg.R.A.call(this);
        this.h.F();
        this.b.F()
    };
    Zg.prototype.j = function () {
        if ("currentTime"in this.g && !isNaN(this.g.currentTime)) {
            var a = this.currentTime;
            this.currentTime = this.g.currentTime;
            a != this.currentTime && this.dispatchEvent(new I("currentTimeUpdate"))
        } else this.dispatchEvent(new I("contentWrapperError")), Fd(this.b)
    };
    var $g = function (a, b) {
        T.call(this, "adMetadata", a);
        this.g = b || null
    };
    v($g, T);
    $g.prototype.l = function () {
        return this.g
    };
    var ah = function () {
        N.call(this);
        this.k = this.l = this.m = !1;
        this.b = 0;
        this.g = [];
        this.o = !1;
        this.j = {}
    };
    v(ah, N);
    var ch = function (a, b) {
        null == b || a.m || (a.h = b, bh(a), a.m = !0)
    }, eh = function (a) {
        null != a.h && a.m && (dh(a), a.m = !1, a.l = !1, a.k = !1, a.b = 0, a.g = [], a.o = !1)
    }, bh = function (a) {
        dh(a);
        a.j = a.h instanceof N || !vg() ? {click: u(a.q, a)} : {touchstart: u(a.D, a), touchmove: u(a.B, a), touchend: u(a.w, a)};
        xb(a.j, function (a, c) {
            this.h.addEventListener(c, a, !1)
        }, a)
    }, dh = function (a) {
        xb(a.j, function (a, c) {
            this.h.removeEventListener(c, a, !1)
        }, a);
        a.j = {}
    };
    ah.prototype.D = function (a) {
        this.l = !0;
        this.b = a.touches.length;
        this.o = fh(this, a.touches) || 1 != a.touches.length;
        gh(this, a.touches)
    };
    ah.prototype.B = function (a) {
        this.k = !0;
        this.b = a.touches.length
    };
    ah.prototype.w = function (a) {
        this.l && 1 == this.b && !this.k && !this.o && fh(this, a.changedTouches) && this.dispatchEvent(new I("click"));
        this.b = a.touches.length;
        0 == this.b && (this.k = this.l = !1, this.g = [])
    };
    ah.prototype.q = function () {
        this.dispatchEvent(new I("click"))
    };
    var gh = function (a, b) {
        a.g = [];
        y(b, function (a) {
            var b = this.g;
            a = a.identifier;
            0 <= Oa(b, a) || b.push(a)
        }, a)
    }, fh = function (a, b) {
        return Ra(b, function (a) {
            return 0 <= Oa(this.g, a.identifier)
        }, a)
    };
    ah.prototype.A = function () {
        eh(this);
        ah.R.A.call(this)
    };
    var hh = function () {
    };
    hh.prototype.disableClickThrough = !1;
    hh.prototype.mimeTypes = null;
    hh.prototype.restoreCustomPlaybackStateOnAdBreakComplete = !1;
    var ih = function (a) {
        this.g = 0;
        this.h = a || 100;
        this.b = []
    };
    g = ih.prototype;
    g.get = function (a) {
        if (a >= this.b.length)throw Error("Out of bounds exception");
        a = this.b.length < this.h ? a : (this.g + Number(a)) % this.h;
        return this.b[a]
    };
    g.ga = function () {
        return this.b.length
    };
    g.isEmpty = function () {
        return 0 == this.b.length
    };
    g.clear = function () {
        this.g = this.b.length = 0
    };
    g.$ = function () {
        for (var a = this.ga(), b = this.ga(), c = [], a = this.ga() - a; a < b; a++)c.push(this.get(a));
        return c
    };
    g.ia = function () {
        for (var a = [], b = this.ga(), c = 0; c < b; c++)a[c] = c;
        return a
    };
    var jh = function () {
        N.call(this)
    };
    v(jh, N);
    var kh = {td: "beginFullscreen", CLICK: "click", ud: "end", vd: "endFullscreen", ERROR: "error", Dd: "mediaLoadTimeout", Ab: "pause", Jd: "play", Md: "skip", Bb: "start", Pd: "timeUpdate", Rd: "volumeChange"};
    var lh = function (a) {
        N.call(this);
        this.b = a;
        this.O = "";
        this.l = -1;
        this.U = new ih(4);
        this.q = this.N = 0;
        this.H = this.h = this.o = !1;
        this.B = this.Oa();
        this.w = this.Pa();
        this.W = 15E3;
        this.D = !1
    };
    v(lh, jh);
    lh.prototype.Za = function () {
        return Pa(Ab(Ag), function (a) {
            return!ka(this.b.canPlayType(a))
        }, this)
    };
    lh.prototype.ub = function (a) {
        this.W = 0 < a.b ? a.b : 15E3
    };
    lh.prototype.P = function () {
        this.b.seekable.length ? this.b.seekable.end(0) > this.l && (this.b.currentTime = this.l, this.b.play()) : setTimeout(u(this.P, this), 100)
    };
    var mh = function (a) {
        0 <= a.l && (a.b.addEventListener("loadedmetadata", function c() {
            a.P();
            a.b.removeEventListener("loadedmetadata", c, !1)
        }, !1), a.b.src = a.O, a.b.load())
    };
    g = lh.prototype;
    g.rb = function (a) {
        nh(this);
        this.b.src = a;
        this.b.load()
    };
    g.Na = function (a) {
        this.b.volume = a
    };
    g.ob = function () {
        return this.b.volume
    };
    g.sa = function () {
        this.D = !1;
        Gd(this.b.play, 0, this.b);
        this.J = Gd(this.gc, this.W, this)
    };
    g.sb = function () {
        this.D = !0;
        this.b.pause()
    };
    g.pb = function () {
        return this.b.paused ? vg() || ce ? this.b.currentTime < this.b.duration : !0 : !1
    };
    g.qb = function () {
        ug() && this.b.webkitDisplayingFullscreen && this.b.webkitExitFullscreen()
    };
    g.Pa = function () {
        if (ug())return this.b.webkitSupportsFullscreen && this.b.webkitDisplayingFullscreen;
        var a = window.screen.availWidth || window.screen.width, b = window.screen.availHeight || window.screen.height, c = ea(this.b.getBoundingClientRect) ? this.b.getBoundingClientRect() : {width: this.b.offsetWidth, height: this.b.offsetHeight};
        return c.width >= a && c.height >= b
    };
    g.qa = function (a) {
        this.b.currentTime = a
    };
    g.da = function () {
        return this.b.currentTime
    };
    g.Ma = function () {
        return isNaN(this.b.duration) ? -1 : this.b.duration
    };
    g.ta = function () {
        return this.b.ended
    };
    g.Oa = function () {
        return new L(this.b.offsetWidth, this.b.offsetHeight)
    };
    g.A = function () {
        this.na();
        this.b = null;
        lh.R.A.call(this)
    };
    g.tb = function () {
        this.na();
        this.g = new U(this);
        this.g.r(this.b, "canplay", this.Zb);
        this.g.r(this.b, "ended", this.$b);
        this.g.r(this.b, "webkitbeginfullscreen", this.La);
        this.g.r(this.b, "webkitendfullscreen", this.hb);
        this.g.r(this.b, "pause", this.bc);
        this.g.r(this.b, "playing", this.cc);
        this.g.r(this.b, "timeupdate", this.dc);
        this.g.r(this.b, "volumechange", this.ec);
        this.g.r(this.b, "error", this.fb);
        this.k = new ah;
        this.g.r(this.k, "click", this.Yb);
        ch(this.k, this.b);
        this.m = new Ed(1E3);
        this.g.r(this.m, "tick", this.ac);
        this.m.start()
    };
    g.na = function () {
        null != this.k && (eh(this.k), this.k = null);
        null != this.m && this.m.F();
        null != this.g && (this.g.F(), this.g = null);
        nh(this)
    };
    var nh = function (a) {
        a.h = !1;
        a.H = !1;
        a.U.clear();
        l.clearTimeout(a.J);
        yc(a.j)
    }, oh = function (a) {
        if (!a.h) {
            a.h = !0;
            l.clearTimeout(a.J);
            a.dispatchEvent("start");
            var b;
            (b = ug() && tg() && w(C, "Safari") || Nb && !(Nb && wg(sg, 4))) || ((b = w(C, "CrKey") || w(C, "PlayStation") || w(C, "Roku")) || (b = (b = C) ? w(b, "AppleTV") || w(b, "GoogleTV") || w(b, "HbbTV") || w(b, "NetCast.TV") || w(b, "POV_TV") || w(b, "SMART-TV") || w(b, "SmartTV") || Nb && w(b, "AFT") : !1), b = b || w(C, "Xbox"));
            !b || !Nb || Nb && wg(sg, 3) || !(!ug() || vg() && wg(rg, 4)) || a.La()
        }
    };
    g = lh.prototype;
    g.Zb = function () {
        var a;
        if (a = de)a = C, a = !(a && (w(a, "SMART-TV") || w(a, "SmartTV")));
        a && !this.H && (this.qa(.001), this.H = !0)
    };
    g.cc = function () {
        this.dispatchEvent("play");
        vg() || be || oh(this)
    };
    g.dc = function () {
        if (!this.h && (vg() || be)) {
            if (0 >= this.da())return;
            if (be && this.ta() && 1 == this.Ma()) {
                this.fb();
                return
            }
            oh(this)
        }
        if (vg()) {
            if (!this.o && 1.5 < this.da() - this.N) {
                this.o = !0;
                this.qa(this.q);
                return
            }
            this.N = this.da();
            this.o = !1;
            this.da() > this.q && (this.q = this.da())
        }
        var a = this.U;
        a.b[a.g] = this.b.currentTime;
        a.g = (a.g + 1) % a.h;
        this.dispatchEvent("timeUpdate")
    };
    g.ec = function () {
        this.dispatchEvent("volumeChange")
    };
    g.bc = function () {
        var a;
        this.h && vg() && !this.D && 2 > ph(this) ? (this.j = new Ed(250), this.g.r(this.j, "tick", this.fc), this.j.start(), a = !0) : a = !1;
        a || this.dispatchEvent("pause")
    };
    g.$b = function () {
        var a = !0;
        vg() && (a = this.q >= this.b.duration - 1.5);
        !this.o && a && this.dispatchEvent("end")
    };
    g.La = function () {
        this.dispatchEvent("beginFullscreen")
    };
    g.hb = function () {
        this.dispatchEvent("endFullscreen")
    };
    g.fb = function () {
        l.clearTimeout(this.J);
        this.dispatchEvent("error")
    };
    g.Yb = function () {
        this.dispatchEvent("click")
    };
    g.ac = function () {
        var a = this.Oa(), b = this.Pa();
        if (a.width != this.B.width || a.height != this.B.height)!this.w && b ? this.La() : this.w && !b && this.hb(), this.w = b, this.B = a
    };
    g.gc = function () {
        if (!this.h) {
            try {
                Qg(Ig.getInstance(), 16)
            } catch (a) {
            }
            nh(this);
            this.dispatchEvent("mediaLoadTimeout")
        }
    };
    g.fc = function () {
        if (this.ta() || !this.pb())yc(this.j); else {
            var a = this.b.duration - this.b.currentTime, b = ph(this);
            0 < b && (2 <= b || 2 > a) && (yc(this.j), this.sa())
        }
    };
    var ph = function (a) {
        var b;
        t:{
            for (b = a.b.buffered.length - 1; 0 <= b;) {
                if (a.b.buffered.start(b) <= a.b.currentTime) {
                    b = a.b.buffered.end(b);
                    break t
                }
                b--
            }
            b = 0
        }
        return b - a.b.currentTime
    };
    var qh = function () {
        this.b = [];
        this.g = []
    };
    g = qh.prototype;
    g.ga = function () {
        return this.b.length + this.g.length
    };
    g.isEmpty = function () {
        return 0 == this.b.length && 0 == this.g.length
    };
    g.clear = function () {
        this.b = [];
        this.g = []
    };
    g.contains = function (a) {
        return 0 <= Oa(this.b, a) || 0 <= Oa(this.g, a)
    };
    g.$ = function () {
        for (var a = [], b = this.b.length - 1; 0 <= b; --b)a.push(this.b[b]);
        for (var c = this.g.length, b = 0; b < c; ++b)a.push(this.g[b]);
        return a
    };
    var rh = function () {
    }, sh = {Bd: "Image", wd: "Flash", hc: "All"}, th = {xd: "Html", yd: "IFrame", Nd: "Static", hc: "All"}, uh = {zd: "IgnoreSize", Kd: "SelectExactMatch", Ld: "SelectNearMatch"};
    var wh = function (a, b) {
        if (null == a || 0 >= a.width || 0 >= a.height)throw Yg(Xg, null, "ad slot size", a.toString());
        this.g = a;
        this.b = null != b ? b : new rh;
        this.k = vh(th, this.b.j) ? this.b.j : "All";
        this.j = vh(sh, this.b.h) ? this.b.h : "All";
        this.m = vh(uh, this.b.k) ? this.b.k : "SelectExactMatch";
        this.h = null != this.b.g ? this.b.g : [];
        this.l = da(this.b.b) && 0 < this.b.b && 100 >= this.b.b ? this.b.b : 90
    }, zh = function (a, b) {
        var c = [];
        y(b, function (a) {
                !ka(a.b) && (isNaN(a.l) || isNaN(a.k) || a.k == a.l) && xh(this, a) ? c.push(a) : (a = yh(this, a), null != a && !ka(a.b) && c.push(a))
            },
            a);
        return c
    }, xh = function (a, b) {
        var c;
        if (c = "Flash" != b.g() || Pd) {
            if (c = "All" == a.k || a.k == b.K)c = b.g(), c = null != c ? "All" == a.j || a.j == c : !0;
            c && (c = b.M, c = 0 == a.h.length ? !0 : null != c ? 0 <= Oa(a.h, c) : !1)
        }
        if (c) {
            c = b.h;
            var d;
            (d = "IgnoreSize" == a.m) || (d = a.g, d = d == c ? !0 : d && c ? d.width == c.width && d.height == c.height : !1);
            c = d ? !0 : "SelectNearMatch" == a.m && (c.width > a.g.width || c.height > a.g.height || c.width < a.l / 100 * a.g.width || c.height < a.l / 100 * a.g.height ? !1 : !0)
        } else c = !1;
        return c
    }, yh = function (a, b) {
        var c = b.j;
        return null != c ? Ta(c, function (a) {
            return xh(this,
                a)
        }, a) : null
    }, vh = function (a, b) {
        var c;
        if (c = null != b)t:{
            for (var d in a)if (a[d] == b) {
                c = !0;
                break t
            }
            c = !1
        }
        return c
    };
    var Ah = function (a) {
        var b = {};
        y(a.split(","), function (a) {
            var d = a.split("=");
            2 == d.length && (a = la(d[0]), d = la(d[1]), 0 < a.length && (b[a] = d))
        });
        return b
    };
    var V = function () {
        this.l = 1;
        this.h = -1;
        this.b = 1;
        this.k = this.j = 0;
        this.g = !1
    };
    g = V.prototype;
    g.xc = function () {
        return this.l
    };
    g.uc = function () {
        return this.h
    };
    g.sc = function () {
        return this.b
    };
    g.vc = function () {
        return this.j
    };
    g.wc = function () {
        return this.k
    };
    g.tc = function () {
        return this.g
    };
    var W = function (a) {
        this.b = a.content;
        this.m = a.contentType;
        this.h = a.size;
        this.k = a.masterSequenceNumber;
        this.K = a.resourceType;
        this.l = a.sequenceNumber;
        this.M = a.adSlotId;
        this.j = [];
        a = a.backupCompanions;
        null != a && (this.j = Qa(a, function (a) {
            return new W(a)
        }))
    };
    W.prototype.o = function () {
        return this.b
    };
    W.prototype.g = function () {
        return this.m
    };
    W.prototype.w = function () {
        return this.h.width
    };
    W.prototype.q = function () {
        return this.h.height
    };
    var X = function (a) {
        this.b = a
    };
    g = X.prototype;
    g.yc = function () {
        return this.b.adId
    };
    g.Ac = function () {
        return this.b.adSystem
    };
    g.wb = function () {
        return this.b.clickThroughUrl
    };
    g.Jc = function () {
        return this.b.adWrapperIds
    };
    g.Kc = function () {
        return this.b.adWrapperSystems
    };
    g.Lc = function () {
        return this.b.linear
    };
    g.Mc = function () {
        return this.b.skippable
    };
    g.Cc = function () {
        return this.b.contentType
    };
    g.oc = function () {
        return this.b.description
    };
    g.pc = function () {
        return this.b.title
    };
    g.gb = function () {
        return this.b.duration
    };
    g.Ic = function () {
        return this.b.width
    };
    g.Dc = function () {
        return this.b.height
    };
    g.Hc = function () {
        return this.b.uiElements
    };
    g.Ec = function () {
        return this.b.minSuggestedDuration
    };
    g.zc = function () {
        var a = this.b.adPodInfo, b = new V;
        b.j = a.podIndex;
        b.k = a.timeOffset;
        b.l = a.totalAds;
        b.b = a.adPosition;
        b.g = a.isBumper;
        b.h = a.maxDuration;
        return b
    };
    g.Bc = function (a, b, c) {
        var d = Qa(this.b.companions, function (a) {
            return new W(a)
        });
        return zh(new wh(new L(a, b), c), d)
    };
    g.Fc = function () {
        return Ah(va(this.b.traffickingParameters))
    };
    g.Gc = function () {
        return this.b.traffickingParameters
    };
    var Y = function (a, b, c, d) {
        N.call(this);
        this.b = a;
        this.l = null;
        this.D = d;
        this.B = !1;
        this.J = 1;
        this.O = b;
        this.w = -1;
        this.g = this.h = null;
        this.j = new qh;
        this.H = !1;
        this.m = new A;
        this.q = null != this.b.g && !0;
        this.o = new U(this);
        this.o.r(this.D, "adsManager", this.P)
    };
    v(Y, N);
    Y.prototype.P = function (a) {
        switch (a.G) {
            case "error":
                a = a.I;
                var b = new Ac(Bh(a));
                this.H ? (this.dispatchEvent(b), this.h = null) : this.j.g.push(b);
                Qg(Ig.getInstance(), 7, {error: a.errorCode}, !0);
                break;
            case "allAdsCompleted":
                Ch(this, a.G, a.I);
                this.mb();
                break;
            case "remainingTime":
                b = a.I;
                this.w = b.remainingTime;
                break;
            case "skip":
                Ch(this, a.G, a.I);
                break;
            case "log":
                b = a.I;
                Ch(this, a.G, b.adData, b.logData);
                break;
            case "companionBackfill":
                a = aa("window.google_show_companion_ad");
                null != a && a();
                break;
            case "skipshown":
                this.B = !0;
                Ch(this, a.G, a.I);
                break;
            default:
                Ch(this, a.G, a.I)
        }
    };
    var Ch = function (a, b, c, d) {
        if (null == c.companions) {
            var e = a.m.get(c.adId);
            c.companions = null != e ? e : []
        }
        e = null != c.adData ? new X(c.adData) : null;
        switch (b) {
            case "adBreakReady":
                b = new T(b, null, c);
                break;
            case "adMetadata":
                b = null;
                null != c.adCuePoints && (b = new Tg(c.adCuePoints));
                b = new $g(e, b);
                break;
            case "loaded":
                a.h = e;
                a.w = e.gb();
                b = new T(b, e, c.adData);
                break;
            case "start":
                Hb(a.m, c.adId, c.companions);
                null != Dh(a.b) && (null != a.g ? eh(a.g) : (a.g = new ah, a.o.r(a.g, "click", a.Wb)), ch(a.g, Dh(a.b)));
                b = new T(b, e);
                break;
            case "complete":
                null !=
                    a.g && eh(a.g);
                a.h = null;
                Kb(a.m, c.adId);
                b = new T(b, e);
                break;
            case "log":
                c = {adError: Bh(d)};
                b = new T(b, e, c);
                break;
            default:
                b = new T(b, e)
        }
        a.dispatchEvent(b)
    }, Bh = function (a) {
        var b = new H(a.type, a.errorMessage, a.errorCode);
        null != a.innerError && (b.g = Error(a.innerError));
        return b
    }, Z = function (a, b, c) {
        a.D.send("adsManager", b, c)
    };
    g = Y.prototype;
    g.Vb = function () {
        Z(this, "contentTimeUpdate", {currentTime: this.N.currentTime})
    };
    g.Tb = function () {
        var a = this.b.k;
        a instanceof lh && (a.O = a.b.currentSrc, a.b.ended ? a.l = -1 : a.l = a.b.currentTime)
    };
    g.Ub = function () {
        var a = this.b.k;
        a instanceof lh && mh(a)
    };
    g.Xc = function () {
        Z(this, "sendImpressionUrls")
    };
    g.Uc = function (a, b, c) {
        if (this.j.isEmpty())this.H = !0, this.jb(a, b, c), Z(this, "init", {width: a, height: b, viewMode: c}); else {
            for (; !this.j.isEmpty();)a = this.j, 0 == a.b.length && (a.b = a.g, a.b.reverse(), a.g = []), a = a.b.pop(), this.dispatchEvent(a);
            this.F()
        }
    };
    g.ld = function () {
        return this.b.m()
    };
    g.kd = function () {
        return this.q
    };
    g.Sc = function () {
        return this.w
    };
    g.Pc = function () {
        return this.B
    };
    g.$c = function () {
        Z(this, "skip")
    };
    g.start = function () {
        var a = this.b;
        a.o = this.q && null != a.g;
        this.b.l.T.style.opacity = 1;
        Z(this, "start")
    };
    g.Wb = function () {
        if ((null == this.l || !this.l.disableClickThrough) && null != this.h) {
            var a = this.h.wb();
            null != a && window.open(Gg(a), "_blank")
        }
    };
    g.jb = function (a, b, c) {
        var d = this.b, e = d.h;
        null != e && (-1 == a ? (e.style.right = 0, e.style.left = 0) : e.style.width = a + "px", -1 == b ? (e.style.bottom = 0, e.style.top = 0) : e.style.height = b + "px");
        null != d.l && (d = d.l, d.T.width = -1 == a ? "100%" : a, d.T.height = -1 == b ? "100%" : b);
        Z(this, "resize", {width: a, height: b, viewMode: c})
    };
    g.ad = function () {
        Z(this, "stop")
    };
    g.Oc = function () {
        Z(this, "expand")
    };
    g.Nc = function () {
        Z(this, "collapse")
    };
    g.Tc = function () {
        return this.J
    };
    g.Zc = function (a) {
        this.J = a;
        var b = this.b.k;
        null != b && b.Na(a);
        Z(this, "volume", {volume: a})
    };
    g.Yc = function (a) {
        Z(this, "mediaUrl", {mediaUrl: a})
    };
    g.Vc = function () {
        Z(this, "pause")
    };
    g.Wc = function () {
        Z(this, "resume")
    };
    g.mb = function () {
        this.F()
    };
    g.Qc = function () {
        return this.O
    };
    g.Rc = function () {
        return this.h
    };
    g.A = function () {
        Z(this, "destroy");
        null != this.g && this.g.F();
        this.o.F();
        this.j.clear();
        this.k && (Fd(this.k.b), this.k.F());
        Y.R.A.call(this)
    };
    var Eh = function (a, b, c) {
        I.call(this, "adsManagerLoaded");
        this.g = a;
        this.j = b;
        this.o = c || ""
    };
    v(Eh, I);
    Eh.prototype.k = function (a, b) {
        var c = this.g;
        c.N = a;
        null != b && (c.l = b, c.l.restoreCustomPlaybackStateOnAdBreakComplete && c.b.m() && (qd(c, "contentPauseRequested", c.Tb, !1, c), qd(c, "contentResumeRequested", c.Ub, !1, c)));
        null != a.currentTime && (c.k = new Zg(a), c.k.r("currentTimeUpdate", c.Vb, !1, c), c.k.start());
        var d = {};
        null != b && Gb(d, b);
        c.q && (d.useVideoAdUi = !1, d.disableClickThrough = !0);
        Z(c, "configure", {adsRenderingSettings: d});
        return this.g
    };
    Eh.prototype.m = function () {
        return this.j
    };
    Eh.prototype.l = function () {
        return this.o
    };
    var Fh = function (a) {
        N.call(this);
        this.g = a || "goog_" + ya++;
        this.b = []
    };
    v(Fh, N);
    Fh.prototype.k = !1;
    Fh.prototype.connect = function () {
        for (this.k = !0; 0 != this.b.length;) {
            var a = this.b.shift();
            Gh(this, a.name, a.type, a.data)
        }
    };
    Fh.prototype.send = function (a, b, c) {
        this.k ? Gh(this, a, b, c) : this.b.push({name: a, type: b, data: c})
    };
    var Hh = function (a, b, c, d, e) {
        I.call(this, a);
        this.G = b;
        this.I = c;
        this.ua = d;
        this.ib = e
    };
    v(Hh, I);
    Hh.prototype.toString = function () {
        return""
    };
    var Ih = function (a, b) {
        Fh.call(this, b);
        this.h = a;
        this.V = null;
        this.j = new U(this);
        this.j.r(M(), "message", this.l)
    };
    v(Ih, Fh);
    var Jh = function (a) {
        if (null == a || !t(a) || 0 != a.lastIndexOf("ima://", 0))return null;
        a = a.substr(6);
        try {
            return lf(a)
        } catch (b) {
            return null
        }
    }, Gh = function (a, b, c, d) {
        null != a.V && null != a.V.postMessage && a.V.postMessage(Kh(a, b, c, d), "*");
        null != a.V && null == a.V.postMessage && Qg(Ig.getInstance(), 11)
    };
    Ih.prototype.A = function () {
        this.j.F();
        Ih.R.A.call(this)
    };
    Ih.prototype.l = function (a) {
        a = a.g;
        var b = Jh(a.data);
        if (null != b) {
            if (null == this.V)this.V = a.source; else if (this.V != a.source)return;
            var c = b.channel;
            null != c && c == this.h && (c = b.sid, null != c && ("*" != this.g && c != this.g || this.dispatchEvent(new Hh(b.name, b.type, b.data || {}, b.sid, a.origin))))
        }
    };
    var Kh = function (a, b, c, d) {
        var e = {};
        e.name = b;
        e.type = c;
        null != d && (e.data = d);
        e.sid = a.g;
        e.channel = a.h;
        return"ima://" + of(e)
    };
    var Lh = function (a, b) {
        N.call(this);
        this.j = a;
        this.h = b;
        this.b = {};
        this.g = new U(this);
        this.g.r(M(), "message", this.k)
    };
    v(Lh, N);
    Lh.prototype.send = function (a) {
        var b = a.g;
        this.b.hasOwnProperty(b) && this.b[b].send(a.type, a.G, a.I)
    };
    var Nh = function (a, b, c, d) {
        a.b.hasOwnProperty(b) || (c = new Ih(b, c), a.g.r(c, a.j, function (a) {
            this.dispatchEvent(new Mh(a.type, a.G, a.I, a.ua, a.ib, b))
        }), c.V = d, c.connect(), a.b[b] = c)
    };
    Lh.prototype.A = function () {
        this.g.F();
        zc(this.b);
        Lh.R.A.call(this)
    };
    Lh.prototype.k = function (a) {
        a = a.g;
        var b = Jh(a.data);
        if (null != b) {
            var c = b.channel;
            if (this.h && !this.b.hasOwnProperty(c)) {
                var d = b.sid;
                Nh(this, c, d, a.source);
                this.dispatchEvent(new Mh(b.name, b.type, b.data || {}, d, a.origin, c))
            }
        }
    };
    var Mh = function (a, b, c, d, e, f) {
        Hh.call(this, a, b, c, d, e);
        this.g = f
    };
    v(Mh, Hh);
    var Ph = function () {
        var a = aa("google.ima.gptProxyInstance", M());
        if (null != a)return a;
        U.call(this);
        this.j = new Lh("gpt", !0);
        this.r(this.j, "gpt", this.l);
        this.b = null;
        Oh() || M().top === M() || (this.b = new Lh("gpt", !1), this.r(this.b, "gpt", this.k))
    };
    v(Ph, U);
    var Oh = function () {
        return!!aa("googletag.cmd", M())
    }, Qh = function () {
        var a = aa("googletag.console", M());
        return null != a ? a : null
    };
    Ph.prototype.l = function (a) {
        var b = a.ib, c = ac("//imasdk.googleapis.com"), b = ac(b);
        if (c[3] == b[3] && c[4] == b[4])if (null != this.b)Nh(this.b, a.g, a.ua, M().parent), null != this.b && this.b.send(a); else if (c = a.I, null != c && p(c.scope)) {
            var b = c.scope, c = c.args, d;
            if ("proxy" == b)c = a.G, "isGptPresent" == c ? d = Oh() : "isConsolePresent" == c && (d = null != Qh()); else if (Oh())if ("pubads" == b || "companionAds" == b) {
                d = a.G;
                var e, f = M().googletag;
                if (null != f && null != f[b] && (f = f[b](), null != f && (d = f[d], null != d)))try {
                    e = d.apply(f, c)
                } catch (h) {
                }
                d = e
            } else if ("console" ==
                b) {
                if (f = a.G, e = Qh(), null != e && (f = e[f], null != f))try {
                    f.apply(e, c)
                } catch (k) {
                }
            } else if (null === b) {
                e = a.G;
                d = M();
                if (0 <= Oa(["googleGetCompanionAdSlots", "googleSetCompanionAdContents"], e) && (e = d[e], null != e))try {
                    f = e.apply(d, c)
                } catch (n) {
                }
                d = f
            }
            p(d) && (a.I.returnValue = d, this.j.send(a))
        }
    };
    Ph.prototype.k = function (a) {
        this.j.send(a)
    };
    var Rh = function (a, b, c, d, e, f, h) {
        this.g = a;
        this.h = b;
        this.j = c;
        this.k = h;
        this.l = d;
        this.m = e;
        this.b = f
    };
    var Th = function (a, b) {
        var c = Array.prototype.slice.call(arguments), d = c.shift();
        if ("undefined" == typeof d)throw Error("[goog.string.format] Template required");
        return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function (a, b, d, k, n, m, s, F) {
            if ("%" == m)return"%";
            var B = c.shift();
            if ("undefined" == typeof B)throw Error("[goog.string.format] Not enough arguments");
            arguments[0] = B;
            return Sh[m].apply(null, arguments)
        })
    }, Sh = {s: function (a, b, c) {
        return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c -
            a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a
    }, f: function (a, b, c, d, e) {
        d = a.toString();
        isNaN(e) || "" == e || (d = a.toFixed(e));
        var f;
        f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
        0 <= a && (d = f + d);
        if (isNaN(c) || d.length >= c)return d;
        d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
        a = c - d.length - f.length;
        return d = 0 <= b.indexOf("-", 0) ? f + d + Array(a + 1).join(" ") : f + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d
    }, d: function (a, b, c, d, e, f, h, k) {
        return Sh.f(parseInt(a, 10), b, c, d, 0, f, h, k)
    }};
    Sh.i = Sh.d;
    Sh.u = Sh.d;
    var Vh = function (a, b) {
        N.call(this);
        this.h = new U(this);
        this.m = !1;
        this.o = "goog_" + ya++;
        this.k = new A;
        var c = this.o, c = Nc("iframe", {src: ("https:" == document.location.protocol ? "https:" : "http:") + Th("//imasdk.googleapis.com/js/core/bridge3.1.71_%s.html", Cc.Ya()) + "#" + c, style: "border:0; opacity:0; margin:0; padding:0; position:relative;"});
        Xf(this.h, c, "load", this.Kb, void 0);
        a.appendChild(c);
        this.T = c;
        this.j = Uh(this);
        this.l = b;
        this.b = this.l.k;
        this.g = null;
        this.h.r(this.j, "mouse", this.q);
        this.h.r(this.j, "touch", this.Nb);
        null != this.b && (this.h.r(this.j, "displayContainer", this.Lb), this.h.r(this.j, "videoDisplay", this.Mb), this.h.r(this.b, Ab(kh), this.Ob));
        var c = M(), d = aa("google.ima.gptProxyInstance", c);
        null == d && (d = new Ph, q("google.ima.gptProxyInstance", d, c))
    };
    v(Vh, N);
    var Uh = function (a, b) {
        var c = b || "*", d = a.k.get(c);
        null == d && (d = new Ih(a.o, c), a.m && (d.V = Rc(a.T), d.connect()), Hb(a.k, c, d));
        return d
    };
    Vh.prototype.A = function () {
        this.h.F();
        null !== this.g && (this.g.F(), this.g = null);
        wb(this.k.ra(!1), function (a) {
            a.F()
        });
        this.k.clear();
        Pc(this.T);
        Vh.R.A.call(this)
    };
    Vh.prototype.q = function (a) {
        var b = a.I, c = Xc(this.T), d = document.createEvent("MouseEvent");
        d.initMouseEvent(a.G, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null);
        if (!de || vg() || 0 == document.webkitIsFullScreen)this.T.blur(), window.focus();
        this.T.dispatchEvent(d)
    };
    var Wh = function (a, b) {
        var c = Xc(a.T), d = Qa(b, function (a) {
            return document.createTouch(window, this.T, a.identifier, a.pageX + c.x, a.pageY + c.y, a.screenX, a.screenY)
        }, a);
        return document.createTouchList.apply(document, d)
    };
    g = Vh.prototype;
    g.Nb = function (a) {
        var b = a.I, c = Xc(this.T), d = document.createEvent("TouchEvent");
        d.initTouchEvent(a.G, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, Wh(this, b.touches), Wh(this, b.targetTouches), Wh(this, b.changedTouches), b.scale, b.rotation);
        this.T.dispatchEvent(d)
    };
    g.Mb = function (a) {
        if (null != this.b) {
            var b = a.I;
            switch (a.G) {
                case "startTracking":
                    this.b.tb();
                    break;
                case "stopTracking":
                    this.b.na();
                    break;
                case "exitFullscreen":
                    this.b.qb();
                    break;
                case "play":
                    this.b.sa();
                    break;
                case "pause":
                    this.b.sb();
                    break;
                case "load":
                    this.b.rb(b.videoUrl, b.mimeType);
                    break;
                case "setCurrentTime":
                    this.b.qa(b.currentTime);
                    break;
                case "setPlaybackOptions":
                    a = b.playbackOptions, this.b.ub(new Rh(a.adFormat, a.adSenseAgcid, a.ctaAnnotationTrackingEvents, a.showAnnotations, a.viewCountsDisabled, a.loadVideoTimeout,
                        a.ibaDisabled))
            }
        }
    };
    g.Ob = function (a) {
        var b = {};
        switch (a.type) {
            case "beginFullscreen":
                a = "fullscreen";
                break;
            case "endFullscreen":
                a = "exitFullscreen";
                break;
            case "click":
                a = "click";
                break;
            case "end":
                a = "end";
                break;
            case "error":
                a = "error";
                break;
            case "mediaLoadTimeout":
                a = "mediaLoadTimeout";
                break;
            case "pause":
                a = "pause";
                b.ended = this.b.ta();
                break;
            case "play":
                a = "play";
                break;
            case "skip":
                a = "skip";
                break;
            case "start":
                a = "start";
                break;
            case "timeUpdate":
                a = "timeupdate";
                b.currentTime = this.b.da();
                b.duration = this.b.Ma();
                break;
            case "volumeChange":
                a =
                    "volumeChange";
                b.volume = this.b.ob();
                break;
            default:
                return
        }
        this.j.send("videoDisplay", a, b)
    };
    g.Lb = function (a) {
        switch (a.G) {
            case "showVideo":
                null != this.g ? eh(this.g) : (this.g = new ah, this.h.r(this.g, "click", this.Xb));
                ch(this.g, Dh(this.l));
                a = this.l;
                null != a.b && (a = a.b.b, null != a && (a.style.display = "block"));
                break;
            case "hide":
                null !== this.g && (this.g.F(), this.g = null), a = this.l, null != a.b && (a = a.b.b, null != a && (a.style.display = "none"))
        }
    };
    g.Xb = function () {
        this.j.send("displayContainer", "videoClick")
    };
    g.Kb = function () {
        wb(this.k.ra(!1), function (a) {
            a.V = Rc(this.T);
            a.connect()
        }, this);
        this.m = !0
    };
    (function () {
        if (!zb(function (a) {
            return a.match(M().location.href)
        })) {
            var a = Ic();
            if (null == Ta(a, function (a) {
                return zb(function (c) {
                    return c.match(a.src)
                })
            }))throw Error("IMA SDK is either not loaded from a google domain or is not a supported version.");
        }
    })();
    var $ = function (a) {
        N.call(this);
        this.b = a;
        this.h = new A;
        this.g = this.b.l;
        this.j = new U(this);
        if (this.g) {
            a = $f();
            var b = Uh(this.g);
            a.g || (a.b = b || null, a.b && a.j.r(a.b, "activityMonitor", a.k), a.g = !0);
            b = String(Math.floor(1E9 * Math.random()));
            Hb(a.h, b, this.b.w);
            this.k = b
        }
        var c;
        t:{
            try {
                c = window.top.location.href
            } catch (d) {
                c = 2;
                break t
            }
            c = null != c ? c == window.document.location.href ? 0 : 1 : 2
        }
        Sg.b = c
    };
    v($, N);
    g = $.prototype;
    g.A = function () {
        this.j.F();
        var a = $f();
        Kb(a.h, this.k);
        $.R.A.call(this)
    };
    g.gd = function () {
        this.F()
    };
    g.jd = function (a, b) {
        a.adTagUrl && Qg(Ig.getInstance(), 8, {adtagurl: a.adTagUrl, customPlayback: this.b.m(), customClick: null != this.b.g, restrict: Cc.oa()});
        var c;
        try {
            c = window.top.location.href
        } catch (d) {
            c = window.location.href
        }
        a.location = c;
        a.referrer = window.document.referrer;
        a.supportsYouTubeHosted = this.b.q();
        c = a.adTagUrl;
        var e;
        if (e = null != c) {
            e = c.search(bc);
            var f;
            n:{
                for (f = 0; 0 <= (f = c.indexOf("client", f)) && f < e;) {
                    var h = c.charCodeAt(f - 1);
                    if (38 == h || 63 == h)if (h = c.charCodeAt(f + 6), !h || 61 == h || 38 == h || 35 == h)break n;
                    f += 7
                }
                f = -1
            }
            if (0 > f)c = null; else {
                h = c.indexOf("&", f);
                if (0 > h || h > e)h = e;
                f += 7;
                c = decodeURIComponent(c.substr(f, h - f).replace(/\+/g, " "))
            }
            e = "ca-pub-6219811747049371" != c
        }
        e ? c = null : (c = aa("window.yt.util.activity.getTimeSinceActive"), c = null != c ? c().toString() : null);
        null != c && (a.lastActivity = c);
        c = a.adTagUrl;
        null != c ? (e = new cc(c), c = e.pa, e = e.Z, f = e.length - 27, c = 0 <= f && e.indexOf("googleads.g.doubleclick.net", f) == f && (ka(va(c)) ? !1 : /\/pagead\/ads/.test(c))) : c = !1;
        if (c) {
            c = window;
            e = Ma().document;
            f = {};
            var k, n, h = jb(window);
            if (k = vc())k = {url: k,
                Ka: !0}; else if (k = h.location.href, h == h.top)k = {url: k, Ka: !0}; else {
                n = !1;
                var m = h.document;
                m && m.referrer && (k = m.referrer, h.parent == h.top && (n = !0));
                (m = h.location.ancestorOrigins) && (m = m[m.length - 1]) && -1 == k.indexOf(m) && (n = !1, k = m);
                k = {url: k, Ka: n}
            }
            t:{
                n = Ma();
                var m = c.Qb || n.Qb, s = c.Pb || n.Pb;
                if (n.top == n)n = !1; else {
                    var F = e.documentElement;
                    if (m && s) {
                        var B = 1, Aa = 1;
                        n.innerHeight ? (B = n.innerWidth, Aa = n.innerHeight) : F && F.clientHeight ? (B = F.clientWidth, Aa = F.clientHeight) : e.body && (B = e.body.clientWidth, Aa = e.body.clientHeight);
                        if (Aa >
                            2 * s || B > 2 * m) {
                            n = !1;
                            break t
                        }
                    }
                    n = !0
                }
            }
            k = k.Ka;
            m = Ma();
            m = m.top == m ? 0 : Ea(m.top) ? 1 : 2;
            s = 4;
            n || 1 != m ? n || 2 != m ? n && 1 == m ? s = 7 : n && 2 == m && (s = 8) : s = 6 : s = 5;
            k && (s |= 16);
            f.pd = "" + s;
            if (!c.Ja && "ad.yieldmanager.com" == e.domain) {
                for (k = e.URL.substring(e.URL.lastIndexOf("http")); -1 < k.indexOf("%");)try {
                    k = decodeURIComponent(k)
                } catch (vb) {
                    break
                }
                c.Ja = k
            }
            !vc() && c.Ja ? (f.eb = c.Ja, f.Sb = wc(e, n) || "EMPTY") : (f.eb = wc(e, n), f.Sb = null);
            f.qd = e.URL == f.eb ? Date.parse(e.lastModified) / 1E3 : null;
            f.rd = h == h.top ? h.document.referrer : vc(!0) || "";
            a.adSenseParams = f
        }
        e = "goog_" +
            ya++;
        Hb(this.h, e, b || null);
        c = {};
        Gb(c, a);
        c.settings = {allowVpaid: this.ca().b, autoPlayAdBreaks: this.ca().cb(), chromelessPlayer: !1, companionBackfill: this.ca().$a(), isAdMob: !1, isYouTube: !1, numRedirects: this.ca().ab(), onScreenDetection: !0, ppid: this.ca().bb(), restrictToCustomPlayback: this.ca().oa()};
        f = this.b.k;
        c.videoEnvironment = {iframeState: Sg.b, osdId: this.k, supportedMimeTypes: null != f ? f.Za() : null, usesChromelessPlayer: this.b.B(), usesCustomVideoPlayback: this.b.m(), usesYouTubePlayer: this.b.q()};
        e = Uh(this.g,
            e);
        this.j.r(e, "adsLoader", this.Rb);
        e.send("adsLoader", "requestAds", c)
    };
    g.ca = function () {
        return Cc
    };
    g.fd = function () {
        Uh(this.g).send("adsLoader", "contentComplete")
    };
    g.Rb = function (a) {
        switch (a.G) {
            case "adsLoaded":
                var b = a.I;
                a = a.ua;
                var c = new Y(this.b, b.adCuePoints, 0, Uh(this.g, a));
                this.dispatchEvent(new Eh(c, this.h.get(a), b.response));
                break;
            case "error":
                b = a.I, a = a.ua, c = new H(b.type, b.errorMessage, b.errorCode), null != b.innerError && (c.g = Error(b.innerError)), this.dispatchEvent(new Ac(c, this.h.get(a))), Qg(Ig.getInstance(), 7, {error: b.errorCode}, !0)
        }
    };
    var Xh = function (a, b) {
        if (null == a || !Qc(Gc(a), a))throw Yg(Xg, null, "containerElement", "element");
        this.k = a;
        this.g = this.b = null;
        this.j = b;
        this.h = null;
        this.b = Nc("div", {style: "display:none;"});
        var c = Nc("video", {style: "background-color:#000;position:absolute;width:100%;height:100%;"});
        c.setAttribute("webkit-playsinline", !0);
        this.g = c;
        this.h = Nc("div", {style: "position:absolute;width:100%;height:100%;"});
        this.k.appendChild(this.b);
        this.b.appendChild(this.g);
        this.j && (c = Nc("div", {id: this.j, style: "display:none;background-color:#000;position:absolute;width:100%;height:100%;"}),
            this.b.appendChild(c));
        this.b.appendChild(this.h)
    };
    v(Xh, xc);
    Xh.prototype.F = function () {
        Pc(this.b)
    };
    var Yh = function (a) {
        if (ka(va(a)))return null;
        var b = a.match(/^https?:\/\/[^\/]*youtu\.be\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/video\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)return b[1];
        b = a.match(/^https?:\/\/[^\/]*youtube.com\/watch\/([a-zA-Z0-9_-]+)$/);
        if (null != b && 2 == b.length)return b[1];
        a = (new cc(a)).b;
        return uc(a, "v") ? a.get("v").toString() : uc(a, "video_id") ? a.get("video_id").toString() : null
    };
    var $h = function (a) {
        N.call(this);
        this.J = "ima-chromeless-video";
        var b = null;
        null != a && (t(a) ? this.J = a : b = a);
        this.N = new U(this);
        this.k = null;
        this.j = !1;
        this.m = -1;
        this.D = !1;
        this.l = -1;
        this.h = this.B = this.o = null;
        this.U = "";
        this.g = !1;
        this.O = null != b;
        this.q = this.H = this.b = null;
        this.w = void 0;
        null != b ? (this.g = !0, this.b = b, this.w = 2) : (a = u(this.Jb, this), Zh ? a() : (Ua.push(a), a = document.createElement("script"), a.src = "https://www.youtube.com/iframe_api", b = document.getElementsByTagName("script")[0], b.parentNode.insertBefore(a,
            b)))
    };
    v($h, jh);
    var ai = {el: "adunit", controls: 0, html5: 1, playsinline: 1, showinfo: 0}, Ua = [], Zh = !1;
    g = $h.prototype;
    g.ub = function (a) {
        this.h = a
    };
    g.rb = function (a, b) {
        null !== a && (this.U = a, this.g ? bi(this, a, b) : (this.o = a, this.B = b))
    };
    g.Na = function (a) {
        this.O ? this.dispatchEvent("volumeChange") : this.g ? (a = Math.min(Math.max(100 * a, 0), 100), this.b.setVolume(a), this.l = -1, this.dispatchEvent("volumeChange")) : this.l = a
    };
    g.ob = function () {
        return this.g ? this.b.getVolume() / 100 : this.l
    };
    g.sa = function () {
        if (!ka(va(this.U))) {
            if (!this.j) {
                ci(this);
                var a = 15E3;
                null != this.h && 0 < this.h.b && (a = this.h.b);
                this.aa = Gd(this.ka, a, this)
            }
            this.g ? (this.D = !1, di(this), this.k = new Ed(100), this.N.r(this.k, "tick", this.W), this.k.start(), this.b.playVideo()) : this.D = !0
        }
    };
    g.sb = function () {
        this.g && this.j && (di(this), this.b.pauseVideo())
    };
    g.pb = function () {
        return this.g ? 2 == this.b.getPlayerState(this.w) : !1
    };
    g.qb = function () {
    };
    g.Pa = function () {
        return!1
    };
    g.qa = function (a) {
        this.g ? this.b.seekTo(a, !1) : this.m = a
    };
    g.da = function () {
        return this.g ? this.b.getCurrentTime(this.w) : -1
    };
    g.Ma = function () {
        return this.g && this.j ? this.b.getDuration(this.w) : -1
    };
    g.Za = function () {
        return Ab(Ag)
    };
    g.ta = function () {
        return this.g ? 0 == this.b.getPlayerState(this.w) : !1
    };
    g.Oa = function () {
        var a = document.getElementById(this.J);
        return new L(a.offsetWidth, a.offsetHeight)
    };
    g.tb = function () {
        this.H = u(this.ba, this);
        this.q = u(this.P, this);
        this.O && (this.b.addEventListener("onAdStateChange", this.q), this.b.addEventListener("onReady", this.H), this.b.addEventListener("onStateChange", this.q))
    };
    g.na = function () {
        this.O && (this.b.removeEventListener("onAdStateChange", this.q), this.b.removeEventListener("onReady", this.H), this.b.removeEventListener("onStateChange", this.q))
    };
    g.Jb = function () {
        var a = this.J, b = {playerVars: Eb(ai), events: {onError: u(this.ma, this), onReady: u(this.ba, this), onAdStateChange: u(this.P, this), onStateChange: u(this.P, this)}}, c = aa("YT");
        this.b = null != c && null != c.Player ? new c.Player(a, b) : null
    };
    var bi = function (a, b, c) {
        var d = {};
        if (null != a.h) {
            var e = a.h.h;
            null != e && (d.agcid = e);
            e = a.h.g;
            null != e && (d.adformat = e);
            (e = a.h.j) && (d.cta_conversion_urls = e);
            d.iv_load_policy = a.h.l ? 1 : 3;
            a.h.k && (d.noiba = 1);
            a.h.m && (d.utpsa = 1)
        }
        null != b ? Fg(Bg, b) ? (e = b.match(/yt_vid\/([a-zA-Z0-9_-]{11})/), e = null != e && 1 < e.length ? e[1] : null) : e = null != b && Fg(Cg, b) ? Yh(b) : null : e = null;
        null === e ? d.url_encoded_third_party_media = "url=" + encodeURIComponent(b) + "&type=" + encodeURIComponent(null === c ? "" : c) : d.videoId = e;
        a.j = !1;
        a.b.cueVideoByPlayerVars(d)
    };
    $h.prototype.ma = function () {
        this.dispatchEvent("error")
    };
    $h.prototype.ba = function () {
        this.g = !0;
        -1 != this.l && (this.Na(this.l), this.l = -1);
        null != this.o && (bi(this, this.o, this.B), this.B = this.o = null);
        -1 != this.m && (this.qa(this.m), this.m = -1);
        this.D && this.sa()
    };
    $h.prototype.P = function (a) {
        switch (a.data) {
            case 0:
                this.j ? this.dispatchEvent("end") : this.dispatchEvent("error");
                break;
            case 1:
                this.j || (ci(this), this.j = !0, this.dispatchEvent("start"));
                this.dispatchEvent("play");
                break;
            case 2:
                this.dispatchEvent("pause")
        }
    };
    var di = function (a) {
        a.N.xa(a.k, "tick", a.W);
        null != a.k && (Fd(a.k), a.k = null)
    }, ci = function (a) {
        null != a.aa && l.clearTimeout(a.aa)
    };
    $h.prototype.W = function () {
        this.dispatchEvent("timeUpdate")
    };
    $h.prototype.ka = function () {
        this.dispatchEvent("mediaLoadTimeout")
    };
    $h.prototype.A = function () {
        di(this);
        ci(this);
        this.na();
        this.g = !1;
        this.N.F();
        this.m = -1;
        this.B = null;
        this.D = !1;
        this.o = null;
        this.l = -1;
        this.H = this.b = this.h = null;
        this.j = !1;
        this.U = "";
        $h.R.A.call(this)
    };
    q("onYouTubeIframeAPIReady", function () {
        Zh = !0;
        y(Ua, function (a) {
            a()
        });
        Va()
    }, window);
    var ei = function (a, b, c, d) {
        if (null == a || !Qc(Gc(a), a))throw Yg(Xg, null, "containerElement", "element");
        var e = null != b || null != d;
        if (!e && Cc.oa())throw Yg(Wg, null, "Custom video element was not provided even though the setting restrictToCustomPlayback is set to true.");
        Cc.oa() && (e = !0);
        this.g = (this.j = e) ? c || null : null;
        this.o = null != this.g;
        this.D = e && null != d;
        Qg(Ig.getInstance(), 8, {enabled: this.j, yt: null != d, customClick: null != this.g});
        c = Nc("div", {style: "position:absolute"});
        a.insertBefore(c, a.firstChild);
        this.h = c;
        this.b =
            !this.j && this.h && tg() ? new Xh(this.h, null) : null;
        a = null;
        this.j ? b ? a = new lh(b) : d && (a = new $h(d)) : this.b && (a = new lh(this.b.g));
        this.k = a;
        var f;
        this.j && b ? f = b : f = this.h;
        this.w = f;
        this.l = null != this.h ? new Vh(this.h, this) : null
    };
    ei.prototype.M = function () {
        null != this.b && tg() && this.b.g.load()
    };
    ei.prototype.K = function () {
        yc(this.b);
        yc(this.l);
        yc(this.k);
        Pc(this.h)
    };
    var Dh = function (a) {
        return a.o && a.g ? a.g : null != a.b ? a.b.h : null
    };
    ei.prototype.m = function () {
        return this.j
    };
    ei.prototype.B = function () {
        return!1
    };
    ei.prototype.q = function () {
        return this.D
    };
    var fi = function () {
    };
    g = fi.prototype;
    g.clone = function () {
        var a = new fi;
        "unknown" != this.Ra && a.setAdWillAutoPlay("auto" == this.Ra);
        a.adTagUrl = this.adTagUrl;
        a.adSenseParams = Eb(this.adSenseParams);
        a.adsResponse = this.adsResponse;
        a.kb = Eb(this.kb);
        a.isAdMob = this.isAdMob;
        a.isYouTube = this.isYouTube;
        a.location = this.location;
        a.b = this.b;
        a.g = this.g;
        a.language = this.language;
        a.linearAdSlotWidth = this.linearAdSlotWidth;
        a.linearAdSlotHeight = this.linearAdSlotHeight;
        a.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth;
        a.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight;
        a.tagForChildDirectedContent = this.tagForChildDirectedContent;
        a.usePostAdRequests = this.usePostAdRequests;
        a.lb = this.lb;
        a.youTubeAdType = this.youTubeAdType;
        a.youTubeExperimentIds = this.youTubeExperimentIds;
        a.youTubeVideoAdStartDelay = this.youTubeVideoAdStartDelay;
        return a
    };
    g.adSenseParams = null;
    g.kb = null;
    g.Ra = "unknown";
    g.isAdMob = !1;
    g.isYouTube = !1;
    g.linearAdSlotWidth = 0;
    g.linearAdSlotHeight = 0;
    g.nonLinearAdSlotWidth = 0;
    g.nonLinearAdSlotHeight = 0;
    g.tagForChildDirectedContent = !1;
    g.usePostAdRequests = !1;
    g.lb = !0;
    g.youTubeVideoAdStartDelay = 0;
    g.setAdWillAutoPlay = function (a) {
        this.Ra = a ? "auto" : "click"
    };
    X.prototype.getClickThroughUrl = X.prototype.wb;
    X.prototype.getCompanionAds = X.prototype.Bc;
    X.prototype.isLinear = X.prototype.Lc;
    X.prototype.isSkippable = X.prototype.Mc;
    X.prototype.getAdId = X.prototype.yc;
    X.prototype.getAdSystem = X.prototype.Ac;
    X.prototype.getContentType = X.prototype.Cc;
    X.prototype.getDescription = X.prototype.oc;
    X.prototype.getTitle = X.prototype.pc;
    X.prototype.getDuration = X.prototype.gb;
    X.prototype.getHeight = X.prototype.Dc;
    X.prototype.getWidth = X.prototype.Ic;
    X.prototype.getWrapperAdIds = X.prototype.Jc;
    X.prototype.getWrapperAdSystems = X.prototype.Kc;
    X.prototype.getTraffickingParameters = X.prototype.Fc;
    X.prototype.getTraffickingParametersString = X.prototype.Gc;
    X.prototype.getAdPodInfo = X.prototype.zc;
    X.prototype.getUiElements = X.prototype.Hc;
    X.prototype.getMinSuggestedDuration = X.prototype.Ec;
    Tg.prototype.getCuePoints = Tg.prototype.b;
    q("google.ima.AdCuePoints.PREROLL", 0, window);
    q("google.ima.AdCuePoints.POSTROLL", -1, window);
    q("google.ima.AdDisplayContainer", ei, window);
    ei.prototype.initialize = ei.prototype.M;
    ei.prototype.destroy = ei.prototype.K;
    V.prototype.getPodIndex = V.prototype.vc;
    V.prototype.getTimeOffset = V.prototype.wc;
    V.prototype.getTotalAds = V.prototype.xc;
    V.prototype.getMaxDuration = V.prototype.uc;
    V.prototype.getAdPosition = V.prototype.sc;
    V.prototype.getIsBumper = V.prototype.tc;
    q("google.ima.AdError.ErrorCode.VIDEO_PLAY_ERROR", 400, window);
    q("google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS", 1005, window);
    q("google.ima.AdError.ErrorCode.REQUIRED_LISTENERS_NOT_ADDED", 900, window);
    q("google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT", 301, window);
    q("google.ima.AdError.ErrorCode.VAST_NO_ADS_AFTER_WRAPPER", 303, window);
    q("google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT", 402, window);
    q("google.ima.AdError.ErrorCode.VAST_TOO_MANY_REDIRECTS", 302, window);
    q("google.ima.AdError.ErrorCode.VAST_ASSET_MISMATCH", 403, window);
    q("google.ima.AdError.ErrorCode.VAST_LINEAR_ASSET_MISMATCH", 403, window);
    q("google.ima.AdError.ErrorCode.VAST_NONLINEAR_ASSET_MISMATCH", 503, window);
    q("google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND", 1007, window);
    q("google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION", 102, window);
    q("google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR", 101, window);
    q("google.ima.AdError.ErrorCode.VAST_TRAFFICKING_ERROR", 200, window);
    q("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_LINEARITY", 201, window);
    q("google.ima.AdError.ErrorCode.INVALID_ARGUMENTS", 1101, window);
    q("google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE", 1010, window);
    q("google.ima.AdError.ErrorCode.UNKNOWN_ERROR", 900, window);
    q("google.ima.AdError.ErrorCode.OVERLAY_AD_PLAYING_FAILED", 500, window);
    q("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window);
    q("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window);
    q("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window);
    q("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window);
    q("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window);
    q("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window);
    q("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window);
    q("google.ima.AdError.Type.AD_LOAD", "adLoadError", window);
    q("google.ima.AdError.Type.AD_PLAY", "adPlayError", window);
    H.prototype.getErrorCode = H.prototype.yb;
    H.prototype.getVastErrorCode = H.prototype.qc;
    H.prototype.getInnerError = H.prototype.Sa;
    H.prototype.getMessage = H.prototype.zb;
    H.prototype.getType = H.prototype.rc;
    q("google.ima.AdErrorEvent.Type.AD_ERROR", "adError", window);
    Ac.prototype.getError = Ac.prototype.k;
    Ac.prototype.getUserRequestContext = Ac.prototype.l;
    q("google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED", "contentResumeRequested", window);
    q("google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED", "contentPauseRequested", window);
    q("google.ima.AdEvent.Type.CLICK", "click", window);
    q("google.ima.AdEvent.Type.EXPANDED_CHANGED", "expandedChanged", window);
    q("google.ima.AdEvent.Type.STARTED", "start", window);
    q("google.ima.AdEvent.Type.IMPRESSION", "impression", window);
    q("google.ima.AdEvent.Type.PAUSED", "pause", window);
    q("google.ima.AdEvent.Type.RESUMED", "resume", window);
    q("google.ima.AdEvent.Type.FIRST_QUARTILE", "firstquartile", window);
    q("google.ima.AdEvent.Type.MIDPOINT", "midpoint", window);
    q("google.ima.AdEvent.Type.THIRD_QUARTILE", "thirdquartile", window);
    q("google.ima.AdEvent.Type.COMPLETE", "complete", window);
    q("google.ima.AdEvent.Type.USER_CLOSE", "userClose", window);
    q("google.ima.AdEvent.Type.LOADED", "loaded", window);
    q("google.ima.AdEvent.Type.AD_METADATA", "adMetadata", window);
    q("google.ima.AdEvent.Type.AD_BREAK_READY", "adBreakReady", window);
    q("google.ima.AdEvent.Type.ALL_ADS_COMPLETED", "allAdsCompleted", window);
    q("google.ima.AdEvent.Type.SKIPPED", "skip", window);
    q("google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED", "skippableStateChanged", window);
    q("google.ima.AdEvent.Type.LOG", "log", window);
    q("google.ima.AdEvent.Type.VOLUME_CHANGED", "volumeChange", window);
    q("google.ima.AdEvent.Type.VOLUME_MUTED", "mute", window);
    T.prototype.type = T.prototype.type;
    T.prototype.getAd = T.prototype.m;
    T.prototype.getAdData = T.prototype.o;
    $g.prototype.getAdCuePoints = $g.prototype.l;
    q("google.ima.AdsLoader", $, window);
    $.prototype.getSettings = $.prototype.ca;
    $.prototype.requestAds = $.prototype.jd;
    $.prototype.contentComplete = $.prototype.fd;
    $.prototype.destroy = $.prototype.gd;
    q("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED", "adsManagerLoaded", window);
    Eh.prototype.getAdsManager = Eh.prototype.k;
    Eh.prototype.getUserRequestContext = Eh.prototype.m;
    Eh.prototype.getResponse = Eh.prototype.l;
    q("google.ima.CompanionAdSelectionSettings", rh, window);
    q("google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE", "Image", void 0);
    q("google.ima.CompanionAdSelectionSettings.CreativeType.FLASH", "Flash", void 0);
    q("google.ima.CompanionAdSelectionSettings.CreativeType.ALL", "All", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.HTML", "Html", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.IFRAME", "IFrame", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.STATIC", "Static", void 0);
    q("google.ima.CompanionAdSelectionSettings.ResourceType.ALL", "All", void 0);
    q("google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE", "IgnoreSize", void 0);
    q("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH", "SelectExactMatch", void 0);
    q("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH", "SelectNearMatch", void 0);
    q("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window);
    q("ima.ImaSdkSettings", J, window);
    q("google.ima.settings", Cc, window);
    J.prototype.setCompanionBackfill = J.prototype.cd;
    J.prototype.getCompanionBackfill = J.prototype.$a;
    J.prototype.setAutoPlayAdBreaks = J.prototype.bd;
    J.prototype.isAutoPlayAdBreak = J.prototype.cb;
    J.prototype.setPpid = J.prototype.ed;
    J.prototype.getPpid = J.prototype.bb;
    J.prototype.setVpaidAllowed = J.prototype.od;
    J.prototype.setRestrictToCustomPlayback = J.prototype.nd;
    J.prototype.isRestrictToCustomPlayback = J.prototype.oa;
    J.prototype.setNumRedirects = J.prototype.dd;
    J.prototype.getNumRedirects = J.prototype.ab;
    J.prototype.getLocale = J.prototype.Ya;
    J.prototype.setLocale = J.prototype.md;
    q("google.ima.ImaSdkSettings.CompanionBackfillMode.ALWAYS", "always", void 0);
    q("google.ima.ImaSdkSettings.CompanionBackfillMode.ON_MASTER_AD", "on_master_ad", void 0);
    q("google.ima.AdsRenderingSettings", hh, window);
    q("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window);
    q("google.ima.AdsRequest", fi, window);
    q("google.ima.VERSION", "3.1.71", void 0);
    q("google.ima.UiElements.AD_ATTRIBUTION", "adAttribution", void 0);
    q("google.ima.UiElements.COUNTDOWN", "countdown", void 0);
    q("google.ima.ViewMode.NORMAL", "normal", void 0);
    q("google.ima.ViewMode.FULLSCREEN", "fullscreen", void 0);
    Y.prototype.isCustomPlaybackUsed = Y.prototype.ld;
    Y.prototype.isCustomClickTrackingUsed = Y.prototype.kd;
    Y.prototype.destroy = Y.prototype.mb;
    Y.prototype.init = Y.prototype.Uc;
    Y.prototype.start = Y.prototype.start;
    Y.prototype.stop = Y.prototype.ad;
    Y.prototype.pause = Y.prototype.Vc;
    Y.prototype.resume = Y.prototype.Wc;
    Y.prototype.getCuePoints = Y.prototype.Qc;
    Y.prototype.getCurrentAd = Y.prototype.Rc;
    Y.prototype.getRemainingTime = Y.prototype.Sc;
    Y.prototype.expand = Y.prototype.Oc;
    Y.prototype.collapse = Y.prototype.Nc;
    Y.prototype.getAdSkippableState = Y.prototype.Pc;
    Y.prototype.resize = Y.prototype.jb;
    Y.prototype.skip = Y.prototype.$c;
    Y.prototype.getVolume = Y.prototype.Tc;
    Y.prototype.setVolume = Y.prototype.Zc;
    Y.prototype.setMediaUrl = Y.prototype.Yc;
    Y.prototype.sendImpressionUrls = Y.prototype.Xc;
    W.prototype.getContent = W.prototype.o;
    W.prototype.getContentType = W.prototype.g;
    W.prototype.getHeight = W.prototype.q;
    W.prototype.getWidth = W.prototype.w;
})();
