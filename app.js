/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var Player_1 = {
    panel :         document.getElementsByClassName("player-0-panel")[0],

    name  :         document.getElementsByClassName("player-name")[0],
    score :         document.getElementsByClassName("player-score")[0],

    current_label : document.getElementsByClassName("player-curren-label")[0],
    current_score : document.getElementsByClassName("player-current-score")[0],
    };
var Player_2 = {
    panel :         document.getElementsByClassName("player-1-panel")[0],
    name :         document.getElementsByClassName("player-name")[1],
    score :         document.getElementsByClassName("player-score")[1],

    current_label : document.getElementsByClassName("player-curren-label")[1],
    current_score : document.getElementsByClassName("player-current-score")[1],
    };

var btn_new  =document.getElementsByClassName("btn-new")[0];
var btn_roll =document.getElementsByClassName("btn-roll")[0];
var btn_hold =document.getElementsByClassName("btn-hold")[0];
var help_btn =document.getElementsByClassName("help")[0];
//var anim_stop =document.getElementsByClassName("anim_stop")[0];
var dice_img  =document.getElementsByTagName("img")[0];
var span_name = document.getElementsByTagName("span")[0];
var wrapper_name = document.getElementsByClassName("wrapper")[0];
var img_wrapper = document.getElementsByClassName("img_wrapper")[0];
var hold_is_clicked = 0 ;
var dice_value ;
var class_name ;
var current = 1 ;
var current_Player = {};
var Images = [];
var new_div={};
var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0','#fe4191','#01c5ff','#ffd430'];
var anim_key = 0 ;
var anim_handle;
var Win_Score = document.getElementsByClassName("win-score")[0].value;
var playing_game = 0
//console.log(dice_img);
console.log(Player_1.current_score.innerHTML);
console.log(wrapper_name.classList);
console.log("after wrapper");

Init_game();
check_winner();
            /* -------------------------------- New Game Click----------------------------  */

btn_new.addEventListener("click",function(){

wrapper_name.classList.remove("winner");
Player_1.panel.classList.remove("winner_panel");
Player_2.panel.classList.remove("winner_panel");
Init_game();
console.log("we start game again");
console.log(Win_Score);
anim_key = 1 ;
go_down();
playing_game = 1 ;  
    dice_img.style.display="block";
    
});
            /* -------------------------------- Hold Click----------------------------  */

btn_hold.addEventListener("click",function() {
   
 if (playing_game ==1)
  {
    if  (current == 1) 
       
        {
         update_score(Player_1); 
          check_winner();    
         Player_1.panel.classList.remove("active"); 
         Player_2.panel.classList.add("active");
         current=2;
        current_Player= Player_2 ;
        console.log('player 2 is active now');
        }
   
    else if (current ==2)
        {
         update_score(Player_2); 
          check_winner();    
         Player_2.panel.classList.remove("active");
         Player_1.panel.classList.add("active");
         current=1;
         current_Player=Player_1;
        console.log('player 1 is active now');
        }
  }
});
            /* -------------------------------- Roll Click----------------------------  */


btn_roll.addEventListener("click",function(){
if (playing_game == 1)
    {
        Roll_dice();
        change_img();
        current_Player=Return_current_player();
        update_current(current_Player);
        check_winner();
    }
});
        /* -------------------------------------  winner State ------------------------*/

    



/* ////////////////////////////  Function to help us ///////////////////////   */
                    /* ------------ Roll----------------  */
function Roll_dice(){
    
    dice_value  = -1 ;
    while( dice_value < 1){
    var y = Math.random();
     dice_value = Math.floor((y * 10) - 3);}
}
        /*-------------------------------------Chane Image ------------------- */
function change_img(){
// dice_img.setAttribute("src",  'http://mamaslittlestar.com/wp-content/themes/business-elite/static/dice-'+dice_value+'.png' )
dice_img.setAttribute("src",  'dice-'+dice_value+'.png' )
}

                    /* ------------ Update----------------  */
function update_current (obj) {
    var current_score = parseInt(obj.current_score.innerHTML);
    if (dice_value == 1) 
    {obj.current_score.innerHTML = 0;
     if         (current==1)
     {         
        Player_1.panel.classList.remove("active"); 
        Player_2.panel.classList.add("active");
        current=2;
        current_Player= Player_2 ;
        console.log('player 2 is active now');}
     else if    (current==2)
        {                           
         Player_2.panel.classList.remove("active");
         Player_1.panel.classList.add("active");
         current=1;
         current_Player=Player_1;
        console.log('player 1 is active now')
        }
                         
    
    }
    else
    {
    current_score +=dice_value    
    obj.current_score.innerHTML = current_score;
    }
}
                    /* ------------ Update----------------  */
function update_score(obj)
{
    var cur_score = parseInt(obj.current_score.innerHTML);
    var score  = parseInt(obj.score.innerHTML) + cur_score;
    
    obj.score.innerHTML = score;
    obj.current_score.innerHTML= 0;
}
                    /* ------------ Return_Current_Player----------------  */

function Return_current_player(){
 if (Player_1.panel.classList[1] =='active' ) 
    {   current = 1 ;
        return Player_1;
    }
else 
    {   current = 2 ;
        return Player_2;
    }
        
}

            /* ------------------------- Initialize------------------ */
