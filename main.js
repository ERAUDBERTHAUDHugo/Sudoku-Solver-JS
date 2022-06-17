//------------------------------------------RANDOM BUT USEFUL FUNCTIONS-----------------------------------------------

function oneDarrayInto2Darray (array1D){
	// Loop to create 2D array using 1D array 
	var array2D = new Array(9);
	for (var i = 0; i < array2D.length; i++) { 
	    array2D[i] = new Array(9); 
	}
	let k=81;
	let x=9;
	let y=9;
	var h=0; 
	// Loop to initialize 2D array elements. 
	for (var i = 0; i < x; i++) { 
	    for (var j = 0; j < y; j++) { 
	        array2D[i][j] = h; 
	    } 
	} 
	var h = 0; 
	for(var i=0;i<x;i++){
		for (var j = 0; j <y; j++) {
			array2D[i][j]=array1D[h]
			h++
		}
	}
	return array2D;
}

//Function to display the elements of 2D array. 
function displayArray9x9(array,){ 
	var x= 9;
	var y=9;
	var tabSudoku=document.getElementById('sudokuTab');
	tabSudoku.innerHTML="";
	var divGlobal=document.createElement("div");
	for (var i = 0; i < x; i++) { 
		var newtabLine=document.createElement("tr");
		newtabLine.setAttribute("id","line" + i);
	    for (var j = 0; j < y; j++)    { 
	    	var newtabElement=document.createElement("td");
	    	if(j==0&&i==0){
	    		newtabElement.setAttribute("class","selected column" +j);
	    	}else{
	    		newtabElement.setAttribute("class","unselected column" +j);
	    	}
	    	if(array[i][j]!=0){
	    		newtabElement.classList.add("unallowed")
	    		var nombre=document.createTextNode(array[i][j]);
	    	}else{
	    		var nombre=document.createTextNode("");
	    	}
	        
	        newtabElement.appendChild(nombre);
	        newtabElement.setAttribute("onclick", "selection(this)")
	        newtabLine.appendChild(newtabElement);
	    }   
	    tabSudoku.appendChild(newtabLine);
	} 
	return 1;
}

//-------------------------------------------SUDOKU SOLVER----------------------------------------------------


//Find the next emptySpot of an array (a spot with a 0)
function nextSpot(array) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (array[i][j] === 0){
            	return [i, j];
        	}	
        }
    }
    return [-1, -1];
}


//Check if a number can be at the spot (x,y)
function possibleNumber(array,x, y) {
    var row = [];
    var col = [];
    var square = [];

    //the row of the spot
    for (var i = 0; i < 9; i++) {
        row.push(array[i][y]);
    }

    //the col of the spot
    for (var j = 0; j < 9; j++) {
        col.push(array[x][j]);
    }

    //the 3x3 array of the spot
    var k = Math.floor(x/3)*3;
    var l = Math.floor(y/3)*3;
    for (var i = k; i < k + 3; i++) {
        for (var j = l; j < l + 3; j++) {
            square.push(array[i][j]);
        }
    }

    //checking all possible number
    var possNumb = [];
    for (var n = 1; n < 10; n++) {
        if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && square.indexOf(n) === -1) {
            possNumb.push(n);
        }
    }

    return possNumb;
}


// Solver for a sudoku puzzle
function solveSudoku(array) {
    var emptySpot = nextSpot(array);
    var x = emptySpot[0];
    var y = emptySpot[1];
    
    //sudoku solved when we can not find any empty spot
    if (x === -1) {
        return array;
    }

	var numberArray = possibleNumber(array,x, y);

    //checking all possibilities for each spot, using backtracking to find the one to rule them all
    for (var k = 0; k < numberArray.length && nextSpot(array)[0] != -1; k++) {
        array[x][y] = numberArray[k];
        solveSudoku(array);
    }

    //if the possible value does not help to solve the sudoku, then reset the value
    if (nextSpot(array)[0] != -1){
    	array[x][y] = 0;
    } 
   
    return  array;
}
//-----------------------------------------------SUDOKU PUZZLE---------------------------------

