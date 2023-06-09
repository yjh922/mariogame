class Mario extends GameObject{
    constructor(container, src, width, height,x,y,velX,velY){
        super(container, src, width, height,x,y,velX,velY);

        //이변수는 마리오의 이중점프를 막기 위한 논리값이다
        //이 변수를 통해 마리오의 발바닥이 땅에 닿았는지 여부를 판단하는
        //용도로 사용하겠다.
        this.falled=false;

        //Has a 관계 Mario has a Sensor
        this.leftSensor=new LeftSensor(this.container,3,50,this.x-3,this.y+10,"blue");
        this.rightSensor=new RightSensor(this.container,3,50,this.x+this.width,this.y+10,"blue");
        this.topSensor=new TopSensor(this.container,40,3,this.x+5,this.y-3,"blue");
        this.bottomSensor=new BottomSensor(this.container,40,3,this.x+5,this.y+this.height,"blue");
    }

    hitCheck(){
        //벽돌 수 만큼 반복하면서 마리오와 각각의 벽돌간 충돌체크 
        for(let i=0;i<brickArray.length;i++){
            let result=collisionCheck(this , brickArray[i]);
            
            if(result){//i번째 벽돌과 마주쳤다면..
                //마주친 벽돌의 y축에서 마리오의 키(height)만큼을 위로
                //올려놓자 
                this.y=brickArray[i].y - this.height;
                this.falled=true;//발바닥이 닿음
            }
        }   
    }

    //부모인 GameObject 에게 물려받은 재산 중 
    //tick() 메서드는 현재 마리오 상황에 맞지 않는다.
    //이때 개발자는 부모에게 물려받은 메서드를 자기만의
    //코드로 업그레이드할 수 있는데, 이러한 메서드 정의
    //기법을 가리켜 오버라이딩(OverRiding...)
    tick(){
        this.velY+=g;
        //console.log(this.velY);
        
        if(this.velY>8){
            this.velY=8;
        }
        this.x+=this.velX;
        this.y+=this.velY;  

        //마리오가 보유한 센서막대들에 대해서도 tick()호출
        this.leftSensor.tick();//오버라이딩한 tick()메서드
        this.leftSensor.render();//Sensor부모의 render()메서드
        this.rightSensor.tick();
        this.rightSensor.render();
        this.topSensor.tick();
        this.topSensor.render();
        this.bottomSensor.tick();
        this.bottomSensor.render();


        
        this.hitCheck();
    }

}