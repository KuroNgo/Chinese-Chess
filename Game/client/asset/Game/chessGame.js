const GAME_WIDTH=400;
const GAME_HEIGHT=600;
const IMAGES_DIR = "asset/images_cotuong";

const ITEM_WIDTH = GAME_WIDTH/9;
const ITEM_HEIGHT = GAME_HEIGHT/10 ;
//#region TODO: Xác định vị trí tọa độ
function ChessGame(){
    let self={};
    let items;
    const GAME = {
        // tạo tọa độ, vị trí của các con cờ trên bàn cờ
        // Xe(0,0), Ma(1,0), Tinh(2,0), Sy(3,0), Tuong(4,0), Sy(5,0), Tinh(6,0), Ma(7,0),Xe(8,0),
        // Phao(1,2), Phao(7,2),
        // Tot(0,3),Tot(2,3),Tot(4,3),Tot(6,3),Tot(8,3),
        // Tot(0,6,1),Tot(2,6,1),Tot(4,6,1),Tot(6,6,1),Tot(8,6,1),
        // Phao(1,7,1), Phao(7,7,1),
        // Xe(0,9,1), Ma(1,9,1), Tinh(2,9,1), Sy(3,9,1), Tuong(4,9,1), Sy(5,9,1), Tinh(6,9,1), Ma(7,9,1),Xe(8,9,1)
        '00': Xe(0,0,0,self),'10': Ma(1,0,0,self), '20':Tinh(2,0,0,self),'30': Sy(3,0,0,self), '40':Tuong(4,0,0,self), '50':Sy(5,0,0,self), '60':Tinh(6,0,0,self),'70': Ma(7,0,0,self),'80':Xe(8,0,0,self),
        '12':Phao(1,2,0,self), '72':Phao(7,2,0,self),
        '03':Tot(0,3,0,self),'23':Tot(2,3,0,self),'43':Tot(4,3,0,self),'63':Tot(6,3,0,self),'83':Tot(8,3,0,self),
        '06':Tot(0,6,1,self),'26':Tot(2,6,1,self),'46':Tot(4,6,1,self),'66':Tot(6,6,1,self),'86':Tot(8,6,1,self),
        '17':Phao(1,7,1,self), '77':Phao(7,7,1,self),
        '09':Xe(0,9,1,self), '19':Ma(1,9,1,self),'29': Tinh(2,9,1,self), '39':Sy(3,9,1,self), '49':Tuong(4,9,1,self), '59':Sy(5,9,1,self),'69': Tinh(6,9,1,self), '79':Ma(7,9,1,self),'89':Xe(8,9,1,self)
    };

    function restart(){
        items = Object.assign(GAME); // Được tạo thành cái đối tượng thành game
    }
    self.start = function(){
        restart();
    }
    self.pause = function(){
        
    }
    self.end = function(){
        
    }
    function init(){
        restart();
        Object.defineProperties(self,{
            items:{get:function() {return items; }}
        });
    }init();
    return self;
}
//#endregion
//#region TODO: Constructor
// Khởi tạo constructor
const ROWS = 9;
const COLS = 9;
function ChessItem( x, y, name, type){
    let self={ x, y, name, type};
    self.roads = function(){
  
    }
    self.go = function(x,y){
        if(!self.roads()[`${x}${y}`])
            return;
        let _x=self.x;
        let _y=self.y;

        self.x = x;
        self.y = y;
        game.items[`${x}${y}`]=self;
        delete game.items[`${_x}${_y}`];
       
    }
    function init(){

    }init();
    return self;
}

function Xe(x, y,  type = 0){
    let self = ChessItem(x, y, 'xe', type);
    function init(){

    }init();
    return self;
}

function Phao(x, y,  type = 0){
    let self = ChessItem(x, y, 'phao', type);
    function init(){

    }init();
    return self;
}

function Ma(x, y,  type = 0){
    let self = ChessItem(x, y, 'ma', type);
    function init(){

    }init();
    return self;
}

function Tuong(x, y,  type = 0){
    let self = ChessItem(x, y, 'tuong', type);
    function init(){

    }init();
    return self;
}

function Sy(x, y,  type = 0){
    let self = ChessItem(x, y, 'sy', type);
    function init(){

    }init();
    return self;
}

