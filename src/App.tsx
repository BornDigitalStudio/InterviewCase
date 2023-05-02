import Header from "@components/Header";
import TabContainer from "@components/TabContainer";
import GeneralForm from "@components/GeneralForm";
import { UserManagement } from "@components/UserManagement";

function App() {
  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <TabContainer title="Settings">
        <TabContainer.Target containerId="general">General</TabContainer.Target>
        <TabContainer.Target containerId="roles-management">
          Roles management
        </TabContainer.Target>
        <TabContainer.Target defaultSelect containerId="user-management">
          User management
        </TabContainer.Target>
        <TabContainer.Target containerId="notifications">
          Notifications
        </TabContainer.Target>

        <TabContainer.Container id="general">
          <GeneralForm />
        </TabContainer.Container>

        <TabContainer.Container id="roles-management">
          <div>roles-management</div>
        </TabContainer.Container>

        <TabContainer.Container id="user-management">
          <UserManagement />
        </TabContainer.Container>

        <TabContainer.Container id="notifications">
          <div>notifications</div>
        </TabContainer.Container>
      </TabContainer>
    </div>
  );
}

export default App;
