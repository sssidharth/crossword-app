import React, { useEffect, useState } from "react";


function Puzzle(props) {
    

    useEffect(()=> {
        let cellstoChange = []      
            let list = props.inputs;
            for(let i = 0;i <list.length; i++) {
                for(let j = 0; j<list[0].length; j++){ 
                    if(list[i][j].value === ''){
                        cellstoChange.push(`${i}${j}`) 
                    }
                }   
            }
        for(let i = 0; i<cellstoChange.length; i++) {
            let el = document.getElementById(cellstoChange[i]);
            if(el) el.style.color = props.mutedText ? '#959595' : 'black'          
        }
    },[props.mutedText])


    
    const handleClick = (e,position) => {

        let clone = JSON.parse(JSON.stringify(props.inputs));
        let newPos = props.highlight.position;
        let newCell = props.highlight.cell

        for(let i = 0;i <clone.length; i++) {
            for(let j = 0; j<clone[0].length; j++){
                if(clone[i][j].selected) {
                    if(i === position[0] && j === position[1]) {
                    if(props.highlight.position === 'row'){
                        newPos = 'column'
                        newCell = j
                         props.setHighlight({
                            position: 'column',
                            cell : j
                         })
                      }
                      else {
                        newPos = 'row'
                        newCell = i
                        props.setHighlight({
                            position: 'row',
                            cell : i
                         })
                      }
                      break;
                    }
                    else{
                        clone[i][j].selected = false;
                    }
                }
                if(i === position[0] && j === position[1]){
                    clone[i][j].selected = true;
                    newCell = props.highlight.position === 'row' ? i : j;
                    props.setHighlight({
                        position: props.highlight.position,
                        cell : props.highlight.position === 'row' ? i : j
                     })
                }
            }
        }
        props.setInputs(clone);
        e.preventDefault();

        // modifying selected questions
        let qClone = JSON.parse(JSON.stringify(props.questions));
        let nextText, pos
        if(newPos === 'row'){
          if(newCell === 0) {
            pos = '1A'
          }
          else pos = `${newCell+4}A`
        }
        else {
         if(newCell=== 0) {
            pos = '5D'
          }
          else pos = `${newCell}D`
        }
        for(let i =0 ; i<qClone.across.length; i++){
            if(qClone.across[i].selected) qClone.across[i].selected = false
            if(qClone.across[i].label === pos) {
                qClone.across[i].selected = true;
                nextText = qClone.across[i].text
         }
        } 
        for(let i =0 ; i<qClone.down.length; i++){
            if(qClone.down[i].selected) qClone.down[i].selected = false
            if(qClone.down[i].label === pos) 
             {
                 qClone.down[i].selected = true;
                 nextText = qClone.down[i].text
             }
            
        }
        props.setQuestions(qClone);
        props.setSelectedQuestion({
            label: pos,
            text: nextText
        })

    }

    const handleChange = (e,position) => {
        const { value, id } = e.target;
        let clone = JSON.parse(JSON.stringify(props.inputs));
        for(let i = 0;i <clone.length; i++) {
            let found = false;
            for(let j = 0; j<clone[0].length; j++){
               if(i === position[0] && j === position[1]){
                    clone[i][j].value = value.toUpperCase();          
                    found = true;
                    if(value !==''){              
                        clone[i][j].selected = false;
                      }
                    break;              
               }
            }
            if(found) break;
        }
        if(value === '') {
            let currentEl = document.getElementById(`${position[0]}${position[1]}`);
            currentEl.style.color = props.mutedText ? '#959595' :'black'
        }
        if(value !=='' ){
        let current = id;
            current = current.split('')
            let row = Number(current[0]);
            let col = Number(current[1]);
            let nextElNumber = ''
            let highlightCell = props.highlight.cell
            if(props.highlight.position === 'row'){
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
            clone[Number(nextElNumber.split('')[0])][Number(nextElNumber.split('')[1])].selected = true;
            let nextEl = document.getElementById(nextElNumber);
            nextEl.focus();
            nextEl.setSelectionRange(1,1)
        props.setHighlight({
            position: props.highlight.position,
            cell: highlightCell
        })
    }
        props.setInputs(clone);
    }

    const handleKeyDown = (e, position) => {
        if(props.keyboradVisible<=400){
            e.preventDefault();
        }
        else {
        if(e.key === 'Backspace') {
            let clone = JSON.parse(JSON.stringify(props.inputs));
        for(let i = 0;i <clone.length; i++) {
            let found = false;
            for(let j = 0; j<clone[0].length; j++){
               if(i === position[0] && j === position[1]){
                    if(clone[i][j].value !==''){
                        clone[i][j].value = '' 
                    }
                    else clone[i][j].selected = false;        
                    found = true;
                    break;              
               }
            }
            if(found) break;
        }
        if(props.inputs[position[0]][position[1]].value === '') {
            let current = e.target.id;
            current = current.split('')
            let row = Number(current[0]);
            let col = Number(current[1]);
            let nextElNumber = ''
            let highlightCell = props.highlight.cell
            if(props.highlight.position === 'row'){
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
            clone[Number(nextElNumber.split('')[0])][Number(nextElNumber.split('')[1])].selected = true;
            let nextEl = document.getElementById(nextElNumber);
            nextEl.focus();
            nextEl.setSelectionRange(1,1)
        props.setHighlight({
            position: props.highlight.position,
            cell: highlightCell
        })
        }
        props.setInputs(clone);
        }
      }
    }

    const renderBox = (muted, value, selected, position, background) => {
        let placeholderNumber = null;
        if(position[0] === 0 ){
            placeholderNumber = position[1]
        }
        else if(position[1] === 0){
            placeholderNumber = position[0]+4
        }
        return muted ? (
            <div className="muted-cell" >
            </div>
        ):(
          <input type="text" id={`${position[0]}${position[1]}`} onClick={(e) => handleClick(e,position)}
          className="cellInput" maxLength={1} value={value} onChange={(e)=>handleChange(e, position)}
          onKeyDown={(e) => handleKeyDown(e, position)}
          placeholder={placeholderNumber ? `${placeholderNumber}` : null}
        //  onKeyDown={(e) => handleKeyDown(e,position)}
          style={{background: selected ? '#ffda00' : !selected && background ? background : 'white' }}>
          </input>
        )
     }

     const renderAllBoxes = () => {
        return props.inputs.map((val1, index1) => {
            return <div key={index1} style={{display: 'flex', flexDirection: 'row'}}>
                {props.inputs[index1].map((val2, index2) => {
                let cellsToHighlight;
                if(props.highlight.position === 'row'){
                    cellsToHighlight = [props.highlight.cell, index2];
                }
                else {
                    cellsToHighlight = [index1, props.highlight.cell]
                }
                return (index1 === 0 && index2 === 0) || (index2 === 4 && index1 === 4) ? <div className="cell-container-muted" key={index2}>{renderBox(true, '', 'black',[index1,index2])} </div>
                :(props.check && val2.value !== '' && val2.value !== val2.expected)? <div className="cell-container" key={index2}>
                {renderBox(false, val2.value, val2.selected,[index1,index2], 
                (cellsToHighlight[0] === index1 && cellsToHighlight[1] === index2 ? '#a7d8ff': null)
                 )}
                </div>:<div className="cell-container-nocheck" key={index2}>
                 {renderBox(false, val2.value, val2.selected,[index1,index2], 
                 (cellsToHighlight[0] === index1 && cellsToHighlight[1] === index2 ? '#a7d8ff': null)
                  )}
                 </div>
            })}
            </div>
        })
     }

     return (
        <div >
           {renderAllBoxes()}
        </div>
     )
}

export default Puzzle;