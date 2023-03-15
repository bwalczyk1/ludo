export default class Game{
    constructor(){
        document.body.style = "background-color: black; color: white; font-size: 20px; font-family: 'Comic Sans MS';";
        this.started = false;
        this.starting = false;
        this.data = {};
        this.colors = ["red", "blue", "green", "yellow"];
        this.playerColor = "";
        this.playerNick = "";
        this.playerStatus = "";
        this.pawns = {"red": [], "blue": [], "green": [], "yellow": []};
        this.cords = {
            "red": [[30, 30], [105, 30], [30, 105], [105, 105],
                [30, 327], [105, 327], [180, 327], [252, 327], [327, 327], [327, 252], [327, 180], [327, 105], [327, 30], [400, 30],
                [475, 30], [475, 105], [475, 180], [475, 252], [475, 327], [550, 327], [622, 327], [697, 327], [770, 327], [770, 400],
                [770, 475], [697, 475], [622, 475], [550, 475], [475, 475], [475, 550], [475, 622], [475, 697], [475, 770], [400, 770],
                [327, 770], [327, 697], [327, 622], [327, 550], [327, 475], [252, 475], [180, 475], [105, 475], [30, 475], [30, 400],
                [105, 400], [180, 400], [252, 400], [327, 400]
            ], 
            "blue": [[697, 30], [770, 30], [697, 105], [770, 105],
                [475, 30], [475, 105], [475, 180], [475, 252], [475, 327], [550, 327], [622, 327], [697, 327], [770, 327], [770, 400],
                [770, 475], [697, 475], [622, 475], [550, 475], [475, 475], [475, 550], [475, 622], [475, 697], [475, 770], [400, 770],
                [327, 770], [327, 697], [327, 622], [327, 550], [327, 475], [252, 475], [180, 475], [105, 475], [30, 475], [30, 400],
                [30, 327], [105, 327], [180, 327], [252, 327], [327, 327], [327, 252], [327, 180], [327, 105], [327, 30], [400, 30],
                [400, 105], [400, 180], [400, 252], [400, 327]
            ],
            "green": [[697, 697], [770, 697], [697, 770], [770, 770],
                [770, 475], [697, 475], [622, 475], [550, 475], [475, 475], [475, 550], [475, 622], [475, 697], [475, 770], [400, 770],
                [327, 770], [327, 697], [327, 622], [327, 550], [327, 475], [252, 475], [180, 475], [105, 475], [30, 475], [30, 400],
                [30, 327], [105, 327], [180, 327], [252, 327], [327, 327], [327, 252], [327, 180], [327, 105], [327, 30], [400, 30],
                [475, 30], [475, 105], [475, 180], [475, 252], [475, 327], [550, 327], [622, 327], [697, 327], [770, 327], [770, 400],
                [697, 400], [622, 400], [550, 400], [475, 400]
            ], 
            "yellow": [[30, 697], [105, 697], [30, 770], [105, 770],
                [327, 770], [327, 697], [327, 622], [327, 550], [327, 475], [252, 475], [180, 475], [105, 475], [30, 475], [30, 400],
                [30, 327], [105, 327], [180, 327], [252, 327], [327, 327], [327, 252], [327, 180], [327, 105], [327, 30], [400, 30],
                [475, 30], [475, 105], [475, 180], [475, 252], [475, 327], [550, 327], [622, 327], [697, 327], [770, 327], [770, 400],
                [770, 475], [697, 475], [622, 475], [550, 475], [475, 475], [475, 550], [475, 622], [475, 697], [475, 770], [400, 770],
                [400, 697], [400, 622], [400, 550], [400, 475]
            ]
        };
        this.pawnsPositions = ["n", "n", "n", "n"];
        this.moving = false;
        this.movingU = false;
        this.diceResult = 3;
        this.updateInterval = "";
        this.interval = "";
        this.interval2 = "";
        this.i = "";
        this.moveTo = "";
        this.startTime = "";
        this.diceNumbers = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć"];
    }
    addPawn(color, pwn1){
        this.pawns[color].push(pwn1);
    }
    begin(){
        this.checkSession();
    }
    async checkSession(){
        let response = await fetch("ajax2.php");
        let data = await response.json();
        if(data["color"] && data["nick"]){
            this.playerColor = data["color"];
            this.playerNick = data["nick"];
            this.playerStatus = data["status"];
            this.lobby();
            this.updateInterval = setInterval(()=>{this.update();}, 3000);
        }
        else{
            this.nickEntry();
        }
    }
    nickEntry(){
        document.body.innerHTML = "";
        document.body.style = "background-color: black; color: white; font-size: 14px; font-family: 'Comic Sans MS'; height: 100vh; display: flex; justify-content: center; align-items: center;";

        let divNick = document.createElement("DIV");
        divNick.id = "divNick";
        document.body.appendChild(divNick);

        let lbNick = document.createElement("LABEL");
        lbNick.id = "lbNick";
        lbNick.innerHTML = "TWÓJ NICK: ";
        lbNick.for = "txtNick";
        document.getElementById("divNick").appendChild(lbNick);

        let txtNick = document.createElement("INPUT");
        txtNick.id = "txtNick";
        txtNick.type = "text";
        txtNick.style = "font-family: 'Comic Sans MS'; text-transform: uppercase;";
        document.getElementById("divNick").appendChild(txtNick);

        let btnNick = document.createElement("DIV");
        btnNick.id = "btnNick";
        btnNick.innerHTML = "OK";
        btnNick.style = "border: 1px solid red; border-radius: 12px; display: inline; padding-left: 3px; padding-right: 3px; margin-left: 3px; cursor: pointer;";
        btnNick.addEventListener("click", ()=>{
            let n = document.getElementById("txtNick").value;
            if(n != ""){
                this.playerNick = n;
                this.queue();
            }});
        document.getElementById("divNick").appendChild(btnNick);
    }
    async queue(){
        let response = await fetch("ajax1.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nick: this.playerNick})
        });
        let data = await response.json();
        this.playerColor = data["color"];
        this.playerStatus = 0;
        this.lobby();
        this.updateInterval = setInterval(()=>{this.update();}, 3000);
    }
    lobby(){
        document.body.innerHTML = "";
        document.body.style = "background-color: black; color: white; font-size: 23px; font-family: 'Comic Sans MS';";

        let divSwitch = document.createElement("DIV");
        divSwitch.id = "divSwitch";
        document.body.appendChild(divSwitch);

        for(let i = 1; i <=4; i++){
            let plDiv = document.createElement("DIV")
            plDiv.id = "pl"+i+"Div";
            plDiv.innerHTML = "&nbsp&nbsp&nbsp&nbsp?&nbsp&nbsp&nbsp&nbsp";
            plDiv.style = "border: 1px solid lightgrey; border-radius: 19px; display: inline; padding-left: 4px; padding-right: 4px; margin-left: 4px; text-transform: uppercase; background-color: lightgrey;";
            document.getElementById("divSwitch").appendChild(plDiv);
        }
        let lbSwitch = document.createElement("LABEL");
        lbSwitch.id = "lbSwitch";
        lbSwitch.className = "switch";
        lbSwitch.style = "margin-left: 4px;";
        document.getElementById("divSwitch").appendChild(lbSwitch);

        let inputSwitch = document.createElement("INPUT");
        inputSwitch.id = "inputSwitch";
        inputSwitch.type = "checkbox";
        inputSwitch.addEventListener("click", ()=>{
            if(document.getElementById("inputSwitch").checked){
                this.playerStatus = 1;
                document.getElementById("txtSwitch").innerHTML = "CHCĘ JUŻ GRAĆ!";
            }
            else{
                this.playerStatus = 0;
                document.getElementById("txtSwitch").innerHTML = "CZEKAM NA INNYCH GRACZY";
            }
            this.update();
        });
        document.getElementById("lbSwitch").appendChild(inputSwitch);

        let spanSwitch = document.createElement("SPAN");
        spanSwitch.classList.add("slider");
        spanSwitch.classList.add("round");
        document.getElementById("lbSwitch").appendChild(spanSwitch);

        let txtSwitch = document.createElement("DIV");
        txtSwitch.id = "txtSwitch";
        txtSwitch.style = "display: inline; margin-left: 4px;";
        this.update();
        if(this.playerStatus == 1){
            document.getElementById("inputSwitch").checked = "checked";
            txtSwitch.innerHTML = "CHCĘ JUŻ GRAĆ";
        }
        else
            txtSwitch.innerHTML = "CZEKAM NA INNYCH GRACZY";
        document.getElementById("divSwitch").appendChild(txtSwitch);
    }
    async update(){
        let response = await fetch("ajax3.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: this.playerStatus, pawns: this.pawnsPositions})
        });
        this.data = await response.json();
        let winner = false;
        for(let pl_color in this.data){
            if(this.data[pl_color]["status"] == "A")
                winner = this.data[pl_color]["nick"];
        }
        if(winner){
            clearInterval(this.updateInterval);
            if(this.interval2 != ""){
                clearInterval(this.interval2);
                for(let color in this.data)
                    document.getElementById(color+"PlayerInfo").innerHTML = "";
            }
            if(this.playerNick == winner)
                window.alert("Gratulację "+winner+", wygrałeś(aś)!");
            else
                window.alert("Wygrał(a) "+winner+".");
        }
        else{
            if(this.movingU && this.data[this.playerColor]["status"] == 2)
                this.movingU = false;
            if(this.playerStatus!=this.data[this.playerColor]["status"] && this.interval2 != ""){
                clearInterval(this.interval2);
                this.interval2 = "";
                for(let pl_color in this.data)
                    document.getElementById(pl_color+"PlayerInfo").innerHTML = "";
            }
            if(!this.movingU){
                this.playerStatus = this.data[this.playerColor]["status"];
                this.pawnsPositions = this.data[this.playerColor]["pawns"];
            }
            this.refresh();
            if(this.data[this.playerColor]["status"] == 3 && !this.movingU)
                this.movingU = true;
            if(!this.started && !this.starting){
                let l = 0;
                let s = 0;
                for(let pl_color in this.data){
                    if(this.data[pl_color]["status"] >= 1)
                        s++;
                    l++;
                }
                if(l == 4 || s >= 2){
                    this.starting = true;
                    this.start1();
                }
            }
            if(this.starting){
                this.start2();
                this.started = true;
                this.starting = false;
            }
        }
    }
    start1(){
        this.starting = true;
        if(this.playerStatus == 1){
            this.playerStatus = 2;
            this.pawnsPositions = [0, 1, 2, 3];
        }
        document.getElementById("lbSwitch").innerHTML = "";
        document.getElementById("txtSwitch").innerHTML = "";

        let boardDiv = document.createElement("DIV");
        boardDiv.id = "boardDiv";
        boardDiv.style = "position: relative; margin-top: 5px; height: 850px;";
        document.body.appendChild(boardDiv);

        let boardImg = document.createElement("IMG");
        boardImg.id = "boardImg";
        boardImg.src = "board.png";
        boardImg.style = "height: 850px; position: absolute; left: 0px; top: 0px;";
        document.getElementById("boardDiv").appendChild(boardImg);
    }
    start2(){
        this.setPawns();
        this.started = true;
        this.starting = false;
        let thisPawn;
        let boardPawn;
        let boardPlayerInfo;
        for(let color in this.pawns){
            for(let i = 0; i < 4; i++){
                thisPawn = this.pawns[color][i];
                boardPawn = document.createElement("DIV");
                boardPawn.id = thisPawn.color+"Pawn"+(i+1);
                boardPawn.style = "position: absolute; left: "+thisPawn.posX+"px; top: "+thisPawn.posY+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: "+thisPawn.color+";";
                document.getElementById("boardDiv").appendChild(boardPawn);
            }
            boardPlayerInfo = document.createElement("DIV");
            boardPlayerInfo.id = color+"PlayerInfo";
            boardPlayerInfo.style.position = "absolute";
            document.getElementById("boardDiv").appendChild(boardPlayerInfo);
        }
        document.getElementById("redPlayerInfo").style.left = "50px";
        document.getElementById("redPlayerInfo").style.top = "200px";

        document.getElementById("bluePlayerInfo").style.left = "575px";
        document.getElementById("bluePlayerInfo").style.top = "50px";

        document.getElementById("greenPlayerInfo").style.left = "725px";
        document.getElementById("greenPlayerInfo").style.top = "575px";

        document.getElementById("yellowPlayerInfo").style.left = "200px";
        document.getElementById("yellowPlayerInfo").style.top = "725px";

        let boardDice = document.createElement("IMG");
        boardDice.id = "boardDice";
        boardDice.src = "3.png";
        boardDice.style = "position: absolute; left: 920px; top: 30px; display: none;";
        document.getElementById("boardDiv").appendChild(boardDice);

        let boardBtn = document.createElement("BUTTON");
        boardBtn.id = "boardBtn";
        boardBtn.innerHTML = "RZUĆ KOSTKĄ";
        boardBtn.style = "position: absolute; left: 920px; top: 200px; font-family: 'Comic Sans MS'; display: none;"
        boardBtn.addEventListener("click", ()=>{this.rollTheDice();});
        document.getElementById("boardDiv").appendChild(boardBtn);
    }
    refresh(){
        if(!this.started){
            let i = 1;
            for(let pl_color in this.data){
                document.getElementById("pl"+i+"Div").innerHTML = this.data[pl_color]["nick"];
                if(this.data[pl_color]["status"] >= 1)
                    document.getElementById("pl"+i+"Div").style = "border: 1px solid lightgrey; border-radius: 19px; display: inline; padding-left: 4px; padding-right: 4px; margin-left: 4px; text-transform: uppercase; background-color: "+pl_color+";";
                else
                    document.getElementById("pl"+i+"Div").style = "border: 1px solid lightgrey; border-radius: 19px; display: inline; padding-left: 4px; padding-right: 4px; margin-left: 4px; text-transform: uppercase; background-color: grey;";
                i++;
            }
        }
        else{
            this.setPawns();

            let thisPawn;
            for(let color in this.pawns){
                for(let i = 0; i < 4; i++){
                    thisPawn = this.pawns[color][i];
                    document.getElementById(thisPawn.color+"Pawn"+(i+1)).style.left = thisPawn.posX+"px";
                    document.getElementById(thisPawn.color+"Pawn"+(i+1)).style.top = thisPawn.posY+"px";
                }
            }
            
            if(this.interval2 == ""){
                for(let plColor in this.data){
                    if(this.data[plColor]["status"] == 3){
                        this.startTime = this.data[plColor]["last_act"];
                        if(this.playerColor == plColor)
                            this.startTime -= 3;
                        this.interval2 = setInterval(() => {
                            this.updateTimer(plColor);
                        }, 400);
                    }
                }
            }

            if(this.playerStatus == 3 && !this.moving){
                this.moving = true;
                document.getElementById("boardBtn").style = "position: absolute; left: 920px; top: 200px; font-famiy: 'Comic Sans MS';";
            }
        }
    }
    updateTimer(color){
        let start = this.startTime;
        let end = start + 60;
        let date = new Date();
        let now = Math.floor(date.getTime() / 1000);
        let timeLeft = end - now;
        document.getElementById(color+"PlayerInfo").innerHTML = timeLeft;
        if(timeLeft == 0 && this.playerColor == color){
            document.getElementById("boardBtn").style.display = "none";
            document.getElementById("boardDice").style.display = "none";
            if(this.interval != ""){
                clearInterval(this.interval);
                this.interval = "";
            }
            let elem;
            for(let i = 1; i <= 4; i++){
                document.getElementById(this.playerColor+"Pawn"+i).style.backgroundColor = this.playerColor;
                document.getElementById(this.playerColor+"Pawn"+i).style.cursor = "default";
                document.getElementById(this.playerColor+"Pawn"+i).replaceWith(document.getElementById(this.playerColor+"Pawn"+i).cloneNode(true));
                if(document.getElementById("ghostPawn"+i)){
                    elem = document.getElementById("ghostPawn"+i);
                    elem.parentNode.removeChild(elem);
                }
            }
            clearInterval(this.interval2);
            this.interval2 = "";
            document.getElementById(this.playerColor+"PlayerInfo").innerHTML = "";
            this.playerStatus = 2; 
            this.moving = false; 
            this.update();
        }
        else if(timeLeft == 0){
            clearInterval(this.interval2);
            document.getElementById(color+"PlayerInfo").innerHTML = "";
            this.update;
        }
    }
    setPawns(){
        for(let pl_color in this.data){
            if(this.data[pl_color]["pawns"][0] != "n"){
                for(let i = 0; i < 4; i++)
                    this.pawns[pl_color][i].pos = this.data[pl_color]["pawns"][i];
            }
        }
        for(let color in this.pawns){
            for(let i = 0; i < 4; i++){
                this.pawns[color][i].posX = this.cords[color][this.pawns[color][i].pos][0];
                this.pawns[color][i].posY = this.cords[color][this.pawns[color][i].pos][1];
                if(this.started){
                    document.getElementById(color+"Pawn"+(i+1)).style.left = this.pawns[color][i].posX;
                    document.getElementById(color+"Pawn"+(i+1)).style.top = this.pawns[color][i].posY;
                }
            }
        }
    }
    rollTheDice(){
        document.getElementById("boardBtn").style = "position: absolute; left: 920px; top: 200px; font-famiy: 'Comic Sans MS'; display: none;";
        let randD6 = Math.floor((Math.random() * 6) + 1);
        document.getElementById("boardDice").style = "position: absolute; left: 920px; top: 30px;";
        document.getElementById("boardDice").src = randD6+".png";
        this.diceResult = randD6;

        let synth = window.speechSynthesis;
        let voices=[];
 
        function populteVoiceList(){
            voices = synth.getVoices();
        }
 
        populteVoiceList();
        if(speechSynthesis.onvoiceschanged !==undefined)
            speechSynthesis.onvoiceschanged = populteVoiceList;

        setTimeout(()=>{
            let u = new SpeechSynthesisUtterance();
            u.text = this.diceNumbers[randD6];
            u.pitch = 1;
            u.rate = 1;
            u.voice = voices[18];
            for(let i = 0; i < voices.length; i++){
                if(voices[i].lang == "pl-PL")
                    u.voice = voices[i];
            }
            synth.speak(u);
        }, 250);

        this.movePawn();
    }        
    movePawn(){
        let moveablePawns = {};
        let potentialPawn;
        let moveablePawn;
        for(let i = 0; i < 4; i++){
            potentialPawn = this.pawns[this.playerColor][i];
            if((potentialPawn.pos <= 3 && (this.diceResult == 1 || this.diceResult == 6)) 
            || (potentialPawn.pos + this.diceResult >= 44 && potentialPawn.pos + this.diceResult <= 47 && !this.pawnsPositions.includes(potentialPawn.pos + this.diceResult))
            || (potentialPawn.pos > 3 && potentialPawn.pos + this.diceResult < 44))
                moveablePawns[i] = potentialPawn;
        }
        if(Object.keys(moveablePawns).length == 0){
            setTimeout(() => {
                document.getElementById("boardDice").style.display = "none";
                clearInterval(this.interval2);
                this.interval2 = "";
                document.getElementById(this.playerColor+"PlayerInfo").innerHTML = "";
                this.playerStatus = 2; 
                this.moving = false; 
                this.update();
            }, 1000);
        }
        else{
            let pawnMode = 1;
            this.interval = setInterval(() => {
                for(let i in moveablePawns){
                    if(pawnMode % 2 == 1)
                        document.getElementById(this.playerColor+"Pawn"+(parseInt(i)+1)).style.backgroundColor = "white";
                    else
                        document.getElementById(this.playerColor+"Pawn"+(parseInt(i)+1)).style.backgroundColor = this.playerColor;
                }
                pawnMode++;
            }, 1000);

            let moveTo;
            let ghostPawn;
            let params = {};

            for(let i in moveablePawns){
                moveablePawn = moveablePawns[i];
                
                if(moveablePawn.pos <= 3)
                    moveTo = 4;
                else
                    moveTo = moveablePawn.pos + this.diceResult;
                params[i] = moveTo;
                ghostPawn = document.createElement("DIV");
                ghostPawn.id = "ghostPawn"+(parseInt(i)+1);
                ghostPawn.style = "position: absolute; left: "+this.cords[this.playerColor][moveTo][0]+"px; top: "+this.cords[this.playerColor][moveTo][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink; display: none;";
                document.getElementById("boardDiv").appendChild(ghostPawn);
                document.getElementById(this.playerColor+"Pawn"+(parseInt(i)+1)).style.cursor = "pointer";
            }

            if(Object.keys(params).includes("0")){
                document.getElementById(this.playerColor+"Pawn"+(parseInt("0")+1)).addEventListener("mouseover", ()=>{document.getElementById("ghostPawn"+(parseInt("0")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["0"]][0]+"px; top: "+this.cords[this.playerColor][params["0"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink;";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("0")+1)).addEventListener("mouseout", ()=>{document.getElementById("ghostPawn"+(parseInt("0")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["0"]][0]+"px; top: "+this.cords[this.playerColor][params["0"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink; display: none";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("0")+1)).addEventListener("click", ()=>{
                    clearInterval(this.interval);
            
                    document.getElementById("ghostPawn"+(parseInt("0")+1)).style.left = "0px";
                    document.getElementById("ghostPawn"+(parseInt("0")+1)).style.top = "0px";
                    document.getElementById("ghostPawn"+(parseInt("0")+1)).style.display = "none";
            
                    this.pawnsPositions[parseInt("0")] = params["0"];
                    this.pawns[this.playerColor][parseInt("0")].pos = params["0"];
                    this.pawns[this.playerColor][parseInt("0")].posX = this.cords[this.playerColor][params["0"]][0];
                    this.pawns[this.playerColor][parseInt("0")].posY = this.cords[this.playerColor][params["0"]][1];
            
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("0")+1)).style.left = this.pawns[this.playerColor][parseInt("0")].posX+"px";
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("0")+1)).style.top = this.pawns[this.playerColor][parseInt("0")].posY+"px";
                    
                    let elem;
                    for(let i = 1; i <= 4; i++){
                        document.getElementById(this.playerColor+"Pawn"+i).style.backgroundColor = this.playerColor;
                        document.getElementById(this.playerColor+"Pawn"+i).style.cursor = "default";
                        document.getElementById(this.playerColor+"Pawn"+i).replaceWith(document.getElementById(this.playerColor+"Pawn"+i).cloneNode(true));
                        if(document.getElementById("ghostPawn"+i)){
                            elem = document.getElementById("ghostPawn"+i);
                            elem.parentNode.removeChild(elem);
                        }
                    }
                    
                    document.getElementById("boardDice").style.display = "none";
                    clearInterval(this.interval2);
                    this.interval2 = "";
                    document.getElementById(this.playerColor+"PlayerInfo").innerHTML = "";
                    this.playerStatus = 2; 
                    this.moving = false; 
                    this.update();
                });
            }
            if(Object.keys(params).includes("1")){
                document.getElementById(this.playerColor+"Pawn"+(parseInt("1")+1)).addEventListener("mouseover", ()=>{document.getElementById("ghostPawn"+(parseInt("1")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["1"]][0]+"px; top: "+this.cords[this.playerColor][params["1"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink;";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("1")+1)).addEventListener("mouseout", ()=>{document.getElementById("ghostPawn"+(parseInt("1")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["1"]][0]+"px; top: "+this.cords[this.playerColor][params["1"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink; display: none";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("1")+1)).addEventListener("click", ()=>{
                    clearInterval(this.interval);
            
                    document.getElementById("ghostPawn"+(parseInt("1")+1)).style.left = "0px";
                    document.getElementById("ghostPawn"+(parseInt("1")+1)).style.top = "0px";
                    document.getElementById("ghostPawn"+(parseInt("1")+1)).style.display = "none";
            
                    this.pawnsPositions[parseInt("1")] = params["1"];
                    this.pawns[this.playerColor][parseInt("1")].pos = params["1"];
                    this.pawns[this.playerColor][parseInt("1")].posX = this.cords[this.playerColor][params["1"]][0];
                    this.pawns[this.playerColor][parseInt("1")].posY = this.cords[this.playerColor][params["1"]][1];
            
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("1")+1)).style.left = this.pawns[this.playerColor][parseInt("1")].posX+"px";
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("1")+1)).style.top = this.pawns[this.playerColor][parseInt("1")].posY+"px";

                    let elem;
                    for(let i = 1; i <= 4; i++){
                        document.getElementById(this.playerColor+"Pawn"+i).style.backgroundColor = this.playerColor;
                        document.getElementById(this.playerColor+"Pawn"+i).style.cursor = "default";
                        document.getElementById(this.playerColor+"Pawn"+i).replaceWith(document.getElementById(this.playerColor+"Pawn"+i).cloneNode(true));
                        if(document.getElementById("ghostPawn"+i)){
                            elem = document.getElementById("ghostPawn"+i);
                            elem.parentNode.removeChild(elem);
                        }
                    }
            
                    document.getElementById("boardDice").style.display = "none";
                    clearInterval(this.interval2);
                    this.interval2 = "";
                    document.getElementById(this.playerColor+"PlayerInfo").innerHTML = "";
                    this.playerStatus = 2; 
                    this.moving = false; 
                    this.update();
                });
            }
            if(Object.keys(params).includes("2")){
                document.getElementById(this.playerColor+"Pawn"+(parseInt("2")+1)).addEventListener("mouseover", ()=>{document.getElementById("ghostPawn"+(parseInt("2")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["2"]][0]+"px; top: "+this.cords[this.playerColor][params["2"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink;";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("2")+1)).addEventListener("mouseout", ()=>{document.getElementById("ghostPawn"+(parseInt("2")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["2"]][0]+"px; top: "+this.cords[this.playerColor][params["2"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink; display: none";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("2")+1)).addEventListener("click", ()=>{
                    clearInterval(this.interval);
            
                    document.getElementById("ghostPawn"+(parseInt("2")+1)).style.left = "0px";
                    document.getElementById("ghostPawn"+(parseInt("2")+1)).style.top = "0px";
                    document.getElementById("ghostPawn"+(parseInt("2")+1)).style.display = "none";
            
                    this.pawnsPositions[parseInt("2")] = params["2"];
                    this.pawns[this.playerColor][parseInt("2")].pos = params["2"];
                    this.pawns[this.playerColor][parseInt("2")].posX = this.cords[this.playerColor][params["2"]][0];
                    this.pawns[this.playerColor][parseInt("2")].posY = this.cords[this.playerColor][params["2"]][1];
            
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("2")+1)).style.left = this.pawns[this.playerColor][parseInt("2")].posX+"px";
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("2")+1)).style.top = this.pawns[this.playerColor][parseInt("2")].posY+"px";

                    let elem;
                    for(let i = 1; i <= 4; i++){
                        document.getElementById(this.playerColor+"Pawn"+i).style.backgroundColor = this.playerColor;
                        document.getElementById(this.playerColor+"Pawn"+i).style.cursor = "default";
                        document.getElementById(this.playerColor+"Pawn"+i).replaceWith(document.getElementById(this.playerColor+"Pawn"+i).cloneNode(true));
                        if(document.getElementById("ghostPawn"+i)){
                            elem = document.getElementById("ghostPawn"+i);
                            elem.parentNode.removeChild(elem);
                        }
                    }
            
                    document.getElementById("boardDice").style.display = "none";
                    clearInterval(this.interval2);
                    this.interval2 = "";
                    document.getElementById(this.playerColor+"PlayerInfo").innerHTML = "";
                    this.playerStatus = 2; 
                    this.moving = false; 
                    this.update();
                });
            }
            if(Object.keys(params).includes("3")){
                document.getElementById(this.playerColor+"Pawn"+(parseInt("3")+1)).addEventListener("mouseover", ()=>{document.getElementById("ghostPawn"+(parseInt("3")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["3"]][0]+"px; top: "+this.cords[this.playerColor][params["3"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink;";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("3")+1)).addEventListener("mouseout", ()=>{document.getElementById("ghostPawn"+(parseInt("3")+1)).style = "position: absolute; left: "+this.cords[this.playerColor][params["3"]][0]+"px; top: "+this.cords[this.playerColor][params["3"]][1]+"px; height: 42px; width: 42px; border: 3px solid black; border-radius: 24px; background-color: pink; display: none";});
                document.getElementById(this.playerColor+"Pawn"+(parseInt("3")+1)).addEventListener("click", ()=>{
                    clearInterval(this.interval);
            
                    document.getElementById("ghostPawn"+(parseInt("3")+1)).style.left = "0px";
                    document.getElementById("ghostPawn"+(parseInt("3")+1)).style.top = "0px";
                    document.getElementById("ghostPawn"+(parseInt("3")+1)).style.display = "none";
                    clearInterval(this.interval2);
                    this.interval2 = "";
            
                    this.pawnsPositions[parseInt("3")] = params["3"];
                    this.pawns[this.playerColor][parseInt("3")].pos = params["3"];
                    this.pawns[this.playerColor][parseInt("3")].posX = this.cords[this.playerColor][params["3"]][0];
                    this.pawns[this.playerColor][parseInt("3")].posY = this.cords[this.playerColor][params["3"]][1];
            
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("3")+1)).style.left = this.pawns[this.playerColor][parseInt("3")].posX+"px";
                    document.getElementById(this.playerColor+"Pawn"+(parseInt("3")+1)).style.top = this.pawns[this.playerColor][parseInt("3")].posY+"px";

                    let elem;
                    for(let i = 1; i <= 4; i++){
                        document.getElementById(this.playerColor+"Pawn"+i).style.backgroundColor = this.playerColor;
                        document.getElementById(this.playerColor+"Pawn"+i).style.cursor = "default";
                        document.getElementById(this.playerColor+"Pawn"+i).replaceWith(document.getElementById(this.playerColor+"Pawn"+i).cloneNode(true));
                        if(document.getElementById("ghostPawn"+i)){
                            elem = document.getElementById("ghostPawn"+i);
                            elem.parentNode.removeChild(elem);
                        }
                    }
            
                    document.getElementById("boardDice").style.display = "none";
                    clearInterval(this.interval2);
                    this.interval2 = "";
                    document.getElementById(this.playerColor+"PlayerInfo").innerHTML = "";
                    this.playerStatus = 2; 
                    this.moving = false; 
                    this.update();
                });
            }

        }
    }
}