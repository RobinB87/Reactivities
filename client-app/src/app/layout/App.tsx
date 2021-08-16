import { Route, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "./../../features/activities/details/ActivityDetails";
import TestErrors from "./../../features/errors/TestError";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <ToastContainer position="bottom-right" hideProgressBar />

            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
              <Route path="/errors" component={TestErrors} />
            </Container>
          </>
        )}
      />
    </>
  );
}

// observer is a higher order function which returns the app component with additional 'powers'
// it is able to observe the observables in the store
export default observer(App);
