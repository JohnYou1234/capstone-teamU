import { VscListFlat } from "react-icons/vsc";
import { AiOutlineHome, AiOutlineFilter } from "react-icons/ai";
import { MdOutlineCreate } from "react-icons/md";

import './header.css'
function Header () {
  return (
      <header className="header">
        <h2>Howler</h2>
        <div className="row-center"><AiOutlineHome /><p className="icon-text"> Home</p></div>
        <div className="row-center"><MdOutlineCreate /><p className="icon-text">Post</p></div>
        <div className="row-center"><AiOutlineFilter /><p className="icon-text">Filter</p></div>
        <div style={{ float: 'right', paddingRight: 20 }} className="row-center"><VscListFlat/><p className="icon-text">Boards</p></div>
      </header>
  );
}

export default Header;
