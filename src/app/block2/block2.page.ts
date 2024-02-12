import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-block2',
  templateUrl: './block2.page.html',
  styleUrls: ['./block2.page.scss'],
})
export class Block2Page implements OnInit {

  //基本的にパブリックで型を宣言しているのは、変数がそれぞれの関数内で共有できるようにするため、
  //canvasを読み込もうとするとき、細かく型宣言しなければならないため、viewChildからcanvasを読み込もうとしている。
  @ViewChild('game', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  //CanvasRenderingContext2D はキャンバス API のインターフェイス。描画の時に使われる。
  private ctx: CanvasRenderingContext2D | null = null;
  //こちらはキーを入力したときの変数、今回のゲームはパドルを左右に動かす仕組みになっているので、二つのフラグを用意している。
  public rightPressed = false;
  public leftPressed = false;
  // ゲームオブジェクトの初期化
  // ボールのステータスを一度取得している
  ball = {
    x: 0, // 初期化時に canvas の幅や高さがわからないので 0 で初期化
    y: 0,
    dx: 2,//移動量
    dy: -2,
    radius: 10
  };
  // パドルのステータスを取得している

  paddle = {
    width: 75,
    height: 10,
    x: 0
  };
  
  // ブロックの設定、縦横の個数を15にしたいので、3*5にする。
  //ここではjavascriptの場合const宣言になっているが、スコープを抜けてしまう恐れから、グローバル変数に変換している
  public brickRowCount = 3;
  public brickColumnCount = 5;
  //ブロックの大きさ whidth=横　Height=縦
  public brickWidth = 75;
  public brickHeight = 20;
  //  
  public brickPadding = 10;
  public brickOffsetTop = 30;
  public brickOffsetLeft = 30;

  //ブロックの配列をあらかじめ宣言している。
  public bricks:any = [];
  public shitFlag=false;
  

  constructor() { }

  //こちらでそれぞれの初期設定を担っている。最初のif分はcanvasのステータスがundefineであり、nullであることを
  //回避している。そうすることで、安全にcanvasから描画のためのプロパティを呼び出している
  //nullである状態だとエラーを吐き出してしまう恐れがあるため、あらかじめif文で制御をかけている。
  ngOnInit() {
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      //こちらはボールの座標を取得している。/2は指定したwidthの真ん中の座標を取得するため、heightはちょうどいい高さがそれくらいなのだろう
      this.ball.x = this.canvas.nativeElement.width / 2;
      this.ball.y = this.canvas.nativeElement.height - 30;
      //paddleの位置を調整している。左右しか動かさないゲームなので、yを気にする必要はほとんどない。
      this.paddle.x = (this.canvas.nativeElement.width - this.paddle.width) / 2;
      //ゲームループを呼び出している。ここがゲームのメイン。updateをアニメーションフレームで再帰的に呼び出している。
      this.gameLoop();

      //キーの入力検知、ngOnInitで常に呼び出せるように、放り込んでいる。こちらはキーが押されたほうの指示文
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.rightPressed = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.leftPressed = true;
        }
    });
      //keyupはキーが上がっているという意味でなので、ボタンが押されていない状態を指している。なのでfalseにしている。  
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            this.rightPressed = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            this.leftPressed = false;
        }
    });
    //blockの描画のfor文になっている。縦の値を一度初期化する。
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
          this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }}
      document.addEventListener('keydown', (e) => {
         if (e.key === 'ShiftLeft' || e.key === 'Shift') {
          this.shitFlag = true;
        }
    });
    document.addEventListener('keyup', (e) => {
         if (e.key === 'ShiftLeft' || e.key === 'Shift') {
          this.shitFlag = false;
        }
    });
    
    } else {
      //canvasの値を取得できてないときのデバッグ文だと思うようにしている。
      console.error('Canvas dimensions are not available.');
    }
    
  }
  drawBricks() {
    //デバッグ用のコード
    console.log("Reached drawBricks");
    if (this.ctx) {
      if (!this.bricks) {
        this.bricks = [];
      }
      for (let c = 0; c < this.brickColumnCount; c++) {
        // 二次元配列の初期化が必要なら行う
        if (!this.bricks[c]) {
          this.bricks[c] = [];
        }
      }
      for (let c = 0; c < this.brickColumnCount; c++) {
        for (let r = 0; r < this.brickRowCount; r++) {
          const brick = this.bricks[c][r];
          //brickオブジェクトが未定義である可能性があったため、下のif文で空であるかどうかを確認している。
          if (brick && (brick.status === 1 || brick.status === 0)) {
            //座標をここで取得、paddingで空白を作り描画している。
            //オフセットでpaddingの上と左のずれを調整する。
            const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
            const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
  
            brick.x = brickX;
            brick.y = brickY;
            //描画、beginpathで開始し、close,pachで一連の処理をする。
            //描画を開始する
            this.ctx.beginPath();
            this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
            this.ctx.fillStyle = brick.status === 1 ? '#0095DD' : 'transparent'; 
            // status が 0 の場合は透明にする
            this.ctx.fill();
            this.ctx.closePath();
          }
        }
      }
    }
  }
