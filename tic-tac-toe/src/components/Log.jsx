
export default function Log({turns}) {
    const listItems = turns.map(t => {
        const {row, col} = t.square;
        const txt = `${t.player} selected ${row},${col}`;
        return <li key={`${row}${col}`}>{txt}</li>;
    });
    return (
    <ol id="log">
        {listItems}
    </ol>);
}