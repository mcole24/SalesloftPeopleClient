import React from 'react';
import { fetchDuplicates } from '../actions/AsyncActions';

export class DuplicateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { duplicates: [] };
        this.addDuplicate = this.addDuplicate.bind(this);
    }

    addDuplicate(data) {
        this.setState(prevState => {
            duplicates: [...prevState.duplicates, ...data]
        });
    }

    render() {
        return (
            <div>
                <DuplicateTable characterCounts={this.state.duplicates} />
                <DuplicateButton onClick={this.addDuplicate} />
            </div>       
        );
    }
}

export const DuplicateButton = (props) => {
    const handleClick = () => {
        fetchDuplicates().then(res => {
            props.onClick(res.response);
        });
    }
    return (
        <button onClick={handleClick}>Duplicates</button>
    );
}

export const DuplicateRow = (props) => {
    return (
        <tr>
            <td>{props.original.email_address}</td>
            <td>{props.duplicate.email_address}</td>
        </tr>
    );
}

export const DuplicateTable = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Original</th>
                    <th>Duplicate</th>
                </tr>
            </thead>
            <tbody>
                {props.characterCounts.map(d => <DuplicateRow id={d.original.username} {...d} />)}
            </tbody>
        </table>
    );
}