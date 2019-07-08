import {interval, fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Rect} from './vo/CatchBallVo';
import {takeWhile} from "rxjs/internal/operators";

export default class Ball {
    $container: HTMLElement;
    ball: HTMLElement;
    move$: Observable<any>;

    radian: number = Math.PI/180;
    radius: number;
    speed: number;
    center: Rect;
    isMove:boolean = true;

    constructor(container: HTMLElement) {
        this.$container = container;
        this.settingDefaultValue();
        this.drawBall();
        this.eventSetting();
        this.move();
    }

    eventSetting(): void {
        fromEvent(this.ball, 'click').subscribe(event => {
            this.stop();
        })
    }

    settingDefaultValue(): void {
        this.center = {
            left: 50 + Math.floor(Math.random() * 300),
            top: 50 + Math.floor(Math.random() * 300)
        };
        this.speed = Math.ceil(Math.random() * 5);
        this.radius = 50 + Math.floor(Math.random() * 100);
    }

    drawBall(): void {
        this.ball = document.createElement('div');
        this.ball.className = 'ball';
        this.movingBall({
            left: this.center.left,
            top: this.center.top
        });
        this.$container.appendChild(this.ball);
    }

    move(): void {
        this.move$ = interval(50)
            .pipe(
                takeWhile(() => this.isMove),
                map(() => this.getBallPostion())
            );

        this.moveSubscribe();
    }

    moveSubscribe(): void {
        this.move$.subscribe({
            next: (rect: Rect) => {
                this.movingBall(rect);
            },
            complete: () => {
                this.ball.className = 'ball off';
            }
        });
    }

    getBallPostion() : Rect{
        this.radian += Math.PI/180;

        return {
            left: this.center.left + this.radius * Math.cos(this.radian*this.speed),
            top: this.center.top + this.radius * Math.sin(this.radian*this.speed)
        }
    }

    movingBall(rect: Rect) {
        this.ball.style.left = rect.left + 'px';
        this.ball.style.top = rect.top + 'px';
    }

    restart() {
        if (!this.isMove) {
            this.isMove = true;
            this.ball.className = 'ball';
            /*
            observable 다시 생성안하고 서브스크라이브만 해도 다시 스트림 생성?? 어떤 원리 일까?
            이벤트 해지 후 다시 등록과 같은것?
            */
            this.moveSubscribe();
        }
    }

    stop() {
        this.isMove = false;
    }
}