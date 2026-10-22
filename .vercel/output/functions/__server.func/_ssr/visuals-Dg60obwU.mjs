import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as XAxis, c as Bar, d as Cell, f as ResponsiveContainer, i as YAxis, l as Pie, n as BarChart, o as Line, r as LineChart, s as CartesianGrid, t as PieChart, u as LabelList } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/visuals-Dg60obwU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PIE_COLORS = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)"
];
function useMotion() {
	const [on, setOn] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setOn(!media.matches);
		sync();
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);
	return on;
}
function ChartHeading({ title, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl text-ink",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-bold text-muted",
			children: ["Cantidad de ", unit]
		})]
	});
}
function SeriesText({ points }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "sr-only",
		children: points.map((point) => `${point.label}: ${point.value}`).join(". ")
	});
}
function PeopleCards({ visual }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-2xl border border-line bg-surface px-3 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mb-3 text-center text-sm font-extrabold tracking-wide text-primary uppercase",
			children: visual.caption
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: visual.people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-20 flex-col items-center rounded-2xl bg-primary-soft px-2 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-extrabold text-muted",
					children: person.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-3xl tabular-nums text-ink",
					children: person.value
				})]
			}, person.name))
		})]
	});
}
function FrequencyTable({ visual }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-2xl border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "border-b border-line bg-primary-soft px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartHeading, {
				title: visual.title,
				unit: visual.unit
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full border-collapse text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-extrabold",
						children: "Dato"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 font-extrabold",
						children: "Conteo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-2 text-right font-extrabold",
						children: "Número"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visual.points.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: index % 2 === 1 ? "bg-bg" : "bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "row",
						className: "px-4 py-3 font-extrabold text-ink",
						children: point.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex flex-wrap gap-1",
							"aria-hidden": true,
							children: Array.from({ length: point.value }, (_, dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3.5 rounded-full bg-primary" }, dot))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 text-right font-display text-2xl tabular-nums text-ink",
						children: point.value
					})
				]
			}, point.label)) })]
		})]
	});
}
function HaloValue({ x, y, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: Number(x ?? 0),
		y: Number(y ?? 0) - 16,
		textAnchor: "middle",
		fill: "var(--color-ink)",
		fontSize: 14,
		fontWeight: 800,
		stroke: "var(--color-surface)",
		strokeWidth: 6,
		paintOrder: "stroke",
		fontFamily: "Nunito, sans-serif",
		children: value
	});
}
var axisTick = {
	fill: "var(--color-muted)",
	fontSize: 13,
	fontWeight: 700,
	fontFamily: "Nunito, sans-serif"
};
function BarVisual({ visual }) {
	const motion = useMotion();
	const max = Math.max(...visual.points.map((point) => point.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-2xl border border-line bg-surface px-2 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartHeading, {
					title: visual.title,
					unit: visual.unit
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesText, { points: visual.points }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-56 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: visual.points,
						margin: {
							top: 28,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: axisTick,
								interval: 0,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								width: 32,
								domain: [0, max + 1],
								tick: axisTick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "value",
								fill: "var(--color-primary)",
								radius: [
									8,
									8,
									0,
									0
								],
								maxBarSize: 56,
								isAnimationActive: motion,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
									dataKey: "value",
									position: "top",
									fill: "var(--color-ink)",
									fontSize: 14,
									fontWeight: 800
								})
							})
						]
					})
				})
			})
		]
	});
}
function PieVisual({ visual }) {
	const motion = useMotion();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-2xl border border-line bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "px-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartHeading, {
					title: visual.title,
					unit: visual.unit
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesText, { points: visual.points }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-52 w-full max-w-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: visual.points,
						dataKey: "value",
						nameKey: "label",
						cx: "50%",
						cy: "50%",
						outerRadius: 86,
						startAngle: 90,
						endAngle: -270,
						stroke: "var(--color-surface)",
						strokeWidth: 3,
						isAnimationActive: motion,
						children: visual.points.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE_COLORS[index % PIE_COLORS.length] }, point.label))
					}) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 flex flex-wrap justify-center gap-2",
				children: visual.points.map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-sm font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-3.5 rounded-full",
						style: { background: PIE_COLORS[index % PIE_COLORS.length] },
						"aria-hidden": true
					}), point.label]
				}, point.label))
			})
		]
	});
}
function PolygonVisual({ visual }) {
	const motion = useMotion();
	const max = Math.max(...visual.points.map((point) => point.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-2xl border border-line bg-surface px-2 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartHeading, {
					title: visual.title,
					unit: visual.unit
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeriesText, { points: visual.points }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-56 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: visual.points,
						margin: {
							top: 28,
							right: 16,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-line)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: axisTick,
								interval: 0,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								width: 32,
								domain: [0, max + 1],
								tick: axisTick,
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "linear",
								dataKey: "value",
								stroke: "var(--color-primary)",
								strokeWidth: 3,
								isAnimationActive: motion,
								dot: {
									r: 6,
									fill: "var(--color-accent)",
									stroke: "var(--color-primary)",
									strokeWidth: 2
								},
								activeDot: { r: 7 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
									dataKey: "value",
									content: HaloValue
								})
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 pt-1 text-sm font-bold text-muted",
				children: visual.note
			})
		]
	});
}
function QuestionVisual({ visual }) {
	switch (visual.kind) {
		case "people": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleCards, { visual });
		case "table": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrequencyTable, { visual });
		case "bars": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarVisual, { visual });
		case "pie": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieVisual, { visual });
		case "polygon": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolygonVisual, { visual });
	}
}
//#endregion
export { QuestionVisual as default };
