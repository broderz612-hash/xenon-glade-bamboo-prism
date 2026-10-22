import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  BookOpen,
  ChartColumn,
  ChartLine,
  Check,
  Divide,
  Lightbulb,
  ListOrdered,
  PieChart,
  Repeat,
  Table2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  buildPractice,
  buildQuiz,
  topicById,
  TOPICS,
  type Question,
  type TopicId,
} from "@/lib/quiz/bank";

const QuestionVisual = lazy(() => import("@/components/quiz/visuals"));

const STORAGE_KEY = "cuaderno-datos-best-v1";

const ICONS: Record<TopicId, LucideIcon> = {
  rango: ArrowDownUp,
  media: Divide,
  moda: Repeat,
  mediana: ListOrdered,
  frecuencia: Table2,
  barras: ChartColumn,
  pastel: PieChart,
  poligono: ChartLine,
};

type Mode = { kind: "mix" } | { kind: "topic"; topic: TopicId };
type Phase = "answer" | "reveal";
type Screen = "home" | "play" | "done";
type LogItem = { question: Question; pickedId: string; ok: boolean };
type Best = { score: number; total: number };

function readBest(): Best | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Best>;
    if (typeof parsed.score === "number" && typeof parsed.total === "number") {
      return { score: parsed.score, total: parsed.total };
    }
  } catch {
    return null;
  }
  return null;
}

function choiceLabel(question: Question, id: string): string {
  return question.choices.find((choice) => choice.id === id)?.label ?? "";
}

function headline(score: number, total: number): string {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio === 1) return "¡Todo correcto!";
  if (ratio >= 0.75) return "¡Muy bien!";
  if (ratio >= 0.5) return "Buen camino";
  return "Vamos otra vez";
}

function subline(score: number, total: number): string {
  const ratio = total === 0 ? 0 : score / total;
  if (ratio === 1) return "Leíste cada número y cada gráfica.";
  if (ratio >= 0.75) return "Solo faltaron unos detalles.";
  if (ratio >= 0.5) return "Revisa las explicaciones y vuelve a intentar.";
  return "Lee la pista verde: te dice cómo pensar la pregunta.";
}

export function QuizApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [mode, setMode] = useState<Mode>({ kind: "mix" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("answer");
  const [picked, setPicked] = useState<string | null>(null);
  const [log, setLog] = useState<LogItem[]>([]);
  const [best, setBest] = useState<Best | null>(null);
  const [isRecord, setIsRecord] = useState(false);

  useEffect(() => {
    setBest(readBest());
  }, []);

  useEffect(() => {
    void import("@/components/quiz/visuals");
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [screen, index]);

  function start(nextMode: Mode) {
    const seed = Math.floor(Math.random() * 1_000_000_000) + 1;
    const nextQuestions =
      nextMode.kind === "mix" ? buildQuiz(seed) : buildPractice(nextMode.topic, seed);
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

  function choose(id: string) {
    if (phase !== "answer") return;
    const question = questions[index];
    if (!question) return;
    setPicked(id);
    setPhase("reveal");
    setLog((prev) => [...prev, { question, pickedId: id, ok: id === question.answerId }]);
  }

  function finish(finalLog: LogItem[]) {
    const score = finalLog.filter((item) => item.ok).length;
    if (mode.kind === "mix") {
      const prev = readBest();
      if (!prev || score > prev.score) {
        const nextBest = { score, total: finalLog.length };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBest));
        } catch {
          /* La marca vive solo en esta sesión si el navegador bloquea el guardado. */
        }
        setBest(nextBest);
        setIsRecord(true);
      } else {
        setIsRecord(false);
      }
    } else {
      setIsRecord(false);
    }
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

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl border-l-8 border-accent px-4 py-6 sm:px-8 sm:py-10">
      {screen === "home" ? (
        <HomeScreen best={best} onStart={start} />
      ) : screen === "play" && question ? (
        <PlayScreen
          mode={mode}
          question={question}
          index={index}
          total={questions.length}
          phase={phase}
          picked={picked}
          onChoose={choose}
          onNext={next}
          onExit={goHome}
        />
      ) : (
        <DoneScreen
          mode={mode}
          log={log}
          isRecord={isRecord}
          onAgain={() => start(mode)}
          onHome={goHome}
        />
      )}
    </main>
  );
}

