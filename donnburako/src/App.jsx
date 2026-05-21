import { useState } from 'react'
import TitlePage from './TitlePage'
import './App.css'

function App() {
    const foods = [
        {
            name: 'カツ丼',
            kcal: 900,
            unit: '杯',
            image: 'https://via.placeholder.com/80?text=%E3%82%AB%E3%83%84%E4%B8%BC',
        },
        {
            name: '大福',
            kcal: 250,
            unit: '個',
            image: 'https://via.placeholder.com/80?text=%E5%A4%A7%E7%A6%8F',
        },
        {
            name: '大根',
            kcal: 15,
            unit: '本',
            image: 'https://via.placeholder.com/80?text=%E5%A4%A7%E6%A0%B9',
        },
        {
            name: 'どんぐり',
            kcal: 10,
            unit: '個',
            image: 'https://via.placeholder.com/80?text=%E3%81%A9%E3%82%93%E3%81%90%E3%82%8A',
        },
        {
            name: 'ダチョウの肉',
            kcal: 140,
            unit: '枚',
            image: 'https://via.placeholder.com/80?text=%E3%83%80%E3%83%81%E3%83%A7%E3%82%A6',
        },
        {
            name: 'ドラゴンフルーツ',
            kcal: 15,
            unit: '個',
            image: 'https://via.placeholder.com/80?text=%E3%83%89%E3%83%A9%E3%82%B4%E3%83%B3',
        },
        {
            name: 'ダニエルが育てた謎の野菜',
            kcal: 2750,
            unit: '束',
            image: 'https://via.placeholder.com/80?text=%E8%AC%8E%E3%81%AE%E9%87%8E%E8%8F%9C',
        },
    ]
    
    const [kcal, setKcal] = useState('')
    const [randomFood, setRandomFood] = useState(foods[0])
    const [showTitlePage, setShowTitlePage] = useState(false)
    const changeFood = () => {
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
    }
    
    const amount = kcal === '' ? 0 : Number(kcal) / randomFood.kcal
    const unitCount = Math.floor(amount)
    const visibleCount = Math.min(unitCount, 20)
    const moreCount = unitCount - visibleCount

    if (showTitlePage) {
        return <TitlePage onBack={() => setShowTitlePage(false)} />
    }

    return (
        <div className="app-container">
            <h1>カロリー量を入力してください</h1>

            <button onClick={() => setShowTitlePage(true)}>
                タイトルページへ
            </button>

            <input
                type="number"
                min="1"
                placeholder="カロリーを入力してください"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
            />
            <button onClick={changeFood}>
                食べ物を変更
            </button>

            <p>
                入力されたカロリーは {randomFood.name}{' '}
                {amount === 0 ? 0 : amount.toFixed(2)} {randomFood.unit} です
            </p>

            {unitCount > 0 && (
                <div className="food-image-list">
                    {Array.from({ length: visibleCount }, (_, index) => (
                        <img
                            key={index}
                            src={randomFood.image}
                            alt={`${randomFood.name} ${index + 1}`}
                            className="food-image"
                        />
                    ))}
                    {moreCount > 0 && (
                        <div className="more-count">+{moreCount} つ</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default App