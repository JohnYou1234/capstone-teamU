import { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import AuthContext from '../../AuthContext';
import './pollpreview.css';
function PollPreview({ pollId }) {
  const [pollData, setPollData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
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
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }, [pollId, userId]);

  return (
    <div className="poll-preview">
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
              <div key={index} className="poll-option">
                <input type="checkbox" disabled />
                <label>{option}</label>
              </div>
            ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PollPreview;
