import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export type CardType = {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    imageUrl: string;
}

interface Props {
    data: CardType;
    categoryChange: Function;
};


class Card extends React.Component<Props> {

    render() {
        const { data } = this.props;

        return (
            <div className="card border-0 m-4 shadow bg-dark bg-opacity-10">
                <img src={data.imageUrl} alt={data.name} className="card-img-top" />
                <button
                    onClick={() => this.props.categoryChange(data.category)} className='text-capitalize badge bg-info border-0'>
                    {data.category}
                </button>
                <div className="card-body">
                    <div className="card-title">
                        <Link to={`/update/${data._id}`}>
                            {data.name}
                        </Link>
                    </div>
                    <div className="card-text">
                        {data.description}
                    </div>
                    <div>{data.price}</div>
                    <div>
                        Rating: {data.rating}
                        <i className="bi-star"></i>
                    </div>

                    <Link to="/order" state={data} className="btn btn-primary">
                        Order Now
                    </Link>
                </div>
            </div>
        );
    }
}

export default Card;