(function () {
  // This polyfill service adds a fetch polyfill only when needed, depending on browser making the request
  if (!window.fetch) {
    var script = document.createElement("script");
    script.src = "https://polyfill.io/v3/polyfill.min.js?features=fetch";
    document.head.appendChild(script);
  }

  // Include generic fides.js script
  (function (_, Y) {
    typeof exports == "object" && typeof module < "u"
      ? Y(exports)
      : typeof define == "function" && define.amd
      ? define(["exports"], Y)
      : ((_ = typeof globalThis < "u" ? globalThis : _ || self),
        Y((_.Fides = {})));
  })(this, function (_) {
    "use strict";
    const Y = (e) => {
        var t;
        const o = (t = window.dataLayer) != null ? t : [];
        window.dataLayer = o;
        const i = { consent: e.detail.consent };
        o.push({ event: e.type, Fides: i });
      },
      ui = () => {
        var e;
        window.addEventListener("FidesInitialized", (t) => Y(t)),
          window.addEventListener("FidesUpdated", (t) => Y(t)),
          (e = window.Fides) != null &&
            e.initialized &&
            Y({
              type: "FidesInitialized",
              detail: {
                consent: window.Fides.consent,
                fides_meta: window.Fides.fides_meta,
                identity: window.Fides.identity,
                tcf_consent: window.Fides.tcf_consent,
              },
            });
      },
      fi = () => {
        if (window.fbq) return window.fbq;
        const e = {
          queue: [],
          loaded: !0,
          version: "2.0",
          push(...t) {
            const o = window.fbq;
            o.callMethod ? o.callMethod(...t) : o.queue.push(t);
          },
        };
        return (
          (window.fbq = Object.assign(e.push, e)),
          (window._fbq = window.fbq),
          window.fbq
        );
      },
      vi = (e) => {
        const t = fi();
        t("consent", e.consent ? "grant" : "revoke"),
          e.dataUse
            ? t("dataProcessingOptions", [])
            : t("dataProcessingOptions", ["LDU"], 1, 1e3);
      },
      pt = (e) => {
        var t;
        if (!((t = window.Shopify) != null && t.customerPrivacy))
          throw Error("Fides could not access Shopify's customerPrivacy API");
        window.Shopify.customerPrivacy.setTrackingConsent(
          !!e.tracking,
          () => {}
        );
      },
      gi = (e) => {
        if (!window.Shopify)
          throw Error(
            "Fides.shopify was called but Shopify is not present in the page."
          );
        if (window.Shopify.customerPrivacy) {
          pt(e);
          return;
        }
        window.Shopify.loadFeatures(
          [{ name: "consent-tracking-api", version: "0.1" }],
          (t) => {
            if (t)
              throw Error(
                "Fides could not load Shopify's consent-tracking-api"
              );
            pt(e);
          }
        );
      };
    let ve;
    const bi = new Uint8Array(16);
    function _i() {
      if (
        !ve &&
        ((ve =
          typeof crypto < "u" &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)),
        !ve)
      )
        throw new Error(
          "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
        );
      return ve(bi);
    }
    const $ = [];
    for (let e = 0; e < 256; ++e) $.push((e + 256).toString(16).slice(1));
    function yi(e, t = 0) {
      return (
        $[e[t + 0]] +
        $[e[t + 1]] +
        $[e[t + 2]] +
        $[e[t + 3]] +
        "-" +
        $[e[t + 4]] +
        $[e[t + 5]] +
        "-" +
        $[e[t + 6]] +
        $[e[t + 7]] +
        "-" +
        $[e[t + 8]] +
        $[e[t + 9]] +
        "-" +
        $[e[t + 10]] +
        $[e[t + 11]] +
        $[e[t + 12]] +
        $[e[t + 13]] +
        $[e[t + 14]] +
        $[e[t + 15]]
      ).toLowerCase();
    }
    var ut = {
      randomUUID:
        typeof crypto < "u" &&
        crypto.randomUUID &&
        crypto.randomUUID.bind(crypto),
    };
    function mi(e, t, o) {
      if (ut.randomUUID && !t && !e) return ut.randomUUID();
      e = e || {};
      const i = e.random || (e.rng || _i)();
      if (((i[6] = (i[6] & 15) | 64), (i[8] = (i[8] & 63) | 128), t)) {
        o = o || 0;
        for (let n = 0; n < 16; ++n) t[o + n] = i[n];
        return t;
      }
      return yi(i);
    }
    /*! typescript-cookie v1.0.6 | MIT */ const ft = (e) =>
        encodeURIComponent(e)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape),
      vt = (e) =>
        encodeURIComponent(e).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        ),
      Te = decodeURIComponent,
      Ie = (e) => (
        e[0] === '"' && (e = e.slice(1, -1)),
        e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      );
    function hi(e) {
      return (
        (e = Object.assign({}, e)),
        typeof e.expires == "number" &&
          (e.expires = new Date(Date.now() + e.expires * 864e5)),
        e.expires != null && (e.expires = e.expires.toUTCString()),
        Object.entries(e)
          .filter(([t, o]) => o != null && o !== !1)
          .map(([t, o]) => (o === !0 ? `; ${t}` : `; ${t}=${o.split(";")[0]}`))
          .join("")
      );
    }
    function gt(e, t, o) {
      const i = /(?:^|; )([^=]*)=([^;]*)/g,
        n = {};
      let r;
      for (; (r = i.exec(document.cookie)) != null; )
        try {
          const d = o(r[1]);
          if (((n[d] = t(r[2], d)), e === d)) break;
        } catch {}
      return e != null ? n[e] : n;
    }
    const bt = Object.freeze({
        decodeName: Te,
        decodeValue: Ie,
        encodeName: ft,
        encodeValue: vt,
      }),
      Se = Object.freeze({ path: "/" });
    function je(
      e,
      t,
      o = Se,
      { encodeValue: i = vt, encodeName: n = ft } = {}
    ) {
      return (document.cookie = `${n(e)}=${i(t, e)}${hi(o)}`);
    }
    function _t(e, { decodeValue: t = Ie, decodeName: o = Te } = {}) {
      return gt(e, t, o);
    }
    function ki({ decodeValue: e = Ie, decodeName: t = Te } = {}) {
      return gt(void 0, e, t);
    }
    function yt(e, t = Se) {
      je(e, "", Object.assign({}, t, { expires: -1 }));
    }
    function Le(e, t) {
      const o = {
          set: function (n, r, d) {
            return je(n, r, Object.assign({}, this.attributes, d), {
              encodeValue: this.converter.write,
            });
          },
          get: function (n) {
            if (arguments.length === 0) return ki(this.converter.read);
            if (n != null) return _t(n, this.converter.read);
          },
          remove: function (n, r) {
            yt(n, Object.assign({}, this.attributes, r));
          },
          withAttributes: function (n) {
            return Le(this.converter, Object.assign({}, this.attributes, n));
          },
          withConverter: function (n) {
            return Le(Object.assign({}, this.converter, n), this.attributes);
          },
        },
        i = {
          attributes: { value: Object.freeze(t) },
          converter: { value: Object.freeze(e) },
        };
      return Object.create(o, i);
    }
    Le({ read: bt.decodeValue, write: bt.encodeValue }, Se);
    var Fe =
        typeof globalThis < "u"
          ? globalThis
          : typeof window < "u"
          ? window
          : typeof global < "u"
          ? global
          : typeof self < "u"
          ? self
          : {},
      ge = { exports: {} };
    /*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */ ge.exports,
      (function (e, t) {
        (function (o) {
          var i = t,
            n = e && e.exports == i && e,
            r = typeof Fe == "object" && Fe;
          (r.global === r || r.window === r) && (o = r);
          var d = function (p) {
            this.message = p;
          };
          (d.prototype = new Error()),
            (d.prototype.name = "InvalidCharacterError");
          var l = function (p) {
              throw new d(p);
            },
            a =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            c = /[\t\n\f\r ]/g,
            s = function (p) {
              p = String(p).replace(c, "");
              var x = p.length;
              x % 4 == 0 && ((p = p.replace(/==?$/, "")), (x = p.length)),
                (x % 4 == 1 || /[^+a-zA-Z0-9/]/.test(p)) &&
                  l(
                    "Invalid character: the string to be decoded is not correctly encoded."
                  );
              for (var y = 0, m, w, A = "", N = -1; ++N < x; )
                (w = a.indexOf(p.charAt(N))),
                  (m = y % 4 ? m * 64 + w : w),
                  y++ % 4 &&
                    (A += String.fromCharCode(255 & (m >> ((-2 * y) & 6))));
              return A;
            },
            g = function (p) {
              (p = String(p)),
                /[^\0-\xFF]/.test(p) &&
                  l(
                    "The string to be encoded contains characters outside of the Latin1 range."
                  );
              for (
                var x = p.length % 3,
                  y = "",
                  m = -1,
                  w,
                  A,
                  N,
                  O,
                  z = p.length - x;
                ++m < z;

              )
                (w = p.charCodeAt(m) << 16),
                  (A = p.charCodeAt(++m) << 8),
                  (N = p.charCodeAt(++m)),
                  (O = w + A + N),
                  (y +=
                    a.charAt((O >> 18) & 63) +
                    a.charAt((O >> 12) & 63) +
                    a.charAt((O >> 6) & 63) +
                    a.charAt(O & 63));
              return (
                x == 2
                  ? ((w = p.charCodeAt(m) << 8),
                    (A = p.charCodeAt(++m)),
                    (O = w + A),
                    (y +=
                      a.charAt(O >> 10) +
                      a.charAt((O >> 4) & 63) +
                      a.charAt((O << 2) & 63) +
                      "="))
                  : x == 1 &&
                    ((O = p.charCodeAt(m)),
                    (y += a.charAt(O >> 2) + a.charAt((O << 4) & 63) + "==")),
                y
              );
            },
            u = { encode: g, decode: s, version: "1.0.0" };
          if (i && !i.nodeType)
            if (n) n.exports = u;
            else for (var f in u) u.hasOwnProperty(f) && (i[f] = u[f]);
          else o.base64 = u;
        })(Fe);
      })(ge, ge.exports);
    var mt = ge.exports;
    class be {
      constructor(t, o, i) {
        (this.notice = t),
          (this.consentPreference = o),
          (this.noticeHistoryId = i);
      }
    }
    (_.TCMobileDataVals = void 0),
      ((e) => {
        ((t) => ((t[(t._0 = 0)] = "_0"), (t[(t._1 = 1)] = "_1")))(
          e.IABTCFgdprApplies || (e.IABTCFgdprApplies = {})
        ),
          ((t) => ((t[(t._0 = 0)] = "_0"), (t[(t._1 = 1)] = "_1")))(
            e.IABTCFPurposeOneTreatment || (e.IABTCFPurposeOneTreatment = {})
          ),
          ((t) => ((t[(t._0 = 0)] = "_0"), (t[(t._1 = 1)] = "_1")))(
            e.IABTCFUseNonStandardTexts || (e.IABTCFUseNonStandardTexts = {})
          );
      })(_.TCMobileDataVals || (_.TCMobileDataVals = {}));
    var ht = ((e) => (
        (e.GPP_US_NATIONAL = "gpp_us_national"),
        (e.GPP_US_STATE = "gpp_us_state"),
        e
      ))(ht || {}),
      kt = ((e) => (
        (e.FRONTEND = "frontend"),
        (e.SYSTEM_WIDE = "system_wide"),
        (e.NOT_APPLICABLE = "not_applicable"),
        e
      ))(kt || {}),
      M = ((e) => (
        (e.OPT_IN = "opt_in"),
        (e.OPT_OUT = "opt_out"),
        (e.NOTICE_ONLY = "notice_only"),
        e
      ))(M || {}),
      L = ((e) => (
        (e.OPT_IN = "opt_in"),
        (e.OPT_OUT = "opt_out"),
        (e.ACKNOWLEDGE = "acknowledge"),
        (e.TCF = "tcf"),
        e
      ))(L || {}),
      I = ((e) => (
        (e.OVERLAY = "overlay"),
        (e.BANNER_AND_MODAL = "banner_and_modal"),
        (e.MODAL = "modal"),
        (e.PRIVACY_CENTER = "privacy_center"),
        (e.TCF_OVERLAY = "tcf_overlay"),
        e
      ))(I || {}),
      xt = ((e) => (
        (e.ALWAYS_ENABLED = "always_enabled"),
        (e.ENABLED_WHERE_REQUIRED = "enabled_where_required"),
        (e.ALWAYS_DISABLED = "always_disabled"),
        e
      ))(xt || {}),
      te = ((e) => (
        (e.OPTIONS = "options"), (e.EXPERIENCE_TRANSLATION = "language"), e
      ))(te || {}),
      R = ((e) => (
        (e.PRIMARY = "primary"),
        (e.SECONDARY = "secondary"),
        (e.TERTIARY = "tertiary"),
        e
      ))(R || {}),
      q = ((e) => (
        (e.BUTTON = "button"),
        (e.REJECT = "reject"),
        (e.ACCEPT = "accept"),
        (e.SAVE = "save"),
        (e.DISMISS = "dismiss"),
        (e.GPC = "gpc"),
        (e.INDIVIDUAL_NOTICE = "individual_notice"),
        e
      ))(q || {}),
      wt = ((e) => (
        (e.privacy_center = "privacy_center"),
        (e.overlay = "overlay"),
        (e.api = "api"),
        e
      ))(wt || {}),
      U = ((e) => (
        (e.NONE = "none"),
        (e.APPLIED = "applied"),
        (e.OVERRIDDEN = "overridden"),
        e
      ))(U || {}),
      re = ((e) => (
        (e.OVERLAY = "overlay"),
        (e.MODAL = "modal"),
        (e.BANNER = "banner"),
        (e.PRIVACY_CENTER = "privacy_center"),
        (e.TCF_OVERLAY = "tcf_overlay"),
        (e.TCF_BANNER = "tcf_banner"),
        e
      ))(re || {});
    const _e = (e, t) => !!Object.keys(t).includes(e.notice_key),
      oe = (e) =>
        !e || e === L.OPT_OUT ? !1 : e === L.OPT_IN ? !0 : e === L.ACKNOWLEDGE,
      ae = (e, t) =>
        e ? (t === M.NOTICE_ONLY ? L.ACKNOWLEDGE : L.OPT_IN) : L.OPT_OUT,
      Ct = (e, t) =>
        e === void 0
          ? !1
          : typeof e == "boolean"
          ? e
          : t.globalPrivacyControl === !0
          ? e.globalPrivacyControl
          : e.value,
      ze = (e, t, o) =>
        e.consent_mechanism === M.NOTICE_ONLY
          ? !0
          : o && _e(e, o)
          ? !!o[e.notice_key]
          : oe(e.default_preference),
      W = "en",
      De = "Manage preferences",
      Me = /^([A-Za-z]{2,3})(?:(?:[_-]([A-Za-z0-9]{2,4}))?$|(?:(?:[_-]\w+)+))/,
      xi = /^\w{2,3}(-\w{2,3})?$/,
      wi = [
        {
          overrideName: "fidesEmbed",
          overrideType: "boolean",
          overrideKey: "fides_embed",
          validationRegex: /^(true|false)$/,
        },
        {
          overrideName: "fidesDisableSaveApi",
          overrideType: "boolean",
          overrideKey: "fides_disable_save_api",
          validationRegex: /^(true|false)$/,
        },
        {
          overrideName: "fidesDisableBanner",
          overrideType: "boolean",
          overrideKey: "fides_disable_banner",
          validationRegex: /^(true|false)$/,
        },
        {
          overrideName: "fidesString",
          overrideType: "string",
          overrideKey: "fides_string",
          validationRegex: /(.*)/,
        },
        {
          overrideName: "fidesTcfGdprApplies",
          overrideType: "boolean",
          overrideKey: "fides_tcf_gdpr_applies",
          validationRegex: /^(true|false)$/,
        },
        {
          overrideName: "fidesLocale",
          overrideType: "string",
          overrideKey: "fides_locale",
          validationRegex: Me,
        },
        {
          overrideName: "fidesPrimaryColor",
          overrideType: "string",
          overrideKey: "fides_primary_color",
          validationRegex: /(.*)/,
        },
      ],
      Ci = [
        {
          overrideName: "title",
          overrideType: "string",
          overrideKey: "fides_title",
          validationRegex: /(.*)/,
        },
        {
          overrideName: "description",
          overrideType: "string",
          overrideKey: "fides_description",
          validationRegex: /(.*)/,
        },
        {
          overrideName: "privacy_policy_url",
          overrideType: "string",
          overrideKey: "fides_privacy_policy_url",
          validationRegex: /(.*)/,
        },
        {
          overrideName: "override_language",
          overrideType: "string",
          overrideKey: "fides_override_language",
          validationRegex: Me,
        },
      ],
      b = (e = !1, ...t) => {
        e && console.log(...t);
      },
      se = (e) =>
        !e || typeof e != "object"
          ? !1
          : Object.keys(e).length === 0 || "id" in e,
      Ei = (e) => !!(e && e.every((t) => t.default_preference === L.OPT_IN)),
      Re = (e, t = !1) => (
        b(t, "constructing geolocation..."),
        e
          ? e.location && xi.test(e.location)
            ? e.location.replace("-", "_").toLowerCase()
            : e.country && e.region
            ? `${e.country.toLowerCase()}_${e.region.toLowerCase()}`
            : (b(
                t,
                "cannot construct user location from provided geoLocation params..."
              ),
              null)
          : (b(
              t,
              "cannot construct user location since geoLocation is undefined or null"
            ),
            null)
      ),
      Et = (e) => {
        if (
          (b(e.debug, "Validating Fides consent overlay options...", e),
          typeof e != "object")
        )
          return !1;
        if (!e.fidesApiUrl)
          return b(e.debug, "Invalid options: fidesApiUrl is required!"), !1;
        if (!e.privacyCenterUrl)
          return (
            b(e.debug, "Invalid options: privacyCenterUrl is required!"), !1
          );
        try {
          new URL(e.privacyCenterUrl), new URL(e.fidesApiUrl);
        } catch {
          return (
            b(
              e.debug,
              "Invalid options: privacyCenterUrl or fidesApiUrl is an invalid URL!",
              e.privacyCenterUrl
            ),
            !1
          );
        }
        return !0;
      },
      Pt = (e) => {
        switch (e) {
          case te.OPTIONS:
            return wi;
          case te.EXPERIENCE_TRANSLATION:
            return Ci;
        }
        return null;
      },
      Ot = (e, t) => {
        if (!se(e))
          return (
            b(
              t.debug,
              "No relevant experience found. Skipping overlay initialization."
            ),
            !1
          );
        const o = e.experience_config;
        return o
          ? o.component === I.MODAL ||
            o.component === I.BANNER_AND_MODAL ||
            o.component === I.TCF_OVERLAY
            ? o.component === I.BANNER_AND_MODAL &&
              !(e.privacy_notices && e.privacy_notices.length > 0)
              ? (b(
                  t.debug,
                  "Privacy experience has no notices. Skipping overlay initialization."
                ),
                !1)
              : !0
            : (b(
                t.debug,
                "No experience found with modal, banner_and_modal, or tcf_overlay component. Skipping overlay initialization."
              ),
              !1)
          : (b(
              t.debug,
              "No experience config found for experience. Skipping overlay initialization."
            ),
            !1);
      },
      Pi = (e) => {
        var t;
        return (t = e.default_preference) != null ? t : L.OPT_OUT;
      },
      At = (e, t, o) => {
        var i, n, r;
        return ((i = e.experience_config) == null ? void 0 : i.component) ===
          I.TCF_OVERLAY
          ? (n = e.meta) != null && n.version_hash
            ? e.meta.version_hash !== t.tcf_version_hash
            : !0
          : e?.privacy_notices == null || e.privacy_notices.length === 0
          ? !1
          : o
          ? !((r = e.privacy_notices) != null && r.every((d) => _e(d, o)))
          : !0;
      },
      $t = (e) => {
        e[0] === "window" && e.shift();
        let t = window;
        for (; e.length > 0; ) {
          const o = e.shift();
          if (typeof o > "u" || typeof t[o] != "object") return;
          t = t[o];
        }
        return t;
      },
      Nt = ({ value: e, notice: t, consentContext: o }) =>
        !o.globalPrivacyControl ||
        !t.has_gpc_flag ||
        t.consent_mechanism === M.NOTICE_ONLY
          ? U.NONE
          : e
          ? U.OVERRIDDEN
          : U.APPLIED,
      Ue = () => {
        b(
          window.Fides.options.debug,
          "The current experience does not support displaying a modal."
        );
      };
    var Oi = ((e) => (
        (e.CONSENT = "Consent"),
        (e.CONTRACT = "Contract"),
        (e.LEGAL_OBLIGATIONS = "Legal obligations"),
        (e.VITAL_INTERESTS = "Vital interests"),
        (e.PUBLIC_INTEREST = "Public interest"),
        (e.LEGITIMATE_INTERESTS = "Legitimate interests"),
        e
      ))(Oi || {}),
      Ge = ((e) => (
        (e.CONSENT = "Consent"),
        (e.LEGITIMATE_INTERESTS = "Legitimate interests"),
        e
      ))(Ge || {});
    const Ai = [
        {
          experienceKey: "tcf_purpose_consents",
          tcfModelKey: "purposeConsents",
          enabledIdsKey: "purposesConsent",
        },
        {
          experienceKey: "tcf_purpose_legitimate_interests",
          tcfModelKey: "purposeLegitimateInterests",
          enabledIdsKey: "purposesLegint",
        },
        {
          experienceKey: "tcf_special_features",
          tcfModelKey: "specialFeatureOptins",
          enabledIdsKey: "specialFeatures",
        },
        {
          experienceKey: "tcf_vendor_consents",
          tcfModelKey: "vendorConsents",
          enabledIdsKey: "vendorsConsent",
        },
        {
          experienceKey: "tcf_vendor_legitimate_interests",
          tcfModelKey: "vendorLegitimateInterests",
          enabledIdsKey: "vendorsLegint",
        },
      ],
      $i = [
        {
          cookieKey: "system_consent_preferences",
          experienceKey: "tcf_system_consents",
        },
        {
          cookieKey: "system_legitimate_interests_preferences",
          experienceKey: "tcf_system_legitimate_interests",
        },
      ];
    Ai.filter(
      ({ experienceKey: e }) =>
        e !== "tcf_features" && e !== "tcf_special_purposes"
    ).map((e) => e.experienceKey),
      Ge.CONSENT.toString(),
      Ge.LEGITIMATE_INTERESTS.toString();
    var Ni = Object.defineProperty,
      Ti = Object.defineProperties,
      Ii = Object.getOwnPropertyDescriptors,
      Tt = Object.getOwnPropertySymbols,
      Si = Object.prototype.hasOwnProperty,
      ji = Object.prototype.propertyIsEnumerable,
      It = (e, t, o) =>
        t in e
          ? Ni(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      J = (e, t) => {
        for (var o in t || (t = {})) Si.call(t, o) && It(e, o, t[o]);
        if (Tt) for (var o of Tt(t)) ji.call(t, o) && It(e, o, t[o]);
        return e;
      },
      le = (e, t) => Ti(e, Ii(t)),
      Li = (e, t, o) =>
        new Promise((i, n) => {
          var r = (a) => {
              try {
                l(o.next(a));
              } catch (c) {
                n(c);
              }
            },
            d = (a) => {
              try {
                l(o.throw(a));
              } catch (c) {
                n(c);
              }
            },
            l = (a) =>
              a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
          l((o = o.apply(e, t)).next());
        });
    const Be = "fides_consent",
      St = 365,
      jt = {
        decodeName: decodeURIComponent,
        decodeValue: decodeURIComponent,
        encodeName: encodeURIComponent,
        encodeValue: encodeURIComponent,
      },
      Lt = (e) => (e ? Object.values(e).some((t) => t !== void 0) : !1),
      Ft = () => mi(),
      zt = (e) => {
        var t;
        return !((t = e.fides_meta) != null && t.updatedAt);
      },
      Dt = (e) => {
        const t = new Date(),
          o = Ft();
        return {
          consent: e || {},
          identity: { fides_user_device_id: o },
          fides_meta: {
            version: "0.9.0",
            createdAt: t.toISOString(),
            updatedAt: "",
          },
          tcf_consent: {},
        };
      },
      Ve = (e) => _t(e, jt),
      He = (e = !1) => {
        const t = Ve(Be);
        if (t)
          try {
            return JSON.parse(t);
          } catch {
            try {
              return JSON.parse(mt.decode(t));
            } catch (i) {
              b(e, "Unable to read consent cookie", i);
              return;
            }
          }
      },
      Mt = (e, t = !1) => {
        const o = Dt(e);
        if (typeof document > "u") return o;
        let i = He();
        if (!i)
          return (
            b(
              t,
              "No existing Fides consent cookie found, returning defaults.",
              i
            ),
            o
          );
        try {
          ("consent" in i && "fides_meta" in i) ||
            (i = le(J({}, o), { consent: i }));
          const n = J(J({}, e), i.consent);
          return (
            (i.consent = n),
            b(
              t,
              "Applied existing consent to data from existing Fides consent cookie.",
              JSON.stringify(i)
            ),
            i
          );
        } catch (n) {
          return b(t, "Unable to read consent cookie: invalid JSON.", n), o;
        }
      },
      Rt = (e, t = !1) => {
        if (typeof document > "u") return;
        const o = new Date().toISOString();
        e.fides_meta.updatedAt = o;
        const i = window.location.hostname.split(".").slice(-2).join(".");
        let n = JSON.stringify(e);
        t && (n = mt.encode(n)),
          je(Be, n, { path: "/", domain: i, expires: St }, jt);
      },
      Ke = ({ experience: e, cookie: t, debug: o }) => {
        var i;
        const n =
          (i = e.privacy_notices) == null
            ? void 0
            : i.map((r) => {
                const d = Object.keys(t.consent).includes(r.notice_key)
                  ? ae(!!t.consent[r.notice_key], r.consent_mechanism)
                  : void 0;
                return le(J({}, r), { current_preference: d });
              });
        return (
          o &&
            b(
              o,
              "Returning updated pre-fetched experience with user consent.",
              e
            ),
          le(J({}, e), { privacy_notices: n })
        );
      },
      Fi = (e) => {
        const t = {};
        return (
          $i.forEach(({ cookieKey: o }) => {
            var i;
            const n = (i = e[o]) != null ? i : [];
            t[o] = Object.fromEntries(n.map((r) => [r.id, oe(r.preference)]));
          }),
          t
        );
      },
      Ut = (e, t, o) => {
        const i = {};
        return (
          e?.options.forEach(({ cookieKeys: n, default: r }) => {
            if (r === void 0) return;
            const d = Ct(r, t);
            n.forEach((l) => {
              const a = i[l];
              if (a === void 0) {
                i[l] = d;
                return;
              }
              i[l] = a && d;
            });
          }),
          b(o, "Returning defaults for legacy config.", i),
          i
        );
      },
      Gt = (e) => {
        e.forEach((t) => {
          var o;
          yt(t.name, {
            path: (o = t.path) != null ? o : "/",
            domain: t.domain,
          });
        });
      },
      Ye = (e, t) =>
        Li(void 0, null, function* () {
          const o = new Map(
              t.map(({ notice: n, consentPreference: r }) => [
                n.notice_key,
                oe(r),
              ])
            ),
            i = Object.fromEntries(o);
          return le(J({}, e), { consent: i });
        }),
      Bt = (e) => {
        const t = {};
        return (
          e.privacy_notices &&
            e.privacy_notices.forEach((o) => {
              o.current_preference
                ? (t[o.notice_key] = oe(o.current_preference))
                : o.default_preference &&
                  (t[o.notice_key] = oe(o.default_preference));
            }),
          t
        );
      },
      Vt = ({ cookie: e, experience: t }) => {
        const o = Bt(t);
        return le(J({}, e), { consent: o });
      };
    var zi = Object.defineProperty,
      Di = Object.defineProperties,
      Mi = Object.getOwnPropertyDescriptors,
      Ht = Object.getOwnPropertySymbols,
      Ri = Object.prototype.hasOwnProperty,
      Ui = Object.prototype.propertyIsEnumerable,
      Kt = (e, t, o) =>
        t in e
          ? zi(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      Gi = (e, t) => {
        for (var o in t || (t = {})) Ri.call(t, o) && Kt(e, o, t[o]);
        if (Ht) for (var o of Ht(t)) Ui.call(t, o) && Kt(e, o, t[o]);
        return e;
      },
      Bi = (e, t) => Di(e, Mi(t));
    const B = (e, t, o, i) => {
      if (typeof window < "u" && typeof CustomEvent < "u") {
        const n = new CustomEvent(e, {
          detail: Bi(Gi({}, t), { debug: o, extraDetails: i }),
        });
        b(
          o,
          `Dispatching event type ${e} ${
            i != null && i.servingComponent ? `from ${i.servingComponent} ` : ""
          }with cookie ${JSON.stringify(t)} ${
            i != null && i.consentMethod
              ? `using consent method ${i.consentMethod} `
              : ""
          }`
        ),
          window.dispatchEvent(n);
      }
    };
    var Vi = {
        "static.gpc":
          "\u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0639\u0627\u0644\u0645\u064A \u0641\u064A \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
        "static.gpc.description":
          "\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u062A\u0641\u0636\u064A\u0644\u0643 \u0644\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0639\u0627\u0644\u0645\u064A \u0641\u064A \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629. \u0644\u0642\u062F \u0623\u0644\u063A\u064A \u0627\u0634\u062A\u0631\u0627\u0643\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0641\u064A \u062D\u0627\u0644\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0644\u062A\u0632\u0645 \u0628\u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0639\u0627\u0644\u0645\u064A \u0641\u064A \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629.",
        "static.gpc.status.applied":
          "\u062A\u0645 \u0627\u0644\u062A\u0637\u0628\u064A\u0642",
        "static.gpc.status.overridden":
          "\u062A\u0645 \u0627\u0644\u062A\u062C\u0627\u0648\u0632",
        "static.gpc.title":
          "\u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0639\u0627\u0644\u0645\u064A \u0641\u064A \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
      },
      Hi = {
        "static.gpc":
          "\u0413\u043B\u043E\u0431\u0430\u043B\u043D\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u043B\u0438\u0447\u043D\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u0438",
        "static.gpc.description":
          "\u0412\u0430\u0448\u0435\u0442\u043E \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u043D\u0438\u0435 \u0437\u0430 \u0433\u043B\u043E\u0431\u0430\u043B\u043D\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u043B\u0438\u0447\u043D\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u0438 \u0435 \u0437\u0430\u0447\u0435\u0442\u0435\u043D\u043E. \u0412\u0438\u0435 \u0441\u0442\u0435 \u0431\u0438\u043B\u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0438\u0437\u043A\u043B\u044E\u0447\u0435\u043D\u0438 \u043E\u0442 \u0441\u043B\u0443\u0447\u0430\u0438\u0442\u0435 \u043D\u0430 \u0438\u0437\u043F\u043E\u043B\u0437\u0432\u0430\u043D\u0435 \u043D\u0430 \u0434\u0430\u043D\u043D\u0438, \u043A\u043E\u0438\u0442\u043E \u0441\u0435 \u043E\u0442\u043D\u0430\u0441\u044F\u0442 \u043A\u044A\u043C \u0433\u043B\u043E\u0431\u0430\u043B\u043D\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u043B\u0438\u0447\u043D\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u0438.",
        "static.gpc.status.applied":
          "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u043E",
        "static.gpc.status.overridden":
          "\u041F\u0440\u0435\u043C\u0430\u0445\u043D\u0430\u0442\u043E",
        "static.gpc.title":
          "\u041E\u0442\u043A\u0440\u0438\u0442\u043E \u0435 \u0433\u043B\u043E\u0431\u0430\u043B\u043D\u043E \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u043B\u0438\u0447\u043D\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u0438",
      },
      Ki = {
        "static.gpc": "Globalna kontrola privatnosti",
        "static.gpc.description":
          "Va\u0161 izbor globalne kontrole privatnosti je uva\u017Een. Automatski ste isklju\u010Deni iz slu\u010Dajeva kori\u0161tenja podataka koji se pridr\u017Eavaju globalne kontrole privatnosti.",
        "static.gpc.status.applied": "Prihva\u0107ena",
        "static.gpc.status.overridden": "Odbijena",
        "static.gpc.title": "Otkrivena je Globalna kontrola privatnosti",
      },
      Yi = {
        "static.gpc": "Control de privadesa global",
        "static.gpc.description":
          "S\u2019ha respectat la vostra prefer\xE8ncia pel que fa al control de privadesa global. Se us ha excl\xF2s autom\xE0ticament dels casos d\u2019\xFAs de dades que s\u2019adhereixen al control de privadesa global.",
        "static.gpc.status.applied": "Aplicat",
        "static.gpc.status.overridden": "Anul\xB7lat",
        "static.gpc.title": "Control de privadesa global detectat",
      },
      qi = {
        "static.gpc":
          "Glob\xE1ln\xED kontrola ochrany osobn\xEDch \xFAdaj\u016F",
        "static.gpc.description":
          "Byly dodr\u017Eeny va\u0161e glob\xE1ln\xED preference ochrany osobn\xEDch \xFAdaj\u016F. Automaticky jste byli vy\u0159azeni z pou\u017E\xEDv\xE1n\xED \xFAdaj\u016F v p\u0159\xEDpadech, na kter\xE9 se vztahuje glob\xE1ln\xED ochrana osobn\xEDch \xFAdaj\u016F.",
        "static.gpc.status.applied": "Aplikov\xE1no",
        "static.gpc.status.overridden": "P\u0159eps\xE1no",
        "static.gpc.title":
          "Bylo zji\u0161t\u011Bna glob\xE1ln\xED kontrola ochrany osobn\xEDch \xFAdaj\u016F",
      },
      Wi = {
        "static.gpc": "Global fortrolighedskontrol",
        "static.gpc.description":
          "Din pr\xE6ference i forbindelse med global fortrolighedskontrol er blevet efterkommet. Du er automatisk blevet frameldt tilf\xE6lde af databrug, der overholder global fortrolighedskontrol.",
        "static.gpc.status.applied": "Anvendt",
        "static.gpc.status.overridden": "Tilsidesat",
        "static.gpc.title": "Der blev p\xE5vist global fortrolighedskontrol",
      },
      Ji = {
        "static.gpc": "Globale Datenschutzeinstellungen",
        "static.gpc.description":
          "Ihre globale Datenschutzeinstellungen werden ber\xFCcksichtigt. Sie wurden automatisch von Anwendungsf\xE4llen ausgenommen, die nicht Ihren globalen Datenschutzeinstellungen unterliegen.",
        "static.gpc.status.applied": "Angewendet",
        "static.gpc.status.overridden": "\xDCberschrieben",
        "static.gpc.title": "Globale Datenschutzeinstellungen entdeckt",
      },
      Xi = {
        "static.gpc":
          "\u039A\u03B1\u03B8\u03BF\u03BB\u03B9\u03BA\u03CC\u03C2 \u03AD\u03BB\u03B5\u03B3\u03C7\u03BF\u03C2 \u03B1\u03C0\u03BF\u03C1\u03C1\u03AE\u03C4\u03BF\u03C5",
        "static.gpc.description":
          "\u0397 \u03C0\u03C1\u03BF\u03C4\u03AF\u03BC\u03B7\u03C3\u03AE \u03C3\u03B1\u03C2 \u03B3\u03B9\u03B1 \u03C4\u03BF\u03BD \u03BA\u03B1\u03B8\u03BF\u03BB\u03B9\u03BA\u03CC \u03AD\u03BB\u03B5\u03B3\u03C7\u03BF \u03B1\u03C0\u03BF\u03C1\u03C1\u03AE\u03C4\u03BF\u03C5 \u03AD\u03C7\u03B5\u03B9 \u03C4\u03B7\u03C1\u03B7\u03B8\u03B5\u03AF. \u0388\u03C7\u03B5\u03C4\u03B5 \u03B5\u03BE\u03B1\u03B9\u03C1\u03B5\u03B8\u03B5\u03AF \u03B1\u03C5\u03C4\u03CC\u03BC\u03B1\u03C4\u03B1 \u03B1\u03C0\u03CC \u03C0\u03B5\u03C1\u03B9\u03C0\u03C4\u03CE\u03C3\u03B5\u03B9\u03C2 \u03C7\u03C1\u03AE\u03C3\u03B7\u03C2 \u03B4\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03C9\u03BD \u03C0\u03BF\u03C5 \u03C3\u03C5\u03BC\u03BC\u03BF\u03C1\u03C6\u03CE\u03BD\u03BF\u03BD\u03C4\u03B1\u03B9 \u03BC\u03B5 \u03C4\u03BF\u03BD \u03BA\u03B1\u03B8\u03BF\u03BB\u03B9\u03BA\u03CC \u03AD\u03BB\u03B5\u03B3\u03C7\u03BF \u03B1\u03C0\u03BF\u03C1\u03C1\u03AE\u03C4\u03BF\u03C5.",
        "static.gpc.status.applied":
          "\u0395\u03C6\u03B1\u03C1\u03BC\u03CC\u03C3\u03C4\u03B7\u03BA\u03B5",
        "static.gpc.status.overridden":
          "\u03A0\u03B1\u03C1\u03B1\u03BA\u03AC\u03BC\u03C6\u03B8\u03B7\u03BA\u03B5",
        "static.gpc.title":
          "\u0395\u03BD\u03C4\u03BF\u03C0\u03AF\u03C3\u03C4\u03B7\u03BA\u03B5 \u03BA\u03B1\u03B8\u03BF\u03BB\u03B9\u03BA\u03CC\u03C2 \u03AD\u03BB\u03B5\u03B3\u03C7\u03BF\u03C2 \u03B1\u03C0\u03BF\u03C1\u03C1\u03AE\u03C4\u03BF\u03C5",
      },
      Zi = {
        "static.gpc": "Global Privacy Control",
        "static.gpc.description":
          "Your global privacy control preference has been honored. You have been automatically opted out of data use cases which adhere to global privacy control.",
        "static.gpc.status.applied": "Applied",
        "static.gpc.status.overridden": "Overridden",
        "static.gpc.title": "Global Privacy Control detected",
      },
      Qi = {
        "static.gpc": "Control de privacidad global",
        "static.gpc.description":
          "Su preferencia de control de privacidad global se ha respetado. Se le ha excluido autom\xE1ticamente de los casos de uso de datos que se adhieren al control de privacidad global.",
        "static.gpc.status.applied": "Aplicado",
        "static.gpc.status.overridden": "Anulado",
        "static.gpc.title": "Control de privacidad global detectado",
      },
      en = {
        "static.gpc": "Control de privacidad global",
        "static.gpc.description":
          "Su preferencia de control de privacidad global se ha respetado. Se le excluy\xF3 autom\xE1ticamente de los casos de uso de datos que se adhieren al control de privacidad global.",
        "static.gpc.status.applied": "Aplicado",
        "static.gpc.status.overridden": "Anulado",
        "static.gpc.title": "Control de privacidad global detectado",
      },
      tn = {
        "static.gpc": "\xDCldine andmekaitsekontroll",
        "static.gpc.description":
          "Teie \xFCldist andmekaitse-eelistust on arvestatud. Teid on automaatselt v\xE4lja arvatud andmete kasutamise juhtudest, mis j\xE4rgivad \xFCldist andmekaitsekontrolli.",
        "static.gpc.status.applied": "Rakendatud",
        "static.gpc.status.overridden": "T\xFChistatud",
        "static.gpc.title": "Tuvastatud \xFCldine andmekaitsekontroll",
      },
      on = {
        "static.gpc": "Pribatutasun-kontrol globala",
        "static.gpc.description":
          "Pribatutasun-kontrol globalaren lehentasuna bete da. Pribatutasun-kontrol globalari atxikitzen zaizkion datuen erabileren kasuetatik automatikoki baztertua izan zara.",
        "static.gpc.status.applied": "Ezarrita",
        "static.gpc.status.overridden": "Baliogabetuta",
        "static.gpc.title": "Pribatutasun-kontrol globala antzeman da",
      },
      nn = {
        "static.gpc": "Maailmanlaajunen tietosuojavalvonta",
        "static.gpc.description":
          "Maailmanlaajuinen tietosuojavalvontanne on vahvistettu. Teid\xE4t on automaattisesti poistettu tietojen k\xE4ytt\xF6tapauksista, jotka noudattavat maailmanlaajuista tietosuojavalvontaa.",
        "static.gpc.status.applied": "K\xE4yt\xF6ss\xE4",
        "static.gpc.status.overridden": "Ohitettu",
        "static.gpc.title": "Maailmanlaajuinen tietosuojavalvonta havaittu",
      },
      rn = {
        "static.gpc": "Global Privacy Control",
        "static.gpc.description":
          "Votre pr\xE9f\xE9rence en mati\xE8re de contr\xF4le global de la confidentialit\xE9 (GPC) a \xE9t\xE9 respect\xE9e. Vous avez automatiquement \xE9t\xE9 retir\xE9 des cas d\u2019usage des donn\xE9es qui adh\xE8rent au GPC.",
        "static.gpc.status.applied": "Appliqu\xE9",
        "static.gpc.status.overridden": "Ignor\xE9",
        "static.gpc.title": "Global Privacy Control (GPC) d\xE9tect\xE9",
      },
      an = {
        "static.gpc": "Contr\xF4le mondial de confidentialit\xE9",
        "static.gpc.description":
          "Votre pr\xE9f\xE9rence en mati\xE8re de contr\xF4le mondial de confidentialit\xE9 a \xE9t\xE9 honor\xE9e. Vous avez \xE9t\xE9 automatiquement \xE9cart\xE9 des cas d'utilisation de donn\xE9es qui adh\xE8rent au contr\xF4le mondial de confidentialit\xE9.",
        "static.gpc.status.applied": "Appliqu\xE9",
        "static.gpc.status.overridden": "Annul\xE9",
        "static.gpc.title":
          "Contr\xF4le mondial de confidentialit\xE9 d\xE9tect\xE9",
      },
      sn = {
        "static.gpc": "Control de privacidade global",
        "static.gpc.description":
          "Respetouse a s\xFAa preferencia de control de privacidade global. Foi automaticamente exclu\xEDdo dos casos de uso de datos que cumpren o control de privacidade global.",
        "static.gpc.status.applied": "Aplicado",
        "static.gpc.status.overridden": "Anulado",
        "static.gpc.title": "Control de privacidade global detectado",
      },
      ln = {
        "static.gpc":
          "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923",
        "static.gpc.description":
          "\u0906\u092A\u0915\u0940 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923 \u0935\u0930\u0940\u092F\u0924\u093E\u0913\u0902 \u0915\u093E \u0938\u092E\u094D\u092E\u093E\u0928 \u0915\u093F\u092F\u093E \u0917\u092F\u093E\u0964 \u0906\u092A\u0915\u094B \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923 \u0915\u093E \u092A\u093E\u0932\u0928 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0921\u0947\u091F\u093E \u0909\u092A\u092F\u094B\u0917 \u092E\u093E\u092E\u0932\u094B\u0902 \u0938\u0947 \u0938\u094D\u0935\u091A\u093E\u0932\u093F\u0924 \u0930\u0942\u092A \u0938\u0947 \u092C\u093E\u0939\u0930 \u0915\u0930 \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u0939\u0948\u0964",
        "static.gpc.status.applied":
          "\u0932\u093E\u0917\u0942 \u0915\u093F\u092F\u093E",
        "static.gpc.status.overridden":
          "\u0913\u0935\u0930\u0930\u093E\u0907\u0921 \u0915\u093F\u092F\u093E",
        "static.gpc.title":
          "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u0923 \u0915\u093E \u092A\u0924\u093E \u091A\u0932\u093E",
      },
      dn = {
        "static.gpc": "Globalna kontrola privatnosti",
        "static.gpc.description":
          "Po\u0161tuju se va\u0161e preferencije globalne kontrole privatnosti. Automatski se isklju\u010Deni iz slu\u010Dajeve kori\u0161tenja podataka koji se pridr\u017Eavaju globalne kontrole privatnosti.",
        "static.gpc.status.applied": "Primijenjeno",
        "static.gpc.status.overridden": "Premo\u0161\u0107eno",
        "static.gpc.title":
          "Primije\u0107ena je Globalna kontrola privatnosti (Global Privacy Control)",
      },
      cn = {
        "static.gpc": "Glob\xE1lis adatv\xE9delmi szab\xE1lyoz\xE1s",
        "static.gpc.description":
          "A glob\xE1lis adatv\xE9delmi szab\xE1lyoz\xE1ssal kapcsolatos be\xE1ll\xEDt\xE1sai el lettek fogadva. Automatikusan kiker\xFClt azokb\xF3l az adatfelhaszn\xE1l\xE1si esetekb\u0151l, amelyek a glob\xE1lis adatv\xE9delmi szab\xE1lyoz\xE1shoz tartoznak.",
        "static.gpc.status.applied": "Alkalmazva",
        "static.gpc.status.overridden": "Fel\xFCl\xEDrva",
        "static.gpc.title":
          "Glob\xE1lis adatv\xE9delmi szab\xE1lyoz\xE1s \xE9szlelve",
      },
      pn = {
        "static.gpc": "Controllo Globale della Privacy",
        "static.gpc.description":
          "Le tue preferenze del Controllo Globale della Privacy sono state prese in carico. Sei stato automaticamente escluso dai casi di utilizzo dei dati che corrispondono al Controllo Globale della Privacy.",
        "static.gpc.status.applied": "Applicato",
        "static.gpc.status.overridden": "Non applicato",
        "static.gpc.title": "Controllo Globale della Privacy rilevato",
      },
      un = {
        "static.gpc":
          "\u30B0\u30ED\u30FC\u30D0\u30EB\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB",
        "static.gpc.description":
          "\u30B0\u30ED\u30FC\u30D0\u30EB\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u306E\u8A2D\u5B9A\u306F\u5C0A\u91CD\u3055\u308C\u307E\u3059\u3002\u30B0\u30ED\u30FC\u30D0\u30EB\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u306B\u5F93\u3046\u30C7\u30FC\u30BF\u306E\u30E6\u30FC\u30B9\u30B1\u30FC\u30B9\u304B\u3089\u306F\u81EA\u52D5\u7684\u306B\u30AA\u30D7\u30C8\u30A2\u30A6\u30C8\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
        "static.gpc.status.applied": "\u9069\u7528",
        "static.gpc.status.overridden": "\u5909\u66F4",
        "static.gpc.title":
          "\u30B0\u30ED\u30FC\u30D0\u30EB\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u3092\u691C\u51FA\u3057\u307E\u3057\u305F",
      },
      fn = {
        "static.gpc": "Visuotin\u0117 privatumo kontrol\u0117",
        "static.gpc.description":
          "Buvo atsi\u017Evelgta \u012F j\u016Bs\u0173 visuotin\u0117s privatumo kontrol\u0117s pageidavim\u0105. Buvote automati\u0161kai at\u0161auktas i\u0161 duomen\u0173 naudojimo atvej\u0173, kai laikomasi visuotin\u0117s privatumo kontrol\u0117s.",
        "static.gpc.status.applied": "Taikoma",
        "static.gpc.status.overridden": "Nebegaliojantis",
        "static.gpc.title": "Aptikta visuotin\u0117 privatumo kontrol\u0117",
      },
      vn = {
        "static.gpc": "Glob\u0101l\u0101 priv\u0101tuma kontrole",
        "static.gpc.description":
          "M\u0113s esam izpild\u012Bju\u0161i j\u016Bsu pras\u012Bbu kontrol\u0113t glob\u0101lo priv\u0101tumu. P\u0113c noklus\u0113juma esat no\u0146emts no datu lietojuma pieteikumiem, kas atbilst glob\u0101lajai priv\u0101tuma kontrolei.",
        "static.gpc.status.applied": "Pielietots",
        "static.gpc.status.overridden": "Ignor\u0113ts",
        "static.gpc.title":
          "Konstat\u0113ta glob\u0101l\u0101 priv\u0101tuma kontrole",
      },
      gn = {
        "static.gpc": "Kontroll Globali tal-Privatezza",
        "static.gpc.description":
          "Il-preferenza globali tieg\u0127ek g\u0127all-kontroll tal-privatezza \u0121iet onorata. Inti awtomatikament g\u0127a\u017Cilt li ma tibqax tu\u017Ca d-dejta f'ka\u017Cijiet li jirrispettaw il-kontroll globali tal-privatezza.",
        "static.gpc.status.applied": "Applikat",
        "static.gpc.status.overridden": "Maqbu\u017Ca",
        "static.gpc.title": "Instab il-Kontroll Globali tal-Privatezza",
      },
      bn = {
        "static.gpc": "Global Privacy Control",
        "static.gpc.description":
          "Uw Global Privacy Control-voorkeur wordt gerespecteerd. U bent automatisch afgemeld voor gegevensgebruiksscenario's die zich houden aan Global Privacy Control.",
        "static.gpc.status.applied": "Toegepast",
        "static.gpc.status.overridden": "Genegeerd",
        "static.gpc.title": "Global Privacy Control gedetecteerd",
      },
      _n = {
        "static.gpc": "Globale personverninnstillinger",
        "static.gpc.description":
          "Preferansene dine vedr\xF8rende de globale personverninnstilingene dine er godtatt. Du har automatisk takket nei til databruksaker som f\xF8lger globale personverninnstillinger.",
        "static.gpc.status.applied": "Anvendt",
        "static.gpc.status.overridden": "Overstyrt",
        "static.gpc.title": "Globale personverninnstillinger er oppdaget",
      },
      yn = {
        "static.gpc": "Og\xF3lna kontrola prywatno\u015Bci",
        "static.gpc.description":
          "Twoja preferencja dotycz\u0105ca og\xF3lnej kontroli prywatno\u015Bci zosta\u0142a uwzgl\u0119dniona. Automatycznie odm\xF3wiono zgody na Twoje przypadki wykorzystania danych, kt\xF3re s\u0105 zgodne z Og\xF3ln\u0105 kontrol\u0105 prywatno\u015Bci.",
        "static.gpc.status.applied": "Zastosowano",
        "static.gpc.status.overridden": "Nadpisano",
        "static.gpc.title": "Wykryta Og\xF3lna kontrola prywatno\u015Bci",
      },
      mn = {
        "static.gpc": "Controle de Privacidade Global",
        "static.gpc.description":
          "Sua prefer\xEAncia global de controle de privacidade foi respeitada. Voc\xEA foi automaticamente removido dos casos de uso de dados que aderem ao controle de privacidade global.",
        "static.gpc.status.applied": "Aplicado",
        "static.gpc.status.overridden": "Anulado",
        "static.gpc.title": "Controle de Privacidade Global detectado",
      },
      hn = {
        "static.gpc": "Controlo de Privacidade Global",
        "static.gpc.description":
          "A sua prefer\xEAncia de controlo de privacidade global foi honrada. Foi automaticamente exclu\xEDdo/a dos casos de utiliza\xE7\xE3o de dados que aderem ao controlo de privacidade global.",
        "static.gpc.status.applied": "Aplicado",
        "static.gpc.status.overridden": "Anulado",
        "static.gpc.title": "Controlo de Privacidade Global detetado",
      },
      kn = {
        "static.gpc": "Control global al confiden\u021Bialit\u0103\u021Bii",
        "static.gpc.description":
          "Preferin\u021Ba dvs. de control global al confiden\u021Bialit\u0103\u021Bii a fost onorat\u0103. A\u021Bi fost exclus(\u0103) automat de la cazurile de utilizare a datelor care respect\u0103 controlul global al confiden\u021Bialit\u0103\u021Bii.",
        "static.gpc.status.applied": "Aplicat",
        "static.gpc.status.overridden": "Suprascris",
        "static.gpc.title":
          "A fost detectat un control global al confiden\u021Bialit\u0103\u021Bii",
      },
      xn = {
        "static.gpc": "Global Privacy Control",
        "static.gpc.description":
          "\u0412\u0430\u0448\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 Global Privacy Control \u0443\u0447\u0442\u0435\u043D\u0430. \u0412\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0438\u0441\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0435\u0441\u044C \u0432 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F\u0445, \u0433\u0434\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F Global Privacy Control.",
        "static.gpc.status.applied":
          "\u041F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u043E",
        "static.gpc.status.overridden":
          "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E",
        "static.gpc.title":
          "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 Global Privacy Control",
      },
      wn = {
        "static.gpc": "Glob\xE1lna kontrola s\xFAkromia",
        "static.gpc.description":
          "Va\u0161a predvo\u013Eba pre glob\xE1lnu kontrolu s\xFAkromia bola dodr\u017Ean\xE1. Pre pr\xEDpady pou\u017Eitia, kde sa pou\u017E\xEDva glob\xE1lna kontrola s\xFAkromia, v\xE1m bol automaticky nastaven\xFD explicitn\xFD nes\xFAhlas.",
        "static.gpc.status.applied": "Pou\u017Eit\xE1",
        "static.gpc.status.overridden": "Prep\xEDsan\xE1",
        "static.gpc.title": "Bola zisten\xE1 Glob\xE1lna kontrola s\xFAkromia",
      },
      Cn = {
        "static.gpc": "Global Privacy Control",
        "static.gpc.description":
          "Va\u0161a nastavitev globalnega nadzora zasebnosti je bila upo\u0161tevana. Samodejno je bilo preklicano va\u0161e soglasje za tiste primere uporabe podatkov, ki se ravnajo po globalnem nadzoru zasebnosti.",
        "static.gpc.status.applied": "Uporabljeno",
        "static.gpc.status.overridden": "Pregla\u0161eno",
        "static.gpc.title":
          "Zaznan globalni nadzor zasebnosti \xBBGlobal Privacy Control\xAB",
      },
      En = {
        "static.gpc": "Global Privacy Control",
        "static.gpc.description":
          "\u0412\u0430\u0448\u0430 \u0433\u043B\u043E\u0431\u0430\u043B\u043D\u0430 \u043F\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u0438 \u0458\u0435 \u043F\u043E\u0434\u0435\u0448\u0435\u043D\u0430. \u0410\u0443\u0442\u043E\u043C\u0430\u0442\u0441\u043A\u0438 \u0441\u0442\u0435 \u0438\u0441\u043A\u0459\u0443\u0447\u0435\u043D\u0438 \u0438\u0437 \u0441\u043B\u0443\u0447\u0430\u0458\u0435\u0432\u0430 \u0443\u043F\u043E\u0442\u0440\u0435\u0431\u0435 \u043F\u043E\u0434\u0430\u0442\u0430\u043A\u0430 \u043A\u043E\u0458\u0438 \u0441\u0443 \u0443 \u0441\u043A\u043B\u0430\u0434\u0443 \u0441\u0430 \u0433\u043B\u043E\u0431\u0430\u043B\u043D\u043E\u043C \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u043E\u043C \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0441\u0442\u0438.",
        "static.gpc.status.applied":
          "\u041F\u0440\u0438\u043C\u0435\u045A\u0435\u043D\u0430",
        "static.gpc.status.overridden":
          "\u0417\u0430\u043C\u0435\u045A\u0435\u043D\u0430",
        "static.gpc.title":
          "Global Privacy Control \u043E\u0442\u043A\u0440\u0438\u0432\u0435\u043D",
      },
      Pn = {
        "static.gpc": "Globalna kontrola privatnosti",
        "static.gpc.description":
          "Va\u0161a globalna postavka kontrole privatnosti se po\u0161tuje. Automatski ste isklju\u010Deni iz slu\u010Dajeva kori\u0161c\u0301enja podataka koji podle\u017Eu globalnoj kontroli privatnosti.",
        "static.gpc.status.applied": "Primenjeno",
        "static.gpc.status.overridden": "Zaobi\u0111eno",
        "static.gpc.title": "Otkrivena je globalna kontrola privatnosti",
      },
      On = {
        "static.gpc": "Global integritetskontroll",
        "static.gpc.description":
          "Dina preferenser f\xF6r global integritetskontroll har efterf\xF6ljts. Du har automatiskt valt bort anv\xE4ndningsfall f\xF6r uppgifter som efterf\xF6ljer global integritetskontroll.",
        "static.gpc.status.applied": "Till\xE4mpad",
        "static.gpc.status.overridden": "\xC5sidosatt",
        "static.gpc.title": "Global integritetskontroll uppt\xE4cktes",
      },
      An = {
        "static.gpc": "Global Gizlilik Kontrol\xFC",
        "static.gpc.description":
          "Global gizlilik kontrol\xFC tercihiniz yerine getirildi. Global gizlilik kontrol\xFCne uygun veri kullan\u0131m durumlar\u0131ndan otomatik olarak \xE7\u0131kar\u0131ld\u0131n\u0131z.",
        "static.gpc.status.applied": "Uyguland\u0131",
        "static.gpc.status.overridden": "Ge\xE7ersiz k\u0131l\u0131nd\u0131",
        "static.gpc.title": "Global Gizlilik Kontrol\xFC tespit edildi",
      },
      $n = {
        "static.gpc":
          "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u043A\u043E\u043D\u0444\u0456\u0434\u0435\u043D\u0446\u0456\u0439\u043D\u043E\u0441\u0442\u0456",
        "static.gpc.description":
          "\u0412\u0430\u0448\u0456 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044E \u043A\u043E\u043D\u0444\u0456\u0434\u0435\u043D\u0446\u0456\u0439\u043D\u043E\u0441\u0442\u0456 \u0432\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u043E. \u0412\u0430\u0441 \u0431\u0443\u043B\u043E \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0432\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0437 \u0432\u0438\u043F\u0430\u0434\u043A\u0456\u0432 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u043D\u043D\u044F \u0434\u0430\u043D\u0438\u0445, \u044F\u043A\u0456 \u0434\u043E\u0442\u0440\u0438\u043C\u0443\u044E\u0442\u044C\u0441\u044F \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u044C \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044E \u043A\u043E\u043D\u0444\u0456\u0434\u0435\u043D\u0446\u0456\u0439\u043D\u043E\u0441\u0442\u0456.",
        "static.gpc.status.applied":
          "\u0417\u0430\u0441\u0442\u043E\u0441\u043E\u0432\u0430\u043D\u043E",
        "static.gpc.status.overridden":
          "\u041F\u0435\u0440\u0435\u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E",
        "static.gpc.title":
          "\u0412\u0438\u044F\u0432\u043B\u0435\u043D\u043E \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u043A\u043E\u043D\u0444\u0456\u0434\u0435\u043D\u0446\u0456\u0439\u043D\u043E\u0441\u0442\u0456",
      },
      Nn = {
        "static.gpc": "\u5168\u5C40\u9690\u79C1\u63A7\u5236",
        "static.gpc.description":
          "\u60A8\u7684\u5168\u5C40\u9690\u79C1\u63A7\u5236\u504F\u597D\u5DF2\u5F97\u5230\u5C0A\u91CD\u3002\u60A8\u5DF2\u81EA\u52A8\u9009\u62E9\u9000\u51FA\u7B26\u5408\u5168\u5C40\u9690\u79C1\u63A7\u5236\u7684\u6570\u636E\u4F7F\u7528\u6848\u4F8B\u3002",
        "static.gpc.status.applied": "\u5DF2\u5E94\u7528",
        "static.gpc.status.overridden": "\u88AB\u8986\u76D6",
        "static.gpc.title":
          "\u68C0\u6D4B\u5230\u5168\u5C40\u9690\u79C1\u63A7\u5236",
      };
    const qe = {
        ar: Vi,
        bg: Hi,
        bs: Ki,
        ca: Yi,
        cs: qi,
        da: Wi,
        de: Ji,
        el: Xi,
        en: Zi,
        es: Qi,
        "es-MX": en,
        et: tn,
        eu: on,
        fi: nn,
        fr: rn,
        "fr-CA": an,
        gl: sn,
        "hi-IN": ln,
        hr: dn,
        hu: cn,
        it: pn,
        ja: un,
        lt: fn,
        lv: vn,
        mt: gn,
        nl: bn,
        no: _n,
        pl: yn,
        "pt-BR": mn,
        "pt-PT": hn,
        ro: kn,
        ru: xn,
        sk: wn,
        sl: Cn,
        "sr-Cyrl": En,
        "sr-Latn": Pn,
        sv: On,
        tr: An,
        uk: $n,
        zh: Nn,
      },
      Tn = [
        {
          locale: "ar",
          label_en: "Arabic",
          label_original:
            "\u0627\u0644\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u064E\u0651\u0629",
        },
        {
          locale: "bg",
          label_en: "Bulgarian",
          label_original:
            "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438 \u0435\u0437\u0438\u043A",
        },
        { locale: "bs", label_en: "Bosnian", label_original: "Bosanski Jezik" },
        {
          locale: "ca",
          label_en: "Catalan Spanish",
          label_original: "catal\xE0",
        },
        {
          locale: "cs",
          label_en: "Czech",
          label_original: "\u010Desk\xFD jazyk",
        },
        { locale: "da", label_en: "Danish", label_original: "Dansk" },
        { locale: "de", label_en: "German", label_original: "Deutsch" },
        {
          locale: "el",
          label_en: "Greek",
          label_original: "\u03B5\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
        },
        { locale: "en", label_en: "English", label_original: "English" },
        {
          locale: "es",
          label_en: "European Spanish",
          label_original: "Espa\xF1ol",
        },
        {
          locale: "es-MX",
          label_en: "Mexican Spanish",
          label_original: "Espa\xF1ol - MX",
        },
        { locale: "et", label_en: "Estonian", label_original: "Eesti" },
        { locale: "eu", label_en: "Basque Spanish", label_original: "euskara" },
        { locale: "fi", label_en: "Finnish", label_original: "Suomi" },
        { locale: "fl", label_en: "Filipino", label_original: "Pilipino" },
        {
          locale: "fr",
          label_en: "European French",
          label_original: "Fran\xE7ais",
        },
        {
          locale: "fr-CA",
          label_en: "French Canadian",
          label_original: "Fran\xE7ais - CA",
        },
        { locale: "gl", label_en: "Galician", label_original: "Galego" },
        {
          locale: "hi-IN",
          label_en: "Indian Hindi",
          label_original: "\u0939\u093F\u0928\u094D\u0926\u0940",
        },
        {
          locale: "hr",
          label_en: "Croatian",
          label_original: "Hrvatski Jezik",
        },
        { locale: "hu", label_en: "Hungarian", label_original: "magyar" },
        {
          locale: "hy",
          label_en: "Armenian",
          label_original: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576",
        },
        { locale: "it", label_en: "Italian", label_original: "Italiano" },
        {
          locale: "ja",
          label_en: "Japanese",
          label_original: "\u65E5\u672C\u8A9E",
        },
        {
          locale: "lt",
          label_en: "Lithuanian",
          label_original: "lietuvi\u0173 kalba",
        },
        {
          locale: "lv",
          label_en: "Latvian",
          label_original: "latvie\u0161u valoda",
        },
        { locale: "mt", label_en: "Maltese", label_original: "Malti" },
        { locale: "nl", label_en: "Dutch", label_original: "Nederlands" },
        { locale: "no", label_en: "Norwegian", label_original: "Norsk" },
        {
          locale: "pt-BR",
          label_en: "Brazilian Portuguese",
          label_original: "Portugu\xEAs - BR",
        },
        {
          locale: "pt-PT",
          label_en: "Portugal Portuguese",
          label_original: "Portugu\xEAs - PT",
        },
        {
          locale: "ro",
          label_en: "Romanian",
          label_original: "limba rom\xE2n\u0103",
        },
        {
          locale: "ru",
          label_en: "Russian",
          label_original:
            "\u0440\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
        },
        { locale: "sk", label_en: "Slovak", label_original: "sloven\u010Dina" },
        {
          locale: "sl",
          label_en: "Slovenian",
          label_original: "Slovenski Jezik",
        },
        {
          locale: "sr-Cyrl",
          label_en: "Cyrillic Serbian",
          label_original: "\u0441\u0440\u043F\u0441\u043A\u0438",
        },
        {
          locale: "sr-Latn",
          label_en: "Latin Serbian",
          label_original: "Srpski",
        },
        { locale: "sv", label_en: "Swedish", label_original: "Sverige" },
        { locale: "tr", label_en: "Turkish", label_original: "T\xFCrk\xE7e" },
        {
          locale: "uk",
          label_en: "Ukrainian",
          label_original:
            "\u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 \u043C\u043E\u0432\u0430",
        },
        {
          locale: "zh",
          label_en: "Chinese (Mandarin)",
          label_original: "\u4E2D\u6587",
        },
      ];
    var In = Object.defineProperty,
      Yt = Object.getOwnPropertySymbols,
      Sn = Object.prototype.hasOwnProperty,
      jn = Object.prototype.propertyIsEnumerable,
      qt = (e, t, o) =>
        t in e
          ? In(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      j = (e, t) => {
        for (var o in t || (t = {})) Sn.call(t, o) && qt(e, o, t[o]);
        if (Yt) for (var o of Yt(t)) jn.call(t, o) && qt(e, o, t[o]);
        return e;
      };
    function V(e, t) {
      return (
        e.toLowerCase().replaceAll("_", "-") ===
        t.toLowerCase().replaceAll("_", "-")
      );
    }
    function Ln(e, t) {
      const o = {},
        i = [
          "accept_button_label",
          "acknowledge_button_label",
          "banner_description",
          "banner_title",
          "description",
          "privacy_policy_link_label",
          "privacy_policy_url",
          "privacy_preferences_link_label",
          "reject_button_label",
          "save_button_label",
          "title",
          "modal_link_label",
        ];
      if (e.translations)
        e.translations.forEach((n) => {
          const r = n.language;
          let d = !1;
          t != null && t.override_language && (d = V(t.override_language, r));
          const l = {};
          i.forEach((a) => {
            let c = null;
            t && d && (c = a in t ? t[a] : null);
            const s = n[a];
            typeof s == "string" && (l[`exp.${a}`] = c || s);
          }),
            (o[r] = j(j({}, l), o[r]));
        });
      else {
        const n = e.language || W,
          r = {};
        i.forEach((d) => {
          const l = e[d];
          typeof l == "string" && (r[`exp.${d}`] = l);
        }),
          (o[n] = j(j({}, r), o[n]));
      }
      return o;
    }
    function Fn(e) {
      var t;
      if ((t = e?.experience_config) != null && t.translations) {
        const { translations: o } = e.experience_config,
          i = o.find((n) => n.is_default);
        return i?.language;
      }
    }
    function zn(e, t) {
      const o = {};
      return (
        t.forEach((i) => {
          const n = Object.keys(e).find((r) => V(r, i));
          if (n) {
            const r = e[n],
              d = {};
            [
              "purposes",
              "specialPurposes",
              "features",
              "specialFeatures",
              "stacks",
              "dataCategories",
            ].forEach((l) => {
              const a = r[l] || {};
              Object.keys(a).forEach((c) => {
                const s = a[c],
                  g = `exp.tcf.${l}.${c}`;
                (d[`${g}.name`] = s.name),
                  (d[`${g}.description`] = s.description),
                  s.illustrations &&
                    s.illustrations.length > 0 &&
                    s.illustrations.forEach((u, f) => {
                      d[`${g}.illustrations.${f}`] = u;
                    });
              });
            }),
              (o[i] = j(j({}, d), o[i]));
          }
        }),
        o
      );
    }
    function Dn(e) {
      return (
        Object.keys(qe).forEach((t) => {
          e.load(t, qe[t]);
        }),
        Object.keys(qe)
      );
    }
    function Mn(e, t, o) {
      const i = {};
      let n = [];
      if (t != null && t.experience_config) {
        const r = t.experience_config,
          d = Ln(r, o);
        if (
          (Object.keys(d).forEach((l) => {
            i[l] = j(j({}, d[l]), i[l]);
          }),
          (n = Object.keys(i)),
          r.component === I.TCF_OVERLAY && t != null && t.gvl_translations)
        ) {
          const l = zn(t.gvl_translations, n);
          (n = Object.keys(l)),
            Object.keys(l).forEach((a) => {
              i[a] = j(j({}, l[a]), i[a]);
            });
        }
      }
      return (
        n.forEach((r) => {
          e.load(r, i[r]);
        }),
        n
      );
    }
    function We(e) {
      return e.locale;
    }
    function Rn(e, t) {
      const o = e?.language;
      return t?.fidesLocale || o || W;
    }
    function Un(e, t, o = W) {
      const i = e.match(Me);
      if (i) {
        const [n, r] = i,
          d = t.find((a) => V(a, n));
        if (d) return d;
        const l = t.find((a) => V(a, r));
        if (l) return l;
      }
      return o;
    }
    function ye(e, t) {
      return e.t(t) !== "" && e.t(t) !== t;
    }
    function Wt(e, t) {
      if (!t || !t.translations) return null;
      const o = We(e),
        i = t.translations.find((r) => V(r.language, o));
      return (
        i ||
        t.translations.find((r) => V(r.language, e.getDefaultLocale())) ||
        t.translations[0] ||
        null
      );
    }
    function Jt(e, t) {
      if (!t || !t.translations) return null;
      const o = We(e),
        i = t.translations.find((r) => V(r.language, o));
      return (
        i ||
        t.translations.find((r) => V(r.language, e.getDefaultLocale())) ||
        t.translations[0] ||
        null
      );
    }
    function Gn(e, t, o, i, n) {
      var r;
      Dn(e);
      const d = Mn(e, o, n);
      b(i?.debug, `Loaded Fides i18n with available locales = ${d}`);
      const l = Tn.filter((g) => d.includes(g.locale));
      e.setAvailableLanguages(l),
        b(i?.debug, "Loaded Fides i18n with available languages", l);
      const a = Fn(o) || W;
      e.setDefaultLocale(a),
        b(
          i?.debug,
          `Setting Fides i18n default locale = ${e.getDefaultLocale()}`
        );
      let c = e.getDefaultLocale();
      ((r = o.experience_config) == null ? void 0 : r.auto_detect_language) ===
      !1
        ? b(i?.debug, "Auto-detection of Fides i18n user locale disabled!")
        : ((c = Rn(t, i)),
          b(i?.debug, `Detected Fides i18n user locale = ${c}`));
      const s = Un(c, d, e.getDefaultLocale());
      e.activate(s),
        b(i?.debug, `Initialized Fides i18n with best locale match = ${s}`);
    }
    function Bn() {
      let e = [],
        t = W,
        o = W;
      const i = {};
      return {
        setAvailableLanguages(n) {
          e = n;
        },
        get availableLanguages() {
          return e;
        },
        activate: (n) => {
          o = n;
        },
        getDefaultLocale: () => t,
        setDefaultLocale: (n) => {
          t = n;
        },
        get locale() {
          return o;
        },
        load: (n, r) => {
          i[n] = j(j({}, i[n]), r);
        },
        t: (n) => {
          if (typeof n > "u")
            throw new TypeError("Unexpected type for descriptor or id!");
          let r;
          if (typeof n == "string") r = n;
          else if (typeof n == "object" && n.id) r = n.id;
          else return "";
          return o && o in i && r && r in i[o] && i[o][r] ? i[o][r] : r;
        },
      };
    }
    const Vn = (e, t, o) => {
        var i;
        let n = De;
        if (!e)
          t.t("exp.modal_link_label") !== "exp.modal_link_label" &&
            (n = t.t("exp.modal_link_label"));
        else {
          const r = t.getDefaultLocale(),
            d =
              (i = o?.experience_config) == null
                ? void 0
                : i.translations.find((l) => l.language === r);
          d != null && d.modal_link_label && (n = d.modal_link_label);
        }
        return n;
      },
      Hn = () => {
        var e;
        if (window.Fides.options.tcfEnabled) return !1;
        if (
          typeof ((e = window.navigator) == null
            ? void 0
            : e.globalPrivacyControl) == "boolean"
        )
          return window.navigator.globalPrivacyControl;
        const t = new URL(window.location.href).searchParams.get(
          "globalPrivacyControl"
        );
        if (t === "true") return !0;
        if (t === "false") return !1;
      },
      X = () => (typeof window > "u" ? {} : { globalPrivacyControl: Hn() });
    var Kn = Object.defineProperty,
      Yn = Object.defineProperties,
      qn = Object.getOwnPropertyDescriptors,
      Xt = Object.getOwnPropertySymbols,
      Wn = Object.prototype.hasOwnProperty,
      Jn = Object.prototype.propertyIsEnumerable,
      Zt = (e, t, o) =>
        t in e
          ? Kn(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      Je = (e, t) => {
        for (var o in t || (t = {})) Wn.call(t, o) && Zt(e, o, t[o]);
        if (Xt) for (var o of Xt(t)) Jn.call(t, o) && Zt(e, o, t[o]);
        return e;
      },
      Qt = (e, t) => Yn(e, qn(t)),
      Xe = (e, t, o) =>
        new Promise((i, n) => {
          var r = (a) => {
              try {
                l(o.next(a));
              } catch (c) {
                n(c);
              }
            },
            d = (a) => {
              try {
                l(o.throw(a));
              } catch (c) {
                n(c);
              }
            },
            l = (a) =>
              a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
          l((o = o.apply(e, t)).next());
        }),
      eo = ((e) => (
        (e.PRIVACY_EXPERIENCE = "/privacy-experience"),
        (e.PRIVACY_PREFERENCES = "/privacy-preferences"),
        (e.NOTICES_SERVED = "/notices-served"),
        e
      ))(eo || {});
    const to = (e, t, o, i, n) =>
        Xe(void 0, null, function* () {
          var r;
          if (
            (b(o, `Fetching experience in location: ${e}`),
            i != null && i.getPrivacyExperienceFn)
          ) {
            b(o, "Calling custom fetch experience fn");
            try {
              return yield i.getPrivacyExperienceFn(e, null);
            } catch (c) {
              return (
                b(
                  o,
                  "Error fetching experience from custom API, returning {}. Error: ",
                  c
                ),
                {}
              );
            }
          }
          b(o, "Calling Fides GET experience API");
          const d = {
            method: "GET",
            mode: "cors",
            headers: [["Unescape-Safestr", "true"]],
          };
          let l = Je(
            {
              show_disabled: "false",
              region: e,
              component: I.OVERLAY,
              has_notices: "true",
              has_config: "true",
              systems_applicable: "true",
              include_gvl: "true",
              include_meta: "true",
            },
            n && { property_id: n }
          );
          l = new URLSearchParams(l);
          const a = yield fetch(`${t}/privacy-experience?${l}`, d);
          if (!a.ok)
            return (
              b(
                o,
                "Error getting experience from Fides API, returning {}. Response:",
                a
              ),
              {}
            );
          try {
            const c = yield a.json(),
              s = (r = c.items && c.items[0]) != null ? r : {};
            return (
              b(o, "Got experience response from Fides API, returning: ", s), s
            );
          } catch {
            return (
              b(
                o,
                "Error parsing experience response body from Fides API, returning {}. Response:",
                a
              ),
              {}
            );
          }
        }),
      oo = {
        method: "PATCH",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      },
      io = (e, t, o, i, n) =>
        Xe(void 0, null, function* () {
          var r;
          if (
            (b(o.debug, "Saving user consent preference...", t),
            (r = o.apiOptions) != null && r.savePreferencesFn)
          ) {
            b(o.debug, "Calling custom save preferences fn");
            try {
              yield o.apiOptions.savePreferencesFn(
                e,
                i.consent,
                i.fides_string,
                n
              );
            } catch (a) {
              return (
                b(
                  o.debug,
                  "Error saving preferences to custom API, continuing. Error: ",
                  a
                ),
                Promise.reject(a)
              );
            }
            return Promise.resolve();
          }
          b(o.debug, "Calling Fides save preferences API");
          const d = Qt(Je({}, oo), { body: JSON.stringify(t) }),
            l = yield fetch(`${o.fidesApiUrl}/privacy-preferences`, d);
          return (
            l.ok ||
              b(
                o.debug,
                "Error patching user preference Fides API. Response:",
                l
              ),
            Promise.resolve()
          );
        }),
      no = (e) =>
        Xe(void 0, [e], function* ({ request: t, options: o }) {
          var i;
          if (
            (b(o.debug, "Saving that notices were served..."),
            (i = o.apiOptions) != null && i.patchNoticesServedFn)
          ) {
            b(o.debug, "Calling custom patch notices served fn");
            try {
              return yield o.apiOptions.patchNoticesServedFn(t);
            } catch (d) {
              return (
                b(
                  o.debug,
                  "Error patching notices served to custom API, continuing. Error: ",
                  d
                ),
                null
              );
            }
          }
          b(o.debug, "Calling Fides patch notices served API");
          const n = Qt(Je({}, oo), { body: JSON.stringify(t) }),
            r = yield fetch(`${o.fidesApiUrl}/notices-served`, n);
          return r.ok
            ? r.json()
            : (b(o.debug, "Error patching notices served. Response:", r), null);
        });
    var Xn = (e, t, o) =>
      new Promise((i, n) => {
        var r = (a) => {
            try {
              l(o.next(a));
            } catch (c) {
              n(c);
            }
          },
          d = (a) => {
            try {
              l(o.throw(a));
            } catch (c) {
              n(c);
            }
          },
          l = (a) =>
            a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
        l((o = o.apply(e, t)).next());
      });
    const ro = (e, t, o = !1) =>
      Xn(void 0, null, function* () {
        if ((b(o, "Running getLocation..."), !e))
          return (
            b(
              o,
              "User location could not be retrieved because geolocation is disabled."
            ),
            null
          );
        if (!t)
          return (
            b(
              o,
              "Location cannot be found due to no configured geoLocationApiUrl."
            ),
            null
          );
        b(o, `Calling geolocation API: GET ${t}...`);
        const i = yield fetch(t, { mode: "cors" });
        if (!i.ok)
          return (
            b(
              o,
              "Error getting location from geolocation API, returning {}. Response:",
              i
            ),
            null
          );
        try {
          const n = yield i.json();
          return (
            b(o, "Got location response from geolocation API, returning:", n), n
          );
        } catch {
          return (
            b(
              o,
              "Error parsing response body from geolocation API, returning {}. Response:",
              i
            ),
            null
          );
        }
      });
    var Zn = Object.defineProperty,
      ao = Object.getOwnPropertySymbols,
      Qn = Object.prototype.hasOwnProperty,
      er = Object.prototype.propertyIsEnumerable,
      so = (e, t, o) =>
        t in e
          ? Zn(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      tr = (e, t) => {
        for (var o in t || (t = {})) Qn.call(t, o) && so(e, o, t[o]);
        if (ao) for (var o of ao(t)) er.call(t, o) && so(e, o, t[o]);
        return e;
      },
      lo = (e, t, o) =>
        new Promise((i, n) => {
          var r = (a) => {
              try {
                l(o.next(a));
              } catch (c) {
                n(c);
              }
            },
            d = (a) => {
              try {
                l(o.throw(a));
              } catch (c) {
                n(c);
              }
            },
            l = (a) =>
              a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
          l((o = o.apply(e, t)).next());
        });
    function or(e, t, o, i, n, r, d, l, a) {
      return lo(this, null, function* () {
        b(e.debug, "Saving preferences to Fides API");
        const c = (r || []).map((g) => ({
            preference: g.consentPreference,
            privacy_notice_history_id: g.noticeHistoryId || "",
          })),
          s = tr(
            {
              browser_identity: t.identity,
              preferences: c,
              privacy_experience_config_history_id: n,
              user_geography: l,
              method: i,
              served_notice_history_id: a,
            },
            d ?? []
          );
        yield io(i, s, e, t, o);
      });
    }
    const co = (e) =>
        lo(
          void 0,
          [e],
          function* ({
            consentPreferencesToSave: t,
            privacyExperienceConfigHistoryId: o,
            experience: i,
            consentMethod: n,
            options: r,
            userLocationString: d,
            cookie: l,
            servedNoticeHistoryId: a,
            tcf: c,
            updateCookie: s,
          }) {
            const g = { consentMethod: n },
              u = yield s(l);
            if (
              (Object.assign(l, u),
              Object.assign(l.fides_meta, g),
              b(r.debug, "Updating window.Fides"),
              (window.Fides.consent = l.consent),
              (window.Fides.fides_string = l.fides_string),
              (window.Fides.tcf_consent = l.tcf_consent),
              b(r.debug, "Saving preferences to cookie"),
              Rt(l, r.base64Cookie),
              (window.Fides.saved_consent = l.consent),
              !r.fidesDisableSaveApi)
            )
              try {
                yield or(r, l, i, n, o, t, c, d, a);
              } catch (f) {
                b(
                  r.debug,
                  "Error saving updated preferences to API, continuing. Error: ",
                  f
                );
              }
            t &&
              t
                .filter((f) => f.consentPreference === L.OPT_OUT)
                .forEach((f) => {
                  Gt(f.notice.cookies);
                }),
              B("FidesUpdated", l, r.debug, g);
          }
        ),
      ir = (e) => {
        try {
          const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
          if (!t) return null;
          let o = parseInt(t[1], 16),
            i = parseInt(t[2], 16),
            n = parseInt(t[3], 16);
          (o /= 255), (i /= 255), (n /= 255);
          const r = Math.max(o, i, n),
            d = Math.min(o, i, n);
          let l, a;
          const c = (r + d) / 2;
          if (r === d) l = a = 0;
          else {
            const s = r - d;
            switch (((a = c > 0.5 ? s / (2 - r - d) : s / (r + d)), r)) {
              case o:
                l = (i - n) / s + (i < n ? 6 : 0);
                break;
              case i:
                l = (n - o) / s + 2;
                break;
              case n:
                l = (o - i) / s + 4;
                break;
            }
            l /= 6;
          }
          return { h: l, s: a, l: c };
        } catch {
          return null;
        }
      },
      nr = (e, t = !1) => {
        let o = "";
        const i = Math.round(e.h * 360),
          n = Math.round(e.s * 100),
          r = Math.round(e.l * 100);
        return (o = `${i},${n}%,${r}%`), (o = t ? o : `hsl(${o})`), o;
      };
    var Ze = ((e) => ((e.HEX = "hex"), (e.HSL = "hsl"), e))(Ze || {});
    const po = (e, t, o) => {
      const i = t === "hex" ? ir(e) : e;
      return i && i.l
        ? (i.l < 0.25
            ? (i.l = o === 1 ? i.l + 0.1 : i.l + 0.2)
            : i.l < 0.5
            ? (i.l = o === 1 ? i.l + 0.08 : i.l + 0.16)
            : i.l < 0.75
            ? (i.l = o === 1 ? i.l + 0.06 : i.l + 0.12)
            : i.l < 0.9
            ? (i.l = o === 1 ? i.l + 0.04 : i.l + 0.08)
            : (i.l = 0.9),
          nr(i))
        : e;
    };
    var Qe = (e, t, o) =>
      new Promise((i, n) => {
        var r = (a) => {
            try {
              l(o.next(a));
            } catch (c) {
              n(c);
            }
          },
          d = (a) => {
            try {
              l(o.throw(a));
            } catch (c) {
              n(c);
            }
          },
          l = (a) =>
            a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
        l((o = o.apply(e, t)).next());
      });
    const rr = "fides-embed-container",
      ar = "fides-overlay",
      uo = (e) =>
        Qe(
          void 0,
          [e],
          function* ({
            options: t,
            experience: o,
            i18n: i,
            fidesRegionString: n,
            cookie: r,
            savedConsent: d,
            renderOverlay: l,
          }) {
            b(t.debug, "Initializing Fides consent overlays...");
            function a() {
              return Qe(this, null, function* () {
                var c, s, g;
                try {
                  b(
                    t.debug,
                    "Rendering Fides overlay CSS & HTML into the DOM..."
                  );
                  let u;
                  if (t.fidesEmbed) {
                    if (((u = document.getElementById(rr)), !u))
                      throw new Error(
                        "Element with id fides-embed-container could not be found."
                      );
                  } else {
                    const f = t.overlayParentId || ar;
                    (u = document.getElementById(f)),
                      u ||
                        (b(
                          t.debug,
                          `Parent element not found (#${f}), creating and appending to body...`
                        ),
                        (u = document.createElement("div")),
                        (u.id = f),
                        document.body.prepend(u));
                  }
                  if (t.fidesPrimaryColor) {
                    document.documentElement.style.setProperty(
                      "--fides-overlay-primary-color",
                      t.fidesPrimaryColor
                    );
                    const f = po(t.fidesPrimaryColor, Ze.HEX, 1),
                      p = po(t.fidesPrimaryColor, Ze.HEX, 2);
                    document.documentElement.style.setProperty(
                      "--fides-overlay-primary-button-background-hover-color",
                      f
                    ),
                      document.documentElement.style.setProperty(
                        "--fides-overlay-primary-active-disabled-color",
                        p
                      );
                  }
                  return (
                    (((c = o.experience_config) == null
                      ? void 0
                      : c.component) === I.MODAL ||
                      ((s = o.experience_config) == null
                        ? void 0
                        : s.component) === I.BANNER_AND_MODAL ||
                      ((g = o.experience_config) == null
                        ? void 0
                        : g.component) === I.TCF_OVERLAY) &&
                      (l(
                        {
                          options: t,
                          experience: o,
                          i18n: i,
                          fidesRegionString: n,
                          cookie: r,
                          savedConsent: d,
                        },
                        u
                      ),
                      b(t.debug, "Fides overlay is now showing!")),
                    yield Promise.resolve()
                  );
                } catch (u) {
                  return b(t.debug, u), Promise.reject(u);
                }
              });
            }
            return (
              document?.readyState !== "complete"
                ? (b(t.debug, "DOM not loaded, adding event listener"),
                  document.addEventListener("readystatechange", () =>
                    Qe(void 0, null, function* () {
                      document.readyState === "complete" &&
                        (b(t.debug, "DOM fully loaded and parsed"), yield a());
                    })
                  ))
                : yield a(),
              Promise.resolve()
            );
          }
        );
    var sr = (e, t, o) =>
      new Promise((i, n) => {
        var r = (a) => {
            try {
              l(o.next(a));
            } catch (c) {
              n(c);
            }
          },
          d = (a) => {
            try {
              l(o.throw(a));
            } catch (c) {
              n(c);
            }
          },
          l = (a) =>
            a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
        l((o = o.apply(e, t)).next());
      });
    const lr = (e) =>
      sr(void 0, [e], function* ({ options: t, experience: o }) {
        var i;
        if ((i = o?.gpp_settings) != null && i.enabled)
          try {
            yield import(`${t.fidesJsBaseUrl}/fides-ext-gpp.js`),
              b(t.debug, "Imported & executed GPP extension");
          } catch {
            b(t.debug, "Unable to import GPP extension");
          }
      });
    var et = (e, t, o) =>
      new Promise((i, n) => {
        var r = (a) => {
            try {
              l(o.next(a));
            } catch (c) {
              n(c);
            }
          },
          d = (a) => {
            try {
              l(o.throw(a));
            } catch (c) {
              n(c);
            }
          },
          l = (a) =>
            a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
        l((o = o.apply(e, t)).next());
      });
    const dr = (e, t) =>
        et(void 0, null, function* () {
          return (
            Re(e) ||
            Re(yield ro(t.isGeolocationEnabled, t.geolocationApiUrl, t.debug))
          );
        }),
      cr = (e) =>
        et(
          void 0,
          [e],
          function* ({
            savedConsent: t,
            effectiveExperience: o,
            cookie: i,
            fidesRegionString: n,
            fidesOptions: r,
            i18n: d,
          }) {
            if (
              !o ||
              !o.experience_config ||
              !o.privacy_notices ||
              o.privacy_notices.length === 0
            )
              return !1;
            const l = X();
            if (!l.globalPrivacyControl) return !1;
            const a = Jt(d, o.experience_config),
              c = a?.privacy_experience_config_history_id;
            let s = !1;
            const g = o.privacy_notices.map((u) => {
              const f = _e(u, t),
                p = Wt(d, u);
              return u.has_gpc_flag &&
                !f &&
                u.consent_mechanism !== M.NOTICE_ONLY
                ? ((s = !0),
                  new be(
                    u,
                    ae(!1, u.consent_mechanism),
                    p?.privacy_notice_history_id
                  ))
                : new be(
                    u,
                    ae(ze(u, l, t), u.consent_mechanism),
                    p?.privacy_notice_history_id
                  );
            });
            return s
              ? (yield co({
                  consentPreferencesToSave: g,
                  privacyExperienceConfigHistoryId: c,
                  experience: o,
                  consentMethod: q.GPC,
                  options: r,
                  userLocationString: n || void 0,
                  cookie: i,
                  updateCookie: (u) => Ye(u, g),
                }),
                !0)
              : !1;
          }
        ),
      fo = (e, t) => {
        const o = {};
        if (typeof window < "u") {
          const i = new URLSearchParams(window.location.search),
            n =
              t.options.customOptionsPath &&
              t.options.customOptionsPath.split("."),
            r = n && n.length >= 0 ? $t(n) : window.fides_overrides,
            d = Pt(e);
          d?.forEach(
            ({
              overrideName: l,
              overrideType: a,
              overrideKey: c,
              validationRegex: s,
            }) => {
              const g = i.get(c),
                u = r ? r[c] : void 0,
                f = Ve(c),
                p = g || u || f;
              p &&
                s.test(p.toString()) &&
                (o[l] = a === "string" ? p : JSON.parse(p.toString()));
            }
          );
        }
        return o;
      },
      pr = ({ consent: e, options: t }) => {
        const o = X(),
          i = Ut(e, o, t.debug);
        return Mt(i, t.debug);
      },
      ur = ({
        cookie: e,
        savedConsent: t,
        experience: o,
        geolocation: i,
        options: n,
        updateExperienceFromCookieConsent: r,
      }) => {
        if (zt(e) && !n.fidesString) return null;
        let d = o;
        return (
          se(o) && (d = r({ experience: o, cookie: e, debug: n.debug })),
          {
            consent: e.consent,
            fides_meta: e.fides_meta,
            identity: e.identity,
            experience: d,
            tcf_consent: e.tcf_consent,
            fides_string: e.fides_string,
            saved_consent: t,
            geolocation: i,
            options: n,
            initialized: !0,
          }
        );
      },
      fr = (e) =>
        et(
          void 0,
          [e],
          function* ({
            cookie: t,
            savedConsent: o,
            options: i,
            experience: n,
            geolocation: r,
            renderOverlay: d,
            updateExperience: l,
            overrides: a,
          }) {
            let c = i.isOverlayEnabled,
              s = n,
              g = null,
              u = () => De;
            if (c) {
              Et(i) ||
                (b(
                  i.debug,
                  "Invalid overlay options. Skipping overlay initialization.",
                  i
                ),
                (c = !1)),
                (g = yield dr(r, i));
              let f = !1;
              if (
                (g
                  ? se(s) ||
                    ((f = !0),
                    (s = yield to(g, i.fidesApiUrl, i.debug, i.apiOptions)))
                  : (b(
                      i.debug,
                      "User location could not be obtained. Skipping overlay initialization."
                    ),
                    (c = !1)),
                se(s) && Ot(s, i))
              ) {
                const p = l({
                  cookie: t,
                  experience: s,
                  debug: i.debug,
                  isExperienceClientSideFetched: f,
                });
                b(i.debug, "Updated experience from saved preferences", p),
                  Object.assign(s, p);
                const x = Vt({ cookie: t, experience: s });
                if (
                  (b(
                    i.debug,
                    "Updated current cookie state from experience",
                    x
                  ),
                  Object.assign(t, x),
                  c)
                ) {
                  const y = Bn();
                  Gn(
                    y,
                    window?.navigator,
                    s,
                    i,
                    a?.experienceTranslationOverrides
                  ),
                    (u = (m) =>
                      Vn(!!(m != null && m.disableLocalization), y, s)),
                    yield uo({
                      options: i,
                      experience: s,
                      i18n: y,
                      fidesRegionString: g,
                      cookie: t,
                      savedConsent: o,
                      renderOverlay: d,
                    }).catch(() => {}),
                    cr({
                      savedConsent: o,
                      effectiveExperience: s,
                      cookie: t,
                      fidesRegionString: g,
                      fidesOptions: i,
                      i18n: y,
                    });
                }
              }
            }
            return (
              yield lr({ options: i, experience: s }),
              {
                consent: t.consent,
                fides_meta: t.fides_meta,
                identity: t.identity,
                fides_string: t.fides_string,
                tcf_consent: t.tcf_consent,
                experience: s,
                saved_consent: o,
                geolocation: r,
                options: i,
                initialized: !0,
                getModalLinkLabel: u,
              }
            );
          }
        );
    var me,
      k,
      vo,
      Z,
      go,
      bo,
      tt,
      _o,
      he = {},
      yo = [],
      vr = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
      ot = Array.isArray;
    function H(e, t) {
      for (var o in t) e[o] = t[o];
      return e;
    }
    function mo(e) {
      var t = e.parentNode;
      t && t.removeChild(e);
    }
    function v(e, t, o) {
      var i,
        n,
        r,
        d = {};
      for (r in t)
        r == "key" ? (i = t[r]) : r == "ref" ? (n = t[r]) : (d[r] = t[r]);
      if (
        (arguments.length > 2 &&
          (d.children = arguments.length > 3 ? me.call(arguments, 2) : o),
        typeof e == "function" && e.defaultProps != null)
      )
        for (r in e.defaultProps) d[r] === void 0 && (d[r] = e.defaultProps[r]);
      return ke(e, d, i, n, null);
    }
    function ke(e, t, o, i, n) {
      var r = {
        type: e,
        props: t,
        key: o,
        ref: i,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: n ?? ++vo,
      };
      return n == null && k.vnode != null && k.vnode(r), r;
    }
    function Q(e) {
      return e.children;
    }
    function xe(e, t) {
      (this.props = e), (this.context = t);
    }
    function de(e, t) {
      if (t == null) return e.__ ? de(e.__, e.__.__k.indexOf(e) + 1) : null;
      for (var o; t < e.__k.length; t++)
        if ((o = e.__k[t]) != null && o.__e != null) return o.__e;
      return typeof e.type == "function" ? de(e) : null;
    }
    function ho(e) {
      var t, o;
      if ((e = e.__) != null && e.__c != null) {
        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
          if ((o = e.__k[t]) != null && o.__e != null) {
            e.__e = e.__c.base = o.__e;
            break;
          }
        return ho(e);
      }
    }
    function it(e) {
      ((!e.__d && (e.__d = !0) && Z.push(e) && !we.__r++) ||
        go !== k.debounceRendering) &&
        ((go = k.debounceRendering) || bo)(we);
    }
    function we() {
      var e, t, o, i, n, r, d, l;
      for (Z.sort(tt); (e = Z.shift()); )
        e.__d &&
          ((t = Z.length),
          (i = void 0),
          (n = void 0),
          (d = (r = (o = e).__v).__e),
          (l = o.__P) &&
            ((i = []),
            ((n = H({}, r)).__v = r.__v + 1),
            nt(
              l,
              r,
              n,
              o.__n,
              l.ownerSVGElement !== void 0,
              r.__h != null ? [d] : null,
              i,
              d ?? de(r),
              r.__h
            ),
            Ao(i, r),
            r.__e != d && ho(r)),
          Z.length > t && Z.sort(tt));
      we.__r = 0;
    }
    function ko(e, t, o, i, n, r, d, l, a, c) {
      var s,
        g,
        u,
        f,
        p,
        x,
        y,
        m = (i && i.__k) || yo,
        w = m.length;
      for (o.__k = [], s = 0; s < t.length; s++)
        if (
          (f = o.__k[s] =
            (f = t[s]) == null ||
            typeof f == "boolean" ||
            typeof f == "function"
              ? null
              : typeof f == "string" ||
                typeof f == "number" ||
                typeof f == "bigint"
              ? ke(null, f, null, null, f)
              : ot(f)
              ? ke(Q, { children: f }, null, null, null)
              : f.__b > 0
              ? ke(f.type, f.props, f.key, f.ref ? f.ref : null, f.__v)
              : f) != null
        ) {
          if (
            ((f.__ = o),
            (f.__b = o.__b + 1),
            (u = m[s]) === null || (u && f.key == u.key && f.type === u.type))
          )
            m[s] = void 0;
          else
            for (g = 0; g < w; g++) {
              if ((u = m[g]) && f.key == u.key && f.type === u.type) {
                m[g] = void 0;
                break;
              }
              u = null;
            }
          nt(e, f, (u = u || he), n, r, d, l, a, c),
            (p = f.__e),
            (g = f.ref) &&
              u.ref != g &&
              (y || (y = []),
              u.ref && y.push(u.ref, null, f),
              y.push(g, f.__c || p, f)),
            p != null
              ? (x == null && (x = p),
                typeof f.type == "function" && f.__k === u.__k
                  ? (f.__d = a = xo(f, a, e))
                  : (a = wo(e, f, u, m, p, a)),
                typeof o.type == "function" && (o.__d = a))
              : a && u.__e == a && a.parentNode != e && (a = de(u));
        }
      for (o.__e = x, s = w; s--; )
        m[s] != null &&
          (typeof o.type == "function" &&
            m[s].__e != null &&
            m[s].__e == o.__d &&
            (o.__d = Co(i).nextSibling),
          No(m[s], m[s]));
      if (y) for (s = 0; s < y.length; s++) $o(y[s], y[++s], y[++s]);
    }
    function xo(e, t, o) {
      for (var i, n = e.__k, r = 0; n && r < n.length; r++)
        (i = n[r]) &&
          ((i.__ = e),
          (t =
            typeof i.type == "function"
              ? xo(i, t, o)
              : wo(o, i, i, n, i.__e, t)));
      return t;
    }
    function wo(e, t, o, i, n, r) {
      var d, l, a;
      if (t.__d !== void 0) (d = t.__d), (t.__d = void 0);
      else if (o == null || n != r || n.parentNode == null)
        e: if (r == null || r.parentNode !== e) e.appendChild(n), (d = null);
        else {
          for (l = r, a = 0; (l = l.nextSibling) && a < i.length; a += 1)
            if (l == n) break e;
          e.insertBefore(n, r), (d = r);
        }
      return d !== void 0 ? d : n.nextSibling;
    }
    function Co(e) {
      var t, o, i;
      if (e.type == null || typeof e.type == "string") return e.__e;
      if (e.__k) {
        for (t = e.__k.length - 1; t >= 0; t--)
          if ((o = e.__k[t]) && (i = Co(o))) return i;
      }
      return null;
    }
    function gr(e, t, o, i, n) {
      var r;
      for (r in o)
        r === "children" || r === "key" || r in t || Ce(e, r, null, o[r], i);
      for (r in t)
        (n && typeof t[r] != "function") ||
          r === "children" ||
          r === "key" ||
          r === "value" ||
          r === "checked" ||
          o[r] === t[r] ||
          Ce(e, r, t[r], o[r], i);
    }
    function Eo(e, t, o) {
      t[0] === "-"
        ? e.setProperty(t, o ?? "")
        : (e[t] =
            o == null ? "" : typeof o != "number" || vr.test(t) ? o : o + "px");
    }
    function Ce(e, t, o, i, n) {
      var r;
      e: if (t === "style")
        if (typeof o == "string") e.style.cssText = o;
        else {
          if ((typeof i == "string" && (e.style.cssText = i = ""), i))
            for (t in i) (o && t in o) || Eo(e.style, t, "");
          if (o) for (t in o) (i && o[t] === i[t]) || Eo(e.style, t, o[t]);
        }
      else if (t[0] === "o" && t[1] === "n")
        (r = t !== (t = t.replace(/Capture$/, ""))),
          (t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2)),
          e.l || (e.l = {}),
          (e.l[t + r] = o),
          o
            ? i || e.addEventListener(t, r ? Oo : Po, r)
            : e.removeEventListener(t, r ? Oo : Po, r);
      else if (t !== "dangerouslySetInnerHTML") {
        if (n) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if (
          t !== "width" &&
          t !== "height" &&
          t !== "href" &&
          t !== "list" &&
          t !== "form" &&
          t !== "tabIndex" &&
          t !== "download" &&
          t !== "rowSpan" &&
          t !== "colSpan" &&
          t in e
        )
          try {
            e[t] = o ?? "";
            break e;
          } catch {}
        typeof o == "function" ||
          (o == null || (o === !1 && t[4] !== "-")
            ? e.removeAttribute(t)
            : e.setAttribute(t, o));
      }
    }
    function Po(e) {
      return this.l[e.type + !1](k.event ? k.event(e) : e);
    }
    function Oo(e) {
      return this.l[e.type + !0](k.event ? k.event(e) : e);
    }
    function nt(e, t, o, i, n, r, d, l, a) {
      var c,
        s,
        g,
        u,
        f,
        p,
        x,
        y,
        m,
        w,
        A,
        N,
        O,
        z,
        h,
        C = t.type;
      if (t.constructor !== void 0) return null;
      o.__h != null &&
        ((a = o.__h), (l = t.__e = o.__e), (t.__h = null), (r = [l])),
        (c = k.__b) && c(t);
      try {
        e: if (typeof C == "function") {
          if (
            ((y = t.props),
            (m = (c = C.contextType) && i[c.__c]),
            (w = c ? (m ? m.props.value : c.__) : i),
            o.__c
              ? (x = (s = t.__c = o.__c).__ = s.__E)
              : ("prototype" in C && C.prototype.render
                  ? (t.__c = s = new C(y, w))
                  : ((t.__c = s = new xe(y, w)),
                    (s.constructor = C),
                    (s.render = _r)),
                m && m.sub(s),
                (s.props = y),
                s.state || (s.state = {}),
                (s.context = w),
                (s.__n = i),
                (g = s.__d = !0),
                (s.__h = []),
                (s._sb = [])),
            s.__s == null && (s.__s = s.state),
            C.getDerivedStateFromProps != null &&
              (s.__s == s.state && (s.__s = H({}, s.__s)),
              H(s.__s, C.getDerivedStateFromProps(y, s.__s))),
            (u = s.props),
            (f = s.state),
            (s.__v = t),
            g)
          )
            C.getDerivedStateFromProps == null &&
              s.componentWillMount != null &&
              s.componentWillMount(),
              s.componentDidMount != null && s.__h.push(s.componentDidMount);
          else {
            if (
              (C.getDerivedStateFromProps == null &&
                y !== u &&
                s.componentWillReceiveProps != null &&
                s.componentWillReceiveProps(y, w),
              (!s.__e &&
                s.shouldComponentUpdate != null &&
                s.shouldComponentUpdate(y, s.__s, w) === !1) ||
                t.__v === o.__v)
            ) {
              for (
                t.__v !== o.__v &&
                  ((s.props = y), (s.state = s.__s), (s.__d = !1)),
                  s.__e = !1,
                  t.__e = o.__e,
                  t.__k = o.__k,
                  t.__k.forEach(function (E) {
                    E && (E.__ = t);
                  }),
                  A = 0;
                A < s._sb.length;
                A++
              )
                s.__h.push(s._sb[A]);
              (s._sb = []), s.__h.length && d.push(s);
              break e;
            }
            s.componentWillUpdate != null && s.componentWillUpdate(y, s.__s, w),
              s.componentDidUpdate != null &&
                s.__h.push(function () {
                  s.componentDidUpdate(u, f, p);
                });
          }
          if (
            ((s.context = w),
            (s.props = y),
            (s.__P = e),
            (N = k.__r),
            (O = 0),
            "prototype" in C && C.prototype.render)
          ) {
            for (
              s.state = s.__s,
                s.__d = !1,
                N && N(t),
                c = s.render(s.props, s.state, s.context),
                z = 0;
              z < s._sb.length;
              z++
            )
              s.__h.push(s._sb[z]);
            s._sb = [];
          } else
            do
              (s.__d = !1),
                N && N(t),
                (c = s.render(s.props, s.state, s.context)),
                (s.state = s.__s);
            while (s.__d && ++O < 25);
          (s.state = s.__s),
            s.getChildContext != null && (i = H(H({}, i), s.getChildContext())),
            g ||
              s.getSnapshotBeforeUpdate == null ||
              (p = s.getSnapshotBeforeUpdate(u, f)),
            ko(
              e,
              ot(
                (h =
                  c != null && c.type === Q && c.key == null
                    ? c.props.children
                    : c)
              )
                ? h
                : [h],
              t,
              o,
              i,
              n,
              r,
              d,
              l,
              a
            ),
            (s.base = t.__e),
            (t.__h = null),
            s.__h.length && d.push(s),
            x && (s.__E = s.__ = null),
            (s.__e = !1);
        } else r == null && t.__v === o.__v ? ((t.__k = o.__k), (t.__e = o.__e)) : (t.__e = br(o.__e, t, o, i, n, r, d, a));
        (c = k.diffed) && c(t);
      } catch (E) {
        (t.__v = null),
          (a || r != null) &&
            ((t.__e = l), (t.__h = !!a), (r[r.indexOf(l)] = null)),
          k.__e(E, t, o);
      }
    }
    function Ao(e, t) {
      k.__c && k.__c(t, e),
        e.some(function (o) {
          try {
            (e = o.__h),
              (o.__h = []),
              e.some(function (i) {
                i.call(o);
              });
          } catch (i) {
            k.__e(i, o.__v);
          }
        });
    }
    function br(e, t, o, i, n, r, d, l) {
      var a,
        c,
        s,
        g = o.props,
        u = t.props,
        f = t.type,
        p = 0;
      if ((f === "svg" && (n = !0), r != null)) {
        for (; p < r.length; p++)
          if (
            (a = r[p]) &&
            "setAttribute" in a == !!f &&
            (f ? a.localName === f : a.nodeType === 3)
          ) {
            (e = a), (r[p] = null);
            break;
          }
      }
      if (e == null) {
        if (f === null) return document.createTextNode(u);
        (e = n
          ? document.createElementNS("http://www.w3.org/2000/svg", f)
          : document.createElement(f, u.is && u)),
          (r = null),
          (l = !1);
      }
      if (f === null) g === u || (l && e.data === u) || (e.data = u);
      else {
        if (
          ((r = r && me.call(e.childNodes)),
          (c = (g = o.props || he).dangerouslySetInnerHTML),
          (s = u.dangerouslySetInnerHTML),
          !l)
        ) {
          if (r != null)
            for (g = {}, p = 0; p < e.attributes.length; p++)
              g[e.attributes[p].name] = e.attributes[p].value;
          (s || c) &&
            ((s && ((c && s.__html == c.__html) || s.__html === e.innerHTML)) ||
              (e.innerHTML = (s && s.__html) || ""));
        }
        if ((gr(e, u, g, n, l), s)) t.__k = [];
        else if (
          (ko(
            e,
            ot((p = t.props.children)) ? p : [p],
            t,
            o,
            i,
            n && f !== "foreignObject",
            r,
            d,
            r ? r[0] : o.__k && de(o, 0),
            l
          ),
          r != null)
        )
          for (p = r.length; p--; ) r[p] != null && mo(r[p]);
        l ||
          ("value" in u &&
            (p = u.value) !== void 0 &&
            (p !== e.value ||
              (f === "progress" && !p) ||
              (f === "option" && p !== g.value)) &&
            Ce(e, "value", p, g.value, !1),
          "checked" in u &&
            (p = u.checked) !== void 0 &&
            p !== e.checked &&
            Ce(e, "checked", p, g.checked, !1));
      }
      return e;
    }
    function $o(e, t, o) {
      try {
        typeof e == "function" ? e(t) : (e.current = t);
      } catch (i) {
        k.__e(i, o);
      }
    }
    function No(e, t, o) {
      var i, n;
      if (
        (k.unmount && k.unmount(e),
        (i = e.ref) && ((i.current && i.current !== e.__e) || $o(i, null, t)),
        (i = e.__c) != null)
      ) {
        if (i.componentWillUnmount)
          try {
            i.componentWillUnmount();
          } catch (r) {
            k.__e(r, t);
          }
        (i.base = i.__P = null), (e.__c = void 0);
      }
      if ((i = e.__k))
        for (n = 0; n < i.length; n++)
          i[n] && No(i[n], t, o || typeof e.type != "function");
      o || e.__e == null || mo(e.__e), (e.__ = e.__e = e.__d = void 0);
    }
    function _r(e, t, o) {
      return this.constructor(e, o);
    }
    function yr(e, t, o) {
      var i, n, r;
      k.__ && k.__(e, t),
        (n = (i = typeof o == "function") ? null : (o && o.__k) || t.__k),
        (r = []),
        nt(
          t,
          (e = ((!i && o) || t).__k = v(Q, null, [e])),
          n || he,
          he,
          t.ownerSVGElement !== void 0,
          !i && o
            ? [o]
            : n
            ? null
            : t.firstChild
            ? me.call(t.childNodes)
            : null,
          r,
          !i && o ? o : n ? n.__e : t.firstChild,
          i
        ),
        Ao(r, e);
    }
    function mr(e, t) {
      var o = {
        __c: (t = "__cC" + _o++),
        __: e,
        Consumer: function (i, n) {
          return i.children(n);
        },
        Provider: function (i) {
          var n, r;
          return (
            this.getChildContext ||
              ((n = []),
              ((r = {})[t] = this),
              (this.getChildContext = function () {
                return r;
              }),
              (this.shouldComponentUpdate = function (d) {
                this.props.value !== d.value &&
                  n.some(function (l) {
                    (l.__e = !0), it(l);
                  });
              }),
              (this.sub = function (d) {
                n.push(d);
                var l = d.componentWillUnmount;
                d.componentWillUnmount = function () {
                  n.splice(n.indexOf(d), 1), l && l.call(d);
                };
              })),
            i.children
          );
        },
      };
      return (o.Provider.__ = o.Consumer.contextType = o);
    }
    (me = yo.slice),
      (k = {
        __e: function (e, t, o, i) {
          for (var n, r, d; (t = t.__); )
            if ((n = t.__c) && !n.__)
              try {
                if (
                  ((r = n.constructor) &&
                    r.getDerivedStateFromError != null &&
                    (n.setState(r.getDerivedStateFromError(e)), (d = n.__d)),
                  n.componentDidCatch != null &&
                    (n.componentDidCatch(e, i || {}), (d = n.__d)),
                  d)
                )
                  return (n.__E = n);
              } catch (l) {
                e = l;
              }
          throw e;
        },
      }),
      (vo = 0),
      (xe.prototype.setState = function (e, t) {
        var o;
        (o =
          this.__s != null && this.__s !== this.state
            ? this.__s
            : (this.__s = H({}, this.state))),
          typeof e == "function" && (e = e(H({}, o), this.props)),
          e && H(o, e),
          e != null && this.__v && (t && this._sb.push(t), it(this));
      }),
      (xe.prototype.forceUpdate = function (e) {
        this.__v && ((this.__e = !0), e && this.__h.push(e), it(this));
      }),
      (xe.prototype.render = Q),
      (Z = []),
      (bo =
        typeof Promise == "function"
          ? Promise.prototype.then.bind(Promise.resolve())
          : setTimeout),
      (tt = function (e, t) {
        return e.__v.__b - t.__v.__b;
      }),
      (we.__r = 0),
      (_o = 0);
    var ie,
      P,
      rt,
      To,
      ce = 0,
      Io = [],
      Ee = [],
      So = k.__b,
      jo = k.__r,
      Lo = k.diffed,
      Fo = k.__c,
      zo = k.unmount;
    function Pe(e, t) {
      k.__h && k.__h(P, e, ce || t), (ce = 0);
      var o = P.__H || (P.__H = { __: [], __h: [] });
      return e >= o.__.length && o.__.push({ __V: Ee }), o.__[e];
    }
    function K(e) {
      return (ce = 1), hr(Ro, e);
    }
    function hr(e, t, o) {
      var i = Pe(ie++, 2);
      if (
        ((i.t = e),
        !i.__c &&
          ((i.__ = [
            o ? o(t) : Ro(void 0, t),
            function (l) {
              var a = i.__N ? i.__N[0] : i.__[0],
                c = i.t(a, l);
              a !== c && ((i.__N = [c, i.__[1]]), i.__c.setState({}));
            },
          ]),
          (i.__c = P),
          !P.u))
      ) {
        var n = function (l, a, c) {
          if (!i.__c.__H) return !0;
          var s = i.__c.__H.__.filter(function (u) {
            return u.__c;
          });
          if (
            s.every(function (u) {
              return !u.__N;
            })
          )
            return !r || r.call(this, l, a, c);
          var g = !1;
          return (
            s.forEach(function (u) {
              if (u.__N) {
                var f = u.__[0];
                (u.__ = u.__N), (u.__N = void 0), f !== u.__[0] && (g = !0);
              }
            }),
            !(!g && i.__c.props === l) && (!r || r.call(this, l, a, c))
          );
        };
        P.u = !0;
        var r = P.shouldComponentUpdate,
          d = P.componentWillUpdate;
        (P.componentWillUpdate = function (l, a, c) {
          if (this.__e) {
            var s = r;
            (r = void 0), n(l, a, c), (r = s);
          }
          d && d.call(this, l, a, c);
        }),
          (P.shouldComponentUpdate = n);
      }
      return i.__N || i.__;
    }
    function D(e, t) {
      var o = Pe(ie++, 3);
      !k.__s && Mo(o.__H, t) && ((o.__ = e), (o.i = t), P.__H.__h.push(o));
    }
    function kr(e) {
      return (
        (ce = 5),
        ne(function () {
          return { current: e };
        }, [])
      );
    }
    function ne(e, t) {
      var o = Pe(ie++, 7);
      return Mo(o.__H, t)
        ? ((o.__V = e()), (o.i = t), (o.__h = e), o.__V)
        : o.__;
    }
    function S(e, t) {
      return (
        (ce = 8),
        ne(function () {
          return e;
        }, t)
      );
    }
    function xr(e) {
      var t = P.context[e.__c],
        o = Pe(ie++, 9);
      return (
        (o.c = e),
        t ? (o.__ == null && ((o.__ = !0), t.sub(P)), t.props.value) : e.__
      );
    }
    function wr() {
      for (var e; (e = Io.shift()); )
        if (e.__P && e.__H)
          try {
            e.__H.__h.forEach(Oe), e.__H.__h.forEach(at), (e.__H.__h = []);
          } catch (t) {
            (e.__H.__h = []), k.__e(t, e.__v);
          }
    }
    (k.__b = function (e) {
      (P = null), So && So(e);
    }),
      (k.__r = function (e) {
        jo && jo(e), (ie = 0);
        var t = (P = e.__c).__H;
        t &&
          (rt === P
            ? ((t.__h = []),
              (P.__h = []),
              t.__.forEach(function (o) {
                o.__N && (o.__ = o.__N), (o.__V = Ee), (o.__N = o.i = void 0);
              }))
            : (t.__h.forEach(Oe), t.__h.forEach(at), (t.__h = []), (ie = 0))),
          (rt = P);
      }),
      (k.diffed = function (e) {
        Lo && Lo(e);
        var t = e.__c;
        t &&
          t.__H &&
          (t.__H.__h.length &&
            ((Io.push(t) !== 1 && To === k.requestAnimationFrame) ||
              ((To = k.requestAnimationFrame) || Cr)(wr)),
          t.__H.__.forEach(function (o) {
            o.i && (o.__H = o.i),
              o.__V !== Ee && (o.__ = o.__V),
              (o.i = void 0),
              (o.__V = Ee);
          })),
          (rt = P = null);
      }),
      (k.__c = function (e, t) {
        t.some(function (o) {
          try {
            o.__h.forEach(Oe),
              (o.__h = o.__h.filter(function (i) {
                return !i.__ || at(i);
              }));
          } catch (i) {
            t.some(function (n) {
              n.__h && (n.__h = []);
            }),
              (t = []),
              k.__e(i, o.__v);
          }
        }),
          Fo && Fo(e, t);
      }),
      (k.unmount = function (e) {
        zo && zo(e);
        var t,
          o = e.__c;
        o &&
          o.__H &&
          (o.__H.__.forEach(function (i) {
            try {
              Oe(i);
            } catch (n) {
              t = n;
            }
          }),
          (o.__H = void 0),
          t && k.__e(t, o.__v));
      });
    var Do = typeof requestAnimationFrame == "function";
    function Cr(e) {
      var t,
        o = function () {
          clearTimeout(i), Do && cancelAnimationFrame(t), setTimeout(e);
        },
        i = setTimeout(o, 100);
      Do && (t = requestAnimationFrame(o));
    }
    function Oe(e) {
      var t = P,
        o = e.__c;
      typeof o == "function" && ((e.__c = void 0), o()), (P = t);
    }
    function at(e) {
      var t = P;
      (e.__c = e.__()), (P = t);
    }
    function Mo(e, t) {
      return (
        !e ||
        e.length !== t.length ||
        t.some(function (o, i) {
          return o !== e[i];
        })
      );
    }
    function Ro(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    const Uo = mr({}),
      Er = ({ children: e }) => {
        const [t, o] = K(),
          i = ne(() => ({ currentLocale: t, setCurrentLocale: o }), [t]);
        return v(Uo.Provider, { value: i }, e);
      },
      Go = () => {
        const e = xr(Uo);
        if (!e) throw new Error("useI18n must be used within a I18nProvider");
        return e;
      };
    function Pr(e, t) {
      t === void 0 && (t = {});
      var o = t.insertAt;
      if (!(!e || typeof document > "u")) {
        var i = document.head || document.getElementsByTagName("head")[0],
          n = document.createElement("style");
        (n.type = "text/css"),
          o === "top" && i.firstChild
            ? i.insertBefore(n, i.firstChild)
            : i.appendChild(n),
          n.styleSheet
            ? (n.styleSheet.cssText = e)
            : n.appendChild(document.createTextNode(e));
      }
    }
    var Or = `:root{--fides-overlay-primary-color:#8243f2;--fides-overlay-background-color:#f7fafc;--fides-overlay-embed-background-color:transparent;--fides-overlay-font-color:#4a5568;--fides-overlay-font-color-dark:#2d3748;--fides-overlay-hover-color:#edf2f7;--fides-overlay-gpc-applied-background-color:#38a169;--fides-overlay-gpc-applied-text-color:#fff;--fides-overlay-gpc-overridden-background-color:#e53e3e;--fides-overlay-gpc-overridden-text-color:#fff;--fides-overlay-background-dark-color:#e2e8f0;--fides-overlay-width:680px;--fides-overlay-primary-button-background-color:var(
    --fides-overlay-primary-color
  );--fides-overlay-primary-button-background-hover-color:#9569f4;--fides-overlay-primary-button-text-color:#fff;--fides-overlay-primary-button-border-color:transparent;--fides-overlay-secondary-button-background-color:var(
    --fides-overlay-background-color
  );--fides-overlay-secondary-button-background-hover-color:var(
    --fides-overlay-hover-color
  );--fides-overlay-secondary-button-text-color:#2d3748;--fides-overlay-secondary-button-border-color:var(
    --fides-overlay-primary-color
  );--fides-overlay-title-font-color:var(--fides-overlay-font-color);--fides-overlay-body-font-color:var(--fides-overlay-font-color);--fides-overlay-link-font-color:var(--fides-overlay-font-color-dark);--fides-overlay-primary-active-color:var(--fides-overlay-primary-color);--fides-overlay-primary-active-disabled-color:#bda4f7;--fides-overlay-inactive-color:#e2e8f0;--fides-overlay-inactive-font-color:#a0aec0;--fides-overlay-disabled-color:#e1e7ee;--fides-overlay-row-divider-color:#e2e8f0;--fides-overlay-row-hover-color:var(--fides-overlay-hover-color);--fides-overlay-badge-background-color:#718096;--fides-overlay-badge-border-radius:4px;--fides-overlay-select-border-color:#e2e8f0;--fides-overlay-font-family:Inter,sans-serif;--12px:0.75rem;--14px:0.875rem;--15px:0.9375rem;--16px:1rem;--fides-overlay-font-size-body-small:var(--12px);--fides-overlay-font-size-body:var(--14px);--fides-overlay-font-size-title:var(--16px);--fides-overlay-font-size-buttons:var(--14px);--fides-overlay-padding:24px;--fides-overlay-button-border-radius:6px;--fides-overlay-button-padding:8px 16px;--fides-overlay-container-border-radius:12px;--fides-overlay-component-border-radius:4px;--fides-overlay-banner-offset:48px;--fides-banner-font-size-title:var(--16px)}div#fides-overlay{-webkit-font-smoothing:antialiased;font-family:var(--fides-overlay-font-family);font-size:var(--fides-overlay-font-size-body);line-height:calc(1em + .4rem);position:fixed;white-space:pre-line;z-index:1000}#fides-modal-link{cursor:pointer;display:none}#fides-modal-link.fides-modal-link-shown{display:inline}div#fides-banner-container{display:flex;justify-content:center;position:fixed;transform:translateY(0);transition:transform 1s,visibility 1s;visibility:visible;width:100%;z-index:1}div#fides-banner{align-items:center;background:var(--fides-overlay-background-color);border-top:1px solid var(--fides-overlay-primary-color);box-sizing:border-box;color:var(--fides-overlay-body-font-color);display:flex;flex-direction:row;flex-wrap:wrap;font-size:var(--fides-overlay-font-size-body);justify-content:space-between;overflow-y:hidden;padding:24px;position:relative}div#fides-banner-inner{width:100%}div#fides-banner-container.fides-banner-bottom{bottom:0;left:0}div#fides-banner-container.fides-banner-bottom.fides-banner-hidden{transform:translateY(150%);visibility:hidden}div#fides-banner-container.fides-banner-top{left:0;top:0}div#fides-banner-container.fides-banner-top.fides-banner-hidden{transform:translateY(-150%);visibility:hidden}div#fides-banner-inner div#fides-button-group{align-items:center;margin-bottom:0;margin-top:0;padding-bottom:0;padding-top:0;width:100%}div#fides-banner-inner-container{grid-column-gap:60px;display:grid;grid-template-columns:1fr 1fr;.fides-acknowledge-button-container{margin-bottom:0}}div#fides-banner-inner-description{grid-column:1;grid-row:1}div#fides-tcf-banner-inner{grid-column:2;grid-row:1/3;height:0;margin-top:40px;min-height:100%;overflow-y:auto;scrollbar-gutter:stable}div#fides-banner-heading{align-items:center;display:flex;margin-right:13px}div#fides-banner-title{color:var(--fides-overlay-title-font-color);flex:1;font-size:var(--fides-banner-font-size-title);font-weight:600;line-height:1.5em;min-width:33%}div#fides-banner-description{flex:1;font-size:var(--fides-overlay-font-size-body);margin-bottom:24px;margin-top:16px}div.fides-html-description{white-space:normal}div#fides-button-group{background-color:var(--fides-overlay-background-color);display:flex;justify-content:space-between;margin-bottom:var(--fides-overlay-padding);margin-top:8px;z-index:5}div.fides-acknowledge-button-container{display:flex;justify-content:end;margin-inline:var(--fides-overlay-padding);margin-bottom:var(--fides-overlay-padding)}div.fides-banner-acknowledge .fides-banner-button{max-width:168px}button.fides-banner-button{background:var(--fides-overlay-primary-button-background-color);border:1px solid;border-radius:var(--fides-overlay-button-border-radius);color:var(--fides-overlay-primary-button-text-color);cursor:pointer;display:inline-block;flex:auto;font-family:var(--fides-overlay-font-family);font-size:var(--fides-overlay-font-size-buttons);font-weight:600;margin:4px 0 0;padding:var(--fides-overlay-button-padding);text-align:center;text-decoration:none}button.fides-banner-button:hover{background:var(--fides-overlay-primary-button-background-hover-color)}button.fides-banner-button.fides-banner-button-primary{background:var(--fides-overlay-primary-button-background-color);border:none;color:var(--fides-overlay-primary-button-text-color)}button.fides-banner-button.fides-banner-button-primary:hover{background:var(--fides-overlay-primary-button-background-hover-color)}button.fides-banner-button.fides-banner-button-secondary{background:var(--fides-overlay-secondary-button-background-color);border:1px solid var(--fides-overlay-primary-button-background-color);color:var(--fides-overlay-secondary-button-text-color)}button.fides-banner-button.fides-banner-button-secondary:hover{background:var(--fides-overlay-secondary-button-background-hover-color)}button.fides-banner-button.fides-banner-button-tertiary{background:none;border:none;color:var(--fides-overlay-link-font-color);cursor:pointer;font-size:var(--fides-overlay-font-size-body);font-weight:500;line-height:1.25em;padding:0;text-decoration:underline}div.fides-modal-content{background-color:var(--fides-overlay-background-color);border:1px solid var(--fides-overlay-primary-color);border-radius:var(--fides-overlay-container-border-radius);box-sizing:border-box;color:var(--fides-overlay-body-font-color);display:flex;flex-direction:column;font-family:var(--fides-overlay-font-family);font-size:var(--fides-overlay-font-size-body);left:50%;max-height:680px;overflow:hidden;padding:0;position:fixed;top:50%;transform:translate(-50%,-50%);width:var(--fides-overlay-width);z-index:2}.fides-modal-container,.fides-modal-overlay{background-color:rgba(0,0,0,.25);bottom:0;left:0;position:fixed;right:0;top:0}div#fides-embed-container div#fides-consent-content .fides-modal-footer{position:inherit}div#fides-embed-container .fides-modal-body{padding-top:16px}div#fides-embed-container div#fides-consent-content{background-color:var(--fides-overlay-background-color);border:none;border-radius:var(--fides-overlay-container-border-radius);border-bottom-left-radius:0;border-bottom-right-radius:0;box-sizing:border-box;color:var(--fides-overlay-body-font-color);display:flex;flex-direction:column;font-family:var(--fides-overlay-font-family);font-size:var(--fides-overlay-font-size-body);left:50%;max-height:none;overflow:hidden;padding:0;position:static;top:50%;transform:none;width:var(--fides-overlay-width)}.fides-modal-container{display:flex;z-index:2}.fides-modal-container[aria-hidden=true]{display:none}div#fides-modal .fides-modal-header{display:flex;justify-content:end}div#fides-consent-content{overflow:auto;scrollbar-gutter:stable}div#fides-consent-content .fides-modal-title{color:var(--fides-overlay-title-font-color);font-size:var(--fides-overlay-font-size-title);font-weight:600;margin:0;text-align:center}div#fides-consent-content .fides-modal-body{height:100%;overflow-y:auto;padding-inline:var(--fides-overlay-padding)}.fides-modal-footer{background-color:var(--fides-overlay-background-color);border-bottom-left-radius:var(--fides-overlay-component-border-radius);border-bottom-right-radius:var(--fides-overlay-component-border-radius);bottom:0;display:flex;flex-direction:column;width:var(--fides-overlay-width);z-index:5}div#fides-consent-content .fides-modal-description{margin:8px 0 24px}.fides-banner-button-group{align-items:center;display:flex;gap:12px}.fides-modal-button-group{display:flex;flex-direction:row;gap:12px;margin-inline:var(--fides-overlay-padding);width:100%}.fides-tcf-banner-container div#fides-banner div#fides-banner-inner div#fides-button-group{gap:12px}.fides-no-scroll{overflow-y:hidden}@media (max-width:48em){div#fides-consent-content,div.fides-modal-content{width:100%!important}.fides-modal-button-group{flex-direction:column}button.fides-banner-button{margin:0 8px 12px 0}}div#fides-banner .fides-close-button{background:none;border:none;cursor:pointer;display:flex;position:absolute;right:3px;top:8px}.fides-modal-header .fides-close-button{background:none;border:none;cursor:pointer;padding-right:8px;padding-top:8px}.fides-close-button:hover{background:var(--fides-overlay-hover-color)}.fides-modal-notices{margin-bottom:16px}div#fides-banner-inner .fides-privacy-policy{margin-bottom:0}.fides-privacy-policy,div#fides-banner-inner .fides-privacy-policy{color:var(--fides-overlay-primary-color);display:block;text-align:center}.fides-privacy-policy{font-family:var(--fides-overlay-font-family);margin-bottom:var(--fides-overlay-padding)}@media (prefers-reduced-motion:reduce){.fides-toggle-display{transition-duration:0ms}}.fides-toggle{align-items:center;display:inline-flex;flex-wrap:wrap;gap:1ch;position:relative}.fides-toggle .fides-toggle-input{cursor:pointer;height:100%;opacity:0;position:absolute;width:100%;z-index:4}.fides-toggle .fides-toggle-display{--offset:4px;--diameter:16px;align-items:center;background-color:var(--fides-overlay-inactive-color);border-radius:100vw;box-sizing:content-box;color:var(--fides-overlay-inactive-font-color);display:inline-flex!important;height:24px;justify-content:space-around;justify-content:end;padding-inline:8px;position:relative;transition:.25s;width:34px}.fides-toggle .fides-toggle-display:before{background-color:#fff;border-radius:50%;box-shadow:0 1.3px 2.7px rgba(0,0,0,.25);box-sizing:border-box;content:"";height:var(--diameter);left:var(--offset);position:absolute;top:50%;transform:translateY(-50%);transition:inherit;width:var(--diameter);z-index:3}.fides-toggle .fides-toggle-input:checked+.fides-toggle-display{background-color:var(--fides-overlay-primary-active-color);color:var(--fides-overlay-primary-button-text-color);justify-content:start}.fides-toggle .fides-toggle-input:checked+.fides-toggle-display:before{transform:translate(26px,-50%)}.fides-toggle .fides-toggle-input:disabled{cursor:not-allowed}.fides-toggle .fides-toggle-input:disabled+.fides-toggle-display{background-color:var(--fides-overlay-disabled-color)}.fides-toggle .fides-toggle-input:disabled:checked+.fides-toggle-display{background-color:var(--fides-overlay-primary-active-disabled-color)}.fides-toggle .fides-toggle-input:focus+.fides-toggle-display{outline:1px auto Highlight;outline:1px auto -webkit-focus-ring-color}.fides-toggle .fides-toggle-input:focus:not(:focus-visible)+.fides-toggle-display{outline:0}.fides-divider{border-color:var(--fides-overlay-row-divider-color);border-width:0 0 1px;margin:0}.fides-disclosure-hidden{display:flex;height:0;margin-bottom:0;margin-top:0;overflow:hidden;visibility:hidden}.fides-notice-toggle .fides-notice-toggle-title{align-items:center;border-bottom:1px solid var(--fides-overlay-row-divider-color);display:flex;justify-content:space-between;padding-inline:12px 12px}.fides-notice-toggle .fides-notice-toggle-trigger{align-items:center;display:flex;justify-content:space-between;min-height:40px;width:100%}.fides-notice-toggle .fides-notice-toggle-trigger svg{flex-shrink:0}.fides-notice-toggle .fides-notice-toggle-title:hover{background-color:var(--fides-overlay-row-hover-color);cursor:pointer}#fides-tcf-banner-inner .fides-disclosure-visible{padding:12px}.fides-notice-toggle .fides-disclosure-visible{display:flex;flex-direction:column;gap:12px;overflow:auto;padding:12px}.fides-notice-toggle p{margin:0 0 18px}.fides-notice-toggle p:last-child{margin:0}.fides-notice-toggle-title .fides-flex-center{align-items:center;display:flex;white-space:wrap;width:100%}.fides-notice-toggle-expanded{background-color:var(--fides-overlay-row-hover-color)}.fides-notice-toggle-header{font-weight:600}.fides-record-header{border-bottom:1px solid var(--fides-overlay-row-divider-color);font-weight:600;padding:12px}.fides-gpc-banner{border:1px solid var(--fides-overlay-primary-color);border-radius:var(--fides-overlay-component-border-radius);display:flex;margin-bottom:16px;padding:18px}.fides-gpc-banner p{margin:0}.fides-gpc-warning{color:var(--fides-overlay-primary-color);margin-right:8px}.fides-gpc-header{font-weight:700}.fides-gpc-label{font-size:var(--fides-overlay-font-size-body);font-weight:600;padding:0 8px;white-space:nowrap}.fides-gpc-badge{border-radius:var(--fides-overlay-badge-border-radius);font-weight:700;padding:0 4px;text-transform:uppercase}.fides-gpc-badge-applied,.fides-gpc-badge-detected{background:var(--fides-overlay-gpc-applied-background-color);color:var(--fides-overlay-gpc-applied-text-color)}.fides-gpc-badge-overridden{background:var(--fides-overlay-gpc-overridden-background-color);color:var(--fides-overlay-gpc-overridden-text-color)}.fides-tab-list{display:flex;list-style-type:none;padding:0}.fides-tab-list>li{width:100%}.fides-tab-button{background:none;border-width:0 0 1px;border-bottom:1px solid var(--fides-overlay-row-divider-color);color:var(--fides-overlay-body-font-color);cursor:pointer;font-weight:500;padding:10px 20px;width:100%}.fides-tab-button[aria-selected=true]{border-bottom-width:2px;border-color:var(--fides-overlay-primary-active-color);color:var(--fides-overlay-primary-active-color);font-weight:600}.fides-tab-button::focus-visible{outline:1px auto Highlight;outline:1px auto -webkit-focus-ring-color}.fides-tab-button:focus:not(:focus-visible){outline:0}.fides-notice-badge{align-items:center;background:var(--fides-overlay-badge-background-color);border-radius:var(--fides-overlay-badge-border-radius);color:#fff;display:inline-flex;font-size:var(--fides-overlay-font-size-body-small);font-weight:600;height:18px;margin-right:8px;padding:0 4px;text-transform:uppercase}.fides-background-dark{background-color:var(--fides-overlay-background-dark-color)}.fides-radio-button-group{background-color:var(
    --fides-overlay-secondary-button-background-hover-color
  );border:1px solid var(--fides-overlay-row-divider-color);display:flex;margin-bottom:22px;padding:4px}.fides-radio-button{background-color:transparent;border:none;cursor:pointer;flex:1;padding:5px 16px}.fides-radio-button[aria-checked=true]{background-color:var(--fides-overlay-primary-button-background-color);color:var(--fides-overlay-primary-button-text-color)}.fides-flex-center{align-items:center;display:flex}.fides-margin-right{margin-right:3px}.fides-justify-space-between{justify-content:space-between}.fides-tcf-toggle-content{font-size:var(--fides-overlay-font-size-body-small);font-weight:400;margin-right:60px}.fides-tcf-purpose-vendor-title{display:flex;font-weight:600;justify-content:space-between}.fides-tcf-illustration{font-size:var(--fides-overlay-font-size-body-small);padding:13px 60px 13px 13px}.fides-tcf-illustration,.fides-tcf-purpose-vendor{border-radius:var(--fides-overlay-component-border-radius)}.fides-tcf-purpose-vendor{padding:13px}.fides-tcf-purpose-vendor-list{font-weight:400;list-style:none;margin-bottom:0;margin-left:0;padding-left:0}.fides-tcf-vendor-toggles{display:flex}.fides-vendor-details-table{width:100%}.fides-vendor-details-table td,.fides-vendor-details-table th{font-size:var(--fides-overlay-font-size-body-small);text-align:left}.fides-vendor-details-table td{border-bottom:1px solid var(--fides-overlay-row-divider-color)}.fides-link-button{background:none;border:none;color:var(--fides-overlay-body-font-color);cursor:pointer;padding:0;text-decoration:underline}.fides-external-link,.fides-primary-text-color{color:var(--fides-overlay-primary-color)}.fides-external-link{font-size:var(--fides-overlay-font-size-body-small);font-weight:500;margin-right:16px}.fides-vendor-info-banner{border-radius:var(--fides-overlay-component-border-radius);display:flex;flex-direction:row;gap:30px;justify-content:space-around;margin-bottom:16px;padding:16px 12px;position:sticky;top:0}.fides-vendor-info-label{font-size:var(--fides-overlay-font-size-body-small);font-weight:600;margin-right:4px}.fides-info-box{background-color:var(--fides-overlay-hover-color);border-radius:var(--fides-overlay-component-border-radius);margin:10px 0;padding:16px}.fides-info-box p{margin:0}.fides-tabs .tabpanel-container{overflow:hidden}.tabpanel-container section[hidden]{display:none}@media screen and (min-width:768px){div#fides-banner{border:1px solid var(--fides-overlay-primary-color);border-radius:var(--fides-overlay-component-border-radius);width:75%}div#fides-banner-container.fides-banner-bottom{bottom:var(--fides-overlay-banner-offset)}}@media only screen and (min-width:1280px){div#fides-banner{border:1px solid var(--fides-overlay-primary-color);width:60%}}@media screen and (max-width:992px){.fides-vendor-info-banner{flex-direction:column;gap:16px}}@media screen and (max-width:768px){div#fides-banner{padding:24px;width:100%}div#fides-banner-description{margin-bottom:0}div#fides-banner-inner div#fides-button-group{align-items:flex-start;flex-direction:column;gap:12px;padding-top:24px}.fides-banner-button-group{flex-direction:column;width:100%}button.fides-banner-button{margin:0;width:100%}div#fides-tcf-banner-inner{margin-top:24px;min-height:revert;overflow-y:revert}div#fides-banner-inner-container{display:flex;flex-direction:column;max-height:50vh;overflow-y:auto;scrollbar-gutter:stable}div#fides-privacy-policy-link{order:1;width:100%}.fides-modal-footer{width:100%}.fides-tcf-banner-container div#fides-banner div#fides-banner-inner div#fides-button-group .fides-banner-button-group{padding-left:0}}.fides-tcf-banner-container{bottom:0!important}.fides-tcf-banner-container #fides-banner{border-radius:0;border-width:1px 0 0;padding:24px 40px 40px;width:100%}.fides-tcf-banner-container #fides-privacy-policy-link{margin:auto}.fides-paging-buttons{display:flex;gap:8px;justify-content:center}.fides-paging-info{color:var(--fides-overlay-font-color-dark);font-size:var(--fides-overlay-font-size-body-small);font-weight:600;padding:8px}.fides-paging-previous-button{margin-right:8px}.fides-paging-next-button,.fides-paging-previous-button{background-color:transparent;border:none;cursor:pointer;padding:6px}.fides-paging-next-button:disabled,.fides-paging-previous-button:disabled{cursor:default}.fides-i18n-menu{position:relative}div.fides-i18n-pseudo-button{cursor:pointer;height:1.5rem}.fides-i18n-popover{bottom:100%;display:flex;flex-direction:column;gap:1px;height:0;left:0;max-height:7rem;overflow:hidden;position:absolute;transition:height .2s}@media screen and (max-width:768px){.fides-i18n-popover{bottom:auto;top:100%}}.fides-i18n-menu:focus-within .fides-i18n-popover,.fides-i18n-menu:hover .fides-i18n-popover{background-color:var(--fides-overlay-background-dark-color);border:1px solid var(--fides-overlay-primary-color);border-radius:var(--fides-overlay-component-border-radius);height:auto;min-width:9rem;overflow:scroll}button.fides-banner-button.fides-menu-item{background:var(--fides-overlay-secondary-button-background-color);border:none;border-radius:0;color:var(--fides-overlay-secondary-button-text-color);margin:0;padding-left:1.5rem;text-align:left;width:100%}button.fides-banner-button.fides-menu-item[aria-pressed=true]{background:var(--fides-overlay-primary-button-background-color);color:var(--fides-overlay-primary-button-text-color)}button.fides-banner-button.fides-menu-item[aria-pressed=true]:before{content:"\\2713";display:inline-block;margin-left:-1rem;margin-right:.25rem}button.fides-banner-button.fides-menu-item:not([aria-pressed=true]):hover{background:var(--fides-overlay-secondary-button-background-hover-color)}`;
    Pr(Or);
    var Ar = (e, t, o) =>
      new Promise((i, n) => {
        var r = (a) => {
            try {
              l(o.next(a));
            } catch (c) {
              n(c);
            }
          },
          d = (a) => {
            try {
              l(o.throw(a));
            } catch (c) {
              n(c);
            }
          },
          l = (a) =>
            a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
        l((o = o.apply(e, t)).next());
      });
    const $r = () => {
        const [e, t] = K(!1);
        return (
          D(() => {
            t(!0);
          }, []),
          e
        );
      },
      Nr = ({ id: e }) => {
        const [t, o] = K(!1),
          i = S(() => o(!1), []),
          n = S(() => o(!0), []),
          r = S(() => {
            t ? i() : n();
          }, [t, n, i]);
        return {
          isOpen: t,
          onOpen: n,
          onClose: i,
          onToggle: r,
          getButtonProps: () => ({
            "aria-expanded": t,
            "aria-controls": e,
            onClick: r,
          }),
          getDisclosureProps: () => ({
            id: e,
            className: t
              ? "fides-disclosure-visible"
              : "fides-disclosure-hidden",
          }),
        };
      },
      G = (e) => (e ? e.map((t) => t.id) : []),
      Tr = ({
        options: e,
        privacyExperience: t,
        privacyExperienceConfigHistoryId: o,
        privacyNoticeHistoryIds: i,
        userGeography: n,
        acknowledgeMode: r,
      }) => {
        const [d, l] = K(null),
          a = S(
            (c) =>
              Ar(void 0, null, function* () {
                if (
                  !c.detail.extraDetails ||
                  c.detail.extraDetails.servingComponent === re.BANNER
                )
                  return;
                const s = {
                    browser_identity: c.detail.identity,
                    privacy_experience_config_history_id: o || "",
                    user_geography: n,
                    acknowledge_mode: r,
                    privacy_notice_history_ids: i || [],
                    tcf_purpose_consents: G(t?.tcf_purpose_consents),
                    tcf_purpose_legitimate_interests: G(
                      t.tcf_purpose_legitimate_interests
                    ),
                    tcf_special_purposes: G(t?.tcf_special_purposes),
                    tcf_vendor_consents: G(t?.tcf_vendor_consents),
                    tcf_vendor_legitimate_interests: G(
                      t.tcf_vendor_legitimate_interests
                    ),
                    tcf_features: G(t?.tcf_features),
                    tcf_special_features: G(t?.tcf_special_features),
                    tcf_system_consents: G(t?.tcf_system_consents),
                    tcf_system_legitimate_interests: G(
                      t?.tcf_system_legitimate_interests
                    ),
                    serving_component: String(
                      c.detail.extraDetails.servingComponent
                    ),
                  },
                  g = yield no({ request: s, options: e });
                g && l(g);
              }),
            [o, i, e, r, t, n]
          );
        return (
          D(
            () => (
              window.addEventListener("FidesUIShown", a),
              () => {
                window.removeEventListener("FidesUIShown", a);
              }
            ),
            [a]
          ),
          { servedNotice: d }
        );
      },
      Bo = ({ onClick: e, ariaLabel: t, hidden: o = !1 }) =>
        v(
          "button",
          {
            type: "button",
            "aria-label": t,
            className: "fides-close-button",
            onClick: e,
            style: { visibility: o ? "hidden" : "visible" },
          },
          v(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              fill: "none",
            },
            v("path", {
              fill: "#2D3748",
              d: "m8 7.057 3.3-3.3.943.943-3.3 3.3 3.3 3.3-.943.943-3.3-3.3-3.3 3.3-.943-.943 3.3-3.3-3.3-3.3.943-.943 3.3 3.3Z",
            })
          )
        ),
      Vo = ({ i18n: e, status: t }) => {
        const o = e.t("static.gpc"),
          i = t.valueOf();
        let n = "";
        if (t === U.APPLIED) n = e.t("static.gpc.status.applied");
        else if (t === U.OVERRIDDEN) n = e.t("static.gpc.status.overridden");
        else if (t === U.NONE) return null;
        return v(
          "span",
          { className: "fides-gpc-label" },
          o,
          " ",
          v("span", { className: `fides-gpc-badge fides-gpc-badge-${i}` }, n)
        );
      },
      Ae = "vendors page.",
      Ho = ({
        description: e,
        onVendorPageClick: t,
        allowHTMLDescription: o = !1,
      }) => {
        if (!e) return null;
        if (o)
          return v("div", {
            className: "fides-html-description",
            dangerouslySetInnerHTML: { __html: e },
          });
        if (
          t &&
          (e.endsWith(Ae) ||
            e.endsWith(`${Ae}
`))
        ) {
          const i = e.split(Ae)[0];
          return v(
            "div",
            null,
            i,
            " ",
            v(
              "button",
              { type: "button", className: "fides-link-button", onClick: t },
              Ae
            )
          );
        }
        return v("div", null, e);
      },
      Ir = ({
        i18n: e,
        dismissable: t,
        onOpen: o,
        onClose: i,
        bannerIsOpen: n,
        children: r,
        onVendorPageClick: d,
        renderButtonGroup: l,
        className: a,
      }) => {
        var c, s, g, u;
        const [f, p] = K(window.innerWidth < 768);
        D(() => {
          const w = () => {
            p(window.innerWidth < 768);
          };
          return (
            window.addEventListener("resize", w),
            () => {
              window.removeEventListener("resize", w);
            }
          );
        }, []);
        const x = X().globalPrivacyControl;
        D(() => {
          n && o();
        }, [n, o]);
        const y = ye(e, "exp.banner_title")
            ? e.t("exp.banner_title")
            : e.t("exp.title"),
          m = ye(e, "exp.banner_description")
            ? e.t("exp.banner_description")
            : e.t("exp.description");
        return v(
          "div",
          {
            id: "fides-banner-container",
            className: `fides-banner fides-banner-bottom 
        ${n ? "" : "fides-banner-hidden"} 
        ${a || ""}`,
          },
          v(
            "div",
            { id: "fides-banner" },
            v(
              "div",
              { id: "fides-banner-inner" },
              v(Bo, {
                ariaLabel: "Close banner",
                onClick: i,
                hidden:
                  ((s = (c = window.Fides) == null ? void 0 : c.options) == null
                    ? void 0
                    : s.preventDismissal) || !t,
              }),
              v(
                "div",
                {
                  id: "fides-banner-inner-container",
                  style: { gridTemplateColumns: r ? "1fr 1fr" : "1fr" },
                },
                v(
                  "div",
                  { id: "fides-banner-inner-description" },
                  v(
                    "div",
                    { id: "fides-banner-heading" },
                    v(
                      "div",
                      {
                        id: "fides-banner-title",
                        className: "fides-banner-title",
                      },
                      y
                    ),
                    x && v(Vo, { i18n: e, status: U.APPLIED })
                  ),
                  v(
                    "div",
                    {
                      id: "fides-banner-description",
                      className: "fides-banner-description",
                    },
                    v(Ho, {
                      description: m,
                      onVendorPageClick: d,
                      allowHTMLDescription:
                        (u = (g = window.Fides) == null ? void 0 : g.options) ==
                        null
                          ? void 0
                          : u.allowHTMLDescription,
                    })
                  )
                ),
                r,
                !f && l({ isMobile: f })
              ),
              f && l({ isMobile: f })
            )
          )
        );
      },
      pe = ({
        buttonType: e,
        label: t,
        id: o,
        onClick: i,
        className: n = "",
      }) =>
        v(
          "button",
          {
            type: "button",
            id: o,
            className: `fides-banner-button fides-banner-button-${e.valueOf()} ${n}`,
            onClick: i,
            "data-testid": `${t}-btn`,
          },
          t || ""
        ),
      Ko = ({ i18n: e }) => {
        if (
          !ye(e, "exp.privacy_policy_link_label") ||
          !ye(e, "exp.privacy_policy_link_label")
        )
          return null;
        const t = e.t("exp.privacy_policy_link_label"),
          o = e.t("exp.privacy_policy_url");
        return v(
          "div",
          {
            id: "fides-privacy-policy-link",
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          v(
            "a",
            {
              href: o,
              rel: "noopener noreferrer",
              target: "_blank",
              className: "fides-privacy-policy",
            },
            t
          )
        );
      };
    var Sr = Object.defineProperty,
      jr = Object.defineProperties,
      Lr = Object.getOwnPropertyDescriptors,
      $e = Object.getOwnPropertySymbols,
      Yo = Object.prototype.hasOwnProperty,
      qo = Object.prototype.propertyIsEnumerable,
      Wo = (e, t, o) =>
        t in e
          ? Sr(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      Fr = (e, t) => {
        for (var o in t || (t = {})) Yo.call(t, o) && Wo(e, o, t[o]);
        if ($e) for (var o of $e(t)) qo.call(t, o) && Wo(e, o, t[o]);
        return e;
      },
      zr = (e, t) => jr(e, Lr(t)),
      Dr = (e, t) => {
        var o = {};
        for (var i in e) Yo.call(e, i) && t.indexOf(i) < 0 && (o[i] = e[i]);
        if (e != null && $e)
          for (var i of $e(e))
            t.indexOf(i) < 0 && qo.call(e, i) && (o[i] = e[i]);
        return o;
      };
    const Mr = (e) => {
        var t = e,
          { isActive: o, className: i, children: n } = t,
          r = Dr(t, ["isActive", "className", "children"]);
        return v(
          "button",
          zr(Fr({ type: "button", "aria-pressed": o || void 0 }, r), {
            className: `fides-banner-button fides-menu-item ${i || ""}`,
          }),
          n
        );
      },
      Rr = ({
        i18n: e,
        onManagePreferencesClick: t,
        firstButton: o,
        onAcceptAll: i,
        onRejectAll: n,
        isMobile: r,
        includePrivacyPolicy: d,
        saveOnly: l = !1,
        includeLanguageSelector: a,
        options: c,
      }) => {
        var s;
        const { currentLocale: g, setCurrentLocale: u } = Go(),
          f = (p) => {
            var x;
            p !== e.locale &&
              (e.activate(p),
              u(p),
              (x = document.getElementById("fides-button-group")) == null ||
                x.focus(),
              b(c.debug, `Fides locale updated to ${p}`));
          };
        return v(
          "div",
          { id: "fides-button-group", tabIndex: -1 },
          a &&
            ((s = e.availableLanguages) == null ? void 0 : s.length) > 1 &&
            v(
              "div",
              { className: "fides-i18n-menu" },
              v(
                "div",
                { role: "group", className: "fides-i18n-popover" },
                e.availableLanguages.map((p) =>
                  v(
                    Mr,
                    {
                      key: p.locale,
                      "data-testid": `fides-i18n-option-${p.locale}`,
                      onClick: () => f(p.locale),
                      isActive: g === p.locale,
                    },
                    p.label_original
                  )
                )
              ),
              v(
                "div",
                { className: "fides-i18n-pseudo-button" },
                v(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 640 512",
                    height: "inherit",
                    fill: "currentColor",
                  },
                  v("path", {
                    d: "M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z",
                  })
                )
              )
            ),
          !!t &&
            v(
              "div",
              { className: "fides-banner-button-group" },
              v(pe, {
                buttonType: r ? R.SECONDARY : R.TERTIARY,
                label: e.t("exp.privacy_preferences_link_label"),
                onClick: t,
                className: "fides-manage-preferences-button",
              })
            ),
          d && v(Ko, { i18n: e }),
          v(
            "div",
            {
              className: o
                ? "fides-modal-button-group"
                : "fides-banner-button-group",
            },
            o,
            !l &&
              v(
                Q,
                null,
                v(pe, {
                  buttonType: R.PRIMARY,
                  label: e.t("exp.reject_button_label"),
                  onClick: n,
                  className: "fides-reject-all-button",
                }),
                v(pe, {
                  buttonType: R.PRIMARY,
                  label: e.t("exp.accept_button_label"),
                  onClick: i,
                  className: "fides-accept-all-button",
                })
              )
          )
        );
      },
      Jo = ({
        experience: e,
        i18n: t,
        onSave: o,
        onManagePreferencesClick: i,
        enabledKeys: n,
        isInModal: r,
        isAcknowledge: d,
        isMobile: l,
        saveOnly: a = !1,
        options: c,
      }) => {
        if (!e.experience_config || !e.privacy_notices) return null;
        const { privacy_notices: s } = e,
          g = () => {
            o(
              q.ACCEPT,
              s.map((p) => p.notice_key)
            );
          },
          u = () => {
            o(
              q.REJECT,
              s
                .filter((p) => p.consent_mechanism === M.NOTICE_ONLY)
                .map((p) => p.notice_key)
            );
          },
          f = () => {
            o(q.SAVE, n);
          };
        return d
          ? v(
              "div",
              {
                className: `fides-acknowledge-button-container ${
                  r ? "" : "fides-banner-acknowledge"
                }`,
              },
              v(pe, {
                buttonType: R.PRIMARY,
                label: t.t("exp.acknowledge_button_label"),
                onClick: g,
                className: "fides-acknowledge-button",
              })
            )
          : v(Rr, {
              i18n: t,
              onManagePreferencesClick: i,
              onAcceptAll: g,
              onRejectAll: u,
              firstButton: r
                ? v(pe, {
                    buttonType: a ? R.PRIMARY : R.SECONDARY,
                    label: t.t("exp.save_button_label"),
                    onClick: f,
                    className: "fides-save-button",
                  })
                : void 0,
              isMobile: l,
              includePrivacyPolicy: !r,
              saveOnly: a,
              includeLanguageSelector: !r,
              options: c,
            });
      };
    var Ur = [
        'a[href]:not([tabindex^="-"])',
        'area[href]:not([tabindex^="-"])',
        'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
        'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
        'select:not([disabled]):not([tabindex^="-"])',
        'textarea:not([disabled]):not([tabindex^="-"])',
        'button:not([disabled]):not([tabindex^="-"])',
        'iframe:not([tabindex^="-"])',
        'audio[controls]:not([tabindex^="-"])',
        'video[controls]:not([tabindex^="-"])',
        '[contenteditable]:not([tabindex^="-"])',
        '[tabindex]:not([tabindex^="-"])',
      ],
      Gr = "Tab",
      Br = "Escape";
    function F(e) {
      (this._show = this.show.bind(this)),
        (this._hide = this.hide.bind(this)),
        (this._maintainFocus = this._maintainFocus.bind(this)),
        (this._bindKeypress = this._bindKeypress.bind(this)),
        (this.$el = e),
        (this.shown = !1),
        (this._id = this.$el.getAttribute("data-a11y-dialog") || this.$el.id),
        (this._previouslyFocused = null),
        (this._listeners = {}),
        this.create();
    }
    (F.prototype.create = function () {
      this.$el.setAttribute("aria-hidden", !0),
        this.$el.setAttribute("aria-modal", !0),
        this.$el.setAttribute("tabindex", -1),
        this.$el.hasAttribute("role") ||
          this.$el.setAttribute("role", "dialog"),
        (this._openers = ue('[data-a11y-dialog-show="' + this._id + '"]')),
        this._openers.forEach(
          function (t) {
            t.addEventListener("click", this._show);
          }.bind(this)
        );
      const e = this.$el;
      return (
        (this._closers = ue("[data-a11y-dialog-hide]", this.$el)
          .filter(function (t) {
            return t.closest('[aria-modal="true"], [data-a11y-dialog]') === e;
          })
          .concat(ue('[data-a11y-dialog-hide="' + this._id + '"]'))),
        this._closers.forEach(
          function (t) {
            t.addEventListener("click", this._hide);
          }.bind(this)
        ),
        this._fire("create"),
        this
      );
    }),
      (F.prototype.show = function (e) {
        return this.shown
          ? this
          : ((this._previouslyFocused = document.activeElement),
            this.$el.removeAttribute("aria-hidden"),
            (this.shown = !0),
            Xo(this.$el),
            document.body.addEventListener("focus", this._maintainFocus, !0),
            document.addEventListener("keydown", this._bindKeypress),
            this._fire("show", e),
            this);
      }),
      (F.prototype.hide = function (e) {
        return this.shown
          ? ((this.shown = !1),
            this.$el.setAttribute("aria-hidden", "true"),
            this._previouslyFocused &&
              this._previouslyFocused.focus &&
              this._previouslyFocused.focus(),
            document.body.removeEventListener("focus", this._maintainFocus, !0),
            document.removeEventListener("keydown", this._bindKeypress),
            this._fire("hide", e),
            this)
          : this;
      }),
      (F.prototype.destroy = function () {
        return (
          this.hide(),
          this._openers.forEach(
            function (e) {
              e.removeEventListener("click", this._show);
            }.bind(this)
          ),
          this._closers.forEach(
            function (e) {
              e.removeEventListener("click", this._hide);
            }.bind(this)
          ),
          this._fire("destroy"),
          (this._listeners = {}),
          this
        );
      }),
      (F.prototype.on = function (e, t) {
        return (
          typeof this._listeners[e] > "u" && (this._listeners[e] = []),
          this._listeners[e].push(t),
          this
        );
      }),
      (F.prototype.off = function (e, t) {
        var o = (this._listeners[e] || []).indexOf(t);
        return o > -1 && this._listeners[e].splice(o, 1), this;
      }),
      (F.prototype._fire = function (e, t) {
        var o = this._listeners[e] || [],
          i = new CustomEvent(e, { detail: t });
        this.$el.dispatchEvent(i),
          o.forEach(
            function (n) {
              n(this.$el, t);
            }.bind(this)
          );
      }),
      (F.prototype._bindKeypress = function (e) {
        const t = document.activeElement;
        (t && t.closest('[aria-modal="true"]') !== this.$el) ||
          (this.shown &&
            e.key === Br &&
            this.$el.getAttribute("role") !== "alertdialog" &&
            (e.preventDefault(), this.hide(e)),
          this.shown && e.key === Gr && Kr(this.$el, e));
      }),
      (F.prototype._maintainFocus = function (e) {
        this.shown &&
          !e.target.closest('[aria-modal="true"]') &&
          !e.target.closest("[data-a11y-dialog-ignore-focus-trap]") &&
          Xo(this.$el);
      });
    function Vr(e) {
      return Array.prototype.slice.call(e);
    }
    function ue(e, t) {
      return Vr((t || document).querySelectorAll(e));
    }
    function Xo(e) {
      var t = e.querySelector("[autofocus]") || e;
      t.focus();
    }
    function Hr(e) {
      return ue(Ur.join(","), e).filter(function (t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
      });
    }
    function Kr(e, t) {
      var o = Hr(e),
        i = o.indexOf(document.activeElement);
      t.shiftKey && i === 0
        ? (o[o.length - 1].focus(), t.preventDefault())
        : !t.shiftKey &&
          i === o.length - 1 &&
          (o[0].focus(), t.preventDefault());
    }
    function st() {
      ue("[data-a11y-dialog]").forEach(function (e) {
        new F(e);
      });
    }
    typeof document < "u" &&
      (document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", st)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(st)
        : window.setTimeout(st, 16));
    const Yr = () => {
        const [e, t] = K(null),
          o = S((i) => {
            if (i !== null) {
              const n = new F(i);
              n
                .on("show", () => {
                  document.documentElement.style.overflowY = "hidden";
                })
                .on("hide", () => {
                  document.documentElement.style.overflowY = "";
                }),
                t(n);
            }
          }, []);
        return { instance: e, container: o };
      },
      qr = ({ role: e, id: t, onClose: o }) => {
        const { instance: i, container: n } = Yr(),
          r = e === "alertdialog",
          d = `${t}-title`,
          l = S(() => {
            i && i.hide(), o && o();
          }, [o, i]);
        return (
          D(
            () => () => {
              i && i.destroy();
            },
            [i]
          ),
          {
            instance: i,
            attributes: {
              container: {
                id: t,
                ref: n,
                role: e,
                tabIndex: -1,
                "aria-modal": !0,
                "aria-hidden": !0,
                "aria-labelledby": d,
              },
              overlay: { onClick: r ? void 0 : l },
              dialog: { role: "document" },
              closeButton: { type: "button", onClick: l },
              title: { role: "heading", "aria-level": 1, id: d },
            },
          }
        );
      },
      Wr = () =>
        v(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "18",
            height: "18",
            fill: "currentColor",
          },
          v("path", {
            d: "M9 12.05a.68.68 0 0 0-.68.7c0 .39.32.7.68.7.39 0 .68-.31.68-.7a.66.66 0 0 0-.68-.7Zm0-1.18c.26 0 .44-.2.44-.46V6.19c0-.26-.2-.47-.44-.47a.49.49 0 0 0-.47.47v4.22c0 .25.21.46.47.46Zm7.27 2.27-5.85-9.9c-.3-.5-.83-.8-1.42-.8-.6 0-1.12.3-1.42.8l-5.86 9.9c-.3.5-.3 1.1-.01 1.6.3.51.83.82 1.43.82h11.72c.6 0 1.13-.3 1.43-.82.29-.5.28-1.1-.02-1.6Zm-.82 1.1c-.1.25-.33.38-.62.38H3.14a.7.7 0 0 1-.61-.35.64.64 0 0 1 0-.65l5.86-9.9A.7.7 0 0 1 9 3.37a.7.7 0 0 1 .61.35l5.86 9.9c.1.2.12.44-.02.63Z",
          })
        ),
      Jr = ({ title: e, description: t }) =>
        v(
          "div",
          { className: "fides-gpc-banner" },
          v("div", { className: "fides-gpc-warning" }, v(Wr, null)),
          v(
            "div",
            null,
            v("p", { className: "fides-gpc-header" }, e),
            v("p", null, t)
          )
        );
    var Xr = Object.defineProperty,
      Zr = Object.defineProperties,
      Qr = Object.getOwnPropertyDescriptors,
      Zo = Object.getOwnPropertySymbols,
      ea = Object.prototype.hasOwnProperty,
      ta = Object.prototype.propertyIsEnumerable,
      Qo = (e, t, o) =>
        t in e
          ? Xr(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      oa = (e, t) => {
        for (var o in t || (t = {})) ea.call(t, o) && Qo(e, o, t[o]);
        if (Zo) for (var o of Zo(t)) ta.call(t, o) && Qo(e, o, t[o]);
        return e;
      },
      ia = (e, t) => Zr(e, Qr(t));
    const ei = ({
      titleProps: e,
      className: t,
      i18n: o,
      renderModalFooter: i,
      children: n,
      onVendorPageClick: r,
    }) => {
      var d, l;
      const a = o.t("exp.title"),
        c = o.t("exp.description"),
        s = X().globalPrivacyControl,
        g = o.t("static.gpc.title"),
        u = o.t("static.gpc.description");
      return v(
        Q,
        null,
        v(
          "div",
          {
            "data-testid": "consent-content",
            id: "fides-consent-content",
            className: t,
          },
          v(
            "div",
            { className: "fides-modal-body" },
            v(
              "div",
              ia(oa({ "data-testid": "fides-modal-title" }, e), {
                className: "fides-modal-title",
              }),
              a
            ),
            v(
              "p",
              {
                "data-testid": "fides-modal-description",
                className: "fides-modal-description",
              },
              v(Ho, {
                onVendorPageClick: r,
                description: c,
                allowHTMLDescription:
                  (l = (d = window.Fides) == null ? void 0 : d.options) == null
                    ? void 0
                    : l.allowHTMLDescription,
              })
            ),
            s && v(Jr, { title: g, description: u }),
            n
          )
        ),
        v("div", { className: "fides-modal-footer" }, i())
      );
    };
    var na = Object.defineProperty,
      ra = Object.defineProperties,
      aa = Object.getOwnPropertyDescriptors,
      ti = Object.getOwnPropertySymbols,
      sa = Object.prototype.hasOwnProperty,
      la = Object.prototype.propertyIsEnumerable,
      oi = (e, t, o) =>
        t in e
          ? na(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      lt = (e, t) => {
        for (var o in t || (t = {})) sa.call(t, o) && oi(e, o, t[o]);
        if (ti) for (var o of ti(t)) la.call(t, o) && oi(e, o, t[o]);
        return e;
      },
      dt = (e, t) => ra(e, aa(t));
    const da = ({
        attributes: e,
        dismissable: t,
        i18n: o,
        renderModalFooter: i,
        renderModalContent: n,
      }) => {
        const {
          container: r,
          overlay: d,
          dialog: l,
          title: a,
          closeButton: c,
        } = e;
        return v(
          "div",
          dt(lt({ "data-testid": "consent-modal" }, r), {
            className: "fides-modal-container",
          }),
          v("div", dt(lt({}, d), { className: "fides-modal-overlay" })),
          v(
            "div",
            dt(lt({ "data-testid": "fides-modal-content" }, l), {
              className: "fides-modal-content",
            }),
            v(
              "div",
              { className: "fides-modal-header" },
              v("div", null),
              v(Bo, {
                ariaLabel: "Close modal",
                onClick: c.onClick,
                hidden: window.Fides.options.preventDismissal || !t,
              })
            ),
            v(ei, { titleProps: a, i18n: o, renderModalFooter: i }, n())
          )
        );
      },
      ca = () => {
        document.body.classList.add("fides-no-scroll");
      },
      ii = () => {
        document.body.classList.remove("fides-no-scroll");
      },
      pa = ({
        options: e,
        experience: t,
        i18n: o,
        cookie: i,
        savedConsent: n,
        onOpen: r,
        onDismiss: d,
        renderBanner: l,
        renderModalContent: a,
        renderModalFooter: c,
        onVendorPageClick: s,
        isUiBlocking: g,
      }) => {
        const u = $r(),
          [f, p] = K(!1),
          x = kr(null);
        D(
          () => (
            g && f ? ca() : ii(),
            () => {
              ii();
            }
          ),
          [g, f]
        );
        const y = S(
            ({ saved: h = !1 }) => {
              B("FidesModalClosed", i, e.debug, { saved: h }), h || d();
            },
            [i, d, e.debug]
          ),
          { instance: m, attributes: w } = qr({
            id: "fides-modal",
            role: "alertdialog",
            title: o.t("exp.title"),
            onClose: () => {
              y({ saved: !1 });
            },
          }),
          A = S(() => {
            m && (p(!1), m.show(), r());
          }, [m, r]),
          N = S(() => {
            m && !e.fidesEmbed && (m.hide(), y({ saved: !0 }));
          }, [m, y, e.fidesEmbed]);
        D(() => {
          e.fidesEmbed && r();
        }, [e, r]);
        const O = ne(() => {
          var h;
          return (
            !e.fidesDisableBanner &&
            ((h = t.experience_config) == null ? void 0 : h.component) !==
              I.MODAL &&
            At(t, i, n) &&
            !e.fidesEmbed
          );
        }, [i, n, t, e]);
        D(() => {
          const h = setTimeout(() => {
            O && p(!0);
          }, 100);
          return () => clearTimeout(h);
        }, [O, p]),
          D(() => {
            (window.Fides.showModal = A),
              document.body.classList.add("fides-overlay-modal-link-shown");
            const h = setTimeout(() => {
              const C = e.modalLinkId || "fides-modal-link",
                E = document.getElementById(C);
              E
                ? (b(
                    e.debug,
                    "Modal link element found, updating it to show and trigger modal on click."
                  ),
                  (x.current = E),
                  x.current.addEventListener("click", window.Fides.showModal),
                  x.current.classList.add("fides-modal-link-shown"))
                : b(e.debug, "Modal link element not found.");
            }, 200);
            return () => {
              clearTimeout(h),
                x.current &&
                  x.current.removeEventListener(
                    "click",
                    window.Fides.showModal
                  ),
                (window.Fides.showModal = Ue);
            };
          }, [e.modalLinkId, e.debug, A, t]);
        const z = () => {
          A();
        };
        return u
          ? t.experience_config
            ? v(
                "div",
                null,
                O && f && g && v("div", { className: "fides-modal-overlay" }),
                O
                  ? l({
                      isOpen: f,
                      onClose: () => {
                        p(!1);
                      },
                      onSave: () => {
                        p(!1);
                      },
                      onManagePreferencesClick: z,
                    })
                  : null,
                e.fidesEmbed
                  ? v(
                      ei,
                      {
                        titleProps: w.title,
                        className: "fides-embed",
                        i18n: o,
                        renderModalFooter: () =>
                          c({ onClose: N, isMobile: !1 }),
                      },
                      a()
                    )
                  : v(da, {
                      attributes: w,
                      dismissable: t.experience_config.dismissable,
                      i18n: o,
                      onVendorPageClick: s,
                      renderModalFooter: () => c({ onClose: N, isMobile: !1 }),
                      renderModalContent: a,
                    })
              )
            : (b(e.debug, "No experience config found"), null)
          : null;
      },
      ua = () => v("hr", { className: "fides-divider" }),
      fa = ({
        name: e,
        id: t,
        checked: o,
        onChange: i,
        disabled: n,
        onLabel: r,
        offLabel: d,
      }) => {
        const l = `toggle-${t}`,
          a = o ? r : d;
        return v(
          "label",
          {
            className: "fides-toggle",
            htmlFor: e,
            "data-testid": `toggle-${e}`,
            id: l,
          },
          v("input", {
            type: "checkbox",
            name: e,
            className: "fides-toggle-input",
            onChange: () => {
              i(t);
            },
            checked: o,
            role: "switch",
            "aria-labelledby": l,
            disabled: n,
          }),
          v("span", { className: "fides-toggle-display" }, a)
        );
      };
    var va = Object.defineProperty,
      ga = Object.defineProperties,
      ba = Object.getOwnPropertyDescriptors,
      ni = Object.getOwnPropertySymbols,
      _a = Object.prototype.hasOwnProperty,
      ya = Object.prototype.propertyIsEnumerable,
      ri = (e, t, o) =>
        t in e
          ? va(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      ai = (e, t) => {
        for (var o in t || (t = {})) _a.call(t, o) && ri(e, o, t[o]);
        if (ni) for (var o of ni(t)) ya.call(t, o) && ri(e, o, t[o]);
        return e;
      },
      ma = (e, t) => ga(e, ba(t));
    const ha = ({
        noticeKey: e,
        title: t,
        checked: o,
        onToggle: i,
        children: n,
        badge: r,
        gpcBadge: d,
        disabled: l,
        onLabel: a,
        offLabel: c,
        isHeader: s,
        includeToggle: g = !0,
      }) => {
        const {
            isOpen: u,
            getButtonProps: f,
            getDisclosureProps: p,
            onToggle: x,
          } = Nr({ id: e }),
          y = (A) => {
            (A.code === "Space" || A.code === "Enter") && x();
          },
          m = n != null,
          w = m ? f() : {};
        return v(
          "div",
          {
            className:
              u && m
                ? "fides-notice-toggle fides-notice-toggle-expanded"
                : "fides-notice-toggle",
          },
          v(
            "div",
            { key: e, className: "fides-notice-toggle-title" },
            v(
              "span",
              ma(
                ai(
                  { role: "button", tabIndex: 0, onKeyDown: m ? y : void 0 },
                  w
                ),
                {
                  className: s
                    ? "fides-notice-toggle-trigger fides-notice-toggle-header"
                    : "fides-notice-toggle-trigger",
                }
              ),
              v(
                "span",
                { className: "fides-flex-center fides-justify-space-between" },
                t,
                r ? v("span", { className: "fides-notice-badge" }, r) : null
              ),
              d
            ),
            g
              ? v(fa, {
                  name: t || "",
                  id: e,
                  checked: o,
                  onChange: i,
                  disabled: l,
                  onLabel: a,
                  offLabel: c,
                })
              : null
          ),
          n ? v("div", ai({}, p()), n) : null
        );
      },
      ka = ({
        noticeToggles: e,
        i18n: t,
        enabledNoticeKeys: o,
        onChange: i,
      }) => {
        const n = (l) => {
          o.indexOf(l) === -1 ? i([...o, l]) : i(o.filter((a) => a !== l));
        };
        let r, d;
        return (
          We(t) === W && ((r = "On"), (d = "Off")),
          v(
            "div",
            null,
            e.map((l, a) => {
              const {
                  noticeKey: c,
                  title: s,
                  description: g,
                  checked: u,
                  disabled: f,
                  gpcStatus: p,
                } = l,
                x = a === e.length - 1;
              return v(
                "div",
                null,
                v(
                  ha,
                  {
                    noticeKey: c,
                    title: s,
                    checked: u,
                    onToggle: n,
                    gpcBadge: v(Vo, { i18n: t, status: p }),
                    disabled: f,
                    onLabel: r,
                    offLabel: d,
                  },
                  g
                ),
                x ? null : v(ua, null)
              );
            })
          )
        );
      },
      xa = ({
        options: e,
        experience: t,
        i18n: o,
        fidesRegionString: i,
        cookie: n,
        savedConsent: r,
      }) => {
        var d;
        const l = () => {
            if (t.privacy_notices) {
              const h = He();
              return t.privacy_notices.map((C) =>
                ze(C, X(), h?.consent) ? C.notice_key : ""
              );
            }
            return [];
          },
          { currentLocale: a, setCurrentLocale: c } = Go();
        D(() => {
          !a && o.locale && c(o.locale);
        }, [a, o.locale, c]);
        const s = ne(() => {
            if (t.experience_config) {
              const h = Jt(o, t.experience_config);
              return h?.privacy_experience_config_history_id;
            }
          }, [t, o, a]),
          g = ne(
            () =>
              (t.privacy_notices || []).map((h) => {
                const C = Wt(o, h);
                return { notice: h, bestTranslation: C };
              }),
            [t.privacy_notices, o, a]
          ),
          [u, f] = K(l()),
          p = g.every((h) => h.notice.consent_mechanism === M.NOTICE_ONLY),
          x = g.map((h) => {
            var C, E;
            const T = u.indexOf(h.notice.notice_key) !== -1,
              fe = X(),
              ct = Nt({ value: T, notice: h.notice, consentContext: fe });
            return {
              noticeKey: h.notice.notice_key,
              title: (C = h.bestTranslation) == null ? void 0 : C.title,
              description:
                (E = h.bestTranslation) == null ? void 0 : E.description,
              checked: T,
              consentMechanism: h.notice.consent_mechanism,
              disabled: h.notice.consent_mechanism === M.NOTICE_ONLY,
              gpcStatus: ct,
            };
          }),
          { servedNotice: y } = Tr({
            privacyExperienceConfigHistoryId: s,
            privacyNoticeHistoryIds: g.reduce((h, C) => {
              var E;
              const T =
                (E = C.bestTranslation) == null
                  ? void 0
                  : E.privacy_notice_history_id;
              return T && h.push(T), h;
            }, []),
            options: e,
            userGeography: i,
            acknowledgeMode: p,
            privacyExperience: t,
          }),
          m = (h, C) =>
            h.map((E) => {
              var T;
              const fe = ae(
                C.includes(E.notice.notice_key),
                E.notice.consent_mechanism
              );
              return new be(
                E.notice,
                fe,
                (T = E.bestTranslation) == null
                  ? void 0
                  : T.privacy_notice_history_id
              );
            }),
          w = S(
            (h, C) => {
              const E = m(g, C);
              co({
                consentPreferencesToSave: E,
                privacyExperienceConfigHistoryId: s,
                experience: t,
                consentMethod: h,
                options: e,
                userLocationString: i,
                cookie: n,
                servedNoticeHistoryId: y?.served_notice_history_id,
                updateCookie: (T) => Ye(T, E),
              }),
                f(C);
            },
            [n, i, t, e, s, g, y]
          ),
          A = S(() => {
            B("FidesUIShown", n, e.debug, { servingComponent: re.BANNER });
          }, [n, e.debug]),
          N = S(() => {
            B("FidesUIShown", n, e.debug, { servingComponent: re.MODAL });
          }, [n, e.debug]),
          O = S(() => {
            w(q.DISMISS, l());
          }, [w, l]);
        if (!t.experience_config)
          return b(e.debug, "No experience config found"), null;
        const z = !!((d = t.experience_config) != null && d.dismissable);
        return v(pa, {
          options: e,
          experience: t,
          i18n: o,
          cookie: n,
          savedConsent: r,
          isUiBlocking: !z,
          onOpen: N,
          onDismiss: O,
          renderBanner: ({
            isOpen: h,
            onClose: C,
            onSave: E,
            onManagePreferencesClick: T,
          }) =>
            v(Ir, {
              bannerIsOpen: h,
              dismissable: z,
              onOpen: A,
              onClose: () => {
                C(), O();
              },
              i18n: o,
              renderButtonGroup: ({ isMobile: fe }) =>
                v(Jo, {
                  experience: t,
                  i18n: o,
                  onManagePreferencesClick: T,
                  enabledKeys: u,
                  onSave: (ct, za) => {
                    w(ct, za), E();
                  },
                  isAcknowledge: p,
                  isMobile: fe,
                  options: e,
                }),
            }),
          renderModalContent: () =>
            v(
              "div",
              null,
              v(
                "div",
                { className: "fides-modal-notices" },
                v(ka, {
                  noticeToggles: x,
                  i18n: o,
                  enabledNoticeKeys: u,
                  onChange: (h) => {
                    f(h), B("FidesUIChanged", n, e.debug);
                  },
                })
              )
            ),
          renderModalFooter: ({ onClose: h, isMobile: C }) =>
            v(
              Q,
              null,
              v(Jo, {
                experience: t,
                i18n: o,
                enabledKeys: u,
                onSave: (E, T) => {
                  w(E, T), h();
                },
                isInModal: !0,
                isAcknowledge: p,
                isMobile: C,
                saveOnly: g.length === 1,
                options: e,
              }),
              v(Ko, { i18n: o })
            ),
        });
      };
    var wa = Object.defineProperty,
      si = Object.getOwnPropertySymbols,
      Ca = Object.prototype.hasOwnProperty,
      Ea = Object.prototype.propertyIsEnumerable,
      li = (e, t, o) =>
        t in e
          ? wa(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      Pa = (e, t) => {
        for (var o in t || (t = {})) Ca.call(t, o) && li(e, o, t[o]);
        if (si) for (var o of si(t)) Ea.call(t, o) && li(e, o, t[o]);
        return e;
      };
    const Oa = (e, t) => {
      yr(v(Er, null, v(xa, Pa({}, e))), t);
    };
    var Aa = (e, t, o) =>
      new Promise((i, n) => {
        var r = (a) => {
            try {
              l(o.next(a));
            } catch (c) {
              n(c);
            }
          },
          d = (a) => {
            try {
              l(o.throw(a));
            } catch (c) {
              n(c);
            }
          },
          l = (a) =>
            a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
        l((o = o.apply(e, t)).next());
      });
    function $a(e) {
      return Aa(this, null, function* () {
        var t;
        if (!((t = e.options.apiOptions) != null && t.getPreferencesFn))
          return null;
        b(e.options.debug, "Calling custom get preferences fn");
        try {
          return yield e.options.apiOptions.getPreferencesFn(e);
        } catch (o) {
          return (
            b(
              e.options.debug,
              "Error retrieving preferences from custom API, continuing. Error: ",
              o
            ),
            null
          );
        }
      });
    }
    var Na = Object.defineProperty,
      Ta = Object.defineProperties,
      Ia = Object.getOwnPropertyDescriptors,
      di = Object.getOwnPropertySymbols,
      Sa = Object.prototype.hasOwnProperty,
      ja = Object.prototype.propertyIsEnumerable,
      ci = (e, t, o) =>
        t in e
          ? Na(e, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: o,
            })
          : (e[t] = o),
      ee = (e, t) => {
        for (var o in t || (t = {})) Sa.call(t, o) && ci(e, o, t[o]);
        if (di) for (var o of di(t)) ja.call(t, o) && ci(e, o, t[o]);
        return e;
      },
      pi = (e, t) => Ta(e, Ia(t)),
      La = (e, t, o) =>
        new Promise((i, n) => {
          var r = (a) => {
              try {
                l(o.next(a));
              } catch (c) {
                n(c);
              }
            },
            d = (a) => {
              try {
                l(o.throw(a));
              } catch (c) {
                n(c);
              }
            },
            l = (a) =>
              a.done ? i(a.value) : Promise.resolve(a.value).then(r, d);
          l((o = o.apply(e, t)).next());
        });
    let Ne;
    const Fa = (e, t, o, i) => {
      let n = t;
      const r = Lt(e.consent);
      return i && r && (n = Ke({ experience: t, cookie: e, debug: o })), n;
    };
    (Ne = {
      consent: {},
      experience: void 0,
      geolocation: {},
      options: {
        debug: !0,
        isOverlayEnabled: !1,
        isPrefetchEnabled: !1,
        isGeolocationEnabled: !1,
        geolocationApiUrl: "",
        overlayParentId: null,
        modalLinkId: null,
        privacyCenterUrl: "",
        fidesApiUrl: "",
        serverSideFidesApiUrl: "",
        tcfEnabled: !1,
        fidesEmbed: !1,
        fidesDisableSaveApi: !1,
        fidesDisableBanner: !1,
        fidesString: null,
        apiOptions: null,
        fidesTcfGdprApplies: !1,
        fidesJsBaseUrl: "",
        customOptionsPath: null,
        preventDismissal: !1,
        allowHTMLDescription: null,
        base64Cookie: !1,
        fidesPrimaryColor: null,
      },
      fides_meta: {},
      identity: {},
      tcf_consent: {},
      saved_consent: {},
      gtm: ui,
      init: (e) =>
        La(void 0, null, function* () {
          var t, o;
          const i = fo(te.OPTIONS, e),
            n = fo(te.EXPERIENCE_TRANSLATION, e),
            r = yield $a(e),
            d = {
              optionsOverrides: i,
              consentPrefsOverrides: r,
              experienceTranslationOverrides: n,
            };
          e.options = ee(ee({}, e.options), d.optionsOverrides);
          const l = ee(
              ee({}, pr(e)),
              (t = d.consentPrefsOverrides) == null ? void 0 : t.consent
            ),
            a = ee({}, l.consent),
            c = ur(
              pi(ee({}, e), {
                cookie: l,
                savedConsent: a,
                updateExperienceFromCookieConsent: Ke,
              })
            );
          c &&
            (Object.assign(Ne, c), B("FidesInitialized", l, e.options.debug));
          const s = (o = c?.experience) != null ? o : e.experience,
            g = yield fr(
              pi(ee({}, e), {
                cookie: l,
                savedConsent: a,
                experience: s,
                renderOverlay: Oa,
                updateExperience: ({
                  cookie: u,
                  experience: f,
                  debug: p,
                  isExperienceClientSideFetched: x,
                }) => Fa(u, f, p, x),
                overrides: d,
              })
            );
          Object.assign(Ne, g), B("FidesInitialized", l, e.options.debug);
        }),
      initialized: !1,
      meta: vi,
      shopify: gi,
      showModal: Ue,
      getModalLinkLabel: () => De,
    }),
      typeof window < "u" && (window.Fides = Ne),
      (_.BannerEnabled = xt),
      (_.ButtonType = R),
      (_.CONSENT_COOKIE_MAX_AGE_DAYS = St),
      (_.CONSENT_COOKIE_NAME = Be),
      (_.ComponentType = I),
      (_.ConsentMechanism = M),
      (_.ConsentMethod = q),
      (_.EnforcementLevel = kt),
      (_.FidesEndpointPaths = eo),
      (_.GpcStatus = U),
      (_.OverrideType = te),
      (_.PrivacyNoticeFramework = ht),
      (_.RequestOrigin = wt),
      (_.SaveConsentPreference = be),
      (_.ServingComponent = re),
      (_.UserConsentPreference = L),
      (_.allNoticesAreDefaultOptIn = Ei),
      (_.consentCookieObjHasSomeConsentSet = Lt),
      (_.constructFidesRegionString = Re),
      (_.debugLog = b),
      (_.defaultShowModal = Ue),
      (_.dispatchFidesEvent = B),
      (_.experienceIsValid = Ot),
      (_.fetchExperience = to),
      (_.generateFidesUserDeviceId = Ft),
      (_.getConsentContext = X),
      (_.getConsentStateFromExperience = Bt),
      (_.getCookieByName = Ve),
      (_.getFidesConsentCookie = He),
      (_.getGeolocation = ro),
      (_.getGpcStatusFromNotice = Nt),
      (_.getOrMakeFidesCookie = Mt),
      (_.getOverrideValidatorMapByType = Pt),
      (_.getTcfDefaultPreference = Pi),
      (_.getWindowObjFromPath = $t),
      (_.initOverlay = uo),
      (_.isNewFidesCookie = zt),
      (_.isPrivacyExperience = se),
      (_.makeConsentDefaultsLegacy = Ut),
      (_.makeFidesCookie = Dt),
      (_.noticeHasConsentInCookie = _e),
      (_.patchNoticesServed = no),
      (_.patchUserPreference = io),
      (_.removeCookiesFromBrowser = Gt),
      (_.resolveConsentValue = ze),
      (_.resolveLegacyConsentValue = Ct),
      (_.saveFidesCookie = Rt),
      (_.shouldResurfaceConsent = At),
      (_.transformConsentToFidesUserPreference = ae),
      (_.transformTcfPreferencesToCookieKeys = Fi),
      (_.transformUserPreferenceToBoolean = oe),
      (_.updateCookieFromExperience = Vt),
      (_.updateCookieFromNoticePreferences = Ye),
      (_.updateExperienceFromCookieConsentNotices = Ke),
      (_.validateOptions = Et);
  });
  //# sourceMappingURL=fides.js.map

  // Initialize fides.js with custom config
  window.Fides.init({
    consent: { options: [Array] },
    options: {
      debug: false,
      geolocationApiUrl: "https://cdn-api.ethyca.com/location",
      isGeolocationEnabled: true,
      isOverlayEnabled: true,
      isPrefetchEnabled: true,
      overlayParentId: null,
      modalLinkId: null,
      privacyCenterUrl: "http://localhost:3000",
      fidesApiUrl: "https://brandeis.snackpass.co/api/v1",
      tcfEnabled: false,
      serverSideFidesApiUrl: "https://brandeis.snackpass.co/api/v1",
      fidesEmbed: false,
      fidesDisableSaveApi: false,
      fidesDisableBanner: false,
      fidesTcfGdprApplies: true,
      fidesString: null,
      apiOptions: null,
      fidesJsBaseUrl: "http://localhost:3000",
      customOptionsPath: null,
      preventDismissal: false,
      allowHTMLDescription: null,
      base64Cookie: false,
      fidesPrimaryColor: null,
    },
    experience: {},
    geolocation: {},
  });
})();
