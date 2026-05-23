import './App.css'

function TitlePage({ onBack }) {
  return (
    <section className="title-page">
      <h1>カロリー計算アプリへようこそ</h1>
      <p style={{ color: 'black' }}>入力したカロリーから、どんぶり変換します。</p>
      <button onClick={onBack} style={{ marginTop: '1rem' }}>
        ダイエットに行く！！！！
      </button>
    </section>
  );
}

export default TitlePage;
