import { useState } from 'react'
import TitlePage from './TitlePage'
import WeightPage from './weight'
import './App.css'

function App() {
    const foods = [
        {
            name: 'カツ丼',
            kcal: 900,
            unit: '杯',
            image: '',
        },
        {
            name: '大福',
            kcal: 250,
            unit: '個',
            image: 'donnburidaietto/donnburako/public/images/Daifuku_1.png',
        },
        {
            name: '大根',
            kcal: 15,
            unit: '本',
            image: 'donnburidaietto/donnburako/public/images/daikonn (1).png',
        },
        {
            name: 'どんぐり',
            kcal: 10,
            unit: '個',
            image: 'donnburidaietto/donnburako/public/images/large.png',
        },
        {
            name: 'ダチョウの肉',
            kcal: 140,
            unit: '枚',
            image: 'donnburidaietto/donnburako/public/images/dachou.png',
        },
        {
            name: 'ドラゴンフルーツ',
            kcal: 15,
            unit: '個',
            image: 'donnburidaietto/donnburako/public/images/image80.png',
        },
        {
            name: 'ダニエルが育てた謎の野菜',
            kcal: 2750,
            unit: '束',
            image: '/images/スクリーンショット 2026-05-23 021419.png',
        },
    ]
    
    const [inputValue, setInputValue] = useState('')
    const [kcal, setKcal] = useState('')
    const [randomFood, setRandomFood] = useState(foods[0])
    const [showTitlePage, setShowTitlePage] = useState(true)
    // 【新機能】ボタンを押すたびにアニメーションを強制リセットさせるための識別用スタンプ
    const [animationKey, setAnimationKey] = useState(0)
    const [showWeightPage, setShowWeightPage] = useState(false)
        // 【新機能】ボタンを押すたびにアニメーションを強制リセットさせるための識別用スタンプ

    const changeFood = () => {
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
        setKcal('') // 食べ物を変えたら一旦クリア
    }

    const handleCalculate = () => {
        setKcal(inputValue)
        setAnimationKey(prev => prev + 1) // 数値が変わらなくてもここが増えればアニメーションが再発火する
    }
    
    const amount = kcal === '' ? 0 : Number(kcal) / randomFood.kcal
    const unitCount = Math.floor(amount)
    const visibleCount = Math.min(unitCount, 20)
    const moreCount = unitCount - visibleCount

    if (showTitlePage) {
        return <TitlePage onBack={() => setShowTitlePage(false)} />
    }

    if (showWeightPage) {
        return <WeightPage onBack={() => setShowWeightPage(false)} />
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            <button onClick={handleCalculate}>
                計算する
            </button>

            <button onClick={() => setShowWeightPage(true)}>
                体重の入力
            </button>

            <button onClick={changeFood}>
                食べ物を変更
            </button>

            <p>
                入力されたカロリーは {randomFood.name}{' '}
                {amount === 0 ? 0 : amount.toFixed(2)} {randomFood.unit} です
            </p>

            {unitCount > 0 && (
                /* ここに animationKey を渡すことで、計算ボタンを押すたびに中の要素ごと初期化・再描画されて確実に降ってきます */
                <div className="food-image-list" key={animationKey}>
                    {Array.from({ length: visibleCount }, (_, index) => (
                        <img
                            key={index}
                            src={randomFood.image}
                            alt={`${randomFood.name} ${index + 1}`}
                            className="food-image"
                            /* 【重要】1枚ごとにdelay（時間差）を0.08秒ずつずらして、ポロポロと降らせる */
                            style={{ animationDelay: `${index * 0.08}s` }}
                        />
                    ))}
                    {moreCount > 0 && (
                        <div 
                            className="more-count"
                            /* 画像が全部落ちきったあとに最後の文字を落とす指定 */
                            style={{ animationDelay: `${visibleCount * 0.08}s` }}
                        >
                            +{moreCount} つ
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default App