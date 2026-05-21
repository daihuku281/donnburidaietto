import { useState } from 'react'
import TitlePage from './TitlePage'

function App() {
    const foods = [
        {name: "カツ丼", kcal: 900, unit: '杯'},
        {name: "大福", kcal: 250, unit: '個'},
        {name: "大根", kcal:15, unit: '本'},
        {name: "どんぐり", kcal:10, unit: '個'},
        {name: "ダチョウの肉", kcal:140, unit: '枚'},
        {name: "ドラゴンフルーツ", kcal:15, unit: '個'},
        {name: "ダニエルが育てた謎の野菜", kcal:2750, unit: '束'},

    ]
    
    const [kcal, setkal] = useState("")
    const [randomFood, setRandomFood] = useState(foods[0])
    const [showTitlePage, setShowTitlePage] = useState(true)
    const changeFood = () =>{
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
    }
    
    if (showTitlePage) {
        return <TitlePage onBack={() => setShowTitlePage(false)} />
    }

    return(
        <>
        <h1>カロリー量を入力してください</h1>

        <button onClick={() => setShowTitlePage(true)}>
            タイトルページへ
        </button>

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
                    kcal === "" ? 0: (Number(kcal) / randomFood.kcal).toFixed(2)
                }

                {randomFood.unit}です
            </p>
        </>
    )
}

export default App