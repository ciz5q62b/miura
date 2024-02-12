import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-shu-telingu',
  templateUrl: './shu-telingu.page.html',
  styleUrls: ['./shu-telingu.page.scss'],
})
export class ShuTelinguPage implements OnInit {
 //基本的にパブリックで型を宣言しているのは、変数がそれぞれの関数内で共有できるようにするため、
  //canvasを読み込もうとするとき、細かく型宣言しなければならないため、viewChildからcanvasを読み込もうとしている。
  @ViewChild('game', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  //CanvasRenderingContext2D はキャンバス API のインターフェイス。描画の時に使われる。
  private ctx: CanvasRenderingContext2D | null = null;

  // プレイヤーの設定
public player:any={};
// 敵の設定
public enemies:any = [];
public gameFlag=true
// 弾丸の設定　スピードと大きさ
public bulletSpeed = 10;
public bulletSize = 5;
//入力したキーを検知するためのフラグを管理している。
public keys={Space:false,
ArrowRight:false,
ArrowLeft:false
}

  constructor() { }

  ngOnInit() {
    this.enemies = [];
    //同じく取得したキャンバスがundifineである可能性があるため、ここでnullにしている。
    if(this.canvas && this.player){
      this.ctx = this.canvas.nativeElement.getContext('2d');
      //プレイヤーの初期値はここで管理している。コードのほうは配列のbulletsをobjectに格納しているので、グローバル変数で一度any型にしている。
      this.player = {
        x: this.canvas.nativeElement.width / 2,
        y: this.canvas.nativeElement.height - 50,
        width: 50,
        height: 50,
        speed: 5,
        hp:10,
        bullets:[]
    };
    //キーの初期化、検知したときにフラグをtrue　falseにする操作をあらかじめ決めてある。
    const keys = {};
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
          console.log(e.key)
          this.keys["ArrowRight"] = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          console.log(e.key)
          this.keys['ArrowLeft'] = true;
      }else if(e.key==" "){
        console.log(e.key)
        this.keys["Space"]=true;
      }
  });
    //keyupはキーが上がっているという意味でなので、ボタンが押されていない状態を指している。なのでfalseにしている。  
  document.addEventListener('keyup', (e) => {
     if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.keys["ArrowRight"] = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.keys['ArrowLeft'] = false;
      }else if(e.key==" "){
        this.keys["Space"]=false;
      }
  });

    }
    //キャンバス上でゲームを表現するための関数を呼び出している。
    this.gameLoop();
  }
  addEnemy(){
    //敵をランダムに表示させている関数。xの座標をランダムに表示させている。
    if(this.canvas){
      const enemy:{ x: number; y: number; width: number; height: number; speed: number;}={
      x: Math.random() * (this.canvas.nativeElement.width - 50), 
      y: 0,
      width: 50,
      height: 50,
      speed: 2,
    };
    this.enemies.push(enemy);
  }
  }

  //プレイヤーの描画、今回は時機を四角形で描画している。
drawPlayer() {
    if(this.canvas && this.ctx){
    this.ctx.fillStyle = '#00FF00';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
}
  
// 敵の描画、こちらも四角形
drawEnemies() {
  if(this.canvas && this.ctx){
  this.ctx.fillStyle = '#FF0000';
  //こちらのfor文章は配列に格納されているenamiesの情報を取り出し、enemyの変数に格納している
  for (let enemy of this.enemies) {
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
  }
}
drawBullets(){
  //弾丸の表現、今回はまっすぐに進むようにしている。
  if(this.canvas && this.ctx){
    this.ctx.fillStyle='black';
    for(let bullet of this.player.bullets){
     this.ctx.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
    }
  }
}
update(){
  if(this.ctx && this.canvas){
  if(this.keys["ArrowLeft"] && this.player.x>0){
    this.player.x-=this.player.speed;
  }
  if(this.keys["ArrowRight"] && this.player.x<this.canvas.nativeElement.width - this.player.width){
    this.player.x+=this.player.speed;
  }
  if(this.keys["Space"]){
    console.log("発射")
    const bullet={
      x: this.player.x + this.player.width / 2 - this.bulletSize / 2,
      y: this.player.y,
      width: this.bulletSize,
      height: this.bulletSize,
      speed: this.bulletSpeed
    };
    this.player.bullets.push(bullet);
    
  }
  // 弾丸の移動
  for(let bullet of this.player.bullets){
    bullet.y-=bullet.speed
  }
  // 敵の移動
  for(let enemy of this.enemies){
    enemy.y += enemy.speed;
  }  
  for(let i=0; i<this.player.bullets.length; i++){
    for(let j=0; j<this.enemies.length; j++){
  
      const bullet=this.player.bullets[i]
      const enemy=this.enemies[j]
      if(bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y) {
          console.log("あたり")
        this.player.bullets.splice(i, 1);
        this.enemies.splice(j, 1);
        break;
      }
    }
  
  }
  for(let enemy of this.enemies){
    enemy.y += enemy.speed;
  }  
  //  プレイヤーが敵と当たったかの判定
  for(let i=0; i<this.enemies.length; i++){
      const enemy=this.enemies[i]
      if(this.player.x < enemy.x + enemy.width &&
        this.player.x + this.player.width > enemy.x &&
        this.player.y < enemy.y + enemy.height &&
        this.player.y + this.player.height > enemy.y) {
          this.player.hp-=1
          console.log(this.player.hp)
          if(this.player.hp<=0){
            this.gameFlag=false
            alert('GAME OVER');

            document.location.reload();}
      }
    }
  

    // 敵の生成　確率的に表示させている。
  if (Math.random() < 0.02) {
      this.addEnemy();
  }
   // 画面のクリア
   this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

   // オブジェクトの描画
   this.drawPlayer();
   this.drawEnemies();
   this.drawBullets();
}
}
gameLoop() {
  //こちらの関数で描画や当たり判定に関する関数を管理している。これらをフレーム単位で呼び出すことでゲームのような動きを実現している
  this.update();
  // 次のアニメーションフレームで再帰的に呼び出す
  if(this.gameFlag){requestAnimationFrame(() => this.gameLoop());}
}
}
