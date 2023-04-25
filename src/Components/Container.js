import React, {useState, useEffect} from "react";
import Puzzle from "./puzzleBox";
import Questions from "./questions";



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

    return (
        <div className="container">
        <div className="header">
            <p className="heading-title">The Mini Crossword</p>
        </div>
         <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', flexDirection: 'column' ,marginLeft: 13}}>
        <div className="current-question">
            <p style={{fontSize:16,fontWeight: 'bold', width: 40}}>{selectedQuestion.label}</p>
            <p style={{fontSize: 16}}>{selectedQuestion.text}</p>
        </div>
           <Puzzle inputs={inputs} setInputs={setInputs} highlight={highlight} setHighlight={setHighlight}
           questions={questions} setQuestions={setQuestions} setSelectedQuestion={setSelectedQuestion}/>      
           </div>           
           <div  style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
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
