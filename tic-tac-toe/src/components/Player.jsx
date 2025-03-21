import { useState } from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        // setIsEditing(!isEditing);  // DO NOT UPDATE STATE LIKE THIS. Race conditions.
        setIsEditing(editing => !editing); // preferred way.
        onChangeName(symbol, playerName);
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let ePlayerName = !isEditing ? <span className="player-name">{playerName}</span> :
            <input type="text" required value={playerName} onChange={handleChange}/>;

    let buttonText = !isEditing ? "Edit" : "Save";

    return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {ePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{buttonText}</button>
    </li>
    );
}
