import { Header } from './components/header'
import Template from './components/template'

function App() {

  return (
    <div className="bg-slate-50/80 flex flex-col w-96 h-[600px] rounded gap-2 overflow-auto scrollbar-hidden">
      <Header />
      <div className="w-full flex justify-around">
        <span>Templates</span>
        <span>Automations</span>
      </div>
      <Template />
    </div>
  );
}

export default App


//"default_title": "Instant" 
