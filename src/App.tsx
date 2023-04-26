import { useState, useEffect } from 'react'
import Header from './components/Header/Header';
import TabContainer from './components/Tabs/TabContainer';

function App() {
  const [activeTab, setActiveTab] = useState(1)
  let tabs: string[] = ['General', 'Roles management', 'User management', 'Notifications'];

  return (
    <div className="flex justify-center">
      <div className='max-w-[1190px] w-full rounded-[10px] overflow-hidden'>
        <Header />
        <div className="bg-custom-gray p-10">
          <h1 className='text-h1 mb-6'>Settings</h1>
            <TabContainer tabTitles={tabs} />          
        </div>
      </div>
    </div>
  )
}

export default App
