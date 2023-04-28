import './CreatePoll.css';
function CreatePoll(props) {
    const options = props.pollOptions;
    const setOptions = props.setPollOptions;
    const question = props.pollQuestion;
    const setQuestion = props.setPollQuestion;
    const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    };
    
    const handleAddOption = () => {
        if (options.length < 4) {
            setOptions([...options, '']);
        }
    };
    
    const handleRemoveOption = (index) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };
  return (
    <div className="poll-create">
    <form>
        <div className="poll-create-question">
            <label htmlFor="question-input">Question:</label>
            <input id="question-input" type="text" required maxLength={100} value={question} onChange={(event) => setQuestion(event.target.value)} />
            <small className="max-length-message">{`${question.length}/100`}</small>
        </div>
        <div className="poll-create-options">
            {options.map((option, index) => (
                <div className="poll-create-option" key={index}>
                <label htmlFor={`option-${index}-input`}>{index + 1}:</label>
                <input id={`option-${index}-input`} type="text" required maxLength={30} value={option} onChange={(event) => handleOptionChange(index, event.target.value)} />
                <small className="max-length-message">{`${option.length}/30`}</small>
                {index > 1 && <button type="button" onClick={() => handleRemoveOption(index)}>−</button>}
                </div>
            ))}
            {options.length < 4 && <button type="button" onClick={handleAddOption}>+</button>}
        </div>
      </form>
    </div>
  );
}

export default CreatePoll;
