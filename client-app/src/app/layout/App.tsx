import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { useStore } from "../stores/store";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import agent from "../api/agents";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  const handleDelete = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDelete}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

// observer is a higher order function which returns the app component with additional 'powers'
// it is able to observe the observables in the store
export default observer(App);
