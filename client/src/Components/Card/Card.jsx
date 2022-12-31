import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

// export default function Card({name, flag, continent, id}){
//     return(
//         <div className='container'>
//             <Link className='card' to={`/home/${id}`}>
//                 <div className='wrapperImg'>
//                     <img className="imgCountry" src={flag} alt={name} />
//                 </div>
//                 <div className='cardText'>
//                     <h2 className="cardTitle">{name}</h2>
//                     <h4 className="cardSub">{continent}</h4>
//                 </div>
//             </Link>
//         </div>
//     )
// };

export default class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className='container'>
                <Link className='card' to={`/home/${this.props.id}`}>
                    <div className='wrapperImg'>
                        <img className="imgCountry" src={this.props.flag} alt={this.props.name} />
                    </div>
                    <div className='cardText'>
                        <h2 className="cardTitle">{this.props.name}</h2>
                        <h4 className="cardSub">{this.props.continent}</h4>
                    </div>
                </Link>
            </div>
        )
    }
};
