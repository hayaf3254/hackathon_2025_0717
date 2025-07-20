// src/PromptList.jsx
import './App.css';
import { useEffect, useState} from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


function PromptList(){
	const navigate = useNavigate();
	const [prompts, setPrompts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(null); 
	const {userId} = useAuth();

	useEffect(() => {
		const fetchPrompts = async () => {
			try {
				const res = await fetch(`http://localhost:5000/api/prompts?userId=${userId}`);
				if(!res.ok) throw new Error('サーバーエラー');
				
				const data = await res.json();
				setPrompts(data);
			} catch(err) {
				setMessage('プロンプトを作成しよう！');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if(userId) {
			fetchPrompts();
		} else {
			alert('ユーザーIDが見つかりません');
			navigate("/login");
		}
	}, [userId]);
	
  return (
		<div className="prompt-list-container">
			{loading && <p>読み込み中...</p>}
			{message && <p>{message}</p>}
      {!loading && !message && prompts.map((p) => (
        <div
					key={p.prompt_id}
					className="prompt-card"
					onClick={() => navigate(`/prompts/${p.prompt_id}`)}
					style={{ cursor: 'pointer' }}
				>
          <h3 className="prompt-title">{p.title}</h3>
        </div>
      ))}
      <Link className="prompt-create-button" to="/select" >プロンプトを作成する</Link>
    </div>
  );
};

export default PromptList;
