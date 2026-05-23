import { useState } from 'react'

function WeightPage({ onBack }) {

    // 入力された体重を保存するstate
    const [weight, setWeight] = useState('')

    //キャラクターの重量データ
    const fighters = [
        { name: '太宰治', weight: 67 },
        { name: 'ドクターマリオ', weight: 98 },
        { name: 'ドラえもん', weight: 129 },
        { name: 'デビル化カズヤ', weight: 113 },
        { name: 'DIO', weight: 90 },
        { name: '辞書100冊', weight: 30 },

    ]

    // 一番近いキャラクターを保存する変数
    let closestFighter = null

    // 何も入力されていない時は計算しない
    if (weight !== '') {

        // reduceを使って一番近いキャラクターを探す
        closestFighter = fighters.reduce((closest, fighter) => {

            // 今調べているキャラクターとの差
            const currentDiff =
                Math.abs(fighter.weight - Number(weight))

            // 今までで一番近かったキャラクターとの差
            const closestDiff =
                Math.abs(closest.weight - Number(weight))

            // 今のキャラクターの方が近ければ入れ替える
            if (currentDiff < closestDiff) {
                return fighter
            }

            // 近くなければ今までのキャラクターを維持
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
            <p
                style={{
                    color: '#666',
                    marginBottom: '1.5rem'
                }}
            >
                あなたの体重を入力してください
            </p>

            {/* 入力欄 */}
            <input
                type="number"
                min="0"
                placeholder="体重 (kg)"

                value={weight}

                onChange={(e) => setWeight(e.target.value)}

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

            {/* 結果表示 */}
            {weight !== '' && (
                <div
                    style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: '#fff3e0',
                        borderRadius: '16px'
                    }}
                >

                    {/* 入力体重 */}
                    <p
                        style={{
                            fontSize: '1rem',
                            color: '#555'
                        }}
                    >
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

                    {/* 一番近いもの */}
                    <p
                        style={{
                            fontSize: '1.2rem',
                            marginTop: '1rem'
                        }}
                    >
                        あなたの体重はだいたい
                    </p>

                    <h2
                        style={{
                            fontSize: '2rem',
                            color: '#ff5722',
                            margin: '1rem 0'
                        }}
                    >
                        {closestFighter.name}
                    </h2>

                    <p
                        style={{
                            fontSize: '1.1rem',
                            color: '#444'
                        }}
                    >
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
                    cursor: 'pointer',
                    transition: '0.2s'
                }}
            >
                戻る
            </button>

        </div>
    </div>
)
}

export default WeightPage
