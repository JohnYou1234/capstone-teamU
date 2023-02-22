import './post.css'
function Post (props) {
    let data = props.postData;
    let bcolor = data.bg;
    return (
        <div className="post"    
            style={{
                backgroundColor: `${bcolor}`
            }}>
            <p className='category'>{data.category}</p>
            <p className='title'>{data.title}</p>
            <p>
                {data.text}
            </p>
            {data.image ?  <img src={data.image} className="prev-img" /> : <p></p>}
        </div>
    );
}
export default Post;
