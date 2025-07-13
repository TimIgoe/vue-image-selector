import { ref as h, openBlock as c, createElementBlock as d, normalizeClass as S, withModifiers as p, createElementVNode as u, createCommentVNode as y, createStaticVNode as x, pushScopeId as I, popScopeId as b, reactive as w } from "vue";
import * as k from "yup";
const D = (o, t) => {
  const r = o.__vccOpts || o;
  for (const [n, s] of t)
    r[n] = s;
  return r;
}, E = (o) => (I("data-v-d91e72d3"), o = o(), b(), o), R = { class: "image-selector__inner" }, C = /* @__PURE__ */ E(() => /* @__PURE__ */ u("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-6"
}, [
  /* @__PURE__ */ u("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  })
], -1)), j = [
  C
], B = ["src"], z = /* @__PURE__ */ x('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-d91e72d3><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" data-v-d91e72d3></path></svg><div class="placeholder-text" data-v-d91e72d3><span data-v-d91e72d3>Drag &amp; Drop</span><br data-v-d91e72d3><span data-v-d91e72d3>or <span class="browse-btn" data-v-d91e72d3>Browse</span></span><br data-v-d91e72d3><span class="supported-formats" data-v-d91e72d3>Supports: JPEG, JPG, PNG, WEBP</span></div>', 2), F = [
  z
], P = {
  __name: "ImageSelector",
  props: {
    select: {
      type: Function,
      required: !0
    },
    reset: {
      type: Function,
      required: !0
    },
    state: {
      type: Object,
      required: !0
    }
  },
  setup(o) {
    const t = h(null), r = h(!1), n = o, s = () => n.state.image ? URL.createObjectURL(n.state.image) : "", g = (e) => {
      r.value = !0;
    }, m = (e) => {
      r.value = !0;
    }, f = (e) => {
      r.value = !1;
    }, v = (e) => {
      r.value = !1, n.select(e);
    }, _ = (e) => {
      r.value = !1, n.reset(e);
    }, i = () => {
      t.value.click();
    };
    return (e, a) => (c(), d("div", {
      class: S([
        "image-selector__wrapper",
        { "image-selector__selected": n.state.image },
        { "drag-over": r.value }
      ]),
      onDrop: p(v, ["prevent"]),
      onDragenter: p(g, ["prevent"]),
      onDragover: p(m, ["prevent"]),
      onDragleave: p(f, ["prevent"])
    }, [
      u("div", R, [
        n.state.image ? (c(), d("div", {
          key: 0,
          class: "image-selector__reset-btn",
          onClick: _
        }, j)) : y("", !0),
        n.state.image ? (c(), d("img", {
          key: 1,
          class: "image-selector__img",
          src: s(),
          alt: "",
          onClick: i
        }, null, 8, B)) : (c(), d("div", {
          key: 2,
          class: "image-selector__placeholder",
          onClick: i
        }, F)),
        u("input", {
          onChange: a[0] || (a[0] = (...l) => n.select && n.select(...l)),
          type: "file",
          class: "image-selector__file-input",
          ref_key: "fileInput",
          ref: t
        }, null, 544)
      ])
    ], 34));
  }
}, V = /* @__PURE__ */ D(P, [["__scopeId", "data-v-d91e72d3"]]);
function q(o = {}) {
  const t = w({
    image: null,
    error: null,
    touched: !1
  }), r = w({
    onSelect: o.onSelect || null,
    onReset: o.onReset || null
  }), n = k.object({
    image: k.mixed().test("fileFormat", "Unsupported file format", (e) => {
      if (!e)
        return !0;
      const a = ["jpg", "jpeg", "png", "webp"], l = e.name.split(".").pop().toLowerCase();
      return a.includes(l);
    }).test("fileSize", "File size is too large", (e) => {
      if (!e)
        return !0;
      const a = 5 * 1024 * 1024;
      return e.size <= a;
    }).required("Please select an image file").label("Image")
  });
  function s(e) {
    r.onSelect = e;
  }
  function g(e) {
    r.onReset = e;
  }
  async function m(e) {
    let a;
    if (e.type === "change" ? a = e.target.files[0] : e.type === "drop" && (a = e.dataTransfer.files[0]), !!a)
      try {
        await n.validate({ image: a }), t.image = a, t.touched = !0, t.error = null, typeof r.onSelect == "function" && r.onSelect(t.image);
      } catch (l) {
        t.error = l.errors[0];
      }
  }
  function f() {
    t.image = null, t.error = null, t.touched = !1, typeof r.onReset == "function" && r.onReset();
  }
  function v() {
    return !!t.error;
  }
  function _() {
    return t.error;
  }
  function i(e) {
    t.error = e;
  }
  return {
    select: m,
    reset: f,
    onSelect: s,
    onReset: g,
    hasError: v,
    getError: _,
    setError: i,
    state: t
  };
}
const N = {
  install(o, t) {
    o.component("ImageSelector", V), o.config.globalProperties.$useImageSelector = q;
  }
};
export {
  N as default,
  q as useImageSelector
};
