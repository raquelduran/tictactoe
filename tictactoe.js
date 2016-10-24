/*
 EJERCICIOS – DEFINICI N DE OBJETOS POR EL USUARIO Ó
Haciendo uso de P.O.O. Modela los siguientes enunciados. En cada uno de ellos se te
pide la implementaci n de un peque o juego haciendo uso de JavaScript. En este momento no ó ñ
debes pensar en la representaci n gr fica del juego, s lo c ntrate en el dise o de la clase ó á ó é ñ
que permita implementar el juego en cuesti n con todas sus posibilidades y casuistica. ó
Posteriormente dotaremos a estos juegos de una representaci n gr fica adecuada y se ó á
representar n en pantalla, pero en este momento deben ser independientes de sta (tan s lo á é ó
tendr n una interfaz b sica en pruebas)

2) Tres en Raya. El juego del tres en raya consiste en un tablero de 3x3, en el que
sucesivamente dos jugadores van marcando casillas hasta conseguir tener sus tres
marcas en l nea, pudiendo ser sta horizontal, vertical o en diagonal. Se pide por tanto í é
la implementaci n de ste juego teniendo en cuenta: ó é
1. El juego es pensado para ser usado por dos usuarios.
2. El juego finaliza cuando los dos seleccionan sus 3 marcas, o bien uno consigue
antes las tres en l nea. 

*/

class Player{
	constructor(name, tile){
		this.name = name;
		this.tile = tile;
	}
}

class Game{ //modelo
	constructor(){
		this.name = "Tres en raya";
		this.board = [[0,0,0],[0,0,0],[0,0,0]];
		
	}

	movement(row,column,player){
		if (squareAvailable(row,column)){
			this.board[row][column]= player;
		}
		else {
			alert("Esa casilla ya está ocupada. Elige otra casilla")
		}
		
	}

	squareAvailable(row,column){
		if(this.board[row,column]==0){return true}
		else {return false}
	}
	
	checkIfWinner(player){
		if(
			(this.board[0][0]== player && this.board[1][0]== player && this.board[2][0]== player) || //1
			(this.board[0][1]== player && this.board[1][1]== player && this.board[2][1]== player) || //2
			(this.board[0][2]== player && this.board[1][2]== player && this.board[2][2]== player) || //3
			(this.board[0][0]== player && this.board[0][1]== player && this.board[0][2]== player) || //4
			(this.board[1][0]== player && this.board[1][1]== player && this.board[1][2]== player) || //5
			(this.board[2][0]== player && this.board[2][1]== player && this.board[2][2]== player) || //6
			(this.board[0][0]== player && this.board[1][1]== player && this.board[2][2]== player) || //7
			(this.board[0][2]== player && this.board[1][1]== player && this.board[2][0]== player)    //8
		  )  { return true}
		else {return false}
	}
/*
winning combinations:
[x,o,o]		[o,x,o]		[o,o,x]		[x,x,x]		[o,o,o]		[o,o,o]		[x,o,o]		[o,o,x]
[x,o,o]		[o,x,o]		[o,o,x]		[o,o,o]		[x,x,x]		[o,o,o] 	[o,x,o]		[o,x,o]
[x,o,o]		[o,x,o]		[o,o,x]		[o,o,o]		[o,o,o]		[x,x,x]		[o,o,x]		[x,o,o]

how to access to each square: 
[0.0, 0.1, 0.2]
[1.0, 1.1, 1.2]
[2.0, 2.1, 2.2] 
*/
	

} //model

class View{
	constructor(){

	}

	drawTable(){
		var textTable = '<table id="t" border = "0" cellspacing ="5"> ';
		for(i=0;i<3;i++){
			textTable += '<tr bgcolor = "#e0893c" height="100px">';
			for (j=0;j<3;j++){
				textTable += '<td id="'+i+j+'"width="100"></td>';
			}
		}
		textTable += '</tr></table>';
		//return textTable
		document.getElementById("table").innerHTML = textTable;
	}
} //view

class Controller{
	constructor(){
		this.view = new View();
		this.model = new Game();
	}
} //controller


function drawTable(){ //test
	var textTable = '<table id="t" border = "0" cellspacing ="5"> ';
	for(i=0;i<3;i++){
		textTable += '<tr bgcolor = "#e0893c" height="100px">';
	for (j=0;j<3;j++){
		textTable += '<td id="'+i+j+'"width="100"></td>';
	}
	}
	textTable += '</tr></table>';
	//return textTable
	document.getElementById("table").innerHTML = textTable;
}


window.onload = drawTable;