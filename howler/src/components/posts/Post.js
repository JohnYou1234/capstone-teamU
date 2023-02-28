import './post.css'
function Post (props) {
    let data = props.postData;
    let bcolor = data.bgColor;
    return (
        <div className="post" style={{ backgroundColor: `${bcolor}` }}>
          <p className="board">{"INSERT BOARD"}</p>
          <p className="category">{data.category}</p>
          <p className="author">{data.author}</p>
          <p className="title">{data.title}</p>
          <p className="date">{formatDate(data.date)}</p>
          <p className="content">{data.content}</p>
          {data.image ? <img src={data.image} className="prev-img" /> : <p></p>}
        </div>
      );
}

function formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [month, day, year].join('/');
}
export default Post;
