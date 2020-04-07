import * as actions from './Actions'

export const creds = { credentials: 'same-origin' };

export function fetchMe() {
  return dispatch => {
    return fetch('/api/me.json', creds).
      then(response => response.json()).
      then(me => dispatch(actions.receiveMe(me)));
  }
}

export function fetchPeople() {
  return fetch('http://localhost:5000/api/v2/people', creds).then(res => res.json());
}

export function fetchCharacterCount() {
  return fetch('http://localhost:5000/api/v2/character', creds).then(res => res.json());
}

export function fetchDuplicates() {
  return fetch('http://localhost:5000/api/v2/duplicate', creds).then(res => res.json());
}