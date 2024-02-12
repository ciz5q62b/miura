import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-shu-telingu2',
  templateUrl: './shu-telingu2.page.html',
  styleUrls: ['./shu-telingu2.page.scss'],
})
export class ShuTelingu2Page implements OnInit {
 //基本的にパブリックで型を宣言しているのは、変数がそれぞれの関数内で共有できるようにするため、
  //canvasを読み込もうとするとき、細かく型宣言しなければならないため、viewChildからcanvasを読み込もうとしている。
  @ViewChild('game', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  //CanvasRenderingContext2D はキャンバス API のインターフェイス。描画の時に使われる。
  private ctx: CanvasRenderingContext2D | null = null;

  // プレイヤーの設定
public player:any={};
public Subplayer:any={}
public gameflag=true;
// 敵の設定
public enemies:any = [];
public items:any=[]
// 弾丸の設定
public bulletSpeed = 10;
public bulletSize = 5;
public bulletDamage=1
public score=0;
public keys={Space:false,
ArrowRight:false,
ArrowLeft:false,
up:false,
dwon:false,
Shift:false
}
public wall:any=[]

public bossbullets:any=[]

//ステージの移動量
public stage=0;
public killnum=0;

  constructor() { }

  ngOnInit() {
    this.enemies = [];
    if(this.canvas && this.player){
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.player = {
        x: this.canvas.nativeElement.width / 2,
        y: this.canvas.nativeElement.height - 100,
        width: 50,
        height: 50,
        speed: 5,
        bullets:[],
        type:0,
        Sub:[]
    };
    this.Subplayer = {
      x: this.player.x,
      y: this.player.y,
      width: 30,
      height: 30,
      bullets:[],
      type:0
  };
    const keys = {};
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
          this.keys["ArrowRight"] = true;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          this.keys['ArrowLeft'] = true;
      }else if(e.key== ' '){
        this.keys["Space"]=true;
      }
  });
    //keyupはキーが上がっているという意味でなので、ボタンが押されていない状態を指している。なのでfalseにしている。  
  document.addEventListener('keyup', (e) => {
     if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.keys["ArrowRight"] = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.keys['ArrowLeft'] = false;
      }else if(e.key== ' '){
        this.keys["Space"]=false;
      }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'Up') {
        // 上キーが押されたときの処理
        this.keys['up'] = true;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        // 下キーが押されたときの処理
        this.keys['dwon'] =true;
    }else if (e.key === 'ShiftLeft' || e.key === 'Shift') {
      this.keys['Shift'] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'Up') {
        // 上キーが離されたときの処理
        this.keys['up'] = false;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        // 下キーが離されたときの処理
        this.keys['dwon'] = false;
    }else if (e.key === 'ShiftLeft' || e.key === 'Shift') {
      this.keys['Shift'] = false;
    }
});
  this.gameLoop()
    }
  }
  //障害物を生成（現在制作中）
  addWall(){
    if(this.canvas){
      //const wall:{x:number; y:number; height:number;width:number;speed:number}{
        
      //}
    }
  }
  addEnemy(){
    if(this.canvas){
      const enemy:{ x: number; y: number; width: number; height: number; speed: number;hp:number;type:number;score:number}={
      x: Math.random() * (this.canvas.nativeElement.width - 50), 
      y: 0,
      width: 50,
      height: 50,
      speed: 2+(2**this.stage),
      hp:Math.floor(Math.random()*100*(10**this.stage)),
      type:(0+this.stage)%1,
      score:0
    };
    enemy.score+=enemy.hp
    if(this.stage>=1 && Math.random()<0.2){
      enemy.type=1
    }
    this.enemies.push(enemy);
  }
  }
  addItem(){
    if(this.canvas){
      const item:{ x: number; y: number; width: number; height: number; speed: number; type:number}={
      x: Math.random() * (this.canvas.nativeElement.width - 50), 
      y: 0,
      width: 10,
      height: 10,
      speed: 4,
      type:0
    };
    if(this.stage>=1 && Math.random()<0.2){
      item.type=1
    }
    this.items.push(item);
  }
  }

  //プレイヤーの描画