// 衝突判定
collisionDetection() {
  console.log("collisionDetection");
  if(this.ctx){
  for (let c = 0; c < this.brickColumnCount; c++) {
    this.bricks[c] = this.bricks[c] || [];
      for (let r = 0; r < this.brickRowCount; r++) {
          const brick = this.bricks[c][r];
          //brickは初期化でobjectとしているが、グローバル変数宣言時だとany型になっているので、未定義状態になっている。
          //なのでif(brick)はundifineであるか確認するための目的になっている
          if (brick && brick.status === 1) {
          //こちらは、brickを結ぶ四点の内側にボールの座標がすべて入っているかどうかを判定している。
          //いわゆる当たり判定,壁の描画するフラグをたて、あたったらフラグを０にし透明にする
              if (
                  this.ball.x > brick.x &&
                  this.ball.x < brick.x + this.brickWidth &&
                  this.ball.y > brick.y &&
                  this.ball.y < brick.y + this.brickHeight
              ) {
                  this.ball.dy = -this.ball.dy;
                  brick.status = 0;
              }
          }
      }
  }
}
}

// ボールの描画
drawBall() {
    if(this.ctx &&this.canvas&&this.canvas.nativeElement.width && this.canvas.nativeElement.height){
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();}
}


// パドルの描画、描画の座標はキー入力によって変動しているため、左右にパドルが動くようになっている。
drawPaddle():void{ 
  if(this.ctx&&　this.canvas&&this.canvas.nativeElement.width && this.canvas.nativeElement.height){
  this.ctx.beginPath();
  this.ctx.rect(this.paddle.x, this.canvas.nativeElement.height - this.paddle.height, this.paddle.width, this.paddle.height);
  this.ctx.fillStyle = '#0095DD';
  this.ctx.fill();
  this.ctx.closePath();
}
}
movePaddle() {
  //キー入力が検知した際に呼び出している。フレーム事に呼び出されているので、
  //0力がその瞬間に検知されていれば、描画の枠を超えない範囲で操作可能となっている
  if(this.canvas){
    if (this.rightPressed && this.paddle.x < this.canvas.nativeElement.width - this.paddle.width) {
      this.paddle.x += 7;
  } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
  }
}
}

// ゲームの更新と描画
update(){
  if(this.ctx&&this.canvas&&this.canvas.nativeElement.width && this.canvas.nativeElement.height){
    this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height)
    this.collisionDetection();
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.movePaddle();
    
     // ボールの移動,常に斜めの移動
     this.ball.x += this.ball.dx;
     this.ball.y += this.ball.dy;
     if(this.shitFlag){
      this.ball.y += this.ball.dy;
      this.ball.x += this.ball.dx*2;
     }
 
     // 壁との衝突判定
     if (this.ball.x < this.ball.radius || this.ball.x > this.canvas.nativeElement.width - this.ball.radius) {
         this.ball.dx = -this.ball.dx;
         //逆向きにする横
     }
     if (this.ball.y < this.ball.radius || this.ball.y > this.canvas.nativeElement.height - this.ball.radius) {
         this.ball.dy = -this.ball.dy;
         //逆向きにする縦
     }
     if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
  } else if (this.ball.y + this.ball.dy > this.canvas.nativeElement.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
          this.ball.dy = -this.ball.dy;
      } else {
          alert('GAME OVER');
          document.location.reload();

      }
  }

  }

}
// ゲームループ
gameLoop() {
  //こちらの関数で描画や当たり判定に関する関数を管理している。これらをフレーム単位で呼び出すことでゲームのような動きを実現している
  this.update();
  // 次のアニメーションフレームで再帰的に呼び出す
  requestAnimationFrame(() => this.gameLoop());
}
}
