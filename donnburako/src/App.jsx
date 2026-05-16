import { useState } from 'react'
import TitlePage from './TitlePage'

function App() {
    const katudonn = 900
    const text = "カロリー量を入力してください"
    const [page, setPage] = useState('home')
    const [kcal, setkal] = useState("")

    return(
        <>
        <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => setPage('home')}>
                アプリ画面
            </button>
            <button type="button" onClick={() => setPage('title')}>
                タイトルページ
            </button>
        </nav>

        {page === 'title' ? (
            <TitlePage />
        ) : (
            <>
                <h1>{text}</h1>
                <input
                    type="number"
                    placeholder="カロリーを入力してください"
                    value={kcal}
                    onChange={(e) => setkal(e.target.value)}
                />
                <p>入力されたカロリーはカツ丼 {kcal === "" ? 0 : (Number(kcal) / katudonn).toFixed(2)} 個です</p>
            </>
        )}
        </>
    )
}

export default App