drawPlayer() {
    if(this.canvas && this.ctx){
    this.ctx.fillStyle = '#00FF00';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    if(this.player.type>0){
      for(let i=0; i<this.player.type; i++){
        this.ctx.fillStyle = '#00FF22';
        this.ctx.fillRect(this.player.x+((-1)**i)*(Math.floor(i/2)+1)*this.player.width+10, this.player.y+20, this.Subplayer.width, this.Subplayer.height);
        
      }
    }
    if (this.keys["Shift"]) {
      this.ctx.fillStyle = '#FFFF00'; // イエローの色
      this.ctx.globalAlpha = 0.5; // 透明度を下げる
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      this.ctx.globalAlpha = 1.0; // 透明度を元に戻す
    
  }  
  }

}
bossEnemy(){
  if(this.canvas){
    const enemy:{ x: number; y: number; width: number; height: number; speed: number;hp:number;type:number,score:number}={
    x: this.canvas.nativeElement.width/2, 
    y: 0,
    width: 500+(100*this.stage),
    height: 200+(10*this.stage),
    speed: 2+this.stage,
    hp:Math.floor(Math.random()*10000*(10**this.stage)),
    type:2,
    score:0
  };
  enemy.score+=enemy.hp; 
  this.enemies.push(enemy);

  this.stage+=1
}
}
  
// 敵の描画
drawEnemies() {
  if(this.canvas && this.ctx){
  
  for (let enemy of this.enemies) {
      if(enemy.type==0){
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`HP: ${enemy.hp}`, enemy.x, enemy.y - 5);}
      else{
        this.ctx.fillStyle = '#FF5000';
        this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`HP: ${enemy.hp}`, enemy.x, enemy.y - 5);}

  }
  }
}

