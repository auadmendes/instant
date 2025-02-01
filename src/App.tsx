import logo from './assets/text.png'
import { Header } from './components/header'
import { Template } from './components/template'


function App() {
  

  function handleMessageTest() {
    alert('Testing it')
  }

  return (
    <div className="bg-slate-50/80 flex flex-col w-96 h-96 rounded gap-2">
      <Header />
      <div className='w-full flex justify-around'>
        <span>Templates</span>
        <span>Automations</span>
      </div>
      <Template />
    </div>
  )
}

export default App


//"default_title": "Instant" 
