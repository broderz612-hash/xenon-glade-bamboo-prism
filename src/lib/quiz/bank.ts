export type TopicId =
  | "rango"
  | "media"
  | "moda"
  | "mediana"
  | "frecuencia"
  | "barras"
  | "pastel"
  | "poligono";

export type SeriesPoint = { label: string; value: number };

export type Visual =
  | { kind: "people"; caption: string; people: { name: string; value: number }[] }
  | { kind: "bars"; title: string; unit: string; points: SeriesPoint[] }
  | { kind: "pie"; title: string; unit: string; points: SeriesPoint[] }
  | { kind: "polygon"; title: string; unit: string; note: string; points: SeriesPoint[] }
  | { kind: "table"; title: string; unit: string; points: SeriesPoint[] };

export type Choice = { id: string; label: string };

export type Question = {
  id: string;
  topic: TopicId;
  prompt: string;
  help: string;
  visual: Visual;
  choices: Choice[];
  answerId: string;
  explanation: string;
};

export type TopicMeta = {
  id: TopicId;
  label: string;
  definition: string;
};

export const TOPICS: TopicMeta[] = [
  {
    id: "rango",
    label: "Rango",
    definition: "El número más grande menos el más pequeño.",
  },
  {
    id: "media",
    label: "Media",
    definition: "Sumar todo y repartir en partes iguales.",
  },
  {
    id: "moda",
    label: "Moda",
    definition: "El número que más veces se repite.",
  },
  {
    id: "mediana",
    label: "Mediana",
    definition: "El del centro, después de ordenar.",
  },
  {
    id: "frecuencia",
    label: "Tabla de frecuencia",
    definition: "Cuántas veces aparece cada dato.",
  },
  {
    id: "barras",
    label: "Gráfica de barras",
    definition: "La barra más alta es la que más tiene.",
  },
  {
    id: "pastel",
    label: "Gráfica de pastel",
    definition: "El pedazo más grande es el favorito.",
  },
  {
    id: "poligono",
    label: "Polígono",
    definition: "Puntos unidos: arriba hay más, abajo hay menos.",
  },
];

export function topicById(id: TopicId): TopicMeta {
  const found = TOPICS.find((topic) => topic.id === id);
  if (!found) throw new Error(`Tema desconocido: ${id}`);
  return found;
}

type Rng = () => number;

const NAMES = ["Ana", "Leo", "Mia", "Nico", "Sol", "Teo", "Luz", "Ian"] as const;

const PEOPLE_SCENES = [
  { caption: "Canicas del grupo", thing: "canicas", art: "estas" },
  { caption: "Páginas leídas", thing: "páginas", art: "estas" },
  { caption: "Flores en macetas", thing: "flores", art: "estas" },
  { caption: "Puntos del juego", thing: "puntos", art: "estos" },
] as const;

type CountSet = {
  title: string;
  unit: string;
  labels: string[];
};

const COUNT_SETS: CountSet[] = [
  { title: "Fruta favorita", unit: "niños", labels: ["Manzana", "Pera", "Uva", "Kiwi"] },
  { title: "Mascota en casa", unit: "niños", labels: ["Perro", "Gato", "Pez", "Ave"] },
  { title: "Juguete preferido", unit: "niños", labels: ["Pelota", "Carro", "Oso", "Bloques"] },
  { title: "Merienda de hoy", unit: "niños", labels: ["Pan", "Jugo", "Fruta", "Queso"] },
];

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie"] as const;

const DAY_NOTE = "Lun lunes · Mar martes · Mié miércoles · Jue jueves · Vie viernes";

const WEEK_SETS = [
  { title: "Estrellas de la semana", unit: "estrellas" },
  { title: "Libros leídos", unit: "libros" },
  { title: "Vueltas en el recreo", unit: "vueltas" },
] as const;

function createRng(seed: number): Rng {
  let a = seed >>> 0 || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)] as T;
}

