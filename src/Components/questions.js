import React from "react";

function Questions(props) {


    const handleQuestionClick = (e, label, text) => {
        let clone = JSON.parse(JSON.stringify(props.questions));
        let newPos, newCell;
        for(let i =0 ; i<clone.across.length; i++){
            if(clone.across[i].selected) clone.across[i].selected = false
            if(clone.across[i].label === label) {
                clone.across[i].selected = true;
                newPos = 'row'
                newCell = i
            }
        } 
        for(let i =0 ; i<clone.down.length; i++){
            if(clone.down[i].selected) clone.down[i].selected = false
            if(clone.down[i].label === label) {
                clone.down[i].selected = true;
                newPos = 'column'
                newCell = label.split('')[0] === '5' ? 0 : Number(label.split('')[0])
            }
        }
        props.setQuestions(clone);
        props.setSelectedQuestion({
            label: label,
            text: text
        })
        props.setHighlight({
            position: newPos,
            cell: newCell
        });

        let inputsClone = JSON.parse(JSON.stringify(props.inputs));

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
        props.setInputs(inputsClone)
    }

    return (
        <div className="list-container">
           <div style={{display: 'flex', flexDirection: 'column', width: '47%', paddingLeft: 10}}>
            <h3 className="question-head">ACROSS</h3>
            <ol className="question-list">
                {props.questions.across.map((e, index) => {
                    return (
                        <li key={index} className="list-element"
                            style={{background: e.selected? '#a7d8ff': 'none'}}
                            onClick={(event)=>handleQuestionClick(event, e.label, e.text)}>
                        <span className="el-label">{e.label.split('')[0]}</span>
                        <span className="el-text">{e.text}</span>
                       </li>
                    )
                })}
            </ol>
           </div>
           <div style={{display: 'flex', flexDirection: 'column', width: '47%', paddingLeft: 10}}>
            <h3 className="question-head">DOWN</h3>
            <ol className="question-list">
            {props.questions.down.map((e, index) => {
                    return (
                        <li key={index} className="list-element" 
                            style={{background: e.selected? '#a7d8ff': 'none'}}
                            onClick={(event)=>handleQuestionClick(event, e.label, e.text)}>
                        <span className="el-label">{e.label.split('')[0]}</span>
                        <span className="el-text">{e.text}</span>
                       </li>
                    )
                })}
            </ol>
           </div>
        </div>
    )
}

export default Questions;