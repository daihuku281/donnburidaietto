import { useState } from 'react'

function WeightPage({ onBack }) {

    // 入力された体重を保存するstate
    const [weight, setWeight] = useState('')

    // 結果を表示するか
    const [showResult, setShowResult] = useState(false)

    // フェードイン用
    const [fadeIn, setFadeIn] = useState(false)

    // キャラクターの重量データに image プロパティを追加
    const fighters = [
        { name: '太宰治', weight: 67, image: '/images/250px-Osamu_Dazai.jpg' },
        { name: 'ドクターマリオ', weight: 98, image: '/images/doraemon.jpg' },
        { name: 'ドラえもん', weight: 129, image: '/images/7z2QwBPGvjDXNpuj9GeAwRr0PiWI3dcAr9MEBIJJHTL964YEso0yjlCn96FxFobwS38r4opAhPFYm5hw_main.jpg' },
        { name: 'デビル化カズヤ', weight: 113, image: '/images/kazuya.jpg' },
        { name: 'DIO', weight: 90, image: '/images/chara_img_sp.png' },
        { name: '辞書100冊', weight: 30, image: '/images/dictionary.jpg' },
        { name: 'ヒトコブラクダ', weight: 600, image: '/images/07._Camel_Profile2C_near_Silverton2C_NSW2C_07.07.2007.jpg' },
        { name: 'ドラフトホース', weight: 1000, image: '/public/images/2c84lbvslhb51.jpg' },
    ]

    // 一番近いキャラクターを保存する変数
    let closestFighter = null

    // 決定ボタンを押した時
    const handleCheck = () => {
        // 結果表示ON
        setShowResult(true)

        // 最初は透明
        setFadeIn(false)

        // 少し後に濃くする
        setTimeout(() => {
            setFadeIn(true)
        }, 50)
    }

    // --- 追加：入力欄が変更された時の処理 ---
    const handleInputChange = (e) => {
        // 入力された値をstateに保存
        setWeight(e.target.value)
        
        // 体重が変わったら、一度結果画面を非表示にする
        // これにより、決定を押す前にフライングで結果が切り替わるのを防ぎます
        setShowResult(false)
        
        // フェードインのフラグも初期状態（透明）に戻す
        setFadeIn(false)
    }

    // 何も入力されていない時は計算しない
    if (weight !== '') {
        // reduceを使って一番近いキャラクターを探す
        closestFighter = fighters.reduce((closest, fighter) => {
            const currentDiff = Math.abs(fighter.weight - Number(weight))
            const closestDiff = Math.abs(closest.weight - Number(weight))

            if (currentDiff < closestDiff) {
                return fighter
            }
            return closest
        })
    }

    return (
        <div
            className="weight-page"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #fff7e6, #ffe0b2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem'
            }}
        >

            {/* 白いカード */}
            <div
                style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    textAlign: 'center'
                }}
            >

                {/* タイトル */}
                <h1
                    style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        color: '#ff9800'
                    }}
                >
                    体重チェッカー
                </h1>

                {/* 説明文 */}
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    あなたの体重を入力してください
                </p>

                {/* 入力欄 */}
                <input
                    type="number"
                    min="0"
                    placeholder="体重 (kg)"
                    value={weight}
                    // --- 変更：新しく作った handleInputChange を呼ぶように修正 ---
                    onChange={handleInputChange}
                    style={{
                        padding: '1rem',
                        fontSize: '1.2rem',
                        width: '100%',
                        borderRadius: '12px',
                        border: '2px solid #ffd180',
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                />

                {/* 決定ボタン */}
                <button
                    onClick={handleCheck}
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        border: 'none',
                        borderRadius: '12px',
                        background: '#ff9800',
                        color: 'white',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    決定
                </button>

                {/* 結果表示 */}
                {showResult && closestFighter && (
                    <div
                        style={{
                            opacity: fadeIn ? 1 : 0.1,
                            transition: 'opacity 1.5s',
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: '#fff3e0',
                            borderRadius: '16px'
                        }}
                    >

                        <p style={{ fontSize: '1rem', color: '#555' }}>
                            入力された体重
                        </p>

                        <h2
                            style={{
                                fontSize: '2rem',
                                margin: '0.5rem 0',
                                color: '#e65100'
                            }}
                        >
                            {weight} kg
                        </h2>

                        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                            あなたの体重はだいたい
                        </p>

                        {/* --- 画像表示エリア --- */}
                        <div style={{ margin: '1.5rem 0' }}>
                            <img 
                                src={closestFighter.image} 
                                alt={closestFighter.name}
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover', // 画像を正方形にトリミング
                                    borderRadius: '50%', // 丸くする
                                    border: '4px solid #ff9800', // オレンジの枠線
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    backgroundColor: 'white'
                                }}
                                // 画像が見つからない場合のフォールバック（エラー対策）
                                onError={(e) => {
                                    e.target.src = 'https://placehold.jp/150x150.png?text=No+Image';
                                }}
                            />
                        </div>

                        <h2
                            style={{
                                fontSize: '2rem',
                                color: '#ff5722',
                                margin: '0.5rem 0'
                            }}
                        >
                            {closestFighter.name}
                        </h2>

                        <p style={{ fontSize: '1.1rem', color: '#444' }}>
                            （重量 {closestFighter.weight} kg）
                        </p>

                    </div>
                )}

                {/* 戻るボタン */}
                <button
                    onClick={onBack}
                    style={{
                        marginTop: '2rem',
                        padding: '1rem 2rem',
                        border: 'none',
                        borderRadius: '12px',
                        background: '#ff9800',
                        color: 'white',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    戻る
                </button>

            </div>
        </div>
    )
}

export default WeightPage