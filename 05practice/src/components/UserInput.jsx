

export default function UserInput({ onChange, inputData }) {
    console.log(`userInput: ${JSON.stringify(inputData)}`);
    return <section id="user-input" >
        <div className="input-group" >
        <p>
            <label>Initial Investment</label>
            <input type="number" required
              value={inputData.initialInvestment}
              onChange={(event) => onChange('initialInvestment', event.target.value)} />
        </p>
        <p>
            <label>Annual Investment</label>
            <input type="number" required
              value={inputData.annualInvestment}
              onChange={(event) => onChange('annualInvestment', event.target.value)} />
        </p>
        </div>
        <div className="input-group">
        <p>
            <label>Expected Return</label>
            <input type="number" required
              value={inputData.expectedReturn}
              onChange={(event) => onChange('expectedReturn', event.target.value)} />
        </p>
        <p>
            <label>Duration</label>
            <input type="number" required
              value={inputData.duration}
              onChange={(event) => onChange('duration', event.target.value)} />
        </p>
        </div>
    </section>
}