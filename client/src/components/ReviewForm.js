import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../actions/review';

const ReviewForm = ({ postReview, id }) => {

    const [formData, setFormData] = useState({rating: '5'});

    const handleSubmit = ev => {
        ev.preventDefault();

        postReview(formData, id);
    }

    const handleInputChange = ev => {
        setFormData({
            ...formData,
            [ev.target.name] : ev.target.value
        })
    }

    return (
        <div className="p-4">
            <h3 className="h3"><i>Write review:</i></h3>
            <hr/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea name="review" className="form-control"  aria-describedby="emailHelp" placeholder="Body" value={formData['review']} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                   Rating: <br/>
                        <select value={formData['rating']} name="rating" id="rating" className="form-control my-2" onChange={handleInputChange}>
                            {
                                [1, 2, 3, 4, 5].map(rating =>(
                                    <option value={String(rating)}>{String(rating)} 
                                    { 
                                        rating === 5 && '  (Great)' ||
                                        rating === 4 && '  (Good)' ||
                                        rating === 3 && '  (Ok)' || 
                                        rating === 2 && '  (Bad)' ||
                                        rating === 1 && '  (Really bad)'
                                    }
                                    </option>
                                ))
                            }
                        </select>  
                </div>
                <input type="submit" className="btn btn-danger" value="Post" />
            </form>
        </div>
    )
}

export default connect(null, { postReview })(ReviewForm);