function HomeScreen({ best, onStart }: { best: Best | null; onStart: (mode: Mode) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-surface">
          <BookOpen className="size-6" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-extrabold tracking-wide text-primary uppercase">
            Matemáticas · 2.º grado
          </p>
          <h1 className="text-4xl leading-none text-ink">Cuaderno de Datos</h1>
        </div>
      </header>

      <p className="text-lg leading-relaxed text-ink">
        Preguntas nuevas cada vez sobre rango, media, moda, mediana, tablas y gráficas. Los
        números son chicos, para contar y leer sin apuro.
      </p>

      <div>
        <button
          type="button"
          onClick={() => onStart({ kind: "mix" })}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-lg font-extrabold text-surface"
        >
          Empezar cuestionario
          <ArrowRight className="size-5" aria-hidden />
        </button>
        <p className="mt-2 text-center text-sm font-bold text-muted">
          8 preguntas · un tema cada una
        </p>
        {best ? (
          <p className="mt-1 text-center text-sm font-extrabold text-primary tabular-nums">
            Mejor marca: {best.score} de {best.total}
          </p>
        ) : null}
      </div>

      <section>
        <h2 className="mb-3 text-2xl text-ink">Practicar un tema</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {TOPICS.map((topic) => {
            const Icon = ICONS[topic.id];
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onStart({ kind: "topic", topic: topic.id })}
                className="flex min-h-16 flex-col items-start gap-1 rounded-2xl border border-line bg-surface px-4 py-3 text-left"
              >
                <span className="inline-flex items-center gap-2 font-extrabold text-ink">
                  <Icon className="size-4 text-primary" aria-hidden />
                  {topic.label}
                </span>
                <span className="text-sm font-bold leading-snug text-muted">{topic.definition}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm font-bold text-muted">5 preguntas del tema que elijas.</p>
      </section>
    </div>
  );
}

function PlayScreen({
  mode,
  question,
  index,
  total,
  phase,
  picked,
  onChoose,
  onNext,
  onExit,
}: {
  mode: Mode;
  question: Question;
  index: number;
  total: number;
  phase: Phase;
  picked: string | null;
  onChoose: (id: string) => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const meta = topicById(question.topic);
  const Icon = ICONS[question.topic];
  const progress = ((index + (phase === "reveal" ? 1 : 0)) / total) * 100;
  const ok = picked === question.answerId;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex max-w-[70%] items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-sm font-extrabold text-primary">
          <Icon className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{meta.label}</span>
        </span>
        <span className="text-sm font-extrabold text-muted tabular-nums">
          {index + 1}/{total}
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-primary-soft"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        aria-label={mode.kind === "mix" ? "Cuestionario" : "Práctica"}
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>

      <h1 className="text-3xl leading-tight text-ink">{question.prompt}</h1>

      <Suspense
        fallback={<div className="h-52 animate-pulse rounded-2xl bg-primary-soft" aria-hidden />}
      >
        <QuestionVisual visual={question.visual} />
      </Suspense>

      <div className="flex gap-2 rounded-2xl bg-primary-soft px-3 py-3 text-sm leading-snug font-bold text-ink">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p>{question.help}</p>
      </div>

      <div className="grid gap-2" role="group" aria-label="Opciones">
        {question.choices.map((choice, choiceIndex) => {
          const letter = String.fromCharCode(65 + choiceIndex);
          let state: "idle" | "correct" | "wrong" | "missed" = "idle";
          if (phase === "reveal") {
            if (choice.id === question.answerId) state = "correct";
            else if (choice.id === picked) state = "wrong";
            else state = "missed";
          }
          const stateClass =
            state === "correct"
              ? "border-primary bg-primary text-surface"
              : state === "wrong"
                ? "border-accent bg-accent-soft text-ink"
                : state === "missed"
                  ? "border-line bg-surface text-muted"
                  : "border-line bg-surface text-ink hover:border-primary hover:bg-primary-soft";
          return (
            <button
              key={choice.id}
              type="button"
              disabled={phase === "reveal"}
              onClick={() => onChoose(choice.id)}
              className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left text-lg font-extrabold ${stateClass}`}
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-full font-display text-base ${
                  state === "correct" ? "bg-surface text-primary" : "bg-bg text-ink"
                }`}
              >
                {letter}
              </span>
              <span className="tabular-nums">{choice.label}</span>
            </button>
          );
        })}
      </div>

      {phase === "reveal" ? (
        <div
          role="status"
          className={`rounded-2xl border px-4 py-3 ${
            ok ? "border-primary bg-primary-soft" : "border-accent bg-accent-soft"
          }`}
        >
          <p className="flex items-center gap-2 font-extrabold text-ink">
            {ok ? (
              <Check className="size-5 text-primary" aria-hidden />
            ) : (
              <Lightbulb className="size-5 text-accent" aria-hidden />
            )}
            {ok ? "¡Correcto!" : "Casi. Mira el paso."}
          </p>
          <p className="mt-1 leading-relaxed font-bold text-ink">{question.explanation}</p>
          <button
            type="button"
            onClick={onNext}
            className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 font-extrabold text-surface"
          >
            {index + 1 === total ? "Ver resultado" : "Siguiente"}
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      ) : null}

      <button type="button" onClick={onExit} className="mx-auto text-sm font-extrabold text-muted">
        Salir al inicio
      </button>
    </div>
  );
}

function DoneScreen({
  mode,
  log,
  isRecord,
  onAgain,
  onHome,
}: {
  mode: Mode;
  log: LogItem[];
  isRecord: boolean;
  onAgain: () => void;
  onHome: () => void;
}) {
  const score = log.filter((item) => item.ok).length;
  const total = log.length;
  const missed = [
    ...new Set(log.filter((item) => !item.ok).map((item) => topicById(item.question.topic).label)),
  ];
  const title =
    mode.kind === "mix" ? "Cuestionario completo" : `Práctica de ${topicById(mode.topic).label}`;

  return (
    <div className="flex flex-col gap-5">
      <header>
        <p className="text-sm font-extrabold tracking-wide text-primary uppercase">{title}</p>
        <h1 className="text-4xl text-ink">{headline(score, total)}</h1>
        <p className="mt-2 text-lg font-bold text-ink">{subline(score, total)}</p>
      </header>

      <div className="rounded-2xl border border-line bg-surface px-4 py-5 text-center">
        <p className="font-display text-6xl tabular-nums text-primary">
          {score}
          <span className="text-3xl text-muted">/{total}</span>
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5" aria-hidden>
          {log.map((item, dot) => (
            <span
              key={item.question.id}
              className={`size-3.5 rounded-full ${item.ok ? "bg-primary" : "bg-accent"}`}
            />
          ))}
          {log.length === 0 ? <span className="text-sm text-muted">Sin respuestas</span> : null}
        </div>
        {isRecord ? (
          <p className="mt-3 font-extrabold text-primary">Nueva mejor marca en este aparato.</p>
        ) : null}
        {missed.length > 0 ? (
          <p className="mt-3 font-bold text-ink">Para repasar: {missed.join(", ")}.</p>
        ) : (
          <p className="mt-3 font-bold text-ink">En este intento no fallaste ningún tema.</p>
        )}
      </div>

      <div className="grid gap-2">
        {log.map((item) => {
          const yours = choiceLabel(item.question, item.pickedId);
          const right = choiceLabel(item.question, item.question.answerId);
          return (
            <details
              key={item.question.id}
              open={!item.ok}
              className="rounded-2xl border border-line bg-surface px-4 py-3"
            >
              <summary className="font-extrabold text-ink">
                {item.ok ? "Correcto" : "Para repasar"} · {topicById(item.question.topic).label}
              </summary>
              <div className="mt-2 space-y-1 text-sm leading-relaxed font-bold">
                <p>{item.question.prompt}</p>
                <p>Tu respuesta: {yours}</p>
                {item.ok ? null : <p>Respuesta: {right}</p>}
                <p className="text-muted">{item.question.explanation}</p>
              </div>
            </details>
          );
        })}
      </div>

      <div className="grid gap-2">
        <button
          type="button"
          onClick={onAgain}
          className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary px-4 text-lg font-extrabold text-surface"
        >
          {mode.kind === "mix" ? "Nuevo cuestionario" : "Otras 5 preguntas"}
        </button>
        <button
          type="button"
          onClick={onHome}
          className="flex min-h-14 w-full items-center justify-center rounded-2xl border border-line bg-surface px-4 text-lg font-extrabold text-ink"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
