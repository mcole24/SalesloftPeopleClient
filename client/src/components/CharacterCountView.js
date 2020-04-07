import React from 'react';
import { fetchCharacterCount } from '../actions/AsyncActions';

export class CharacterCountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { characterCounts: [] };
        this.addCharacterCount = this.addCharacterCount.bind(this);
    }

    addCharacterCount(data) {
        this.setState(prevState => {
            characterCounts: [...prevState.characterCounts, ...data]
        });
    }

    render() {
        return (
            <div>
                <CharacterCountTable characterCounts={this.state.characterCounts} />
                <CharacterCountButton onClick={this.addCharacterCount} />
            </div>       
        );
    }
}

export const CharacterCountButton = (props) => {
    const handleClick = () => {
        fetchCharacterCount().then(res => {
            props.onClick(res.response);
        });
    }
    return (
        <button onClick={handleClick}>Charater Count</button>
    );
}

export const CharacterCountRow = (props) => {
    return (
        <tr>
            <td>{props.letter}</td>
            <td>{props.count}</td>
        </tr>
    );
}

export const CharacterCountTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Character</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {props.characterCounts.map(c => <CharacterCountRow id={c.letter} {...c} />)}
            </tbody>
        </table>
    );
}