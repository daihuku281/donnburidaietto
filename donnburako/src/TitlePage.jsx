import './App.css'

function TitlePage({ onBack }) {
  return (
    <section className="title-page">
      <h1>カロリー計算アプリへようこそ</h1>
      <p style={{ color: 'black' }}>入力したカロリーから、どんぶり変換します。</p>
      <button onClick={onBack} style={{ marginTop: '1rem', padding: '1rem 2.5rem', fontSize: '1.2rem', borderRadius: '2rem' }}>
        ダイエットに行く！！！！
      </button>
    </section>
  );
}

export default TitlePage;
