import React from 'react';
import UserList from '@/components/UserList';
export const metadata = {
    title: "Chittha | Dashboard",
    description: "UserDashboard",
  };
  
function App() {
  return (
    <div className="bg-white">
      <UserList />
    </div>
  );
}

export default App;
