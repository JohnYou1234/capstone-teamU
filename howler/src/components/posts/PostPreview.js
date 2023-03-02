import './post.css'
import {Link} from 'react-router-dom';
import {formatDate} from '../../helpers.js';
function PostPreview (props) {
    let data = props.postData;
    let bcolor = data.bgColor;
    return (
        <Link to={`/thread/${data._id}`} className="post-link">
            <div className="post" style={{ backgroundColor: `${bcolor}` }} onClick={() => {console.log("hello")}}>
                <p className="category">{data.category}</p>
                <p className="author">{data.author}</p>
                <p className="title">{data.title}</p>
                <p className="date">{formatDate(data.date)}</p>
                <p className="content">{cutContentShort(data.content)}</p>
                {data.image ? <img src={data.image} className="prev-img" /> : <p></p>}
            </div>
        </Link>
      );
}

function cutContentShort(content) {
    if (content.length > 100) {
        return content.slice(0, 100) + "...";
    }
    return content;
}

export default PostPreview;
