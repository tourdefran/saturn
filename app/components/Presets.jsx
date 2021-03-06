// receives synth props from Synth (which gets them from store), and saves those into Firebase
// selector that has all the default and user preset options
// button for saving current preset - calls a modal that asks for preset name?

import React, { Component } from 'react';
import { Selector } from './Selector.jsx';

class Presets extends Component {
  constructor(){
    super()
    this.state = {
      options: []
    }

    this.loadPreset = this.loadPreset.bind(this);
  }

// have this function set the options for the loadPreset selector
  componentDidMount(){
    const { firebase } = this.props;
    firebase.database().ref('presets').on('value', snapshot => {
      if(!snapshot) return;
      this.setState({options: (Object.keys(snapshot.val()))})
    })
  }

  // make separation in db between default presets and user presets
  savePreset(event){
    const { synth, firebase } = this.props;
    event.preventDefault();
    let key = event.target.newPreset.value;
    // if (!key.length) block validation
    firebase.database().ref("presets").update({
      [key]: synth})
  }

  loadPreset(e){
    const { synth, firebase, updateSynths, changePreset } = this.props;
    let presetName = e.target.value;

    return firebase.database().ref('presets').once('value')
    .then((snapshot) => {
      // wrap in a promise so updateSynths doesn't execute until the store is updated?
      changePreset(snapshot.val()[presetName]);
      updateSynths();
    });
  }

  render() {
    const { synth, firebase } = this.props;
    return (
      <div className='presetContainer'>
        <p>PRESETS</p>
        <form onSubmit={(e) => this.savePreset(e)}
              id='savePreset'
              className='section'>
          <input type="submit"
                 value="SAVE" />
          <input type="text" name="newPreset" />
        </form>
        <div className='section'>
          <Selector name='Load'
                    changeOption={this.loadPreset}
                    options={this.state.options} />
        </div>
      </div>
    )
  }
}

export default Presets;
