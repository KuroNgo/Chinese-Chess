/***************************************************************\
 * 
 *  By Kuro: Ngô Hoài Phong
 *  GAME CỜ TƯỚNG: CHINESE CHESS 
 * 
 * 
\***************************************************************/

var Engine = function(){
    //#region TODO: Thực hiện khai báo các biến để làm tiền đề cho việc khởi tạo bàn cờ và quân cờ
    const VERSION = '1.0';

    //Forsyth-Edwards Notation(FEN) phát minh ghi chú để mô tả vị trí bàn cờ
    // r = xe, h = mã, e = tịnh, a = sĩ, k = tướng,c = pháo, p = tốt
    const START_FEN='rheakaehr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RHEAKAEHR r --0 1';// đoạn mã biểu thị vị trí đứng của bàn cờ
    
    // Bên nào sẽ đi
    const RED = 0;
    const BLACK = 1;

    // Mã hóa quân cờ trên bàn cờ
    const EMPTY = 0;        // ô trống
    const RED_PAWN = 1;       // chốt
    const RED_ADDVISOR = 2;   // sĩ
    const RED_ELEPHANT = 3;   // tịnh
    const RED_HORSE = 4;      //mã
    const RED_CANNON = 5;     // pháo
    const RED_ROOK = 6;       // xe
    const RED_KING = 7;       // tướng
    const BLACK_PAWN = 8;  
    const BLACK_ADDVISOR = 9;
    const BLACK_ELEPHANT = 10;
    const BLACK_HORSE = 11;
    const BLACK_CANNON = 12;
    const BLACK_ROOK = 13;
    const BLACK_KING = 14;
    const OFFBOARD = 15;    // các giá trị quân cờ 0-15  ô là 15 là ô X không thể đi ra khỏi bàn cờ

    // đưa ô cờ
    const A9 = 23 , B9 = 24 , C9 = 25 , D9 = 26 , E9 = 27 , F9 = 28 , G9 = 29 , H9 = 30 , I9 = 31 ;
    const A8 = 34 , B8 = 35 , C8 = 36 , D8 = 37 , E8 = 38 , F8 = 39 , G8 = 40 , H8 = 41 , I8 = 42 ; 
    const A7 = 45 , B7 = 46 , C7 = 47 , D7 = 48 , E7 = 49 , F7 = 50 , G7 = 51 , H7 = 52 , I7 = 53 ;
    const A6 = 56 , B6 = 57 , C6 = 58 , D6 = 59 , E6 = 60 , F6 = 61 , G6 = 62 , H6 = 63 , I6 = 64 ;
    const A5 = 67 , B5 = 68 , C5 = 69 , D5 = 70 , E5 = 71 , F5 = 72 , G5 = 73 , H5 = 74 , I5 = 75 ;
    const A4 = 78 , B4 = 79 , C4 = 80 , D4 = 81 , E4 = 82 , F4 = 83 , G4 = 84 , H4 = 85 , I4 = 86 ;
    const A3 = 89 , B3 = 90 , C3 = 91 , D3 = 92 , E3 = 93 , F3 = 94 , G3 = 95 , H3 = 96 , I3 = 97 ;
    const A2 = 100 , B2 = 101 , C2 = 102 , D2 = 103 , E2 = 104 , F2 = 105 , G2 = 106 , H2 = 107 , I2 = 108 ;
   const A1 = 111 , B1 = 112 , C1 = 113 , D1 = 114 , E1 = 115 , F1 = 116 , G1 = 117 , H1 = 118 , I1 = 119 ; 
    const A0 = 122 , B0 = 123 , C0 = 124 , D0 = 125 , E0 = 126 , F0 = 127 , G0 = 128 , H0 = 129 , I0 = 130; 

    // Đưa tọa độ
    const COORDINATES = [
        'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 
        'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 
        'xx' , 'a9' , 'b9' , 'c9' , 'd9' , 'e9' , 'f9' , 'g9' , 'h9' , 'i9' , 'xx' , 
        'xx' , 'a8' , 'b8' , 'c8' , 'd8' , 'e8' , 'f8' , 'g8' , 'h8' , 'i8' , 'xx' , 
        'xx' , 'a7' , 'b7' , 'c7' , 'd7' , 'e7' , 'f7' , 'g7' , 'h7' , 'i7' , 'xx' , 
        'xx' , 'a6' , 'b6' , 'c6' , 'd6' , 'e6' , 'f6' , 'g6' , 'h6' , 'i6' , 'xx' , 
        'xx' , 'a5' , 'b5' , 'c5' , 'd5' , 'e5' , 'f5' , 'g5' , 'h5' , 'i5' , 'xx' , 
        'xx' , 'a4' , 'b4' , 'c4' , 'd4' , 'e4' , 'f4' , 'g4' , 'h4' , 'i4' , 'xx' , 
        'xx' , 'a3' , 'b3' , 'c3' , 'd3' , 'e3' , 'f3' , 'g3' , 'h3' , 'i3' , 'xx' , 
        'xx' , 'a2' , 'b2' , 'c2' , 'd2' , 'e2' , 'f2' , 'g2' , 'h2' , 'i2' , 'xx' , 
        'xx' , 'a1' , 'b1' , 'c1' , 'd1' , 'e1' , 'f1' , 'g1' , 'h1' , 'i1' , 'xx' , 
        'xx' , 'a0' , 'b0' , 'c0' , 'd0' , 'e0' , 'f0' , 'g0' , 'h0' , 'i0' , 'xx' , 
        'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 
        'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 'xx' , 
    ];
    //#endregion
    //#region TODO: Mã hóa quân cờ và ô cờ, khởi tạo bàn cờ và vẽ bàn cờ ra console, Dùng ký hiệu FEN để vẽ ra toàn bộ bàn cờ
    /*
        P   A   E   H   C   R   K           p   a   e   h   c   r   k
        兵  仕  相  傌  炮  俥   帥          卒  士  象   馬  砲  車  將
    
    Board representation 11 x 14

    X X X X X X X X X X X
    X X X X X X X X X X X
    X r h e a k a e h r X
    X . . . . . . . . . X
    X . c . . . . . c . X
    X p . p . p . p . p X
    X . . . . . . . . . X
    X . . . . . . . . . X
    X P . P . P . P . P X
    X . C . . . . . C . X
    X . . . . . . . . . X
    X R H E A K A E H R X
    X X X X X X X X X X X
    X X X X X X X X X X X    

    */

    // Vẽ bàn cờ
    var board = new Array(11 * 14);

    // bên nào đi
    var side = RED;

    // 60 nước mới được cầu hòa
    var sixty = 0;

    // Vị trí của tướng
    var kingSquare=[0,0];

    // Tạo hàm làm mới bàn cờ ( reset game )
    function resetBoard(){
        // rank hàng ngang, file hàng dọc
        // Resesset vị trí quân cờ trở về mặc định
        for(let rank = 0; rank < 14; rank++){
            for(let file = 0; file < 11; file++){
                let square = rank * 11 + file;

                // Kiểm tra có phải là offboard hay không ?
                if(COORDINATES[square] != 'xx') board[square] = EMPTY;
                else board[square] = OFFBOARD;
            }
        }
        // reset game state (reset trạng thái bàn cờ)
        side = RED;
        sixty = 0;
        kingSquare = [0, 0];
    }

    // encode string to pieces
    const CHAR_TO_PIECES = {
        'P':RED_PAWN, 
        'A':RED_ADDVISOR,
        'E':RED_ELEPHANT, 
        'H':RED_HORSE, 
        'C':RED_CANNON, 
        'R':RED_ROOK, 
        'K':RED_KING, 
        'p':BLACK_PAWN, 
        'a':BLACK_ADDVISOR, 
        'e':BLACK_ELEPHANT, 
        'h':BLACK_HORSE, 
        'c':BLACK_CANNON, 
        'r':BLACK_ROOK, 
        'k':BLACK_KING
    }

    // string representation for piéces
    //const asciiPieces=['.', '兵', '仕', '相', '傌', '炮', '俥', '帥', '卒', '士', '象', '馬', '砲', '車', '將'];
    const PIECES_TO_CHAR=['.',  'P' ,  'A' ,  'E'  , 'H' ,  'C' ,  'R'  , 'K'           ,'p'  , 'a'   ,'e'   ,'h'   ,'c'  , 'r'   ,'k'];

    function SetBoard(FEN){
        resetBoard();
        let index=0; // duyệt qua từng chữ cái của FEN

        // rank : dòng          file: cột
        // Parse vị trí quân cờ trở về mặc định
        for(let rank = 0; rank < 14; rank++){
            for(let file = 0;file < 11; file++){
                let square = rank * 11 + file;

                // Kiểm tra có phải là offboard hay không ?
                if(COORDINATES[square] != 'xx') {
                    // Parse Pieces
                    if ((FEN[index]).charCodeAt() >= 'a'.charCodeAt() && FEN[index].charCodeAt() <= 'z'.charCodeAt()
                    || (FEN[index].charCodeAt() >= 'A'.charCodeAt() && FEN[index].charCodeAt() <= 'Z'.charCodeAt())){
                        if(FEN[index] == 'K') kingSquare[RED] = square;
                        else if (FEN[index]=="k") kingSquare[BLACK] = square;

                        board[square] = CHAR_TO_PIECES[FEN[index]];
                        index++;
                    }

                    // Parse empty squares
                    if(FEN[index].charCodeAt() >= '0'.charCodeAt() && FEN[index].charCodeAt() <= '9'.charCodeAt()){
                        let offset = FEN[index] - '0';
                        if(board[square]==EMPTY) file--;
                        file += offset;
                        index++;
                    }

                    if(FEN[index] == '/') index++;
                }
            }
        }
        
        // Để xác định bên nào đi trước
        index++;
        side = (FEN[index] == 'r') ? RED : BLACK;
    }
    
    
    // in bàn cờ ra màn hình console
    function printBoard(){
        let boardString='';
         // in vị trí quân cờ trên bàn cờ
         for(let rank = 0; rank < 14; rank++){
            for(let file = 0;file < 11; file++){
                let square = rank * 11 + file;

                // Kiểm tra có phải là offboard hay không ?
                if(COORDINATES[square] != 'xx'){
                    if(file == 1) boardString += 11 - rank + '  ';
                    boardString += PIECES_TO_CHAR[board[square]] + ' ';
                };
            }
            if(rank < 13) 
            boardString += '\n';
        }
        boardString += '   a b c d e f g h i\n\n';
        boardString += '                            side: ' + (side == RED ? 'r' : 'b') + '\n';
        boardString += '                            king squares: [' + COORDINATES[kingSquare[RED]] +','+COORDINATES[kingSquare[BLACK]] + ']';
        console.log(boardString);
    }
//#endregion

/***************************************************************\
* 
*  By Kuro: Ngô Hoài Phong
*  GAME CỜ TƯỚNG: CHINESE CHESS 
*  Nhận biết tấn công
* 
* 
\***************************************************************/

    //#region TODO: Nhân biết quân cờ bị tấn công bởi quân cờ nào
    // Khai báo directions (khai báo phương hướng)
    const UP = -11; 
    const DOWN = 11;
    const LEFT = -1;
    const RIGHT = 1;

    // Khai báo tọa độ di chuyển ( đi thẳng, đi chéo)
    // dùng cho các quân cờ như : mã ( đi theo chữ L), pháo ( đi thẳng),...
    const ORTHORGONALS = [LEFT,RIGHT,UP,DOWN] ; // khai báo đi thẳng
    const DIAGOINALS = [UP + LEFT, UP + RIGHT, DOWN + LEFT, DOWN + RIGHT] // đi chéo

    // offsets to get attack by pawn
    // Nhận biết những quân cờ bị tấn công bởi con tốt
    const PAWN_ATTACK_OFFSETS = [
        [DOWN,LEFT,RIGHT],
        [UP,LEFT,RIGHT]
    ]

    // offsets to get attacks by horse
    // Nhân biết những quân cờ bị tấn công bởi ngựa
    const HORSE_ATTACK_OFFSETS=[
        [UP + UP + LEFT, LEFT + LEFT + UP],
        [UP + UP + RIGHT, RIGHT + RIGHT + UP],
        [DOWN + DOWN  + LEFT, LEFT + LEFT + DOWN],
        [DOWN + DOWN + RIGHT, RIGHT + RIGHT + DOWN]
    ]

    //  is square attack by a given side
    //  Nhận biết tấn công 
    function isSquareAttacked(square,color){
        // Con tốt
        for(let directions = 0; directions < PAWN_ATTACK_OFFSETS[color].length ; directions++){
            let directionTarget = square + PAWN_ATTACK_OFFSETS[color][directions]// Khai báo vị trí đang đứng 

            if(board[directionTarget] == ((color == RED) ? RED_PAWN : BLACK_PAWN)) return true; // đang bị tấn công bởi con tốt
        }

        // con ngựa
        for (let directions = 0; directions < DIAGOINALS.length ; directions++){
            let directionTarget = square + DIAGOINALS[directions];
            
            if(board[directionTarget] == EMPTY){
                for(let offset = 0; offset < 2;offset++){
                    let horseTarget = square + HORSE_ATTACK_OFFSETS[directions][offset];

                    if(board[horseTarget] == ((color == RED) ? RED_HORSE : BLACK_HORSE)) return true
                }
            }
        }
        //Tướng, xe và pháo
        for (let directions = 0; directions < ORTHORGONALS.length; directions++){
            let directionTarget = square + ORTHORGONALS[directions];
            let jumpOver = 0;

            while(board[directionTarget] != OFFBOARD){
                if(jumpOver == 0){
                    // Chỉ xét xe và tướng 
                    if( board[directionTarget] == ((color == RED) ? RED_ROOK : BLACK_ROOK) || 
                        board[directionTarget] == ((color == RED) ? RED_KING : BLACK_KING)){
                            return true;
                    }
                }
                if(board[directionTarget] != EMPTY){
                    jumpOver ++;
                }
                if(jumpOver ==2 && board[directionTarget] == ((color == RED) ? RED_CANNON : BLACK_CANNON)){
                    return true;
                }
                directionTarget += ORTHORGONALS[directions];
            }

        }
        return false;
    }

    // in ra tấn //công đến console
    function printAttacks(color){
        let boardString='';

        for(let rank = 0;rank < 14; rank++){
            for(let file = 0; file < 11; file++){
                let square = rank * 11 + file; // tạo ô cờ

                if(COORDINATES[square] != 'xx'){
                    if(file == 1) boardString += 11 - rank + '  ';
                    boardString += isSquareAttacked(square, color) ? 'x ' : '. ';// ô cờ có bị tấn công hay không, nếu có thì x mà ngược lại thì chấm
                }
            }
            if(rank < 13) boardString += '\n';
        }
        boardString += '   a b c d e f g h i\n\n';
        console.log(boardString);
    }
    //#endregion   


// Hàm khởi tạo Game 
    // Công dụng khởi tạo các con cờ
    (function initAll(){
        console.log("Init all");
    })();


    // debug để in ra quân cờ
    function debug(){
        // SetBoard(START_FEN);
        SetBoard('9/9/9/9/9/9/9/9/9/9/9 r -- 0 1')
        board[A0]=RED_ROOK;
        board[B0]=RED_ELEPHANT;
        board[A3]=RED_ADDVISOR;

        // board[B9]=BLACK_HORSE;
        printBoard();
        printAttacks(RED);
    }
    return {
        debug: function(){
            debug();
        }
    }
}