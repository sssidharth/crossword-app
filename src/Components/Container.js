import React, {useState, useEffect} from "react";
import Puzzle from "./puzzleBox";
import Questions from "./questions";
import CreateIcon from '@mui/icons-material/Create';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';



const answers = {
    across: ['CRAB', 'CLOSE', 'HOUSE', 'ENTER', 'ZEST'],
    down: ['CHEZ', 'CLONE', 'ROUTS', 'ASSET', 'BEER']
}
function ContainerComponent(props) {
    const [inputs, setInputs] = useState([]);
    const [entered, setEntered] = useState({
        across: ['', '', '', '', ''],
        down: ['', '', '', '', '']
    });
    const [highlight, setHighlight] = useState({
        position: 'row',
        cell: 0
    });

    const [mutedText, setMutedText] = useState(false);
    const [keyboardType, setKeyboardType] = useState('default');
    const [check, setCheck] = useState(false);

    const [questions, setQuestions] = useState({
        across: [{selected: true, label: '1A', text: 'Ingredient in a California roll'},
        {selected: false, label: '5A', text: 'Friendly (with)'},
        {selected: false, label: '6A', text: 'One half of Congress'},
        {selected: false, label: '7A', text: 'Come in'},
        {selected: false, label: '8A', text: 'Grated lemon peel'}],
        down: [{selected: false, label: '1D', text: 'Exact copy'},
        {selected: false, label: '2D', text: 'Decisive victories'},
        {selected: false, label: '3D', text: 'Positive quality'},
        {selected: false, label: '4D', text: 'Follower of "craft" or "draft"'},
        {selected: false, label: '5D', text: 'Word in French restaurant names'}]
    })

    const [selectedQuestion, setSelectedQuestion] = useState({
        label: '1A',
        text: 'Ingredient in a California roll'
    })

    useEffect(() => {
        let ip = new Array(5);
        for(let i = 0; i<ip.length; i++) {
            ip[i] = new Array(5);
        }

        for(let i = 0; i<ip.length; i++) {
            for(let j = 0; j<ip[0].length; j++) {
                let word = answers.across[j].split('');
                if(i === 0 && j === 1){
                    ip[i][j] = {
                       selected: true,
                       value: '',
                    }
                }
                else {
                    ip[i][j] = {
                        selected: false,
                        value: ''
                     } 
                }
                if(i === 0) {
                    if(j === 0) ip[i][j].expected = ''                   
                    else ip[i][j].expected = word[j-1]
                }
                else if( i === 4) {
                    if(j === 4) ip[i][j].expected = ''                   
                    else ip[i][j].expected = word[j]
                }
                else {
                    ip[i][j].expected = word[j]
                }
               
            }
        }
       
        setInputs(ip);
    }, []);

    useEffect(() => {
        if(inputs.length>0) {
        let across = [];
        let down = [];
        for(let i = 0; i<inputs.length; i++) {
            let rowVal = ''
            for(let j = 0; j<inputs[0].length; j++) {
                rowVal+=inputs[i][j].value;
            }
            across.push(rowVal)
        }
        for(let i = 0; i<inputs[0].length; i++) {
            let colVal = ''
            for(let j = 0; j<inputs.length; j++) {
                colVal+=inputs[j][i].value;
            }
            down.push(colVal)
        }
        setEntered({
            across: across,
            down: down
        });
    }
    },[inputs])

    const handleSubmit = (e) => {
       let flag = false
       for(let i = 0; i<entered.across.length; i++){
          if(entered.across[i] === answers.across[i]) flag = true;
          else { 
          flag = false
          window.alert('Incorrect')
          break;
          }
       }
       if(flag) {
       for(let i = 0; i<entered.down.length; i++){
        if(entered.down[i] === answers.down[i]) flag = true;
        else {
        flag = false
        window.alert('Incorrect')
        break;
        }
       }
      }
      if(flag) window.alert('Correct')
    }

    const handleReset = (e) => {
        let ip = new Array(5);
        for(let i = 0; i<ip.length; i++) {
            ip[i] = new Array(5);
        }

        for(let i = 0; i<ip.length; i++) {
            for(let j = 0; j<ip[0].length; j++) {
                if(i === 0 && j === 1){
                    ip[i][j] = {
                       selected: true,
                       value: ''
                    }
                }
                else {
                    ip[i][j] = {
                        selected: false,
                        value: ''
                     } 
                }
            }
        }
       
        setInputs(ip);
        setHighlight({
            position: 'row',
            cell: 0
        })
    }

    const handlePenClick = (e) => {
      setMutedText(!mutedText)
    }

    const handleMobileQues = (e,type) => {
      let current = selectedQuestion.label;
      let clone = JSON.parse(JSON.stringify(questions));
      let nextQues, newPos, newCell, newText;
      if(type === 'right') {
        if(current.indexOf('A') !== -1){
            nextQues = current === '1A' ? '5A' : current === '8A' ? '1D' : `${Number(current.charAt(0))+1}A`
        }
        else {
            nextQues = current === '5D' ? '1A' : `${Number(current.charAt(0))+1}D`;
        }
      }
      else {
        if(current.indexOf('A') !== -1){
            nextQues = current === '1A' ? '5D' : current === '5A' ? '1A' : `${Number(current.charAt(0))-1}A`
        }
        else {
            nextQues = current === '1D' ? '8A' : `${Number(current.charAt(0))-1}D`;
        }
      }
      for(let i =0 ; i<clone.across.length; i++){
        if(clone.across[i].selected) clone.across[i].selected = false
        if(clone.across[i].label === nextQues) {
            clone.across[i].selected = true;
            newText = clone.across[i].text
            newPos = 'row'
            newCell = i
        }
    } 
    for(let i =0 ; i<clone.down.length; i++){
        if(clone.down[i].selected) clone.down[i].selected = false
        if(clone.down[i].label === nextQues) {
            clone.down[i].selected = true;
            newText = clone.across[i].text
            newPos = 'column'
            newCell = nextQues.split('')[0] === '5' ? 0 : Number(nextQues.split('')[0])
        }
    }

    setQuestions(clone);
    setSelectedQuestion({
        label: nextQues,
        text: newText
    })
    setHighlight({
        position: newPos,
        cell: newCell
    });

    let inputsClone = JSON.parse(JSON.stringify(inputs));

    for(let i = 0; i<inputsClone.length; i++) {
        for(let j = 0; j<inputsClone[0].length; j++) {
            if(inputsClone[i][j].selected){
                inputsClone[i][j].selected = false;
            }
            if(newPos === 'row' && newCell === i) {
                if(i === 0) {
                    inputsClone[i][1].selected = true;  
                }
                else inputsClone[i][0].selected = true;
            }
            else if(newPos === 'column' && newCell === j){
                if(j === 0) {
                    inputsClone[1][j].selected = true; 
                }
                inputsClone[0][j].selected = true;
            }
        }
    }
    setInputs(inputsClone)

    }

    const handleKeyboardTypeChange = (button) => {
        let values = JSON.parse(JSON.stringify(inputs));
        if(button === '{numbers}'){
            setKeyboardType('numbers')
        }
        else if(button === '{default}'){
            setKeyboardType('default')
        }
        else {
            let selectedEl;
            for(let i = 0; i<values.length; i++) {
                let found = false;
                for(let j = 0; j<values[0].length; j++) {
                    if(values[i][j].selected){
                        values[i][j].value = button === '{backspace}'? '' : button
                        values[i][j].selected = false;
                        found = true;
                        selectedEl = `${i}${j}`;
                        break;
                    }
                }
                if(found) break;
            }
            if(button === '{backspace}') {
                let currentEl = document.getElementById(selectedEl);
                currentEl.style.color = props.mutedText ? '#959595' :'black'
                if(inputs[selectedEl.charAt(0)][selectedEl.charAt(0)].value === '') {
                    let current = selectedEl
                    current = current.split('')
                    let row = Number(current[0]);
                    let col = Number(current[1]);
                    let nextElNumber = ''
                    let highlightCell = highlight.cell
                    if(highlight.position === 'row'){
                       if((col-1)<0){
                         nextElNumber = `${row-1}${4}`
                         highlightCell = row-1;
                       }
                       else {
                        nextElNumber =`${row}${col-1}`
                       }
                       if(col === 1 && row === 0) {
                        nextElNumber = '43';
                        highlightCell = 4
                       }
                      
                    }
                    else {
                        if((row-1)<0){
                            nextElNumber = `${4}${col-1}`
                            highlightCell = col-1
                          }
                          else {
                           nextElNumber =`${row-1}${col}`
                          }
                          if(col === 0 && row === 1) {
                            nextElNumber = '34';
                            highlightCell = 4
                           }
                         
                    }
                    values[Number(nextElNumber.split('')[0])][Number(nextElNumber.split('')[1])].selected = true;
                    let nextEl = document.getElementById(nextElNumber);
                    nextEl.focus();
                    nextEl.setSelectionRange(1,1)
                    setHighlight({
                    position: highlight.position,
                    cell: highlightCell
                })
                }
            }
            else {
                    selectedEl = selectedEl.split('')
                    let row = Number(selectedEl[0]);
                    let col = Number(selectedEl[1]);
                    let nextElNumber = ''
                    let highlightCell = highlight.cell
                    if(highlight.position === 'row'){
                       if((col+1)>4){
                         nextElNumber = `${row+1}${0}`
                         highlightCell = row+1;
                       }
                       else {
                        nextElNumber =`${row}${col+1}`
                       }
                       if(col === 3 && row === 4){
                        nextElNumber = '01';
                        highlightCell = 0
                       } 
                      
                    }
                    else {
                        if((row+1)>4){
                            nextElNumber = `${0}${col+1}`
                            highlightCell = col+1
                          }
                          else {
                           nextElNumber =`${row+1}${col}`
                          }
                          if(col === 4 && row === 3) {
                            nextElNumber = '01';
                            highlightCell = 1
                          }
                         
                    }
                    values[Number(nextElNumber.charAt(0))][Number(nextElNumber.charAt(1))].selected = true;
                    let nextEl = document.getElementById(nextElNumber);
                    nextEl.focus();
                    nextEl.setSelectionRange(1,1)
                   setHighlight({
                    position: highlight.position,
                    cell: highlightCell
                })
            }
        }
        setInputs(values);
    }

    const handleCheck = (e) => {
        setCheck(!check);
    }

    return (
        <div className="container">

            <p className="heading-title">The Mini Crossword</p>

        <div className="Actions">
            {mutedText ? <div className="pen-container" onClick={(e) => handlePenClick(e)} style={{background:  '#4aaefe'}}>
            <CreateIcon style={{color:'white' }}/>
          </div>:<div className="pen-container" onClick={(e) => handlePenClick(e)}>
            <CreateIcon style={{color: '#4aaefe'}}/>
          </div>}
          <div style={{background: check? 'black' : 'none', color: check ? 'white': '#4c4c4c'}} className="desktop-check" onClick={(e) => handleCheck(e)}>
            Check
          </div>
        </div>
         <div className="lower-box">
          <div style={{display: 'flex', flexDirection: 'column' }}>
        <div className="current-question">
            <p style={{fontSize:16,fontWeight: 'bold', width: 40}}>{selectedQuestion.label}</p>
            <p style={{fontSize: 16}}>{selectedQuestion.text}</p>
        </div>
           <Puzzle inputs={inputs} setInputs={setInputs} highlight={highlight} setHighlight={setHighlight}
           questions={questions} setQuestions={setQuestions} setSelectedQuestion={setSelectedQuestion}
           mutedText={mutedText} check={check}/> 
        <div className="mobile-container">
        <div className="current-question-mobile">
            <KeyboardArrowLeftIcon style={{cursor: 'pointer'}} onClick={(e)=>handleMobileQues(e,'right')}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <p style={{fontSize:16,fontWeight: 'bold', width: 40}}>{selectedQuestion.label}</p>
            <p style={{fontSize: 16}}>{selectedQuestion.text}</p>
            </div>        
            <ChevronRightIcon  style={{cursor: 'pointer'}} onClick={(e)=>handleMobileQues(e,'right')}/>
        </div>
        <div className='keyboard'> 
          <Keyboard theme={"hg-theme-default hg-layout-default myTheme"}
           layoutName={keyboardType}
           onKeyPress={button => handleKeyboardTypeChange(button)}
           layout={{
            default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
             "{numbers} Z X C V B N M {backspace}"
            ],
            numbers: ["1 2 3", "4 5 6", "7 8 9", "{default} 0 {backspace}"]
            }}
            display={
                {
                    "{numbers}": "123",
                    "{default}":'ABC',
                    "{ent}": "return",
                    "{escape}": "esc ⎋",
                    "{tab}": "tab ⇥",
                    "{backspace}": "⌫",
                    "{capslock}": "caps lock ⇪",
                    "{shift}": "⇧",
                    "{controlleft}": "ctrl ⌃",
                    "{controlright}": "ctrl ⌃",
                    "{altleft}": "alt ⌥",
                    "{altright}": "alt ⌥",
                    "{metaleft}": "cmd ⌘",
                    "{metaright}": "cmd ⌘",
                    "{abc}": "ABC"
                    
                }
            }
             />
        </div>
        <div className="mobile-actions">
            <div className="mobile-action-buttons" 
            style={{background: check ? 'black' : '#c9c9c9', color: check ? 'white': '#4c4c4c'}}
            onClick={(e) => handleCheck(e)}>Check</div>
            <div style={{background: mutedText ? 'black' : '#c9c9c9'}} className="mobile-action-buttons" onClick={(e) => handlePenClick(e)}>
            <CreateIcon style={{color: mutedText ? 'white' : 'none'}}/></div>
        </div>
        </div> 
           </div>           
           <div className="desktop-ques" >
            <Questions questions={questions} setQuestions={setQuestions} 
            inputs={inputs} setInputs={setInputs}
            setHighlight={setHighlight} setSelectedQuestion={setSelectedQuestion}/>
            <div style={{display:'flex', flexDirection: 'row'}}>
            <button className="submit-button" onClick={(e)=>handleSubmit(e)} style={{marginRight: 20}}>SUBMIT</button>
            <button className="submit-button" onClick={(e)=>handleReset(e)}>RESET</button>
            </div>      
           </div>
           </div>
        </div>
    )
}

export default ContainerComponent;
