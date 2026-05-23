import { useState } from 'react'

function WeightPage({ onBack }) {
const [weight, setWeight] = useState('')

return (
    <div className="weight-page" style={{ padding: '2rem' }}>
    <h1>体重の入力</h1>
    <p>あなたの体重を入力してください。</p>

    <input
        type="number"
        min="0"
        placeholder="体重 (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', maxWidth: '300px' }}
    />

    {weight !== '' && (
        <p style={{ marginTop: '1rem' }}>
        入力された体重: {weight} kg
        </p>
    )}

    <div style={{ marginTop: '1.5rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1rem' }}>
        戻る
        </button>
    </div>
    </div>
)
}

export default WeightPage