function shuffle<T>(rng: Rng, items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const swap = arr[i] as T;
    arr[i] = arr[j] as T;
    arr[j] = swap;
  }
  return arr;
}

function distinctNumbers(rng: Rng, count: number, min: number, max: number): number[] {
  const pool = shuffle(
    rng,
    Array.from({ length: max - min + 1 }, (_, index) => min + index),
  );
  return pool.slice(0, count);
}

function makeId(rng: Rng, topic: TopicId): string {
  return `${topic}-${Math.floor(rng() * 1_000_000_000)}`;
}

function asChoices(
  rng: Rng,
  correct: string,
  wrongs: string[],
): { choices: Choice[]; answerId: string } {
  const labels: string[] = [];
  for (const label of [correct, ...wrongs]) {
    if (!labels.includes(label)) labels.push(label);
    if (labels.length === 4) break;
  }
  const shuffled = shuffle(rng, labels);
  const choices = shuffled.map((label, index) => ({ id: `c${index}`, label }));
  const answer = choices.find((choice) => choice.label === correct);
  if (!answer) throw new Error(`Respuesta ausente: ${correct}`);
  return { choices, answerId: answer.id };
}

function numericWrongs(correct: number, preferred: number[] = []): string[] {
  const wrongs: string[] = [];
  for (const value of preferred) {
    if (value !== correct && value >= 0 && !wrongs.includes(String(value))) {
      wrongs.push(String(value));
    }
  }
  for (const delta of [1, -1, 2, -2, 3, -3, 4, 5, -4, 6, -5]) {
    const value = correct + delta;
    if (value >= 0 && value !== correct && !wrongs.includes(String(value))) {
      wrongs.push(String(value));
    }
    if (wrongs.length >= 3) break;
  }
  return wrongs.slice(0, 3);
}

function base(
  rng: Rng,
  topic: TopicId,
  prompt: string,
  help: string,
  visual: Visual,
  correct: string,
  wrongs: string[],
  explanation: string,
): Question {
  const packed = asChoices(rng, correct, wrongs);
  return {
    id: makeId(rng, topic),
    topic,
    prompt,
    help,
    visual,
    choices: packed.choices,
    answerId: packed.answerId,
    explanation,
  };
}

function peopleVisual(
  rng: Rng,
  values: number[],
  caption: string,
): Extract<Visual, { kind: "people" }> {
  const names = shuffle(rng, NAMES).slice(0, values.length);
  return {
    kind: "people",
    caption,
    people: values.map((value, index) => ({ name: names[index] as string, value })),
  };
}

function balancedTriple(rng: Rng): { values: number[]; mean: number } {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const mean = 3 + Math.floor(rng() * 4);
    const values = [mean, mean, mean];
    let moved = false;
    for (let step = 0; step < 2; step += 1) {
      const i = Math.floor(rng() * 3);
      const j = (i + 1 + Math.floor(rng() * 2)) % 3;
      const maxDelta = Math.min(values[j] as number - 1, 12 - (values[i] as number), 3);
      if (maxDelta >= 1) {
        const delta = 1 + Math.floor(rng() * maxDelta);
        values[i] = (values[i] as number) + delta;
        values[j] = (values[j] as number) - delta;
        moved = true;
      }
    }
    if (moved && values.every((value) => value >= 1 && value <= 12)) {
      return { values: shuffle(rng, values), mean };
    }
  }
  return { values: [2, 4, 6], mean: 4 };
}

function ensureUniqueMin(points: SeriesPoint[]): SeriesPoint[] {
  const next = points.map((point) => ({ ...point }));
  const min = Math.min(...next.map((point) => point.value));
  const indexes = next.flatMap((point, index) => (point.value === min ? [index] : []));
  if (indexes.length <= 1) return next;
  for (const index of indexes.slice(1)) {
    const point = next[index];
    if (point) point.value = min + 1;
  }
  return next;
}

