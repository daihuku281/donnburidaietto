import { useState} from 'react'

function App() {
    const katudonn = 900

    const [text, setText] = useState("カロリー量を入力してください")
    const [kcal, setkal] = useState("")

    

    return(
        <>
        <h1>
            {text}
        </h1>

        <input
            type="number"
            placeholder="カロリーを入力してください"
            value={kcal}
            onChange={(e) => setkal(e.target.value)}
            
            />
            <p>入力されたカロリーはカツ丼 
                {kcal ===""?0:(Number(kcal) / katudonn).toFixed(2)}個です
                </p>
                <br/>
                

        </>
    )
}

export default App