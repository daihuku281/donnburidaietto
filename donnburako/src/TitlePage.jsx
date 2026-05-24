import './App.css'

function TitlePage({ onBack }) {
  return (
    <section className="title-page">
      {/* ↓ styleを追加（例として 3rem や 45px などお好みのサイズに） */}
      <h1 style={{ fontSize: '5rem', marginBottom: '11rem' }}>DonburiDietへようこそ</h1>
      <p style={{ color: 'black' }}>入力したカロリーから、どんぶり変換します。</p>
      <button onClick={onBack} style={{ marginTop: '1rem', padding: '1rem 2.5rem', fontSize: '1.2rem', borderRadius: '2rem' }}>
        ダイエットに行く！！！！
      </button>
    </section>
  );
}

export default TitlePage;