function ensureUniqueMax(points: SeriesPoint[]): SeriesPoint[] {
  const next = points.map((point) => ({ ...point }));
  const max = Math.max(...next.map((point) => point.value));
  const indexes = next.flatMap((point, index) => (point.value === max ? [index] : []));
  if (indexes.length <= 1) return next;
  const winner = next[indexes[0] as number];
  if (winner) winner.value = max + 1;
  return next;
}

function countedPoints(rng: Rng, labels: readonly string[]): SeriesPoint[] {
  let points = labels.map((label) => ({
    label,
    value: 1 + Math.floor(rng() * 5),
  }));
  points = ensureUniqueMin(points);
  points = ensureUniqueMax(points);
  return points;
}

function piePoints(rng: Rng, labels: readonly string[]): SeriesPoint[] {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    let points = labels.map((label) => ({
      label,
      value: 2 + Math.floor(rng() * 4),
    }));
    points = ensureUniqueMin(points);
    points = ensureUniqueMax(points);
    const desc = [...points].sort((a, b) => b.value - a.value);
    const asc = [...points].sort((a, b) => a.value - b.value);
    const top = desc[0];
    const second = desc[1];
    const low = asc[0];
    const nextLow = asc[1];
    if (
      top &&
      second &&
      low &&
      nextLow &&
      top.value >= second.value + 2 &&
      low.value < nextLow.value &&
      top.label !== low.label
    ) {
      return points;
    }
  }
  return labels.map((label, index) => ({ label, value: [6, 3, 1][index] ?? 1 }));
}

function extreme(points: SeriesPoint[], which: "max" | "min"): SeriesPoint {
  const sorted = [...points].sort((a, b) => a.value - b.value);
  const point = which === "max" ? sorted[sorted.length - 1] : sorted[0];
  if (!point) throw new Error("Serie vacía");
  return point;
}

function twoDifferent(rng: Rng, points: SeriesPoint[]): [SeriesPoint, SeriesPoint] {
  const pairs: [SeriesPoint, SeriesPoint][] = [];
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const left = points[i];
      const right = points[j];
      if (left && right && left.value !== right.value) pairs.push([left, right]);
    }
  }
  const wide = pairs.filter(([left, right]) => Math.abs(left.value - right.value) >= 2);
  const pool = wide.length > 0 ? wide : pairs;
  if (pool.length === 0) throw new Error("No hay pares distintos");
  return pick(rng, pool);
}

function qRango(rng: Rng): Question {
  const scene = pick(rng, PEOPLE_SCENES);
  const values = distinctNumbers(rng, 5, 1, 12);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min;
  return base(
    rng,
    "rango",
    `¿Cuál es el rango de ${scene.art} ${scene.thing}?`,
    "Rango = el más grande menos el más pequeño.",
    peopleVisual(rng, values, scene.caption),
    String(range),
    numericWrongs(range),
    `El más grande es ${max} y el más pequeño es ${min}. ${max} − ${min} = ${range}.`,
  );
}

function qMedia(rng: Rng): Question {
  const scene = pick(rng, PEOPLE_SCENES);
  const { values, mean } = balancedTriple(rng);
  const sum = values.reduce((total, value) => total + value, 0);
  return base(
    rng,
    "media",
    `¿Cuál es la media de ${scene.art} ${scene.thing}?`,
    "Suma los números y repártelos entre las 3 personas.",
    peopleVisual(rng, values, scene.caption),
    String(mean),
    numericWrongs(mean, values),
    `Sumamos ${values.join(" + ")} = ${sum}. ${sum} entre 3 es ${mean}.`,
  );
}

