import React from 'react';
import { fetchPeople } from '../actions/AsyncActions';

export const PeopleButton = (props) => {
    const handleClick = () => {
        fetchPeople().then(res => {
            props.onClick(res.response.data);
        })
    };
    return (<button onClick={handleClick}>Click Here</button>);
};

export const PeopleList = (props) => {
    return (
        <div>{props.people.map(p => <Person key={p.id} {...person} />)}</div>
    );
}

class Person extends React.Component {
    render() {
        const person = this.props;
        return (
            <div>
                <div>{person.first_name}</div>
                <div>{person.email_address}</div>
                <div>{person.title}</div>
            </div>
        );
    }
}

export class PeopleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {people: []};
        this.addToPeople = this.addToPeople.bind(this);
    }

    addToPeople(data) {
        this.setState(prevState => ({
            people: [...prevState.people, ...data]
        }));
    }

    render() {
        return (
            <div>
                <PeopleList people={this.state.people} />
                <PeopleButton onClick={this.addToPeople}/>
            </div>
        );
    }
}