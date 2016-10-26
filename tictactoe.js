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
	constructor(tile){
		this.name = name;
		this.tile = tile;
		this.movements = 0;
	}
}

class Model{ //modelo
	constructor(){
		this.name = "Tres en raya";
		this.board = [[0,0,0],[0,0,0],[0,0,0]];
		//this.jugador1 = new Player("x");
		//this.jugador2 = new Player("o");
		this.players =[new Player("x"), new Player("o")];
		this.turn = this.generateTurns();
		
	}

	movement(row,column,player){
			his.board[row][column]= player;
	}

	squareAvailable(row,column){
		if(this.board[row][column]==0){
			return true;
		}
		else {
			return false;
		}
		// The same that return this.board[row][column]==0
	}
	generateTurns(){
		var num = Math.random(); //random number between 0-1 
		if (num<=0.5){
			return 0;
		}
		else {
			return 1;
		}
	}

	changeTurn(){
		if (this.turn == 0){
			this.turn = 1;
		} else{
			this.turn = 0;
		}
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
		  )  
		{ 
			return true;
		}
		else {
			return false;
		}
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
		this.drawTable();
	}

	drawTable(){
		var textTable = '<table id="t" border = "0" cellspacing ="5"> ';
		for(let i=0;i<3;i++){
			textTable += '<tr bgcolor = "#e0893c" height="100px">';
			for (let j=0;j<3;j++){
				textTable += '<td id="'+i+j+'"width="100"></td>';
			}
		}
		textTable += '</tr></table>';
		//return textTable
		document.getElementById("table").innerHTML = textTable;
	}
	drawTile(row,column, tile){
		document.getElementById(row.toString()+column.toString()).innerHTML = tile;
	}
	getSquare(row,column){
		return document.getElementById(row.toString()+column.toString());
	}
	sendAlert(message){
		alert(message);
	}
	getInfo(message){
		return prompt(message);
	}
	writeNotification(place,message){
		document.getElementById(place).innerHTML = message;
	}

} //view

class Controller{
	constructor(){
		this.model = new Model();
		this.view = new View();
		this.generateListeners();
		this.start();
	}
	generateListeners(){
		//var that=this; //two ways of doing the same 
		for (let i=0;i<3;i++){
			for (let j=0;j<3;j++){
				this.view.getSquare(i,j).addEventListener("click", () => this.game(i,j))
					//function (){that.game(i,j);};
			}

		}
	}
	start(){
		// all changes necessary to reset the game
		this.model.board = [[0,0,0],[0,0,0],[0,0,0]];
		this.model.players[0].movements = 0;
		this.model.players[1].movements = 0;
		for (let i=0;i<3;i++){
			for (let j=0;j<3;j++){
				this.view.drawTile(i,j,"");
			}
		}
		this.model.turn = this.model.generateTurns();
		// 

		this.model.players[0].name = this.view.getInfo("Escribe el nombre del Jugador 1");
		this.model.players[1].name = this.view.getInfo("Escribe el nombre del Jugador 2");
		this.view.writeNotification("names", "Jugador 1: "+ this.model.players[0].name+ "</br>Jugador 2: "+ this.model.players[1].name);
		this.view.writeNotification("notifications", "Turno de "+ this.model.players[this.model.turn].name);
	}

	game(i,j){
		if (this.model.squareAvailable(i,j)){
			this.model.board[i][j] = this.model.players[this.model.turn].tile;
			this.view.drawTile(i,j,this.model.players[this.model.turn].tile);
			this.model.players[this.model.turn].movements += 1;
				if (this.model.players[this.model.turn].movements >=3) {
					if (this.model.checkIfWinner(this.model.players[this.model.turn].tile)){
						this.view.sendAlert("Ha ganado "+ this.model.players[this.model.turn].name+ ". Comenzará un nuevo juego");
						this.start();
					}
				}
			if (this.model.players[0].movements + this.model.players[1].movements == 9){
				this.view.sendAlert("EMPATE. Comenzará un nuevo juego");
				this.start();
			}
			else{
				this.model.changeTurn();
				this.view.writeNotification("notifications", "Turno de "+ this.model.players[this.model.turn].name);
			}
			
		}
		
	}

} //controller






window.onload = function(){
	controller = new Controller(); 

	
}