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
            image: '/images/11f24f5820d0739c31575ef5f36f83e9.png',
        },
        {
            name: '大福',
            kcal: 250,
            unit: '個',
            image: '/images/Daifuku_1.png',
        },
        {
            name: '大根',
            kcal: 15,
            unit: '本',

            image: '/images/daikonn(1).png',

        },
        {
            name: 'どんぐり',
            kcal: 10,
            unit: '個',
            image: '/images/large.png',
        },
        {
            name: 'ダチョウの肉',
            kcal: 140,
            unit: '枚',
            image: '/images/dachou.png',
        },
        {
            name: 'ドラゴンフルーツ',
            kcal: 15,
            unit: '個',
            image: '/images/image80.png',
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
    const [showBurnInput, setShowBurnInput] = useState(false)
    const [burnKcal, setBurnKcal] = useState('')
    const [burnApplied, setBurnApplied] = useState(false)
    const [imageState, setImageState] = useState('normal')

    const changeFood = () => {
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
        setKcal('') // 食べ物を変えたら一旦クリア
    }

    const handleCalculate = () => {
        const net = Math.max(0, Number(inputValue) - Number(burnKcal || 0))
        setKcal(String(net))
        setAnimationKey(prev => prev + 1)
        setBurnApplied(burnKcal !== '')
        setImageState('normal')
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

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button onClick={handleCalculate}>
                    計算する
                </button>
                {kcal !== '' && !showBurnInput && (
                    <button onClick={() => setShowBurnInput(true)}>
                        消費カロリーを入力
                    </button>
                )}
                {showBurnInput && (
                    <input
                        type="number"
                        min="1"
                        placeholder="消費カロリー"
                        value={burnKcal}
                        onChange={(e) => setBurnKcal(e.target.value)}
                    />
                )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button onClick={() => setShowWeightPage(true)}>
                    体重の入力
                </button>
                {kcal !== '' && (
                    <>
                        <button onClick={() => setImageState('sucked')}>吸い込む</button>
                        <button onClick={() => imageState === 'sucked' && setImageState('spit')}>吐き出す</button>
                    </>
                )}
            </div>

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
                            src={encodeURI(randomFood.image)}
                            alt={`${randomFood.name} ${index + 1}`}
                            className={`food-image${imageState === 'sucked' ? ' sucked-in' : imageState === 'spit' ? ' spit-out' : ''}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        />
                    ))}
                    {moreCount > 0 && (
                        <div
                            className={`more-count${imageState === 'sucked' ? ' sucked-in' : imageState === 'spit' ? ' spit-out' : ''}`}
                            style={{ animationDelay: `${visibleCount * 0.05}s` }}
                        >
                            +{moreCount} つ
                        </div>
                    )}
                </div>
            )}

            <img
                src={encodeURI('/images/スクリーンショット 2026-05-23 20.38.20.png')}
                alt="decoration"
                style={{ position: 'fixed', bottom: '4rem', right: '-8rem', width: '700px' }}
            />
        </div>
    )
}

export default App