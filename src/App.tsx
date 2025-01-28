import logo from './assets/text.png'


function App() {
  

  function handleMessageTest() {
    alert('Testing it')
  }

  return (
    <div className="bg-slate-100 flex flex-col w-96 h-96 rounded gap-2 p-3">
      <h1 className='bg-green-500'>Instant</h1>
      <p>This is a custom Chrome extension popup.</p>
      <button onClick={() => alert('Hello, Chrome Extension!')}>
        Click Me
      </button>
      <img
        src={logo}
        className='rounded-sm p-1 w-10 h-10'
        alt='logo'
      />
      <button 
        className='p-3 border-0 w-24 bg-green-300 text-slate-800 hover:bg-green-500 transition-all rounded-md shadow-sm'
        onClick={handleMessageTest}
        >
        Click Here
      </button>
      <input className='w-80 h-5 border border-red-400' />
    </div>
  )
}

export default App


//"default_title": "Instant" 
