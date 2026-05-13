import { useState } from "react";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskList } from "./components/TaskList";

const App = () => {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <>
      <header className="govuk-header" role="banner">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <span className="govuk-header__product-name">HMCTS Task Manager</span>
          </div>
        </div>
      </header>

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Caseworker Tasks</h1>
              <CreateTaskForm onCreated={handleRefresh} />
            </div>
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <h2 className="govuk-heading-l">All tasks</h2>
              <TaskList refresh={refresh} onRefresh={handleRefresh} />
            </div>
          </div>
        </main>
      </div>

      <footer className="govuk-footer">
        <div className="govuk-width-container">
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item">
              <span className="govuk-footer__licence-description">
                Built for HMCTS — His Majesty's Courts and Tribunals Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
