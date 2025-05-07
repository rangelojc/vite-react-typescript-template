import { Page, Wrapper } from "@/components/LayoutWidgets";
import { ThemeToggle } from "@/components/ThemeToggle";
import { initI18n } from "@/i18n";
import "@/styles/fonts.css";
import "@/styles/utils.css";

function App() {
  initI18n();

  return (
    <Page>
      <Wrapper className="text-5xl flex-col-center min-h-screen">
        <h1>Hello World</h1>
        <p className="text-base mt-4">
          Start adding new pages and components in{" "}
          <span className="font-mono">/src/pages/App.tsx</span>
        </p>
        <ThemeToggle />
      </Wrapper>
    </Page>
  );
}

export default App;
