import { useState} from 'react'

function App() {
    const foods = [
        {name: "カツ丼", kcal: 900},
        {name: "大福", kcal: 250},
        {name: "大根", kcal:15},
        {name: "どんぐり", kcal:10},
        {name: "ダチョウの肉", kcal:140},
        {name: "ドラゴンフルーツ", kcal:15},
        {name: "ダニエルが育てた謎の野菜", kcal:2750},

    ]
    
    const [kcal, setkal] = useState("")
    const [randomFood, setRandomFood] = useState(foods[0])
    const changeFood = () =>{
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
    }
    
    return(
        <>
        <h1>カロリー量を入力してください</h1>

        <input
        type="number"
        min="1"
        placeholder="カロリーを入力してください"
        value={kcal}
        onChange={(e) => setkal(e.target.value)}
        />
        <button onClick={changeFood}>
            食べ物を変更
        </button>
        
            <p>
                入力されたカロリーは
                {randomFood.name}

                {
                    kcal === ""? 0: (Number(kcal) / randomFood.kcal).toFixed(2)
                }

                {randomFood.unit}(杯、個)です
            </p>
            {}
        </>
    )
}

export default App