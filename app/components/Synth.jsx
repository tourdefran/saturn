import React, { Component } from 'react';
import Tone from 'tone';
// import { playOrReleaseNote } from '../synth_func';

// is there a better place to declare this? I didn't want to put it on state bc changing it would cause a re-render
let keysAllowed = {};

let polySynth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
    // "type": "square"
  },
  "envelope": {
    'attack': 0.8,
    'decay': 0.1,
    'sustain': 0.5,
    'release': 3
  },
  "volume": -60
}).toMaster();

let polySynth2 = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
    "type": "custom"
  },
  "envelope": {
    'attack': 0.8,
    'decay': 0.1,
    'sustain': 0.5,
    'release': 3
  },
  "volume": -60
}).toMaster();

let polySynth3 = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
    "type": "square"
  },
  "envelope": {
    'attack': 0.8,
    'decay': 0.1,
    'sustain': 0.5,
    'release': 3
  },
  "volume": -60
}).toMaster();

let polySynths = [polySynth, polySynth2, polySynth3];

class Synth extends Component {
  constructor(){
    super()

    this.playOrReleaseNote = this.playOrReleaseNote.bind(this);
  }

  componentDidMount(){
    // use .set to change properties on the synths
    // polySynth.set({
    //   "oscillator": {
    //     "type": "square"
    //   }
    // })
  }

  playOrReleaseNote(note, action, visualKey){
    if (action === 'attack') {
      polySynths.forEach(synth => synth.triggerAttack(note, null, 30));
    }
    else if (action === 'release') {
      polySynths.forEach(synth => synth.triggerRelease(note));
    }

    synth.toggle(synth.keys[visualKey]);
  }

  playNote(event){
    // use for computer keyboard - do keyDown events measure velocity?
    // prevents Tab from shifting focus
    if (event.key === 'Tab') event.preventDefault();
    // since keyDown events eventually re-trigger when a key is held down, storing them in an object and using this check will prevent the note from interrupting/replaying
    if (keysAllowed[event.key] === false) return;
    keysAllowed[event.key] = false;
    // based on event.key => toggle a certain synth.key (visual), and play a certain note using Tone
    switch (event.key){
      case 'Tab': this.playOrReleaseNote('C3', 'attack', 0)
                  break;
      case 'q': this.playOrReleaseNote('D3', 'attack', 2)
                break;
      case 'w': this.playOrReleaseNote('E3', 'attack', 4)
                break;
      case 'e': this.playOrReleaseNote('F3', 'attack', 5)
                break;
      case 'r': this.playOrReleaseNote('G3', 'attack', 7)
                break;
      case 't': this.playOrReleaseNote('A3', 'attack', 9)
                break;
      case 'y': this.playOrReleaseNote('B3', 'attack', 11)
                break;
      case 'u': this.playOrReleaseNote('C4', 'attack', 12)
                break;
      case 'i': this.playOrReleaseNote('D4', 'attack', 14)
                break;
      case 'o': this.playOrReleaseNote('E4', 'attack', 16)
                break;
      case 'p': this.playOrReleaseNote('F4', 'attack', 17)
                break;
      case '[': this.playOrReleaseNote('G4', 'attack', 19)
                break;
      case ']': this.playOrReleaseNote('A4', 'attack', 21)
                break;
      case '\\': this.playOrReleaseNote('B4', 'attack', 23)
                break;
      case '1': this.playOrReleaseNote('Db3', 'attack', 1)
                break;
      case '2': this.playOrReleaseNote('Eb3', 'attack', 3)
                break;
      case '4': this.playOrReleaseNote('Gb3', 'attack', 6)
                break;
      case '5': this.playOrReleaseNote('Ab3', 'attack', 8)
                break;
      case '6': this.playOrReleaseNote('Bb3', 'attack', 10)
                break;
      case '8': this.playOrReleaseNote('Db4', 'attack', 13)
                break;
      case '9': this.playOrReleaseNote('Eb4', 'attack', 15)
                break;
      case '-': this.playOrReleaseNote('Gb4', 'attack', 18)
                break;
      case '=': this.playOrReleaseNote('Ab4', 'attack', 20)
                break;
      case 'Backspace': this.playOrReleaseNote('Bb4', 'attack', 22)
                break;
      default: console.log(event.key)
    }
  }

  releaseNote(event){
    switch (event.key){
      case 'Tab': this.playOrReleaseNote('C3', 'release', 0)
                  break;
      case 'q': this.playOrReleaseNote('D3', 'release', 2)
                break;
      case 'w': this.playOrReleaseNote('E3', 'release', 4)
                break;
      case 'e': this.playOrReleaseNote('F3', 'release', 5)
                break;
      case 'r': this.playOrReleaseNote('G3', 'release', 7)
                break;
      case 't': this.playOrReleaseNote('A3', 'release', 9)
                break;
      case 'y': this.playOrReleaseNote('B3', 'release', 11)
                break;
      case 'u': this.playOrReleaseNote('C4', 'release', 12)
                break;
      case 'i': this.playOrReleaseNote('D4', 'release', 14)
                break;
      case 'o': this.playOrReleaseNote('E4', 'release', 16)
                break;
      case 'p': this.playOrReleaseNote('F4', 'release', 17)
                break;
      case '[': this.playOrReleaseNote('G4', 'release', 19)
                break;
      case ']': this.playOrReleaseNote('A4', 'release', 21)
                break;
      case '\\': this.playOrReleaseNote('B4', 'release', 23)
                break;
      case '1': this.playOrReleaseNote('Db3', 'release', 1)
                break;
      case '2': this.playOrReleaseNote('Eb3', 'release', 3)
                break;
      case '4': this.playOrReleaseNote('Gb3', 'release', 6)
                break;
      case '5': this.playOrReleaseNote('Ab3', 'release', 8)
                break;
      case '6': this.playOrReleaseNote('Bb3', 'release', 10)
                break;
      case '8': this.playOrReleaseNote('Db4', 'release', 13)
                break;
      case '9': this.playOrReleaseNote('Eb4', 'release', 15)
                break;
      case '-': this.playOrReleaseNote('Gb4', 'release', 18)
                break;
      case '=': this.playOrReleaseNote('Ab4', 'release', 20)
                break;
      case 'Backspace': this.playOrReleaseNote('Bb4', 'release', 22)
                break;
      default: console.log(event.key)
    }
    // resets key so that it can be played again
    keysAllowed[event.key] = true;
  }

  // gives nx keyboard focus, so that it can register keydown/keyup events
  attachFocus(element){
    if (element){
      element.setAttribute("tabIndex", '1');
      element.focus()
    }
  }

  render(){
    const { nxDefine } = this.props;
    // console.log(polySynth.voices)
    return (
      <div className='synthContainer'>
          <canvas
          data-type="keyboard"
          id="synth"
          ref={(canvas) => {
            nxDefine(canvas);
            this.attachFocus(canvas)
            }}
          onKeyDown={(e) => this.playNote(e)}
          onKeyUp={(e) => this.releaseNote(e)}>
        </canvas>
      </div>
    )
  }
}

export { polySynth, polySynth2, polySynth3, Synth };
