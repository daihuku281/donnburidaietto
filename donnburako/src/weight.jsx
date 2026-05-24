import { useState } from 'react'

function WeightPage({ onBack }) {

    // 入力された体重を保存するstate
    const [weight, setWeight] = useState('')

    // 結果を表示するか
    const [showResult, setShowResult] = useState(false)

    // フェードイン用
    const [fadeIn, setFadeIn] = useState(false)

    // --- 追加：選択された小話のテキストを管理するstate ---
    const [selectedStory, setSelectedStory] = useState('')

    // キャラクターの重量データに image と story（小話）プロパティを追加
    const fighters = [
        { name: '太宰治', weight: 67, image: '/images/250px-Osamu_Dazai.jpg', story: '日本の小説家。代表作に「人間失格」や「走れメロス」がある。身長は当時としては高めの175cmほどあったと言われています。' },
        { name: 'ドクターマリオ', weight: 98, image: '/images/800px-E585ACE5BC8FE7B5B5_SP_E38389E382AFE382BFE383BCE3839EE383AAE382AA.png', story: '白衣をまとったマリオ。スマブラ界の「重量級」に片足を突っ込んでいる。カプセルを投げまくる頼れる（？）お医者さん。' },
        { name: 'デビル化カズヤ', weight: 113, image: '/images/7z2QwBPGvjDXNpuj9GeAwRr0PiWI3dcAr9MEBIJJHTL964YEso0yjlCn96FxFobwS38r4opAhPFYm5hw_main.jpg', story: 'デビル因子によって変貌した三島一八の姿。スマブラでも超重量級として、圧倒的な攻撃力とビームで相手を圧倒します。' },
        { name: 'DIO', weight: 90, image: '/images/chara_img_sp2.jpg', story: 'ジョジョの奇妙な冒険に登場する最高にハイな吸血鬼。スタンド「ザ・ワールド」で時を止める。実は身長195cmで、筋肉の塊のわりには引き締まった体重。' },
        { name: '辞書100冊', weight: 30, image: '/images/jisyo.jpg', story: '一般的な広辞苑クラスの厚い辞書は1冊あたり約3kg。100冊集まると300kgになりそうですが、ここでは少し軽めの辞書100冊分の想定です。' },
        { name: 'ヒトコブラクダ', weight: 600, image: '/images/07._Camel_Profile2C_near_Silverton2C_NSW2C_07.07.2007.jpg', story: '砂漠の過酷な環境に耐えるため、背中のコブに脂肪を蓄えている。このコブだけでもかなりの重量があります。' },
        { name: 'ドラフトホース', weight: 1000, image: '/images/2c84lbvslhb51.jpg', story: '「ばん馬」などで知られる超大型の馬。重いソリを引くための強靭な筋肉を持っており、体重はなんと1トンに達します。' },
        { name: 'デデデ大王', weight: 127, image: '/images/dedeking.png', story: 'プププランドの自称大王。スマブラでもトップクラスの重量級ファイター。あの巨大なハンマーを軽々と振り回すパワーの持ち主。' },
        { name: 'ウルトラマンダイナ', weight: 45000000, image: '/images/dyna_kv_1.jpg', story: 'ウルトラマンの額にあるランプは「ビームランプ」など攻撃用が多いですが、ダイナの額のクリスタル（ダイナクリスタル）はタイプチェンジ専用の器官です。ここにエネルギーを集中させることで、姿を瞬時に変えています。' },
        { name: '土星', weight: 570000000000000000000000000, image: '/images/saturn02_2_satall_s.jpg', story: '太陽系の第六惑星。主に水素とヘリウムで構成されたガス巨星。質量は地球の95倍以上あり、非常に大きな重力を持つ。' }
    ]
    // 一番近いキャラクターを保存する変数
    let closestFighter = null

    // 決定ボタンを押した時
    const handleCheck = () => {
        // 結果表示ON
        setShowResult(true)

        // 最初は透明
        setFadeIn(false)

        // 小話をリセット
        setSelectedStory('')

        // 少し後に濃くする
        setTimeout(() => {
            setFadeIn(true)
        }, 50)
    }

    // --- 入力欄が変更された時の処理 ---
    const handleInputChange = (e) => {
        // 入力された値をstateに保存
        setWeight(e.target.value)
        
        // 体重が変わったら、一度結果画面を非表示にする
        setShowResult(false)
        
        // フェードインのフラグも初期状態（透明）に戻す
        setFadeIn(false)

        // 小話もリセット
        setSelectedStory('')
    }

    // --- 追加：キャラクターがクリックされた時の処理 ---
    const handleCharacterClick = (storyText) => {
        // すでに同じ小話が表示されている場合は閉じ、そうでない場合は表示する（トグル処理）
        if (selectedStory === storyText) {
            setSelectedStory('')
        } else {
            setSelectedStory(storyText)
        }
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

                        {/* --- 変更：クリックできるエリア（ボタン要素）にする --- */}
                        <button
                            onClick={() => handleCharacterClick(closestFighter.story)}
                            title="クリックして小話を読む"
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                outline: 'none',
                                width: '100%',
                                display: 'block',
                                margin: '1.5rem 0'
                            }}
                        >
                            {/* 画像表示エリア */}
                            <div style={{ margin: '0 auto', width: '150px' }}>
                                <img 
                                    src={closestFighter.image} 
                                    alt={closestFighter.name}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        border: '4px solid #ff9800',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        backgroundColor: 'white',
                                        transition: 'transform 0.2s'
                                    }}
                                    // マウスホップ時のエフェクト用（お好みで）
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.jp/150x150.png?text=No+Image';
                                    }}
                                />
                            </div>

                            <h2
                                style={{
                                    fontSize: '2rem',
                                    color: '#ff5722',
                                    margin: '0.5rem 0',
                                    textDecoration: 'underline',
                                    textDecorationStyle: 'dotted'
                                }}
                            >
                                {closestFighter.name}
                            </h2>
                        </button>

                        <p style={{ fontSize: '1.1rem', color: '#444' }}>
                            （重量 {closestFighter.weight} kg）
                        </p>

                        <p style={{ fontSize: '0.85rem', color: '#777', mairginTop: '0.5rem' }}>
                            💡 キャラクターをタップすると小話が見れるよ！
                        </p>

                        {/* --- 追加：小話の表示エリア --- */}
                        {selectedStory && (
                            <div
                                style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    background: 'white',
                                    borderRadius: '12px',
                                    borderLeft: '5px solid #ff9800',
                                    textAlign: 'left',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                                    animation: 'fadeIn 0.3s ease-out'
                                }}
                            >
                                <strong style={{ color: '#ff9800', display: 'block', marginBottom: '0.5rem' }}>
                                    豆知識・小話:
                                </strong>
                                <p style={{ fontSize: '0.95rem', color: '#333', margin: 0, lineHeight: '1.5' }}>
                                    {selectedStory}
                                </p>
                            </div>
                        )}

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