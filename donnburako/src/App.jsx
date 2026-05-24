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
            desc: 'ジューシーなトンカツを甘辛い出汁と卵でふんわりとじた、ボリューム満点のがっつり飯！これ一杯で元気がみなぎります。',
        },
        {
            name: '大福',
            kcal: 250,
            unit: '個',
            image: '/images/Daifuku_1.png',
            desc: '柔らかいお餅の中に、程よい甘さのあんこがぎっしり。お茶請けにぴったりな、ほっとする伝統の和菓子です。',
        },
        {
            name: '大根',
            kcal: 15,
            unit: '本',
            image: '/images/daikonn(1).png',
            desc: '水分たっぷりでとってもヘルシー！煮物やおでんにすると味が染みて絶品、すりおろせばサッパリと万能な冬の定番野菜です。',
        },
        {
            name: 'どんぐり',
            kcal: 10,
            unit: '個',
            image: '/images/large.png',
            desc: '森のリスたちの大好物。人間が食べるにはアク抜きが大変だけど、ちんまりとしたフォルムが見ているだけで癒やされます。',
        },
        {
            name: 'ダチョウの肉',
            kcal: 140,
            unit: '枚',
            image: '/images/dachou.png',
            desc: '実はとっても高タンパク・低カロリーでヘルシーなお肉！クセが少なくて柔らかく、ローストやステーキにすると絶品です。',
        },
        {
            name: 'ドラゴンフルーツ',
            kcal: 15,
            unit: '個',
            image: '/images/image80.png',
            desc: '南国気分を味わえる鮮やかな見た目！さっぱりとした上品な甘さと、キウイに似たプチプチとした種の食感が楽しいフルーツです。',
        },
        {
            name: 'ダニエルが育てた謎の野菜',
            kcal: 2750,
            unit: '束',
            image: '/images/スクリーンショット 2026-05-23 021419.png',
            desc: 'ダニエルが独自の特殊な農法で育て上げた、驚異の超高カロリー野菜。一口食べれば一週間は動けるという噂の、謎に包まれた逸品。',
        },
    ]
    
    const [inputValue, setInputValue] = useState('')
    const [kcal, setKcal] = useState('')
    const [randomFood, setRandomFood] = useState(foods[0])
    const [showTitlePage, setShowTitlePage] = useState(true)
    const [animationKey, setAnimationKey] = useState(0)
    const [showWeightPage, setShowWeightPage] = useState(false)
    const [showBurnInput, setShowBurnInput] = useState(false)
    const [burnKcal, setBurnKcal] = useState('')
    const [burnApplied, setBurnApplied] = useState(false)
    const [imageState, setImageState] = useState('normal')

    const [selectedFoodDesc, setSelectedFoodDesc] = useState(null)

    const changeFood = () => {
        const randomIndex = Math.floor(Math.random() * foods.length)
        setRandomFood(foods[randomIndex])
        setKcal('') 
        setSelectedFoodDesc(null) 
    }

    const resetCalc = () => {
        setInputValue('')
        setKcal('')
        setBurnKcal('')
        setShowBurnInput(false)
        setBurnApplied(false)
        setImageState('normal')
        setSelectedFoodDesc(null)
    }

    const handleCalculate = () => {
        const net = Math.max(0, Number(inputValue) - Number(burnKcal || 0))
        setKcal(String(net))
        setAnimationKey(prev => prev + 1)
        setBurnApplied(burnKcal !== '')
        setImageState('normal')
        setSelectedFoodDesc(null) 
    }
    
    const amount = kcal === '' ? 0 : Number(kcal) / randomFood.kcal
    const unitCount = Math.floor(amount)
    const visibleCount = Math.min(unitCount, 20)
    const moreCount = unitCount - visibleCount

    const handleShowDesc = () => {
        setSelectedFoodDesc({
            name: randomFood.name,
            kcal: randomFood.kcal,
            unit: randomFood.unit,
            desc: randomFood.desc
        })
    }

    if (showTitlePage) {
        return <TitlePage onBack={() => setShowTitlePage(false)} />
    }

    if (showWeightPage) {
        return <WeightPage onBack={() => setShowWeightPage(false)} />
    }

    return (
        <div className="app-container">
            <h1>カロリー量を入力してください</h1>

            <input
                type="number"
                min="1"
                placeholder="カロリーを入力してください"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="main-input"
            />

            {/* 1行目: 計算・消費カロリー入力 */}
            <div className="button-group">
                <button onClick={handleCalculate}>計算する</button>
                {kcal !== '' && !showBurnInput && (
                    <button onClick={() => setShowBurnInput(true)}>消費カロリーを入力</button>
                )}
                {showBurnInput && (
                    <input
                        type="number"
                        min="1"
                        placeholder="消費カロリー"
                        value={burnKcal}
                        onChange={(e) => setBurnKcal(e.target.value)}
                        className="burn-input"
                    />
                )}
            </div>

            {/* 2行目: 吸い込む・吐き出す */}
            <div className="button-group">
                {kcal !== '' && (
                    <>
                        <button onClick={() => setImageState('sucked')}>吸い込む</button>
                        <button onClick={() => imageState === 'sucked' && setImageState('spit')}>吐き出す</button>
                    </>
                )}
            </div>

            {/* 3行目: 食べ物変更・直接解説ボタン */}
            <div className="button-group">
                <button onClick={changeFood}>食べ物を変更</button>
                {unitCount > 0 && (
                    <button onClick={handleShowDesc} style={{ backgroundColor: '#ffda79', color: '#333' }}>
                        🔍 {randomFood.name} の解説を直接見る
                    </button>
                )}
            </div>

            {/* 4行目: ページ移動系 */}
            <div className="button-group">
                <button onClick={() => { resetCalc(); setShowTitlePage(true) }}>
                    タイトルページへ
                </button>
                <button onClick={() => { resetCalc(); setShowWeightPage(true) }}>
                    体重の入力に進む！！！
                </button>
            </div>

            <p className="result-text">
                入力されたカロリーはだいたい {randomFood.name}{' '}
                {amount === 0 ? 0 : Math.round(amount)} {randomFood.unit} です
            </p>

            {unitCount > 0 && (
                <div className="food-image-list" key={animationKey}>
                    {Array.from({ length: visibleCount }, (_, index) => (
                        <div 
                            key={index} 
                            onClick={handleShowDesc} 
                            style={{ display: 'inline-block', cursor: 'pointer' }}
                        >
                            <img
                                src={encodeURI(randomFood.image)}
                                alt={`${randomFood.name} ${index + 1}`}
                                className={`food-image${imageState === 'sucked' ? ' sucked-in' : imageState === 'spit' ? ' spit-out' : ''}`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            />
                        </div>
                    ))}
                    {moreCount > 0 && (
                        <div
                            className={`more-count${imageState === 'sucked' ? ' sucked-in' : imageState === 'spit' ? ' spit-out' : ''}`}
                            style={{ animationDelay: `${visibleCount * 0.05}s` }}
                            onClick={handleShowDesc}
                        >
                            +{moreCount} つ
                        </div>
                    )}
                </div>
            )}

            {selectedFoodDesc && (
                <div className="food-modal-overlay" onClick={() => setSelectedFoodDesc(null)}>
                    <div className="food-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedFoodDesc.name} のヒミツ 🤫</h2>
                        <hr style={{ border: '1px solid #ffeaa7', margin: '10px 0' }} />
                        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                            1{selectedFoodDesc.unit} あたり <strong>{selectedFoodDesc.kcal} kcal</strong>
                        </p>
                        <p className="modal-desc-text">{selectedFoodDesc.desc}</p>
                        <button className="modal-close-btn" onClick={() => setSelectedFoodDesc(null)}>
                            閉じる
                        </button>
                    </div>
                </div>
            )}

            <img
                src="/images/スクリーンショット 2026-05-23 20.38.20.png"
                alt="decoration"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(6%, -22%)',
                    width: '800px',
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}

export default App