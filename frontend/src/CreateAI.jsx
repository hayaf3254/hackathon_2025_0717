import React, { useState } from 'react';
// useLocation は今回使用しないため、インポートを残すか削除はお好みで
// import { useLocation } from 'react-router-dom'; 

const CreateAI = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError('');
        setAiResponse('');

        try {
            const response = await fetch('http://127.0.0.1:5000/ai/generate', {
                method: 'POST', // FlaskのGETメソッド設定に合わせています
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setAiResponse(data.message);
            } else {
                setError(data.error || 'AIからの応答でエラーが発生しました。');
            }
        } catch (err) {
            console.error('API呼び出し中にエラーが発生しました:', err);
            setError('ネットワークエラーまたはサーバーに接続できませんでした。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>AIプロンプト作成</h1>

            <div>
                <label htmlFor="title">タイトル</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="タイトルを入力してください"
                    required
                />
            </div>

            <div>
                <label htmlFor="content">作成したいプロンプトの内容</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="作成したい内容を書いてください"
                    rows="4"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? '実行中...' : '実行'}
            </button>

            {error && (
                <div>
                    <strong>エラー:</strong> {error}
                </div>
            )}

            <div>
                <h2>AIの回答</h2>
                <textarea
                    value={aiResponse}
                    readOnly
                    placeholder="作成したい内容を書いてください"
                    rows="8"
                ></textarea>
            </div>

            <button>
                保存
            </button>
        </div>
    );
};

export default CreateAI;