drawItems(){
  if(this.canvas && this.ctx){
    this.ctx.fillStyle='#aa2cff';
    for(let i of this.items ){
     this.ctx.fillRect(i.x,i.y,i.width,i.height);
     this.ctx.font = '16px Arial';
     this.ctx.fillText(`itemtype: ${i.type}`, i.x, i.y - 5);

    }
  }
}
drawBullets(){
  if(this.canvas && this.ctx){
    this.ctx.fillStyle='#FFFF00';
    for(let bullet of this.player.bullets){
     this.ctx.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
    }
  }
}
updatePlayer(){
  if(this.ctx && this.canvas){
    if(this.keys["ArrowLeft"] && this.player.x-this.player.speed>0){
      this.player.x-=this.player.speed;
    }
    if(this.keys["ArrowRight"] && this.player.x+this.player.speed<this.canvas.nativeElement.width - this.player.width){
      this.player.x+=this.player.speed;
    }
    if(this.keys["Space"]){
      const bullet={
        x: this.player.x + this.player.width / 2 - this.bulletSize / 2,
        y: this.player.y,
        width: this.bulletSize,
        height: this.bulletSize,
        speed: this.bulletSpeed
      };
      this.player.bullets.push(bullet);
      if(this.player.type>0){
        for(let i=0; i<this.player.type; i++){
          const bullet={
            x: this.player.x + this.player.width / 2 - this.bulletSize / 2+((-1)**i)*(Math.floor(i/2)+1)*this.player.width,
            y: this.player.y,
            width: this.bulletSize,
            height: this.bulletSize,
            speed: this.bulletSpeed
          };
          this.player.bullets.push(bullet)
    
        }
    
      }
      
    }
    if(this.keys['dwon'] && this.player.y+this.player.speed<this.canvas.nativeElement.height-this.player.height){
      this.player.y+=this.player.speed
    }
    if(this.keys['up']&&this.player.y-this.player.speed>0){

      this.player.y-=this.player.speed

    }
    if (this.keys['Shift']) {
      this.player.speed = 1.2* this.player.speed;
  } else {
      this.player.speed = 5; // 通常の速さ
  }
  
    // 弾丸の移動
    for(let bullet of this.player.bullets){
      bullet.y-=bullet.speed
      if(bullet.type==1){
      }
  
    }
  }

}
updateEnamy(){
  if(this.ctx && this.canvas){
    for(let enemy of this.enemies){
      if(enemy.type==1){
        enemy.y += enemy.speed;
        enemy.x+=enemy.speed*((this.player.x-enemy.x)%1)
  
    }else{
     enemy.y += enemy.speed;
    }
    }
  }
}
check(){
  if(this.ctx && this.canvas){
    //バレッドの当たり判定
    for(let i=0; i<this.player.bullets.length; i++){
      for(let j=0; j<this.enemies.length; j++){
        const bullet=this.player.bullets[i]
        const enemy=this.enemies[j]
        if(bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y) {
            enemy.hp-=this.bulletDamage;
            this.player.bullets.splice(i, 1);
            if(enemy.hp<=0){
              this.enemies.splice(j, 1);
              this.score+=enemy.score;
              this.killnum+=1
              if(this.killnum%5==0)this.bulletDamage+=1*(10**this.stage)
              if(this.killnum%50==0)this.bulletDamage+10*(10**this.stage)
            }
          break;
        }

        if(enemy.type!=2 && enemy.y>this.canvas.nativeElement.height){
          console.log("kieta")
          this.enemies.splice(j, 1);
        }
        if(enemy.type==2 && enemy.y+enemy.height>this.canvas.nativeElement.height){
          enemy.y=0
        }
      }
    }
      for(let j=0; j<this.enemies.length; j++){
        const enemy=this.enemies[j]
        if(this.player.x < enemy.x + enemy.width &&
          this.player.x + this.player.width > enemy.x &&
          this.player.y < enemy.y + enemy.height &&
          this.player.y + this.player.height > enemy.y) {
          this.gameflag=false
          alert('GAME OVER');
          document.location.reload();
          }
      }
    
      for(let j=0; j<this.items.length; j++){
        const items=this.items[j]
        if(this.player.x < items.x + items.width &&
          this.player.x + this.player.width > items.x &&
          this.player.y < items.y + items.height &&
          this.player.y + this.player.height > items.y) {
            if(items.type==1){ if(this.player.type<6)this.player.type+=1}
            else {
                if(this.player.type<6)this.player.type+=1
                this.bulletSpeed+=1
                this.bulletSize+=2*(10*this.stage)
                if(this.bulletSize>=25)this.bulletSize=25
                this.bulletDamage+=1*(10**this.stage)
            this.items.splice(j,1) }
          }
      }
    
  }
}
update(){
  if(this.ctx && this.canvas){
    this.updatePlayer();
  // 敵の移動
    this.updateEnamy();
    this.check();
  for(let itm of this.items){
    itm.y+=itm.speed;
  }
    // 敵の生成 ステージ数に対応して数を増やしている。
  if (Math.random() < 0.05+(this.stage*0.04)) {
      this.addEnemy();
  }
  if (Math.random() < 0.002+(this.stage*0.04)){
    this.addItem();
  }
  //50倒したらボスを出現、Bossのほうでステージを管理する。
  if (this.killnum >=50){
    this.bossEnemy();
    this.killnum=0
  }
  
   // 画面のクリア
   this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
   // オブジェクトの描画
   this.drawPlayer();
   this.drawEnemies();
   this.drawBullets();
   this.drawItems();
}
}
//ゲームループ
gameLoop() {
  this.update();
  // 次のアニメーションフレームで再帰的に呼び出す
  if(this.gameflag){
  requestAnimationFrame(() => this.gameLoop());}
}
}


