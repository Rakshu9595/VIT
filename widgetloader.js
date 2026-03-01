!function() {
    "use strict";
    var n = {
        theme: "doctor-light",
        position: "bottom-right",
        scriptUrl: "https://cdn.ekacare.co/apollo/prod-0.1.5/widget.js",
        cssUrl: "https://cdn.ekacare.co/apollo/prod-0.1.5/assets/widget.css"
    }
      , e = {
        isLoaded: !1,
        isVisible: !1,
        instance: null,
        config: null,
        stage: 1,
        inactivityTimer: null,
        stage2Timer: null,
        firstUserMessage: null
    };
    function t(n, e) {
        var t = e / 200
          , i = 80 * t
          , a = 60 * t
          , o = 60 * t
          , s = 90 * t
          , r = 40 * t
          , d = 50 * t;
        if (!document.getElementById("apollo-icon-styles")) {
            var l = document.createElement("style");
            l.id = "apollo-icon-styles",
            l.textContent = "\n        @keyframes spinBlue {\n          0% { transform: rotate(0deg); }\n          22% { transform: rotate(147deg); }\n          38% { transform: rotate(311deg); }\n          61% { transform: rotate(73deg); }\n          79% { transform: rotate(222deg); }\n          100% { transform: rotate(360deg); }\n        }\n        @keyframes spinYellow {\n          0% { transform: rotate(0deg); }\n          18% { transform: rotate(260deg); }\n          36% { transform: rotate(105deg); }\n          59% { transform: rotate(330deg); }\n          83% { transform: rotate(185deg); }\n          100% { transform: rotate(540deg); }\n        }\n        @keyframes fadeA {\n          0%, 35% { opacity: 1; }\n          45%, 65% { opacity: 0; }\n          100% { opacity: 1; }\n        }\n        @keyframes fadeB {\n          0%, 35% { opacity: 0; }\n          45%, 65% { opacity: 1; }\n          100% { opacity: 0; }\n        }\n      ",
            document.head.appendChild(l)
        }
        n.innerHTML = `\n      <div style="width: ${e}px; height: ${e}px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%; background: #fff;">\n        <div style="position: absolute; border-radius: 50%; overflow: hidden; width: ${i}px; height: ${i}px; left: ${o}px; top: ${s}px;">\n          <div style="position: absolute; inset: 0; border-radius: 50%;">\n            <div style="position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(0deg, #2582a1, #fdb931); background-size: 200% 200%; animation: spinBlue 16s linear infinite, fadeA 16s ease-in-out infinite;"></div>\n            <div style="position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(0deg, #fdb931, #2582a1); background-size: 200% 200%; animation: spinBlue 16s linear infinite, fadeB 16s ease-in-out infinite;"></div>\n          </div>\n        </div>\n        <div style="position: absolute; border-radius: 50%; overflow: hidden; width: ${a}px; height: ${a}px; left: ${r}px; top: ${d}px;">\n          <div style="position: absolute; inset: 0; border-radius: 50%;">\n            <div style="position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(0deg, #fdb931, #2582a1); background-size: 200% 200%; animation: spinYellow 17s linear infinite 0.8s, fadeB 16s ease-in-out infinite 0.8s;"></div>\n            <div style="position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(0deg, #2582a1, #fdb931); background-size: 200% 200%; animation: spinYellow 17s linear infinite 0.8s, fadeA 16s ease-in-out infinite 0.8s;"></div>\n          </div>\n        </div>\n      </div>\n    `
    }
    function i() {
        var n = window.EkaMedAssist._button;
        if (n) {
            var i = window.innerWidth <= 768;
            if (n.className = "eka-widget-button",
            n.innerHTML = "",
            1 === e.stage) {
                n.className = "eka-widget-button stage-1";
                var a = document.createElement("div");
                a.className = "eka-icon-container",
                t(a, i ? 32 : 40),
                n.appendChild(a)
            } else if (2 === e.stage) {
                n.className = "eka-widget-button stage-2",
                n.innerHTML = '\n        <div class="eka-stage-2-content" data-action="open">\n          <div class="eka-stage-2-text">\n            <p class="eka-stage-2-title">Hi, Need some help?</p>\n            <p class="eka-stage-2-subtitle">I\'m happy to assist.</p>\n          </div>\n          <div class="eka-stage-2-icon"></div>\n        </div>\n      ';
                var o = n.querySelector(".eka-stage-2-icon");
                o && t(o, i ? 28 : 36)
            } else if (3 === e.stage) {
                var s = function(n) {
                    var e = Date.now() - n
                      , t = Math.floor(e / 1e3)
                      , i = Math.floor(t / 60)
                      , a = Math.floor(i / 60)
                      , o = Math.floor(a / 24);
                    if (t < 60)
                        return "Just now";
                    if (i < 60)
                        return `${i}m ago`;
                    if (a < 24)
                        return `${a}h ago`;
                    if (o < 30)
                        return `${o}d ago`
                }(Date.now());
                n.className = "eka-widget-button stage-3",
                n.innerHTML = `\n        <div class="eka-stage-3-overlay">\n          \x3c!-- Chat bubble --\x3e\n          <div class="eka-chat-bubble">\n            <button class="eka-chat-close" data-action="close">×</button>\n            <div class="eka-chat-bubble-content" data-action="open">\n              <div class="eka-chat-avatar">🤖</div>\n              <div class="eka-chat-message">\n                <p class="eka-chat-text">Hi 👋 Need help booking an appointment or finding the right doctor?</p>\n                <p class="eka-chat-timestamp">Apollo Assist • ${s}</p>\n              </div>\n            </div>\n          </div>\n\n          \x3c!-- Pills --\x3e\n          <div class="eka-pills-container">\n            <button class="eka-pill" data-action="appointment">\n              📅 Book an appointment\n            </button>\n            <button class="eka-pill focused" data-action="doctor">\n              🔍 Help me find a doctor\n            </button>\n            <button class="eka-pill" data-action="emergency">\n              🆘 I'm in emergency\n            </button>\n          </div>\n\n          \x3c!-- Widget icon button --\x3e\n          <button class="eka-widget-icon-button" data-action="open">\n            <div class="eka-icon-container"></div>\n            <div class="eka-notification-badge">1</div>\n          </button>\n        </div>\n      `;
                var r = n.querySelector(".eka-icon-container");
                r && t(r, i ? 32 : 40)
            }
        }
    }
    function a() {
        clearTimeout(e.inactivityTimer),
        clearTimeout(e.stage2Timer),
        e.inactivityTimer = setTimeout(function() {
            e.isVisible || 1 !== e.stage || (o(2),
            e.stage2Timer = setTimeout(function() {
                e.isVisible || 2 !== e.stage || o(3)
            }, 3e3))
        }, 3e3)
    }
    function o(n) {
        clearTimeout(e.inactivityTimer),
        clearTimeout(e.stage2Timer),
        e.stage = n,
        i(),
        1 === n && a()
    }
    function s(n, t) {
        o(1);
        var i = "";
        switch (n) {
        case "appointment":
            i = "Book an appointment";
            break;
        case "doctor":
            i = "Help me find a doctor";
            break;
        case "emergency":
            i = "I'm in emergency";
            break;
        default:
            i = "Other"
        }
        window._first_user_message = i,
        e.firstUserMessage = i,
        l(t)
    }
    function r(n, t) {
        if (e.isLoaded)
            t();
        else {
            if (n.cssUrl) {
                var i = document.createElement("link");
                i.rel = "stylesheet",
                i.href = n.cssUrl,
                document.head.appendChild(i)
            }
            var a = document.createElement("script");
            a.src = n.scriptUrl,
            a.onload = function() {
                e.isLoaded = !0,
                t()
            }
            ,
            a.onerror = function() {}
            ,
            document.head.appendChild(a)
        }
    }
    function d(n) {
        window.EkaMedAssistWidget && window.EkaMedAssistWidget.init && (e.instance = window.EkaMedAssistWidget.init({
            theme: n.theme,
            onMinimize: function() {
                p(),
                g()
            },
            onClose: function() {
                p(),
                g()
            },
            firstUserMessage: e?.firstUserMessage || ""
        }),
        e.isVisible = !0,
        e.firstUserMessage = null,
        window._first_user_message = null,
        f())
    }
    function l(n) {
        e.isLoaded ? e.isVisible ? p() : c(n) : (clearTimeout(e.inactivityTimer),
        clearTimeout(e.stage2Timer),
        r(n, function() {
            d(n)
        }))
    }
    function c(n) {
        e.isLoaded ? e.isVisible || (e.instance ? e.instance.container && (e.instance.container.style.display = "block") : d(n),
        e.isVisible = !0,
        f()) : r(n, function() {
            d(n)
        })
    }
    function p() {
        e.instance && e.isVisible && (e.instance.destroy && (e.instance.destroy(),
        e.instance = null),
        e.isVisible = !1,
        g(),
        a())
    }
    function g() {
        window.EkaMedAssist._button && (window.EkaMedAssist._button.style.display = "flex",
        o(1))
    }
    function f() {
        window.EkaMedAssist._button && (window.EkaMedAssist._button.style.display = "none")
    }
    function u(r) {
        if (!window.EkaMedAssist || !window.EkaMedAssist._initialized) {
            var d;
            r = Object.assign({}, n, r),
            (d = document.createElement("style")).id = "eka-widget-styles",
            d.textContent = "\n      /* Reset and base styles */\n      .eka-widget-button {\n        all: initial; // prevents the button from inheriting styles from the parent page\n        position: fixed;\n        bottom: 20px;\n        right: 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border: none;\n        cursor: pointer;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n        z-index: 2147483647;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n      }\n      \n      /* Stage 1: Icon only */\n      .eka-widget-button.stage-1 {\n        width: 56px;\n        height: 56px;\n        border-radius: 50%;\n        position: fixed;\n        bottom: 20px;\n        right: 20px;\n        background: #ffffff;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n        padding: 0;\n      }\n\n      /* Stage 2: Oval with text */\n      .eka-widget-button.stage-2 {\n        width: 280px;\n        height: 60px;\n        border-radius: 30px;\n        position: fixed;\n        bottom: 20px;\n        right: 20px;\n        background: #fdb931;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n        padding: 8px 8px 8px 24px;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      .eka-stage-2-content {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        width: 100%;\n        gap: 16px;\n      }\n\n      .eka-stage-2-text {\n        flex: 1;\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n        gap: 2px;\n      }\n\n      .eka-stage-2-title {\n        font-size: 16px;\n        font-weight: 600;\n        color: #000000;\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      .eka-stage-2-subtitle {\n        font-size: 12px;\n        font-weight: 400;\n        color: #000000;\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      .eka-stage-2-icon {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        background: #ffffff;\n        flex-shrink: 0;\n      }\n\n      /* Stage 3: Full overlay with floating elements */\n      .eka-widget-button.stage-3 {\n        width: auto;\n        height: auto;\n        background: transparent;\n        box-shadow: none;\n        bottom: 0;\n        right: 0;\n        pointer-events: none;\n      }\n\n      .eka-stage-3-overlay {\n        position: fixed;\n        bottom: 20px;  /* Same as widget button */\n        right: 20px;   /* Same as widget button */\n        width: auto;\n        height: auto;\n        pointer-events: none;\n        display: flex;\n        flex-direction: column;\n        align-items: flex-end;\n        gap: 16px;\n      }\n\n      /* Chat bubble */\n      .eka-chat-bubble {\n        position: relative;\n        background: #fdb931;\n        border-radius: 16px;\n        padding: 14px 16px;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n        max-width: 340px;\n        pointer-events: auto;\n        order: 1;\n      }\n\n      .eka-chat-bubble-content {\n        display: flex;\n        gap: 12px;\n        align-items: center;\n        padding-right: 20px;\n      }\n\n      .eka-chat-avatar {\n        font-size: 28px;\n        line-height: 1;\n        flex-shrink: 0;\n      }\n\n      .eka-chat-message {\n        flex: 1;\n      }\n\n      .eka-chat-text {\n        margin: 0 0 4px 0;\n        font-size: 14px;\n        font-weight: 500;\n        color: #000000;\n        line-height: 1.3;\n      }\n\n      .eka-chat-timestamp {\n        margin: 0;\n        font-size: 11px;\n        color: #666666;\n        line-height: 1.2;\n      }\n\n      .eka-chat-close {\n        position: absolute;\n        top: 8px;\n        right: 8px;\n        width: 24px;\n        height: 24px;\n        background: transparent;\n        border: none;\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 24px;\n        color: #666666;\n        line-height: 1;\n        padding: 0;\n        border-radius: 50%;\n        transition: background-color 0.2s ease;\n      }\n\n      .eka-chat-close:hover {\n        background: rgba(0, 0, 0, 0.1);\n      }\n\n      /* Pills container */\n      .eka-pills-container {\n        position: relative;\n        display: flex;\n        flex-direction: row;\n        gap: 8px;\n        pointer-events: auto;\n        justify-content: flex-end;\n        flex-wrap: wrap;\n        order: 2;\n      }\n\n      .eka-pill {\n        background: #fdb931;\n        border: none;\n        border-radius: 24px;\n        padding: 10px 18px;\n        font-size: 13px;\n        font-weight: 500;\n        cursor: pointer;\n        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n        white-space: nowrap;\n        transition: all 0.2s ease;\n        color: #000000;\n        display: flex;\n        align-items: center;\n        gap: 6px;\n      }\n\n      .eka-pill.focused {\n        border: 2px solid #fdb931;\n        padding: 8px 16px;\n      }\n\n      /* Widget icon button */\n      .eka-widget-icon-button {\n        position: relative;\n        width: 54px;\n        height: 54px;\n        background: white;\n        border-radius: 50%;\n        cursor: pointer;\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        pointer-events: auto;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n        border: none;\n        padding: 0;\n        order: 3;\n      }\n\n      .eka-widget-icon-button:hover {\n        transform: scale(1.05);\n        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);\n      }\n\n      .eka-notification-badge {\n        position: absolute;\n        top: -4px;\n        right: -4px;\n        background: #ff4444;\n        color: #ffffff;\n        border-radius: 50%;\n        width: 20px;\n        height: 20px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 11px;\n        font-weight: bold;\n        border: 2px solid #ffffff;\n      }\n\n      /* Icon container */\n      .eka-icon-container {\n        position: relative;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      /* Mobile responsive styles */\n      @media (max-width: 768px) {\n        .eka-widget-button {\n          bottom: 16px;\n          right: 16px;\n        }\n\n        .eka-widget-button.stage-1 {\n          width: 50px;\n          height: 50px;\n        }\n\n        .eka-widget-button.stage-2 {\n          width: auto;\n          height: 55px;\n          border-radius: 27.5px;\n          padding: 2px 15px;\n        }\n\n        .eka-stage-2-icon {\n          width: 35px;\n          height: 35px;\n        }\n\n        .eka-stage-2-title {\n          font-size: 13px;\n        }\n\n        .eka-stage-2-subtitle {\n          font-size: 11px;\n        }\n\n        .eka-chat-bubble {\n          max-width: 300px;\n          padding: 12px 14px;\n        }\n\n        .eka-chat-avatar {\n          font-size: 24px;\n          padding-bottom: 24px;\n        }\n\n        .eka-chat-text {\n          font-size: 13px;\n        }\n\n        .eka-pills-container {\n        display: none;\n          // bottom: 80px;\n          // right: 16px;\n          // max-width: calc(100vw - 32px);\n        }\n\n        .eka-pill {\n          font-size: 12px;\n          padding: 8px 14px;\n        }\n\n        .eka-pill.focused {\n          padding: 6px 12px;\n        }\n\n        .eka-widget-icon-button {\n          display: none;\n          // bottom: 16px;\n          // right: 16px;\n          // width: 56px;\n          // height: 56px;\n        }\n      }\n\n      /* Animation keyframes */\n      @keyframes fadeIn {\n        from {\n          opacity: 0;\n          transform: translateY(10px);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0);\n        }\n      }\n\n      .eka-chat-bubble,\n      .eka-pills-container,\n      .eka-widget-icon-button {\n        animation: fadeIn 0.3s ease;\n      }\n\n      @keyframes stage2FadeIn {\n        from {\n          opacity: 0;\n          transform: scale(0.8) translateX(20px);\n        }\n        to {\n          opacity: 1;\n          transform: scale(1) translateX(0);\n        }\n      }\n\n      @keyframes stage1FadeOut {\n        from {\n          opacity: 1;\n          transform: scale(1);\n        }\n        to {\n          opacity: 0;\n          transform: scale(0.9);\n        }\n      }\n    ",
            document.head.appendChild(d);
            var c = function(n) {
                var r = document.createElement("button");
                r.className = "eka-widget-button stage-1";
                var d = document.createElement("div");
                return d.className = "eka-icon-container",
                t(d, 40),
                r.appendChild(d),
                r.addEventListener("click", function(e) {
                    var t = e.target.closest("[data-action]");
                    if (t) {
                        var i = t.getAttribute("data-action");
                        e.stopPropagation(),
                        "close" === i ? o(1) : "open" === i ? l(n) : "appointment" !== i && "doctor" !== i && "emergency" !== i || s(i, n)
                    } else
                        l(n)
                }),
                r.addEventListener("mouseenter", function() {
                    1 === e.stage && a()
                }),
                window.addEventListener("resize", i),
                a(),
                r
            }(r);
            document.body.appendChild(c),
            window.EkaMedAssist && (window.EkaMedAssist._initialized = !0,
            window.EkaMedAssist._button = c)
        }
    }
    function b() {
        window.EkaMedAssist._initialized || u(n)
    }
    window.EkaMedAssist = {
        init: function(n) {
            u(n)
        },
        show: c,
        hide: p,
        toggle: l,
        setStage: o,
        handlePillClick: s,
        config: n,
        _initialized: !1,
        _button: null
    },
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", b) : b()
}();
