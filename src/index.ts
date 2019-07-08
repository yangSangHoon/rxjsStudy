/*
import {fromEvent} from 'rxjs';
import {debounceTime, map, filter, mergeMap, distinctUntilChanged} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {User, gitHubUserData} from './vo/UserSearchVo';
import './static/index.css';

const $layer = document.getElementById('suggestLayer');
const $search = document.getElementById('search');

const user$ = fromEvent($search, 'keyup')
    .pipe(
        debounceTime(300),
        map((event: Event) => (<HTMLTextAreaElement>event.target).value),
        distinctUntilChanged(),
        filter((query: string) => query.trim().length > 0),
        mergeMap((query: String) => ajax.getJSON(`https://api.github.com/search/users?q=${query}`))
    );

user$.subscribe((json: gitHubUserData) => {
    drawlayer(json.items);
});

function drawlayer(item: Array<object>) {
    $layer.innerHTML = item.map((user: User) => {
        return `<li class="user">
                <img src="${user.avatar_url}" width="50px" height="50px" />
                <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
                </li>`
    }).join('');
}*/

import {empty, of, scheduled, from, Subject} from 'rxjs';
import {map, mergeMap, mergeAll} from 'rxjs/operators';

of(1, -1, 2).pipe(
    mergeMap(number => number < 0 ? empty() : new Subject<number>())
)
.subscribe({
    next: (v: any) => {
        if(typeof v === 'object'){
            v.subscribe().unsubscribe();
        }
        console.log(v)
    },
    error: (e: any) => console.log(e),
    complete: () => console.log('완료')
});