import { useEffect , useState} from "react";
import "./css/game.css";
import { useContext } from "react";
import { ContextUser } from "./contextUser.jsx";
const Games = () => {
    const [games, setGames] = useState([]);
    const [myr, setMyr] = useState(0);  
    const { user } = useContext(ContextUser);
    const RateGame = (gameId) => {
        console.log("user", user);
        fetch(`http://localhost:4002/game/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ rating: myr, userId: user.id, gameId: gameId })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => alert(err));
        fetchGames();
    };
    const fetchGames = async () => {
        await fetch('http://localhost:4002/game/list')
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchGames();
    }, []);

    const renderStars = (rating, unique) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars.push('full');
            else if (rating >= i - 0.5) stars.push('half');
            else stars.push('empty');
        }

        return stars.map((type, idx) => {
            const id = `g-${unique}-${idx}`;
            if (type === 'full') {
                return (
                    <svg key={idx} className="star" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z" fill="#ffd055" />
                    </svg>
                );
            } else if (type === 'half') {
                return (
                    <svg key={idx} className="star" viewBox="0 0 24 24" aria-hidden="true">
                        <defs>
                            <linearGradient id={id} x1="0" x2="1">
                                <stop offset="50%" stopColor="#ffd055" />
                                <stop offset="50%" stopColor="#e6e6e6" />
                            </linearGradient>
                        </defs>
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z" fill={`url(#${id})`} stroke="#d1d1d1" />
                    </svg>
                );
            }

            return (
                <svg key={idx} className="star empty" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.173L12 18.896l-7.336 3.875 1.402-8.173L.132 9.21l8.2-1.192z" fill="#e6e6e6" stroke="#d1d1d1" />
                </svg>
            );
        });
    };

    return (
        <div className="games-wrapper">
            <p className="lead">Check out the latest games available on our platform.</p>

            <div className="cards-grid">
                {games.map(game => (
                    <div className="game-card" key={game.id}>
                        <div className="card-header">
                            <h2>{game.title}</h2>
                     
                            <div className="rating-row">
                                {renderStars(game.rating, game.id)}
                                <span className="rating-num">{game.rating}</span>
                                <br/>
                                {user &&  (
                                    <>
                                    <br/>
                                    <input type="number" id={"rate-"+game.id} name="rating" min="1" max="5" step="1" placeholder="Rate 1-5" onChange={(e) => setMyr(e.target.value)}/>
                                    <br/>
                                    <button className="rateGame" onClick={() => RateGame(game.id)}>rate!</button>
                                    </>
                                )}
                         
                            </div>
                        </div>
                       
                        <p className="description">{game.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Games;
