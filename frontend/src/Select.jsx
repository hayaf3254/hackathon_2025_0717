import { useNavigate, Link } from "react-router-dom";
import './App.css';


const Select = () => {
	return(
		<div>
			<h1>プロンプト倉庫</h1>
			<div>
				<Link to="#" className="select-button">プロンプト一覧</Link>
			</div>
			<div>
				<Link to="/create-ai" className="select-button">プロンプト作成(AI)</Link>
			</div>
			<div>
				<Link to="#" className="select-button">プロンプト作成</Link>
			</div>
		</div>
	)
}

export default Select;