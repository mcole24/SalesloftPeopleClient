import React from 'react';
import { fetchPeople } from '../actions/AsyncActions';
import styled from 'styled-components'

const FlexItem = styled.div`
  display: flex;
`;

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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Title
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.people.map(person => <PersonRow key={person.id} {...person}/>)}
                </tbody>
            </table>
        </div>
    );
}

class Person extends React.Component {
    render() {
        const person = this.props;
        return (
            <tr>
                <td>{person.first_name}</td>
                <td>{person.email_address}</td>
                <td>{person.title}</td>
            </tr>
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