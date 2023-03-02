// WARNING MUST LIFT THE BG COLOR STATE UP TO THE PARENT COMPONENT
function ColorPalette(props) {
    const colorList = props.colorList;
    const bgColor = props.bgColor;
    const handleBgColorChange = props.handleBgColorChange;
    const includeBtn = props.includeBtn;
    const BgColorButton = (color) => {
        return (<div key={color} className="bg-color-button" style={{backgroundColor: color}} onClick={() => handleBgColorChange(color)}></div>)
    }
    return (
        <>
            <div className="bg-color-container">
                {colorList.map(color => BgColorButton(color))}
            </div>
            {includeBtn ? <div className="bg-color-preview" style={{width: '50px', height: '50px', backgroundColor: bgColor}}></div> : null}
        </>
    )
}

export default ColorPalette;