function Tinh(x, y,  type = 0){
    let self = ChessItem(x, y, 'tinh', type);
    function init(){

    }init();
    return self;
}

function Tot(x, y,  type = 0){
    let self = ChessItem(x, y, 'tot', type);
    self.roads = function (){

        let roads = {}
        switch(self.type){
            case 0:
                roads[`${self.x}${self.y+1}`]=true;
                if(self.y > 4){
                    roads[`${self.x+1}${self.y}`]=true;
                    roads[`${self.x-1}${self.y}`]=true;
                }
                break;
            case 1:
                roads[`${self.x}${self.y-1}`]=true;
                if(self.y < 5){
                    roads[`${self.x+1}${self.y}`]=true;
                    roads[`${self.x-1}${self.y}`]=true;
                }
                break;
        }
        return roads;
    }
    function init(){

    }init();
    return self;
}

//#endregion
//#region TODO: Loadder, là một hàm khởi tạo, mà khởi tạo thì phải đặt ở đầu
// class Loader{
//     constructor(){
//         let srcs = {
//             table:          '/table',
//             xe_r:           'xe_r',
//             phao_r:         'phao_r',
//             ma_r:           'ma_r',
//             tuong_r:        'tuong_r',
//             sy_r:           'sy_r',
//             tinh_r:         'tinh_r',
//             tot_r:          'tot_r',
//             xe_b:           'xe_b',
//             phao_b:         'phao_b',
//             ma_b:           'ma_b',
//             tuong_b:        'tuong_b',
//             si_b:           'sy_b',
//             tinh_b:         'tinh_b',
//             tot_b:          'tot_b',

//         }

//         this.loadding = 0;

//         for(let i in srcs){
//             let name = srcs[i];
//             this[i] = new Image;
//             this[i].src = `${IMAGES_DIR}/${name}.png`;
//             this.loadding ++;
//             this[i].onload = ()=>{
//                 this.loadding --;
//                 if(this.loadding == 0){
//                     new chessGame;
//                 }
//             }
//         }
//     }
// }
// let loader = new Loader;
//#endregion

//#region Hàm thực hiện các chức năng về phía client
class chessGame{

    constructor(){

        let canvas = document.createElement('canvas');
        canvas.width=GAME_WIDTH;
        canvas.height=GAME_HEIGHT;

        this.ctx=canvas.getContext('2d')
        this.game=new ChessGame();

        document.body.appendChild(canvas);

        this.update();

        let isSelect =false;
        let itemSelected ;
        canvas.onclick = function(event){
            let x=event.clientX;
            let y=event.clientY;

            x =Math.floor(x/ITEM_WIDTH);
            y=Math.floor(y/ITEM_HEIGHT);

            let item = this.game.items[`${x}${y}`]
            // Neu ton tai mot con co o vi tri x,y vua click
            if(item){
                isSelect =true;
                itemSelected = item;
            }
            else if(itemSelected && isSelect){
                // Khi lập trình OOP, chúng ta thao tác property
                // thao tác thay đổi đối tượng thì chúng ta nên thay đổi tại vị trí của đối tượng chứ không 
                // nên code ngẫu hứng
                itemSelected.go(x,y);
                // let _x = itemSelected.x;
                // let _y =itemSelected.y;
                // itemSelected.x=x;
                // itemSelected.y=y;

                // Không là chuẩn của lập trình hướng đối tượng
                // delete this.game.items[`${_x}${_y}`]
                // this.game.items[`${x}${y}`] = itemSelected;
                this.draw();
                isSelect=false;
                itemSelected=null;
            }

        }.bind(this);
    }

    update(){
        this.draw();
    }

    draw(){
        let image = new Image;
        image.src = IMAGES_DIR + '/table.png';
        image.onload = ()=>{
            this.ctx.drawImage(image,0,0,GAME_WIDTH,GAME_HEIGHT);
        }

        for (let i in this.game.items){
            let item = this.game.items[i];
            let img = new Image;
            img.src= `${IMAGES_DIR}/${item.name}_${item.type? 'r' : 'b'}.png`;
            img.onload =() =>{
                this.ctx.drawImage(img, item.x * ITEM_WIDTH, item.y * ITEM_HEIGHT,ITEM_WIDTH,ITEM_WIDTH);
            }
        }
    }
    
}
new chessGame;
//#endregion
