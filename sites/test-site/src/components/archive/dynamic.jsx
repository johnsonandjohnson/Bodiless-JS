/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

export default class Dynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      pollen: 'No information available.',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    const outputVersions = ['LOW', 'MEDIUM', 'HIGH'];
    const pollenIndex = outputVersions[Math.floor(Math.random() * outputVersions.length)];
    this.setState({
      pollen: pollenIndex,
    });
    const { value, pollen } = this.state;
    // eslint-disable-next-line no-console
    console.log(`value: ${value} pollen: ${pollen}`);
    event.preventDefault();
  }

  render() {
    const { value, pollen } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="zipcode">
            Zipcode:
            <input
              type="text"
              value={value}
              onChange={this.handleChange}
              id="zipcode"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h5 className="text-sm font-bold">Your pollen count:</h5>
          <span>{pollen || 'No information available'}</span>
        </div>
      </div>
    );
  }
}