function qModa(rng: Rng): Question {
  const scene = pick(rng, PEOPLE_SCENES);
  const mode = 1 + Math.floor(rng() * 8);
  const others = distinctNumbers(rng, 4, 1, 9).filter((value) => value !== mode);
  const second = others[0] ?? (mode === 1 ? 2 : 1);
  const third = others[1] ?? (second === 9 ? 8 : second + 1);
  const values = shuffle(rng, [mode, mode, mode, second, second, third]);
  return base(
    rng,
    "moda",
    `¿Cuál es la moda de ${scene.art} ${scene.thing}?`,
    "La moda es el número que más se repite. Cuéntalos.",
    peopleVisual(rng, values, scene.caption),
    String(mode),
    numericWrongs(mode, [second, third]),
    `${mode} se repite 3 veces. ${second} se repite 2 y ${third} solo 1.`,
  );
}

function qMediana(rng: Rng): Question {
  const scene = pick(rng, PEOPLE_SCENES);
  const values = distinctNumbers(rng, 5, 1, 12);
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[2] as number;
  return base(
    rng,
    "mediana",
    `¿Cuál es la mediana de ${scene.art} ${scene.thing}?`,
    "Ordénalos de menor a mayor. Con 5 números, el tercero es el centro.",
    peopleVisual(rng, values, scene.caption),
    String(median),
    numericWrongs(median, values),
    `De menor a mayor: ${sorted.join(", ")}. El del centro es ${median}.`,
  );
}

function qFrecuencia(rng: Rng): Question {
  const set = pick(rng, COUNT_SETS);
  const points = countedPoints(rng, set.labels);
  const roll = rng();
  const visual: Visual = { kind: "table", title: set.title, unit: set.unit, points };

  if (roll < 0.34) {
    const row = pick(rng, points);
    return base(
      rng,
      "frecuencia",
      `¿Cuántos hay en ${row.label}?`,
      "Busca esa fila y lee el número.",
      visual,
      String(row.value),
      numericWrongs(
        row.value,
        points.map((point) => point.value),
      ),
      `En la fila de ${row.label} el número es ${row.value}.`,
    );
  }

  if (roll < 0.67) {
    const sum = points.reduce((total, point) => total + point.value, 0);
    return base(
      rng,
      "frecuencia",
      "¿Cuántos hay en total?",
      "Suma el número de todas las filas.",
      visual,
      String(sum),
      numericWrongs(
        sum,
        points.map((point) => point.value),
      ),
      `Sumamos ${points.map((point) => point.value).join(" + ")} = ${sum}.`,
    );
  }

  const winner = extreme(points, "max");
  return base(
    rng,
    "frecuencia",
    "¿Dónde hay más?",
    "Es la fila con el número más grande.",
    visual,
    winner.label,
    points.map((point) => point.label),
    `${winner.label} tiene ${winner.value}, más que las otras filas.`,
  );
}

function qBarras(rng: Rng): Question {
  const set = pick(rng, COUNT_SETS);
  const points = countedPoints(rng, set.labels);
  const roll = rng();
  const visual: Visual = { kind: "bars", title: set.title, unit: set.unit, points };

  if (roll < 0.34) {
    const row = pick(rng, points);
    return base(
      rng,
      "barras",
      `¿Cuántos hay en ${row.label}?`,
      "Lee el número encima de esa barra.",
      visual,
      String(row.value),
      numericWrongs(
        row.value,
        points.map((point) => point.value),
      ),
      `La barra de ${row.label} llega hasta ${row.value}.`,
    );
  }

  if (roll < 0.67) {
    const winner = extreme(points, "max");
    return base(
      rng,
      "barras",
      "¿Dónde hay más?",
      "La barra más alta es la que más tiene.",
      visual,
      winner.label,
      points.map((point) => point.label),
      `La barra más alta es ${winner.label}, con ${winner.value}.`,
    );
  }

  const [left, right] = twoDifferent(rng, points);
  const higher = left.value > right.value ? left : right;
  const lower = left.value > right.value ? right : left;
  const diff = higher.value - lower.value;
  return base(
    rng,
    "barras",
    `${higher.label} tiene más que ${lower.label}. ¿Cuántos más?`,
    "Resta el número menor al mayor.",
    visual,
    String(diff),
    numericWrongs(diff, [higher.value, lower.value]),
    `${higher.label} tiene ${higher.value} y ${lower.label} tiene ${lower.value}. ${higher.value} − ${lower.value} = ${diff}.`,
  );
}

