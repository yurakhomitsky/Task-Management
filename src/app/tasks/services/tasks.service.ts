import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TaskDAO } from '../../shared/types/TaskDAO.interface';
import { of, Observable } from 'rxjs';
import { Task } from '../types/task.interface';
import { TaskStatus } from '../types/task-status.enum';

@Injectable({
    providedIn: 'root'
})
export class TasksService implements TaskDAO {
    private endPoint = 'tasks'
    constructor(private httpClient: HttpClient) {


    }
    create(body: Task): Observable<Task> {
        return this.httpClient.post<Task>(`${this.endPoint}`, body);
    }

    update(id: number, body: Task): Observable<Task> {
        return this.httpClient.put<Task>(`${this.endPoint}/${id}`, body);
    }

    delete(id: number): Observable<any> {
        return this.httpClient.delete<Observable<any>>(`${this.endPoint}/${id}`)
    }

    findById(id: number): Observable<Task> {
        return this.httpClient.get<Task>(`${this.endPoint}/${id}`)
    }
    
    findAll(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(`${this.endPoint}`);
    }

    updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
        return this.httpClient.patch<Task>(`${this.endPoint}/${id}/status`, {
            status
        });
    }

}