function TitlePage({ onBack }) {
  return (
    <section style={{
      padding: '2rem',
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, red, orange, yellow, green, cyan, blue, violet)',
    }}>
      <h1>カロリー計算アプリへようこそ</h1>
      <p>入力したカロリーから、どんぶり変換します。</p>
      <button onClick={onBack} style={{ marginTop: '1rem' }}>
        ダイエットに行く！！！！
      </button>
    </section>
  );
}

export default TitlePage;
