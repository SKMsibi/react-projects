import React, { Component } from 'react';
import Modal from 'react-modal';
import Header from './header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faFrown, faBullhorn, faKeyboard, faSignOutAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import '../App.css';
import Speech from 'speak-tts'
import { random } from "superb";


if (Speech.browserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
} else {
    console.log("speech synthesis not supported")
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class WriteIt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gettingWord: false,
            word: "coding",
            userWord: "",
            modalIsOpen: false,
            check: "",
            showWord: false
        };
        this.setRandomWord = this.setRandomWord.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    routingFunction(route) {
        this.props.history.push(route);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }
    afterOpenModal() {
        this.subtitle.style.color = "rgb(29, 115, 214)";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    async   setRandomWord() {
        this.setState({ gettingWord: true, showWord: false })
        var newWord = random();
        Speech.init();
        Speech.setLanguage('en-US');
        Speech.setVoice('Google UK English Female');
        Speech.speak({
            text: newWord
        });
        this.setState({ word: newWord, gettingWord: false });
    }
    repeatWord() {
        var word = this.state.word
        Speech.setLanguage('en-US')
        Speech.setVoice('Google UK English Female')
        Speech.speak({
            text: word
        })
    }
    setWord(e) {
        this.setState({ userWord: e.target.value })
    }
    checkWord() {
        var word = this.refs.userWord.value;
        this.setState({ userWord: word })
        if (this.state.word === word) {
            this.setState({ check: "Your word is correct" });
        } else {
            this.setState({ check: "Wrong spelling" });
        }
        this.openModal();
    }
    render() {
        return (
            <div>
                <Header text={"write your word "} icon={<FontAwesomeIcon icon={faKeyboard} />} />
                <div className="spell-it">
                    <button className={this.state.gettingWord ? "btn btn-primary" : "btn btn-success"} id="get-word-btn" onClick={this.setRandomWord}>Get new random word <FontAwesomeIcon icon={faSearch} /></button>
                    <h3 className="word">your word   : <input type="text" ref="userWord" id="userWord" onClick={this.setWord.bind(this)} name="word" placeholder="Type your word here..." /></h3>
                    {this.state.showWord && (
                        <h3 className="word">The correct spelling is: <b>{this.state.word}</b></h3>
                    )}
                    <button className="btn btn-primary" id="say-word-btn" onClick={this.repeatWord.bind(this)}>say word <FontAwesomeIcon icon={faBullhorn} /></button>
                    <button className="btn btn-primary" id="back-btn" onClick={this.checkWord.bind(this)} >Check word </button>
                    <button className="btn btn-primary" id="back-btn" onClick={() => this.setState({ showWord: true })} >Reveal word</button>
                    <button onClick={() => this.routingFunction("/startpage")} className="btn btn-danger" id="back-btn">back<FontAwesomeIcon icon={faSignOutAlt} /></button>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.check} {this.state.check === "Wrong spelling" ? <FontAwesomeIcon icon={faFrown} /> : <FontAwesomeIcon icon={faSmile} />} </h2>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>

        );
    }
}
export default WriteIt;
