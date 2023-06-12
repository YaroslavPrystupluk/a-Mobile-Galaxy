import { Link } from "react-router-dom";
import "./NotPage.scss";

function NotPage() {
	return (
		<div className="page__cont _not-page">
			<div>
				<p className="page-title">This page has been abducted.</p>
				<p className="page-desc">Let’s head back home and try that again.</p>
				<p>
					<Link to="/">Home</Link>
				</p>
			</div>
		</div>
	);
}
export default NotPage;
