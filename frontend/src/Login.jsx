// src/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({email, password})
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user_id !== null) {
          login(data.user_id);
          alert('ログイン成功');
          // navigate 追加をおすすめ
        } else {
          alert('ログイン失敗。メールアドレスかパスワードが違います。');
        }
      } else {
        alert('ログインに失敗しました（ステータスエラー）');
      }

    }catch(err){
      console.log("ログインエラー",err)
      alert("ログイン時にエラーが発生しました")
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            placeholder="●●●●●●"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />

          <button type="submit">ログイン</button>
        </form>

        {/* 新規登録リンク */}
        <div className="register-link">
          アカウントをお持ちでない方は <Link to="/register">新規登録はこちら</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
