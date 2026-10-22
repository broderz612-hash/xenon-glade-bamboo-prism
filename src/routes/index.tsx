import { createFileRoute } from "@tanstack/react-router";
import { QuizApp } from "@/components/quiz/quiz-app";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <QuizApp />;
}
