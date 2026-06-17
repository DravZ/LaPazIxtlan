// components/BottomNav.tsx

interface Props {
  currentView: "main" | "panel";
  setCurrentView: (view: "main" | "panel") => void;
}

const BottomNav = ({
  currentView,
  setCurrentView,
}: Props) => {
  return (
    <div
      className="fixed-bottom bg-light border-top p-2 d-flex justify-content-around"
    >
      <button
        className={`btn ${
          currentView === "main"
            ? "btn-primary"
            : "btn-outline-primary"
        }`}
        onClick={() => setCurrentView("main")}
      >
        Inicio
      </button>

      <button
        className={`btn ${
          currentView === "panel"
            ? "btn-primary"
            : "btn-outline-primary"
        }`}
        onClick={() => setCurrentView("panel")}
      >
        Panel
      </button>
    </div>
  );
};

export default BottomNav;