var gameArr = [
    [2, 0, 3, 0, 0, 8, 6, 0, 7],
    [1, 4, 0, 7, 2, 6, 0, 0, 9],
    [5, 0, 7, 1, 3, 9, 4, 2, 8],
    [0, 2, 5, 0, 8, 1, 9, 0, 4],
    [4, 1, 0, 9, 0, 3, 2, 0, 5],
    [0, 7, 9, 2, 0, 5, 0, 3, 6],
    [6, 0, 2, 0, 1, 0, 0, 9, 3],
    [7, 0, 0, 5, 0, 2, 0, 0, 1],
    [0, 8, 1, 3, 6, 7, 0, 4, 0]
];

var sudoku1D=[3, 0, 6, 5, 0, 8, 4, 0, 0, 
         	5, 2, 0, 0, 0, 0, 0, 0, 0,
         0, 8, 7, 0, 0, 0, 0, 3, 1, 
         0, 0, 3, 0, 1, 0, 0, 8, 0, 
         9, 0, 0, 8, 6, 3, 0, 0, 5, 
         0, 5, 0, 0, 9, 0, 6, 0, 0, 
         1, 3, 0, 0, 0, 0, 2, 5, 0, 
         0, 0, 0, 0, 0, 0, 0, 7, 4, 
         0, 0, 5, 2, 0, 6, 3, 0, 0];
  
var puzzle = [
		[5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
var sudoku2D=oneDarrayInto2Darray(sudoku1D)
displayArray9x9(gameArr)

//-----------------------------------------------USER INTERRACTION---------------------------------

//when user click on the sudukuSolverButton
function solveThisSudoku(elem){
	solveSudoku(gameArr)
	displayArray9x9(gameArr)

}

function createArrayFromHtmlTable(){
	var sudo=new Array(81);
	var sudoku=oneDarrayInto2Darray(sudo);
	for (var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			//Need to cast with "Number", string -> number because of the .textContent proprety wich return string only
			var sudokuNumber=Number(document.getElementById("line"+i).getElementsByClassName("column"+j)[0].textContent);
			sudoku[i][j]=sudokuNumber;
		}
	}
	return sudoku
}

// When the User click on the "COMPARE MY ANSWER" button
function compareThisSudoku(elem){
	var userSolution=createArrayFromHtmlTable()
	var algoSolution=solveSudoku(gameArr)
	for(var i=0;i<9;i++){
		for(var j=0; j<9;j++){
			if(document.getElementById("line"+i).getElementsByClassName("column"+j)[0].classList.contains("wrong")){
				document.getElementById("line"+i).getElementsByClassName("column"+j)[0].classList.remove("wrong");
			}else if (userSolution[i][j]!=algoSolution[i][j]){
				document.getElementById("line"+i).getElementsByClassName("column"+j)[0].classList.add("wrong");
			}
		}
	}
	return 1
}

function selection(elem){
	var parent =elem.parentNode.parentNode
    if(!elem.classList.contains("selected")){
		let lastSpotSelected = document.getElementsByClassName("selected")[0];
	    elem.classList.remove("unselected");
	    elem.classList.add("selected");
		lastSpotSelected.classList.remove("selected");   
		lastSpotSelected.classList.add("unselected");   
    }
}

function userChoice(elem){
	var selectedSpot=document.getElementsByClassName("selected")[0];
	if(!selectedSpot.classList.contains("unallowed")){
		selectedSpot.innerHTML="";
		var number=document.createTextNode((Number(elem.textContent)))
		selectedSpot.appendChild(number)
	}
}

document.body.addEventListener('keypress', keyboardInteraction);
function keyboardInteraction(e){
	var selected=document.getElementsByClassName("selected")[0];
	var input=e.key
	if(input.charCodeAt(0)>=49 && input.charCodeAt(0)<=57){
		if(!selected.classList.contains('unallowed') && input!=NaN){
			selected.innerHTML=""
			var number=document.createTextNode(input);
			selected.appendChild(number);
		}
	}
}	

//-------------------------------------------------------TESTS-----------------------------------------------------------

// let  tr= document.getElementById('message')
// tr.addEventListener('keypress', (event) => {
// 	if(event.key==1){
// 		console.log('exact')
// 	}else{
// 		console.log('nop')
// 	}
//     //console.log(`key=${event.key},code=${event.code}`);

// });


