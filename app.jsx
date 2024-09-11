import { useCallback, useState, useEffect, useRef } from 'preact/hooks'

export function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  // use Ref Hook

  const passwordRef = useRef(null);

  // PasswordGenerator

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) { str += "0123456789" }
    if (charAllowed) { str += "!@#$%^&*+=-_[]{}~?" }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    console.log(pass)
    setPassword(pass)
    console.log(length)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length, numAllowed, passwordGenerator])

  // copyPassword

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white font-semi-bold text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input className='outline-none w-full py-1 px-3'
            type="text"
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword} className='outline-none bg-blue-600 text-white px-3 py-1 hover:bg-blue-800'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              className='cursor-pointer'
              min={5}
              max={50}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
        <div className='flex justify-center mt-3'>
            <button onClick={passwordGenerator} className='bg-green-600 px-3 py-2 rounded-lg text-white hover:bg-green-700'>New Password</button>
          </div>
      </div>
    </>
  )
}

