import { ThemeToggle } from "@/components/ThemeToggle";
import { initI18n } from "@/i18n";
import "@/styles/fonts.css";
import "@/styles/utils.css";

function App() {
  initI18n();

  return (
    <main
      className="h-screen w-screen overflow-auto flex-col-center text-3xl"
      id="appScrollContainer"
    >
      Hello World
      <ThemeToggle />
    </main>
  );
}

export default App;
