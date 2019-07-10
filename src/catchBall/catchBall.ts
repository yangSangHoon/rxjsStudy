import {fromEvent, interval, Observable, Subscription} from 'rxjs';
import '../static/catchBall.css';
import Ball from './Ball';
import {takeWhile} from "rxjs/internal/operators";

const $container: HTMLElement = document.getElementById('catchBall');
const $move = document.getElementById('move');
const $stop = document.getElementById('stop');
const $timer = document.getElementById('timer');

let interval$: Observable<any>;
let time: number = 100;

let ballList: Array<Ball> = [];

let subscription$: Subscription ;

function makeBalls(ballNumber: number): void {
    for (let i: number = 0; i < ballNumber; i++) {
        ballList.push(new Ball($container));
    }
}

function startTimer(): void {
    interval$ = interval(1000)
        .pipe(
            takeWhile(() => time > 0)
        );

    setIntervalSubscribe();
}

function setIntervalSubscribe(): void {
    subscription$ = interval$.subscribe({
        next: () => {
            $timer.innerHTML = String(--time);
        },
        complete: () => {
            stopAll();
        }
    });
}

function eventSetting(): void {
    fromEvent($move, 'click').subscribe(event => {
        moveAll();
    });
    fromEvent($stop, 'click').subscribe(event => {
        stopAll();
    });
}

function moveAll(): void {
    ballList.forEach(ball => ball.move());
    setIntervalSubscribe();
}

function stopAll(): void {
    ballList.forEach(ball => ball.stop());
    subscription$.unsubscribe();
}

$timer.innerHTML = String(time);
makeBalls(500);
startTimer();
eventSetting();