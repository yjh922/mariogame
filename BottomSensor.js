class BottomSensor extends Sensor{
    //mario.x+5,mario.y+mario.height
    tick(){
        this.x=mario.x+5;
        this.y=mario.y+mario.height;
    }
}