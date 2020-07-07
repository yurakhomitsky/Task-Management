import { Observable } from 'rxjs';
export interface BaseCRUD<T> {

    create(T): Observable<T>;

    update(id: number, body: T): Observable<T>;

    delete(id: number): Observable<any>;
    
    findById(id: number): Observable<T>;

    findAll(): Observable<T[]>
    
}