export default function Home() {
  return (
    <main style={{ 
      padding: '50px', 
      fontFamily: 'sans-serif', 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>
        Adil Morocoo
      </h1>
      
      <p style={{ fontSize: '24px', color: '#333', marginBottom: '40px', fontWeight: 'bold' }}>
        اسم التطبيق: adil-morocco-
      </p>

      <a 
        href="https://youtube.com/@adileddarfi?si=Q2ZLTc_jQy40YD-1" 
        target="_blank"
        style={{
          backgroundColor: '#FF0000',
          color: 'white',
          padding: '18px 40px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontSize: '20px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}
      >
        قناتي على YouTube ▶️
      </a>

      <p style={{ marginTop: '60px', color: '#888' }}>
        الموقع ديالي خدام على Vercel 🚀
      </p>
    </main>
  )
}
<a 
  href="/adil-morocco-.apk" 
  download
  style={{
    backgroundColor: '#00C853',
    color: 'white',
    padding: '18px 40px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    display: 'inline-block'
  }}