function Init_game(){
    current=1;
    Player_1.current_score.innerHTML= 0 ;
    Player_1.score.innerHTML= 0;
    Player_1.name.innerHTML= "PLAYER 1" ;
   // Player_1.name.style.color= "#555";
    
    Player_2.current_score.innerHTML=0;
    Player_2.score.innerHTML=0;  
    Player_2.name.innerHTML="PLAYER 2";
   // Player_2.name.style.color="#555";
   //  dice_img.setAttribute("src",  'http://mamaslittlestar.com/wp-content/themes/business-elite/static/dice-6.png' );
    dice_img.setAttribute("src",  'dice-6.png' );
    dice_img.style.display="none";
}
            /*-----------------------------Check if Game is Won-----------------------*/
function check_winner(){
    
    if( (parseInt (Player_1.current_score.innerHTML) >= Win_Score) || (parseInt(Player_1.score.innerHTML) >= Win_Score) || (parseInt(Player_1.score.innerHTML)+parseInt (Player_1.current_score.innerHTML) >= Win_Score) )
    {   span_name.innerHTML =  Player_1.name.innerHTML + " " + "wins" +" "+  "<i class=" +'ion-android-happy'+">" +"</i>" ;
        wrapper_name.classList.add("winner");
        Player_1.panel.classList.add("winner_panel");
        Player_1.name.innerHTML= "WINNER";
       // Player_1.name.style.color= "yellow";
        //Init_game();
        console.log("Game is won");
        Animation();
     playing_game = 0 ;
     
    }

else if((parseInt(Player_2.current_score.innerHTML )>= Win_Score) || (parseInt(Player_2.score.innerHTML) >= Win_Score) || (parseInt(Player_2.score.innerHTML)+parseInt(Player_2.current_score.innerHTML ) >= Win_Score))
{   span_name.innerHTML = Player_2.name.innerHTML + " " + "wins" +" " + "<i class=" +'ion-android-happy'+">" +"</i>" ;
    wrapper_name.classList.add("winner");
    Player_2.panel.classList.add("winner_panel");
    Player_2.name.innerHTML= "WINNER";
   // Player_2.name.style.color= "yellow";
    //Init_game(); 
    console.log("Game is won");
    Animation();
 playing_game = 0 ;
}

   
}
/*  --------------------------set win_score ---------------------*/
document.getElementsByClassName("win-score")[0].addEventListener("change" ,function(){
    
    //document.getElementsByClassName("win-score")[0].value= document.getElementsByClassName("win-score")[0].value;
     Win_Score = document.getElementsByClassName("win-score")[0].value;
    console.log("win score new value is : " + Win_Score);
});

/* -------------------------Help Button -------------------------------- */

help_btn.addEventListener("click", function (){
    
    
    console.log("Help button clicked");
    document.getElementsByClassName("help-content")[0].style.display = "block";    
    
});
    
/* -------------------------Body click -------------------------------- */

document.getElementsByClassName("close")[0].addEventListener("click", function(){
    
    
    console.log("body  clicked");
    document.getElementsByClassName("help-content")[0].style.display = "none";    
});

/* ////////////////////////////// Animation Function /////////////// */

function Animation() {
 
   console.log("Animation button clicked"); 
    
    if(new_div ==img_wrapper.firstElementChild)
    { new_div.parentNode.removeChild(new_div) ;}
  
    anim_key = 0;
    
//   Create Images
        new_div =document.createElement("div");
        img_wrapper.appendChild(new_div);
        new_div.classList.add("new_div");
    for (var i =1 ; i< 55 ;i++)
    {
        var  rand_color = colors[Math.floor(Math.random() * colors.length)];
        var rand_index    = Math.floor(Math.random()*Images.length);
        var rand_width   = Math.floor(Math.random()*15);
                if (rand_width < 17 ) {rand_width +=2 ;}
        var rand_height   = Math.floor(Math.random()*15);
                if (rand_height < 17 ) {rand_height +=2 ;}
        
        var rand_x = Math.floor((Math.random()*1300));  
        var rand_y = Math.floor((Math.random()*500)) + Math.floor((Math.random()*500))+ Math.floor((Math.random()*500))+ Math.floor((Math.random()*500)); 
        Images[i] =document.createElement("div");
        new_div.appendChild(Images[i]);
        Images[i].style.position = "absolute";
       // Images[i].setAttribute("src",'images/'+i+'.jpg');
        Images[i].style.display ='inline-block';
        Images[i].style.margin = '0px';
        Images[i].style.width = rand_width+'px';
        Images[i].style.height=rand_height+'px';
        Images[i].style.left =rand_x+'px';
        Images[i].style.top = rand_y+ 'px';
        Images[i].style.backgroundColor = rand_color;
    }
      
    anim_handle = setInterval(go_down,20);
    
    } //end of animation
    
       
    

var fix = 10;
function go_down()
{   
    if (fix > 500) {fix = 10;}
    if (anim_key == 1) 
        {clearInterval(anim_handle) ;
            if(new_div ==img_wrapper.firstElementChild)
             {   new_div.parentNode.removeChild(new_div) ;}
     } 
    
    else
    {
       // create_Images();
        if (Images.length>0)
          {  
                for(var z = 1 ; z < 55 ; z++){
                    rand_num = Math.floor(Math.random()*500);
                    Images[z].style.top = fix + rand_num +'px'; 
         
                 }//end of for
              fix = parseInt( Images[1].style.top); 
          } // end of if
  
    } // end of else
    
} // end of go down

/*   ------------------------Create Images -------------------------------*/
function create_Images(){


}


