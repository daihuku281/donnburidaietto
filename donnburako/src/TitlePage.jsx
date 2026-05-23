function TitlePage({ onBack }) {
  return (
    <section style={{
      padding: '2rem',
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff9999, #ffcc88, #ffff88, #99dd99, #88dddd, #8888ee, #dd88dd)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1>カロリー計算アプリへようこそ</h1>
      <p style={{ color: 'black' }}>入力したカロリーから、どんぶり変換します。</p>
      <button onClick={onBack} style={{ marginTop: '1rem' }}>
        ダイエットに行く！！！！
      </button>
    </section>
  );
}

export default TitlePage;
