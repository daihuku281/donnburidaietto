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
            style={{ padding: '2rem' }}
        >

            {/* タイトル */}
            <h1>体重の入力</h1>

            {/* 説明文 */}
            <p>あなたの体重を入力してください。</p>

            {/* 体重入力欄 */}
            <input
                type="number"
                min="0"
                placeholder="体重 (kg)"

                // 入力値
                value={weight}

                // 入力されたらstate更新
                onChange={(e) => setWeight(e.target.value)}

                // 見た目
                style={{
                    padding: '0.5rem',
                    fontSize: '1rem',
                    width: '100%',
                    maxWidth: '300px'
                }}
            />

            {/* 体重が入力されている時だけ表示 */}
            {weight !== '' && (
                <>
                    {/* 入力された体重表示 */}
                    <p style={{ marginTop: '1rem' }}>
                        入力された体重: {weight} kg
                    </p>

                    {/* 一番近いキャラ表示 */}
                    <p>
                        あなたの体重はだいたい
                        「{closestFighter.name}」
                        に一番近いです！
                    </p>

                    {/* キャラクター重量表示 */}
                    <p>
                        重量:
                        {closestFighter.weight}
                        kg
                    </p>
                </>
            )}

            {/* 戻るボタン */}
            <div style={{ marginTop: '1.5rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '0.75rem 1rem'
                    }}
                >
                    戻る
                </button>
            </div>
        </div>
    )
}

export default WeightPage
