import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainWrapper from "@/ui/MainWrapper";
import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";
import StoreSetiings from "./StoreSetiings";

function Settings() {
  return (
    <MainWrapper pageName="Setting">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mx-auto mb-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="mb-5 text-gray-400">
            Make changes to your account here.
          </div>
          <AccountSettings />
        </TabsContent>
        <TabsContent value="security">
          <div className="mb-5 text-gray-400">Update your password here.</div>
          <PasswordSettings />
        </TabsContent>
        <TabsContent value="store">
          <StoreSetiings />
        </TabsContent>
      </Tabs>
    </MainWrapper>
  );
}

export default Settings;
