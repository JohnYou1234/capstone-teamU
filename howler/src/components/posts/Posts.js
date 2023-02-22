import Post from './Post';
import {postData} from '../../data/post_data.js';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

function Posts () {
    return (
        <div className="posts">
                <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 730: 2, 1062: 3, 1400: 4, 1730: 5}}
            >

                <Masonry className='masonry'>
                {postData.map((post, index) => {
                    return (
                        <Post key={index} postData={post}/>
                    )
                })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}
export default Posts;
