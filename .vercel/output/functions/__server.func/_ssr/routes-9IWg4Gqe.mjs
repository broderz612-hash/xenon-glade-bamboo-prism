import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Lightbulb, c as ChartPie, d as BookOpen, f as ArrowRight, i as ListOrdered, l as ChartColumn, n as Table2, o as Divide, p as ArrowDownUp, r as Repeat, s as Check, u as ChartLine } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-9IWg4Gqe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOPICS = [
	{
		id: "rango",
		label: "Rango",
		definition: "El número más grande menos el más pequeño."
	},
	{
		id: "media",
		label: "Media",
		definition: "Sumar todo y repartir en partes iguales."
	},
	{
		id: "moda",
		label: "Moda",
		definition: "El número que más veces se repite."
	},
	{
		id: "mediana",
		label: "Mediana",
		definition: "El del centro, después de ordenar."
	},
	{
		id: "frecuencia",
		label: "Tabla de frecuencia",
		definition: "Cuántas veces aparece cada dato."
	},
	{
		id: "barras",
		label: "Gráfica de barras",
		definition: "La barra más alta es la que más tiene."
	},
	{
		id: "pastel",
		label: "Gráfica de pastel",
		definition: "El pedazo más grande es el favorito."
	},
	{
		id: "poligono",
		label: "Polígono",
		definition: "Puntos unidos: arriba hay más, abajo hay menos."
	}
];
function topicById(id) {
	const found = TOPICS.find((topic) => topic.id === id);
	if (!found) throw new Error(`Tema desconocido: ${id}`);
	return found;
}
var NAMES = [
	"Ana",
	"Leo",
	"Mia",
	"Nico",
	"Sol",
	"Teo",
	"Luz",
	"Ian"
];
var PEOPLE_SCENES = [
	{
		caption: "Canicas del grupo",
		thing: "canicas",
		art: "estas"
	},
	{
		caption: "Páginas leídas",
		thing: "páginas",
		art: "estas"
	},
	{
		caption: "Flores en macetas",
		thing: "flores",
		art: "estas"
	},
	{
		caption: "Puntos del juego",
		thing: "puntos",
		art: "estos"
	}
];
var COUNT_SETS = [
	{
		title: "Fruta favorita",
		unit: "niños",
		labels: [
			"Manzana",
			"Pera",
			"Uva",
			"Kiwi"
		]
	},
	{
		title: "Mascota en casa",
		unit: "niños",
		labels: [
			"Perro",
			"Gato",
			"Pez",
			"Ave"
		]
	},
	{
		title: "Juguete preferido",
		unit: "niños",
		labels: [
			"Pelota",
			"Carro",
			"Oso",
			"Bloques"
		]
	},
	{
		title: "Merienda de hoy",
		unit: "niños",
		labels: [
			"Pan",
			"Jugo",
			"Fruta",
			"Queso"
		]
	}
];
var DAYS = [
	"Lun",
	"Mar",
	"Mié",
	"Jue",
	"Vie"
];
var DAY_NOTE = "Lun lunes · Mar martes · Mié miércoles · Jue jueves · Vie viernes";
var WEEK_SETS = [
	{
		title: "Estrellas de la semana",
		unit: "estrellas"
	},
	{
		title: "Libros leídos",
		unit: "libros"
	},
	{
		title: "Vueltas en el recreo",
		unit: "vueltas"
	}
];
function createRng(seed) {
	let a = seed >>> 0 || 1;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pick(rng, items) {
	return items[Math.floor(rng() * items.length)];
}
function shuffle(rng, items) {
	const arr = [...items];
	for (let i = arr.length - 1; i > 0; i -= 1) {
		const j = Math.floor(rng() * (i + 1));
		const swap = arr[i];
		arr[i] = arr[j];
		arr[j] = swap;
	}
	return arr;
}
function distinctNumbers(rng, count, min, max) {
	return shuffle(rng, Array.from({ length: max - min + 1 }, (_, index) => min + index)).slice(0, count);
}
function makeId(rng, topic) {
	return `${topic}-${Math.floor(rng() * 1e9)}`;
}
function asChoices(rng, correct, wrongs) {
	const labels = [];
	for (const label of [correct, ...wrongs]) {
		if (!labels.includes(label)) labels.push(label);
		if (labels.length === 4) break;
	}
	const choices = shuffle(rng, labels).map((label, index) => ({
		id: `c${index}`,
		label
	}));
	const answer = choices.find((choice) => choice.label === correct);
	if (!answer) throw new Error(`Respuesta ausente: ${correct}`);
	return {
		choices,
		answerId: answer.id
	};
}
function numericWrongs(correct, preferred = []) {
	const wrongs = [];
	for (const value of preferred) if (value !== correct && value >= 0 && !wrongs.includes(String(value))) wrongs.push(String(value));
	for (const delta of [
		1,
		-1,
		2,
		-2,
		3,
		-3,
		4,
		5,
		-4,
		6,
		-5
	]) {
		const value = correct + delta;
		if (value >= 0 && value !== correct && !wrongs.includes(String(value))) wrongs.push(String(value));
		if (wrongs.length >= 3) break;
	}
	return wrongs.slice(0, 3);
}
function base(rng, topic, prompt, help, visual, correct, wrongs, explanation) {
	const packed = asChoices(rng, correct, wrongs);
	return {
		id: makeId(rng, topic),
		topic,
		prompt,
		help,
		visual,
		choices: packed.choices,
		answerId: packed.answerId,
		explanation
	};
}
function peopleVisual(rng, values, caption) {
	const names = shuffle(rng, NAMES).slice(0, values.length);
	return {
		kind: "people",
		caption,
		people: values.map((value, index) => ({
			name: names[index],
			value
		}))
	};
}
function balancedTriple(rng) {
	for (let attempt = 0; attempt < 30; attempt += 1) {
		const mean = 3 + Math.floor(rng() * 4);
		const values = [
			mean,
			mean,
			mean
		];
		let moved = false;
		for (let step = 0; step < 2; step += 1) {
			const i = Math.floor(rng() * 3);
			const j = (i + 1 + Math.floor(rng() * 2)) % 3;
			const maxDelta = Math.min(values[j] - 1, 12 - values[i], 3);
			if (maxDelta >= 1) {
				const delta = 1 + Math.floor(rng() * maxDelta);
				values[i] = values[i] + delta;
				values[j] = values[j] - delta;
				moved = true;
			}
		}
		if (moved && values.every((value) => value >= 1 && value <= 12)) return {
			values: shuffle(rng, values),
			mean
		};
	}
	return {
		values: [
			2,
			4,
			6
		],
		mean: 4
	};
}
function ensureUniqueMin(points) {
	const next = points.map((point) => ({ ...point }));
	const min = Math.min(...next.map((point) => point.value));
	const indexes = next.flatMap((point, index) => point.value === min ? [index] : []);
	if (indexes.length <= 1) return next;
	for (const index of indexes.slice(1)) {
		const point = next[index];
		if (point) point.value = min + 1;
	}
	return next;
}
function ensureUniqueMax(points) {
	const next = points.map((point) => ({ ...point }));
	const max = Math.max(...next.map((point) => point.value));
	const indexes = next.flatMap((point, index) => point.value === max ? [index] : []);
	if (indexes.length <= 1) return next;
	const winner = next[indexes[0]];
	if (winner) winner.value = max + 1;
	return next;
}
function countedPoints(rng, labels) {
	let points = labels.map((label) => ({
		label,
		value: 1 + Math.floor(rng() * 5)
	}));
	points = ensureUniqueMin(points);
	points = ensureUniqueMax(points);
	return points;
}
function piePoints(rng, labels) {
	for (let attempt = 0; attempt < 40; attempt += 1) {
		let points = labels.map((label) => ({
			label,
			value: 2 + Math.floor(rng() * 4)
		}));
		points = ensureUniqueMin(points);
		points = ensureUniqueMax(points);
		const desc = [...points].sort((a, b) => b.value - a.value);
		const asc = [...points].sort((a, b) => a.value - b.value);
		const top = desc[0];
		const second = desc[1];
		const low = asc[0];
		const nextLow = asc[1];
		if (top && second && low && nextLow && top.value >= second.value + 2 && low.value < nextLow.value && top.label !== low.label) return points;
	}
	return labels.map((label, index) => ({
		label,
		value: [
			6,
			3,
			1
		][index] ?? 1
	}));
}
function extreme(points, which) {
	const sorted = [...points].sort((a, b) => a.value - b.value);
	const point = which === "max" ? sorted[sorted.length - 1] : sorted[0];
	if (!point) throw new Error("Serie vacía");
	return point;
}
function twoDifferent(rng, points) {
	const pairs = [];
	for (let i = 0; i < points.length; i += 1) for (let j = i + 1; j < points.length; j += 1) {
		const left = points[i];
		const right = points[j];
		if (left && right && left.value !== right.value) pairs.push([left, right]);
	}
	const wide = pairs.filter(([left, right]) => Math.abs(left.value - right.value) >= 2);
	const pool = wide.length > 0 ? wide : pairs;
	if (pool.length === 0) throw new Error("No hay pares distintos");
	return pick(rng, pool);
}
function qRango(rng) {
	const scene = pick(rng, PEOPLE_SCENES);
	const values = distinctNumbers(rng, 5, 1, 12);
	const max = Math.max(...values);
	const min = Math.min(...values);
	const range = max - min;
	return base(rng, "rango", `¿Cuál es el rango de ${scene.art} ${scene.thing}?`, "Rango = el más grande menos el más pequeño.", peopleVisual(rng, values, scene.caption), String(range), numericWrongs(range), `El más grande es ${max} y el más pequeño es ${min}. ${max} − ${min} = ${range}.`);
}
function qMedia(rng) {
	const scene = pick(rng, PEOPLE_SCENES);
	const { values, mean } = balancedTriple(rng);
	const sum = values.reduce((total, value) => total + value, 0);
	return base(rng, "media", `¿Cuál es la media de ${scene.art} ${scene.thing}?`, "Suma los números y repártelos entre las 3 personas.", peopleVisual(rng, values, scene.caption), String(mean), numericWrongs(mean, values), `Sumamos ${values.join(" + ")} = ${sum}. ${sum} entre 3 es ${mean}.`);
}
function qModa(rng) {
	const scene = pick(rng, PEOPLE_SCENES);
	const mode = 1 + Math.floor(rng() * 8);
	const others = distinctNumbers(rng, 4, 1, 9).filter((value) => value !== mode);
	const second = others[0] ?? (mode === 1 ? 2 : 1);
	const third = others[1] ?? (second === 9 ? 8 : second + 1);
	const values = shuffle(rng, [
		mode,
		mode,
		mode,
		second,
		second,
		third
	]);
	return base(rng, "moda", `¿Cuál es la moda de ${scene.art} ${scene.thing}?`, "La moda es el número que más se repite. Cuéntalos.", peopleVisual(rng, values, scene.caption), String(mode), numericWrongs(mode, [second, third]), `${mode} se repite 3 veces. ${second} se repite 2 y ${third} solo 1.`);
}
function qMediana(rng) {
	const scene = pick(rng, PEOPLE_SCENES);
	const values = distinctNumbers(rng, 5, 1, 12);
	const sorted = [...values].sort((a, b) => a - b);
	const median = sorted[2];
	return base(rng, "mediana", `¿Cuál es la mediana de ${scene.art} ${scene.thing}?`, "Ordénalos de menor a mayor. Con 5 números, el tercero es el centro.", peopleVisual(rng, values, scene.caption), String(median), numericWrongs(median, values), `De menor a mayor: ${sorted.join(", ")}. El del centro es ${median}.`);
}
function qFrecuencia(rng) {
	const set = pick(rng, COUNT_SETS);
	const points = countedPoints(rng, set.labels);
	const roll = rng();
	const visual = {
		kind: "table",
		title: set.title,
		unit: set.unit,
		points
	};
	if (roll < .34) {
		const row = pick(rng, points);
		return base(rng, "frecuencia", `¿Cuántos hay en ${row.label}?`, "Busca esa fila y lee el número.", visual, String(row.value), numericWrongs(row.value, points.map((point) => point.value)), `En la fila de ${row.label} el número es ${row.value}.`);
	}
	if (roll < .67) {
		const sum = points.reduce((total, point) => total + point.value, 0);
		return base(rng, "frecuencia", "¿Cuántos hay en total?", "Suma el número de todas las filas.", visual, String(sum), numericWrongs(sum, points.map((point) => point.value)), `Sumamos ${points.map((point) => point.value).join(" + ")} = ${sum}.`);
	}
	const winner = extreme(points, "max");
	return base(rng, "frecuencia", "¿Dónde hay más?", "Es la fila con el número más grande.", visual, winner.label, points.map((point) => point.label), `${winner.label} tiene ${winner.value}, más que las otras filas.`);
}
function qBarras(rng) {
	const set = pick(rng, COUNT_SETS);
	const points = countedPoints(rng, set.labels);
	const roll = rng();
	const visual = {
		kind: "bars",
		title: set.title,
		unit: set.unit,
		points
	};
	if (roll < .34) {
		const row = pick(rng, points);
		return base(rng, "barras", `¿Cuántos hay en ${row.label}?`, "Lee el número encima de esa barra.", visual, String(row.value), numericWrongs(row.value, points.map((point) => point.value)), `La barra de ${row.label} llega hasta ${row.value}.`);
	}
	if (roll < .67) {
		const winner = extreme(points, "max");
		return base(rng, "barras", "¿Dónde hay más?", "La barra más alta es la que más tiene.", visual, winner.label, points.map((point) => point.label), `La barra más alta es ${winner.label}, con ${winner.value}.`);
	}
	const [left, right] = twoDifferent(rng, points);
	const higher = left.value > right.value ? left : right;
	const lower = left.value > right.value ? right : left;
	const diff = higher.value - lower.value;
	return base(rng, "barras", `${higher.label} tiene más que ${lower.label}. ¿Cuántos más?`, "Resta el número menor al mayor.", visual, String(diff), numericWrongs(diff, [higher.value, lower.value]), `${higher.label} tiene ${higher.value} y ${lower.label} tiene ${lower.value}. ${higher.value} − ${lower.value} = ${diff}.`);
}
function qPastel(rng) {
	const set = pick(rng, COUNT_SETS);
	const points = piePoints(rng, set.labels.slice(0, 3));
	const visual = {
		kind: "pie",
		title: set.title,
		unit: set.unit,
		points
	};
	const wantMin = rng() < .5;
	const chosen = extreme(points, wantMin ? "min" : "max");
	return base(rng, "pastel", wantMin ? "¿Dónde hay menos?" : "¿Dónde hay más?", wantMin ? "El pedazo más pequeño del pastel es el que menos tiene." : "El pedazo más grande del pastel es el que más tiene.", visual, chosen.label, points.map((point) => point.label), wantMin ? `El pedazo más pequeño es ${chosen.label}.` : `El pedazo más grande es ${chosen.label}.`);
}
function qPoligono(rng) {
	const set = pick(rng, WEEK_SETS);
	let points = DAYS.map((label) => ({
		label,
		value: 1 + Math.floor(rng() * 5)
	}));
	points = ensureUniqueMin(points);
	points = ensureUniqueMax(points);
	const visual = {
		kind: "polygon",
		title: set.title,
		unit: set.unit,
		note: DAY_NOTE,
		points
	};
	const roll = rng();
	if (roll < .34) {
		const winner = extreme(points, "max");
		const wrongDays = shuffle(rng, points.filter((point) => point.label !== winner.label).map((point) => point.label)).slice(0, 3);
		return base(rng, "poligono", "¿Dónde hay más?", "Es el punto más alto del polígono.", visual, winner.label, wrongDays, `El punto más alto es ${winner.label}, con ${winner.value}.`);
	}
	if (roll < .67) {
		const row = pick(rng, points);
		return base(rng, "poligono", `¿Cuántos hay en ${row.label}?`, "Busca ese día y lee el número del punto.", visual, String(row.value), numericWrongs(row.value, points.map((point) => point.value)), `El punto de ${row.label} está en ${row.value}.`);
	}
	const index = Math.floor(rng() * (points.length - 1));
	const from = points[index];
	const to = points[index + 1];
	const relation = to.value > from.value ? "Sube" : to.value < from.value ? "Baja" : "Queda igual";
	const verb = relation === "Sube" ? "sube" : relation === "Baja" ? "baja" : "queda igual";
	return base(rng, "poligono", `De ${from.label} a ${to.label}, ¿la línea sube, baja o queda igual?`, "Si el segundo punto está más arriba, sube. Si está más abajo, baja.", visual, relation, [
		"Sube",
		"Baja",
		"Queda igual"
	], `${from.label} está en ${from.value} y ${to.label} está en ${to.value}. La línea ${verb}.`);
}
var MAKERS = {
	rango: qRango,
	media: qMedia,
	moda: qModa,
	mediana: qMediana,
	frecuencia: qFrecuencia,
	barras: qBarras,
	pastel: qPastel,
	poligono: qPoligono
};
function buildQuiz(seed) {
	const rng = createRng(seed);
	return shuffle(rng, TOPICS.map((topic) => MAKERS[topic.id](rng)));
}
function buildPractice(topic, seed) {
	const rng = createRng(seed);
	const make = MAKERS[topic];
	return Array.from({ length: 5 }, () => make(rng));
}
var QuestionVisual = (0, import_react.lazy)(() => import("./visuals-Dg60obwU.mjs"));
var STORAGE_KEY = "cuaderno-datos-best-v1";
var ICONS = {
	rango: ArrowDownUp,
	media: Divide,
	moda: Repeat,
	mediana: ListOrdered,
	frecuencia: Table2,
	barras: ChartColumn,
	pastel: ChartPie,
	poligono: ChartLine
};
function readBest() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.score === "number" && typeof parsed.total === "number") return {
			score: parsed.score,
			total: parsed.total
		};
	} catch {
		return null;
	}
	return null;
}
function choiceLabel(question, id) {
	return question.choices.find((choice) => choice.id === id)?.label ?? "";
}
function headline(score, total) {
	const ratio = total === 0 ? 0 : score / total;
	if (ratio === 1) return "¡Todo correcto!";
	if (ratio >= .75) return "¡Muy bien!";
	if (ratio >= .5) return "Buen camino";
	return "Vamos otra vez";
}
function subline(score, total) {
	const ratio = total === 0 ? 0 : score / total;
	if (ratio === 1) return "Leíste cada número y cada gráfica.";
	if (ratio >= .75) return "Solo faltaron unos detalles.";
	if (ratio >= .5) return "Revisa las explicaciones y vuelve a intentar.";
	return "Lee la pista verde: te dice cómo pensar la pregunta.";
}
function QuizApp() {
	const [screen, setScreen] = (0, import_react.useState)("home");
	const [mode, setMode] = (0, import_react.useState)({ kind: "mix" });
	const [questions, setQuestions] = (0, import_react.useState)([]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("answer");
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [log, setLog] = (0, import_react.useState)([]);
	const [best, setBest] = (0, import_react.useState)(null);
	const [isRecord, setIsRecord] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setBest(readBest());
	}, []);
	(0, import_react.useEffect)(() => {
		import("./visuals-Dg60obwU.mjs");
	}, []);
	(0, import_react.useEffect)(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({
			top: 0,
			behavior: reduce ? "auto" : "smooth"
		});
	}, [screen, index]);
	function start(nextMode) {
		const seed = Math.floor(Math.random() * 1e9) + 1;
		const nextQuestions = nextMode.kind === "mix" ? buildQuiz(seed) : buildPractice(nextMode.topic, seed);
		setMode(nextMode);
		setQuestions(nextQuestions);
		setIndex(0);
		setPhase("answer");
		setPicked(null);
		setLog([]);
		setIsRecord(false);
		setScreen("play");
	}
	function goHome() {
		setScreen("home");
		setPhase("answer");
		setPicked(null);
	}
	function choose(id) {
		if (phase !== "answer") return;
		const question = questions[index];
		if (!question) return;
		setPicked(id);
		setPhase("reveal");
		setLog((prev) => [...prev, {
			question,
			pickedId: id,
			ok: id === question.answerId
		}]);
	}
	function finish(finalLog) {
		const score = finalLog.filter((item) => item.ok).length;
		if (mode.kind === "mix") {
			const prev = readBest();
			if (!prev || score > prev.score) {
				const nextBest = {
					score,
					total: finalLog.length
				};
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBest));
				} catch {}
				setBest(nextBest);
				setIsRecord(true);
			} else setIsRecord(false);
		} else setIsRecord(false);
		setScreen("done");
	}
	function next() {
		if (index + 1 >= questions.length) {
			finish(log);
			return;
		}
		setIndex((current) => current + 1);
		setPhase("answer");
		setPicked(null);
	}
	const question = questions[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto min-h-screen w-full max-w-xl border-l-8 border-accent px-4 py-6 sm:px-8 sm:py-10",
		children: screen === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {
			best,
			onStart: start
		}) : screen === "play" && question ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayScreen, {
			mode,
			question,
			index,
			total: questions.length,
			phase,
			picked,
			onChoose: choose,
			onNext: next,
			onExit: goHome
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoneScreen, {
			mode,
			log,
			isRecord,
			onAgain: () => start(mode),
			onHome: goHome
		})
	});
}
function HomeScreen({ best, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
						className: "size-6",
						"aria-hidden": true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-extrabold tracking-wide text-primary uppercase",
					children: "Matemáticas · 2.º grado"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl leading-none text-ink",
					children: "Cuaderno de Datos"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg leading-relaxed text-ink",
				children: "Preguntas nuevas cada vez sobre rango, media, moda, mediana, tablas y gráficas. Los números son chicos, para contar y leer sin apuro."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onStart({ kind: "mix" }),
					className: "flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-lg font-extrabold text-surface",
					children: ["Empezar cuestionario", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-5",
						"aria-hidden": true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm font-bold text-muted",
					children: "8 preguntas · un tema cada una"
				}),
				best ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-center text-sm font-extrabold text-primary tabular-nums",
					children: [
						"Mejor marca: ",
						best.score,
						" de ",
						best.total
					]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-2xl text-ink",
					children: "Practicar un tema"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
					children: TOPICS.map((topic) => {
						const Icon = ICONS[topic.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onStart({
								kind: "topic",
								topic: topic.id
							}),
							className: "flex min-h-16 flex-col items-start gap-1 rounded-2xl border border-line bg-surface px-4 py-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 font-extrabold text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4 text-primary",
									"aria-hidden": true
								}), topic.label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold leading-snug text-muted",
								children: topic.definition
							})]
						}, topic.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm font-bold text-muted",
					children: "5 preguntas del tema que elijas."
				})
			] })
		]
	});
}
function PlayScreen({ mode, question, index, total, phase, picked, onChoose, onNext, onExit }) {
	const meta = topicById(question.topic);
	const Icon = ICONS[question.topic];
	const progress = (index + (phase === "reveal" ? 1 : 0)) / total * 100;
	const ok = picked === question.answerId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex max-w-[70%] items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-sm font-extrabold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-4 shrink-0",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: meta.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-extrabold text-muted tabular-nums",
					children: [
						index + 1,
						"/",
						total
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 overflow-hidden rounded-full bg-primary-soft",
				role: "progressbar",
				"aria-valuemin": 1,
				"aria-valuemax": total,
				"aria-valuenow": index + 1,
				"aria-label": mode.kind === "mix" ? "Cuestionario" : "Práctica",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary",
					style: { width: `${progress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl leading-tight text-ink",
				children: question.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-52 animate-pulse rounded-2xl bg-primary-soft",
					"aria-hidden": true
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionVisual, { visual: question.visual })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 rounded-2xl bg-primary-soft px-3 py-3 text-sm leading-snug font-bold text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
					className: "mt-0.5 size-4 shrink-0 text-primary",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: question.help })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				role: "group",
				"aria-label": "Opciones",
				children: question.choices.map((choice, choiceIndex) => {
					const letter = String.fromCharCode(65 + choiceIndex);
					let state = "idle";
					if (phase === "reveal") {
						if (choice.id === question.answerId) state = "correct";
						else if (choice.id === picked) state = "wrong";
						else state = "missed";
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: phase === "reveal",
						onClick: () => onChoose(choice.id),
						className: `flex min-h-14 w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left text-lg font-extrabold ${state === "correct" ? "border-primary bg-primary text-surface" : state === "wrong" ? "border-accent bg-accent-soft text-ink" : state === "missed" ? "border-line bg-surface text-muted" : "border-line bg-surface text-ink hover:border-primary hover:bg-primary-soft"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `flex size-9 shrink-0 items-center justify-center rounded-full font-display text-base ${state === "correct" ? "bg-surface text-primary" : "bg-bg text-ink"}`,
							children: letter
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: choice.label
						})]
					}, choice.id);
				})
			}),
			phase === "reveal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				className: `rounded-2xl border px-4 py-3 ${ok ? "border-primary bg-primary-soft" : "border-accent bg-accent-soft"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 font-extrabold text-ink",
						children: [ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-5 text-primary",
							"aria-hidden": true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
							className: "size-5 text-accent",
							"aria-hidden": true
						}), ok ? "¡Correcto!" : "Casi. Mira el paso."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 leading-relaxed font-bold text-ink",
						children: question.explanation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onNext,
						className: "mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 font-extrabold text-surface",
						children: [index + 1 === total ? "Ver resultado" : "Siguiente", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-5",
							"aria-hidden": true
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onExit,
				className: "mx-auto text-sm font-extrabold text-muted",
				children: "Salir al inicio"
			})
		]
	});
}
function DoneScreen({ mode, log, isRecord, onAgain, onHome }) {
	const score = log.filter((item) => item.ok).length;
	const total = log.length;
	const missed = [...new Set(log.filter((item) => !item.ok).map((item) => topicById(item.question.topic).label))];
	const title = mode.kind === "mix" ? "Cuestionario completo" : `Práctica de ${topicById(mode.topic).label}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-extrabold tracking-wide text-primary uppercase",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl text-ink",
					children: headline(score, total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg font-bold text-ink",
					children: subline(score, total)
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-surface px-4 py-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-6xl tabular-nums text-primary",
						children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-3xl text-muted",
							children: ["/", total]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap justify-center gap-1.5",
						"aria-hidden": true,
						children: [log.map((item, dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-3.5 rounded-full ${item.ok ? "bg-primary" : "bg-accent"}` }, item.question.id)), log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: "Sin respuestas"
						}) : null]
					}),
					isRecord ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-extrabold text-primary",
						children: "Nueva mejor marca en este aparato."
					}) : null,
					missed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-bold text-ink",
						children: [
							"Para repasar: ",
							missed.join(", "),
							"."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-bold text-ink",
						children: "En este intento no fallaste ningún tema."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: log.map((item) => {
					const yours = choiceLabel(item.question, item.pickedId);
					const right = choiceLabel(item.question, item.question.answerId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						open: !item.ok,
						className: "rounded-2xl border border-line bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "font-extrabold text-ink",
							children: [
								item.ok ? "Correcto" : "Para repasar",
								" · ",
								topicById(item.question.topic).label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-1 text-sm leading-relaxed font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.question.prompt }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Tu respuesta: ", yours] }),
								item.ok ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Respuesta: ", right] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted",
									children: item.question.explanation
								})
							]
						})]
					}, item.question.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onAgain,
					className: "flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary px-4 text-lg font-extrabold text-surface",
					children: mode.kind === "mix" ? "Nuevo cuestionario" : "Otras 5 preguntas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onHome,
					className: "flex min-h-14 w-full items-center justify-center rounded-2xl border border-line bg-surface px-4 text-lg font-extrabold text-ink",
					children: "Volver al inicio"
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizApp, {});
}
//#endregion
export { Home as component };
