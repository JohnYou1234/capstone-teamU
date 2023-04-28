import { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../AuthContext';

function Poll({ pollId }) {
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const { userId, isLoggedIn, setShowAuthModal } = useContext(AuthContext);
  const [disableBtn, setDisableBtn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    setDisableBtn(true);
    fetch('/api/polls/getPollData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pollId,
        userId
      })
    })
      .then(res => res.json())
      .then(data => {
        setPollData(data);
        setLoading(false);
        setDisableBtn(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [pollId, userId, refresh]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleVote = () => {
    if (selectedOption === null) {
      return;
    }
    if (!isLoggedIn) {
        setShowAuthModal(true);
        return;
    }
    const optionIndex = parseInt(selectedOption);

    fetch(`/api/polls/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        optionIndex,
        userId,
        pollId
      })
    })
      .then(res => res.json())
      .then(data => {
        setPollData(data);
        setRefresh(!refresh);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="poll">
      {loading ? (
        <div className='center-div'>
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : (
        <>
          <h2>{pollData.poll.question}</h2>
          {pollData.hasVoted ? (
            <>
              {pollData.poll.options.map((option, index) => (
                <div key={index}>
                  <span>{option}: </span>
                  <span>{pollData.poll.votes[index]}</span>
                </div>
              ))}
              <div>
              </div>
            </>
          ) : (
            <>
              {pollData.poll.options.map((option, index) => (
                <div key={index}>
                  <input type="radio" id={`option-${index}`} name="option" value={index} onChange={handleOptionChange} />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
              <Button onClick={handleVote} disabled={selectedOption === null || disableBtn}>Vote</Button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Poll;