function qPastel(rng: Rng): Question {
  const set = pick(rng, COUNT_SETS);
  const labels = set.labels.slice(0, 3);
  const points = piePoints(rng, labels);
  const visual: Visual = { kind: "pie", title: set.title, unit: set.unit, points };
  const wantMin = rng() < 0.5;
  const chosen = extreme(points, wantMin ? "min" : "max");
  return base(
    rng,
    "pastel",
    wantMin ? "¿Dónde hay menos?" : "¿Dónde hay más?",
    wantMin
      ? "El pedazo más pequeño del pastel es el que menos tiene."
      : "El pedazo más grande del pastel es el que más tiene.",
    visual,
    chosen.label,
    points.map((point) => point.label),
    wantMin
      ? `El pedazo más pequeño es ${chosen.label}.`
      : `El pedazo más grande es ${chosen.label}.`,
  );
}

function qPoligono(rng: Rng): Question {
  const set = pick(rng, WEEK_SETS);
  let points: SeriesPoint[] = DAYS.map((label) => ({
    label,
    value: 1 + Math.floor(rng() * 5),
  }));
  points = ensureUniqueMin(points);
  points = ensureUniqueMax(points);
  const visual: Visual = {
    kind: "polygon",
    title: set.title,
    unit: set.unit,
    note: DAY_NOTE,
    points,
  };
  const roll = rng();

  if (roll < 0.34) {
    const winner = extreme(points, "max");
    const wrongDays = shuffle(
      rng,
      points.filter((point) => point.label !== winner.label).map((point) => point.label),
    ).slice(0, 3);
    return base(
      rng,
      "poligono",
      "¿Dónde hay más?",
      "Es el punto más alto del polígono.",
      visual,
      winner.label,
      wrongDays,
      `El punto más alto es ${winner.label}, con ${winner.value}.`,
    );
  }

  if (roll < 0.67) {
    const row = pick(rng, points);
    return base(
      rng,
      "poligono",
      `¿Cuántos hay en ${row.label}?`,
      "Busca ese día y lee el número del punto.",
      visual,
      String(row.value),
      numericWrongs(
        row.value,
        points.map((point) => point.value),
      ),
      `El punto de ${row.label} está en ${row.value}.`,
    );
  }

  const index = Math.floor(rng() * (points.length - 1));
  const from = points[index] as SeriesPoint;
  const to = points[index + 1] as SeriesPoint;
  const relation = to.value > from.value ? "Sube" : to.value < from.value ? "Baja" : "Queda igual";
  const verb = relation === "Sube" ? "sube" : relation === "Baja" ? "baja" : "queda igual";
  return base(
    rng,
    "poligono",
    `De ${from.label} a ${to.label}, ¿la línea sube, baja o queda igual?`,
    "Si el segundo punto está más arriba, sube. Si está más abajo, baja.",
    visual,
    relation,
    ["Sube", "Baja", "Queda igual"],
    `${from.label} está en ${from.value} y ${to.label} está en ${to.value}. La línea ${verb}.`,
  );
}

const MAKERS: Record<TopicId, (rng: Rng) => Question> = {
  rango: qRango,
  media: qMedia,
  moda: qModa,
  mediana: qMediana,
  frecuencia: qFrecuencia,
  barras: qBarras,
  pastel: qPastel,
  poligono: qPoligono,
};

export function buildQuiz(seed: number): Question[] {
  const rng = createRng(seed);
  const questions = TOPICS.map((topic) => MAKERS[topic.id](rng));
  return shuffle(rng, questions);
}

export function buildPractice(topic: TopicId, seed: number): Question[] {
  const rng = createRng(seed);
  const make = MAKERS[topic];
  return Array.from({ length: 5 }, () => make(rng));
}
