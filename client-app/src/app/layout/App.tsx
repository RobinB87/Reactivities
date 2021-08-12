import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { useStore } from "../stores/store";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "./NavBar";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

// observer is a higher order function which returns the app component with additional 'powers'
// it is able to observe the observables in the store
export default observer(App);
