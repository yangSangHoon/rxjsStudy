/*
 import {Observable} from 'rxjs';
 const interval$ = new Observable(function subscriber(observer){
 const id = setInterval(function() {
 observer.next(new Date().toString());
 }, 1000);
 return function() {
 console.log("interval 제거");
 clearInterval(id);
 };
 });

 const subscription = interval$.subscribe(v => console.log(v));

 setTimeout(function() {
 subscription.unsubscribe();
 }, 5000);*/
/*
 import {interval, timer} from 'rxjs';
 import {takeUntil} from 'rxjs/operators';

 interval(1000).pipe(takeUntil(timer(5000))).subscribe({
 next: v => console.log(`refactoring: ${new Date().toString()}`),
 error: e => console.log(e),
 complete: () => console.log("interval 제거")
 });*/


//////교제////////////////////////////////////////////////////////////
/*import {fromEvent} from 'rxjs';
import {debounceTime, map, filter, mergeMap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

const user$ = fromEvent(document.getElementById('search'), 'keyup')
    .pipe(
        debounceTime(300),
        map((event: Event) => (<HTMLTextAreaElement>event.target).value),
        filter((query: string) => query.trim().length > 0),
        mergeMap((query: String) => ajax.getJSON(`https://api.github.com/search/user?q=${query}`))
    );


user$.subscribe((json: any) => {
    console.log('서버로 부터 전달 받은 json값', json);
});*/

/*
 //Observable 받는 것
 user$.subscribe((json: Observable<JSON>) => {
 console.log('서버로 부터 전달 받은 json값', json);
 })*/

/// mergeMap 예제////////////////////////////////////////////////////////////////////////////////////////////////
/*import {interval, Observable, timer} from 'rxjs';
 import {take, mergeMap, mergeAll, map} from 'rxjs/operators';

 const mergeMap$ = interval(2000)
 .pipe(
 take(5),
 map((intervalNumber: number) => getTimerObservable(intervalNumber)),
 mergeAll()
 );

 function getTimerObservable(intervalNumber: number): Observable<any> {
 console.log('intervalNumber: ', intervalNumber);
 return timer(500)
 .pipe(
 map((x: number) => intervalNumber)
 )
 }

 mergeMap$.subscribe((value: any) => console.log(`mergeMapNumber`, value));*/

/*
 -0---1---2---3---4--|
 \   \   \   \   \
 0---1---2---3---4|

 mergeMap
 ---0---1---2---3---4|


 mergeAll(+map = mergeMap)이 있을때 하위 Observerbla인 timer 스트림이 종료 되었을때 subscribe에 observer 전달
 없을때는 timer Observerble의 스트림에 상관없이 바로 Observerble을 subscribe에 전달
 */



/// mergeMap 예제////////////////////////////////////////////////////////////////////////////////////////////////
/*
 import {interval, merge, timer} from 'rxjs';
 import {take, mergeAll, map} from 'rxjs/operators';
 const intervalA$ = interval(1000)
 .pipe(
 take(5),
 map((x: number) => `${x} : intervalA`)
 )

 const intervalB$ = interval(1000)
 .pipe(
 take(5),
 map((x: number) => `${x} : intervalB`)
 )

 const merge$ = merge(intervalA$, intervalB$);

 merge$.subscribe((x: string) => {
 console.log(x);
 });
 */

/*
 -0---1---2---3---4--|

 -0---1---2---3---4--|

 merge
 ---0,0---1,1---2,2---3,3---4,4|
 */